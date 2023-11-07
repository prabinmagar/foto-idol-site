import PropTypes from "prop-types";
import { setModalClose } from "../../redux/slices/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import "react-image-gallery/styles/css/image-gallery.css";
import { staticImages } from "../../images";
import {
  AiFillCloseCircle,
} from "react-icons/ai";
import { useEffect } from "react";
import { getContactInfo } from "../../redux/slices/settings/SettingSlice";
import { getAllhomeSlider } from "../../redux/slices/settings/homeSliderSlice";
import { HOME_SETTING_OPT_TWO } from "../../utils/constants";

const Modal = () => {
  const dispatch = useDispatch();
  const contactInfo = useSelector(state => state.setting.contactinfo);
  const { contents } = useSelector((state) => state.homeSlider);
  const modal = contents?.filter((content) => content.category === HOME_SETTING_OPT_TWO);

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      dispatch(setModalClose());
    }
  };

  useEffect(() => {
    if(!contactInfo){
      dispatch(getContactInfo());
    }
    if (!modal) {
      dispatch(getAllhomeSlider());
    }
  }, [dispatch, contactInfo, modal]);

  return (
    <div className="fixed modal-overlay w-full h-full left-0 top-0 right-0 bottom-0 bg-black/80 z-50" onClick={handleOverlayClick}>
      <div className="preview-modal bg-white lg:max-w-[600px] max-w-[90vw] absolute top-1/2 -translate-y-1/2 left-1/2 h-auto max-h-[90vh] w-full -translate-x-1/2 z-50 rounded-lg overflow-x-hidden overflow-y-scroll scroll-y-dir flex flex-col items-center justify-between">
        <button
          type="button"
          className="absolute top-3 right-2 text-dark z-[100]"
          onClick={() => dispatch(setModalClose())}
        >
          <AiFillCloseCircle size={24} />
        </button>
        <div className="py-4">
          <img
            src={modal && modal[0]?.cover?.filePath}
            className="relative"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  handleClose: PropTypes.func,
};

export default Modal;


 // <div className="fixed modal-overlay w-full h-full left-0 top-0 right-0 bottom-0 bg-black/80 z-50" onClick={handleOverlayClick}>
    //   <div className="preview-modal bg-white lg:max-w-[600px] max-w-[90vw] absolute top-1/2 -translate-y-1/2 left-1/2 h-auto w-full -translate-x-1/2 z-50 rounded-lg overflow-hidden flex flex-col items-center justify-between">
    //     <button
    //       type="button"
    //       className="absolute top-3 right-2 text-dark z-[100]"
    //       onClick={() => dispatch(setModalClose())}
    //     >
    //       <AiFillCloseCircle size={24} />
    //     </button>
    //     <div className="py-4">
    //       <img
    //         src={modal && modal[0]?.cover?.filePath}
    //         className="max-w-[260px] relative"
    //         alt=""
    //       />
    //     </div>
    //     <div className="w-full z-10 relative bg-blue-gradient px-3 py-8 text-center text-white">
    //       <h2 className="text-4xl uppercase font-bold ">{modal && modal[0]?.title}</h2>
    //       <h3 className="leading-[1.3] font-inter font-bold  text-2xl p-3 border-b-[1px] border-white">
    //         {modal && modal[0]?.subtitle}
    //       </h3>
    //       <p className="font-inter mt-4">
    //         {
    //           modal && modal[0]?.description
    //         }
    //       </p>
    //       <h3 className="leading-[1.3] font-inter font-bold  text-2xl p-3 border-b-[1px] border-white">
    //         For Wedding & Event Photography
    //       </h3>
    //       <p className="font-inter mt-4">
    //         You can receive upto 40% discount as our special offers.
    //       </p>
    //       <div className="flex justify-center items-center mt-2">
    //         <AiFillPhone />
    //         <span className="ms-1 italic">{contactInfo?.phone}</span>
    //       </div>
    //       <div className="flex justify-center items-center mt-4">
    //         <a className="mx-[6px]" href="https://facebook.com">
    //           <AiFillFacebook size={23} />
    //         </a>
    //         <a className="mx-[6px]" href="https://facebook.com">
    //           <AiFillMail size={24} />
    //         </a>
    //         <a className="mx-[6px]" href="https://facebook.com">
    //           <AiFillInstagram size={24} />
    //         </a>
    //       </div>
    //     </div>
    //   </div>
    // </div>