import { ReactNode } from "react";
import { styled } from "styled-components";

interface IProps{
    children: ReactNode;
}


function SideBar({children}: IProps){
    return(
        <S.Container>
            {children}
        </S.Container>
    );
}

const S = {
    Container: styled.div`
        display: flex;
        position: fixed;
        align-items: center;
        margin-top: 10px;
        height: 90vh;
        border-right: 5px solid #D9D9D9;
        border-top: 3px solid #D9D9D9;
        border-color: ${(props) => props.theme.color.navBorder};
        background-color: ${(props) => props.theme.color.bgColor};  
    `,
}

export default SideBar;