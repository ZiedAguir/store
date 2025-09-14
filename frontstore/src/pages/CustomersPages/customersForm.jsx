import Header from "../../componnent/Header/headerprofil";
import SideBar from "../../componnent/SideBare/sideBare";

function CustomersForm() {
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
            <h2 className="font-weight-bold text-6">Customer Name</h2>
            <div className="right-wrapper">
              <ol className="breadcrumbs">
                <li>
                  <span>Home</span>
                </li>
                <li>
                  <span>eCommerce</span>
                </li>
                <li>
                  <span>Customers</span>
                </li>
              </ol>
              <a className="sidebar-right-toggle" data-open="sidebar-right">
                <i className="fas fa-chevron-left" />
              </a>
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
                    <div className="row">
                      <div className="col-lg-2-5 col-xl-1-5">
                        <i className="card-big-info-icon bx bx-dollar-circle" />
                        <h2 className="card-big-info-title">Billing Info</h2>
                        <p className="card-big-info-desc">
                          Add here the customer billing info with all details
                          and necessary information.
                        </p>
                      </div>
                      <div className="col-lg-3-5 col-xl-4-5">
                        <div className="form-group row align-items-center pb-3">
                          <label className="col-lg-5 col-xl-3 control-label text-lg-end mb-0">
                            First Name
                          </label>
                          <div className="col-lg-7 col-xl-6">
                            <input
                              type="text"
                              className="form-control form-control-modern"
                              name="customerBillingFirstName"
                              defaultValue
                              required
                            />
                          </div>
                        </div>
                        <div className="form-group row align-items-center pb-3">
                          <label className="col-lg-5 col-xl-3 control-label text-lg-end mb-0">
                            Last Name
                          </label>
                          <div className="col-lg-7 col-xl-6">
                            <input
                              type="text"
                              className="form-control form-control-modern"
                              name="customerBillingLastName"
                              defaultValue
                              required
                            />
                          </div>
                        </div>
                        <div className="form-group row align-items-center pb-3">
                          <label className="col-lg-5 col-xl-3 control-label text-lg-end mb-0">
                            Company
                          </label>
                          <div className="col-lg-7 col-xl-6">
                            <input
                              type="text"
                              className="form-control form-control-modern"
                              name="customerBillingCompany"
                              defaultValue
                            />
                          </div>
                        </div>
                        <div className="form-group row align-items-center pb-3">
                          <label className="col-lg-5 col-xl-3 control-label text-lg-end mb-0">
                            Address Line 1
                          </label>
                          <div className="col-lg-7 col-xl-6">
                            <input
                              type="text"
                              className="form-control form-control-modern"
                              name="customerBillingAddressLine1"
                              defaultValue
                              required
                            />
                          </div>
                        </div>
                        <div className="form-group row align-items-center pb-3">
                          <label className="col-lg-5 col-xl-3 control-label text-lg-end mb-0">
                            Address Line 2
                          </label>
                          <div className="col-lg-7 col-xl-6">
                            <input
                              type="text"
                              className="form-control form-control-modern"
                              name="customerBillingAddressLine2"
                              defaultValue
                            />
                          </div>
                        </div>
                        <div className="form-group row align-items-center pb-3">
                          <label className="col-lg-5 col-xl-3 control-label text-lg-end mb-0">
                            City
                          </label>
                          <div className="col-lg-7 col-xl-6">
                            <input
                              type="text"
                              className="form-control form-control-modern"
                              name="customerBillingCity"
                              defaultValue
                              required
                            />
                          </div>
                        </div>
                        <div className="form-group row align-items-center pb-3">
                          <label className="col-lg-5 col-xl-3 control-label text-lg-end mb-0">
                            Postcode / ZIP
                          </label>
                          <div className="col-lg-7 col-xl-6">
                            <input
                              type="text"
                              className="form-control form-control-modern"
                              name="customerBillingPostCodeZip"
                              defaultValue
                              required
                            />
                          </div>
                        </div>
                        <div className="form-group row align-items-center pb-3">
                          <label className="col-lg-5 col-xl-3 control-label text-lg-end mb-0">
                            Country / Region
                          </label>
                          <div className="col-lg-7 col-xl-6">
                            <select
                              className="form-control form-control-modern"
                              name="customerBillingCountryRegion"
                            >
                              <option value>Select a country / region</option>
                              <option value="country1">Country 1</option>
                              <option value="country2">Country 2</option>
                              <option value="country3">Country 3</option>
                              <option value="country4">Country 4</option>
                            </select>
                          </div>
                        </div>
                        <div className="form-group row align-items-center pb-3">
                          <label className="col-lg-5 col-xl-3 control-label text-lg-end mb-0">
                            State / Country
                          </label>
                          <div className="col-lg-7 col-xl-6">
                            <select
                              className="form-control form-control-modern"
                              name="customerBillingStateCountry"
                            >
                              <option value>Select a State</option>
                              <option value="state1">State 1</option>
                              <option value="state2">State 2</option>
                              <option value="state3">State 3</option>
                              <option value="state4">State 4</option>
                            </select>
                          </div>
                        </div>
                        <div className="form-group row align-items-center">
                          <label className="col-lg-5 col-xl-3 control-label text-lg-end mb-0">
                            Phone
                          </label>
                          <div className="col-lg-7 col-xl-6">
                            <input
                              type="text"
                              className="form-control form-control-modern"
                              name="customerBillingPhone"
                              defaultValue
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <section className="card card-modern card-big-info">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-lg-2-5 col-xl-1-5">
                        <i className="card-big-info-icon bx bx-mail-send" />
                        <h2 className="card-big-info-title">Shipping Info</h2>
                        <p className="card-big-info-desc">
                          Add here the customer shipping info with all details
                          and necessary information.
                        </p>
                      </div>
                      <div className="col-lg-3-5 col-xl-4-5">
                        <div className="form-group row align-items-center">
                          <label className="col-lg-5 col-xl-3 control-label text-lg-end mb-0">
                            Same as billing
                          </label>
                          <div className="col-lg-7 col-xl-6">
                            <div className="checkbox">
                              <label className="my-2">
                                <input
                                  name="customerShippingSameAsBilling"
                                  type="checkbox"
                                  defaultValue
                                  data-bs-toggle="collapse"
                                  data-bs-target=".shipping-fields-wrapper"
                                />
                                Check this box to use same information as
                                billing for shipping.
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="shipping-fields-wrapper collapse show">
                          <div className="form-group row align-items-center">
                            <label className="col-lg-5 col-xl-3 control-label text-lg-end mb-0">
                              First Name
                            </label>
                            <div className="col-lg-7 col-xl-6">
                              <input
                                type="text"
                                className="form-control form-control-modern"
                                name="customerShippingFirstName"
                                defaultValue
                                required
                              />
                            </div>
                          </div>
                          <div className="form-group row align-items-center">
                            <label className="col-lg-5 col-xl-3 control-label text-lg-end mb-0">
                              Last Name
                            </label>
                            <div className="col-lg-7 col-xl-6">
                              <input
                                type="text"
                                className="form-control form-control-modern"
                                name="customerShippingLastName"
                                defaultValue
                                required
                              />
                            </div>
                          </div>
                          <div className="form-group row align-items-center">
                            <label className="col-lg-5 col-xl-3 control-label text-lg-end mb-0">
                              Company
                            </label>
                            <div className="col-lg-7 col-xl-6">
                              <input
                                type="text"
                                className="form-control form-control-modern"
                                name="customerShippingCompany"
                                defaultValue
                              />
                            </div>
                          </div>
                          <div className="form-group row align-items-center">
                            <label className="col-lg-5 col-xl-3 control-label text-lg-end mb-0">
                              Address Line 1
                            </label>
                            <div className="col-lg-7 col-xl-6">
                              <input
                                type="text"
                                className="form-control form-control-modern"
                                name="customerShippingAddressLine1"
                                defaultValue
                                required
                              />
                            </div>
                          </div>
                          <div className="form-group row align-items-center">
                            <label className="col-lg-5 col-xl-3 control-label text-lg-end mb-0">
                              Address Line 2
                            </label>
                            <div className="col-lg-7 col-xl-6">
                              <input
                                type="text"
                                className="form-control form-control-modern"
                                name="customerShippingAddressLine2"
                                defaultValue
                              />
                            </div>
                          </div>
                          <div className="form-group row align-items-center">
                            <label className="col-lg-5 col-xl-3 control-label text-lg-end mb-0">
                              City
                            </label>
                            <div className="col-lg-7 col-xl-6">
                              <input
                                type="text"
                                className="form-control form-control-modern"
                                name="customerShippingCity"
                                defaultValue
                                required
                              />
                            </div>
                          </div>
                          <div className="form-group row align-items-center">
                            <label className="col-lg-5 col-xl-3 control-label text-lg-end mb-0">
                              Postcode / ZIP
                            </label>
                            <div className="col-lg-7 col-xl-6">
                              <input
                                type="text"
                                className="form-control form-control-modern"
                                name="customerShippingPostCodeZip"
                                defaultValue
                                required
                              />
                            </div>
                          </div>
                          <div className="form-group row align-items-center">
                            <label className="col-lg-5 col-xl-3 control-label text-lg-end mb-0">
                              Country / Region
                            </label>
                            <div className="col-lg-7 col-xl-6">
                              <select
                                className="form-control form-control-modern"
                                name="customerShippingCountryRegion"
                              >
                                <option value>Select a country / region</option>
                                <option value="country1">Country 1</option>
                                <option value="country2">Country 2</option>
                                <option value="country3">Country 3</option>
                                <option value="country4">Country 4</option>
                              </select>
                            </div>
                          </div>
                          <div className="form-group row align-items-center">
                            <label className="col-lg-5 col-xl-3 control-label text-lg-end mb-0">
                              State / Country
                            </label>
                            <div className="col-lg-7 col-xl-6">
                              <select
                                className="form-control form-control-modern"
                                name="customerShippingStateCountry"
                              >
                                <option value>Select a State</option>
                                <option value="state1">State 1</option>
                                <option value="state2">State 2</option>
                                <option value="state3">State 3</option>
                                <option value="state4">State 4</option>
                              </select>
                            </div>
                          </div>
                          <div className="form-group row align-items-center">
                            <label className="col-lg-5 col-xl-3 control-label text-lg-end mb-0">
                              Phone
                            </label>
                            <div className="col-lg-7 col-xl-6">
                              <input
                                type="text"
                                className="form-control form-control-modern"
                                name="customerShippingPhone"
                                defaultValue
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <section className="card card-modern card-big-info">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-lg-2-5 col-xl-1-5">
                        <i className="card-big-info-icon bx bx-user-circle" />
                        <h2 className="card-big-info-title">Account Info</h2>
                        <p className="card-big-info-desc">
                          Add here the customer account info with all details
                          and necessary information.
                        </p>
                      </div>
                      <div className="col-lg-3-5 col-xl-4-5">
                        <div className="form-group row align-items-center pb-3">
                          <label className="col-lg-5 col-xl-3 control-label text-lg-end mb-0">
                            Email / Username
                          </label>
                          <div className="col-lg-7 col-xl-6">
                            <input
                              type="email"
                              className="form-control form-control-modern"
                              name="customerEmailUsername"
                              defaultValue
                              required
                            />
                          </div>
                        </div>
                        <div className="form-group row align-items-center pb-3">
                          <label className="col-lg-5 col-xl-3 control-label text-lg-end mb-0">
                            Password
                          </label>
                          <div className="col-lg-7 col-xl-6">
                            <input
                              type="password"
                              className="form-control form-control-modern"
                              name="customerPassword"
                              defaultValue
                              required
                            />
                          </div>
                        </div>
                        <div className="form-group row align-items-center">
                          <label className="col-lg-5 col-xl-3 control-label text-lg-end mb-0">
                            Password Confirm
                          </label>
                          <div className="col-lg-7 col-xl-6">
                            <input
                              type="password"
                              className="form-control form-control-modern"
                              name="customerPasswordConfirm"
                              defaultValue
                            />
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
                  <i className="bx bx-save text-4 me-2" /> Save Customer
                </button>
              </div>
              <div className="col-12 col-md-auto px-md-0 mt-3 mt-md-0">
                <a
                  href="ecommerce-customers-list.html"
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
                  <i className="bx bx-trash text-4 me-2" /> Delete Customer
                </a>
              </div>
            </div>
          </form>
          {/* end: page */}
        </section>
      </div>
      <aside id="sidebar-right" className="sidebar-right">
        <div className="nano">
          <div className="nano-content">
            <a href="#" className="mobile-close d-md-none">
              Collapse <i className="fas fa-chevron-right" />
            </a>
            <div className="sidebar-right-wrapper">
              <div className="sidebar-widget widget-calendar">
                <h6>Upcoming Tasks</h6>
                <div data-plugin-datepicker data-plugin-skin="dark" />
                <ul>
                  <li>
                    <time dateTime="2023-04-19T00:00+00:00">04/19/2023</time>
                    <span>Company Meeting</span>
                  </li>
                </ul>
              </div>
              <div className="sidebar-widget widget-friends">
                <h6>Friends</h6>
                <ul>
                  <li className="status-online">
                    <figure className="profile-picture">
                      <img
                        src="img/!sample-user.jpg"
                        alt="Joseph Doe"
                        className="rounded-circle"
                      />
                    </figure>
                    <div className="profile-info">
                      <span className="name">Joseph Doe Junior</span>
                      <span className="title">Hey, how are you?</span>
                    </div>
                  </li>
                  <li className="status-online">
                    <figure className="profile-picture">
                      <img
                        src="img/!sample-user.jpg"
                        alt="Joseph Doe"
                        className="rounded-circle"
                      />
                    </figure>
                    <div className="profile-info">
                      <span className="name">Joseph Doe Junior</span>
                      <span className="title">Hey, how are you?</span>
                    </div>
                  </li>
                  <li className="status-offline">
                    <figure className="profile-picture">
                      <img
                        src="img/!sample-user.jpg"
                        alt="Joseph Doe"
                        className="rounded-circle"
                      />
                    </figure>
                    <div className="profile-info">
                      <span className="name">Joseph Doe Junior</span>
                      <span className="title">Hey, how are you?</span>
                    </div>
                  </li>
                  <li className="status-offline">
                    <figure className="profile-picture">
                      <img
                        src="img/!sample-user.jpg"
                        alt="Joseph Doe"
                        className="rounded-circle"
                      />
                    </figure>
                    <div className="profile-info">
                      <span className="name">Joseph Doe Junior</span>
                      <span className="title">Hey, how are you?</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </section>
  );
}

export default CustomersForm;
