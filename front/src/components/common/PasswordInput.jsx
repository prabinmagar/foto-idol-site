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
  autoComplete
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className="input">
        <label className="block my-2 text-sm font-medium text-gray-900">
          {fieldName}
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={value}
            name={name}
            onChange={onChange}
            onPaste={onPaste}
            placeholder={placeholder}
            autoComplete={autoComplete}
            className="px-3 py-3 placeholder:text-gray-500 placeholder:font-normal text-blueGray-600 rounded text-sm focus:outline-none focus:ring w-full ease-linear transition-all duration-150 outline-none shadow-none border-[1px] border-gray-200 bg-whitesmoke font-medium font-inter focus:bg-transparent focus:border-moonstone"
          />
          <div
            className="icon text-gray-600 absolute top-3 right-3 cursor-pointer"
            onClick={togglePassword}
          >
            {showPassword ? (
              <AiFillEyeInvisible size={20} />
            ) : (
              <AiFillEye size={20} />
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
  autoComplete: PropTypes.any
};
