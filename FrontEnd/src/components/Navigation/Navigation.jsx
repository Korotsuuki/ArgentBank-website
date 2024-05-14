import React from 'react';
import logo from "../../assets/images/argentBankLogo.png";
import { LuLogOut } from "react-icons/lu";
/* Variable pour manipuler le store redux */
import {useSelector, useDispatch} from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { logoutUser } from "../../redux/loginSlice.js";

function Navigation() {
  const dispatch = useDispatch();
  const loginStore = useSelector((state) => state.login);
  const token = useSelector((state) => state.login.userToken);
  if (token) {
    console.log(
      "le token est présent dans le store donc je change Sign In en Sign out",
      token
    );
  } else {
    console.log("le token n'est pas présent dans je laisse le Sign In");
  }
  /* Au click du logout suppression du token du local storage */
  const handleRedirectHome = () => {
    localStorage.removeItem("token");
    console.log("Token supprimé du local storage");
    dispatch(logoutUser());
  };
  return (
    <nav className="main-nav">
        <NavLink className="main-nav-logo" to="/">
            <img
                className="main-nav-logo-image"
                src={logo}
                alt="Argent Bank Logo"
                />
                <h1 className="sr-only">Argent Bank</h1>
        </NavLink>
        <>
        <div className="login">
          {/* Conditionnellement rendu le lien "Sign In" ou "Sign Out" */}
          {loginStore &&
            loginStore.userProfil &&
            loginStore.userProfil.userName && (
              <Link to="/user" className="userName">
                <i className="fa fa-user-circle"></i>
                <p>{loginStore.userProfil.userName}</p>
              </Link>
            )}
            {token ? (
              <NavLink
              className="main-nav-item"
              to="/"
              onClick={handleRedirectHome}
              >
                <LuLogOut />
                Sign Out
              </NavLink>
            ) : (
              <NavLink className="main-nav-item" to="/sign-in">
                <i className="fa fa-user-circle"></i>
                Sign In
              </NavLink>
            )}
        </div>
        </>
    </nav>
  )
}

export default Navigation