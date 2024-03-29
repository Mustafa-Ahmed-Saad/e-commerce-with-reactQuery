import { Link } from "react-router-dom";
import SEO from "../../../helper/SEO";
import { useGetAllOrders } from "../../../helper/hooks/asyncFunction";
import Order from "./order/Order";

export default function AllOrders() {
  const orders = useGetAllOrders();

  return (
    <>
      <SEO
        title="Orders"
        description="All Orders"
        facebookType="article"
        twitterType="summary"
      />

      {orders?.length > 0 ? (
        <div className="container">
          {orders?.map((order, index) => (
            <Order
              key={order.id}
              order={order}
              length={orders.length}
              index={index}
            />
          ))}
        </div>
      ) : (
        <div className="container text-center my-5">
          <p className="fw-bold fs-5">
            sorry you do not have any order{" "}
            <Link to="/products">go to products</Link>
          </p>
        </div>
      )}
    </>
  );
}
