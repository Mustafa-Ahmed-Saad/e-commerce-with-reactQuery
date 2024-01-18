import {
  axiosInstance,
  deleteData,
  getData,
  newGetData,
  postData,
  putData,
} from "../api";
import { useContextMain } from "../../contexts/MainContext";
import { toast } from "react-hot-toast";
import { notify } from "../toastFire";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { queryKeys } from "../constant";
import { useQuery } from "react-query";
import { date } from "yup";
import axios from "axios";

export function useDeleteFromCart() {
  const { token, setProductsCounter, productsQuantity, setProductsQuantity } =
    useContextMain();

  const deleteFromCart = async (id) => {
    let tLoading = notify("loading", `loading...`);
    const [data, errorMessage] = await deleteData(`/api/v1/cart/${id}`, {
      headers: { token: token },
    });

    if (data?.data) {
      toast.dismiss(tLoading);
      notify("success", "product deleted successfully from cart");
      setProductsCounter((prev) => prev - 1);
      const pq = { ...productsQuantity };
      delete pq[id];
      setProductsQuantity(pq);
      return data.data;
    } else {
      toast.dismiss(tLoading);
      notify("error", `Opps ${errorMessage}`);
      return { products: [], totalCartPrice: 0, myError: errorMessage };
    }
  };

  return {
    deleteFromCart,
  };
}

export function useClearAllProductsCart() {
  const { token, setProductsCounter } = useContextMain();

  const clearAllProductsCart = async () => {
    const [data, errorMessage] = await deleteData(`/api/v1/cart`, {
      headers: { token: token },
    });

    if (data?.message === "success") {
      setProductsCounter(0);
      return "done";
    } else {
      // TODO: show tost
      console.error(errorMessage);
    }
  };

  return {
    clearAllProductsCart,
  };
}

export function useUpdateQuantity() {
  const { token, setProductsCounter } = useContextMain();

  const updateQuantity = async (productId, count) => {
    let tLoading = notify("loading", `loading...`);
    const [data, errorMessage] = await putData(
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

    if (data?.data) {
      toast.dismiss(tLoading);
      notify("success", "Successfully");
      return {
        products: data?.data.products,
        totalCartPrice: data.data.totalCartPrice,
      };
    } else {
      toast.dismiss(tLoading);
      notify("error", `Opps ${errorMessage}`);
      console.error(errorMessage);
    }
  };

  return {
    updateQuantity,
  };
}

export function useCashPayment() {
  const { token } = useContextMain();
  const navigate = useNavigate();

  const cashPayment = async (id, formData) => {
    delete formData.payment;
    const [data, errorMessage] = await postData(
      `/api/v1/orders/${id}`,
      formData,
      {
        headers: { token: token },
      }
    );

    if (data?.status === "success") {
      navigate("/allorders");
      return "done";
    } else {
      console.error(errorMessage);
    }
  };

  return {
    cashPayment,
  };
}

export function useCardPayment() {
  const { token } = useContextMain();

  const cardPayment = async (id, formData) => {
    delete formData.payment;
    const [data, errorMessage] = await postData(
      `/api/v1/orders/checkout-session/${id}`,
      formData,
      {
        headers: { token: token },
        params: {
          url: "https://mustafa-ahmed-saad.github.io/e-commerce/#",
        },
      }
    );

    if (data?.session) {
      window.location.href = data?.session?.url;
      // or use
      // window.open(data?.session?.url, '_blank');
      return "done";
    } else {
      console.error(errorMessage);
    }
  };

  return {
    cardPayment,
  };
}

export function useForgetPassword() {
  const navigate = useNavigate();

  const forgetPassword = async (value) => {
    const [data, errorMessage] = await postData(
      "/api/v1/auth/forgotPasswords",
      value
    );

    if (data?.statusMsg === "success") {
      navigate("/verify-code");
      return {
        statusMsg: "success",
      };
    } else {
      console.error(errorMessage || data?.message);
      return { errorMessage: errorMessage || data?.message };
    }
  };

  return {
    forgetPassword,
  };
}

export function useLoginHook() {
  const { setToken } = useContextMain();
  const navigate = useNavigate();

  const loginHook = async (values) => {
    const [data, errorMessage] = await postData("/api/v1/auth/signin", values);

    if (data?.token) {
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
      navigate("/home");
      return "done";
    } else {
      // TODO: handel Error here
      console.error(errorMessage);
    }
  };

  return {
    loginHook,
  };
}

export function useHandelLoveHook() {
  const { wishList, setWishList, token } = useContextMain();

  const handelLoveHook = async (id) => {
    // TODO: check here on this ((wishListProductIds.includes(id) || isIdExistInContextWishList(id)) )
    if (wishList?.includes(id)) {
      notify("success", "product already exist in wish list");
    } else {
      let tLoading = notify("loading", `loading...`);
      const [data, errorMessage] = await postData(
        "/api/v1/wishlist",
        {
          productId: id,
        },
        {
          headers: {
            token: token,
          },
        }
      );

      // TODO: conteniue
      if (data?.data) {
        //   put data?.data in local storage wishList (setState of wishlist context)
        toast.dismiss(tLoading);
        notify("success", `${data?.message}`);
        setWishList(data?.data);
        return "done";
      } else {
        toast.dismiss(tLoading);
        notify("error", `Opps ${errorMessage}`);
        console.error(errorMessage);
      }
    }
  };

  return {
    handelLoveHook,
  };
}

export function useAddToCardHook() {
  const { wishList, setProductsCounter, token } = useContextMain();

  const addToCardHook = async (id) => {
    let tLoading = notify("loading", `loading...`);
    const [data, errorMessage] = await postData(
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

    if (data?.data?.products) {
      // make like wishList an create context for product cart and set this peoduct context from here
      toast.dismiss(tLoading);
      notify("success", `${data.message}`);
      // here also return totalprice in (data?.data?.totalCartPrice)
      setProductsCounter(data.data.products.length);
      return "done";
    } else {
      toast.dismiss(tLoading);
      notify("error", `Opps ${errorMessage}`);
      console.error(errorMessage);
    }
  };

  return {
    addToCardHook,
  };
}

export function useVerifyCodeHook() {
  const navigate = useNavigate();

  const verifyCodeHook = async (value) => {
    const [data, errorMessage] = await postData(
      "/api/v1/auth/verifyResetCode",
      value
    );

    if (data?.status === "Success") {
      navigate("/reset-password");
      return { status: "Success" };
    } else {
      console.error(errorMessage || data?.message);
      return { errorMessage: errorMessage || data?.message };
    }
  };

  return {
    verifyCodeHook,
  };
}

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

export function useGetWishListProducts(onlyOne) {
  const { token, wishList, setWishList, setLoading } = useContextMain();
  const [wishListProducts, setWishListProducts] = useState([]);

  async function getWishList() {
    setLoading(true);

    const [data, errorMessage] = await getData("/api/v1/wishlist/", {
      headers: {
        token: token,
      },
    });

    if (data?.data) {
      const newWishlist = data?.data.map(({ id }) => {
        return id;
      });
      setWishList(newWishlist);
      setWishListProducts(data?.data);
    } else {
      console.error(errorMessage);
    }

    setLoading(false);
  }

  useEffect(() => {
    if (onlyOne === "onlyOne" && wishList?.length > 0) {
      // if token and if no wishlist
      return;
    }

    getWishList();
  }, []);

  return {
    wishListProducts,
    setWishListProducts,
  };
}

export function useDeleteFromWishList() {
  const { token, setWishList } = useContextMain();

  const deleteFromWishList = async (id) => {
    let tLoading = notify("loading", `loading...`);
    const [data, errorMessage] = await deleteData(`/api/v1/wishlist/${id}`, {
      headers: { token: token },
    });

    if (data?.data) {
      // TODONOW: id data?.data is array of wishlist ids delete the 7 line and setWishlist(data?.data)

      setWishList(data.data);
      toast.dismiss(tLoading);
      notify("success", `${data.message}`);

      return data.data;
    } else {
      toast.dismiss(tLoading);
      notify("error", `Opps ${errorMessage}`);
      console.error(errorMessage);
    }
  };

  return {
    deleteFromWishList,
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
  const { setAllAppProducts, setLoading } = useContextMain();
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
    data,
    productsToShow,
    setProductsToShow,
  };
}

export function useGetCategory(id) {
  const { setLoading } = useContextMain();
  const [subCategories, setSubCategories] = useState([]);

  async function getSubCategory() {
    setLoading(true);

    const [data, errorMessage] = await getData(
      "/api/v1/categories/" + id + "/subcategories"
    );
    if (data?.data) {
      setSubCategories(data.data);
    } else {
      console.error(errorMessage);
    }

    setLoading(false);
  }

  useEffect(() => {
    getSubCategory();
  }, []);

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
  const { setLoading } = useContextMain();
  const [product, setProduct] = useState(null);

  async function getProduct() {
    setLoading(true);

    const [data, errorMessage] = await getData("/api/v1/products/" + id);

    if (data?.data) {
      setProduct(data.data);
    } else {
      console.error(errorMessage);
    }

    setLoading(false);
  }

  useEffect(() => {
    getProduct();
  }, []);

  return {
    product,
  };
}
