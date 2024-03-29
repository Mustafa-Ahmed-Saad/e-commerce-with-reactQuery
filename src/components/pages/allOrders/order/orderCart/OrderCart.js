import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

const OrderCart = ({
  cartInfo: {
    count,
    price,
    product: { imageCover, title, id },
  },
}) => (
  <div className="row bg-body-secondary rounded-4 p-3 mb-2 align-items-center">
    <div className="col-12 col-lg-2">
      <LazyLoadImage
        effect="blur"
        className="w-100 object-fit-contain object-position-center"
        height={"100px"}
        src={imageCover}
        alt="product-img"
      />
    </div>
    <div className="col-12 col-lg-7">
      <div className="fw-bold">{title}</div>
      <div className="text-secondary mx-2">
        <span className="fw-bold">id:</span>
        <span className="text-break">{id}</span>
      </div>
    </div>
    <div className="row align-items-center px-0 col-12 col-lg-3 text-end flex-column-reverse flex-sm-row-reverse flex-lg-column">
      <div className="col-12 col-sm-6 col-lg-12 text-start text-sm-end text-main fw-bold">
        {price} EGP
      </div>
      <div className="col-12 col-sm-6 col-lg-12 text-start text-lg-end text-secondary my-2">
        <span className="bg-dark-subtle py-1 px-2 rounded-3">Qty: {count}</span>
      </div>
    </div>
  </div>
);

export default OrderCart;
