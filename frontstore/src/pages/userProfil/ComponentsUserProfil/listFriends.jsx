function ListFriends() {
    return (
        <section className="card">
                <header className="card-header">
                  <div className="card-actions">
                    <a
                      href="#"
                      className="card-action card-action-toggle"
                      data-card-toggle
                    />
                    <a
                      href="#"
                      className="card-action card-action-dismiss"
                      data-card-dismiss
                    />
                  </div>
                  <h2 className="card-title">
                    <span className="badge badge-primary label-sm font-weight-normal va-middle me-3">
                      285
                    </span>
                    <span className="va-middle">Friends</span>
                  </h2>
                </header>
                <div className="card-body">
                  <div className="content">
                    <ul className="simple-user-list">
                      <li>
                        <figure className="image rounded">
                          <img
                            src="img/sebastian.jpg"
                            width={40}
                            height={40}
                            alt="avatar"
                            className="rounded-circle"
                          />
                        </figure>
                        <span className="title">Ayman Dimassi</span>
                        <span className="message truncate">Infirmière </span>
                      </li>

                      <li>
                        <figure className="image rounded">
                          <img
                            src="img/elhem.jpg"
                            width={40}
                            height={40}
                            alt="avatar"
                            className="rounded-circle"
                          />
                        </figure>
                        <span className="title">Elhem Bouzid</span>
                        <span className="message truncate">Coiffeuse </span>
                      </li>
                      <li>
                        <figure className="image rounded">
                          <img
                            src="img/ayman1.jpeg"
                            width={40}
                            height={40}
                            alt="Joe Junior"
                            className="rounded-circle"
                          />
                        </figure>
                        <span className="title">Sebastien Delogu</span>
                        <span className="message truncate">
                          Assistante sociale{" "}
                        </span>
                      </li>
                      <li>
                        <figure className="image rounded">
                          <img
                            src="img/ahlem.jpeg"
                            width={40}
                            height={40}
                            alt="paulina"
                            className="rounded-circle"
                          />
                        </figure>
                        <span className="title">Paulina</span>
                        <span className="message truncate">Puéricultrice</span>
                      </li>
                    </ul>
                    <hr className="dotted short" />
                    <div className="text-end">
                      <a className="text-uppercase text-muted" href="#">
                        (View All)
                      </a>
                    </div>
                  </div>
                </div>
                <div className="card-footer">
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      name="s"
                      id="s"
                      placeholder="Search..."
                    />
                    <button className="btn btn-default" type="submit">
                      <i className="bx bx-search" />
                    </button>
                  </div>
                </div>
              </section>

    );
  }
  
  export default ListFriends;