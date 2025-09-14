
const ProductDetailsSection = ({ product, quantity, onIncrease, onDecrease }) => {
  if (!product) return null;

  const safeTitle = product.title || "";
  const safeDescription = product.description || "";
  const safeCreatorName = (product.creator && (product.creator.name || product.creator.username)) || "Unknown";
  const safeRatingsAvg = Number.isFinite(product.ratingsAverage) ? Math.round(product.ratingsAverage) : 0;
  const safeRatingsQty = Number.isFinite(product.ratingsQuantity) ? product.ratingsQuantity : 0;
  const safePrice = Number.isFinite(product.price) ? product.price : 0;
  const hasSale = Number.isFinite(product.salePrice);
  const safeSalePrice = hasSale ? product.salePrice : null;
  const safeStockStatus = product.stockStatus || "unknown";
  const safeWeight = Number.isFinite(product.weight) ? product.weight : 0;
  const dimensions = product.dimensions || {};
  const dimLength = Number.isFinite(dimensions.length) ? dimensions.length : null;
  const dimWidth = Number.isFinite(dimensions.width) ? dimensions.width : null;
  const dimHeight = Number.isFinite(dimensions.height) ? dimensions.height : null;
  const safeShippingClass = product.shippingClass || "standard";
  const safeQuantity = Number.isFinite(product.quantity) ? product.quantity : 0;
  const attributes = Array.isArray(product.attributes) ? product.attributes : [];
  const sizes = Array.isArray(product.sizes) ? product.sizes : [];
  const colors = Array.isArray(product.colors) ? product.colors : [];

  return (
    <div className="col-lg-7 pb-5">
      <h3 className="font-weight-semi-bold">{safeTitle}</h3>
      <small className="text-muted">Created by: {safeCreatorName}</small>
      <div className="mb-5">
        <div className="stars-wrapper">
          {"⭐".repeat(safeRatingsAvg)}
        </div>
        <small className="pt-1">({safeRatingsQty} Reviews)</small>
      </div>

      {/* Prix et promotion */}
      <h3 style={{ fontSize: "30px" }}>
        {hasSale ? (
          <>
            <span style={{ textDecoration: "line-through", color: "gray", marginRight: "10px" }}>
              ${safePrice}
            </span>
            ${safeSalePrice}
          </>
        ) : (
          `$${safePrice}`
        )}
      </h3>

      {/* Description du produit */}
      <p className="mb-4">{safeDescription}</p>

      {/* Statut du stock */}
      <div className="mb-4">
        <p>
          <strong style={{color:"#566573"}}>Stock Status:</strong>{" "}
          <span
            style={{
              color:
                product.stockStatus === "in-stock"
                  ? "green"
                  : product.stockStatus === "out-of-stock"
                  ? "red"
                  : "orange",
            }}
          >
            {safeStockStatus}
          </span>
        </p>
      </div>

      {/* Poids et dimensions */}
      <div className="mb-4 ">
        <p>
          <strong style={{color:"#566573"}}>Weight:</strong> {safeWeight} kg
        </p>
        {dimLength !== null && dimWidth !== null && dimHeight !== null ? (
          <p>
            <strong style={{color:"#566573"}}>Dimensions:</strong> {dimLength}cm (L) x {dimWidth}cm (W) x {dimHeight}cm (H)
          </p>
        ) : (
          <p>
            <strong style={{color:"#566573"}}>Dimensions:</strong> N/A
          </p>
        )}
      </div>

      {/* Classe d'expédition */}
      <div className="mb-4">
        <p>
          <strong style={{color:"#566573"}}>Shipping Class:</strong> {safeShippingClass}
        </p>
      </div>
        {/* Classe d'expédition */}
        <div className="mb-4">
        <p>
          <strong style={{color:"#566573"}}> quantity available in stock:</strong> {safeQuantity}
        </p>
      </div>

      {/* Attributs personnalisés */}
      {attributes.length > 0 && (
        <div className="mb-4">
          <h4 style={{color:"#566573"}}> <strong>Attributes :</strong> </h4>
          {attributes.map((attr, index) => (
            <div key={index}>
              <strong >{attr.name}:</strong> {attr.values.join(", ")}
            </div>
          ))}
        </div>
      )}

      {/* Note d'achat */}
      {product.purchaseNote && (
        <div className="mb-4">
          <h4> <span style={{color:"#566573"}}> <strong>Purchase Note :</strong></span> {product.purchaseNote} </h4>
          
        </div>
      )}

      {/* Tailles disponibles */}
      <div className="size-container m-2">
        <p className="size-label text-dark font-weight-medium mb-0 mr-3"> <span style={{color:"#566573",fontWeight:"20px"}} ><strong>Sizes:</strong></span></p>
        <form className="size-form">
          {sizes.length > 0 ? (
            sizes.map((size, index) => (
              <div key={index} className="size-option">
                <input
                  type="radio"
                  className="custom-control-input"
                  id={`size-${index}`}
                  name="size"
                />
                <label className="custom-control-label" htmlFor={`size-${index}`}>
                  {size}
                </label>
              </div>
            ))
          ) : (
            <p className="text-muted">No sizes available</p>
          )}
        </form>
      </div>

      {/* Couleurs disponibles */}
      <div className="size-container m-2">
        <p className="size-label text-dark font-weight-medium mb-0 mr-3" > <span style={{color:"#566573"}}><strong>Colors:</strong></span></p>
        <form className="size-form">
          {colors.length > 0 ? (
            colors.map((color, index) => (
              <div key={index} className="size-option">
                <input
                  type="radio"
                  className="custom-control-input"
                  id={`color-${index}`}
                  name="color"
                />
                <label className="custom-control-label" htmlFor={`color-${index}`}>
                  {color}
                </label>
              </div>
            ))
          ) : (
            <p className="text-muted">No colors available</p>
          )}
        </form>
      </div>

      {/* Sélecteur de quantité */}
      <div className="d-flex align-items-center justify-content-between mb-4 pt-2">
        <div className="d-flex align-items-center p-2 rounded" style={{ width: 200 }}>
          <button className="btn btn-primary btn-minus" onClick={onDecrease}>
            <i className="fa fa-minus" />
          </button>
          <input
            type="text"
            className="form-control bg-secondary text-center mx-2 p-2"
            style={{ width: 50 }}
            value={quantity}
            readOnly
          />
          <button className="btn btn-primary btn-plus" style={{ marginLeft: "1px" }} onClick={onIncrease}>
            <i className="fa fa-plus" />
          </button>
        </div>
        <div>
          <button className="btn btn-primary" style={{ height: "60px", width: "100px" }}>
            <i className="fa fa-shopping-cart mr-1" /> Add To Cart
          </button>
        </div>
      </div>

      {/* Boutons de partage */}
      <div className="size-container m-2">
        <p className="text-dark font-weight-medium mb-0 mr-4">Share on:</p>
        <div className="d-inline-flex">
          <a className="text-dark px-2" href="https://www.facebook.com/">
            <i className="fab fa-facebook-f" />
          </a>
          <a className="text-dark px-2" href="https://x.com/">
            <i className="fab fa-twitter" />
          </a>
          <a className="text-dark px-2" href="https://fr.linkedin.com/">
            <i className="fab fa-linkedin-in" />
          </a>
          <a className="text-dark px-2" href="https://fr.pinterest.com/">
            <i className="fab fa-pinterest" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsSection;