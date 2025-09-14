
const TabNavigation = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="col-lg-2-5 col-xl-1-5">
      <div
        className="nav flex-column tabs"
        id="tab"
        role="tablist"
        aria-orientation="vertical"
        style={{ backgroundColor: "#3ce7dd" }}
      >
        {tabs.map((tab) => (
          <a
            key={tab.id}
            className={`nav-link ${activeTab === tab.id ? "active" : ""}`}
            id={`${tab.id}-tab`}
            data-bs-toggle="pill"
            data-bs-target={`#${tab.id}`}
            role="tab"
            aria-controls={tab.id}
            aria-selected={activeTab === tab.id}
            onClick={() => onTabChange(tab.id)}
          >
            {tab.label}
          </a>
        ))}
      </div>
    </div>
  );
};

export default TabNavigation;