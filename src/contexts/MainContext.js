import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import useLocalStorage from "use-local-storage";
import { useGetWishListProducts } from "../helper/hooks/asyncFunction";

const MainContext = createContext();
export function useContextMain() {
  return useContext(MainContext);
}

export default function MainContextProvider({ children }) {
  const [loading, setLoading] = useState(false);

  // start use Cookies
  const [token, setToken] = useState(
    Cookies.get("token") ? Cookies.get("token") : false
  );

  // start useLocalStorage
  const [wishList, setWishList] = useLocalStorage("wishList", []);
  const [productsCounter, setProductsCounter] = useLocalStorage(
    "productsCounter",
    0
  );
  const [mainColor, setMainColor] = useLocalStorage("main-color", "#0dba0d");
  const [mode, setMode] = useLocalStorage("mode", false);
  const [productsQuantity, setProductsQuantity] = useLocalStorage(
    "productsQuantity",
    {}
  );
  const [allAppProducts, setAllAppProducts] = useLocalStorage(
    "allAppProducts",
    []
  );
  const [userId, setUserId] = useLocalStorage("userId", false);

  const [enableWishlist, setEnableWishlist] = useState(false);
  const { wishListProducts } = useGetWishListProducts(token, enableWishlist);

  useEffect(() => {
    if (token) {
      // !(wishList?.length > 0) && refetch(token);
      if (!(wishList?.length > 0)) {
        setEnableWishlist(true);
      }
    }
  }, [token]);

  useEffect(() => {
    if (wishListProducts.length > 0) {
      const newWishlist = wishListProducts.map((p) => {
        return p.id || p;
      });
      setWishList(newWishlist);
    }
    //
    setEnableWishlist(false);
  }, [wishListProducts]);

  // You can include other shared state and functions here
  return (
    <MainContext.Provider
      value={{
        token,
        setToken,
        wishList,
        setWishList,
        productsCounter,
        setProductsCounter,
        productsQuantity,
        setProductsQuantity,
        userId,
        setUserId,
        loading,
        setLoading,
        allAppProducts,
        setAllAppProducts,
        mode,
        setMode,
        mainColor,
        setMainColor,
        setEnableWishlist,
      }}
    >
      {children}
    </MainContext.Provider>
  );
}
