import { LazyLoadImage } from "react-lazy-load-image-component";
import SampleNextArrow from "../components/sampleNextArrow/SampleNextArrow";
import SamplePrevArrow from "../components/samplePrevArrow/SamplePrevArrow";

// settingHomeResponsiveSlider
export const settingHomeResponsiveSlider = {
  dots: false,
  customPaging: function (i) {
    return <span className="dots d-inline-block rounded-3"></span>;
  },
  infinite: false,
  speed: 500,
  slidesToShow: 6,
  swipeToSlide: true,
  slidesToScroll: 1,
  initialSlide: 0,
  arrows: true,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
        dots: false,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

// settingMainSlider
export const settingMainSlider = {
  dots: true,
  customPaging: function (i) {
    return <span className="dots d-inline-block rounded-3"></span>;
  },
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
};

// settingProductSliderFun
export const settingProductSliderFun = (imgUrls) => {
  return {
    customPaging: function (i) {
      return (
        <span className="d-inline-block h-100">
          <LazyLoadImage
            effect="blur"
            className="w-100 h-100 object-fit-cover object-position-center"
            src={imgUrls[i]}
            alt="product-img"
          />
        </span>
      );
    },
    dots: true,
    arrows: false,
    dotsClass: "slick-dots slick-thumb d-none d-md-block",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
};
