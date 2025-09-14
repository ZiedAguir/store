import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBrands } from '../../../Redux/Action/brandActions';
import LazyLoad from 'react-lazyload'; 

function CardBrand() {
  const dispatch = useDispatch();
  const { brands, isFetching, error, totalBrands } = useSelector((state) => state.brands);
  const safeBrands = Array.isArray(brands) ? brands : [];
  const [page, setPage] = useState(1); 
  const limit = 5; 
  const [isCollapsed, setIsCollapsed] = useState(false); 

  useEffect(() => {
    dispatch(fetchBrands({ page, limit }));
  }, [dispatch, page, limit]);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
      const total = typeof totalBrands === 'number' ? totalBrands : Number.POSITIVE_INFINITY;
      if (scrollTop + clientHeight >= scrollHeight - 20 && !isFetching && safeBrands.length < total) {
        setPage((prevPage) => prevPage + 1); 
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isFetching, safeBrands.length, totalBrands]);

  const toggleCollapse = () => {
    setIsCollapsed((prev) => !prev); 
  };

  if (isFetching && page === 1) {
    return <p>Loading brands...</p>;
  }

  if (error) {
    return <p>Error loading brands. Please try again later.</p>;
  }

  return (
    <>
      <div className="card card-modern" style={{ maxHeight: '400px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
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
          <h4 className="card-title">BRANDS</h4>
        </div>
        {!isCollapsed && (
          <div className="card-body" style={{ flex: 1, overflowY: 'auto', paddingRight: '10px' }}>
            <ul className="list list-unstyled mb-0" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {safeBrands.map((brand, index) => (
                <LazyLoad key={brand._id} height={100} offset={100} once>
                  <li style={{ padding: '10px 0', borderBottom: '1px solid #e0e0e0' }}>
                    <a href="#" style={{ textDecoration: 'none', color: '#333', display: 'block' }}>
                      <span style={{ color: '#95a5a6' }}>{index} :</span> {brand.name} <span className="float-end" style={{ color: '#e77f3c' }}>{brand.productsCount}</span>
                    </a>
                  </li>
                </LazyLoad>
              ))}
            </ul>
            {isFetching && <p>Loading more brands...</p>}
          </div>
        )}
      </div>
    </>
  );
}

export default CardBrand;