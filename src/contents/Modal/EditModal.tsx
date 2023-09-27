import { styled } from "styled-components";
import Modal from "./Modal";
import { changeInfo } from "../../services/API";
import { useState } from "react";

export interface IEdit{
    id: string;
    info: string;
    email: string;
    name: string;
}


function EditModal({editData, userData, setUserData, onClose}: any){
    const [inputData, setInputData] = useState('');
    const onClick = async (editData: string) => {
        // await changeInfo({...userData, [editData]: inputData});
        setUserData({...userData, [editData]: inputData});
        onClose(null);
    };

    return(
        <Modal
        onClose={onClose}>
            <S.Container>
                {editData}
                <S.Input 
                value={inputData}
                onChange={(e) => setInputData(e.target.value)}/>
                <S.Button onClick={() => onClick(editData)}>확인</S.Button>
            </S.Container>
        </Modal>
    );
}

const S = {
    Container: styled.div`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 30rem;
        height: 15rem;
        gap: 10%;
        border-radius: 8px;
        font-size: 2rem
    `,
    Input: styled.input`
        width: 80%;
        height: 15%;
        border-radius: 1rem;
        border: 2px solid black;
    `,
    Button: styled.div`
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 1rem;
        background-color: #D9D9D9;
        width: 20%;
        height: 13%;
        font-size: 1rem;
    `
};

export default EditModal;