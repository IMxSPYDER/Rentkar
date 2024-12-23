import React, { useState, useEffect } from "react";

import Logo from "../assets/logo_d.png"

import { CiGrid41 } from "react-icons/ci";
import { RiTableFill } from "react-icons/ri";
import { RiTableLine } from "react-icons/ri";
import { FaClipboardList } from "react-icons/fa";
import { IoGrid } from "react-icons/io5";
import { FiPhone } from "react-icons/fi";
import { FaPhone } from "react-icons/fa6";
import { LuClipboardList } from "react-icons/lu";

import { Link, useLocation } from "react-router-dom";

const Sidenavbar = () => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const path = location.pathname.split("/")[1];
    setActiveLink(path);
  }, [location]);

  const handleNavigation = () => {
    if (isOpen) {
      setIsOpen(false); // Close the sidebar
    }
  };

  return (
    <div>
      {/* Mobile Header */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between bg-white text-black p-4 shadow-md">
        <div className="flex items-center  text-lg font-bold">
          <img src={Logo} alt="" className="h-10 w-15" />
          <p className="text-blue-600">ShipWise</p>
        </div>
        <button
          className="text-gray-500 p-2 rounded"
          onClick={toggleSidebar}
        >
          {isOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </header>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 z-50 h-full bg-white text-gray-400 text-left w-64 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:translate-x-0`}
      >
        <div className="p-4 flex items-center  text-lg font-bold">
          <img src={Logo} alt="" className="h-10 w-15" />
          <p className="text-blue-600">ShipWise</p>
        </div>
        <ul className="space-y-4 mt-6">
          <li>
            <Link
              to="/"
              onClick={handleNavigation}
              className={`flex align-center items-center gap-2 m-2 px-4 py-2 hover:m-2 hover:rounded-md hover:bg-blue-600 hover:text-white ${
                activeLink === "" ? "font-bold text-white bg-blue-600 rounded-md" : ""
              }`}
            >
              {activeLink === "" ? <IoGrid /> : <CiGrid41 />}
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/delivery"
              onClick={handleNavigation}
              className={`flex align-center items-center gap-2 m-2 px-4 py-2 hover:m-2 hover:rounded-md hover:bg-blue-600 hover:text-white ${
                activeLink === "delivery" ? "font-bold text-white bg-blue-600 rounded-md" : ""
              }`}
            >
              {activeLink === "delivery" ? <RiTableFill /> : <RiTableLine />}
              Delivery Partners
            </Link>
          </li>
          <li>
            <Link
              to="/orders"
              onClick={handleNavigation}
              className={`flex align-center items-center gap-2 m-2 px-4 py-2 hover:m-2 hover:rounded-md hover:bg-blue-600 hover:text-white ${
                activeLink === "orders" ? "font-bold text-white bg-blue-600 rounded-md" : ""
              }`}
            >
              {activeLink === "orders" ? <FaClipboardList /> : <LuClipboardList />}
              Orders List
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              onClick={handleNavigation}
              className={`flex align-center items-center gap-2 m-2 px-4 py-2 hover:m-2 hover:rounded-md hover:bg-blue-600 hover:text-white ${
                activeLink === "contact" ? "font-bold text-white bg-blue-600 rounded-md" : ""
              }`}
            >
              {activeLink === "contact" ? <FaPhone /> : <FiPhone />}
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidenavbar;
