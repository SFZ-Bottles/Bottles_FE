import { styled } from "styled-components";
import { changeInfo } from "../../services/API";
import { useState } from "react";
import {
  FlexCenterCSS,
  FlexColumnCenterCss,
} from "../../styled-components/commonStyle";
import CommonInput from "../Input/Input";

export interface IEdit {
  id: string;
  info: string;
  email: string;
  name: string;
  avatar: string;
}

function EditModal({ editData, userData, setUserData, onClose }: any) {
  const [inputData, setInputData] = useState("");
  const onClick = async (editData: string) => {
    try {
      await changeInfo({ ...userData, [editData]: inputData });
      setUserData({ ...userData, [editData]: inputData });
      onClose(null);
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <S.Container>
      {editData}
      <CommonInput
        type="text"
        name="inputData"
        value={inputData}
        onChange={(e) => setInputData(e.target.value)}
        customStyle={{ width: "20rem", height: "2rem" }}
      />
      <button onClick={() => onClick(editData)}>확인</button>
    </S.Container>
  );
}

const S = {
  Container: styled.div`
    ${FlexColumnCenterCss}
    width: 30rem;
    height: 15rem;
    gap: 10%;
    border-radius: 8px;
    font-size: 2rem;

    & > button {
      ${FlexCenterCSS}
      border-radius: 1rem;
      background-color: #d9d9d9;
      width: 20%;
      height: 13%;
      font-size: 1rem;
    }
  `,
};

export default EditModal;
