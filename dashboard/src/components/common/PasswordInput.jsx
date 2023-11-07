import { Input } from "@material-tailwind/react";
import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import PropTypes from "prop-types";

export const PasswordInput = ({
  fieldName,
  value,
  name,
  onChange,
  onPaste,
  placeholder,
  autoComplete,
  label,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className="input font-inter">
        <label className="block my-2 text-sm font-medium text-gray-900">
          {fieldName}
        </label>

        <div className="relative">
          <Input
            size="lg"
            type={showPassword ? "text" : "password"}
            value={value}
            name={name}
            onChange={onChange}
            onPaste={onPaste}
            autoComplete={autoComplete}
            // placeholder={placeholder}
            className="border"
            label={label}
          />
          <div
            className="icon text-gray-500 absolute top-3 right-3 cursor-pointer"
            onClick={togglePassword}
          >
            {showPassword ? (
              <AiFillEyeInvisible size={25} />
            ) : (
              <AiFillEye size={25} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

PasswordInput.propTypes = {
  fieldName: PropTypes.any,
  value: PropTypes.any,
  name: PropTypes.any,
  onChange: PropTypes.any,
  onPaste: PropTypes.any,
  placeholder: PropTypes.any,
  autoComplete: PropTypes.any,
  label: PropTypes.any,
};
