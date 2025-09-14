import { useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { FormContext } from "../../../componnent/context/AuthContext";
import AboutUsPage from "../../aboutUs/homeAboutUs";
import FQAPage from "../../FQApage/homeFQA";
import HomeProduct from "../../PageProduct/HomeProductPage/HomeProduct";
import ContactPage from "../../ContactPage/homecontact";
import HomeOrderPage from "../../OrdersPages/HomeOrderPage/homeOrderPage";
import HomeCategories from "../../CategoryPages/HomePageCategories/homeCategories";
import PageStore from "../../pageStore/pageStore";

function AppRoutes() {
  const { formData } = useContext(FormContext);
  const [selectedPages, setSelectedPages] = useState([]);

  // Set selected pages from formData
  useEffect(() => {
    if (formData?.step3?.selectedPages) {
      setSelectedPages(formData.step3.selectedPages);
    }
  }, [formData]);

  const pageComponents = {
    faq: FQAPage,
    aboutUs: AboutUsPage,
    contactUs: ContactPage,
    product: HomeProduct,
    orders: HomeOrderPage,
   Categories : HomeCategories,
   home: PageStore
    

  };

  return (
    <Router>
      <Routes>
        {/* Render only the selected pages */}
        {selectedPages.map((page) => {
          const Component = pageComponents[page.toLowerCase()];
          return (
            <Route
              key={page}
              path={`/${page.toLowerCase()}page`}
              element={<Component />}
            />
          );
        })}
      </Routes>
    </Router>
  );
}

export default AppRoutes;
