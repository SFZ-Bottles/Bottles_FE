import React from "react";
import {
  C_FlexBox,
  Form,
  Input,
  InputDiv,
  Span,
} from "../../style/styled_LogIn";

function ModalInput({ P, inputInfo }: any) {
  return (
    <React.Fragment>
      <Form>
        <InputDiv>
          <Span>{inputInfo?.title}</Span>
          <Input
            type="text"
            color="default"
            placeholder={inputInfo?.title}
            value={P?.value?.title}
            onChange={(e: any) => P.set({ ...P.value, title: e.target.value })}
            required
          />
        </InputDiv>
        <InputDiv>
          <Span>{inputInfo?.preface}</Span>
          <Input
            color="default"
            type="text"
            placeholder={inputInfo?.preface}
            value={P?.value.preface}
            onChange={(e: any) =>
              P.set({ ...P?.value, preface: e.target.value })
            }
            required
          />
        </InputDiv>
      </Form>
    </React.Fragment>
  );
}

export default ModalInput;
