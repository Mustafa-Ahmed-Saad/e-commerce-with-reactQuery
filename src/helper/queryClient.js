import toast from "react-hot-toast";
import { QueryClient } from "react-query";
import { notify } from "./toastFire";

function queryErrorHandler(error) {
  // error is type unknown because in js, anything can be an error (e.g. throw(5))
  const message =
    error instanceof Error ? error.message : "error connecting to server";

  toast.dismiss();
  // make tost with error toast({ title, status: "error", variant: "subtle", isClosable: true });
  notify("error", message);
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      onError: queryErrorHandler,
    },
  },
});
