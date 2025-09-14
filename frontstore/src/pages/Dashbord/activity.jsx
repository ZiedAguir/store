
// Example activity data (can be passed in via props or managed via state)
const activities = [
  {
    id: 1,
    date: "2024-11-20 09:30",
    type: "order",
    description: "New order placed - Order #12345",
    status: "completed"
  },
  {
    id: 2,
    date: "2024-11-19 14:45",
    type: "shipment",
    description: "Order #12344 shipped",
    status: "in-progress"
  },
  {
    id: 3,
    date: "2024-11-19 11:00",
    type: "payment",
    description: "Payment received for Order #12342",
    status: "completed"
  },
  // Add more activities as needed...
];

const ActivityList = () => {
  return (
    <div className="card card-modern">
      <div className="card-body py-4">
        <h3 className="text-4-1">Recent Activities</h3>
        <div className="activity-list">
          {activities.length === 0 ? (
            <p>No recent activities.</p>
          ) : (
            <ul className="list-unstyled">
              {activities.map((activity) => (
                <li key={activity.id} className="activity-item">
                  <div className="activity-item-header">
                    <span className="activity-date">{activity.date}</span>
                    <span className={`activity-status ${activity.status}`}>
                      {activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
                    </span>
                  </div>
                  <div className="activity-item-description">
                    <strong>{activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}</strong>:{" "}
                    {activity.description}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActivityList;
