import React, { useState } from "react";
//css
import "./SwitchTab.scss";

const SwitchTab = ({ data, onTabChange }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [left, setLeft] = useState(0);

  const isMobile = window.innerWidth < 768;

  const activeTab = (tab, index) => {
    setLeft(index * (isMobile ? 95 : 100));

    setTimeout(() => {
      setSelectedTab(index);
    }, 300);
    onTabChange(tab, index);
  };

  return (
    <div className="switchingTabs">
      <div className="tabItems">
        {data.map((tab, idx) => (
          <span
            className={`tabItem ${selectedTab === idx ? "active" : ""}`}
            key={idx}
            onClick={() => activeTab(tab, idx)}
          >
            {tab}
          </span>
        ))}
        <span className="movingBg" style={{ left }}></span>
      </div>
    </div>
  );
};

export default SwitchTab;
