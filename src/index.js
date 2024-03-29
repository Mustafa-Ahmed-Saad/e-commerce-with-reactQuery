import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MainContextProvider from "./contexts/MainContext";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { queryClient } from "./helper/queryClient";
import NewLoading from "./components/NewLoading/NewLoading";
import MyToster from "./components/toster/MyToster";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  // <React.StrictMode>
  <QueryClientProvider client={queryClient}>
    <MainContextProvider>
      <NewLoading />
      <MyToster />
      <App />
    </MainContextProvider>

    <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
  </QueryClientProvider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
