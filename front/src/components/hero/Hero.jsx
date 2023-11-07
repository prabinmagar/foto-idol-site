import { BsImageFill } from "react-icons/bs";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CustomNextArrow from "../common/arrow/CustomNextArrow";
import CustomPrevArrow from "../common/arrow/CustomPrevArrow";
import { staticImages } from "../../images";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo } from "react";
import { getAllhomeSlider } from "../../redux/slices/settings/homeSliderSlice";
import { selectUser } from "../../redux/slices/authSlice";
import { HOME_SETTING_OPT_ONE } from "../../utils/constants";

export const Hero = () => {
  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    slidesToShow: 1,
    autoplay: true,
    autoplaySpeed: 4000,
  };

  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const { contents } = useSelector((state) => state.homeSlider);
  const filteredBanner = useMemo(
    () => contents?.filter((content) => content.category === HOME_SETTING_OPT_ONE),
    [contents]
  );

  useEffect(() => {
    dispatch(getAllhomeSlider());
  }, [dispatch]);

  const heroBanners = [
    {
      id: "banner-1",
      image: staticImages.banner1,
      text: "Capturing Moments, Creating Memories: Let Us Tell Your Story",
    },
    {
      id: "banner-2",
      image: staticImages.banner2,
      text: "Framing Life's Beauty: Discover the Art of Photography",
    },
    {
      id: "banner-3",
      image: staticImages.banner3,
      text: "Elevate Your Visual Story: Where Imagination Meets the Lens",
    },
    {
      id: "banner-4",
      image: staticImages.banner4,
      text: "All your photo collection in one place.",
    },
  ];

  return (
    <div className="hero-banner-slider">
      <Slider
        nextArrow={<CustomNextArrow />}
        prevArrow={<CustomPrevArrow />}
        {...settings}
      >
        {contents?.length > 0
          ? filteredBanner?.map((banner) => {
              return (
                <div className="slider-item" key={banner?._id}>
                  <section
                    className="min-h-screen flex flex-col justify-center"
                    style={{
                      background: `linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.2)), url(${banner?.cover?.filePath}) center/cover no-repeat`,
                    }}
                  >
                    <div className="md:max-w-[1000px] mx-auto py-12 text-white text-center px-3">
                      <h2 className="xl:text-5xl sm:text-3xl text-2xl max-w-[280px] sm:max-w-[350px] md:max-w-[1000px] mx-auto font-bold font-inter mb-4 hero-text">
                        {banner?.title}
                      </h2>
                      <h4 className="md:text-xl sm:text-base text-sm mt-5 lg:mt-0">
                        {/* Explore your high-quality{" "}
                      <BsImageFill className="inline-flex ms-2" /> photos, all
                      in one place */}
                        {banner?.subtitle}
                      </h4>
                    </div>
                    {user?.isVerified ? (
                      <div className="flex flex-col items-center justify-center gap-4 sm:gap-6 py-4 border-b-[1px] border-dark/10 pb-12">
                        <p className="text-white opacity-90 text-base font-inter font-medium">
                          Explore every picture within our image archive.
                        </p>
                        <Link
                          to="/search"
                          className="bg-transparent rounded text-white  tracking-[1px] border-white border-[1px] hover:bg-white hover:text-dark py-2.5 px-4 uppercase shadow default-transition font-medium"
                        >
                          Explore all
                        </Link>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center gap-4 sm:gap-6 py-4 border-b-[1px] border-dark/10 pb-12">
                        <p className="text-white opacity-90 text-base font-inter font-medium">
                          Create an account to upload photos.
                        </p>
                        <Link
                          to="/auth/register"
                          className="bg-transparent rounded text-white  tracking-[1px] border-white border-[1px] hover:bg-white hover:text-dark py-2.5 px-4 uppercase shadow default-transition font-medium"
                        >
                          Sign up to upload
                        </Link>
                      </div>
                    )}
                  </section>
                </div>
              );
            })
          : heroBanners.map((banner) => {
              return (
                <div className="slider-item" key={banner.id}>
                  <section
                    className="min-h-screen flex flex-col justify-center"
                    style={{
                      background: `linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.2)), url(${banner.image}) center/cover no-repeat`,
                    }}
                  >
                    <div className="md:max-w-[1000px] mx-auto py-12 text-white text-center px-3">
                      <h2 className="xl:text-5xl sm:text-3xl text-2xl max-w-[280px] sm:max-w-[350px] md:max-w-[1000px] mx-auto font-bold font-inter mb-4 hero-text">
                        {banner.text}
                      </h2>
                      <h4 className="md:text-xl sm:text-base text-sm mt-5 lg:mt-0">
                        Explore your high-quality{" "}
                        <BsImageFill className="inline-flex ms-2" /> photos, all
                        in one place
                      </h4>
                    </div>
                    <div className="flex flex-col items-center justify-center gap-4 sm:gap-6 py-4 border-b-[1px] border-dark/10 pb-12">
                      <p className="text-white opacity-90 text-base font-inter font-medium">
                        Create an account to upload photos.
                      </p>
                      <Link
                        to="/auth/register"
                        className="bg-transparent rounded text-white  tracking-[1px] border-white border-[1px] hover:bg-white hover:text-dark py-2.5 px-4 uppercase shadow default-transition font-medium"
                      >
                        Sign up to upload
                      </Link>
                    </div>
                  </section>
                </div>
              );
            })}
      </Slider>
    </div>
  );
};
