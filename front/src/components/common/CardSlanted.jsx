import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { POST_CARD_TITLE_TEXT_LIMIT } from "../../utils/constants";

export const CardSlanted = ({ title, image, styles, postSlug }) => {
  return (
    <Link to={`/search/${postSlug}`} className="px-2 block">
      <div
        className="card text-start rounded-xl relative group my-3"
        style={{
          boxShadow:
            "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
        }}
      >
        <div
          className={`${styles} w-full object-cover overflow-hidden relative after:absolute after:content-[''] after:top-1 after:left-1 after:right-1 after:bottom-1 after:border-white after:border-2 after:rounded-xl`}
        >
          <img
            src={image}
            alt="title"
            className={`${styles} object-cover min-h-[225px] xxl:h-[360px] xxl:w-[240px] w-[180px] h-[280px]`}
          />
        </div>
        <h2 className="capitalize font-medium mt-5 text-white absolute bottom-0 xxl:m-4 m-3 leading-[1.3] xxl:text-base text-[14px] z-30 font-inter">
          {title.length > POST_CARD_TITLE_TEXT_LIMIT
            ? title.slice(0, POST_CARD_TITLE_TEXT_LIMIT) + "..."
            : title}
        </h2>
      </div>
    </Link>
  );
};

CardSlanted.propTypes = {
  title: PropTypes.any,
  image: PropTypes.any,
  styles: PropTypes.any,
  show: PropTypes.any,
  gridClass: PropTypes.string,
  postSlug: PropTypes.any,
};
