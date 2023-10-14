import { useSetRecoilState } from "recoil";
import { styled } from "styled-components";
import { themeState } from "../../Atom/atom";
import { useEffect } from "react";

function Pinpage(){
    const setTheme = useSetRecoilState(themeState);
    
    useEffect(() => {
        setTheme(false);
    },[]);
    window.onpopstate = () => setTheme(true);
    
    return(
        <S.Container>
            <S.PasswordDiv>
                <span>Welcome, Here is the other side</span>
                <S.PasswordInput
                placeholder="Password"/>
            </S.PasswordDiv>        
        </S.Container>
    )


}

const S = {
    Container: styled.div`
    display: flex;
    padding-top: 5rem;
    justify-content: center;
    color: ${(props) => props.theme.color.fontColor};
    font-size: 2rem;
    width: 100%;
    height: 100%;
    background-color: ${(props) => props.theme.color.bgColor};
    `,

    PasswordDiv: styled.div`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding-top: 10rem;
        gap: 5rem;
    `,

    PasswordInput: styled.input`
        width: 25rem;
        height: 3rem;
        border-radius: 2rem;
        border: 2px solid black;
        padding-left: 1rem;
    `
}

export default Pinpage;