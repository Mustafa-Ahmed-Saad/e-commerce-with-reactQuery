import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SamplePrevArrow = ({ className, style, onClick }) => (
  <FontAwesomeIcon
    className={className + "slick-arrow slick-prev text-dark fa-2x me-2"}
    style={{ ...style, display: "block" }}
    onClick={onClick}
    icon={faArrowLeft}
  />
);

export default SamplePrevArrow;
