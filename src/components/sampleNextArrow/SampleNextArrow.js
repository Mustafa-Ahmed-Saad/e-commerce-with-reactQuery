import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContextMain } from "../../contexts/MainContext";

const SampleNextArrow = ({ className, style, onClick }) => {
  const { mode } = useContextMain();

  const classes = `${className}  text-${
    mode === "dark" ? "light" : "dark"
  } "slick-arrow slick-next fa-5x me-2"`;

  return (
    <FontAwesomeIcon
      className={classes}
      style={{ ...style, display: "block" }}
      onClick={onClick}
      icon={faArrowRight}
    />
  );
};

export default SampleNextArrow;
