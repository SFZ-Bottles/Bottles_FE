import React from "react";
import * as S from "./Modal.styles";

interface Props {
  onClose: () => void;
  children: React.ReactNode;
  padding?: number;
}

const Modal = ({ onClose, children, padding = 20 }: Props) => {
  return (
    <S.ModalOverlay onClick={onClose}>
      <S.ModalContent padding={padding} onClick={(e) => e.stopPropagation()}>
        {children}
      </S.ModalContent>
    </S.ModalOverlay>
  );
};

export default Modal;
