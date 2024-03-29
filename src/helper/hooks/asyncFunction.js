import { axiosInstance } from "../api";
import { useContextMain } from "../../contexts/MainContext";
import { toast } from "react-hot-toast";
import { notify } from "../toastFire";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";
import { useState } from "react";
import { mutationKeys, queryKeys } from "../constant";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useUpdateCart } from "./updateCart";

export function useLogOutHook() {
  const { setToken } = useContextMain();
  const queryClient = useQueryClient();

  const logOut = () => {
    Cookies.remove("token");
    setToken(false);
    localStorage.clear();

    queryClient.clear();
  };

  return { logOut };
}

// ....................................................................
// .......................... mutations ..............................
// ....................................................................

export function useResetPasswordHook() {
  const navigate = useNavigate();

  const resetPassword = async (values) => {
    const data = await axiosInstance.put("/api/v1/auth/resetPassword", values);

    return data?.data;
  };

  const { mutate } = useMutation({
    mutationFn: resetPassword,
    mutationKey: [mutationKeys.resetPassword],
    onSuccess: (data) => {
      data?.token && navigate("/login");
    },
    onError: (error) => {
      notify("error", `Opps ${error.response?.data?.message || error.message}`);
    },
  });

  return {
    resetPasswordHook: mutate,
  };
}

export function useRegisterHook() {
  const navigate = useNavigate();

  const registerHook = async (values) => {
    const data = await axiosInstance.post("/api/v1/auth/signup", values);
    return data?.data;
  };

  const { mutate } = useMutation({
    mutationFn: registerHook,
    mutationKey: [mutationKeys.register],
    onSuccess: (data) => {
      data?.token && navigate("/login");
    },
    onError: (error) => {
      notify("error", `Opps ${error.response?.data?.message || error.message}`);
    },
  });

  return {
    registerHook: mutate,
  };
}

export function useVerifyCodeHook() {
  const navigate = useNavigate();

  const verifyCodeHook = async ({ value }) => {
    const data = await axiosInstance.post(
      "/api/v1/auth/verifyResetCode",
      value
    );

    return data?.data;
  };

  const { mutate } = useMutation({
    mutationFn: verifyCodeHook,
    mutationKey: [mutationKeys.verifyCodeHook],
    onSuccess: (data, { setShowAlert }) => {
      if (data?.status === "Success") {
        navigate("/reset-password");
        setShowAlert(false);
      } else if (data?.message) {
        notify("error", `${data?.message}`);
        setShowAlert(data?.message);
      }
    },
    onError: (error, { setShowAlert }) => {
      notify("error", `Opps ${error.response?.data?.message || error.message}`);
      setShowAlert(error.message);
    },
  });

  return {
    verifyCodeHook: mutate,
  };
}

export function useForgetPassword() {
  const navigate = useNavigate();

  const forgetPassword = async ({ value }) => {
    const data = await axiosInstance.post(
      "/api/v1/auth/forgotPasswords",
      value
    );

    return data?.data;
  };

  const { mutate } = useMutation({
    mutationFn: forgetPassword,
    mutationKey: [mutationKeys.forgetPassword],
    onSuccess: (data, { setShowAlert, setAlertInterval }) => {
      if (data.statusMsg === "success") {
        navigate("/verify-code");
        setShowAlert(false);
      } else if (data.message) {
        notify("error", `${data.message}`);
        setShowAlert(data.message);
        setAlertInterval(
          setTimeout(() => {
            setShowAlert(false);
          }, 7000)
        );
      }
    },
    onError: (error, { setShowAlert, setAlertInterval }) => {
      notify("error", `Opps ${error.response?.data?.message || error.message}`);
      setShowAlert(
        `${error.message} or no user registered with this email address`
      );
      setAlertInterval(
        setTimeout(() => {
          setShowAlert(false);
        }, 7000)
      );
    },
  });

  return {
    forgetPassword: mutate,
  };
}

export function useLoginHook() {
  const { setToken } = useContextMain();
  const navigate = useNavigate();

  const loginHook = async (values) => {
    const data = await axiosInstance.post("/api/v1/auth/signin", values);

    return data?.data;
  };

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: loginHook,
    mutationKey: [mutationKeys.login],
    onSuccess: (data) => {
      //  decode token
      const decoded = jwt_decode(data.token);
      // Get the current timestamp in seconds
      const currentTimestamp = Math.floor(Date.now() / 1000);
      // Calculate the difference between expiration and current timestamps
      const timeDifferenceSeconds = decoded.exp - currentTimestamp;
      // Calculate the time difference in days
      const timeDifferenceDays = Math.ceil(
        timeDifferenceSeconds / (60 * 60 * 24)
      );
      Cookies.set("token", data.token, { expires: timeDifferenceDays }); // Expires in ... days
      setToken(data.token);
      queryClient.invalidateQueries(queryKeys.wishList);
      queryClient.invalidateQueries(queryKeys.orders);
      queryClient.invalidateQueries(queryKeys.cart);
      // queryClient.invalidateQueries(queryKeys.userId);

      navigate("/home");
    },
    onError: (error) => {
      notify("error", `Opps ${error.response?.data?.message || error.message}`);
    },
  });

  return {
    loginHook: mutate,
  };
}

export function useUpdateQuantity() {
  const { token, productsQuantity, setProductsQuantity } = useContextMain();
  let tLoading;

  const updateQuantity = async (info) => {
    tLoading = notify("loading", `loading...`);
    const { productId, count } = info;
    const data = await axiosInstance.put(
      `/api/v1/cart/${productId}`,
      {
        count,
      },
      {
        headers: {
          token: token,
        },
      }
    );

    return data?.data;
  };

  const updateCart = useUpdateCart();

  const { mutate } = useMutation({
    mutationFn: updateQuantity,
    mutationKey: [mutationKeys.updateQuantity],
    onSuccess: (data, info) => {
      toast.dismiss(tLoading);
      notify("success", "Successfully");

      updateCart(data.data.products, data.data.totalCartPrice);

      const oldQuantity = { ...productsQuantity };
      oldQuantity[info.productId] = info.count;
      setProductsQuantity(oldQuantity);
    },
    onError: (error, info) => {
      const { productId, allProductsInCart, index } = info;
      toast.dismiss(tLoading);
      notify("error", `Opps ${error.response?.data?.message || error.message}`);

      const newProducts = [...allProductsInCart];
      newProducts[index].count = productsQuantity[productId];

      const totalPrice = newProducts.reduce(
        (prev, product) => prev + product.count * product.price,
        0
      );

      updateCart(newProducts, totalPrice);

      // queryClient.invalidateQueries(queryKeys.cart);
    },
  });

  return {
    updateQuantity: mutate,
  };
}

export function useCardPayment() {
  const { token } = useContextMain();
  let tLoading;

  const cardPayment = async (info) => {
    const { id, formData } = info;
    tLoading = notify("loading", `loading...`);
    delete formData.payment;
    const data = await axiosInstance.post(
      `/api/v1/orders/checkout-session/${id}`,
      formData,
      {
        headers: { token: token },
        params: {
          url: "https://mustafa-ahmed-saad.github.io/e-commerce/#",
        },
      }
    );
    // after credit card payment will redirect to "https://mustafa-ahmed-saad.github.io/e-commerce/#/allorders" automatically
    // i passed this as parameter https://mustafa-ahmed-saad.github.io/e-commerce/# and allorders strapi increase it to url

    return data?.data;
  };

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: cardPayment,
    mutationKey: [mutationKeys.cardPayment],
    onSuccess: (data) => {
      toast.dismiss(tLoading);
      const oldCartProducts = queryClient.getQueryData(queryKeys.cart);
      queryClient.setQueryData(queryKeys.cart, {
        ...oldCartProducts,
        products: [],
      });
      queryClient.invalidateQueries(queryKeys.orders);
      window.location.href = data?.session?.url;
      // or use
      // window.open(data?.session?.url, '_blank');
      // return "done";
    },
    onError: (error) => {
      toast.dismiss(tLoading);
      notify("error", `Opps ${error.response?.data?.message || error.message}`);
    },
  });

  return {
    cardPayment: mutate,
  };
}

export function useCashPayment() {
  const { token } = useContextMain();
  const navigate = useNavigate();
  let tLoading;

  const cashPayment = async (info) => {
    const { id, formData } = info;
    tLoading = notify("loading", `loading...`);
    delete formData.payment;
    const data = await axiosInstance.post(`/api/v1/orders/${id}`, formData, {
      headers: { token: token },
    });

    return data;
  };

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: cashPayment,
    mutationKey: [mutationKeys.cashPayment],
    onSuccess: () => {
      // queryClient.invalidateQueries(queryKeys.cart, queryKeys.orders);
      const oldCartProducts = queryClient.getQueryData(queryKeys.cart);
      queryClient.setQueryData(queryKeys.cart, {
        ...oldCartProducts,
        products: [],
      });
      queryClient.invalidateQueries(queryKeys.orders);
      navigate("/allorders");
      toast.dismiss(tLoading);
      notify("success", "order successfully created");
      // return "done";
    },
    onError: (error) => {
      toast.dismiss(tLoading);
      notify("error", `Opps ${error.response?.data?.message || error.message}`);
    },
  });

  return {
    cashPayment: mutate,
  };
}

export function useClearAllProductsCart() {
  const { token, setProductsCounter } = useContextMain();
  let tLoading;

  const clearAllProductsCart = async () => {
    tLoading = notify("loading", `loading...`);
    const data = await axiosInstance.delete(`/api/v1/cart`, {
      headers: { token: token },
    });

    return data;
  };

  const updateCart = useUpdateCart();

  const { mutate } = useMutation({
    mutationFn: clearAllProductsCart,
    mutationKey: [mutationKeys.clearAllProductsCart],
    onSuccess: () => {
      toast.dismiss(tLoading);
      notify("success", "clear All products successfully");
      setProductsCounter(0);
      updateCart([], 0);
    },
    onError: (error) => {
      toast.dismiss(tLoading);
      notify("error", `Opps ${error.response?.data?.message || error.message}`);
    },
  });

  return {
    clearAllProductsCart: mutate,
  };
}

export function useDeleteFromCart() {
  const { token, setProductsCounter, productsQuantity, setProductsQuantity } =
    useContextMain();
  let tLoading;

  const deleteFromCart = async (id) => {
    tLoading = notify("loading", `loading...`);
    const data = await axiosInstance.delete(`/api/v1/cart/${id}`, {
      headers: { token: token },
    });

    return data?.data;
  };

  const updateCart = useUpdateCart();

  const { mutate } = useMutation({
    mutationFn: (variables) => deleteFromCart(variables.id),
    mutationKey: [mutationKeys.deleteFromCart],
    onSuccess: ({ data }, variables) => {
      toast.dismiss(tLoading);
      notify("success", "product deleted successfully from cart");
      setProductsCounter((prev) => prev - 1);
      const pq = { ...productsQuantity };
      delete pq[data._id];
      setProductsQuantity(pq);
      updateCart(data.products, data.totalCartPrice);
    },
    onError: (error, variables) => {
      toast.dismiss(tLoading);
      notify("error", `Opps ${error.response?.data?.message || error.message}`);

      if (variables.oldQuantity) {
        const nProducts = [...variables.allProductsInCart];
        nProducts[variables.index].count = variables.oldQuantity;
        updateCart(nProducts, 0);
      }
    },
  });

  return {
    deleteFromCart: mutate,
  };
}

export function useAddToCardHook() {
  const { setProductsCounter, token } = useContextMain();
  let tLoading;

  const addToCardHook = async (id) => {
    tLoading = notify("loading", `loading...`);

    const data = await axiosInstance.post(
      "/api/v1/cart",
      {
        productId: id,
      },
      {
        headers: {
          token: token,
        },
      }
    );

    return data?.data?.data;
  };

  const queryClient = useQueryClient();

  const { mutate } = useMutation((id) => addToCardHook(id), {
    mutationKey: [mutationKeys.addToCard],
    onSuccess: (data) => {
      const oldCartProducts = queryClient.getQueryData(queryKeys.cart);
      if (oldCartProducts) {
        queryClient.setQueryData(queryKeys.cart, {
          ...oldCartProducts,
          products: data.products,
        });
      }
      // make like wishList an create context for product cart and set this peoduct context from here
      toast.dismiss(tLoading);
      notify("success", "product successfully added to cart");
      // here also return totalprice in (data?.data?.totalCartPrice)
      setProductsCounter(data.products.length);
      // return "done";
    },
    onError: (error) => {
      toast.dismiss(tLoading);
      notify("error", `Opps ${error.response?.data?.message || error.message}`);
    },
  });

  return {
    addToCardHook: mutate,
  };
}

export function useDeleteFromWishList() {
  const { token, setWishList } = useContextMain();
  // let tLoading = notify("loading", `loading...`);
  let tLoading;

  const deleteFromWishList = async (id) => {
    tLoading = notify("loading", `loading...`);
    const data = await axiosInstance.delete(`/api/v1/wishlist/${id}`, {
      headers: { token: token },
    });

    return data?.data?.data;
  };

  const queryClient = useQueryClient();

  const { mutate } = useMutation((id) => deleteFromWishList(id), {
    mutationKey: [mutationKeys.deleteFromWishList],
    onSuccess: (data) => {
      const oldWishListProducts = queryClient.getQueryData(queryKeys.wishList);
      const newWishListProducts = oldWishListProducts.filter(
        (product) => data.includes(product._id) || data.includes(product.id)
      );

      queryClient.setQueryData(queryKeys.wishList, newWishListProducts);
      queryClient.setQueryData(queryKeys.wishListProductIds, data);

      setWishList(data);
      toast.dismiss(tLoading);
      notify("success", `Deleted successfully`);
    },
    onError: (error) => {
      toast.dismiss(tLoading);
      notify("error", `Opps ${error.response?.data?.message || error.message}`);
    },
  });

  return {
    deleteFromWishList: mutate,
  };
}

export function useHandelLoveHook() {
  const { wishList, setWishList, token } = useContextMain();
  let tLoading;
  const ExistInWishlist = "exist in wishlist";

  async function handelLoveHook(id) {
    //  check here on this ((wishListProductIds.includes(id) || isIdExistInContextWishList(id)) )
    if (wishList?.includes(id)) {
      notify("success", "product already exist in wish list");
      return ExistInWishlist;
    } else {
      tLoading = notify("loading", `loading...`);
      const data = await axiosInstance.post(
        `/api/v1/wishlist`,
        {
          productId: id,
        },
        {
          headers: {
            token: token,
          },
        }
      );
      return data?.data;
    }
  }

  const queryClient = useQueryClient();

  // mutate function
  const { mutate } = useMutation((id) => handelLoveHook(id), {
    mutationKey: [mutationKeys.handelLove],
    onSuccess: (data) => {
      if (data === ExistInWishlist) {
        return;
      }
      toast.dismiss(tLoading);
      notify("success", `${data?.message || "success"}`);
      queryClient.invalidateQueries(queryKeys.wishList);
      queryClient.setQueryData(queryKeys.wishListProductIds, data?.data);
      setWishList(data?.data);
    },
    onError: (error) => {
      toast.dismiss(tLoading);
      notify("error", `Opps ${error.response?.data?.message || error.message}`);
    },
  });

  return mutate;
}

// ....................................................................
// .......................... Queries ..............................
// ....................................................................

export function useGetAllOrders() {
  const { userId } = useContextMain();
  const fallback = [];

  async function getAllOrders() {
    const data = await axiosInstance.get(`/api/v1/orders/user/${userId}`);
    return data?.data;
  }

  const { data: orders = fallback } = useQuery(
    [queryKeys.orders, queryKeys.userId],
    getAllOrders,
    {
      enabled: !!userId,
    }
  );

  return orders;
}

export function useGetWishListProducts(token) {
  let wishListProducts = [];

  async function getWishList() {
    const data = await axiosInstance("/api/v1/wishlist/", {
      headers: {
        token: token,
      },
    });
    return data?.data?.data;
  }

  const { data, refetch } = useQuery([queryKeys.wishList], getWishList, {
    enabled: false,
  });

  if (data) {
    wishListProducts = data;
  }

  return {
    wishListProducts,
    refetch,
  };
}

export function useGetCategories(withLoading) {
  const fallback = [];

  async function getCategories() {
    const data = await axiosInstance.get("/api/v1/categories");
    return data?.data?.data;
  }

  const { data: categories = fallback } = useQuery(
    [queryKeys.categories],
    getCategories
  );

  return categories;
}

export function useGetProducts() {
  const { setAllAppProducts } = useContextMain();
  const [productsToShow, setProductsToShow] = useState([]);
  const fallback = [];

  async function getProducts() {
    const data = await axiosInstance.get("/api/v1/products");
    if (data?.data) {
      setAllAppProducts(data.data.data);
      setProductsToShow(data.data.data);
    }
    return data?.data?.data;
  }

  const { data = fallback } = useQuery([queryKeys.products], getProducts);

  return {
    products: data,
    productsToShow,
    setProductsToShow,
  };
}

export function useGetSubCategories(id) {
  let subCategories = [];

  async function getSubCategories() {
    const data = await axiosInstance(`/api/v1/categories/${id}/subcategories`);
    return data?.data;
  }

  const { data } = useQuery([queryKeys.subCategories, id], getSubCategories);

  if (data?.data) {
    subCategories = data.data;
  }

  return {
    subCategories,
  };
}

export function useGetBrand(id) {
  const fallback = null;

  async function getBrand() {
    const { data } = await axiosInstance.get("/api/v1/brands/" + id);
    return data;
  }

  const {
    data: brand = fallback,
    isLoading,
    error,
    refetch,
  } = useQuery([queryKeys.brand, id], getBrand, {
    enabled: false,
  });

  return {
    brand,
    isLoading,
    error,
    refetch,
  };
}

export function useGetBrands() {
  const fallback = [];

  async function getBrands() {
    const data = await axiosInstance.get("/api/v1/brands");
    return data?.data?.data;
  }

  const { data: brands = fallback } = useQuery([queryKeys.brands], getBrands);

  return brands;
}

export function useGetCartProducts() {
  let allProductsInCart = [];
  let cartId = 0;
  let totalCartPrice = 0;
  // const [allProductsInCart, setAllProductsInCart] = useState([]);
  // const [totalCartPrice, setTotalCartPrice] = useState(0);

  const { token, setProductsCounter, setUserId } = useContextMain();

  async function getAllCartProducts() {
    const data = await axiosInstance(`/api/v1/cart`, {
      headers: { token: token },
    });
    return data?.data?.data;
  }

  const { data } = useQuery([queryKeys.cart], getAllCartProducts);

  if (data?.products) {
    cartId = data._id;
    allProductsInCart = data.products;
    totalCartPrice = data.totalCartPrice;
    setProductsCounter(data.products.length || 0);
    setUserId(data.cartOwner);
  }

  return {
    cartId,
    allProductsInCart,
    totalCartPrice,
  };
}

export function useGetProduct(id) {
  let product = null;

  async function getProduct() {
    const data = await axiosInstance(`/api/v1/products/${id}`);
    return data?.data;
  }

  const { data } = useQuery([queryKeys.product, id], getProduct);

  if (data?.data) {
    product = data.data;
  }

  return {
    product,
  };
}
