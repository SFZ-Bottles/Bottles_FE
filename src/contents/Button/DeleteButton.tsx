import { styled } from "styled-components";

function DeleteButton(){
    return(
        <S.Button>
            Delete
        </S.Button>
    )
}

const S = {
    Button: styled.button`
        width: 40px;
        height: 20px;
        background-color: white;
        border: none;
        font-size: 1rem;
        text-decoration: underline;
        cursor: pointer;
    `,
}

export default DeleteButton;