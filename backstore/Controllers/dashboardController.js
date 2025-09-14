const asyncHandler = require('express-async-handler');
const Product = require('../Models/productModel');
const Order = require('../Models/orderModel');
const User = require('../Models/user');
const ApiError = require('../utils/apiError');

// @desc    Get dashboard statistics
// @route   GET /api/v1/dashboard/stats
// @access  Protected/Admin-Manager
exports.getDashboardStats = asyncHandler(async (req, res, next) => {
  try {
    // Get total counts
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();
    const totalCustomers = await User.countDocuments({ role: 'user' });
    
    // Get revenue data
    const orders = await Order.find({ isPaid: true });
    const totalRevenue = orders.reduce((sum, order) => sum + order.totalOrderPrice, 0);
    
    // Get this month's revenue
    const thisMonth = new Date();
    thisMonth.setDate(1);
    thisMonth.setHours(0, 0, 0, 0);
    
    const thisMonthOrders = await Order.find({
      isPaid: true,
      createdAt: { $gte: thisMonth }
    });
    const thisMonthRevenue = thisMonthOrders.reduce((sum, order) => sum + order.totalOrderPrice, 0);
    
    // Get last month's revenue
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);
    lastMonth.setDate(1);
    lastMonth.setHours(0, 0, 0, 0);
    
    const lastMonthOrders = await Order.find({
      isPaid: true,
      createdAt: { 
        $gte: lastMonth,
        $lt: thisMonth
      }
    });
    const lastMonthRevenue = lastMonthOrders.reduce((sum, order) => sum + order.totalOrderPrice, 0);
    
    // Calculate trends
    const revenueTrend = lastMonthRevenue > 0 ? 
      ((thisMonthRevenue - lastMonthRevenue) / lastMonthRevenue * 100).toFixed(1) : 0;
    
    const orderTrend = lastMonthOrders.length > 0 ? 
      ((thisMonthOrders.length - lastMonthOrders.length) / lastMonthOrders.length * 100).toFixed(1) : 0;
    
    // Get average order value
    const averageOrderValue = totalOrders > 0 ? (totalRevenue / totalOrders).toFixed(2) : 0;
    
    // Get recent orders for top selling
    const recentOrders = await Order.find({ isPaid: true })
      .sort({ createdAt: -1 })
      .limit(10)
      .populate('user', 'name')
      .populate('cartItems.product', 'title price imageCover');
    
    res.status(200).json({
      status: 'success',
      data: {
        totalProducts,
        totalOrders,
        totalCustomers,
        totalRevenue: totalRevenue.toFixed(2),
        thisMonthRevenue: thisMonthRevenue.toFixed(2),
        lastMonthRevenue: lastMonthRevenue.toFixed(2),
        averageOrderValue,
        revenueTrend: parseFloat(revenueTrend),
        orderTrend: parseFloat(orderTrend),
        recentOrders
      }
    });
  } catch (error) {
    next(new ApiError(error.message, 500));
  }
});

// @desc    Get revenue data specifically
// @route   GET /api/v1/dashboard/revenue
// @access  Protected/Admin-Manager
exports.getRevenueData = asyncHandler(async (req, res, next) => {
  try {
    // Get all paid orders
    const paidOrders = await Order.find({ isPaid: true });
    
    // Calculate total revenue
    const totalRevenue = paidOrders.reduce((sum, order) => sum + order.totalOrderPrice, 0);
    
    // Get current month revenue
    const now = new Date();
    const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    
    const thisMonthOrders = paidOrders.filter(order => 
      new Date(order.createdAt) >= thisMonth
    );
    const thisMonthRevenue = thisMonthOrders.reduce((sum, order) => sum + order.totalOrderPrice, 0);
    
    // Get last month revenue
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const lastMonthOrders = paidOrders.filter(order => {
      const orderDate = new Date(order.createdAt);
      return orderDate >= lastMonth && orderDate < thisMonth;
    });
    const lastMonthRevenue = lastMonthOrders.reduce((sum, order) => sum + order.totalOrderPrice, 0);
    
    // Calculate percentage change
    const percentageChange = lastMonthRevenue > 0 ? 
      ((thisMonthRevenue - lastMonthRevenue) / lastMonthRevenue * 100).toFixed(1) : 0;
    
    // Get monthly revenue for the last 6 months
    const monthlyRevenue = [];
    for (let i = 5; i >= 0; i--) {
      const monthStart = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthEnd = new Date(now.getFullYear(), now.getMonth() - i + 1, 0);
      
      const monthOrders = paidOrders.filter(order => {
        const orderDate = new Date(order.createdAt);
        return orderDate >= monthStart && orderDate <= monthEnd;
      });
      
      const monthRevenue = monthOrders.reduce((sum, order) => sum + order.totalOrderPrice, 0);
      
      monthlyRevenue.push({
        month: monthStart.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        revenue: monthRevenue.toFixed(2)
      });
    }
    
    res.status(200).json({
      status: 'success',
      data: {
        totalRevenue: totalRevenue.toFixed(2),
        thisMonthRevenue: thisMonthRevenue.toFixed(2),
        lastMonthRevenue: lastMonthRevenue.toFixed(2),
        percentageChange: parseFloat(percentageChange),
        monthlyRevenue,
        totalOrders: paidOrders.length
      }
    });
  } catch (error) {
    next(new ApiError(error.message, 500));
  }
});

// @desc    Get top selling products
// @route   GET /api/v1/dashboard/top-selling
// @access  Protected/Admin-Manager
exports.getTopSellingProducts = asyncHandler(async (req, res, next) => {
  try {
    // Get all paid orders to calculate product sales
    const paidOrders = await Order.find({ isPaid: true })
      .populate('cartItems.product', 'title price imageCover ratingsAverage ratingsQuantity');
    
    // Calculate product sales
    const productSales = {};
    
    paidOrders.forEach(order => {
      order.cartItems.forEach(item => {
        if (item.product) {
          const productId = item.product._id.toString();
          if (!productSales[productId]) {
            productSales[productId] = {
              product: item.product,
              totalSold: 0,
              totalRevenue: 0
            };
          }
          productSales[productId].totalSold += item.quantity;
          productSales[productId].totalRevenue += item.quantity * item.product.price;
        }
      });
    });
    
    // Convert to array and sort by total sold
    const topProducts = Object.values(productSales)
      .sort((a, b) => b.totalSold - a.totalSold)
      .slice(0, 5)
      .map(item => ({
        _id: item.product._id,
        title: item.product.title,
        price: item.product.price,
        imageCover: item.product.imageCover,
        ratingsAverage: item.product.ratingsAverage,
        ratingsQuantity: item.product.ratingsQuantity,
        totalSold: item.totalSold,
        totalRevenue: item.totalRevenue
      }));
    
    // If no sales data, fallback to top-rated products
    if (topProducts.length === 0) {
      const fallbackProducts = await Product.find()
        .sort({ ratingsAverage: -1, ratingsQuantity: -1 })
        .limit(5)
        .select('title price imageCover ratingsAverage ratingsQuantity');
      
      res.status(200).json({
        status: 'success',
        data: fallbackProducts
      });
    } else {
      res.status(200).json({
        status: 'success',
        data: topProducts
      });
    }
  } catch (error) {
    next(new ApiError(error.message, 500));
  }
});

// @desc    Get customer locations based on country field
// @route   GET /api/v1/dashboard/customer-locations
// @access  Protected/Admin-Manager
exports.getCustomerLocations = asyncHandler(async (req, res, next) => {
  try {
    const customers = await User.find({ role: 'user' })
      .select('country createdAt');
    
    // Group customers by country
    const locations = {};
    let totalCustomers = 0;
    let customersWithCountry = 0;
    
    customers.forEach(customer => {
      totalCustomers++;
      if (customer.country) {
        customersWithCountry++;
        const country = customer.country;
        locations[country] = (locations[country] || 0) + 1;
      }
    });
    
    const locationData = Object.entries(locations)
      .map(([country, count]) => ({
        city: country, // Using 'city' field for consistency with frontend
        count,
        percentage: customersWithCountry > 0 ? ((count / customersWithCountry) * 100).toFixed(1) : '0.0'
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 15); // Show top 15 countries
    
    res.status(200).json({
      status: 'success',
      data: {
        locations: locationData,
        summary: {
          totalCustomers,
          customersWithCountry,
          customersWithoutCountry: totalCustomers - customersWithCountry
        }
      }
    });
  } catch (error) {
    next(new ApiError(error.message, 500));
  }
});

// @desc    Get user's posted products count
// @route   GET /api/v1/dashboard/my-products
// @access  Protected
exports.getMyProductsCount = asyncHandler(async (req, res, next) => {
  try {
    const userId = req.user.id;
    
    // Count products created by the current user
    const myProductsCount = await Product.countDocuments({ 
      creator: userId 
    });
    
    // Get some basic info about user's products
    const myProducts = await Product.find({ 
      creator: userId 
    })
    .select('title price imageCover createdAt')
    .sort({ createdAt: -1 })
    .limit(5);
    
    res.status(200).json({
      status: 'success',
      data: {
        count: myProductsCount,
        products: myProducts
      }
    });
  } catch (error) {
    next(new ApiError(error.message, 500));
  }
});
