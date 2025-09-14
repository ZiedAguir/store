
  
  const pagesConfig = {
    Home: ["HeaderStore", "CompanyInformation","Slider", "LatestNews", "Template", "Latest News","footer"], 
    Product: ["Header","ListProduct", "showReviews", "CartShoping", "footer"],
    Categories: ["Header","ListCategories", "FormCategories", "footer"],
    AboutUs: ["Header","CompanyInfo", "TeamInfo", "Mission&Vision", "CompanyHistory", "footer"],
    FAQ: ["Header","Questions","TeamInfo","footer"],
    ContactUs: ["Header","ContactForm", "LocationMap", "SocialMediaLinks", "footer"],
    Orders: ["Header","orderform","orderList", "footer"],
    Testimonial: ["Header","CustomerFeedback", "VideoTestimonials", "footer"],
  };
 
  // Génération de la configuration des options pour chaque page de manière dynamique
  const fieldsConfigStep3 = Object.entries(pagesConfig).map(([pageName, options]) => ({
    pageName,
    pageLabel: pageName, 
    options: options.map((option) => ({
      key: option.replace(/\s+/g, ""), 
      label: ` ${option}`, 
    })),
  }));
  
  export default fieldsConfigStep3;
  
  

  
  