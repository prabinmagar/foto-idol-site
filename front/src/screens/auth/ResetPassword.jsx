import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/common/Loader";
import { FaEye, FaEyeSlash, FaKey } from "react-icons/fa6";
import AuthHeader from "../../components/header/AuthHeader";
import AuthFooter from "../../components/footer/AuthFooter";
import { staticImages } from "../../images";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { RESET, resetPassword } from "../../redux/slices/authSlice";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { BsCheckAll } from "react-icons/bs";

const initialState = {
  password: "",
  confirmPassword: "",
};

export const ResetPassword = () => {
  const [formData, setFormData] = useState(initialState);
  const { password, confirmPassword } = formData;
  const { resetToken } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, isSuccess } = useSelector((state) => state.auth);
  const [upperCase, setUpperCase] = useState(false);
  const [number, setNumber] = useState(false);
  const [specialChar, setSpecialChar] = useState(false);
  const [passwordLength, setPasswordLength] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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

  const reset = async (e) => {
    e.preventDefault();
    if (!confirmPassword || !password) {
      return toast.error("All fields are required");
    }
    if (password.length < 8) {
      return toast.error("Password length should be 8 or more");
    }
    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }
    if (!upperCase || !number || !specialChar || !passwordLength) {
      return toast.error(
        "Password must contain at least one uppercase letter, one number, one special character, and be at least 8 characters long."
      );
    }
    const userData = {
      password,
    };

    await dispatch(resetPassword({ userData, resetToken }));
    await dispatch(RESET());
    if (isSuccess) {
      navigate("/auth/login");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <>
      <section
        className="reset-password"
        style={{
          background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.2)), url(${staticImages.banner2}) center/cover no-repeat`,
        }}
      >
        <AuthHeader />
        <div className="containers my-10 w-full">
          <div className="items-stretch rounded-2xl shadow-auth overflow-hidden border-[1px] border-white/10 max-w-[520px] mx-auto">
            <div className="relative flex flex-col justify-between px-4 py-8 sm:px-7 sm:py-10 bg-white">
              <div>
                <h3 className="lg:text-2xl text-xl text-center font-semibold text-dark-moonstone mb-4">
                  Reset Your Password
                </h3>
                <p className="text-custom">
                  Please enter the email address you&apos;d like your password
                  reset information sent to
                </p>
                {isLoading && <Loader />}
                <form
                  onSubmit={reset}
                  className="flex flex-col md:gap-5 gap-3 my-5"
                >
                  <div className="border-b-[1px] text-base flex items-stretch form-element">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      className="w-full md:h-[48px] h-[42px] text-dark-blue placeholder:text-dark-blue/60 outline-none opacity-90 text-sm sm:text-base"
                      name="password"
                      value={password}
                      onChange={handleInputChange}
                    />
                    <span className="w-[48px] md:h-[48px] h-[42px] flex items-center justify-center text-dark-blue">
                      <FaKey />
                    </span>
                  </div>

                  <div className="border-b-[1px] text-base flex items-stretch form-element">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Confirm Password"
                      className="w-full md:h-[48px] h-[42px] text-dark-blue placeholder:text-dark-blue/60 outline-none opacity-90 text-sm sm:text-base"
                      required
                      name="confirmPassword"
                      value={confirmPassword}
                      onChange={handleInputChange}
                      onPaste={(e) => {
                        e.preventDefault();
                        toast.error("Cannot paste into input field");
                        return false;
                      }}
                    />
                    <span className="w-[48px] md:h-[48px] h-[42px] flex items-center justify-center text-dark-blue">
                      <FaKey />
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mt-3">
                    {showPassword ? (
                      <FaEye className="text-dark-blue/80" />
                    ) : (
                      <FaEyeSlash className="text-dark-blue/80" />
                    )}
                    <button
                      type="button"
                      className="text-dark-blue/80 cursor-pointer text-sm font-medium"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? "Hide Password" : "Show Password"}
                    </button>
                  </div>

                  <ul className="box mt-3 border border-dark/10 p-3 rounded-lg font-inter">
                    <li
                      className={`text-[13px] ${
                        upperCase ? "text-green-500" : "text-gray-500"
                      } flex items-center gap-2`}
                    >
                      {switchIcon(upperCase)}
                      Lowercase & Uppercase
                    </li>
                    <li
                      className={`text-[13px] ${
                        number ? "text-green-500" : "text-gray-500"
                      } flex items-center gap-2`}
                    >
                      {switchIcon(number)}
                      Number (0-9)
                    </li>
                    <li
                      className={`text-[13px] ${
                        specialChar ? "text-green-500" : "text-gray-500"
                      } flex items-center gap-2`}
                    >
                      {switchIcon(specialChar)}
                      Special Character (!@#$%^&*)
                    </li>
                    <li
                      className={`text-[13px] ${
                        passwordLength ? "text-green-500" : "text-gray-500"
                      } flex items-center gap-2`}
                    >
                      {switchIcon(passwordLength)}
                      At least 8 Characters
                    </li>
                  </ul>
                  <button
                    type="submit"
                    className="bg-blue-gradient text-white rounded md:min-h-[52px] min-h-[48px] uppercase font-inter font-semibold tracking-[1px] shadow-button mt-1 hover:scale-105 default-transition text-sm sm:text-base"
                  >
                    reset password
                  </button>
                </form>
              </div>

              <div className="border-t-[1px] border-dark/10 pt-4">
                <p className=" text-white font-semibold text-lg text-blue-gradient text-center mt-auto">
                  <Link to="/">FotoIdol Studio.</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
        <AuthFooter />
      </section>
    </>
  );
};
