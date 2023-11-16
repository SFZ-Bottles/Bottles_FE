import { styled } from "styled-components";
import { useEffect, useState } from "react";
import { changeInfo, getUserInfo } from "../../../services/API";
import EditModal from "../../../contents/Modal/EditModal";
import CustomButton from "../../../contents/Button/CustomButton";
import { onFileReaderChange } from "../../../utils/utils";
import Modal from "../../../contents/Modal/Modal";
import UploadButton from "../../../contents/Button/UploadButton";

export interface IEdit {
  id: string;
  info: string;
  email: string;
  name: string;
  avatar: string;
}

function EditContent() {
  const [userData, setUserData] = useState<IEdit>();
  const [editData, setEditData] = useState<null | string>(null);

  const fetchData = async () => {
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("id");
    if (id && token) {
      const result = await getUserInfo(id, token);
      console.log(result);
      if (result) {
        setUserData({ ...result });
      }
    }
  };

  const profileEditClick = async (e: any) => {
    const data = await onFileReaderChange(e);
    await changeInfo({ ...userData, avatar: data });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <S.Container>
      <S.ContentContainer>
        <S.Title>Profile Image</S.Title>
        <S.ProfileDiv>
          {userData && <S.ImageDiv src={userData?.avatar} />}
          <S.ProfileInput>
            <UploadButton label="Edit" onChange={profileEditClick} />
          </S.ProfileInput>
          <CustomButton name="Delete" />
        </S.ProfileDiv>
      </S.ContentContainer>

      <S.ContentContainer>
        <S.Title>ID</S.Title>
        <S.InfoDiv>
          {userData?.id}
          <CustomButton name="Edit" onClick={() => setEditData("id")} />
        </S.InfoDiv>
      </S.ContentContainer>

      <S.ContentContainer>
        <S.Title>Password</S.Title>
        <S.InfoDiv>
          <CustomButton name="Edit" onClick={() => setEditData("password")} />
        </S.InfoDiv>
      </S.ContentContainer>

      <S.ContentContainer>
        <S.Title>E-mail</S.Title>
        <S.InfoDiv>
          {userData?.email}
          <CustomButton name="Edit" onClick={() => setEditData("email")} />
        </S.InfoDiv>
      </S.ContentContainer>

      <S.ContentContainer>
        <S.Title>Name</S.Title>
        <S.InfoDiv>
          {userData?.name}
          <CustomButton name="Edit" onClick={() => setEditData("name")} />
        </S.InfoDiv>
      </S.ContentContainer>

      <S.ContentContainer>
        <S.Title>Info</S.Title>
        <S.ButtonDiv>
          <S.InfoDiv>
            {userData?.info}
            <CustomButton onClick={() => setEditData("info")} name="Edit" />
            <CustomButton name="Delete" />
          </S.InfoDiv>
        </S.ButtonDiv>
      </S.ContentContainer>
      {editData ? (
        <Modal>
          <EditModal
            editData={editData}
            onClose={() => setEditData(null)}
            setUserData={setUserData}
            userData={userData}
          />
        </Modal>
      ) : null}
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
  ImageDiv: styled.div<{ src: string }>`
    width: 100px;
    height: 100px;
    background-size: cover;
    border-radius: 3rem;
    background-image: url(${(props) => props.src});
  `,
  ButtonDiv: styled.div`
    display: flex;
  `,
  ProfileInput: styled.div`
    height: 20px;
    background-color: ${(props) => props.theme.color.bgColor};
    border: none;
    font-size: 1rem;
    text-decoration: underline;
    cursor: pointer;
  `,
};

export default EditContent;
