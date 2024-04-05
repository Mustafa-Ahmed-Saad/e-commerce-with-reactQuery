import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faX } from "@fortawesome/free-solid-svg-icons";

const ResponsiveNavToggle = ({ Toggle, isMenuOpen, setIsMenuOpen }) => (
  <Toggle
    aria-controls="basic-navbar-nav"
    onClick={() => {
      setIsMenuOpen(!isMenuOpen);
    }}
  >
    {isMenuOpen ? (
      <FontAwesomeIcon icon={faX} className="text-main" />
    ) : (
      <FontAwesomeIcon icon={faBars} className="text-main" />
    )}
  </Toggle>
);

export default ResponsiveNavToggle;
