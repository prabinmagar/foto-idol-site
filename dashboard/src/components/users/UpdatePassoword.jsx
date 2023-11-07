import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { RESET, changePassword, logout } from "../../redux/slices/authSlice";
import { PasswordInput } from "../common/PasswordInput";
import Loader from "../common/Loader";
import useRedirectLoggedOutUser from "../../utils/useRedirectLoggedOutUser";
import { Button } from "@material-tailwind/react";
import { BsCheckAll } from "react-icons/bs";

const initialSate = {
  oldPassword: "",
  password: "",
  confirmPassword: "",
};
export const UpdatePassoword = () => {
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
    if (password.length > 8) {
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
      navigate("/login");
    }
  };

  //   useEffect(() => {
  //     if (isSuccess && message.includes("Your password has been successfully changed. You can now log in with your new password.")) {
  //       dispatch(logout());
  //       navigate("/login");
  //     }
  //   }, [dispatch, navigate, message, isSuccess]);
  return (
    <>
      <section className="w-96">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-medium">Update Password</h2>
        </div>
        {isLoading && <Loader />}
        <form className="my-16" onSubmit={handleUpdatePassword}>
          <img src="https://cdn-icons-png.flaticon.com/512/9578/9578787.png" alt="" className=" w-16 h-16 m-auto" />
          <br />
          <div className="input my-5">
            <PasswordInput className="border" placeholder="Current Password" required name="oldPassword" value={oldPassword} onChange={handleInputChange} />
          </div>
          <div className="input my-5">
            <PasswordInput placeholder="Password" required name="password" value={password} onChange={handleInputChange} />
          </div>
          <PasswordInput placeholder="Confirm Password" required name="confirmPassword" value={confirmPassword} onChange={handleInputChange} />
          <br />
          <Button type="submit">Change Password</Button>

          <br />
          <br />
          <ul className="box my-3 border border-indigo-300 p-3 rounded-lg">
            <li className={`text-[12px] ${upperCase ? "text-green-500" : "text-gray-500"} flex items-center gap-2`}>
              {switchIcon(upperCase)}
              Lowercase & Uppercase
            </li>
            <li className={`text-[12px] ${number ? "text-green-500" : "text-gray-500"} flex items-center gap-2`}>
              {switchIcon(number)}
              Number (0-9)
            </li>
            <li className={`text-[12px] ${specialChar ? "text-green-500" : "text-gray-500"} flex items-center gap-2`}>
              {switchIcon(specialChar)}
              Special Character (!@#$%^&*)
            </li>
            <li className={`text-[12px] ${passwordLength ? "text-green-500" : "text-gray-500"} flex items-center gap-2`}>
              {switchIcon(passwordLength)}
              At least 8 Characters
            </li>
          </ul>
        </form>
      </section>
    </>
  );
};
