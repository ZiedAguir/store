const InventoryTab = ({ formData, handleInputChange }) => {
  return (
    <div className="tab-pane fade" id="inventory" role="tabpanel" aria-labelledby="inventory-tab">
      <div className="form-group row align-items-center pb-3">
        <label className="col-lg-5 col-xl-3 control-label text-lg-end mb-0">
          Stock Status
        </label>
        <div className="col-lg-7 col-xl-6">
          <select
            className="form-control form-control-modern"
            name="stockStatus"
            value={formData.stockStatus}
            onChange={handleInputChange}
          >
            <option value="in-stock">In Stock</option>
            <option value="out-of-stock">Out of Stock</option>
            <option value="on-backorder">on-backorder</option>
          </select>
        </div>
      </div>
      <div className="form-group row align-items-center">
        <label className="col-lg-5 col-xl-3 control-label text-lg-end mb-0">
          Quantity
        </label>
        <div className="col-lg-7 col-xl-6">
          <input
            type="number"
            className="form-control form-control-modern"
            name="quantity"
            value={formData.quantity}
            onChange={handleInputChange}
          />
        </div>
      </div>
    </div>
  );
};

export default InventoryTab;