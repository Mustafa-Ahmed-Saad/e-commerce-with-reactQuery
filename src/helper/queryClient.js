import toast from "react-hot-toast";
import { QueryClient } from "react-query";
import { notify } from "./toastFire";

// error handler global
function queryErrorHandler(error) {
  // error is type unknown because in js, anything can be an error (e.g. throw(5))
  const message =
    error instanceof Error
      ? `Opps ${error?.response?.data?.message || error.message}`
      : "error connecting to server";

  // dismiss all
  toast.dismiss();
  // make tost with error toast({ title, status: "error", variant: "subtle", isClosable: true });
  notify("error", message);
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      onError: queryErrorHandler,
      staleTime: 50000,
      refetchOnWindowFocus: false,
    },
    mutations: {
      onError: queryErrorHandler,
    },
  },
});
