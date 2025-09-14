
const StatisticsCard = ({ title, value, trend }) => (
  <div className="card card-modern">
    <div className="card-body py-4">
      <div className="row align-items-center">
        <div className="col-6 col-md-4">
          <h3 className="text-4-1 my-0">{title}</h3>
          <strong className="text-6 text-color-dark">{value}</strong>
        </div>
        <div className="col-6 col-md-4 border border-top-0 border-end-0 border-bottom-0 border-color-light-grey py-3">
          <h3 className="text-4-1 text-color-success line-height-2 my-0">
            {title} <strong>{trend} ↑</strong>
          </h3>
          <span>30 days</span>
        </div>
        <div className="col-md-4 text-start text-md-right pe-md-4 mt-4 mt-md-0">
          <i className="bx bx-cart-alt icon icon-inline icon-xl bg-primary rounded-circle text-color-light" />
        </div>
      </div>
    </div>
  </div>
);

export default StatisticsCard;
