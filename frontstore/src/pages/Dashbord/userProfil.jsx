
const UserInfoCard = ({ name, balance, products, role = "User" }) => {
  // Generate initials from the name
  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="card card-modern">
      <div className="card-body p-0">
        <div className="widget-user-info">
          <div className="widget-user-info-header">
            <h2 className="font-weight-bold text-color-dark text-5">Hello, {name}</h2>
            <p className="mb-0">{role}</p>
            <div className="widget-user-acrostic bg-primary">
              <span className="font-weight-bold">{getInitials(name)}</span>
            </div>
          </div>
          <div className="widget-user-info-body">
            <div className="row">
              <div className="col-auto">
                <strong className="text-color-dark text-5">{balance}</strong>
                <h3 className="text-4-1">User Balance</h3>
              </div>
              <div className="col-auto">
                <strong className="text-color-dark text-5">{products}</strong>
                <h3 className="text-4-1">Products</h3>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <a href="/UserProfil" className="btn btn-light btn-xl border font-weight-semibold text-color-dark text-3 mt-4">
                  View Profile
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfoCard;
