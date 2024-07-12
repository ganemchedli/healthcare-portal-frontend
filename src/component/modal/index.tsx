// ModalComponent.tsx
import React from "react";
import Modal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
// import "./index.css";

interface ModalComponentProps {
  isOpen: boolean;
  onRequestClose: () => void;
  children: React.ReactNode;
}

const ModalComponent: React.FC<ModalComponentProps> = ({
  isOpen,
  onRequestClose,
  children,
}) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <div>
        <div className="text-end">
          <button onClick={onRequestClose}>
            <span>
              <FontAwesomeIcon icon={faXmark} />
            </span>
          </button>
        </div>
        {children}
      </div>
    </Modal>
  );
};

export default ModalComponent;
