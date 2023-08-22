import { styled } from "styled-components";

function EditButton() {
    return(
        <S.Button>
            Edit
        </S.Button>
    )
}

const S = {
    Button: styled.button`
        width: 40px;
        height: 20px;
        background-color: ${props => props.theme.color.bgColor};
        border: none;
        font-size: 1rem;
        text-decoration: underline;
        cursor: pointer;
    `,
}

export default EditButton;