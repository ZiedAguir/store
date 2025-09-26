require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const compression = require('compression'); 
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const cors = require('cors'); 
const ApiError = require('./utils/apiError');
const globalErrorHandler = require('./Middleware/eroroMidelWare');
const dbConnection = require('./config/db');
const mountRoutes = require('./Routes/index');
const hpp = require('hpp');
//const path = require('path');
// Ensure models with virtual/populate refs are registered
require('./Models/ReviewUser/reviewUser');

// Connect to DB
dbConnection();

// Initialize app
const app = express();

// Trust proxy for Render deployment
app.set('trust proxy', 1);

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(helmet()); 
// Limit each IP to 100 requests per `window` (here, per 15 minutes)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10000,
  message:
    'Too many accounts created from this IP, please try again after an hour',
});
// Apply the rate limiting middleware to all requests
app.use('/api', limiter);

// Middleware to protect against HTTP Parameter Pollution attacks
app.use(
  hpp({
    whitelist: [
      'price',
      'sold',
      'quantity',
      'ratingsAverage',
      'ratingsQuantity',
    ],
  })
);

// Middlewares
app.use(express.json({ limit: '20kb' }));


// Configuration CORS pour résoudre le problème
app.use((req, res, next) => {
  const origin = req.headers.origin;
  const allowedOrigins = [
    process.env.CLIENT_URL,
    "https://store-commerce-3h7onvp52-ziedaguirs-projects.vercel.app",
    "https://store-commerce-mt0xs5bvn-ziedaguirs-projects.vercel.app",
    "https://store-commerce-2myotrzpx-ziedaguirs-projects.vercel.app",
    "http://localhost:3000",
    "http://localhost:5173"
  ];
  
  // Debug logging
  console.log('CORS Debug - Origin:', origin);
  console.log('CORS Debug - Allowed Origins:', allowedOrigins);
  console.log('CORS Debug - Method:', req.method);
  console.log('CORS Debug - URL:', req.url);
  
  // When credentials is true, we cannot use wildcard (*) for origin
  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', 'true');
    console.log('CORS Debug - Allowed with credentials');
  } else if (origin) {
    // For development, allow any origin but with credentials
    if (process.env.NODE_ENV === 'development') {
      res.header('Access-Control-Allow-Origin', origin);
      res.header('Access-Control-Allow-Credentials', 'true');
      console.log('CORS Debug - Development mode: Allowed with credentials for origin:', origin);
    } else {
      // For production, allow but without credentials
      res.header('Access-Control-Allow-Origin', origin);
      res.header('Access-Control-Allow-Credentials', 'false');
      console.log('CORS Debug - Production: Allowed without credentials for origin:', origin);
    }
  } else {
    // Fallback for requests without origin header
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'false');
    console.log('CORS Debug - No origin header, using wildcard');
  }
  
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  if (req.method === 'OPTIONS') {
    console.log('CORS Debug - Handling OPTIONS preflight request');
    res.sendStatus(200);
  } else {
    next();
  }
});

// CORS géré par le middleware personnalisé ci-dessus

app.use(
  cors({
    origin: function (origin, callback) {
      const allowedOrigins = [
        process.env.CLIENT_URL,
        "https://store-commerce-3h7onvp52-ziedaguirs-projects.vercel.app",
        "https://store-commerce-mt0xs5bvn-ziedaguirs-projects.vercel.app",
        "https://store-commerce-2myotrzpx-ziedaguirs-projects.vercel.app",
        "http://localhost:3000",
        "http://localhost:5173"
      ];
      
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      
      // For development, allow any localhost origin
      if (process.env.NODE_ENV === 'development' && origin && origin.includes('localhost')) {
        return callback(null, true);
      }
      
      callback(new Error('Not allowed by CORS'));
    },
    credentials: true, 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'], 
  })
);

// Gère les requêtes preflight (OPTIONS)
app.options('*', cors({
  origin: function (origin, callback) {
    const allowedOrigins = [
      process.env.CLIENT_URL,
      "https://store-commerce-3h7onvp52-ziedaguirs-projects.vercel.app",
      "https://store-commerce-mt0xs5bvn-ziedaguirs-projects.vercel.app",
      "https://store-commerce-2myotrzpx-ziedaguirs-projects.vercel.app",
      "http://localhost:3000",
      "http://localhost:5173"
    ];
    
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    
    // For development, allow any localhost origin
    if (process.env.NODE_ENV === 'development' && origin && origin.includes('localhost')) {
      return callback(null, true);
    }
    
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS']
}));


// compress all responses
app.use(compression());

// Log requests in development mode
if (process.env.NODE_ENV=== 'development') {
  app.use(morgan('dev')); 
  console.log(`mode: ${process.env.NODE_ENV}`);
}

// Mount Routes
mountRoutes(app);

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'E-commerce API is running!',
    version: '1.0.0',
    status: 'success',
    endpoints: {
      products: '/api/v1/products',
      users: '/api/v1/users',
      auth: '/api/v1/auth',
      categories: '/api/v1/categories',
      orders: '/api/v1/orders',
      cart: '/api/v1/cart',
      brands: '/api/v1/brands',
      coupons: '/api/v1/coupons',
      dashboard: '/api/v1/dashboard',
      reports: '/api/v1/reports',
      contact: '/api/v1/contact'
    }
  });
});

// Simple ping route (test Render easily)
app.get('/ping', (req, res) => {
  res.json({ 
    status: 'ok', 
    time: new Date().toISOString(),
    message: 'Server is running successfully!'
  });
});

// Health check route
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Gestion des routes non trouvées:
app.all('*', (req, res, next) => {
  next(new ApiError(`Can't find this route: ${req.originalUrl}`, 404));
});

// Global Error Handling
app.use(globalErrorHandler);


// Start server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);

// Handle rejection outside express
process.on('unhandledRejection', (err) => {
  console.error(`UnhandledRejection Errors: ${err.name} | ${err.message}`);
  server.close(() => {
    console.error(`Shutting down....`);
    process.exit(1);
  });
});
