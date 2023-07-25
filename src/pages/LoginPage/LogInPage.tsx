import { useNavigate } from "react-router-dom";
import { Form, LogInDiv, Input, Title, LogInButton, UnderLine, InvalidBox, C_ColFlexBox } from "../../styled-components/styled_LogIn"
import { useEffect, useState } from "react";
import { signIn } from "../../services/API";
import { checkToken } from "../../context/function";

function LogInPage() {
    const navigate = useNavigate();
    const [identity, setIdentity] = useState(false);
    const [form, setForm] = useState({
        ID: '',
        password: ''
    });

    const onSubmit = async (e: any) => {
        e.preventDefault();
        const result = await signIn(form.ID, form.password);
        if(result?.token){
            localStorage.setItem('token', result.token);
            navigate("/home");
        }
        else{   
            setIdentity((prev: boolean) => !prev);
        }
    }

    useEffect(() => {
        checkToken({navigate});
    },[]);

    return(
        <LogInDiv>
            <Title>Bottles</Title>
            <Form onSubmit={onSubmit}>
                <Input type="text" placeholder="ID" value={form.ID} onChange={(e: any) => setForm({...form, ID: e.target.value})} required></Input>
                <Input type="password" placeholder="Pasword" value={form.password} onChange={(e: any) => setForm({...form, password: e.target.value})} required></Input>
                <C_ColFlexBox>
                {identity ?
                    <InvalidBox>잘못된 회원정보입니다.</InvalidBox>
                    :
                    null
                }
                    <LogInButton>Login</LogInButton>
                    <UnderLine onClick={() => navigate("/signup")}>sign-up</UnderLine>
                </C_ColFlexBox>
            </Form>
        </LogInDiv>
    )
}

export default LogInPage;