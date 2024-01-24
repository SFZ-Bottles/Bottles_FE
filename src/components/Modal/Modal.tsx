import React from "react";
import * as S from "./Modal.styles";

interface Props {
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = ({ onClose, children }: Props) => {
  return (
    <S.ModalOverlay onClick={onClose}>
      <S.ModalContent onClick={(e) => e.stopPropagation()}>
        {children}
      </S.ModalContent>
    </S.ModalOverlay>
  );
};

export default Modal;
