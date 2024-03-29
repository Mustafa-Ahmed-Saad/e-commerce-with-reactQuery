import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link, useNavigate } from "react-router-dom";
import { useContextMain } from "../../../contexts/MainContext";
import {
  useClearAllProductsCart,
  useDeleteFromCart,
  useGetCartProducts,
  useUpdateQuantity,
} from "../../../helper/hooks/asyncFunction";
import SEO from "../../../helper/SEO";
import { useUpdateCart } from "../../../helper/hooks/updateCart";
import NewLoading from "../../NewLoading/NewLoading";

export default function Cart() {
  const { productsCounter, productsQuantity } = useContextMain();

  const { clearAllProductsCart } = useClearAllProductsCart();
  const { updateQuantity } = useUpdateQuantity();
  const navigate = useNavigate();

  let [reqInterval, setReqInterval] = useState(false);

  const { loading } = useContextMain();
  const { deleteFromCart } = useDeleteFromCart();
  const { cartId, allProductsInCart, totalCartPrice } = useGetCartProducts();

  // const queryClient = useQueryClient();

  const updateCart = useUpdateCart();

  function deleteProductFromCart(id, index, oldQuantity) {
    const dataParametars = {
      id: id,
      index: index,
      oldQuantity: oldQuantity,
      allProductsInCart: allProductsInCart,
    };

    deleteFromCart(dataParametars);
  }

  function handleCheckOut() {
    navigate(`/check-out/${cartId}`);
  }

  async function updateProductQuantity(productId, count, index, totalPrice) {
    // TODO: TOST MESSAGE IF ERROR
    if (count < 0) {
      count = 0;
    }

    const newProducts = [...allProductsInCart];
    newProducts[index].count = count;

    updateCart(newProducts, totalCartPrice + totalPrice);

    reqInterval && clearTimeout(reqInterval);

    setReqInterval(
      setTimeout(async () => {
        if (count <= 0) {
          deleteProductFromCart(productId, index, productsQuantity[productId]);
        } else {
          const info = {
            productId,
            count,
            allProductsInCart,
            index,
          };
          updateQuantity(info);
        }
      }, 1000)
    );
  }

  //   -----------------------------------------------------------------------------------

  let ui = <NewLoading />;

  if (!loading) {
    ui =
      allProductsInCart?.length > 0 ? (
        <div className="container bg-body-tertiary p-5 my-5 rounded-4">
          <div className="row mb-4 justify-content-between align-align-items-start p-3 rounded-3">
            <div className="col-12 col-sm-6">
              <h2 className="fw-bold mb-4">Cart Shop</h2>
            </div>
            <div className="col-12 text-start col-sm-6 text-sm-end">
              <button
                className="btn btn-main btn-lg fw-bold"
                onClick={handleCheckOut}
              >
                check out
              </button>
            </div>
          </div>
          <div className="row justify-content-between align-items-center p-3 bg-body-secondary rounded-3">
            <div className="col-12 col-sm-6 fs-4 fw-bold">
              total price: <span className="text-main">{totalCartPrice}</span>{" "}
            </div>
            <div className="col-12 col-sm-6 text-sm-end fs-4 fw-bold">
              <span className="d-none d-md-inline-block">total number of</span>{" "}
              items:{" "}
              <span className="text-main">
                {productsCounter >= 0 ? productsCounter : 0}
              </span>
            </div>
          </div>

          {allProductsInCart?.map(
            ({ product: { title, imageCover, id }, price, count }, index) => (
              <div
                key={id}
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
            )
          )}

          <div className="text-center mt-5">
            <button
              className="btn btn-outline-danger btn-lg fw-bold"
              onClick={clearAllProductsCart}
            >
              <span className="me-2">clear all</span>{" "}
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        </div>
      ) : (
        <div className="container text-center my-5">
          <p className="fw-bold fs-5">
            sorry you do not add any product to your cart{" "}
            <Link to="/products">go to products</Link>
          </p>
        </div>
      );
  }

  return (
    <>
      <SEO
        title="Cart"
        description="Cart Products"
        facebookType="product.group"
        twitterType="summary"
      />
      {ui}
    </>
  );
}
