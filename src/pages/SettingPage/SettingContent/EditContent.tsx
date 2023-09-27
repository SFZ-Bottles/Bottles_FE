import { styled } from "styled-components";
import { useEffect, useState } from "react";
import { getUserInfo } from "../../../services/API";
import EditModal from "../../../contents/Modal/EditModal";
import CustomButton from "../../../contents/Button/CustomButton";

export interface IEdit{
        id: string;
        info: string;
        email: string;
        name: string;
}

function EditContent(){
    const [userData, setUserData] = useState<IEdit>();
    const [editData, setEditData] = useState<null | string>(null);
    const fetchData = async () => {
        const token = localStorage.getItem('token');
        const id = localStorage.getItem('id');
        if(id && token){
            const result = await getUserInfo(id, token);
            console.log(result);
            if(result){
                setUserData({...result});
            }
        }
    };
    
    useEffect(() => {
        fetchData();
    },[]);

    return(
        <S.Container>
            <S.ContentContainer>
                <S.Title>
                    Profile Image
                </S.Title>
                <S.ProfileDiv>
                    <S.ImageDiv/>
                    <CustomButton
                    name='Edit'
                    onClick={() => setEditData('profile')}/>
                    <CustomButton
                    name='Delete'/>
                </S.ProfileDiv>
            </S.ContentContainer>

            <S.ContentContainer>
                <S.Title>
                    ID
                </S.Title>
                <S.InfoDiv>
                    {userData?.id}
                    <CustomButton
                    name='Edit'
                    onClick={() => setEditData('id')}/>
                </S.InfoDiv>
            </S.ContentContainer>
            
            <S.ContentContainer>
                <S.Title>
                    Password
                </S.Title>
                <S.InfoDiv>
                    <CustomButton
                    name='Edit'
                    onClick={() => setEditData('password')}/>
                </S.InfoDiv>
            </S.ContentContainer>
            
            <S.ContentContainer>
                <S.Title>
                    E-mail
                </S.Title>
                <S.InfoDiv>
                    {userData?.email}
                    <CustomButton
                    name='Edit'
                    onClick={() => setEditData('email')}/>
                </S.InfoDiv>
            </S.ContentContainer>
            
            <S.ContentContainer>
                <S.Title>
                    Name
                </S.Title>
                <S.InfoDiv>
                    {userData?.name}
                    <CustomButton
                    name='Edit'
                    onClick={() => setEditData('name')}/>
                </S.InfoDiv>
            </S.ContentContainer>
            
            <S.ContentContainer>
                <S.Title>
                    Info
                </S.Title>
                <S.ButtonDiv>
                    <S.InfoDiv>
                        {userData?.info}
                        <CustomButton
                        onClick={() => setEditData('info')}
                        name='Edit'/>
                        <CustomButton
                        name='Delete'/>
                    </S.InfoDiv>
                </S.ButtonDiv>
            </S.ContentContainer>
            {editData ?
            <EditModal
            editData={editData}
            onClose={() => setEditData(null)}
            setUserData={setUserData}
            userData={userData}/>
            :
            null}
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
    InfoDiv: styled.div`
        display: flex;
        gap: 10px;  
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