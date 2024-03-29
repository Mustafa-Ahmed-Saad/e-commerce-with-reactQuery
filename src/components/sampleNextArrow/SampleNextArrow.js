import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SampleNextArrow = ({ className, style, onClick }) => (
  <FontAwesomeIcon
    className={className + "slick-arrow slick-next text-dark fa-5x me-2"}
    style={{ ...style, display: "block" }}
    onClick={onClick}
    icon={faArrowRight}
  />
);

export default SampleNextArrow;
