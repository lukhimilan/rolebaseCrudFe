/* eslint-disable jsx-a11y/anchor-is-valid */
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Power } from "react-bootstrap-icons";
import { useEffect, useState } from "react";
import { API } from "../API";
import useAuth from "../hooks/useAuth";
import { NavLink } from "react-router-dom";

export const Header = () => {
  const { auth, setAuth } = useAuth();
  const [state, setState] = useState({
    menu: false,
    isOpen: false,
    homeLinkClass: "nav-item nav-link",
    aboutLinkClass: "nav-item nav-link",
    menuClass: "",
  });

  const [isLoggedInUser, setIsLoggedInUser] = useState({});
  const navigate = useNavigate();
  const authToken = localStorage.getItem("authToken");
  const user = JSON.parse(localStorage.getItem("user"));
  const [pathName, setPathName] = useState("");

  useEffect(() => {
    async function getUser() {
      if (user?._id) {
        const { data } = await API.get(`/user/${user._id}`);
        setIsLoggedInUser(data.data);
        localStorage.setItem("user", JSON.stringify(data.data));
        setPathName(
          data.data.role === "admin"
            ? "/admin-dashboard"
            : data.data.role === "user"
            ? "/user-dashboard"
            : "/moderator-dashboard"
        );
      }
    }
    getUser();
  }, [user._id]);

  const toggleMenu = () => {
    setState({
      ...state,
      menu: !state.menu,
    });
  };

  const show = state.menu ? "show" : "";

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    setAuth({});
    toast.success("logout successFully.");
    navigate("/login");
  };

  return (
    <>
      <nav className="navbar sticky-top navbar-expand-lg navbar-light bg-secondary text-white">
        <div className="container-fluid">
          <div className="d-flex d-lg-none justify-content-between align-items-center w-100">
            <NavLink
              className={`${state.homeLinkClass} nav-font p-0`}
              to={pathName}
              style={({ isActive }) => ({
                color: isActive ? "#b66dff" : "",
              })}
            ></NavLink>
            <button
              className="navbar-toggler"
              type="button"
              onClick={toggleMenu}
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
          <div
            className={
              "justify-content-between collapse navbar-collapse " + show
            }
          >
            <ul className="navbar-nav align-items-center gap-2">
              <li className="nav-item d-none d-lg-block">
                <NavLink
                  className={`${state.homeLinkClass} nav-font p-0`}
                  to={pathName}
                  style={({ isActive }) => ({
                    color: isActive ? "#b66dff" : "",
                  })}
                >
                  Home
                </NavLink>
              </li>
              {isLoggedInUser?.role === "admin" ? (
                <li className="nav-item">
                  <NavLink
                    className={`${state.homeLinkClass} nav-font p-0`}
                    exact={"true"}
                    to={"/manage-users"}
                    style={({ isActive }) => ({
                      color: isActive ? "#b66dff" : "",
                    })}
                  >
                    ManageUser
                  </NavLink>
                </li>
              ) : isLoggedInUser?.role === "moderator" ? (
                <li className="nav-item">
                  <NavLink
                    className={`${state.homeLinkClass} nav-font p-0`}
                    exact={"true"}
                    to={"/user-list"}
                    style={({ isActive }) => ({
                      color: isActive ? "#b66dff" : "",
                    })}
                  >
                    Users List
                  </NavLink>
                </li>
              ) : (
                ""
              )}
            </ul>
            <ul className="navbar-nav">
              {authToken ? (
                <>
                  <li className="nav-item nav-font">
                    <div onClick={() => logout()} className="nav-link">
                      <div style={{ marginTop: "3px" }}>
                        <Power size={20} color="#9c9fa6" />
                      </div>
                    </div>
                  </li>
                </>
              ) : (
                ""
              )}
            </ul>
          </div>
        </div>
      </nav>
      <Toaster />
    </>
  );
};
