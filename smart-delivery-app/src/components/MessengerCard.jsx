import React from "react";

const MessengerCard = () => (
  <div className="p-4 bg-white shadow rounded-lg">
    <h4 className="text-sm font-medium text-gray-500 mb-4">Messenger</h4>
    <ul>
      {["Marvin McKinney", "Cameron Williamson", "Leslie Alexander"].map(
        (name, index) => (
          <li
            key={index}
            className="flex items-center space-x-4 py-2 border-b last:border-0"
          >
            <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
            <div>
              <p className="text-sm font-medium">{name}</p>
              <p className="text-xs text-gray-400">
                Lorem ipsum dolor sit amet.
              </p>
            </div>
          </li>
        )
      )}
    </ul>
  </div>
);

export default MessengerCard;
