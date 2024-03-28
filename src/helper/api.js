import axios from "axios";

// BaseUrl
export const BaseUrl = "https://ecommerce.routemisr.com";

const config = { baseURL: BaseUrl };
export const axiosInstance = axios.create(config);

// -------------------------------------------

// put function to put data and return data and errorMessage
export async function putData(endPoint, values, head) {
  let MainData = false;
  let mainErrorMessage = false;

  if (head) {
    await axios
      .put(`${BaseUrl}${endPoint}`, values, head)
      .then(({ data }) => {
        // if success
        MainData = data;
      })
      .catch((error) => {
        const errorMessage = error?.response?.data?.message || error?.message;
        // if error
        mainErrorMessage = errorMessage;
      });
  } else {
    await axios
      .put(`${BaseUrl}${endPoint}`, values)
      .then(({ data }) => {
        // if success
        MainData = data;
      })
      .catch((error) => {
        const errorMessage = error?.response?.data?.message || error?.message;
        // if error
        mainErrorMessage = errorMessage;
      });
  }

  return [MainData, mainErrorMessage];
}
