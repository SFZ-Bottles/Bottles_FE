import { useState } from "react";
import styled from "styled-components";
import { deleteUserAccount } from "../../../services/API";
import Modal from "../../../components/Modal/Modal";
import { Button } from "../../../components/Button/Button";
import { FlexColumnCenterCSS } from "../../../style/commonStyle";
import CommonInput from "../../../components/Input/Input";

function WithdrawContent({
  setPageNum,
}: {
  setPageNum: (num: number) => void;
}) {
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const withdraw = async () => {
    const id = localStorage.getItem("id") || "";
    try {
      const response = await deleteUserAccount(id, password);
      if (response.status === 200) {
        console.log("회원 탈퇴가 완료되었습니다.");
        window.location.href = "/";
      }
    } catch {
      setErrorMessage("비밀번호가 잘못되었습니다.");
    }
  };

  return (
    <Modal onClose={() => setPageNum(1)}>
      <S.Container>
        <WithdrawTitle>정말로 탈퇴 하시겠습니까?</WithdrawTitle>
        <CommonInput
          type="password"
          placeholder="비밀번호를 입력하세요"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          $customStyle={{ width: "15rem", borderRadius: "10px" }}
        />
        <Button skin="red" round="very" size="standard" onClick={withdraw}>
          확인
        </Button>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </S.Container>
    </Modal>
  );
}

const S = {
  Container: styled.div`
    ${FlexColumnCenterCSS}
    gap: 1rem;
  `,
};

const WithdrawTitle = styled.h2`
  font-size: 20px;
  margin-bottom: 10px;
`;

const ErrorMessage = styled.div`
  color: red;
  margin-top: 10px;
`;

export default WithdrawContent;
