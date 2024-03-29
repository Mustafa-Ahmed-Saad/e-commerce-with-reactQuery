import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

const ProductCartItem = ({
  product: {
    price,
    count,
    product: { title, imageCover, id },
  },
  index,
  deleteProductFromCart,
  updateProductQuantity,
}) => {
  return (
    <div
      className="row bg-body-tertiary my-4 mainShadow rounded-3 transtion-5 flex-column flex-md-row wow fadeInLeft"
      data-wow-offset="200"
      data-wow-delay="0.2s"
      data-wow-iteration="1"
    >
      <div className="col-12 col-md-2">
        <LazyLoadImage
          effect="blur"
          className="w-100"
          src={imageCover}
          alt="product-img"
        />
      </div>
      <div className="col-12 col-md-10">
        <div className="row h-100 align-items-center justify-content-between flex-column flex-sm-row">
          <div className="col-12 col-sm-11  col-md-10">
            <h3 className="fs-5 fw-bold mb-2">{title}</h3>
            <div className="text-main fw-bold mb-1">{price} EGP</div>
            <button
              className="btn border-0 ps-0 text-danger"
              onClick={() => {
                deleteProductFromCart(id, index);
              }}
            >
              <FontAwesomeIcon icon={faTrash} /> remove
            </button>
          </div>
          <div className="col-12 col-sm-1 col-md-2 d-flex align-items-center justify-content-center flex-row flex-sm-column-reverse flex-lg-row">
            <button
              className="btn btn-outline-main"
              onClick={() => {
                updateProductQuantity(id, count - 1, index, -price);
              }}
            >
              -
            </button>
            <span className="mx-3">{count}</span>
            <button
              className="btn btn-outline-main"
              onClick={() => {
                updateProductQuantity(id, count + 1, index, price);
              }}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCartItem;
