import React, { useState } from 'react';
import axios from "axios";
import styled from 'styled-components';
import CommonInput from '../../../components/Input/Input';
import { logout, deleteUserAccount } from "../../../services/API";

interface ConfirmModalProps {
  'data-show': boolean;
}

function WithdrawContent(){

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [password, setPassword]= useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const showModal = () => {
    setShowConfirmModal(true);
  };
  
  const hideModal = () => {
    setShowConfirmModal(false);
    setErrorMessage('');
  };

  const withdraw = async () => {
    const id = localStorage.getItem("id") || "";
    try {
      const response = await deleteUserAccount(id, password);
      if (response.status === 200) {
        console.log('회원 탈퇴가 완료되었습니다.');
        setShowConfirmModal(false);
        window.location.href = '/'; 
      } 
    } catch{
        setErrorMessage('비밀번호가 잘못되었습니다.');
      }
    }

  return (
    <Container>
      
      <Button onClick={showModal}>회원 탈퇴</Button>

      <ConfirmModal data-show={showConfirmModal}>
        <ModalTitle>정말로 탈퇴 하시겠습니까?</ModalTitle>
        <PasswordInput
          type="password"
          placeholder="비밀번호를 입력하세요"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <ModalButton onClick={withdraw}>확인</ModalButton>
        <ModalButton onClick={hideModal}>취소</ModalButton>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </ConfirmModal>
    </Container>
  );
}


const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  text-align: center;
  align-items: center; // 중앙 정렬을 위해 추가
`;


const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: #3498db;
  color: #fff;
  border: none;
  cursor: pointer;
`;



const ConfirmModal = styled.div<ConfirmModalProps>`
  display: ${(props) => (props['data-show'] ? 'block' : 'none')};
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  background-color: #fff;
  border: 1px solid #ccc;
  z-index: 999;
  text-align: center;
`;

const ModalTitle = styled.h2`
  font-size: 20px;
  margin-bottom: 10px;
`;

const ModalButton = styled.button`
  padding: 10px 20px;
  margin-top: 10px;
  font-size: 16px;
  background-color: #e74c3c;
  color: #fff;
  border: none;
  cursor: pointer;
`;

const PasswordInput = styled.input`
  padding: 8px;
  margin-bottom: 10px;
  font-size: 16px;
`;

const ErrorMessage = styled.div`
  color: red;
  margin-top: 10px;
  
`;


export default WithdrawContent;