import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectIsAuthenticated } from "../store/auth/selector";
import { logout } from "../store/auth/slice";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

export const MainNavbar = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);

  function handleLogout() {
    dispatch(logout());
  }

  return (
    <Navbar bg="light" variant="light">
      <Container>
        <Navbar.Brand href="#home">galleries</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/galleries">all galleries</Nav.Link>
          {isAuthenticated && (
            <Nav.Link href="/create">create new gallery</Nav.Link>
          )}
          {!isAuthenticated && <Nav.Link href="/login">login</Nav.Link>}
          {!isAuthenticated && <Nav.Link href="/register">register</Nav.Link>}

          <Button type="submit" onClick={handleLogout} variant="primary">
            logout
          </Button>
        </Nav>
      </Container>
    </Navbar>
  );
};
