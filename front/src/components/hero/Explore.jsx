import { AiOutlineLike, AiOutlineSearch, AiOutlineStar } from "react-icons/ai";
import { BsArrowRepeat } from "react-icons/bs";
import PropTypes from "prop-types";
import CustomNextArrow from "../common/arrow/CustomNextArrow";
import CustomPrevArrow from "../common/arrow/CustomPrevArrow";
import Slider from "react-slick";
import Masonry from "react-masonry-css";
import { Link } from "react-router-dom";
import { staticImages } from "../../images";
import { CardSlanted } from "../common/CardSlanted";
import ContactInfo from "../common/ContactInfo";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo } from "react";
import { getAllPost, selectAllPosts } from "../../redux/slices/postsSlice";
import Loader from "../common/Loader";
import { getallCategory } from "../../redux/slices/categorySlice";
import { Typography } from "@material-tailwind/react";
import {
  getFeaturedCategoriesLists,
  getFeaturesLists,
} from "../../redux/slices/settings/SettingSlice";
import { format } from "date-fns";
import {
  FEATURED_CATEGORY_REQ_LIMIT,
  HOME_SETTING_OPT_THREE,
} from "../../utils/constants";
import { getAllhomeSlider } from "../../redux/slices/settings/homeSliderSlice";

export const Explore = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts);
  const categories = useSelector((state) => state.category.categorys.categorys);
  const featuredCategories = useSelector(
    (state) => state.setting.featuredCategories
  );

  const exploreGridOneCardClasses = [
    "xl:col-span-2 row-span-2 md:col-span-3 col-span-4 h-[500px]",
    "md:col-span-1 col-span-2 h-[240px]",
    "md:col-span-1 col-span-2 h-[240px]",
    "xl:col-span-1 col-span-2 h-[240px]",
    "xl:col-span-1 col-span-2 h-[240px]",
    "col-span-2 md:col-span-1 h-[240px]",
    "col-span-2 md:col-span-1 h-[240px]",
    "col-span-2 md:col-span-1 h-[240px]",
    "col-span-2 md:col-span-1 h-[240px]",
  ];

  useEffect(() => {
    dispatch(getallCategory());
    dispatch(getAllPost());
    dispatch(getFeaturedCategoriesLists());
  }, [dispatch]);

  return (
    <>
      <section className="py-12" id="top-picks">
        <div className="containers">
          <div className="section-title">
            <h2 className="font-inter text-center font-bold">
              <span className="text-new-blue font-semibold leading-loose text-moonstone">
                View
              </span>{" "}
              Top Category Picks
            </h2>
            <p className="text-center text-base text-dark/80 opacity-70">
              Featuring the month&apos;s most exceptional photos by category
              from our iconic photo archive.
            </p>
          </div>

          {featuredCategories &&
          featuredCategories[0]?.itemCount === FEATURED_CATEGORY_REQ_LIMIT ? (
            <div className="grid explore-grid-one grid-cols-4 grid-rows-3 xxl:gap-4 md:gap-2 gap-1  mt-12">
              {featuredCategories[0].items?.map((category, index) => {
                return (
                  <Card
                    key={category?._id}
                    title={category?.title}
                    image={category?.cover?.filePath}
                    categoryId={category?._id}
                    gridClass={`${exploreGridOneCardClasses[index]}`}
                  />
                );
              })}
            </div>
          ) : (
            <>
              {categories?.length > 0 && (
                <div className="grid explore-grid-one grid-cols-4 grid-rows-3 xxl:gap-4 md:gap-2 gap-1  mt-12">
                  {categories?.slice(0, 9)?.map((category, index) => {
                    return (
                      <Card
                        key={category?._id}
                        title={category?.title}
                        image={category?.cover?.filePath}
                        categoryId={category?._id}
                        gridClass={`${exploreGridOneCardClasses[index]}`}
                      />
                    );
                  })}
                </div>
              )}
            </>
          )}
        </div>
      </section>
      {/* <ExploreOne categories={categories} /> */}
      <ExploreOne posts={posts} />
      <Features />
      <ViewSlider />
      <ExploreTwo />
      <ContactInfo />
    </>
  );
};

export const ExploreOne = ({ posts }) => {
  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    centerMode: true,
    variableWidth: true,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <section className="py-12" id="categories">
      <div className="containers pb-6">
        <div className="section-title text-start">
          <h2 className="font-inter font-bold">
            <span className="text-new-blue font-semibold leading-loose text-moonstone">
              Colourful
            </span>{" "}
            photo albums of your pick
          </h2>
          <p className="text-base text-dark/80 opacity-70">
            Get the glimpse of the precious moments under the same bundle.
          </p>
        </div>

        {posts?.length > 0 && (
          <div className="mt-8">
            <Slider
              nextArrow={<CustomNextArrow />}
              prevArrow={<CustomPrevArrow />}
              {...settings}
            >
              {posts.map((post) => {
                if (post?.assets && post?.assets[0]?.filePath) {
                  return (
                    <CardSlanted
                      key={post?._id}
                      title={post?.title}
                      image={post?.assets[0]?.filePath}
                      styles="rounded-xl"
                      postSlug={post?.slug}
                    />
                  );
                }
              })}
            </Slider>
          </div>
        )}
      </div>
    </section>
  );
};

ExploreOne.propTypes = {
  posts: PropTypes.any,
};

export const Features = () => {
  const dispatch = useDispatch();
  const { contents } = useSelector((state) => state.homeSlider);
  const filteredCreatives = useMemo(
    () =>
      contents?.filter(
        (content) => content.category === HOME_SETTING_OPT_THREE
      ),
    [contents]
  );

  useEffect(() => {
    dispatch(getAllhomeSlider());
  }, [dispatch]);

  const cardIcons = [
    <AiOutlineStar size={30} key={"ai-star"} />,
    <AiOutlineLike size={30} key={"ai-like"} />,
    <AiOutlineSearch size={30} key={"ai-search"} />,
    <BsArrowRepeat size={30} key={"bs-arrow"} />,
  ];

  return (
    <section
      className="py-16"
      id="pricing"
      style={{
        background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("${staticImages.blue_banner}") center/cover no-repeat fixed`,
      }}
    >
      <div className="containers">
        <div className="section-title text-center">
          <h2 className="font-inter font-bold text-white">
            Your one-stop{" "}
            <span className="text-new-blue font-semibold leading-loose text-moonstone">
              platform
            </span>{" "}
            for photographers and creative enthusiasts like you.
          </h2>
          <p className="text-base text-white/80 opacity-70">
            We keep the perfect collection the photos that you upload.
          </p>
        </div>

        {filteredCreatives?.length > 0 && (
          <div className="grid lg:grid-cols-2 lg:gap-10 gap-6 pt-14 pb-6">
            {filteredCreatives.map((creative, index) => {
              return (
                <Card1
                  key={creative?._id}
                  icon={cardIcons[index]}
                  title={creative?.title}
                  desc={creative.description}
                />
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export const Card = ({ title, image, styles, show, gridClass, categoryId }) => {
  return (
    <Link
      to={`/category/${categoryId}`}
      className={`card shadow rounded overflow-hidden relative ${gridClass} overlay-black-gradient group block`}
    >
      <img
        src={image}
        alt="title"
        className={`w-full h-full object-cover block group-hover:scale-110 group-hover:rotate-6 default-transition`}
      />
      <h2 className="capitalize font-medium mt-5 text-white absolute bottom-0 lg:m-5 m-3 z-30 font-inter">
        {title}
      </h2>
      {show && (
        <div
          className={`${styles} overlay absolute top-0 w-full bg-gray-400 rotate-6 -z-10`}
        ></div>
      )}
    </Link>
  );
};

Card.propTypes = {
  title: PropTypes.any,
  image: PropTypes.any,
  styles: PropTypes.any,
  show: PropTypes.any,
  gridClass: PropTypes.string,
  categoryId: PropTypes.any,
};

export const Card1 = ({ title, icon, desc }) => {
  return (
    <div className="box flex gap-7">
      <div className="icon flex items-center justify-center text-white bg-moonstone default-shadow rounded-full w-[72px] min-w-[72px] h-[72px]">
        {icon}
      </div>
      <div className="details">
        <h3 className="text-xl font-semibold mb-2 font-inter text-white">
          {" "}
          {title}
        </h3>
        <p className="text-base text-black/50 border-[1px] border-moonstone/20 bg-white/95 py-5 px-6 rounded-lg default-shadow hover:-mt-1 default-transition">
          {desc}{" "}
        </p>
      </div>
    </div>
  );
};

Card1.propTypes = {
  title: PropTypes.any,
  icon: PropTypes.any,
  desc: PropTypes.any,
};

export const ExploreTwo = () => {
  const breakpointColumnsObj = {
    default: 5,
    1100: 4,
    700: 3,
    500: 2,
  };

  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts);
  const isLoading = useSelector((state) => state.posts.isLoading);

  useEffect(() => {
    dispatch(getAllPost());
  }, [dispatch]);

  return (
    <>
      <section className="bg-gray-50 py-12">
        <div className="containers">
          <div className="section-title">
            <h2 className="font-inter text-center font-bold mb-3">
              View Recent uploads from our community
            </h2>
            <p className="text-center text-base text-black opacity-70">
              See the recent pictures that reflect the memories of our community
              users.
            </p>
          </div>
          {isLoading && <Loader />}
          <div className="mt-6 masonry-wrapper">
            <Masonry
              breakpointCols={breakpointColumnsObj}
              className="my-masonry-grid"
              columnClassName="my-masonry-grid_column sm:my-9 my-5"
            >
              {posts?.length > 0 &&
                posts?.slice(0, 18).map((item) => {
                  return (
                    <Link
                      to={`/search/${item?.slug}`}
                      key={item._id}
                      className="masonry-item hover:scale-[1.02] transition-all duration-200 relative group after:absolute after:top-0 after:left-0 after:w-full after:h-full after:bg-black/40 after:opacity-0 after:transition-all after:ease-in-out after:duration-300 hover:after:opacity-100"
                    >
                      <img
                        src={
                          item?.assets?.length > 0
                            ? item?.assets[0].filePath
                            : ""
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
                        <p className="font-medium text-white bg-black/20 px-3 py-1 rounded-full text-xs capitalize">
                          {item?.user?.name}
                        </p>
                      </div>
                    </Link>
                  );
                })}
            </Masonry>
          </div>
          {posts?.length === 0 && (
            <Typography
              variant="h6"
              color="blue-gray"
              className="mb-6 text-center"
            >
              No any images found!
            </Typography>
          )}
          <div className="flex items-center justify-center">
            <Link
              className="text-center h-[52px] min-w-[180px] flex items-center justify-center font-inter font-semibold text-lg border-dark border-[1px] bg-dark text-white default-transition shadow-lg rounded"
              to="/search"
            >
              Explore All
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export const PhotoCard = ({ image }) => {
  return (
    <div className="">
      <img src={image} alt="" />
    </div>
  );
};

PhotoCard.propTypes = {
  image: PropTypes.any,
};

export const ViewSlider = () => {
  const dispatch = useDispatch();
  const features = useSelector((state) => state.setting.features);
  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
  };

  useEffect(() => {
    dispatch(getFeaturesLists());
  }, [dispatch]);

  return (
    <section className="py-4 view-slider-sc px-4" id="best-picture">
      <div className="containers">
        <div className="border-3 overflow-hidden xl:h-[580px] lg:h-[540px] md:h-[480px] h-[400px] relative">
          <Slider
            nextArrow={<CustomNextArrow />}
            prevArrow={<CustomPrevArrow />}
            {...settings}
          >
            {features &&
              features[0]?.items?.map((feature) => {
                return (
                  <div
                    key={feature?._id}
                    className="xl:h-[580px] lg:h-[540px] md:h-[480px] h-[400px] overflow-hidden relative outline-none"
                  >
                    <img
                      src={feature?.assets && feature?.assets[0]?.filePath}
                      className="object-fit-cover"
                      alt=""
                    />
                    <div className="absolute top-5 lg:max-w-[360px] max-w-[260px] px-4 py-5 left-5 bg-white/90 right-5 default-shadow rounded">
                      <p className="font-inter text-sm opacity-60">
                        By{" "}
                        <span className="capitalize break-all">
                          {feature?.user?.name}
                        </span>{" "}
                        -{" "}
                        {feature?.createdAt &&
                          format(new Date(feature?.createdAt), "do MMMM, yyyy")}
                      </p>
                      <p className="mt-1 font-semibold font-inter text-dark break-all">
                        {feature?.title}
                      </p>
                    </div>
                  </div>
                );
              })}
          </Slider>
        </div>
      </div>
    </section>
  );
};
