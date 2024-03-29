import { useState } from "react";
import SearchHome from "../../searchHome/SearchHome";
import ShowProducts from "../../showProducts/ShowProducts";
import { useContextMain } from "../../../contexts/MainContext";
import SEO from "../../../helper/SEO";

import { useGetProducts } from "../../../helper/hooks/asyncFunction";
import SearchLoading from "../../searchLoading/SearchLoading";
import NewLoading from "../../NewLoading/NewLoading";

export default function Products() {
  const [searchLoading, setSearchLoading] = useState(false);
  const { loading } = useContextMain();
  const { products, productsToShow, setProductsToShow } = useGetProducts();

  const changeProduct = (newProduct) => {
    setProductsToShow(newProduct);
  };

  const toggleSearchLoading = (value) => {
    setSearchLoading(value);
  };

  let ui = <NewLoading />;

  if (!loading) {
    ui = (
      <>
        <SEO
          title="Products"
          description="All Products"
          facebookType="website"
          twitterType="summary"
        />
        <SearchHome
          products={products}
          setProductsToShow={changeProduct}
          toggleSearchLoading={toggleSearchLoading}
        />
        {searchLoading ? (
          <SearchLoading />
        ) : productsToShow ? (
          <ShowProducts products={productsToShow} />
        ) : (
          <ShowProducts products={products} />
        )}
      </>
    );
  }

  return ui;
}
