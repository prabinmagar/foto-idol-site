import Loader from "../../components/common/Loader";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaEnvelope, FaKey } from "react-icons/fa6";
import { staticImages } from "../../images";
import { Link } from "react-router-dom";
import AuthHeader from "../../components/header/AuthHeader";
import AuthFooter from "../../components/footer/AuthFooter";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { RESET, forgotPassword } from "../../redux/slices/authSlice";
import SpinLoader from "../../components/common/SpinLoader";

export const Forgetpassword = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);

  const ForgotSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  });

  const initialValues = {
    email: "",
  };

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      await dispatch(forgotPassword(values.email));
      await dispatch(RESET());
      resetForm();
    } catch (error) {
      if (error.response) {
        if (error.response.data && error.response.data.message) {
          const errorMessage = error.response.data.message;
          toast.error(errorMessage);
        }
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <section
        className="forgot-password"
        style={{
          background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.2)), url(${staticImages.banner1}) center/cover no-repeat`,
        }}
      >
        <AuthHeader />
        <div className="containers w-full my-10">
          <div className="items-stretch rounded-2xl overflow-hidden shadow-auth max-w-[520px] mx-auto">
            <div className="bg-white relative flex flex-col justify-between px-4 py-8 sm:px-7 sm:py-10">
              <div>
                <h3 className="lg:text-2xl text-xl text-center font-semibold text-dark-moonstone mb-4">
                  Forgot Password!
                </h3>
                <Formik
                  initialValues={initialValues}
                  validationSchema={ForgotSchema}
                  onSubmit={handleSubmit}
                >
                  {({ errors, touched }) => (
                    <Form className="flex flex-col md:gap-5 gap-3 my-5">
                      <div className="border-b-[1px] text-base flex items-stretch form-element">
                        <Field
                          type="email"
                          placeholder="Email Address"
                          className="w-full md:h-[48px] h-[42px] text-dark-blue placeholder:text-dark-blue/60 outline-none opacity-90 text-sm sm:text-base"
                          name="email"
                        />
                        <span className="w-[48px] md:h-[48px] h-[42px] flex items-center justify-center text-dark-blue">
                          <FaEnvelope />
                        </span>
                      </div>
                      <ErrorMessage
                        className="error-msg"
                        name="email"
                        component="div"
                      />
                      {isLoading && <SpinLoader />}
                      <button
                        type="submit"
                        className="bg-pink-gradient text-white rounded  md:min-h-[52px] min-h-[48px] uppercase font-inter font-semibold tracking-[1px] shadow-button2 md:mt-3 mt-1 hover:scale-105 default-transition text-sm sm:text-base"
                      >
                        send email
                      </button>
                    </Form>
                  )}
                </Formik>
              </div>

              <div className="border-t-[1px] border-dark/10 pt-4">
                <p className=" text-white font-semibold text-lg text-pink-gradient text-center mt-auto">
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
