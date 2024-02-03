import { styled } from "styled-components";
import { changeInfo } from "../../services/API";
import { useEffect } from "react";
import { FlexColumnCenterCSS } from "../../style/commonStyle";
import InfoApi from "../../services/infoApi";
import AuthService from "../../utils/authService";
import { Button } from "../Button/Button";
import { useForm } from "react-hook-form";
import {
  emailValidation,
  idValidation,
  nameValidation,
} from "../../utils/validation";

export interface IEdit {
  id: string;
  info: string;
  email: string;
  name: string;
  avatar: string;
}

function EditModal({ editData, setUserData, onClose }: any) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors,
    setError,
  } = useForm();

  useEffect(() => {
    setValue("inputData", "");
    clearErrors("inputData");
  }, [editData, setValue, clearErrors]);

  const onSubmit = async (data: any) => {
    try {
      const changedInfo = await changeInfo(editData, data.inputData);
      AuthService.setTokenAndId(changedInfo.token, changedInfo.id);
      const { data: userInfo } = await InfoApi.getInfo(changedInfo.id);
      setUserData(userInfo);
      onClose();
    } catch (error: any) {
      setError("inputData", {
        type: "manual",
        message: "불가능한 변경입니다.",
      });
    }
  };

  const getValidationRules = () => {
    switch (editData) {
      case "id":
        return idValidation("Available!");
      case "name":
        return nameValidation();
      case "email":
        return emailValidation();
      default:
        return {};
    }
  };

  return (
    <S.Container>
      <div>{editData}</div>
      <S.FormWrapper>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input type="text" {...register("inputData", getValidationRules())} />
          <>{errors.inputData?.message && errors.inputData?.message}</>
          <Button round="very" skin="gray" size="standard">
            확인
          </Button>
        </form>
      </S.FormWrapper>
    </S.Container>
  );
}

const S = {
  Container: styled.div`
    ${FlexColumnCenterCSS}
    min-width: 20rem;
    height: 15rem;
    gap: 10%;
    font-size: 2rem;
  `,

  FormWrapper: styled.div`
    form {
      ${FlexColumnCenterCSS};
      gap: 1rem;
      font-size: 15px;
      color: red;
      :first-child {
        width: 18rem;
        height: 2rem;
        color: black;
        font-size: 1rem;
      }
    }
    input {
      border-radius: 10px;
      color: black;
      font-size: 1rem;
    }
  `,
};

export default EditModal;
