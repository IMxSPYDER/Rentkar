import React from "react";

const MetricCard = ({ title, value, change, negative }) => (
  <div className="p-4 bg-white shadow rounded-lg">
    <h4 className="text-sm font-medium text-gray-500">{title}</h4>
    <div className="mt-2 text-xl font-bold">{value}</div>
    <p
      className={`mt-1 text-sm ${
        negative ? "text-red-500" : "text-green-500"
      }`}
    >
      vs yesterday {change}
    </p>
  </div>
);

export default MetricCard;
