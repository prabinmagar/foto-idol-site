import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getContactInfo } from "../../redux/slices/settings/SettingSlice";

export const Footer = () => {
  const dispatch = useDispatch();
  const contactInfo = useSelector(state => state.setting.contactinfo);
  
  useEffect(() => {
    dispatch(getContactInfo());
  }, [dispatch]);
  return (
    <>
      <footer className=" text-white bg-black py-16">
        <div className="containers">
          <div className="mb-5">
            <ul className="footer-links pt-2 pb-4 flex justify-center items-center flex-wrap gap-1 [&>*:last-child]:after:hidden">
              <li className="px-5 relative after:absolute after:top-1/2 after:-translate-y-1/2 after:w-[5px] after:h-[5px] after:rounded-full after:content-[''] after:bg-moonstone after:right-0 after:translate-x-1/2 lg:text-base text-base">
                <Link className="font-inter" to="/search">
                  All Photos
                </Link>
              </li>
              <li className="px-5 relative after:absolute after:top-1/2 after:-translate-y-1/2 after:w-[5px] after:h-[5px] after:rounded-full after:content-[''] after:bg-moonstone after:right-0 after:translate-x-1/2 lg:text-base text-base">
                <Link className="font-inter" to="/about">
                  About Us
                </Link>
              </li>
              <li className="px-5 relative after:absolute after:top-1/2 after:-translate-y-1/2 after:w-[5px] after:h-[5px] after:rounded-full after:content-[''] after:bg-moonstone after:right-0 after:translate-x-1/2 lg:text-base text-base">
                <Link className="font-inter" to="/maintain">
                  Terms and conditions
                </Link>
              </li>
            </ul>
            <p className="font-light py-[2px] text-white/50 opacity-80 text-[15px] font-inter text-center ">
            {contactInfo?.address} &nbsp;|&nbsp; Foto Idol Studio
            </p>
          </div>
          <div className="text-md font-medium text-center border-t-[1px] border-white/5 pt-6">
            &copy; Design and Developed by{" "}
            <span className="text-gray-500 font-bold">Faith Tech.</span>
          </div>
        </div>
      </footer>
    </>
  );
};
