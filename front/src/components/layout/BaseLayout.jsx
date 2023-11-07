import ScrollPopup from "../common/ScrollPopup";
import { Footer } from "../footer/Footer";
import { Header } from "../header/Header";
import PropTypes from "prop-types";
import { Outlet } from "react-router-dom";
import ScrollTopButton from "../common/ScrollTopButton";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectIsModalOpen } from "../../redux/slices/modalSlice";
import Modal from "../common/Modal";

export const BaseLayout = () => {
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
      <main>
        <Outlet />
      </main>
      <Footer />
      <ScrollTopButton showScrollTop={showScrollTop} />
      {/* {isModalOpen && <Modal />} */}
      <ScrollPopup />
    </>
  );
};

BaseLayout.propTypes = {
  children: PropTypes.any,
};
