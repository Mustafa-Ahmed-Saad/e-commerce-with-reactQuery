import React from "react";

const CustomInput = ({
  label,
  inputClasses,
  labelClasses,
  error,
  touched,
  dangerouslySetInnerHTML,
  ...props
}) => (
  <div className="mb-3 input-group-lg">
    <label htmlFor={props.id} className={labelClasses}>
      {label}:
    </label>
    <input className={inputClasses} {...props} />
    {error && touched ? (
      dangerouslySetInnerHTML ? (
        <div
          className="alert alert-danger"
          dangerouslySetInnerHTML={{ __html: error }}
        />
      ) : (
        <div className="alert alert-danger">{error}</div>
      )
    ) : null}
  </div>
);

export default CustomInput;
