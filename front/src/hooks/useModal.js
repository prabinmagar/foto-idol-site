import { useState } from "react";

const useModal = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState("");

  const openModal = (src) => {
    setImageSrc(src);
    setModalOpen(true);
  };

  const closeModal = () => {
    setImageSrc("");
    setModalOpen(false);
  };

  return {
    modalOpen,
    imageSrc,
    openModal,
    closeModal,
  };
};

export default useModal;
