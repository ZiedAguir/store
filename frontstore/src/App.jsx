
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PageStore from "./pages/pageStore/pageStore";
import Register from "./pages/register/register";
import Login from "./pages/login/login";
import RecoverPassword from "./pages/recoverpassword/recoverpassword";
import LockedScreen from "./pages/lockedpage/LockedScreen";
import UserProfil from "./pages/userProfil/userProfil";
import Pages_400 from "./pages/page404/page404";
import Pages_500 from "./pages/page500/page500";
import InvoicePage from "./pages/InvoicePage/pageInvoice";
import InvoicePrint from "./componnent/invoicePrint/invoicePrint";
import MapsBasic from "./pages/MapsPage/mapsBasic";
import ListProducts from "./pages/PageProduct/ListProductPage/ListProducts";
import FormProducts from "./pages/PageProduct/FormProductPage/FormProduct";
import ListCategories from "./pages/CategoryPages/listCategories";
import FormCategory from "./pages/CategoryPages/formCategories";
import CouponList from "./pages/CouponPage/couponList";
import CouponForm from "./pages/CouponPage/couponForm";
import OrderList from "./pages/OrdersPages/OrderList";
import CustomersList from "./pages/CustomersPages/customersList";
import CustomersForm from "./pages/CustomersPages/customersForm";
import Footer from "./componnent/Footer/footer";
import AboutUsPage from "./pages/aboutUs/homeAboutUs";
import HeaderStore from "./componnent/Header/headerStore";
import FQAPage from "./pages/FQApage/homeFQA";
import Step1 from "./pages/CreationSiteVitrine/pagesVitrine/step1";
import Step2 from "./pages/CreationSiteVitrine/pagesVitrine/step2";
import Step3 from "./pages/CreationSiteVitrine/pagesVitrine/step3";
import SummaryPage from "./pages/CreationSiteVitrine/pagesVitrine/summaryPage";
import AppRoutes from "./pages/CreationSiteVitrine/AppRoutes/appRoutes";
import HomeProduct from "./pages/PageProduct/HomeProductPage/HomeProduct";
import ContactPage from "./pages/ContactPage/homecontact";
import HomeTestimonial from "./pages/TestiMonial/homeTestiMonial";
import HomeOrderPage from "./pages/OrdersPages/HomeOrderPage/homeOrderPage";
import OrderForm from "./pages/OrdersPages/orderForm";
import HomeCategories from "./pages/CategoryPages/HomePageCategories/homeCategories";
import Step4 from "./pages/CreationSiteVitrine/pagesVitrine/step4/step4";
import Dashbord from "./pages/Dashbord/dashbord";
import NewProducts from "./pages/Dashbord/newProducts";
import MyProductsStatus from "./pages/Dashbord/myProductsStatus";
import ReportsPage from "./pages/Admin/reports";
import MyReportsPage from "./pages/User/myReports";
import HomeStore from "./pages/HomeStore/homeStore";
import VerifyMfa from "./pages/VerifyMfa/VerifyMfa";
import VerifyResetCode from "./pages/VerifyResetCode/verifyResetCode";
import ResetPassword from "./pages/resetPassword/resetPassword";
import PersonalInformation from "./pages/userProfil/ComponentsUserProfil/personalInformation";
import Checkout from "./pages/PaymentPage/checkout";
import Cart from "./pages/Cart/cart";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
// Initialize Stripe with your publishable key
const stripePromise = loadStripe("pk_test_51OqxXjD43yl7fXAHrXqKZE39o06Q8rW6VtM4owHdf1H84JkS8GOY67oe2PuiYEyyAe8DqNIlAnwErK0o7R36xUpX00SYXwFlgD");
function App() {
  const router = createBrowserRouter([

   
    {
      
      path: "/",
      element: <HomeStore/>,
    },
    {
      path: "/my-products-status",
      element: <MyProductsStatus />,
    },
    {
      path: "/admin/reports",
      element: <ReportsPage />,
    },
    {
      path: "/my-reports",
      element: <MyReportsPage />,
    },
    {
      path: "/admin/new-products",
      element: <NewProducts />,
    },
    {
      path:"/dashbordpage",
      element:<Dashbord/>
    },
    {
      path: "/homepage",
      element: <PageStore/>,
    },
    {
      path: "/contactuspage",
      element: <ContactPage />,
    },
    {
      path: "/aboutuspage",
      element: <AboutUsPage />,
    },
    {
      path: "/faqpage",
      element: <FQAPage />,
    },
    {
      path: "/AppRoutes",
      element: <AppRoutes />,
    },
    {
      path: "/testimonialpage",
      element: <HomeTestimonial />,
    },
    {
      path: "/orderspage",
      element: <HomeOrderPage />,
    },
    {
      path: "/Footer",
      element: <Footer />,
    },
    {
      path: "/headerStore",
      element: <HeaderStore />,
    },
    {
      path: "/RecoverPassword",
      element: <RecoverPassword />,
    },
    {
      path:"/verifyResetCode",
      element:<VerifyResetCode/>
    },
    {
      path:"/resetPassword",
      element:<ResetPassword/>
    },
    {
      path: "/LockedScreen",
      element: <LockedScreen />,
    },
    {
      path: "/Page_400",
      element: <Pages_400 />,
    },
    {
      path: "/Page_500",
      element: <Pages_500 />,
    },
    {
      path: "/InvoicePage",
      element: <InvoicePage />,
    },
    {
      path: "/InvoicePrint",
      element: <InvoicePrint />,
    },
    {
      path: "/MapsBasic",
      element: <MapsBasic />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/verify-mfa",
      element:<VerifyMfa/>
    },
    {
      path: "/UserProfil",
      element: (
        <>
          <UserProfil />
        </>
      ),
    },
    {
      path: "/profile/update",
      element: <PersonalInformation />,
    },
    {
      path: "/productpage",
      element: <HomeProduct />,
    },
    {
      path: "categoriespage",
      element: <HomeCategories />,
    },
    {
      path: "/ListProducts",
      element: <ListProducts />,
    },
    {
      path: "/ListCategories",
      element: <ListCategories />,
    },
    {
      path: "/CouponList",
      element: <CouponList />,
    },
    {
      path: "/OrderList",
      element: <OrderList />,
    },
    {
      path: "/CustomersList",
      element: <CustomersList />,
    },
    {
      path: "/CustomersForm",
      element: <CustomersForm />,
    },
    {
      path: "/OrderForm",
      element: <OrderForm />,
    },
    {
      path: "/CouponForm",
      element: <CouponForm />,
    },
    {
      path: "/FormCategory",
      element: <FormCategory />,
    },
    {
      path: "/FormProducts",
      element: <FormProducts />,
    },
    {
      path: "/edit-product/:id",
      element: <FormProducts />,
    },

    {
      path: "/step1",
      element: <Step1 />,
    },
    {
      path: "/step2",
      element: <Step2 />,
    },
    {
      path: "/step3",
      element: <Step3 />,
    },
    {
      path: "/step4",
      element: <Step4 />,
    },
    {
      path: "/summaryPage",
      element: <SummaryPage />,
    },
    {
      path:"/checkout",
      element:<Checkout/>
    },
    {
      path: "/cart",
      element: (
        <Elements stripe={stripePromise}>
          <Cart />
        </Elements>
      ),
    },
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
