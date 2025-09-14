import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../../componnent/Header/headerprofil";
import SideBar from "../../../componnent/SideBare/sideBare";
import DetailProduct from "./FormComponent/detailProduct";
import { useNavigate, useParams } from "react-router-dom";
import GeneralInfo from "./FormComponent/generalInfo";
import ImageForm from "./FormComponent/imageForm";
import { addProduct, deleteProduct, updateProduct } from "../../../Redux/Action/productActions";
import apiRequest from "../../../componnent/axios/axiosInstance";

function FormProducts() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { products } = useSelector((state) => state.product);
  const isEditMode = !!id;

  const productToEdit = Array.isArray(products) ? products.find((product) => product._id === id) : null;

  const [formData, setFormData] = useState(
    productToEdit || {
      title: "",
      description: "",
      price: 0,
      priceAfterDiscount: 0,
      sku: "",
      stockStatus: "in-stock",
      weight: 0,
      dimensions: { length: 0, width: 0, height: 0 },
      shippingClass: "no-shipping-class",
      sizes: [],
      colors: [],
      images: [],
      imageCover: "",
      purchaseNote: "",
      menuOrder: 0,
      quantity: 0,
      ratingsQuantity: 0,
      ratingsAverage: 0,
      category: "",
    }
  );

  const [inputSizes, setInputSizes] = useState("");
  const [inputColors, setInputColors] = useState("");

  // Price validation state
  const [priceErrors, setPriceErrors] = useState({
    price: "",
    priceAfterDiscount: "",
    general: ""
  });

  // Rating validation state
  const [ratingErrors, setRatingErrors] = useState({
    ratingsAverage: "",
    ratingsQuantity: ""
  });
  const [generalErrors, setGeneralErrors] = useState([]);

  // Price validation function
  const validatePrices = (price, priceAfterDiscount) => {
    const errors = {};
    
    // Check if prices are negative
    if (price < 0) {
      errors.price = "Price cannot be negative";
    }
    
    if (priceAfterDiscount < 0) {
      errors.priceAfterDiscount = "Price after discount cannot be negative";
    }
    
    // Check if main price is 0 or empty when discount price is set
    if (priceAfterDiscount > 0 && (price === 0 || price === "")) {
      errors.price = "Main price is required when setting discount price";
    }
    
    // Check if main price is bigger than discount price
    if (priceAfterDiscount > 0 && price > 0 && price <= priceAfterDiscount) {
      errors.general = "Main price must be bigger than price after discount";
    }
    
    // Check if main price is too low (minimum $0.01)
    if (price > 0 && price < 0.01) {
      errors.price = "Price must be at least $0.01";
    }
    
    return errors;
  };

  // Rating validation function
  const validateRatings = (ratingsAverage, ratingsQuantity) => {
    const errors = {};
    
    // Check if ratings average is between 0 and 5
    if (ratingsAverage < 0 || ratingsAverage > 5) {
      errors.ratingsAverage = "Rating average must be between 0 and 5";
    }
    
    // Check if ratings quantity is not negative
    if (ratingsQuantity < 0) {
      errors.ratingsQuantity = "Rating quantity cannot be negative";
    }
    
    // Check if ratings average has decimal places (should be 0.1 to 5.0)
    if (ratingsAverage > 0 && ratingsAverage < 5) {
      const decimalPlaces = (ratingsAverage.toString().split('.')[1] || '').length;
      if (decimalPlaces > 1) {
        errors.ratingsAverage = "Rating average can have maximum 1 decimal place (e.g., 4.5)";
      }
    }
    
    return errors;
  };

  // Clear validation errors when form data changes (e.g., switching between add/edit mode)
  useEffect(() => {
    setPriceErrors({
      price: "",
      priceAfterDiscount: "",
      general: ""
    });
    setRatingErrors({
      ratingsAverage: "",
      ratingsQuantity: ""
    });
  }, [isEditMode]);

  // Load product when entering edit mode directly via URL (if not found in Redux)
  useEffect(() => {
    const loadProductById = async () => {
      try {
        const res = await apiRequest.get(`/products/${id}`);
        const data = res.data?.data || {};
        const parsedDimensions = typeof data.dimensions === "string" ? (() => { try { return JSON.parse(data.dimensions); } catch { return { length: 0, width: 0, height: 0 }; } })() : data.dimensions;
        setFormData((prev) => ({
          ...prev,
          ...data,
          weight: typeof data.weight === "number" ? data.weight : 0,
          dimensions: parsedDimensions || { length: 0, width: 0, height: 0 },
          sizes: Array.isArray(data.sizes) ? data.sizes : [],
          colors: Array.isArray(data.colors) ? data.colors : [],
          // Keep imageCover URL; reset images to empty array for new uploads
          images: [],
        }));
      } catch (error) {
        console.error("Failed to load product by id:", error);
      }
    };

    if (isEditMode && !productToEdit && id) {
      loadProductById();
    }
  }, [isEditMode, id, productToEdit]);

  // When product appears in Redux later, sync it to the form
  useEffect(() => {
    if (isEditMode && productToEdit) {
      const parsedDimensions = typeof productToEdit.dimensions === "string" ? (() => { try { return JSON.parse(productToEdit.dimensions); } catch { return { length: 0, width: 0, height: 0 }; } })() : productToEdit.dimensions;
      setFormData({
        ...productToEdit,
        weight: typeof productToEdit.weight === "number" ? productToEdit.weight : 0,
        dimensions: parsedDimensions || { length: 0, width: 0, height: 0 },
        sizes: Array.isArray(productToEdit.sizes) ? productToEdit.sizes : [],
        colors: Array.isArray(productToEdit.colors) ? productToEdit.colors : [],
      });
    }
  }, [isEditMode, productToEdit]);

  // Gérer les changements dans les champs du formulaire
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "sizes") {
      setInputSizes(value); 
    } else if (name === "colors") {
      setInputColors(value); 
    } else {
      // Prevent negative values for price fields
      if ((name === "price" || name === "priceAfterDiscount") && parseFloat(value) < 0) {
        return; // Don't update the form data if negative
      }
      
      // Prevent invalid values for rating fields
      if (name === "ratingsAverage") {
        const ratingValue = parseFloat(value);
        if (ratingValue < 0 || ratingValue > 5) {
          return; // Don't update if out of range
        }
      }
      
      if (name === "ratingsQuantity") {
        const quantityValue = parseInt(value);
        if (quantityValue < 0) {
          return; // Don't update if negative
        }
      }
      
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
      
      // Validate prices when price fields change
      if (name === "price" || name === "priceAfterDiscount") {
        const newPrice = name === "price" ? parseFloat(value) || 0 : formData.price;
        const newPriceAfterDiscount = name === "priceAfterDiscount" ? parseFloat(value) || 0 : formData.priceAfterDiscount;
        
        const validationErrors = validatePrices(newPrice, newPriceAfterDiscount);
        setPriceErrors(validationErrors);
      }
      
      // Validate ratings when rating fields change
      if (name === "ratingsAverage" || name === "ratingsQuantity") {
        const newRatingsAverage = name === "ratingsAverage" ? parseFloat(value) || 0 : formData.ratingsAverage;
        const newRatingsQuantity = name === "ratingsQuantity" ? parseInt(value) || 0 : formData.ratingsQuantity;
        
        const validationErrors = validateRatings(newRatingsAverage, newRatingsQuantity);
        setRatingErrors(validationErrors);
      }
    }
  };

  const handleInputBlur = (e) => {
    const { name, value } = e.target;

    if (name === "sizes") {
      const newSizes = value
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item !== ""); 
      setFormData((prev) => ({
        ...prev,
        sizes: [...new Set([...(Array.isArray(prev.sizes) ? prev.sizes : []), ...newSizes])], 
      }));
      setInputSizes("");
    } else if (name === "colors") {
      const newColors = value
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item !== ""); 
      setFormData((prev) => ({
        ...prev,
        colors: [...new Set([...(Array.isArray(prev.colors) ? prev.colors : []), ...newColors])], 
      }));
      setInputColors(""); 
    }
  };

  const handleNestedInputChange = (e) => {
    const { name, value } = e.target;
    const [parent, child] = name.split(".");
    setFormData((prev) => ({
      ...prev,
      [parent]: { ...prev[parent], [child]: value },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic required field validation to avoid 400 from backend
    const genErr = [];
    if (!formData.title || String(formData.title).trim().length < 3) {
      genErr.push("Title is required (min 3 characters)");
    }
    if (!formData.description || String(formData.description).trim().length < 20) {
      genErr.push("Description is required (min 20 characters)");
    }
    if (!formData.category || !/^[a-f\d]{24}$/i.test(String(formData.category))) {
      genErr.push("Valid category is required");
    }
    const priceNum = parseFloat(formData.price) || 0;
    const priceAfterNum = parseFloat(formData.priceAfterDiscount) || 0;
    const qtyNum = parseInt(formData.quantity) || 0;
    if (priceNum <= 0) genErr.push("Price must be greater than 0");
    if (qtyNum <= 0) genErr.push("Quantity must be greater than 0");
    if (priceAfterNum > 0 && priceAfterNum >= priceNum) genErr.push("Price after discount must be less than price");
    setGeneralErrors(genErr);
    if (genErr.length > 0) {
      const firstErrorElement = document.querySelector('.alert-danger');
      if (firstErrorElement) firstErrorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    // Validate prices before submission
    const priceValidationErrors = validatePrices(formData.price, formData.priceAfterDiscount);
    if (priceValidationErrors.price || priceValidationErrors.priceAfterDiscount || priceValidationErrors.general) {
      setPriceErrors(priceValidationErrors);
      // Scroll to the first error
      const firstErrorElement = document.querySelector('.alert-danger');
      if (firstErrorElement) {
        firstErrorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return; // Prevent form submission
    }
    
    // Validate ratings before submission
    const ratingValidationErrors = validateRatings(formData.ratingsAverage, formData.ratingsQuantity);
    if (ratingValidationErrors.ratingsAverage || ratingValidationErrors.ratingsQuantity) {
      setRatingErrors(ratingValidationErrors);
      // Scroll to the first error
      const firstErrorElement = document.querySelector('.alert-danger');
      if (firstErrorElement) {
        firstErrorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return; // Prevent form submission
    }
  
    const formDataToSend = new FormData();
  
    for (const key in formData) {
      if (key === "dimensions") {
        formDataToSend.append(key, JSON.stringify(formData[key]));
      } else if (Array.isArray(formData[key]) && key !== "images") {
        // Handle arrays like sizes, colors - append as individual items
        formData[key].forEach((item, index) => {
          formDataToSend.append(`${key}[${index}]`, item);
        });
      } else if (key === "imageCover") {
        // Handle single image cover file
        if (formData[key] instanceof File) {
          formDataToSend.append(key, formData[key]);
        }
      } else if (key === "images") {
        // Handle multiple images - append each file with the same field name
        if (Array.isArray(formData[key])) {
          formData[key].forEach((file) => {
            if (file instanceof File) {
              formDataToSend.append(key, file);
            }
          });
        }
      } else {
        formDataToSend.append(key, formData[key]); 
      }
    }
  
    for (let [key, value] of formDataToSend.entries()) {
      console.log(key, value);
    }
  
    if (isEditMode) {
      dispatch(updateProduct(id, formDataToSend))
        .unwrap()
        .then(() => navigate("/ListProducts"))
        .catch((error) => console.error("Update failed:", error));
    } else {
      dispatch(addProduct(formDataToSend))
        .unwrap()
        .then(() => navigate("/ListProducts"))
        .catch((error) => console.error("Add failed:", error));
    }
  };

  const handleDelete = () => {
    if (isEditMode) {
      dispatch(deleteProduct(id))
        .unwrap()
        .then(() => navigate("/ListProducts"))
        .catch((error) => console.error("Delete failed:", error));
    }
  };

  return (
    <section className="body">
      <Header />
      <div className="inner-wrapper">
        <aside id="sidebar-left" className="sidebar-left">
          <div className="sidebar-header">
            <SideBar />
          </div>
        </aside>

        <section role="main" className="content-body content-body-modern mt-0">
          <header className="page-header page-header-left-inline-breadcrumb">
          
            <h2 className="font-weight-bold text-6">
              {isEditMode ? "Edit Product" : "Add Product"}
            </h2>
            <div className="right-wrapper">
              <ol className="breadcrumbs">
                <li>
                  <span>Home</span>
                </li>
                <li>
                  <span>eCommerce</span>
                </li>
                <li>
                  <span>Products</span>
                </li>
              </ol>
            </div>
            <button className="checkout-back btn btn-light btn-sm me-2" onClick={() => navigate(-1)} title="Retour">
              <i className="fas fa-arrow-left" />
            </button>
          </header>
          {/* Validation Summary */}
          {(priceErrors.price || priceErrors.priceAfterDiscount || priceErrors.general || 
            ratingErrors.ratingsAverage || ratingErrors.ratingsQuantity || (generalErrors && generalErrors.length > 0)) && (
            <div className="alert alert-danger mb-4">
              <h6 className="alert-heading">
                <i className="fas fa-exclamation-triangle me-2"></i>
                Please fix the following validation errors:
              </h6>
              <ul className="mb-0 mt-2">
                {generalErrors && generalErrors.map((err, idx) => (<li key={`gen-${idx}`}>{err}</li>))}
                {priceErrors.price && <li>{priceErrors.price}</li>}
                {priceErrors.priceAfterDiscount && <li>{priceErrors.priceAfterDiscount}</li>}
                {priceErrors.general && <li>{priceErrors.general}</li>}
                {ratingErrors.ratingsAverage && <li>{ratingErrors.ratingsAverage}</li>}
                {ratingErrors.ratingsQuantity && <li>{ratingErrors.ratingsQuantity}</li>}
              </ul>
            </div>
          )}

          <form
            className="ecommerce-form action-buttons-fixed"
            onSubmit={handleSubmit}
            style={{ cursor: "pointer" }}
          >
            <GeneralInfo formData={formData} handleInputChange={handleInputChange} />
            <ImageForm formData={formData} handleInputChange={handleInputChange} />
            <DetailProduct
              formData={formData}
              onInputChange={handleInputChange}
              onNestedInputChange={handleNestedInputChange}
              inputSizes={inputSizes}
              inputColors={inputColors}
              handleInputBlur={handleInputBlur}
              priceErrors={priceErrors}
              ratingErrors={ratingErrors}
            />

            <div className="row action-buttons">
              <div className="col-12 col-md-auto">
                <button
                  type="submit"
                  className="submit-button btn btn-primary btn-px-4 py-3 d-flex align-items-center font-weight-semibold line-height-1"
                >
                  <i className="bx bx-save text-4 me-2" />{" "}
                  {isEditMode ? "Update Product" : "Save Product"}
                </button>
              </div>
              <div className="col-12 col-md-auto px-md-0 mt-3 mt-md-0">
                <a
                  href="/ListProducts"
                  className="cancel-button btn btn-light btn-px-4 py-3 border font-weight-semibold text-color-dark text-3"
                >
                  Cancel
                </a>
              </div>
              {isEditMode && (
                <div className="col-12 col-md-auto ms-md-auto mt-3 mt-md-0 ms-auto">
                  <button
                    type="button"
                    onClick={handleDelete}
                    className="delete-button btn btn-danger btn-px-4 py-3 d-flex align-items-center font-weight-semibold line-height-1"
                  >
                    <i className="bx bx-trash text-4 me-2" /> Delete Product
                  </button>
                </div>
              )}
            </div>
          </form>
        </section>
      </div>
    </section>
    
  );
}

export default FormProducts;