import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectIsAuthenticated } from "../store/auth/selector";
import { logout } from "../store/auth/slice";
import "bootstrap/dist/css/bootstrap.min.css";

export const Navbar = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);

  function handleLogout() {
    dispatch(logout());
  }

  return (
    <div className="my-4">
      galleries <a href="/galleries">all galleries</a>
      {!isAuthenticated && <a href="/login">login</a>}
      {isAuthenticated && <a href="/my-galleries">my galleries</a>}
      {isAuthenticated && <a href="/create">create new gallery</a>}
      {!isAuthenticated && <a href="/register">register</a>}
      {isAuthenticated && (
        <button type="submit" onClick={handleLogout} className="px-4">
          logout
        </button>
      )}
    </div>
  );
};
