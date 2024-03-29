import { faCartShopping, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LazyLoadImage } from "react-lazy-load-image-component";

const ProductCartWishlist = ({
  title,
  price,
  imageCover,
  id,
  deleteFromWishList,
  addToCardHook,
}) => (
  <div className="row my-4 bg-body-tertiary mainShadow rounded-3 transtion-5 flex-column flex-sm-row">
    <div className="col-12 col-sm-2">
      <LazyLoadImage
        effect="blur"
        className="w-100"
        src={imageCover}
        alt="product-img"
      />
    </div>
    <div className="col-12 col-sm-10">
      <div className="row h-100 align-items-center justify-content-between flex-column flex-sm-row">
        <div className="col-12 col-sm-10">
          <h3 className="fs-5 fw-bold mb-2">{title}</h3>
          <div className="text-main fw-bold mb-1">{price} EGP</div>
          <button
            className="btn border-0 ps-0 text-danger"
            onClick={() => {
              deleteFromWishList(id);
            }}
          >
            <FontAwesomeIcon icon={faTrash} /> remove
          </button>
        </div>
        <div className="col-12 col-sm-2 text-end">
          <button
            style={{ minWidth: "64px" }}
            className="btn btn-outline-main"
            onClick={() => {
              addToCardHook(id);
            }}
          >
            <span className="d-none d-lg-inline-block text-nowrap">
              add to cart
            </span>
            <span className="d-lg-none">
              <span className="fs-3">+</span>
              <FontAwesomeIcon
                icon={faCartShopping}
                className="text-main fa-lg"
              />
            </span>
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default ProductCartWishlist;
