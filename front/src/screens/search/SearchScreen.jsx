import { useEffect, useRef } from "react";
import { staticImages } from "../../images";
import Masonry from "react-masonry-css";
import { useDispatch, useSelector } from "react-redux";
import { BsSearch } from "react-icons/bs";
import { Link } from "react-router-dom";
import { selectAllPosts } from "../../redux/slices/postsSlice";
import { getAllPost } from "../../redux/slices/postsSlice";
import Loader from "../../components/common/Loader";
import { scrollToTop } from "../../utils/scrollToTop";
import { useState } from "react";
import { getallCategory } from "../../redux/slices/categorySlice";

export const SearchScreen = () => {
  useEffect(() => {
    scrollToTop();
  }, []);
  return (
    <div
      style={{
        minHeight: "calc(100vh - 270px)",
      }}
    >
      <SearchContent />
    </div>
  );
};

export const SearchContent = () => {
  const breakpointColumnsObj = {
    default: 6,
    1100: 4,
    700: 3,
    500: 2,
  };

  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts);
  const categories = useSelector((state) => state.category.categorys.categorys);
  const isLoading = useSelector((state) => state.posts.isLoading);
  const [searchQuery, setSearchQuery] = useState("");
  const [showCategorySearch, setShowCategorySearch] = useState(false);
  const categorySearchRef = useRef(null);

  useEffect(() => {
    dispatch(getAllPost());
    dispatch(getallCategory());
  }, [dispatch]);

  const filteredPosts = posts?.filter((post) => {
    const titleMatch = post.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const usernameMatch = post.user.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return titleMatch || usernameMatch;
  });

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(e.target.search.value);
  };

  const handleCategorySearchVisibility = () => {
    setShowCategorySearch(true);
  };

  useEffect(() => {
    const handleSearchClickOutside = (event) => {
      if (
        categorySearchRef.current &&
        !categorySearchRef.current.contains(event.target) &&
        event.target.name !== "search"
      ) {
        setShowCategorySearch(false);
      }
    };

    window.addEventListener("click", handleSearchClickOutside);
    return () => {
      window.removeEventListener("click", handleSearchClickOutside);
    };
  }, []);

  return (
    <>
      <div
        className="masonary-search flex justify-center flex-col py-32 border-t-2 border-white/30"
        style={{
          background: `linear-gradient(90deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.4) 100%), url("${staticImages.hero}") center/cover no-repeat`,
        }}
      >
        <div className="containers flex-col">
          <h4 className="text-center md:text-base text-sm max-w-[780px] mx-auto font-inter  text-white">
            Explore our photo gallery, a visual journey through moments frozen
            in time.
          </h4>
          <form
            className="flex justify-center items-center border-[1px] border-black/5 w-full max-w-[700px] mx-auto px-6 md:h-[56px] sm:h-[52px] h-[48px] shadow-md shadow-dark/5 rounded font-inter placeholder:opacity-70 mt-4 bg-white relative"
            onSubmit={handleSearch}
          >
            <input
              type="text"
              className="outline-none w-full"
              placeholder="Search photos here by title or author"
              name="search"
              onFocus={handleCategorySearchVisibility}
            />
            <button
              type="submit"
              className="h-[40px] inline-flex items-center justify-center text-xl text-rich-black/50"
            >
              <BsSearch />
            </button>

            <div
              className={`absolute bg-white top-full left-0 w-full  mt-2 shadow-md shadow-dark/5 rounded border-[1px] border-black/5 px-6 py-4 z-50 h-[400px] overflow-y-scroll scrollbar-y-dir ${
                showCategorySearch ? "block" : "hidden"
              }`}
              ref={categorySearchRef}
            >
              <h3 className="text-dark/90 font-inter font-medium text-lg mb-3">
                Show Categories Photos
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {categories?.length > 0 ? (
                  categories?.map((category) => {
                    return (
                      <Link
                        key={category?._id}
                        className="flex items-center gap-3 border-[1px] border-dark/10 rounded px-2 py-1.5 hover:bg-dark hover:text-white default-transition group"
                        to={`/category/${category?._id}`}
                      >
                        <div className="lg:w-[40px] lg:h-[40px] w-[30px] h-[30px] rounded-full overflow-hidden border-[1px] border-white">
                          <img
                            src={category?.cover?.filePath}
                            alt={category?.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="text-gray-800 group-hover:text-white">
                          {category?.title}
                        </span>
                      </Link>
                    );
                  })
                ) : (
                  <div>Categories are not available.</div>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="max-w-[1440px] mx-auto px-4">
        {filteredPosts?.length > 0 ? (
          <div className="mt-10 px-3">
            <h3 className="font-inter text-dark text-2xl font-semibold">
              {searchQuery ? (
                <span>Search results for &quot;{searchQuery}&quot;</span>
              ) : (
                <div>
                  Get The Glimpse Of{" "}
                  <span className="font-bold text-[1.6rem] text-moonstone">
                    {" "}
                    All Photos
                  </span>
                </div>
              )}
            </h3>
          </div>
        ) : (
          <div className="mt-10 px-3">
            <h3 className="font-inter text-dark text-2xl font-semibold mb-6">
              We couldn’t find anything for you.
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
                    <div className="item-info-user w-[32px] h-[32px] rounded-full overflow-hidden me-2">
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
                    <p className="font-medium text-white bg-black/20 px-2 py-1 rounded-full text-xs">
                      {item?.user?.name}
                    </p>
                  </div>
                </Link>
              );
            })
          ) : (
            <p></p>
          )}
        </Masonry>
      </div>
    </>
  );
};
