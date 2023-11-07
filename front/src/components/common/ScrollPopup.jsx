import { AiFillCamera } from "react-icons/ai";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ScrollPopup = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);

    return (
      <div className="fixed bottom-5 right-4 px-4 py-2.5 rounded-lg shadow-xl bg-moonstone flex items-center z-50 cursor-pointer scroll-popup">
        <AiFillCamera size = { 24 } className="text-white me-2" />
        {
          isLoggedIn ? <Link to = "/admin" className="text-base text-white font-inter font-semibold">Upload Your Photos</Link> : <Link to = "/auth/register" className="text-base text-white font-inter font-semibold">Upload Your Photos</Link>
        }
        
      </div>
    );
  };
  
  export default ScrollPopup;