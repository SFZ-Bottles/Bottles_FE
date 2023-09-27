import { styled } from "styled-components"

function CustomButton({name, onClick}: any){
    return(
        <S.Button onClick={onClick}>
            {name}
        </S.Button>
    )
}

const S = {
    Button: styled.button`
        height: 20px;
        background-color: ${props => props.theme.color.bgColor};
        border: none;
        font-size: 1rem;
        text-decoration: underline;
        cursor: pointer;
    `,
}

export default CustomButton;