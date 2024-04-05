import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

const Logo = () => (
  <div>
    <FontAwesomeIcon icon={faCartShopping} className="text-main fa-2x me-2" />
    <NavLink className="navbar-brand fw-bold fs-2" to="/home">
      fresh cart
    </NavLink>
  </div>
);

export default Logo;
