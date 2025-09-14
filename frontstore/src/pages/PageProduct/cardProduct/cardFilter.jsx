import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSubCategories } from '../../../Redux/Action/subCategoriesActions';
import "./cardfilter.css";
import { fetchProducts } from '../../../Redux/Action/productActions';

function CardFilter({ onFilter }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSubCategories());
  }, [dispatch]);

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [minPrice, setMinPrice] = useState(25);
  const [maxPrice, setMaxPrice] = useState(270);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const categories = useSelector((state) => state.categories.categories);

  const toggleCollapse = () => {
    setIsCollapsed((prev) => !prev);
  };

  const handleFilter = (e) => {
    e.preventDefault();

    const filters = {
      minPrice,
      maxPrice,
      categories: selectedCategories,
    };

    console.log('Filters being sent:', filters);

    onFilter(filters, 1); 
  };

  const handleResetFilters = () => {
    setMinPrice(0);
    setMaxPrice(1000);
    setSelectedCategories([]);
    dispatch(fetchProducts(1)); 
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  return (
    <>
      <div className="card card-modern">
        <div className="card-header">
          <div className="card-actions">
            <a
              href="#"
              className="card-action card-action-toggle"
              data-card-toggle
              onClick={toggleCollapse}
              style={{ cursor: 'pointer' }}
            />
          </div>
          <h4 className="card-title">FILTERS</h4>
        </div>
        {!isCollapsed && (
          <div className="card-body">
            <button
              type="button"
              className="btn btn-primary m-2 btn-h-1 font-weight-semibold rounded-0 btn-px-3 btn-py-1 text-2"
              onClick={handleFilter}
            >
              FILTER
            </button>

            <button
              type="button"
              className="btn btn-secondary m-2 btn-h-1 font-weight-semibold rounded-0 btn-px-3 btn-py-1 text-2"
              onClick={handleResetFilters}
            >
              RESET
            </button>

            {/* Filtre par prix */}
            <div className="slider-range-wrapper mb-4">
              <div className="m-md slider-primary slider-modern">
                <input
                  id="priceRange"
                  type="hidden"
                  defaultValue={`${minPrice}, ${maxPrice}`}
                />
              </div>
              <form
                className="d-flex align-items-center justify-content-between mb-2"
                onSubmit={handleFilter}
              >
                <div className="d-flex align-items-center gap-1">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Min"
                    value={minPrice}
                    onChange={(e) => setMinPrice(Number(e.target.value))}
                    min="0"
                    style={{ width: '70px' }}
                  />
                  <span>-</span>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Max"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    min="0"
                    style={{ width: '70px' }}
                  />
                </div>
              </form>
            </div>

            {/* Filtre par catégories */}
            <div className="mb-4" style={{ width: "10rem" }}>
              <h6 className="mb-3">CATEGORIES</h6>
              <ul className="list-unstyled category-list">
                {categories.map((category) => (
                  <li key={category._id}>
                    <label className="d-flex align-items-center gap-2">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category._id)}
                        onChange={() => handleCategoryChange(category._id)}
                      />
                      {category.name}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default CardFilter;