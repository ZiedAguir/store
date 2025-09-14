import Header from "../../componnent/Header/headerprofil";
import SideBar from "../../componnent/SideBare/sideBare";

function CustomersList() {
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
            <h2 className="font-weight-bold text-6">Customers</h2>
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
          <div className="row">
            <div className="col">
              <div className="card card-modern">
                <div className="card-body">
                  <div className="datatables-header-footer-wrapper">
                    <div className="datatable-header">
                      <div className="row align-items-center mb-3">
                        <div className="col-12 col-lg-auto mb-3 mb-lg-0">
                          <a
                            href="/CustomersForm"
                            className="btn btn-primary btn-md font-weight-semibold btn-py-2 px-4"
                          >
                            + Add Customer
                          </a>
                        </div>
                        <div className="col-8 col-lg-auto ms-auto ml-auto mb-3 mb-lg-0">
                          <div className="d-flex align-items-lg-center flex-column flex-lg-row">
                            <label className="ws-nowrap me-3 mb-0">
                              Filter By:
                            </label>
                            <select
                              className="form-control select-style-1 filter-by"
                              name="filter-by"
                            >
                              <option value="all" selected>
                                All
                              </option>
                              <option value={1}>ID</option>
                              <option value={2}>Name</option>
                              <option value={3}>Phone</option>
                              <option value={4}>E-mail</option>
                              <option value={5}>Orders</option>
                              <option value={6}>Total Amount</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-4 col-lg-auto ps-lg-1 mb-3 mb-lg-0">
                          <div className="d-flex align-items-lg-center flex-column flex-lg-row">
                            <label className="ws-nowrap me-3 mb-0">Show:</label>
                            <select
                              className="form-control select-style-1 results-per-page"
                              name="results-per-page"
                            >
                              <option value={12} selected>
                                12
                              </option>
                              <option value={24}>24</option>
                              <option value={36}>36</option>
                              <option value={100}>100</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-12 col-lg-auto ps-lg-1">
                          <div className="search search-style-1 search-style-1-lg mx-lg-auto">
                            <div className="input-group">
                              <input
                                type="text"
                                className="search-term form-control"
                                name="search-term"
                                id="search-term"
                                placeholder="Search Customer"
                              />
                              <button className="btn btn-default" type="submit">
                                <i className="bx bx-search" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <table
                      className="table table-ecommerce-simple table-striped mb-0"
                      id="datatable-ecommerce-list"
                      style={{ minWidth: 750 }}
                    >
                      <thead>
                        <tr>
                          <th width="3%">
                            <input
                              type="checkbox"
                              name="select-all"
                              className="select-all checkbox-style-1 p-relative top-2"
                              defaultValue
                            />
                          </th>
                          <th width="8%">ID</th>
                          <th width="28%">Name</th>
                          <th width="18%">Phone</th>
                          <th width="25%">E-mail</th>
                          <th width="8%">Orders</th>
                          <th width="10%">Total Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td width={30}>
                            <input
                              type="checkbox"
                              name="checkboxRow1"
                              className="checkbox-style-1 p-relative top-2"
                              defaultValue
                            />
                          </td>
                          <td>
                            <a href="#">
                              <strong>191</strong>
                            </a>
                          </td>
                          <td>
                            <a href="#">
                              <strong>John Doe</strong>
                            </a>
                          </td>
                          <td>555-123-4567</td>
                          <td>okler@domain.com</td>
                          <td>1</td>
                          <td>$198.00</td>
                        </tr>
                        <tr>
                          <td width={30}>
                            <input
                              type="checkbox"
                              name="checkboxRow1"
                              className="checkbox-style-1 p-relative top-2"
                              defaultValue
                            />
                          </td>
                          <td>
                            <a href="#">
                              <strong>192</strong>
                            </a>
                          </td>
                          <td>
                            <a href="#">
                              <strong>John Doe 2</strong>
                            </a>
                          </td>
                          <td>555-123-4567</td>
                          <td>okler@domain.com</td>
                          <td>1</td>
                          <td>$198.00</td>
                        </tr>
                        <tr>
                          <td width={30}>
                            <input
                              type="checkbox"
                              name="checkboxRow1"
                              className="checkbox-style-1 p-relative top-2"
                              defaultValue
                            />
                          </td>
                          <td>
                            <a href="#">
                              <strong>193</strong>
                            </a>
                          </td>
                          <td>
                            <a href="#">
                              <strong>John Doe 3</strong>
                            </a>
                          </td>
                          <td>555-123-4567</td>
                          <td>okler@domain.com</td>
                          <td>1</td>
                          <td>$198.00</td>
                        </tr>
                        <tr>
                          <td width={30}>
                            <input
                              type="checkbox"
                              name="checkboxRow1"
                              className="checkbox-style-1 p-relative top-2"
                              defaultValue
                            />
                          </td>
                          <td>
                            <a href="#">
                              <strong>194</strong>
                            </a>
                          </td>
                          <td>
                            <a href="#">
                              <strong>John Doe 4</strong>
                            </a>
                          </td>
                          <td>555-123-4567</td>
                          <td>okler@domain.com</td>
                          <td>1</td>
                          <td>$198.00</td>
                        </tr>
                        <tr>
                          <td width={30}>
                            <input
                              type="checkbox"
                              name="checkboxRow1"
                              className="checkbox-style-1 p-relative top-2"
                              defaultValue
                            />
                          </td>
                          <td>
                            <a href="#">
                              <strong>195</strong>
                            </a>
                          </td>
                          <td>
                            <a href="#">
                              <strong>John Doe 5</strong>
                            </a>
                          </td>
                          <td>555-123-4567</td>
                          <td>okler@domain.com</td>
                          <td>1</td>
                          <td>$198.00</td>
                        </tr>
                        <tr>
                          <td width={30}>
                            <input
                              type="checkbox"
                              name="checkboxRow1"
                              className="checkbox-style-1 p-relative top-2"
                              defaultValue
                            />
                          </td>
                          <td>
                            <a href="#">
                              <strong>196</strong>
                            </a>
                          </td>
                          <td>
                            <a href="#">
                              <strong>John Doe 6</strong>
                            </a>
                          </td>
                          <td>555-123-4567</td>
                          <td>okler@domain.com</td>
                          <td>1</td>
                          <td>$198.00</td>
                        </tr>
                        <tr>
                          <td width={30}>
                            <input
                              type="checkbox"
                              name="checkboxRow1"
                              className="checkbox-style-1 p-relative top-2"
                              defaultValue
                            />
                          </td>
                          <td>
                            <a href="#">
                              <strong>197</strong>
                            </a>
                          </td>
                          <td>
                            <a href="#">
                              <strong>John Doe 7</strong>
                            </a>
                          </td>
                          <td>555-123-4567</td>
                          <td>okler@domain.com</td>
                          <td>1</td>
                          <td>$198.00</td>
                        </tr>
                        <tr>
                          <td width={30}>
                            <input
                              type="checkbox"
                              name="checkboxRow1"
                              className="checkbox-style-1 p-relative top-2"
                              defaultValue
                            />
                          </td>
                          <td>
                            <a href="#">
                              <strong>198</strong>
                            </a>
                          </td>
                          <td>
                            <a href="#">
                              <strong>John Doe 8</strong>
                            </a>
                          </td>
                          <td>555-123-4567</td>
                          <td>okler@domain.com</td>
                          <td>1</td>
                          <td>$198.00</td>
                        </tr>
                        <tr>
                          <td width={30}>
                            <input
                              type="checkbox"
                              name="checkboxRow1"
                              className="checkbox-style-1 p-relative top-2"
                              defaultValue
                            />
                          </td>
                          <td>
                            <a href="#">
                              <strong>199</strong>
                            </a>
                          </td>
                          <td>
                            <a href="#">
                              <strong>John Doe 9</strong>
                            </a>
                          </td>
                          <td>555-123-4567</td>
                          <td>okler@domain.com</td>
                          <td>1</td>
                          <td>$198.00</td>
                        </tr>
                        <tr>
                          <td width={30}>
                            <input
                              type="checkbox"
                              name="checkboxRow1"
                              className="checkbox-style-1 p-relative top-2"
                              defaultValue
                            />
                          </td>
                          <td>
                            <a href="#">
                              <strong>200</strong>
                            </a>
                          </td>
                          <td>
                            <a href="#">
                              <strong>John Doe 10</strong>
                            </a>
                          </td>
                          <td>555-123-4567</td>
                          <td>okler@domain.com</td>
                          <td>1</td>
                          <td>$198.00</td>
                        </tr>
                      </tbody>
                    </table>
                    <hr className="solid mt-5 opacity-4" />
                    <div className="datatable-footer">
                      <div className="row align-items-center justify-content-between mt-3">
                        <div className="col-md-auto order-1 mb-3 mb-lg-0">
                          <div className="d-flex align-items-stretch">
                            <div className="d-grid gap-3 d-md-flex justify-content-md-end me-4">
                              <select
                                className="form-control select-style-1 bulk-action"
                                name="bulk-action"
                                style={{ minWidth: 170 }}
                              >
                                <option value selected>
                                  Bulk Actions
                                </option>
                                <option value="delete">Delete</option>
                              </select>
                              <a
                                href="ecommerce-coupons-form.html"
                                className="bulk-action-apply btn btn-light btn-px-4 py-3 border font-weight-semibold text-color-dark text-3"
                              >
                                Apply
                              </a>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-auto text-center order-3 order-lg-2">
                          <div className="results-info-wrapper" />
                        </div>
                        <div className="col-lg-auto order-2 order-lg-3 mb-3 mb-lg-0">
                          <div className="pagination-wrapper" />

                          <div className="row row-gutter-sm justify-content-between">
                            <div className="col-lg-auto order-2 order-lg-1">
                              <p className="text-center text-lg-left mb-0">
                                Showing 1-8 of 60 results
                              </p>
                            </div>
                            <div className="col-lg-auto order-1 order-lg-2 mb-3 mb-lg-0">
                              <nav aria-label="Page navigation example">
                                <ul className="pagination pagination-modern pagination-modern-spacing justify-content-center justify-content-lg-start mb-0">
                                  <li className="page-item">
                                    <a
                                      className="page-link prev"
                                      href="#"
                                      aria-label="Previous"
                                    >
                                      <span>
                                        <i
                                          className="fas fa-chevron-left"
                                          aria-label="Previous"
                                        />
                                      </span>
                                    </a>
                                  </li>
                                  <li className="page-item active">
                                    <a className="page-link" href="#">
                                      1
                                    </a>
                                  </li>
                                  <li className="page-item">
                                    <a className="page-link" href="#">
                                      2
                                    </a>
                                  </li>
                                  <li className="page-item">
                                    <a className="page-link" href="#">
                                      3
                                    </a>
                                  </li>
                                  <li className="page-item">
                                    <a
                                      className="page-link"
                                      href="#"
                                      disabled="true"
                                    >
                                      ...
                                    </a>
                                  </li>
                                  <li className="page-item">
                                    <a className="page-link" href="#">
                                      15
                                    </a>
                                  </li>
                                  <li className="page-item">
                                    <a
                                      className="page-link next"
                                      href="#"
                                      aria-label="Next"
                                    >
                                      <span>
                                        <i
                                          className="fas fa-chevron-right"
                                          aria-label="Next"
                                        />
                                      </span>
                                    </a>
                                  </li>
                                </ul>
                              </nav>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* end: page */}
          </div>
        </section>
      </div>
    </section>
  );
}

export default CustomersList;
