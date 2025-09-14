function ButtonSearch() {
  

    return (
        <form action="pages-search-results.html" className="search nav-form" style={{marginRight:'20px'}}>
 
        <div className="input-group">
          
          <input type="text" className="form-control" name="q" id="q" placeholder="Search..." />
          <button className="btn btn-default" type="submit"><i className="bx bx-search" /></button>
          
        </div>
      </form>
    );
  }
  
  export default ButtonSearch;