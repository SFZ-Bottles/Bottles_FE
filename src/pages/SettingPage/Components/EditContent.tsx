import { styled } from "styled-components";
import { useEffect, useState } from "react";
import { changeInfo, getUserInfo } from "../../../services/API";
import EditModal from "../../../components/Modal/EditModal";
import { encodeFile, onFileReaderChange } from "../../../utils/imageUpload";
import Modal from "../../../components/Modal/Modal";
import UploadButton from "../../../components/Button/UploadButton";
import AuthService from "../../../utils/authService";
import InfoApi from "../../../services/infoApi";
import basicCSS from "../../../style/basicStyle";
import Profile from "../../../components/Profile/Profile";
import { Button } from "../../../components/Button/Button";

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
    const [, id] = AuthService.getTokenAndId();
    try {
      const { data } = await InfoApi.getInfo(id);
      setUserData(data);
    } catch (error: any) {
      alert(error.message);
    }
  };

  const profileEditClick = async (e: any) => {
    try {
      const image = await onFileReaderChange(e);
      const encodedImage = await encodeFile(image);
      const changedInfo = await changeInfo("avatar", image);
      setUserData({ ...changedInfo, avatar: encodedImage });
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
          {userData && <Profile size={8} src={userData?.avatar} />}
          <S.ButtonWrapper>
            <UploadButton label="Edit" type="image" onChange={profileEditClick}>
              <Button variant="outlined">Edit</Button>
            </UploadButton>
            <Button variant="outlined">Delete</Button>
          </S.ButtonWrapper>
        </S.ProfileDiv>
      </S.ContentContainer>

      <S.ContentContainer>
        <span>ID</span>
        <S.ButtonWrapper>
          {userData?.id}
          <Button variant="outlined" onClick={() => setEditData("id")}>
            Edit
          </Button>
        </S.ButtonWrapper>
      </S.ContentContainer>

      <S.ContentContainer>
        <span>Password</span>
        <S.ButtonWrapper>
          <Button variant="outlined" onClick={() => setEditData("password")}>
            Edit
          </Button>
        </S.ButtonWrapper>
      </S.ContentContainer>

      <S.ContentContainer>
        <span>E-mail</span>
        <S.ButtonWrapper>
          {userData?.email}
          <Button variant="outlined" onClick={() => setEditData("email")}>
            Edit
          </Button>
        </S.ButtonWrapper>
      </S.ContentContainer>

      <S.ContentContainer>
        <span>Name</span>
        <S.ButtonWrapper>
          {userData?.name}
          <Button variant="outlined" onClick={() => setEditData("name")}>
            Edit
          </Button>
        </S.ButtonWrapper>
      </S.ContentContainer>

      <S.ContentContainer>
        <span>Info</span>
        <S.ButtonWrapper>
          {userData?.info}
          <Button variant="outlined" onClick={() => setEditData("info")}>
            Edit
          </Button>
          <Button variant="outlined">Delete</Button>
        </S.ButtonWrapper>
      </S.ContentContainer>
      {editData ? (
        <Modal onClose={() => setEditData("")}>
          <EditModal
            editData={editData}
            onClose={() => setEditData(null)}
            setUserData={setUserData}
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
  ButtonWrapper: styled.div`
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
