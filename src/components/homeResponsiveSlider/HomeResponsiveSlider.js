import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "./HomeResponsiveSlider.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { settingHomeResponsiveSlider } from "../../helper/sliderSetting";

export default function HomeResponsiveSlider({ categories }) {
  const navigate = useNavigate();

  const goToCategory = (id) => {
    navigate(`/categories/${id}`);
  };

  let ui = null;
  if (categories?.length > 0) {
    ui = (
      <div className="container-xxl py-5" id="homeResponsiveSlider">
        <h2 className="text-center mb-2 fw-bold">Categories</h2>
        <Slider
          {...settingHomeResponsiveSlider}
          className="HomeResponsiveSlider"
        >
          {categories.map(({ _id, name, image }) => (
            <div
              key={_id}
              className="cursor-pointer"
              onClick={() => {
                goToCategory(_id);
              }}
            >
              <LazyLoadImage
                effect="blur"
                src={image}
                alt="slider-img"
                width="100%"
                className="w-100 object-position-center object-fit-cover"
              />

              <h3 className="text-center fs-5 text-main">{name}</h3>
            </div>
          ))}
        </Slider>
      </div>
    );
  }

  return ui;
}
