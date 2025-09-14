import  { useState } from 'react';

function CardCategorie() {
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
          <h4 className="card-title">ELECTRONICS</h4>
        </div>
        {!isCollapsed && (
          <div className="card-body">
            <ul className="list list-unstyled mb-0">
              <li>
                <a href="#">Smart TVs</a>
              </li>
              <li>
                <a href="#">Cameras</a>
              </li>
              <li>
                <a href="#">Headphones</a>
              </li>
              <li>
                <a href="#">Games</a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
}

export default CardCategorie;