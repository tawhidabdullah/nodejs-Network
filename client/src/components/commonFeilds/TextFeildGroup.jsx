import React from "react";
import classnames from "classnames";

const TextFeildGroup = ({
  // props descructuring
  name,
  placeholder,
  label,
  info,
  type,
  onChange,
  value,
  disable,
  errors
}) => {
  return (
    <div className="form-group">
      <input
        type={type}
        className={classnames("form-control form-control-lg", {
          "is-invalid": errors
        })}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        disable={disable}
      />
      {info && <small className="form-text text-muted" > {info} </small>}
      {errors && <div className="invalid-feedback"> {errors} </div>}
    </div>
  );
};

export default TextFeildGroup;
