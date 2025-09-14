function DropdownLanguage() {
  

    return (
       <>
        <a style={{marginRight:'20px'}} href="#" role="button" id="dropdownLanguage" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <img src="img/blank.gif" className="flag flag-us" alt="English" /> EN
        <i className="fas fa-chevron-down" />
      </a>
      <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownLanguage">
        
        <a className="dropdown-item" href="#"><img src="img/blank.gif" className="flag flag-us" alt="English" /> English</a>
        <a className="dropdown-item" href="#"><img src="img/blank.gif" className="flag flag-es" alt="English" /> Español</a>
        <a className="dropdown-item" href="#"><img src="img/blank.gif" className="flag flag-fr" alt="English" /> Française</a>
      </div>
       </>
    );
  }
  
  export default DropdownLanguage;