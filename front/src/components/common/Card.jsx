import PropTypes from "prop-types";

export const Card = ({ title, image }) => {
  return (
    <div className="px-2 group">
      <div className="card text-center relative">
        <div className="image w-60 h-80 overflow-hidden border-[3px] border-white rounded-lg group-hover:border-white default-transition">
          {image && (
            <img
              src={image}
              alt="title"
              className="object-cover w-full h-full default-transition hover:scale-125 hover:rotate-6"
            />
          )}
        </div>
        <h2
          className="mt-5 font-inter uppercase font-semibold tracking-[1px] absolute bottom-4 right-4 bg-white text-dark/70 px-3 rounded-[6px] text-xs py-[4px] flex items-center justify-center group-hover:text-moonstone default-transition"
          style={{
            boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
          }}
        >
          {title}
        </h2>
      </div>
    </div>
  );
};

Card.propTypes = {
  title: PropTypes.any,
  image: PropTypes.any,
};
