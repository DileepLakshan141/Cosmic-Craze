import React, { useState } from "react";
import "./dashboard.styles.css";
import sidebarData from "../../data/sidebar_data";
import axiosInstance from "../../axios/axios";
import { useDispatch } from "react-redux";
import { logout } from "../../features/UserSlice";
import { Link, useNavigate } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { MdClose } from "react-icons/md";
import { Outlet } from "react-router-dom";
import { RiLogoutCircleRFill } from "react-icons/ri";
import { toast } from "react-hot-toast";

function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [sidebarVisibility, setSidebarVisibility] = useState(false);

  const sidebarVisibilityAdjuster = () => {
    setSidebarVisibility(!sidebarVisibility);
  };

  const logoutHandler = async () => {
    setSidebarVisibility(false);
    try {
      const response = await axiosInstance.get("/auth/logout", {
        withCredentials: true,
        credentials: "include",
      });
      if (response) {
        console.log(response);
        dispatch(logout());
        navigate("/signin");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className="dashboard-container">
      {/* sidebar */}
      <div
        className={`dashboard-sidebar ${
          sidebarVisibility ? "show-bar" : "hide-bar"
        }`}
      >
        <div className="bar-content">
          {sidebarData.map((item, index) => {
            return (
              <Link
                className="sidebar-link"
                to={item.link}
                key={index}
                onClick={() => setSidebarVisibility(false)}
              >
                <span className="sidebar-link-icon">{item.icon}</span>
                <span className="sidebar-link-text">{item.text}</span>
              </Link>
            );
          })}

          <div className="sidebar-link logout" onClick={() => logoutHandler()}>
            <span className="sidebar-link-icon">
              <RiLogoutCircleRFill />
            </span>
            <span className="sidebar-link-text">Logout</span>
          </div>
        </div>
        <button
          className="bar-activate-btn"
          onClick={() => sidebarVisibilityAdjuster()}
        >
          {sidebarVisibility ? (
            <MdClose className="btn-visibility-icon" />
          ) : (
            <FiMenu className="btn-visibility-icon" />
          )}
        </button>
      </div>
      {/* dashboard-content */}
      <Outlet />
    </div>
  );
}

export default Dashboard;
