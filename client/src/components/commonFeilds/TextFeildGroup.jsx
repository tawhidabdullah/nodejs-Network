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
  error
}) => {
  return (
    <div className="form-group">
      <input
        type={type}
        className={classnames("form-control form-control-lg", {
          "is-invalid": error
        })}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        disable={disable}
      />
      {info && <small className="form-text text-muted" />}
      {error && <div className="invalid-feedback"> {error} </div>}
    </div>
  );
};

export default TextFeildGroup;
