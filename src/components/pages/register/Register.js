import { useFormik } from "formik";
import { useEffect } from "react";
import { registerValidationSchema } from "../../../validation/validation";

import { useNavigate } from "react-router-dom";
import { useContextMain } from "../../../contexts/MainContext";
import { useRegisterHook } from "../../../helper/hooks/asyncFunction";
import CustomInput from "../../customInput/CustomInput";

export default function Register() {
  const { token } = useContextMain();
  const navigate = useNavigate();

  const { registerHook } = useRegisterHook();

  useEffect(() => {
    token && navigate("/home");
  }, []);

  function submit(values) {
    // edit values if needed
    registerHook(values);
  }

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    onSubmit: submit,
    validationSchema: registerValidationSchema,
  });

  return (
    <div className="container py-5">
      <h2 className="mb-4 fw-bold">register now</h2>
      <form onSubmit={formik.handleSubmit}>
        {/* name */}
        <CustomInput
          label="Name"
          inputClasses="form-control mb-2"
          labelClasses="form-label fw-bold"
          error={formik.errors.name}
          touched={formik.touched.name}
          type="text"
          value={formik.values.name}
          autoComplete="username"
          id="name"
          name="name"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          aria-describedby="nameHelp"
        />

        {/* email */}
        <CustomInput
          label="Email"
          inputClasses="form-control mb-2"
          labelClasses="form-label fw-bold"
          error={formik.errors.email}
          touched={formik.touched.email}
          type="email"
          value={formik.values.email}
          autoComplete="email"
          id="email"
          name="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          aria-describedby="emailHelp"
        />

        {/* password */}
        <CustomInput
          label="Password"
          inputClasses="form-control mb-2"
          labelClasses="form-label fw-bold"
          error={formik.errors.password}
          touched={formik.touched.password}
          type="password"
          value={formik.values.password}
          autoComplete="new-password"
          id="new-password"
          name="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          aria-describedby="passwordHelp"
          dangerouslySetInnerHTML={true}
        />

        {/* re-password */}
        <CustomInput
          label="Re-Password"
          inputClasses="form-control mb-2"
          labelClasses="form-label fw-bold"
          error={formik.errors.rePassword}
          touched={formik.touched.rePassword}
          type="password"
          value={formik.values.rePassword}
          autoComplete="new-password"
          id="re-password"
          name="rePassword"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          aria-describedby="rePasswordHelp"
          dangerouslySetInnerHTML={true}
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
          aria-describedby="phoneHelp"
        />

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
          register now
        </button>
      </form>
    </div>
  );
}
