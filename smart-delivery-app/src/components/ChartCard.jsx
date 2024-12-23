import React from "react";

const ChartCard = ({ title, children }) => (
  <div className="p-4 bg-white shadow rounded-lg">
    <h4 className="text-sm font-medium text-gray-500 mb-4">{title}</h4>
    {children}
  </div>
);

export default ChartCard;
