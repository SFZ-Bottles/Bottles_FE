import React from "react";
import CommonInput from "../../components/Input/Input";
import styled from "styled-components";
import { media } from "../../style/theme";

function ModalInput({ P, inputInfo }: any) {
  return (
    <React.Fragment>
      <S.Form>
        <S.InputDiv>
          <span>{inputInfo?.title}</span>
          <CommonInput
            placeholder={inputInfo?.title}
            type="text"
            value={P?.value?.title}
            onChange={(e: any) => P.set({ ...P.value, title: e.target.value })}
            name={""}
          />
        </S.InputDiv>
        <S.InputDiv>
          <span>{inputInfo?.preface}</span>
          <CommonInput
            type="text"
            placeholder={inputInfo?.preface}
            value={P?.value.preface}
            onChange={(e: any) =>
              P.set({ ...P?.value, preface: e.target.value })
            }
            name={""}
            $customStyle={{ width: "17rem" }}
          />
        </S.InputDiv>
      </S.Form>
    </React.Fragment>
  );
}

const S = {
  Form: styled.form`
    display: flex;
    flex-direction: column;
  `,
  InputDiv: styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    width: 17rem;
    & > p {
      font-size: 1.5rem;
    }

    & > span {
      font-size: 3rem;
      font-weight: 700;
      padding: 1rem 1rem;

      @media screen and (max-width: ${media.mobile}) {
        font-size: 8vw;
      }
    }
  `,
};

export default ModalInput;
