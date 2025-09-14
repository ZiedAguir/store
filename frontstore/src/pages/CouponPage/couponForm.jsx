import Header from "../../componnent/Header/headerprofil";
import SideBar from "../../componnent/SideBare/sideBare";

function CouponForm() {
  return (
    <section className="body">
      {/* start: header */}
      <Header />
      {/* end: header */}
      <div className="inner-wrapper">
        {/* start: sidebar */}
        <aside id="sidebar-left" className="sidebar-left">
          <div className="sidebar-header">
            <SideBar />
          </div>
        </aside>
        {/* end: sidebar */}
        <section role="main" className="content-body content-body-modern mt-0">
          <header className="page-header page-header-left-inline-breadcrumb">
            <h2 className="font-weight-bold text-6">Coupon</h2>
            <div className="right-wrapper">
              <ol className="breadcrumbs">
                <li>
                  <span>Home</span>
                </li>
                <li>
                  <span>eCommerce</span>
                </li>
                <li>
                  <span>Coupons</span>
                </li>
              </ol>
            </div>
          </header>
          {/* start: page */}
          <form
            className="ecommerce-form action-buttons-fixed"
            action="#"
            method="post"
          >
            <div className="row">
              <div className="col">
                <section className="card card-modern card-big-info">
                  <div className="card-body">
                    <div className="tabs-modern row" style={{ minHeight: 490 }}>
                      <div className="col-lg-2-5 col-xl-1-5">
                        <div
                          className="nav flex-column"
                          id="tab"
                          role="tablist"
                          aria-orientation="vertical"
                        >
                          <a
                            className="nav-link active"
                            id="general-tab"
                            data-bs-toggle="pill"
                            data-bs-target="#general"
                            role="tab"
                            aria-controls="general"
                            aria-selected="true"
                          >
                            <i className="bx bx-cog me-2" /> General
                          </a>
                          <a
                            className="nav-link"
                            id="usage-restriction-tab"
                            data-bs-toggle="pill"
                            data-bs-target="#usage-restriction"
                            role="tab"
                            aria-controls="usage-restriction"
                            aria-selected="false"
                          >
                            <i className="bx bx-block me-2" /> Usage Restriction
                          </a>
                          <a
                            className="nav-link"
                            id="usage-limits-tab"
                            data-bs-toggle="pill"
                            data-bs-target="#usage-limits"
                            role="tab"
                            aria-controls="usage-limits"
                            aria-selected="false"
                          >
                            <i className="bx bx-timer me-2" /> Usage Limits
                          </a>
                        </div>
                      </div>
                      <div className="col-lg-3-5 col-xl-4-5">
                        <div className="tab-content" id="tabContent">
                          <div
                            className="tab-pane fade show active"
                            id="general"
                            role="tabpanel"
                            aria-labelledby="general-tab"
                          >
                            <div className="form-group row align-items-center pb-3">
                              <label className="col-lg-5 col-xl-3 control-label text-lg-end mb-0">
                                Coupon Name
                              </label>
                              <div className="col-lg-7 col-xl-6">
                                <input
                                  type="text"
                                  className="form-control form-control-modern"
                                  name="couponName"
                                  defaultValue
                                  required
                                />
                              </div>
                            </div>
                            <div className="form-group row align-items-center pb-3">
                              <label className="col-lg-5 col-xl-3 control-label text-lg-end mb-0">
                                Discount Type
                              </label>
                              <div className="col-lg-7 col-xl-6">
                                <select
                                  className="form-control form-control-modern"
                                  name="stockStatus"
                                >
                                  <option value="percentage" selected>
                                    Percentage Discount
                                  </option>
                                  <option value="fixed-cart">
                                    Fixed Cart Discount
                                  </option>
                                  <option value="fixed-product">
                                    Fixed Product Discount
                                  </option>
                                </select>
                              </div>
                            </div>
                            <div className="form-group row align-items-center pb-3">
                              <label className="col-lg-5 col-xl-3 control-label text-lg-end mb-0">
                                Coupon Amount
                              </label>
                              <div className="col-lg-7 col-xl-6">
                                <input
                                  type="text"
                                  className="form-control form-control-modern"
                                  name="couponAmount"
                                  defaultValue
                                  required
                                />
                              </div>
                            </div>
                            <div className="form-group row">
                              <label className="col-lg-5 col-xl-3 control-label text-lg-end pt-2 mt-1 mb-0">
                                Description
                              </label>
                              <div className="col-lg-7 col-xl-6">
                                <textarea
                                  className="form-control form-control-modern"
                                  name="couponDescription"
                                  rows={6}
                                  defaultValue={""}
                                />
                              </div>
                            </div>
                          </div>
                          <div
                            className="tab-pane fade"
                            id="usage-restriction"
                            role="tabpanel"
                            aria-labelledby="usage-restriction-tab"
                          >
                            <div className="form-group row align-items-center pb-3">
                              <label className="col-lg-5 col-xl-3 control-label text-lg-end mb-0">
                                Minimum Spend
                              </label>
                              <div className="col-lg-7 col-xl-6">
                                <input
                                  type="text"
                                  className="form-control form-control-modern"
                                  name="couponMinimumSpend"
                                  defaultValue
                                  placeholder="No minimum"
                                />
                              </div>
                            </div>
                            <div className="form-group row align-items-center pb-3">
                              <label className="col-lg-5 col-xl-3 control-label text-lg-end mb-0">
                                Maximum Spend
                              </label>
                              <div className="col-lg-7 col-xl-6">
                                <input
                                  type="text"
                                  className="form-control form-control-modern"
                                  name="couponMaximumSpend"
                                  defaultValue
                                  placeholder="No maximum"
                                />
                              </div>
                            </div>
                            <div className="form-group row align-items-center">
                              <label className="col-lg-5 col-xl-3 control-label text-lg-end mb-0">
                                Individual Use Only?
                              </label>
                              <div className="col-lg-7 col-xl-6">
                                <div className="checkbox">
                                  <label className="my-2">
                                    <input type="checkbox" defaultValue />
                                    Check this box if the coupon cannot be used
                                    in conjunction with other coupons.
                                  </label>
                                </div>
                              </div>
                            </div>
                            <div className="form-group row align-items-center pb-3">
                              <label className="col-lg-5 col-xl-3 control-label text-lg-end mb-0">
                                Exclude Sale Items?
                              </label>
                              <div className="col-lg-7 col-xl-6">
                                <div className="checkbox">
                                  <label className="my-2">
                                    <input type="checkbox" defaultValue />
                                    Check this box if the coupon should not
                                    apply to items on sale. Per-item coupons
                                    will only work if the item is not on sale.
                                    Per-cart coupons will only work if there are
                                    items in the cart that are not on sale.
                                  </label>
                                </div>
                              </div>
                            </div>
                            <div className="form-group row align-items-center pb-3">
                              <label className="col-lg-5 col-xl-3 control-label text-lg-end mb-0">
                                Products
                              </label>
                              <div className="col-lg-7 col-xl-6">
                                <select
                                  multiple
                                  data-plugin-selecttwo
                                  className="form-control form-control-modern"
                                  name="couponProducts"
                                  data-plugin-options='{ "placeholder": "Search for a product..." }'
                                >
                                  <option value />
                                  <option value="product1">Porto Bag</option>
                                  <option value="product2">Porto Shoes</option>
                                  <option value="product3">Porto Jacket</option>
                                </select>
                              </div>
                            </div>
                            <div className="form-group row align-items-center pb-3">
                              <label className="col-lg-5 col-xl-3 control-label text-lg-end mb-0">
                                Exclude Products
                              </label>
                              <div className="col-lg-7 col-xl-6">
                                <select
                                  multiple
                                  data-plugin-selecttwo
                                  className="form-control form-control-modern"
                                  name="couponExcludeProducts"
                                  data-plugin-options='{ "placeholder": "Search for a product..." }'
                                >
                                  <option value />
                                  <option value="product1">Porto Bag</option>
                                  <option value="product2">Porto Shoes</option>
                                  <option value="product3">Porto Jacket</option>
                                </select>
                              </div>
                            </div>
                            <div className="form-group row align-items-center pb-3">
                              <label className="col-lg-5 col-xl-3 control-label text-lg-end mb-0">
                                Product Categories
                              </label>
                              <div className="col-lg-7 col-xl-6">
                                <select
                                  multiple
                                  data-plugin-selecttwo
                                  className="form-control form-control-modern"
                                  name="couponProductCategories"
                                  data-plugin-options='{ "placeholder": "Search for a product category..." }'
                                >
                                  <option value="any">Any Category</option>
                                  <option value="product1">Bags</option>
                                  <option value="product2">Shoes</option>
                                  <option value="product3">Jackets</option>
                                </select>
                              </div>
                            </div>
                            <div className="form-group row align-items-center pb-3">
                              <label className="col-lg-5 col-xl-3 control-label text-lg-end mb-0">
                                Exclude Categories
                              </label>
                              <div className="col-lg-7 col-xl-6">
                                <select
                                  multiple
                                  data-plugin-selecttwo
                                  className="form-control form-control-modern"
                                  name="couponExcludeCategories"
                                  data-plugin-options='{ "placeholder": "Search for a product category..." }'
                                >
                                  <option value="none">None</option>
                                  <option value="product1">Bags</option>
                                  <option value="product2">Shoes</option>
                                  <option value="product3">Jackets</option>
                                </select>
                              </div>
                            </div>
                            <div className="form-group row align-items-center pb-3">
                              <label className="col-lg-5 col-xl-3 control-label text-lg-end mb-0">
                                Allowed E-mails
                              </label>
                              <div className="col-lg-7 col-xl-6">
                                <input
                                  type="text"
                                  className="form-control form-control-modern"
                                  name="couponAllowedEmails"
                                  defaultValue
                                />
                              </div>
                            </div>
                          </div>
                          <div
                            className="tab-pane fade"
                            id="usage-limits"
                            role="tabpanel"
                            aria-labelledby="usage-limits-tab"
                          >
                            <div className="form-group row align-items-center  pb-3">
                              <label className="col-lg-5 col-xl-3 control-label text-lg-end mb-0">
                                Usage Limit Per Coupon
                              </label>
                              <div className="col-lg-7 col-xl-6">
                                <input
                                  type="text"
                                  className="form-control form-control-modern"
                                  name="couponUsageLimitPerCoupon"
                                  defaultValue
                                  placeholder="Unlimited Usage"
                                />
                              </div>
                            </div>
                            <div className="form-group row align-items-center  pb-3">
                              <label className="col-lg-5 col-xl-3 control-label text-lg-end mb-0">
                                Limit Usage to X Items
                              </label>
                              <div className="col-lg-7 col-xl-6">
                                <input
                                  type="text"
                                  className="form-control form-control-modern"
                                  name="couponLimitUsageXItems"
                                  defaultValue
                                  placeholder="Apply to all qualifying items in cart"
                                />
                              </div>
                            </div>
                            <div className="form-group row align-items-center">
                              <label className="col-lg-5 col-xl-3 control-label text-lg-end mb-0">
                                Usage Limit Per User
                              </label>
                              <div className="col-lg-7 col-xl-6">
                                <input
                                  type="text"
                                  className="form-control form-control-modern"
                                  name="couponUsageLimitPerUser"
                                  defaultValue
                                  placeholder="Unlimited Usage"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
            <div className="row action-buttons">
              <div className="col-12 col-md-auto">
                <button
                  type="submit"
                  className="submit-button btn btn-primary btn-px-4 py-3 d-flex align-items-center font-weight-semibold line-height-1"
                  data-loading-text="Loading..."
                >
                  <i className="bx bx-save text-4 me-2" /> Save Coupon
                </button>
              </div>
              <div className="col-12 col-md-auto px-md-0 mt-3 mt-md-0">
                <a
                  href="ecommerce-coupons-list.html"
                  className="cancel-button btn btn-light btn-px-4 py-3 border font-weight-semibold text-color-dark text-3"
                >
                  Cancel
                </a>
              </div>
              <div className="col-12 col-md-auto ms-md-auto mt-3 mt-md-0 ms-auto">
                <a
                  href="#"
                  className="delete-button btn btn-danger btn-px-4 py-3 d-flex align-items-center font-weight-semibold line-height-1"
                >
                  <i className="bx bx-trash text-4 me-2" /> Delete Coupon
                </a>
              </div>
            </div>
          </form>
          {/* end: page */}
        </section>
      </div>
    </section>
  );
}

export default CouponForm;
