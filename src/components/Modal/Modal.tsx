import { ModalData } from "../../hooks/useModal";
import "./Modal.css";

interface IModal {
  isOpen: boolean;
  modalData: ModalData | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
}

export const Modal = ({
  isOpen,
  modalData,
  onClose,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
}: IModal): JSX.Element | null => {
  if (!isOpen || !modalData) return null;

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-image-container">
        <button
          className="modal-prev"
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          disabled={!hasPrev}
        >
          {"<"}
        </button>
        <img
          className="modal-image"
          src={modalData.imageUrl}
          alt={modalData.name}
          onClick={(e) => e.stopPropagation()}
        />
        <button
          className="modal-next"
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          disabled={!hasNext}
        >
          {">"}
        </button>
      </div>
      <p className="modal-name">{modalData.name}</p>
    </div>
  );
};
