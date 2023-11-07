import { useEffect } from "react";
import { staticImages } from "../../images";
import Masonry from "react-masonry-css";
import { useDispatch, useSelector } from "react-redux";
import { BsSearch } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";
import { selectAllPosts } from "../../redux/slices/postsSlice";
import { getAllPost } from "../../redux/slices/postsSlice";
import Loader from "../../components/common/Loader";
import { scrollToTop } from "../../utils/scrollToTop";
import PropTypes from "prop-types";

export const HomeSearchScreen = () => {
  const { searchQuery } = useParams();

  useEffect(() => {
    scrollToTop();
  }, []);
  return (
    <div
      style={{
        minHeight: "calc(100vh - 270px)",
      }}
    >
      <HomeSearchContent searchQuery={searchQuery} />
    </div>
  );
};

export const HomeSearchContent = ({ searchQuery }) => {
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts);
  const isLoading = useSelector((state) => state.posts.isLoading);

  const filteredPosts = posts?.filter((post) => {
    const titleMatch = post.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const usernameMatch = post.user.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return titleMatch || usernameMatch;
  });

  useEffect(() => {
    dispatch(getAllPost());
  }, [dispatch]);

  return (
    <>
      <div
        className="masonary-search flex justify-center flex-col py-32 border-t-2 border-white/30"
        style={{
          background: `linear-gradient(90deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.4) 100%), url("${staticImages.hero}") center/cover no-repeat`,
        }}
      ></div>

      <div className="max-w-[1440px] mx-auto px-4">
        {filteredPosts?.length > 0 ? (
          <div className="mt-10 px-3">
            <h3 className="font-inter text-dark text-2xl font-semibold">
              Your &quot;{searchQuery}&quot; Photos
            </h3>
          </div>
        ) : (
          <div className="mt-10 px-3">
            <h3 className="font-inter text-dark text-2xl font-semibold mb-6">
              We couldn’t find anything for &quot;{searchQuery}&quot;
            </h3>
            <div className="flex gap-4 flex-wrap">
              <Link
                className="text-center px-4 h-[50px] min-w-[200px] items-center justify-center font-inter font-medium text-lg border-dark border-[2px] bg-dark text-white default-transition shadow rounded inline-flex tracking-[0.5px]"
                to="/"
              >
                Go To Home Page
              </Link>
              <Link
                className="text-center px-4 h-[50px] min-w-[200px] items-center justify-center font-inter font-semibold text-lg border-dark border-[2px] bg-white text-dark default-transition shadow rounded inline-flex tracking-[0.5px]"
                to="/search"
              >
                Search Page
              </Link>
            </div>
          </div>
        )}
        {isLoading && <Loader />}
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column sm:my-9 my-5"
        >
          {filteredPosts?.length > 0 ? (
            filteredPosts.map((item) => {
              return (
                <Link
                  to={`/search/${item?.slug}`}
                  key={item._id}
                  className="masonry-item hover:scale-[1.02] transition-all duration-200 relative group after:absolute after:top-0 after:left-0 after:w-full after:h-full after:bg-black/40 after:opacity-0 after:transition-all after:ease-in-out after:duration-300 hover:after:opacity-100"
                >
                  <img
                    src={
                      item?.assets?.length > 0 ? item?.assets[0].filePath : ""
                    }
                    alt=""
                  />
                  <div className="item-info opacity-0 group-hover:opacity-100 absolute bottom-[12px] left-[12px] transition-all duration-300 ease-in-out flex items-center justify-start z-10">
                    <div className="item-info-user w-[32px] h-[32px] rounded-full overflow-hidden me-3">
                      <img
                        src={
                          item?.user?.avatar.url
                            ? item?.user?.avatar?.url
                            : item?.user?.avatar
                        }
                        className="w-full h-full object-fit-cover"
                        alt="avatar"
                      />
                    </div>
                    <p className="font-medium text-white bg-black/20 px-3 py-1 rounded-full text-xs">
                      {item?.user?.name}
                    </p>
                  </div>
                </Link>
              );
            })
          ) : (
            <div></div>
          )}
        </Masonry>
      </div>
    </>
  );
};

HomeSearchContent.propTypes = {
  searchQuery: PropTypes.string,
};
