import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import Logout from "../auth/Logout";

const NavBar = () => {
  const [showAccount, setShowAccount] = useState(false);

  const handleAccountClick = () => {
    setShowAccount(!showAccount);
  };

  const isLoggedIn = localStorage.getItem("token");
  const userRole = localStorage.getItem("userRole");

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary px-5 shadow sticky-top">
      <div className="container-fluid">
        <Link to={"/"} className="navbar-brand">
          <span className="hotel-color">
            <i className="fas fa-hotel"></i> LakeSide Hotel
          </span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarScroll"
          aria-controls="navbarScroll"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarScroll">
          <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
            {isLoggedIn && userRole === "ROLE_ADMIN" && (
              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to={"/admin-panel"}>
                  <i className="fas fa-user-shield"></i> Admin Panel
                </NavLink>
              </li>
            )}

            {isLoggedIn && userRole === "ROLE_USER" && (
              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to={"/control-panel"}>
                  <i className="fas fa-door-open"></i> Control Panel
                </NavLink>
              </li>
            )}
          </ul>

          <ul className="d-flex navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" to={"/find-booking"}>
                <i className="fas fa-search"></i> Find my booking
              </NavLink>
            </li>

            <li className="nav-item dropdown">
              <a
                className={`nav-link dropdown-toggle ${showAccount ? "show" : ""}`}
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                onClick={handleAccountClick}
              >
                <i className="fas fa-user"></i> Account
              </a>

              <ul className={`dropdown-menu ${showAccount ? "show" : ""}`} aria-labelledby="navbarDropdown">
                {isLoggedIn ? (
                  <Logout />
                ) : (
                  <li>
                    <Link className="dropdown-item" to={"/login"}>
                      <i className="fas fa-sign-in-alt"></i> Login
                    </Link>
                  </li>
                )}
              </ul>
            </li>
          </ul>
        </div>
      </div>
      <style jsx>{`
        .navbar {
          background-color: #fff;
          border-bottom: 1px solid #ddd;
        }

        .navbar-brand .hotel-color {
          color: #ff5a5f;
          font-weight: bold;
          font-size: 1.3em;
        }

        .navbar-toggler {
          border: none;
        }

        .navbar-toggler-icon {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='rgba%280, 0, 0, 0.5%29' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3E%3C/svg%3E");
        }

        .nav-link {
          color: #555;
          font-size: 1.1em;
          display: flex;
          align-items: center;
        }

        .nav-link i {
          margin-right: 8px;
        }

        .nav-link:hover {
          color: #ff5a5f;
        }

        .navbar-nav .dropdown-menu {
          border: none;
          box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
        }	

        .dropdown-item {
          color: #555;
          display: flex;
          align-items: center;
        }

        .dropdown-item i {
          margin-right: 8px;
        }

        .navbar-nav .dropdown-menu.show {
          display: block;
        }
      `}</style>
    </nav>
  );
};

export default NavBar;
