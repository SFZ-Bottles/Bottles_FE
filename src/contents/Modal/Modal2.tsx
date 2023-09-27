import React, { useState } from 'react';
import styled from 'styled-components';

const Modal2 = ({ onClose, children }: any) => {
  const [right, setRight] = useState(false);
  const arrowClick = (e: any) => {
    setRight((prev) => !prev);
    e.stopPropagation();
  }
  return (
    <S.ModalOverlay onClick={onClose}>
      <S.LeftModalContent onClick={(e) => e.stopPropagation()}>
        {children.left}
      </S.LeftModalContent>
      {children.right && right ?
      <S.RightModalContent onClick={(e) => e.stopPropagation()}>
        {children.right}
      </S.RightModalContent>
      : <React.Fragment/>
    }
    <S.ArrowButton src='/img/Arrow.svg'
    onClick={(e) => arrowClick(e)}
    right={right}/>
      <S.Xbutton>x</S.Xbutton>
    </S.ModalOverlay>
  );
};

const S = {
  ModalOverlay: styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  height: 100%;
  `,

  LeftModalContent: styled.div`
  position: fixed;
  top: 50%;
  left: 30%; 
  height: 80%;
  width: 35vw;
  transform: translate(-25%, -50%);
  background-color: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 3;
  `,

  RightModalContent: styled.div`
  position: fixed;
  top: 50%;
  right: 30%;
  width: 25vw;
  height: 80%;
  transform: translate(50%, -50%);
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 3;
  `,

  Xbutton: styled.div`
    display: flex;
    position: absolute;
    right: 0;
    top: 3rem;
    font-size: 5rem;
    width: 100px;
    height: 100px;
    cursor: pointer;
    color: ${props => props.theme.color.fontColor};
  `,

  ArrowButton: styled.img<{right: boolean}>`
  display: flex;
  position: absolute;
  top: 50%;
  right: ${props => props.right ? '10%' : '35%'};
  transform: rotate(${props => props.right ? '180deg' : '0deg'});
  width: 5rem;
  height: 5rem;
  cursor: pointer;
  fill: ${props => props.theme.color.fontColor};
`
}

export default Modal2;
