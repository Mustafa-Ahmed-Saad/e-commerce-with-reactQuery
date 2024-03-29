import React from "react";
import OrderCart from "./orderCart/OrderCart";

const Order = ({
  order: {
    id,
    cartItems,
    isDelivered,
    isPaid,
    paymentMethodType,
    totalOrderPrice,
    user,
    taxPrice,
    shippingPrice,
    createdAt,
  },
  index,
  length,
}) => (
  <div
    className="border border-1 border-success rounded-5 my-5 pt-3 px-5 order-bg-color wow slideInUp"
    data-wow-offset="10"
    data-wow-delay="0.3s"
    data-wow-iteration="1"
  >
    <div>
      <div className="row fs-2 fw-bold flex-column-reverse flex-sm-row">
        <div className="col-12 col-sm-8">
          <p className="d-inline-block text-start">order id: {id}</p>
        </div>

        <div className="col-12 col-sm-4">
          <p className="d-inline-block text-end">
            <span className="text-main"> {index + 1}</span>
            {" / "}
            {length}
          </p>
        </div>
      </div>
      <div className="row flex-column-reverse flex-md-row">
        <div className="col-12 col-md-8">
          <div>date: {createdAt}</div>
          <div>paymentMethodType: {paymentMethodType}</div>
          <div>isPaid: {isPaid ? "yes" : "no"}</div>
          <div>isDelivered: {isDelivered ? "yes" : "no"}</div>
          <div>
            taxPrice: <span className="text-main fw-bold">{taxPrice} EGP</span>
          </div>
          <div>
            shippingPrice:{" "}
            <span className="text-main fw-bold">{shippingPrice} EGP</span>
          </div>
          <div>
            total Order Price:{" "}
            <span className="text-main fw-bold">{totalOrderPrice} EGP</span>
          </div>
        </div>
        <div
          className="col-12 col-md-4 border border-1 border-success rounded-4 p-3 bg-order-owner align-self-baseline mb-4 mb-md-0"
          style={{ "--bs-border-opacity": ".5" }}
        >
          <div>
            <span className="fw-bold">name:</span>
            <span className="text-break"> {user.name}</span>
          </div>
          <div>
            <span className="fw-bold">email:</span>

            <span className="text-break"> {user.email}</span>
          </div>
          <div>
            <span className="fw-bold">phone:</span>
            <span className="text-break"> {user.phone}</span>
          </div>
        </div>
      </div>
      <div className="border border-2 border-secondary border-start-0 border-end-0 border-bottom-0 py-4 my-2">
        {cartItems.map((orderCart) => (
          <OrderCart key={orderCart._id} cartInfo={orderCart} />
        ))}
      </div>
    </div>
  </div>
);

export default Order;
