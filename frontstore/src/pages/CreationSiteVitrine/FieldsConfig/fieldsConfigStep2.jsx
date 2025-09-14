

const fieldsConfigStep2 = {
    logo: { label: "Logo", type: "file", required: true, accept: "image/*" },
    slogan: { label: "Slogan", type: "text", placeholder: "Your business slogan" },
    description: { label: "Description", type: "textarea", rows: 4, placeholder: "Brief description about your business" },
    column: { label: "Column", type: "number", placeholder: "Number of columns", required: true },
    domain: { label: "Domain", type: "text", placeholder: "Domain name", required: true }
  };
  
  export default fieldsConfigStep2;
  