import "./page404.css"
function Pages_400() {
    return (
<section className="body-error error-outside">
  <div className="center-error">
    <div className="error-header">
      <div className="row">
        <div className="col-md-12">
          <div className="row">
            <div className="col-lg-8">
              <a href="/homepage" className="logo">
              <img src="img/astra2.png"   style={{width:'150px',height:'60px'}} alt="astra"/>
              </a>
            </div>
            <div className="col-lg-4">
              <form className="form">
                <div className="input-group">
                  <input type="text" className="form-control" name="q" id="q" placeholder="Search..." />
                  <button className="btn btn-default" type="submit"><i className="bx bx-search" /></button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="row">
      <div className="col-lg-8">
        <div className="main-error mb-3">
          <h2 className="error-code text-dark text-center font-weight-semibold m-0">404 <i className="fas fa-file" /></h2>
          <p className="error-explanation text-center">We are sorry, but the page you were looking for doesn not exist.</p>
        </div>
      </div>
      <div className="col-lg-4">
        <h4 className="text">Here are some useful links</h4>
        <ul className="nav nav-list flex-column primary">
          <li className="nav-item">
            <a className="nav-link" href="/homepage"><i className="fas fa-caret-right text-dark" /> Astra Store</a>
          </li>
          <li className="nav-item">
      
            <a className="nav-link" href="/UserProfil"><i className="fas fa-caret-right text-dark" /> User Profile</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/pageFAQ"><i className="fas fa-caret-right text-dark" /> FAQs</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</section>

    );
  }
  
  export default Pages_400;