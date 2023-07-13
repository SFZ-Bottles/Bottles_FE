import { useNavigate } from "react-router-dom";
import { Form, LogInDiv, Input, Title, LogInButton, UnderLine } from "../../styled-components/styled_LogIn"
import { useState } from "react"

function LogIn() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        ID: '',
        password: ''
    });

    const onSubmit = (e: any) => {
        e.preventDefault();
        console.log(form);
    }

    return(
        <LogInDiv>
            <Title>Bottles</Title>
            <Form onSubmit={onSubmit}>
                <Input type="text" placeholder="ID" value={form.ID} onChange={(e: any) => setForm({...form, ID: e.target.value})} required></Input>
                <Input type="password" placeholder="Pasword" value={form.password} onChange={(e: any) => setForm({...form, password: e.target.value})} required></Input>
                <LogInButton>Login</LogInButton>
                <UnderLine onClick={() => navigate("/Home")}>sign-up</UnderLine>
            </Form>
        </LogInDiv>
    )
}

export default LogIn