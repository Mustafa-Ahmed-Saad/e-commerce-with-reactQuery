import { LazyLoadImage } from "react-lazy-load-image-component";
import Slider from "react-slick";
import { settingProductSliderFun } from "../../helper/sliderSetting";

const ProductSlider = ({ imgUrls }) => {
  const settingProductSlider = settingProductSliderFun(imgUrls);

  return (
    <div className="productSluder-un">
      <Slider {...settingProductSlider} className="productSlider">
        {imgUrls?.map((imgUrl, index) => (
          <div className="overflow-hidden h-300px" key={index}>
            <LazyLoadImage
              effect="blur"
              className="w-100 h-100 object-fit-contain object-position-center"
              src={imgUrl}
              alt="product-img"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ProductSlider;
