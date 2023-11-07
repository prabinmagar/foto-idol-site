import PropTypes from "prop-types";
import { AiOutlineClose } from 'react-icons/ai';

const ImageViewer = ({ src, onClose }) => {
  return (
    <div className="image-view-modal">
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>
          <AiOutlineClose size = { 18 } />
        </span>
        <img src={src} alt="Image" />
      </div>
    </div>
  );
};

export default ImageViewer;
ImageViewer.propTypes = {
  src: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
