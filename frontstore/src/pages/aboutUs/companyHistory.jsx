
function CompanyHistory() {
  return (
    <div className="container-fluid about bg-light py-5">
    <div className="container py-5">
      <div className="row g-5 align-items-center">
        <div className="col-lg-5 wow fadeInLeft" data-wow-delay="0.2s">
          <div className="about-img pb-5 ps-5">
            <img src="img/img12.jpg" className="img-fluid rounded w-100" style={{objectFit: 'cover'}} alt="Image" />
            <div className="about-img-inner">
              <img src="img/img14.jpg" className="img-fluid rounded-circle w-100 h-100" alt="Image" />
            </div>
            <div className="about-experience">15 ans dexpérience</div>
          </div>
        </div>
        <div className="col-lg-7 wow fadeInRight" data-wow-delay="0.4s">
          <div className="section-title text-start mb-5">
            <h4 className="sub-title pe-3 mb-0">ABOUT US</h4>
            <h1 className="display-3 mb-4">We are ready to help you improve your well-being.</h1>
            <p className="mb-4">
            </p>
            <div className="mb-4">
              <p className="text-secondary"><i className="fa fa-check text-primary me-2" /> A personalized approach for each user</p>
              <p className="text-secondary"><i className="fa fa-check text-primary me-2" /> Advanced experience in serving our customers</p>
              <p className="text-secondary"><i className="fa fa-check text-primary me-2" /> A strong commitment to your satisfaction and well-being.</p>
            </div>
            <a href="#" className="btn btn-primary rounded-pill text-white py-3 px-5">Learn More</a>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default CompanyHistory;