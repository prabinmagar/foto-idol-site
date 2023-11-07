import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { RESET, changePassword, logout } from "../../redux/slices/authSlice";
import useRedirectLoggedOutUser from "../../utils/useRedirectLoggedOutUser";
import { Button } from "@material-tailwind/react";
import { BsCheckAll } from "react-icons/bs";
import { PasswordInput } from "../common/PasswordInput";
import SpinLoader from "../common/SpinLoader";

const initialSate = {
  oldPassword: "",
  password: "",
  confirmPassword: "",
};
export const UpdatePassword = () => {
  useRedirectLoggedOutUser("/login");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(initialSate);
  const [upperCase, setUpperCase] = useState(false);
  const [number, setNumber] = useState(false);
  const [specialChar, setSpecialChar] = useState(false);
  const [passwordLength, setPasswordLength] = useState(false);
  const { isLoading, isSuccess } = useSelector((state) => state.auth);
  const { password, oldPassword, confirmPassword } = formData;
  const wrongIcon = <BsCheckAll size={18} />;
  const checkIcon = <BsCheckAll size={18} className="text-green-500" />;

  const switchIcon = (condition) => {
    return condition ? checkIcon : wrongIcon;
  };

  useEffect(() => {
    if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) {
      setUpperCase(true);
    } else {
      setUpperCase(false);
    }
    if (password.match(/([0-9])/)) {
      setNumber(true);
    } else {
      setNumber(false);
    }
    if (password.match(/([!,%,&,@,#,$,^,*,?,_,~])/)) {
      setSpecialChar(true);
    } else {
      setSpecialChar(false);
    }
    if (password.length >= 8) {
      setPasswordLength(true);
    } else {
      setPasswordLength(false);
    }
  }, [password]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (!oldPassword || !password || !confirmPassword) {
      return toast.error("All fields are required");
    }
    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    const userData = {
      oldPassword,
      newPassword: password,
    };

    await dispatch(changePassword(userData));
    await dispatch(RESET());
    if (isSuccess) {
      dispatch(logout());
      navigate("/auth/login");
    }
  };

  return (
    <>
      <section className="max-w-[500px] mx-auto pt-6">
        <div className="flex justify-between items-center">
          <h6 className="text-blueGray-400 text-sm mt-3 font-bold uppercase">
            change account password
          </h6>
        </div>
        <form onSubmit={handleUpdatePassword}>
          <div className="input my-5">
            <PasswordInput
              placeholder="Current Password"
              required
              name="oldPassword"
              value={oldPassword}
              onChange={handleInputChange}
              autoComplete="off"
              label="Current Password"
            />
          </div>
          <div className="input my-5">
            <PasswordInput
              placeholder="New Password"
              required
              name="password"
              value={password}
              onChange={handleInputChange}
              autoComplete="off"
              label="New Password"
            />
          </div>
          <PasswordInput
            placeholder="Confirm Password"
            required
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleInputChange}
            autoComplete="off"
            label="Confirm Password"
            onPaste={(e) => {
              e.preventDefault();
              toast.error("Cannot paste into input field");
              return false;
            }}
          />
          <br />
          {
            isLoading && <SpinLoader />
          }
          <Button type="submit" className="bg-moonstone rounded">Change Password</Button>
          <ul className="box my-8 border border-gray-300 p-3 rounded-lg">
            <li
              className={`text-[13px] py-0.5 font-inter ${
                upperCase ? "text-green-500" : "text-gray-500"
              } flex items-center gap-2`}
            >
              {switchIcon(upperCase)}
              Lowercase & Uppercase
            </li>
            <li
              className={`text-[13px] py-0.5 font-inter ${
                number ? "text-green-500" : "text-gray-500"
              } flex items-center gap-2`}
            >
              {switchIcon(number)}
              Number (0-9)
            </li>
            <li
              className={`text-[13px] py-0.5 font-inter ${
                specialChar ? "text-green-500" : "text-gray-500"
              } flex items-center gap-2`}
            >
              {switchIcon(specialChar)}
              Special Character (!@#$%^&*)
            </li>
            <li
              className={`text-[13px] py-0.5 font-inter ${
                passwordLength ? "text-green-500" : "text-gray-500"
              } flex items-center gap-2`}
            >
              {switchIcon(passwordLength)}
              At least 8 Characters
            </li>
          </ul>
        </form>
      </section>
    </>
  );
};
