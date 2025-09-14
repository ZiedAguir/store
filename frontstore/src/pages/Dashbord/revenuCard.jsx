
import "./revenucard.css"
const RevenueCard = ({ thisMonth, lastMonth, totalProfit }) => {
  return (
    <div className="card revenue-card shadow-sm border-0">
      <div className="card-body">
        <h5 className="card-title text-uppercase font-weight-bold">Revenue</h5>
        <div className="row">
          <div className="col-6">
            <p className="mb-2 text-muted">This Month</p>
            <h6 className="font-weight-bold text-success">{thisMonth}</h6>
          </div>
          <div className="col-6">
            <p className="mb-2 text-muted">Last Month</p>
            <h6 className="font-weight-bold text-info">{lastMonth}</h6>
          </div>
        </div>
        <hr />
        <div className="total-revenue">
          <p className="text-muted mb-2">Total Profit</p>
          <h5 className="font-weight-bold text-primary">{totalProfit}</h5>
        </div>
      </div>
    </div>
  );
};

export default RevenueCard;
