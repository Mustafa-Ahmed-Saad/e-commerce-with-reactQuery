import React from "react";
import "./LoadingStyle.css";
import { useIsFetching, useIsMutating } from "react-query";
import { mutationKeys, queryKeys } from "../../helper/constant";
import BrandCardLoading from "../brandCardLoading/BrandCardLoading";

export default function NewLoading() {
  // if you want to show another loading for user query
  // const isUserQueryIsFetching = useIsFetching("user");
  // and make this component return another loading

  // if you want make global loading for all query and mutaion
  // isFetching will be true if any query is fetching data, and isMutating will be true if any mutation is in progress
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();

  const display = isFetching || isMutating ? "flex" : "none";

  const isBrandIsFetching = useIsFetching(queryKeys.brand);
  const isWishlistMutating = useIsMutating(mutationKeys.handelLove); // handelLoveHook (when click love icon)
  const isAddToCardMutating = useIsMutating(mutationKeys.addToCard); // handelLoveHook (when click love icon)
  const isDeleteFromWishList = useIsMutating(mutationKeys.deleteFromWishList); // handelLoveHook (when click love icon)
  const isDeleteFromCart = useIsMutating(mutationKeys.deleteFromCart); // handelLoveHook (when click love icon)
  const isClearAllProductsCart = useIsMutating(
    mutationKeys.clearAllProductsCart
  ); // handelLoveHook (when click love icon)

  // brand loading (query)
  if (isBrandIsFetching) {
    return <BrandCardLoading />;
  }

  // love loading (mutaion)
  if (
    isWishlistMutating ||
    isAddToCardMutating ||
    isDeleteFromWishList ||
    isDeleteFromCart ||
    isClearAllProductsCart
  ) {
    return;
  }

  // main loading
  return (
    <>
      <div
        className="align-items-center justify-content-center position-fixed w-100 h-100 z-1 start-0 top-0"
        style={{ display: display }}
      >
        <div className="loading-bg w-100 h-100 position-absolute z-1"></div>
        <div className="bg-black opacity-75 w-100 h-100 position-absolute z-2"></div>
        <div className="preloader z-3">
          <svg
            className="cart"
            role="img"
            aria-label="Shopping cart line animation"
            viewBox="0 0 128 128"
            width="128px"
            height="128px"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={8}
            >
              <g className="cart__track" stroke="hsla(0,10%,10%,0.1)">
                <polyline points="4,4 21,4 26,22 124,22 112,64 35,64 39,80 106,80" />
                <circle cx={43} cy={111} r={13} />
                <circle cx={102} cy={111} r={13} />
              </g>
              <g className="cart__lines" stroke="currentColor">
                <polyline
                  className="cart__top"
                  points="4,4 21,4 26,22 124,22 112,64 35,64 39,80 106,80"
                  strokeDasharray="338 338"
                  strokeDashoffset={-338}
                />
                <g className="cart__wheel1" transform="rotate(-90,43,111)">
                  <circle
                    className="cart__wheel-stroke"
                    cx={43}
                    cy={111}
                    r={13}
                    strokeDasharray="81.68 81.68"
                    strokeDashoffset="81.68"
                  />
                </g>
                <g className="cart__wheel2" transform="rotate(90,102,111)">
                  <circle
                    className="cart__wheel-stroke"
                    cx={102}
                    cy={111}
                    r={13}
                    strokeDasharray="81.68 81.68"
                    strokeDashoffset="81.68"
                  />
                </g>
              </g>
            </g>
          </svg>
          <div className="preloader__text">
            <p className="preloader__msg text-white">please wait...</p>
            <p className="preloader__msg preloader__msg--last text-white">
              please wait...
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
