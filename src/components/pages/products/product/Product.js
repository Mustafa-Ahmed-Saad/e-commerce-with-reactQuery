import { faHeart, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useParams } from "react-router-dom";
import { useContextMain } from "../../../../contexts/MainContext";
import {
  useAddToCardHook,
  useGetProduct,
  useHandelLoveHook,
} from "../../../../helper/hooks/asyncFunction";
import SEO from "../../../../helper/SEO";
import ProductSlider from "../../../productSlider/ProductSlider";
import NewLoading from "../../../NewLoading/NewLoading";

export default function Product() {
  const { id } = useParams();
  const { wishList, loading } = useContextMain();

  const handelLoveHook = useHandelLoveHook();
  const { addToCardHook } = useAddToCardHook();
  const { product } = useGetProduct(id);

  let ui = <NewLoading />;

  if (!loading) {
    ui = product ? (
      <div className="overflow-x-hidden">
        <div className="container my-5 pb-5">
          <div className="row align-items-center">
            <div
              className="col-12 col-md-6 col-lg-4 wow fadeInLeft"
              data-wow-offset="10"
              data-wow-delay="0.9s"
              data-wow-iteration="1"
            >
              <ProductSlider imgUrls={product?.images} />
            </div>
            <div
              className="col-12 col-md-6 col-lg-8 wow fadeInRight"
              data-wow-offset="10"
              data-wow-delay="0.2s"
              data-wow-iteration="1"
            >
              <h2>{product?.title}</h2>
              <p>{product?.description}</p>

              <div className="d-flex justify-content-between my-4">
                <div>{product?.price} EGP</div>
                <div>
                  <FontAwesomeIcon className="text-warning" icon={faStar} />

                  {product?.ratingsAverage}
                </div>
              </div>

              <div className="d-flex justify-content-between ">
                <button
                  className="btn btn-main w-75"
                  onClick={() => {
                    addToCardHook(product?.id);
                  }}
                >
                  + Add
                </button>

                <div>
                  <FontAwesomeIcon
                    className={`d-inline-block ms-auto fa-xl cursor-pointer ${
                      wishList?.includes(product?.id) ? "text-danger" : null
                    }`}
                    icon={faHeart}
                    onClick={() => {
                      handelLoveHook(product?.id);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ) : (
      <div className="container text-center mt-5 fw-bold">
        sorry product not found see <Link to={"/home"}>All Product</Link>
      </div>
    );
  }

  return (
    <>
      <SEO
        title={product?.title || "product"}
        description={`Product ${product?.description}`}
        facebookType="product"
        twitterType="summary"
      />
      {ui};
    </>
  );
}
