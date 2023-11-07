import { FaKey } from "react-icons/fa6";
import AuthHeader from "../../components/header/AuthHeader";
import AuthFooter from "../../components/footer/AuthFooter";
import { staticImages } from "../../images";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RESET, resetPassword } from "../../redux/slices/authSlice";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/common/Loader";
import { PasswordInput } from "../../components/common/PasswordInput";
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
      return toast.error("Password must contain at least one uppercase letter, one number, one special character, and be at least 8 characters long.");
    }
    const userData = {
      password,
    };

    await dispatch(resetPassword({ userData, resetToken }));
    await dispatch(RESET());
    if (isSuccess) {
      navigate("/login");
    }
  };

  return (
    <>
      <section className="reset-password">
        <AuthHeader />
        <div className="containers">
          <div className="grid md:grid-cols-2 grid-cols-1 items-stretch my-16 rounded-2xl overflow-hidden shadow-auth">
            <div className="flex items-center bg-white/60 justify-end xxl:p-12 p-6 relative">
              <img src={staticImages.reset_illus} alt="cover" className="w-full md:max-w-full max-w-[200px] mx-auto" />
            </div>
            <div className="bg-white relative flex flex-col justify-between px-4 py-8 sm:px-7 sm:py-10">
              <div>
                <h3 className="lg:text-2xl text-xl text-center font-semibold text-dark-moonstone mb-4">Reset Your Password</h3>
                <p className="text-custom">Please enter the email address you&apos;d like your password reset information sent to</p>
                {isLoading && <Loader />}

                <form onSubmit={reset} className="flex flex-col md:gap-5 gap-3 my-5">
                  <div className="border-b-[1px] text-base flex items-stretch form-element">
                    <PasswordInput placeholder="Password" required name="password" value={password} onChange={handleInputChange} />{" "}
                  </div>

                  <div className="border-b-[1px] text-base flex items-stretch form-element">
                    <PasswordInput
                      placeholder="Confirm Password"
                      required
                      name="confirmPassword"
                      value={confirmPassword}
                      onChange={handleInputChange}
                      //onPaste={(e) => {
                      //  e.preventDefault()
                      //  toast.error("Cannot paste into input field")
                      //  return false
                      //}}
                    />
                    <span className="w-[48px] md:h-[48px] h-[42px] flex items-center justify-center text-dark-blue">
                      <FaKey />
                    </span>
                  </div>

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
                  <button type="submit" className="bg-pink-gradient text-white rounded md:min-h-[52px] min-h-[48px] uppercase font-inter font-semibold tracking-[1px] shadow-button2 md:mt-3 mt-1 hover:scale-105 default-transition text-sm sm:text-base">
                    reset password
                  </button>
                </form>
              </div>

              <div className="border-t-[1px] border-dark/10 pt-4">
                <p className=" text-white font-semibold text-lg text-pink-gradient text-center mt-auto">
                  <Link to="/">PhotoIdol Studio.</Link>
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
