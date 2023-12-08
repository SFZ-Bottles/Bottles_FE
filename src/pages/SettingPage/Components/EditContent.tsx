import { styled } from "styled-components";
import { useEffect, useState } from "react";
import { changeInfo, getUserInfo } from "../../../services/API";
import EditModal from "../../../components/Modal/EditModal";
import CustomButton from "../../../components/Button/CustomButton";
import { onFileReaderChange } from "../../../utils/imageUpload";
import Modal from "../../../components/Modal/Modal";
import UploadButton from "../../../components/Button/UploadButton";
import AuthService from "../../../utils/authService";
import InfoApi from "../../../services/infoApi";
import basicCSS from "../../../style/basicStyle";

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
  console.log(userData);

  const fetchData = async () => {
    const [token, id] = AuthService.getTokenAndId();

    if (token && id) {
      try {
        const { data } = await InfoApi.getInfo(id, token);
        setUserData(data);
      } catch (error: any) {
        alert(error.message);
      }
    }
  };

  const profileEditClick = async (e: any) => {
    try {
      const image = await onFileReaderChange(e);
      await changeInfo({ ...userData, avatar: image });
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <S.Container>
      <S.ContentContainer>
        <span>Profile Image</span>
        <S.ProfileDiv>
          {userData && <S.ImageDiv src={userData?.avatar} />}
          <S.ProfileInput>
            <UploadButton label="Edit" onChange={profileEditClick} />
          </S.ProfileInput>
          <CustomButton name="Delete" />
        </S.ProfileDiv>
      </S.ContentContainer>

      <S.ContentContainer>
        <span>ID</span>
        <S.InfoDiv>
          {userData?.id}
          <CustomButton name="Edit" onClick={() => setEditData("id")} />
        </S.InfoDiv>
      </S.ContentContainer>

      <S.ContentContainer>
        <span>Password</span>
        <S.InfoDiv>
          <CustomButton name="Edit" onClick={() => setEditData("password")} />
        </S.InfoDiv>
      </S.ContentContainer>

      <S.ContentContainer>
        <span>E-mail</span>
        <S.InfoDiv>
          {userData?.email}
          <CustomButton name="Edit" onClick={() => setEditData("email")} />
        </S.InfoDiv>
      </S.ContentContainer>

      <S.ContentContainer>
        <span>Name</span>
        <S.InfoDiv>
          {userData?.name}
          <CustomButton name="Edit" onClick={() => setEditData("name")} />
        </S.InfoDiv>
      </S.ContentContainer>

      <S.ContentContainer>
        <span>Info</span>
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
  ContentContainer: styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;

    & > span {
      font-size: ${basicCSS.FONT_SIZE.medium};
      font-weight: ${basicCSS.FONT_WEIGHT.bold};
    }
  `,
  ProfileDiv: styled.div`
    display: flex;
    align-items: end;
  `,
  InfoDiv: styled.div`
    display: flex;
    gap: 1rem;
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
