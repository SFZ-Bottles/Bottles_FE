import React from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
`;

const LeftModalContent = styled.div`
  position: fixed;
  top: 50%;
  left: 30%; /* Adjust this value */
  height: 80%;
  width: 35vw;
  transform: translate(-25%, -50%);
  background-color: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 3;
`;

const RightModalContent = styled.div`
  position: fixed;
  top: 50%;
  right: 30%; /* Adjust this value */
  width: 25vw;
  height: 80%;
  transform: translate(50%, -50%);
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 3;
`;

const Modal2 = ({ onClose, children }: any) => {
    return (
    <ModalOverlay onClick={onClose}>
      <LeftModalContent onClick={(e) => e.stopPropagation()}>
        {children.left}
      </LeftModalContent>
      {children.right ?
      <RightModalContent onClick={(e) => e.stopPropagation()}>
        {children.right}
      </RightModalContent>
      : null
      }
    </ModalOverlay>
  );
};

export default Modal2;
