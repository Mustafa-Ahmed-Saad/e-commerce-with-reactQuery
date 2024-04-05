import { NavLink } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Badge from "react-bootstrap/Badge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useContextMain } from "../../../contexts/MainContext";
import { useLogOutHook } from "../../../helper/hooks/function";

const NavbarCollapse = ({ Collapse }) => {
  const { token, productsCounter } = useContextMain();
  const { logOut } = useLogOutHook();

  return (
    <Collapse id="basic-navbar-nav">
      {token ? (
        <>
          <Nav className="align-items-sm-start align-items-lg-center m-auto">
            {/* // home */}
            <NavLink
              className="nav-link fw-bold me-2"
              aria-current="page"
              to="/home"
            >
              Home
            </NavLink>
            {/* // cart */}
            <NavLink
              className="nav-link fw-bold me-2"
              aria-current="page"
              to="/cart"
            >
              cart
            </NavLink>
            {/* //  wish list */}
            <NavLink
              className="nav-link fw-bold me-2"
              aria-current="page"
              to="/wishList"
            >
              wish list
            </NavLink>
            {/* // Products */}
            <NavLink
              className="nav-link fw-bold me-2"
              aria-current="page"
              to="/products"
            >
              Products
            </NavLink>
            {/* // categories */}
            <NavLink
              className="nav-link fw-bold me-2"
              aria-current="page"
              to="/categories"
            >
              categories
            </NavLink>
            {/* brands */}
            <NavLink
              className="nav-link fw-bold me-2"
              aria-current="page"
              to="/brands"
            >
              brands
            </NavLink>
            {/* my orders */}
            <NavLink
              className="nav-link fw-bold me-2"
              aria-current="page"
              to="/allorders"
            >
              my orders
            </NavLink>
          </Nav>
          <Nav className="align-items-center">
            <div className="d-flex flex-column flex-lg-row align-items-center">
              {/* // cart icon */}
              <NavLink
                className="nav-link fw-bold position-relative mb-sm-4 mb-lg-0 me-2 "
                aria-current="page"
                to="/cart"
              >
                <FontAwesomeIcon
                  icon={faCartShopping}
                  className="text-secondary fa-xl me-1"
                />
                <Badge
                  bg="main"
                  className="position-absolute start-75 translate-middle badge rounded-pill"
                >
                  {productsCounter >= 0 ? productsCounter : 0}
                </Badge>
              </NavLink>
              {/* // logout */}
              <NavLink
                className="nav-link fw-bold"
                aria-current="page"
                to="/login"
                onClick={logOut}
              >
                log out
              </NavLink>
            </div>
          </Nav>
        </>
      ) : (
        <Nav className="align-items-center ms-auto">
          {/* //  register */}
          <NavLink
            className="nav-link fw-bold me-2"
            aria-current="page"
            to="/register"
          >
            register
          </NavLink>
          {/* // login */}
          <NavLink className="nav-link fw-bold" aria-current="page" to="/login">
            log in
          </NavLink>
        </Nav>
      )}
    </Collapse>
  );
};

export default NavbarCollapse;
