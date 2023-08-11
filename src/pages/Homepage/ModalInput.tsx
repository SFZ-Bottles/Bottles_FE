import React from "react";
import { C_FlexBox, Form, Input, InputDiv, LoginInfo, NextButton, PasswordLength, Span } from "../../styled-components/styled_LogIn";

function ModalInput({P, inputInfo}: any) {
    
    return(
        <React.Fragment>
            <Form>
                <InputDiv>
                    <Span>
                        {inputInfo?.first}
                    </Span>
                    <C_FlexBox>
                        <Input type="text" 
                        placeholder={inputInfo?.first}
                        value={P?.value?.first}
                        onChange={(e: any) => 
                        P.set({...P.value, first: e.target.value})} 
                        required/>
                    </C_FlexBox>
                </InputDiv>
                <InputDiv>
                    <Span>
                        {inputInfo?.second}
                    </Span>
                    <Input type="text" 
                    placeholder={inputInfo?.second}
                    value={P?.value.second}
                    onChange={(e: any) => P.set({...P?.value, second: e.target.value})} 
                    required/>
                </InputDiv>
            </Form>
        </React.Fragment>
    )
}

export default ModalInput;