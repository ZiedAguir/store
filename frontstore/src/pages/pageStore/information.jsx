
function LatestNews() {
  return (
    <div> 
         <section className="section section-no-border border-top-0 pt-0 pb-0 m-0">
          <div className="container">
            <div className="row align-items-center justify-content-between">
              <div className="col-lg-4 pe-lg-4 mb-5 mb-md-0">
                <h2 className="text-color-dark text-7 font-weight-semibold line-height-2 mb-2">The new generation of Site Vitrine is here.</h2>
                <p className="pe-lg-5">A complete suite of tools designed to make life easier with a top quality Astra templates.</p>
              </div>
              <div className="col-md-4 col-lg-auto icon-box text-center mb-md-4">
                <i className="icon-bg icon-1" />
                <h4 className="font-weight-bold text-color-dark custom-font-size-2 line-height-3 my-0">Super High<br />Performance</h4>
              </div>
              <div className="col-md-4 col-lg-auto icon-box text-center mx-xl-5 my-5 my-md-0 pb-md-4">
                <i className="icon-bg icon-4" />
                <h4 className="font-weight-bold text-color-dark custom-font-size-2 line-height-3 my-0">Created with Top<br />Plugins and Extensions</h4>
              </div>
              <div className="col-md-4 col-lg-auto icon-box text-center mb-4">
                <i className="icon-bg icon-3" />
                <h4 className="font-weight-bold text-color-dark custom-font-size-2 line-height-3 my-0">Extremely Easy<br />to Customize</h4>
              </div>
              <div className="col-sm-12">
                <hr className="solid opacity-7 my-5" />
                <h2 className="font-weight-bold text-color-dark text-center text-10 pt-3 mb-3">The Most Customizable + Solid and Tested Base</h2>
              </div>
              <div className="col-lg-8 offset-lg-2 px-lg-0 text-center mb-5 mb-sm-4 mb-lg-0">
                <p className="font-weight-500 text-4 mb-0">astra store  has a huge variety of options and features to create your project, it has also a very solid based </p>
              </div>
            </div>
            <div className="image-wrapper position-relative z-index-3 appear-animation" data-appear-animation="fadeInUpShorter" data-appear-animation-delay={500} data-appear-animation-duration={750} style={{height: 0, paddingBottom: '16%', marginTop: '-30px'}}>
              <img src="img/mobile1.png" data-plugin-lazyload width={300} height={400}  data-plugin-options="{'threshold': 500, 'effect':'fadeIn'}"  className="img-fluid" alt="img-fluid" />
            </div>
          </div>
        </section>
        <section className="section section-no-border section-angled section-dark border-top-0 pb-0 m-0" style={{backgroundRepeat: 'no-repeat', backgroundColor: '#0169fe !important'}} data-plugin-lazyload data-plugin-options="{'threshold': 500}" data-original="img/landing/reason_bg.png " alt="img-fluid2">
          <div className="section-angled-layer-top section-angled-layer-increase-angle bg-color-light-scale-1" style={{padding: '4rem 0'}} />
          <div className="spacer py-md-4 my-md-5" />
          <div className="container pt-lg-4 pt-xl-5 mt-xl-5">
            <div className="row align-items-center justify-content-center pt-lg-5 mt-5 p-relative">
              <div className="col-auto col-sm-12 col-lg-6 offset-lg-1 pt-5 mb-5">
                <div className="appear-animation" data-appear-animation="fadeIn" data-appear-animation-delay={500}>
                  <img src="img/lazy.png" data-plugin-lazyload  data-plugin-options="{'threshold': 500, 'effect':'fadeIn'}" data-original="img/landing/porto_dots.png" width={154} height={146} className="position-absolute top-auto d-none d-lg-block" alt="6 reasons" data-plugin-float-element style={{bottom: 204, left: 70}} />
                </div>
                <div className="text-reasons ps-4 ps-sm-0">
                  <label className="text-color-light appear-animation z-index-1" data-appear-animation="blurIn" data-appear-animation-delay={250} data-appear-animation-duration={750}>6</label>
                  <h3 className="text-color-light text-4 text-sm-6 text-md-9 text-lg-5 text-xl-7 px-5 py-sm-3 mt-0 appear-animation" data-appear-animation="fadeInRightShorter" data-appear-animation-delay={450} data-appear-animation-duration={750}>Reasons</h3>
                  <h3 className="text-color-light text-4 text-sm-6 text-md-9 text-lg-5 text-xl-7 mt-0 appear-animation" data-appear-animation="fadeInRightShorter" data-appear-animation-delay={750} data-appear-animation-duration={750}>Why you should choose</h3>
                  <h3 className="text-color-light text-4 text-sm-6 text-md-9 text-lg-5 text-xl-8 py-sm-3 px-sm-5 px-lg-4 mt-0 appear-animation" data-appear-animation="fadeInRightShorter" data-appear-animation-delay={950} data-appear-animation-duration={750}>Astra <span className="highlighted-word highlighted-word-animation-1 highlighted-word-animation-1-light highlighted-word-animation-1-2 alternative-font-4 font-weight-extra-bold">Store</span></h3>
                </div>
              </div>
              <div className="col-10 col-sm-12 col-lg-5 col-xl-4 ps-lg-4 ps-xl-5">
                <h2 className="text-color-light text-7 font-weight-semibold line-height-2 mb-2 appear-animation" data-appear-animation="fadeInRightShorter" data-appear-animation-delay={1150} data-appear-animation-duration={750}>With AstraStore your satisfaction is guaranteed.</h2>
                <p className="custom-text-color-2 line-height-5 appear-animation" data-appear-animation="fadeInRightShorter" data-appear-animation-delay={1350} data-appear-animation-duration={750}>We have selected the 6 top reasons to choose AstraStore. Check below:</p>
              </div>
            </div>
            
            <div className="text-center">
              <a href="" className="btn btn-dark btn-rounded btn-modern btn-px-5 text-3 appear-animation" data-appear-animation="fadeIn" data-appear-animation-delay={300} target="_blank">Write Raiting Now</a>
            </div>
          </div>
        </section>
    </div>
  )
}

export default LatestNews