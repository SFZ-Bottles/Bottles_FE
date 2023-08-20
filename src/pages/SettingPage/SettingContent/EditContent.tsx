import { styled } from "styled-components";
import EditButton from "../../../contents/Button/EditButton";
import DeleteButton from "../../../contents/Button/DeleteButton";
import { useEffect } from "react";
import { getUserInfo } from "../../../services/API";

function EditContent(){
    useEffect(() => {
        const token = localStorage.getItem('token');
        // getUserInfo(token)
    },[]);
    return(
        <S.Container>
            <S.ContentContainer>
                <S.Title>
                    Profile Image
                </S.Title>
                <S.ProfileDiv>
                    <S.ImageDiv/>
                    <EditButton/>
                    <DeleteButton/>
                </S.ProfileDiv>
            </S.ContentContainer>

            <S.ContentContainer>
                <S.Title>
                    ID
                </S.Title>
                <EditButton/>
            </S.ContentContainer>
            
            <S.ContentContainer>
                <S.Title>
                    Password
                </S.Title>
                <EditButton/>
            </S.ContentContainer>
            
            <S.ContentContainer>
                <S.Title>
                    E-mail
                </S.Title>
                <EditButton/>
            </S.ContentContainer>
            
            <S.ContentContainer>
                <S.Title>
                    Name
                </S.Title>
                <EditButton/>
            </S.ContentContainer>
            
            <S.ContentContainer>
                <S.Title>
                    Info
                </S.Title>
                <S.ButtonDiv>
                    <EditButton/>
                    <DeleteButton/>
                </S.ButtonDiv>
            </S.ContentContainer>
        </S.Container>
    );
}

const S = {
    Container: styled.div`
        display: flex;
        flex-direction: column;
        width: 100%;
        gap: 2rem;
    `,
    Title: styled.div`
        font-size: 2rem;
        font-weight: 800;
    `,
    ContentContainer: styled.div`
        display: flex;
        flex-direction: column;
        gap: 20px;
    `,
    ProfileDiv: styled.div`
        display: flex;
        align-items: end;
    `,
    ImageDiv: styled.div`
        width: 100px;
        height: 100px;
        border-radius: 3rem;
        background-color: #D9D9D9;
    `,
    ButtonDiv: styled.div`
        display: flex;
    `,
};


export default EditContent;