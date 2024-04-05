import { useFormik } from "formik";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginValidationSchema } from "../../../validation/validation";
import { useContextMain } from "../../../contexts/MainContext";
import { useLoginHook } from "../../../helper/hooks/asyncFunction";
import CustomInput from "../../customInput/CustomInput";

export default function Login() {
  const navigate = useNavigate();
  const { token } = useContextMain();
  const { loginHook } = useLoginHook();

  useEffect(() => {
    token && navigate("/home");
  }, []);

  const submit = (values) => {
    // edit values if needed
    loginHook(values);
  };

  const handelForgetPassword = () => {
    navigate("/forget-password");
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: submit,
    validationSchema: loginValidationSchema,
  });

  return (
    <div className="container py-5">
      <h2 className="mb-4 fw-bold">login now</h2>
      <form onSubmit={formik.handleSubmit}>
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

        <p
          type="button"
          onClick={handelForgetPassword}
          className="align-self-start fs-5 fw-bold forget-password transtion-5"
        >
          forget your password ?
        </p>
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
            login now
          </button>
        </div>
      </form>
    </div>
  );
}
