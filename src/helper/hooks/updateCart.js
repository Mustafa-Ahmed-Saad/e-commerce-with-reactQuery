import { useQueryClient } from "react-query";
import { queryKeys } from "../constant";

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
