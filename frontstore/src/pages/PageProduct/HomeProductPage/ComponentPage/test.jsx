import { useEffect, useState } from "react";
import Pagination from "../../../../componnent/pagination/pagination";
import CardCategorie from "../../cardProduct/cardCategorie";
import CardFilter from "../../cardProduct/cardFilter";
import CardSize from "../../cardProduct/cardSize";
import CardBrand from "../../cardProduct/cardBrand";
import CardPrincipal from "../../cardProduct/cardPrincipal";
import apiRequest from "../../../../componnent/axios/axiosInstance.js";
import "./list.css";

function ListProduct() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    numberOfPages: 1,
    results: 0,
    next: null,
    prev: null,
  });

  useEffect(() => {
    fetchProducts();
  }, [page]);

  const fetchProducts = async () => {
    try {
      const response = await apiRequest.get(`/products?page=${page}`);
      setProducts(response.data.data);
      setPagination(response.data.paginationResult);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  return (
    <section role="main" className="container-fluid content-body content-body-modern mt-0">
      <div className="row justify-content-center justify-content-sm-between pt-2">
        <div className="col-sm-auto text-center mb-4 mb-sm-0 mt-2 mt-sm-0">
          <a className="ecommerce-sidebar-link btn btn-primary btn-md font-weight-semibold btn-py-2 px-4">
            Products
          </a>
        </div>
      </div>

      <div className="row row-gutter-sm mb-5">
        {/* Colonne de filtres avec une largeur augmentée */}
        <div className="col-lg-3 col-xl-2 mb-4 mb-lg-0">
          <div className="filters-sidebar-wrapper bg-light rounded">
            <CardCategorie />
            <hr className="solid opacity-7" />
            <CardFilter />
            <hr className="solid opacity-7" />
            <CardSize />
            <hr className="solid opacity-7" />
            <CardBrand />
          </div>
        </div>

        {/* Colonne principale ajustée */}
        <div className="col-lg-9 col-xl-10">
          <CardPrincipal products={products} />
          <Pagination pagination={pagination} setPage={setPage} results={pagination.results} />
        </div>
      </div>
    </section>
  );
}

export default ListProduct;