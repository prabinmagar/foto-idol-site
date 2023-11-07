import "react-toastify/dist/ReactToastify.css";
import { FaTimes } from "react-icons/fa";
import { useEffect, useState } from "react";
import { scrollToTop } from "../../utils/scrollToTop";

const AuthHeader = () => {
  const [showHeaderTop, setShowHeaderTop] = useState(true);

  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <div className="">
      <div className={`bg-blue-gradient pt-4 pe-8 pb-4 ps-4 text-white text-center relative ${showHeaderTop ? "block" : "hidden"}`}>
        <FaTimes className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer" onClick={() => setShowHeaderTop(false)} />
        <p className="font-inter containers mx-auto w-full">
          Upload your <span className="font-medium">best images</span>, and keep
          as a memory,{" "}
          <span className="font-medium">get selected to be featured</span> in
          our website
        </p>
      </div>
    </div>
  );
};

export default AuthHeader;
