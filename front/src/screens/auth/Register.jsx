import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FaCheck, FaEnvelope, FaEye, FaEyeSlash } from "react-icons/fa6";
import { FaUserAlt } from "react-icons/fa";
import AuthFooter from "../../components/footer/AuthFooter";
import { staticImages } from "../../images";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BsCheckAll } from "react-icons/bs";
import {
  RESET,
  register,
  sendVerificationEmail,
} from "../../redux/slices/authSlice";
import CountrySelect from "../../components/common/CountrySelect";
import AuthHeader from "../../components/header/AuthHeader";
import SpinLoader from "../../components/common/SpinLoader";

const initialState = {
  name: "",
  password: "",
  email: "",
  confirmPassword: "",
  country: "",
};

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isSuccess, isLoggedIn, isLoading } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState(initialState);
  const [upperCase, setUpperCase] = useState(false);
  const [number, setNumber] = useState(false);
  const [specialChar, setSpecialChar] = useState(false);
  const [passwordLength, setPasswordLength] = useState(false);
  const { name, password, email, confirmPassword } = formData;
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTermsConditions, setAgreeTermsConditions] = useState(false);

  const wrongIcon = <BsCheckAll size={18} />;
  const checkIcon = <BsCheckAll size={18} className="text-green-500" />;

  const switchIcon = (condition) => {
    if (condition) {
      return checkIcon;
    }
    return wrongIcon;
  };

  useEffect(() => {
    //check lowercase and uppercase
    if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) {
      setUpperCase(true);
    } else {
      setUpperCase(false);
    }
    //check for number
    if (password.match(/([0-9])/)) {
      setNumber(true);
    } else {
      setNumber(false);
    }
    // Check for special character
    if (password.match(/([!,%,&,@,#,$,^,*,?,_,~])/)) {
      setSpecialChar(true);
    } else {
      setSpecialChar(false);
    }
    // Check for PASSWORD LENGTH
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

  const registerUser = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      return toast.error("All fields are required");
    }
    if (password.length < 8) {
      return toast.error("Password length should be 8 or more");
    }
    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    const userData = {
      name,
      email,
      password,
      country: initialState.country,
    };

    if(initialState.country){
      if(agreeTermsConditions){
        const registerResult = await dispatch(register(userData));
        if (register.fulfilled.match(registerResult)) {
          await dispatch(sendVerificationEmail());
        }
      } else {
        toast.error("Please agree to terms & conditions");
      }
    } else {
      toast.error("Please select a country.");
    }
  };

  useEffect(() => {
    if (isSuccess && isLoggedIn) {
      navigate("/auth/login");
    }

    dispatch(RESET());
  }, [dispatch, isLoggedIn, isSuccess, navigate]);

  const getSelectedCountry = (countryName) => {
    initialState.country = countryName;
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prevState) => !prevState);
  };

  const handleAgreement = () => {
    setAgreeTermsConditions(prevValue => !prevValue);
  }

  return (
    <section
      className="register"
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
                Register Here!
              </h3>
              <form
                className="flex flex-col gap-2 mb-5 mt-2"
                onSubmit={registerUser}
              >
                <div className="border-b-[1px] text-base flex items-stretch form-element">
                  <input
                    type="text"
                    placeholder="Username"
                    className="w-full md:h-[48px] h-[42px] text-dark-blue placeholder:text-dark-blue/60 outline-none opacity-90 text-sm sm:text-base"
                    required
                    name="name"
                    value={name}
                    onChange={handleInputChange}
                  />
                  <span className="w-[48px] md:h-[48px] h-[42px] flex items-center justify-center text-dark-blue">
                    <FaUserAlt />
                  </span>
                </div>
                <div className="border-b-[1px] text-base flex items-stretch form-element">
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="w-full md:h-[48px] h-[42px] text-dark-blue placeholder:text-dark-blue/60 outline-none opacity-90 text-sm sm:text-base"
                    required
                    name="email"
                    value={email}
                    onChange={handleInputChange}
                  />
                  <span className="w-[48px] md:h-[48px] h-[42px] flex items-center justify-center text-dark-blue">
                    <FaEnvelope />
                  </span>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-3 lg:gap-y-0">
                  <div>
                    <div className="border-b-[1px] text-base flex items-stretch form-element">
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        className="w-full md:h-[48px] h-[42px] text-dark-blue placeholder:text-dark-blue/60 outline-none opacity-90 text-sm sm:text-base"
                        required
                        name="password"
                        value={password}
                        onChange={handleInputChange}
                      />
                      <span
                        className="w-[48px] md:h-[48px] h-[42px] flex items-center justify-center text-dark-blue"
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? <FaEye /> : <FaEyeSlash />}
                      </span>
                    </div>
                  </div>
                  <div>
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
                      <span
                        className="w-[48px] md:h-[48px] h-[42px] flex items-center justify-center text-dark-blue cursor-pointer"
                        onClick={toggleConfirmPasswordVisibility}
                      >
                        {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                      </span>
                    </div>
                  </div>
                </div>
                <ul className="box border border-dark/10 p-3 rounded-lg font-inter grid grid-cols-2 gap-x-2">
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
                <div>
                  <div className="text-base flex items-stretch form-element">
                    <CountrySelect getSelectedCountry={getSelectedCountry} />
                  </div>
                </div>
                <div className="flex items-center gap-3 agree-checkbox">
                  <div className="h-[18px] w-[19px] border-[1px] border-moonstone relative cursor-pointer" onClick={handleAgreement}>
                    {
                      agreeTermsConditions ? <FaCheck
                      size={13}
                      className="absolute ps-[1px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 check-icon text-moonstone"
                    /> : ""
                    }
                  </div>
                  <span className="text-dark-blue/80 font-inter">
                    I agree to the terms & conditions.{" "}
                  </span>
                </div>
                {isLoading && <SpinLoader />}
                <button
                  type="submit"
                  className="bg-blue-gradient text-white rounded md:min-h-[52px] min-h-[48px] uppercase font-inter font-semibold tracking-[1px] shadow-button hover:scale-105 default-transition text-sm sm:text-base"
                >
                  proceed to register
                </button>
              </form>

              <div className="text-center font-inter mt-5 mb-6">
                <p className="inline opacity-70 sm:text-base text-sm">
                  Already have an account?
                </p>
                <Link
                  to="/auth/login"
                  className="text-moonstone font-semibold mx-2 sm:text-base text-sm"
                >
                  Log in
                </Link>
              </div>
            </div>

            <div className="border-t-[1px] border-dark/10 pt-4">
              <p className=" text-moonstone font-semibold text-lg text-center mt-auto">
                <Link to="/">FotoIdol Studio.</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <AuthFooter />
    </section>
  );
};

export default Register;
