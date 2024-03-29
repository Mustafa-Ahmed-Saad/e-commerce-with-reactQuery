import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContextMain } from "../../contexts/MainContext";

const SamplePrevArrow = ({ className, style, onClick }) => {
  const { mode } = useContextMain();

  const classes = `${className}  text-${
    mode === "dark" ? "light" : "dark"
  } "slick-arrow slick-prev fa-2x me-2"`;

  return (
    <FontAwesomeIcon
      className={classes}
      style={{ ...style, display: "block" }}
      onClick={onClick}
      icon={faArrowLeft}
    />
  );
};

export default SamplePrevArrow;
