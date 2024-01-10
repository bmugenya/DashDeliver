import React, { useState, useEffect } from 'react';

const Tabs = ({ tabs, defaultTab, children }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  useEffect(() => {
    // Add any side effects you want to perform when the active tab changes
  }, [activeTab]);

  const changeTab = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="tabs-container">
      <div className="tabs">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => changeTab(tab.id)}
          >
            {tab.label}
          </div>
        ))}
      </div>
      <div className="tab-content">{children}</div>
    </div>
  );
};

export default Tabs;
