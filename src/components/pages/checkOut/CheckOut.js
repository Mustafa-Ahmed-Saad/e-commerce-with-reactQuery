import { useFormik } from "formik";
import { useParams } from "react-router-dom";
import {
  useCardPayment,
  useCashPayment,
} from "../../../helper/hooks/asyncFunction";
import { checkOutValidationSchema } from "../../../validation/validation";
import CustomInput from "../../customInput/CustomInput";

export default function CheckOut() {
  //   get cart id
  const { id } = useParams();
  const { cashPayment } = useCashPayment();
  const { cardPayment } = useCardPayment();

  const submit = (formData) => {
    const info = { id, formData };
    // true:cash payment | false: card payment
    formData.payment === "cash" ? cashPayment(info) : cardPayment(info);
  };

  const formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
      payment: "cash",
    },
    onSubmit: submit,
    validationSchema: checkOutValidationSchema,
  });

  return (
    <div className="container py-5">
      <h2 className="mb-4 fw-bold">Checkout now</h2>
      <form onSubmit={formik.handleSubmit}>
        {/* details */}
        <CustomInput
          label="details"
          inputClasses="form-control mb-2"
          labelClasses="form-label fw-bold"
          error={formik.errors.details}
          touched={formik.touched.details}
          type="text"
          value={formik.values.details}
          id="details"
          name="details"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />

        {/* phone */}
        <CustomInput
          label="Phone"
          inputClasses="form-control mb-2"
          labelClasses="form-label fw-bold"
          error={formik.errors.phone}
          touched={formik.touched.phone}
          type="tel"
          value={formik.values.phone}
          autoComplete="tel"
          id="phone"
          name="phone"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />

        {/* city */}
        <CustomInput
          label="City"
          inputClasses="form-control mb-2"
          labelClasses="form-label fw-bold"
          error={formik.errors.city}
          touched={formik.touched.city}
          type="text"
          value={formik.values.city}
          id="city"
          name="city"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />

        {/* payment options */}
        <div className="mb-3 input-group-lg">
          <label htmlFor="payment-options" className="form-label fw-bold">
            payment method options:
          </label>
          <select
            id="payment-options"
            name="payment"
            value={formik.values.payment}
            onChange={formik.handleChange}
            className="form-select form-select-lg mb-3"
            aria-label=".form-select-lg example"
          >
            <option value="cash" selected>
              cash
            </option>
            <option value="card">credit card</option>
          </select>
          {formik.errors.payment && formik.touched.payment ? (
            <div className="alert alert-danger">{formik.errors.payment}</div>
          ) : null}
        </div>

        <div className="d-flex align-items-center justify-content-between">
          {/* submit btn */}
          <button
            className={`btn btn-lg d-block ms-auto ${
              formik.isValid && formik.dirty
                ? "btn-main"
                : "btn-outline-secondary"
            }`}
            disabled={!(formik.isValid && formik.dirty)}
            type="submit"
          >
            Checkout
          </button>
        </div>
      </form>
    </div>
  );
}
