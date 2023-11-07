import Loader from "../../components/common/Loader";
import AuthHeader from "../../components/header/AuthHeader";
import AuthFooter from "../../components/footer/AuthFooter";
import { FaHashtag } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { staticImages } from "../../images";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RESET, loginWithCode, sendLoginCode } from "../../redux/slices/authSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";

export const LoginWithOTP = () => {
  const { email } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, isSuccess, isLoggedIn } = useSelector((state) => state.auth);
  const [loginCode, setLoginCode] = useState("");

  const senduserLoginCode = async () => {
    await dispatch(sendLoginCode(email));
    await dispatch(RESET());
  };

  const loginUserWithCode = async (e) => {
    e.preventDefault();
    if (loginCode === "") {
      return toast.error("Please enter OTP Code");
    }
    if (loginCode.length !== 6) {
      return toast.error("OTP code must be 6 characters");
    }

    const code = {
      loginCode,
    };

    await dispatch(loginWithCode({ code, email }));
  };

  useEffect(() => {
    if (isSuccess && isLoggedIn) {
      navigate("/");
    }
    dispatch(RESET());
  }, [dispatch, isLoggedIn, isSuccess, navigate]);

  return (
    <>
      <section className="login-with-otp" style={{
      background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.2)), url(${staticImages.banner2}) center/cover no-repeat`
    }}>
        <AuthHeader />
        <div className="containers my-10 w-full">
          <div className="items-stretch bg-blue-gradient rounded-2xl shadow-auth overflow-hidden max-w-[520px] mx-auto">
            <div className="bg-white relative flex flex-col justify-between px-4 py-8 sm:px-7 sm:py-10">
              <div>
                <h3 className="lg:text-2xl text-xl text-center font-semibold text-dark-moonstone mb-4">
                  Login with OTP
                </h3>
                {isLoading && <Loader />}
                <form
                  className="flex flex-col md:gap-5 gap-3 my-5"
                  onSubmit={loginUserWithCode}
                >
                  <div className="border-b-[1px] text-base flex items-stretch form-element">
                    <input
                      type="text"
                      placeholder="Enter OTP"
                      className="w-full md:h-[48px] h-[42px] text-dark-blue placeholder:text-dark-blue/60 outline-none opacity-90 text-sm sm:text-base"
                      name="logincode"
                      value={loginCode}
                      onChange={(e) => setLoginCode(e.target.value)}
                    />
                    <span className="w-[48px] md:h-[48px] h-[42px] flex items-center justify-center text-dark-blue">
                      <FaHashtag />
                    </span>
                  </div>
                  <button
                    type="submit"
                    className="bg-blue-gradient text-white rounded md:min-h-[52px] min-h-[48px] uppercase font-inter font-semibold tracking-[1px] shadow-button md:mt-3 mt-1 hover:scale-105 default-transition text-sm sm:text-base"
                  >
                    Login
                  </button>
                </form>
                <div className="text-center font-inter mt-10 mb-4">
                  <Link
                    onClick={senduserLoginCode}
                    className="text-moonstone font-semibold mx-2 sm:text-base text-sm"
                  >
                    Resend Code
                  </Link>
                </div>
              </div>

              <div className="border-t-[1px] border-dark/10 pt-4">
                <p className=" text-white font-semibold text-lg text-pink-gradient text-center mt-auto">
                <Link to = "/">FotoIdol Studio.</Link>
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
