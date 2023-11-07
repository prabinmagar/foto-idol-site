import { AiOutlineArrowUp } from "react-icons/ai";
import PropTypes from "prop-types";

const ScrollTopButton = ({ showScrollTop }) => {
  const handleScrollTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <button
      onClick={handleScrollTop}
      className={`fixed right-4 bottom-[80px] text-white bg-pink-gradient w-[36px] h-[36px] rounded-full flex items-center justify-center default-transition hover:scale-110 z-50 shadow-button2 ${
        showScrollTop ? "opacity-100" : "opacity-0"
      }`}
    >
      <AiOutlineArrowUp />
    </button>
  );
};

export default ScrollTopButton;
ScrollTopButton.propTypes = {
  showScrollTop: PropTypes.bool,
};
