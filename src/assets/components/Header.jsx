import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import argentBankLogo from "../images/argentBankLogo.png";

const Header = ({ firstName }) => {
  // Utiliser useLocation pour obtenir l'URL actuelle
  const location = useLocation();

  // Vérifier si l'utilisateur est sur la page User
  const isUserPage = location.pathname === "/user";

  return (
    <header>
      <nav className="main-nav">
        <a className="main-nav-logo" href="/">
          <img
            className="main-nav-logo-image"
            src={argentBankLogo}
            alt="Argent Bank Logo"
          />
          <h1 className="sr-only">Argent Bank</h1>
        </a>
        <div>
          {isUserPage ? (
            <div className="user-info">
              <span className="user-name">
                <i className="fa fa-user-circle"></i> {firstName}
              </span>
              <NavLink className="main-nav-item" to="/logout">
                <i className="fa fa-sign-out"></i>
                Sign Out
              </NavLink>
            </div>
          ) : (
            <NavLink className="main-nav-item" to="/login">
              <i className="fa fa-user-circle"></i>
              Sign In
            </NavLink>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
