import { Outlet } from "react-router-dom";
import { Footer } from "../footer/Footer";
import { Header } from "../header/Header";
import PropTypes from "prop-types";
import ScrollTopButton from "../common/ScrollTopButton";
import { useEffect, useState } from "react";
import ScrollPopup from "../common/ScrollPopup";
import Modal from "../common/Modal";
import { useSelector } from "react-redux";
import { selectIsModalOpen } from "../../redux/slices/modalSlice";

export const SearchLayout = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const isModalOpen = useSelector(selectIsModalOpen);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <Header />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <Footer />
      <ScrollTopButton showScrollTop={showScrollTop} />
      {/* {isModalOpen && <Modal />} */}
      <ScrollPopup />
    </>
  );
};

SearchLayout.propTypes = {
  children: PropTypes.any,
};
