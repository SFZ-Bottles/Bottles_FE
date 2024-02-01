import { styled } from "styled-components";
import { changeInfo } from "../../services/API";
import { useState } from "react";
import { FlexCenterCSS, FlexColumnCenterCSS } from "../../style/commonStyle";
import CommonInput from "../Input/Input";
import InfoApi from "../../services/infoApi";
import AuthService from "../../utils/authService";
import { Button } from "../Button/Button";

export interface IEdit {
  id: string;
  info: string;
  email: string;
  name: string;
  avatar: string;
}

function EditModal({ editData, setUserData, onClose }: any) {
  const [inputData, setInputData] = useState("");
  const onClick = async (editData: string) => {
    try {
      const changedInfo = await changeInfo(editData, inputData);

      AuthService.setTokenAndId(changedInfo.token, changedInfo.id);
      const { data } = await InfoApi.getInfo(changedInfo.id);
      setUserData(data);

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
        $customStyle={{ width: "20rem", height: "2rem" }}
      />
      <Button round="very" skin="gray" onClick={() => onClick(editData)}>
        확인
      </Button>
    </S.Container>
  );
}

const S = {
  Container: styled.div`
    ${FlexColumnCenterCSS}
    min-width: 20rem;
    height: 15rem;
    gap: 10%;
    border-radius: 8px;
    font-size: 2rem;
    color: black;

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
