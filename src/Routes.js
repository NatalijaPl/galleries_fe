import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { Switch } from "react-router-dom";
import { Route } from "react-router-dom";
import { selectIsAuthenticated } from "../src/store/auth/selector";
import { getActiveUser } from "./store/auth/slice";
import { Home } from "./pages/Home";
import { ViewGallery } from "./pages/ViewGallery";
import { BrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateNewGallery from "./pages/CreateNewGallery";

export default function Routes() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getActiveUser());
    }
  }, [dispatch, isAuthenticated]);

  const PrivateRoute = ({ children, ...rest }) => {
    const isAuthenticated = useSelector(selectIsAuthenticated);

    return (
      <Route {...rest}>
        {isAuthenticated ? children : <Redirect to="/login" />}
      </Route>
    );
  };

  const GuestRoute = ({ children, ...rest }) => {
    const isAuthenticated = !!useSelector(selectIsAuthenticated);
    return (
      <Route {...rest}>
        {!isAuthenticated ? children : <Redirect to="/" />}
      </Route>
    );
  };

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Redirect to="/galleries"></Redirect>
        </Route>
        <Route exact path="/authors/:id">
          <Home />
        </Route>
        <Route path="/galleries" exact>
          <Home />
        </Route>
        <GuestRoute path="/login" exact>
          <Login />
        </GuestRoute>
        <GuestRoute path="/register" exact>
          <Register />
        </GuestRoute>
        <PrivateRoute exact path="/galleries/:id">
          <ViewGallery />
        </PrivateRoute>
        <PrivateRoute path="/create" exact>
          <CreateNewGallery />
        </PrivateRoute>
        <PrivateRoute exact path="/edit-gallery/:id">
          <CreateNewGallery />
        </PrivateRoute>
      </Switch>
    </BrowserRouter>
  );
}
