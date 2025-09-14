


function Footer() {
  return (
    <footer id="footer" className="bg-color-dark-scale-5 border border-end-0 border-start-0 border-bottom-0 border-color-light-3 mt-0">
    <div className="container text-center my-3 py-5">
      <a href="#" className="goto-top">
        <h1 data-plugin-lazyload data-plugin-options="{'threshold': 500}"  width={102} height={45} className="mb-4 appear-animation" alt="Porto" data-appear-animation="fadeIn" data-appear-animation-delay={300}>ASTRA STORE</h1>
      </a>
      <p className="font-weight-500 text-4 ls-0 mb-4">A good platform for a  <a href="#" className="text-color-light" target="_blank">showcase</a>website.</p>
      <ul className="social-icons social-icons-big social-icons-dark-2">
        <li className="social-icons-instagram"><a href="http://www.instagram.com/" target="_blank" title="Instagram"><i className="fab fa-instagram" /></a></li>
        <li className="social-icons-facebook"><a href="http://www.facebook.com/" target="_blank" title="Facebook"><i className="fab fa-facebook-f" /></a></li>
        <li className="social-icons-twitter"><a href="http://www.twitter.com/" target="_blank" title="Twitter"><i className="fab fa-twitter" /></a></li>
        <li className="social-icons-youtube"><a href="http://www.youtube.com/" target="_blank" title="Youtube"><i className="fab fa-youtube" /></a></li>
      </ul>
    </div>
    <div className="copyright bg-color-dark-scale-4 py-4">
      <div className="container text-center py-2">
        <p className="mb-0 text-2 ls-0">Copyright 2024 - 2025 Astra - All Rights Reserved</p>
      </div>
    </div>
  </footer>
  )
}

export default Footer;