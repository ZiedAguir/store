import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchCategories, fetchCategoryById, fetchCategoryByName } from "../../../../Redux/Action/categoriesActions";
import { setLimit } from "../../../../Redux/slices/categoriesSlice";


const FilterSection = () => {
  const dispatch = useDispatch();
  const [filterBy, setFilterBy] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const handleFilterChange = (e) => {
    const selectedFilter = e.target.value;
    setFilterBy(selectedFilter);

    if (selectedFilter === "all") {
      dispatch(fetchCategories());
    }
  };

  const handleSearch = () => {
    if (filterBy === "id" && searchTerm) {
      dispatch(fetchCategoryById(searchTerm));
    } else if (filterBy === "name" && searchTerm) {
      dispatch(fetchCategoryByName(searchTerm));
    } else if (filterBy === "all") {
      dispatch(fetchCategories());
    }
  };

  // Gérer le changement de la limite des résultats
  const handleLimitChange = (e) => {
    const limit = e.target.value;
    dispatch(setLimit(limit)); // Mettre à jour la limite dans le state
    dispatch(fetchCategories()); // Recharger les catégories avec la nouvelle limite
  };

  return (
    <div className="row align-items-center mb-3">
      <div className="col-12 col-lg-auto mb-3 mb-lg-0">
        <a href="FormCategory" className="btn btn-primary btn-md font-weight-semibold btn-py-2 px-4">
          + Add Category
        </a>
      </div>
      <div className="col-8 col-lg-auto ms-auto ml-auto mb-3 mb-lg-0">
        <div className="d-flex align-items-lg-center flex-column flex-lg-row">
          <label className="ws-nowrap me-3 mb-0">Filter By:</label>
          <select
            className="form-control select-style-1 filter-by"
            name="filter-by"
            value={filterBy}
            onChange={handleFilterChange}
          >
            <option value="all">All</option>
            <option value="id">ID</option>
            <option value="name">Name</option>
          </select>
        </div>
      </div>
      <div className="col-4 col-lg-auto ps-lg-1 mb-3 mb-lg-0">
        <div className="d-flex align-items-lg-center flex-column flex-lg-row">
          <label className="ws-nowrap me-3 mb-0">Show:</label>
          <select
            className="form-control select-style-1 results-per-page"
            name="results-per-page"
            onChange={handleLimitChange} 
          >
            <option value={12}>12</option>
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
              placeholder="Search Category"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="btn btn-default" type="button" onClick={handleSearch} style={{backgroundColor:"#6495ED"}}>
              <i className="bx bx-search" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSection;