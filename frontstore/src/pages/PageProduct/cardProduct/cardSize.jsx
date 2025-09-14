
import { useState } from 'react';

function CardSize() {
  const [isCollapsed, setIsCollapsed] = useState(false); 

  const toggleCollapse = () => {
    setIsCollapsed((prev) => !prev); 
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
          <h4 className="card-title">SIZES</h4>
        </div>
        {!isCollapsed && (
          <div className="card-body">
            <ul className="list list-inline list-filter mb-0">
              <li className="list-inline-item">
                <a href="#">S</a>
              </li>
              <li className="list-inline-item">
                <a href="#" className="active">
                  M
                </a>
              </li>
              <li className="list-inline-item">
                <a href="#">L</a>
              </li>
              <li className="list-inline-item">
                <a href="#">XL</a>
              </li>
              <li className="list-inline-item">
                <a href="#">2XL</a>
              </li>
              <li className="list-inline-item">
                <a href="#">3XL</a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
}

export default CardSize;