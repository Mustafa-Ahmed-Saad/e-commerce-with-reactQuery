import { useQueryClient } from "react-query";
import { queryKeys } from "../constant-api-keys";
import { useContextMain } from "../../contexts/MainContext";
import Cookies from "js-cookie";

export function useUpdateCart() {
  const queryClient = useQueryClient();

  return function (products, totalCartPrice) {
    const cartData = queryClient.getQueryData([queryKeys.cart]);
    queryClient.setQueryData([queryKeys.cart], {
      ...cartData,
      products,
      totalCartPrice,
    });
  };
}

export function useLogOutHook() {
  const { setToken, setEnableWishlist } = useContextMain();
  const queryClient = useQueryClient();

  const logOut = () => {
    // we make setEnableWishlist false to unrefetch wishList when logout
    setEnableWishlist(false);
    Cookies.remove("token");
    setToken(false);
    localStorage.clear();

    queryClient.clear();
  };

  return { logOut };
}
