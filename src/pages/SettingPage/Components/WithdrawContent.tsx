import React, { useState } from 'react';
import styled from 'styled-components';
import { deleteUserAccount } from "../../../services/API";

function WithdrawContent(){

  const [password, setPassword]= useState('');
  const [errorMessage, setErrorMessage] = useState('');


  const withdraw = async () => {
    const id = localStorage.getItem("id") || "";
    try {
      const response = await deleteUserAccount(id, password);
      if (response.status === 200) {
        console.log('회원 탈퇴가 완료되었습니다.');
        window.location.href = '/'; 
      } 
    } catch{
        setErrorMessage('비밀번호가 잘못되었습니다.');
      }
    }

  return (
    <Container>
        <WithdrawTitle>정말로 탈퇴 하시겠습니까?</WithdrawTitle>
        <PasswordInput
          type="password"
          placeholder="비밀번호를 입력하세요"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <WithdrawButton onClick={withdraw}>확인</WithdrawButton>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>} 
    </Container>
  );
}


const Container = styled.div`
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

const WithdrawTitle = styled.h2`
  font-size: 20px;
  margin-bottom: 10px;
`;

const WithdrawButton = styled.button`
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