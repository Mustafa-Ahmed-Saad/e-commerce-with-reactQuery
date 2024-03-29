import { Link } from "react-router-dom";
import { useContextMain } from "../../../contexts/MainContext";
import {
  useAddToCardHook,
  useDeleteFromWishList,
  useGetWishListProducts,
} from "../../../helper/hooks/asyncFunction";
import SEO from "../../../helper/SEO";
import { useEffect, useState } from "react";
import ProductCartWishlist from "./productCartWishlist/ProductCartWishlist";

export default function WishList() {
  const { wishList, setWishList, token } = useContextMain();
  const { addToCardHook } = useAddToCardHook();
  const { deleteFromWishList } = useDeleteFromWishList();
  const { wishListProducts } = useGetWishListProducts(token, true);

  const [lastWishlist, setLastWishlist] = useState([]);

  useEffect(() => {
    if (wishListProducts.length > 0) {
      const newWishlistProductIds = wishListProducts.map(({ id }) => {
        return id;
      });

      setWishList(newWishlistProductIds);
      setLastWishlist(wishListProducts);
    }
  }, [wishListProducts]);

  useEffect(() => {
    wishList?.length === 0 && setLastWishlist([]);
  }, [wishList]);

  let ui =
    lastWishlist?.length > 0 ? (
      <div
        className="container bg-body-tertiary p-5 my-5 wow fadeInLeft rounded-4"
        data-wow-offset="10"
        data-wow-delay="0.3s"
        data-wow-iteration="1"
      >
        <h2 className="fw-bold mb-4">My wish List</h2>
        {lastWishlist?.map(({ title, price, imageCover, id }) => (
          <ProductCartWishlist
            key={id}
            title={title}
            price={price}
            imageCover={imageCover}
            deleteFromWishList={deleteFromWishList}
            addToCardHook={addToCardHook}
            id={id}
          />
        ))}
      </div>
    ) : (
      <div className="container text-center my-5">
        <p className="fw-bold fs-5">
          sorry you do not add any product to your wish list{" "}
          <Link to="/products">go to products</Link>
        </p>
      </div>
    );

  return (
    <>
      <SEO
        title="Wish List"
        description="Wishlist Products"
        facebookType="wishlist"
        twitterType="summary"
      />
      {ui}
    </>
  );
}
