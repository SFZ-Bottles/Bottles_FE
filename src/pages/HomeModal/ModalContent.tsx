import { useRecoilState } from "recoil";
import { albumState, contentState, templateState } from "../../atom/atom";
import FileInput from "../../components/Input/FileInput";
import UploadButton from "../../components/Button/UploadButton";
import { useState } from "react";
import { ButtonDiv, CustomButton } from "../../style/styled_Modal";
import { ModalContainer, ModalImgDiv } from "../../style/styled_Home";
import ModalInput from "./ModalInput";
import { styled } from "styled-components";
import { media } from "../../style/theme";
import { FlexCenterCSS } from "../../style/commonStyle";
import { Button } from "../../components/Button/Button";

export interface ITemplate {
  data: string;
  species: string;
  order: number;
  content: any;
}

export interface IAlbum {
  is_private: boolean;
  num: number;
  user_id: string;
  title: string;
  preface: string;
  data: {
    pages: ITemplate[];
  };
}

function ModalContent({
  onClose,
  modalType,
  listNum,
  setListNum,
  children,
}: any) {
  const [template, setTemplate] = useRecoilState<any>(templateState);
  const [fileReader, setFileReader] = useState();
  const [text, setText] = useState("");
  const [content, setContent] = useRecoilState(contentState);
  const [board, setBoard] = useRecoilState<IAlbum>(albumState);
  const [image, setImage] = useState<any>();
  const encodeFile = (fileBlob: any) => {
    const reader = new FileReader();

    if (!fileBlob) return;

    reader.readAsDataURL(fileBlob);
    return new Promise((resolve: any) => {
      reader.onload = () => {
        const result: any = reader.result;
        setFileReader(result);
        resolve();
      };
    });
  };

  const onFileReaderChange = (e: any) => {
    const { files } = e.target;
    if (!files || !files[0]) return;
    const uploadImage = files[0];
    setImage(uploadImage);
    encodeFile(uploadImage);
  };

  const handleComplete = (listNum: number, modalType: string) => {
    let newItem = {
      data: modalType + Date.now().toString(),
      species: modalType,
      order: listNum,
      content: image,
    };

    if (modalType !== "text") {
      setContent((prev: any) => [...prev, image]);
      setBoard((prev: IAlbum) => ({
        ...board,
        data: {
          ...board.data,
          pages: content,
        },
      }));
    } else {
      newItem = { ...newItem, content: text };
    }

    setTemplate((prev: any[]) => [...prev, newItem]);
    setListNum((prev: number) => prev + 1);
    onClose(null);
  };

  return (
    <ModalContainer>
      <div>{modalType}</div>
      <S.Wrapper>
        {modalType !== "text" ? (
          <>
            {/* 커버 일때 */}
            {modalType === "cover" && (
              <ModalInput
                P={{
                  value: board,
                  set: setBoard,
                }}
                inputInfo={{
                  title: "Title",
                  preface: "Preface",
                }}
              />
            )}
            <S.ButtonWrapper>
              <Button skin="blue" round="very" size="standard">
                <UploadButton
                  label="파일 선택"
                  type={
                    modalType === "image" || modalType === "cover"
                      ? "image"
                      : "video"
                  }
                  onChange={onFileReaderChange}
                >
                  업로드
                </UploadButton>
              </Button>
            </S.ButtonWrapper>
            <S.ImageWrapper>
              {fileReader ? (
                <img
                  style={{ maxWidth: "100%", maxHeight: "100%" }}
                  src={fileReader}
                  alt="업로드 오류"
                />
              ) : (
                <img
                  style={{ width: "100%", height: "100%" }}
                  src="/img/image.svg"
                  alt="이미지"
                />
              )}
            </S.ImageWrapper>
          </>
        ) : (
          <FileInput setText={setText}></FileInput>
        )}
        <ButtonDiv>
          {modalType !== "text" ? (
            fileReader ? (
              <Button
                skin="blue"
                round="very"
                size="standard"
                onClick={() => handleComplete(listNum, modalType)}
              >
                완료
              </Button>
            ) : null
          ) : (
            <Button
              skin="blue"
              round="very"
              size="standard"
              onClick={() => handleComplete(listNum, modalType)}
            >
              완료
            </Button>
          )}
          <Button
            skin="blue"
            round="very"
            size="standard"
            onClick={() => onClose(null)}
          >
            취소
          </Button>
        </ButtonDiv>
      </S.Wrapper>
    </ModalContainer>
  );
}

const S = {
  ImageWrapper: styled.div`
    width: 200px;
    height: 200px;

    @media screen and (max-width: ${media.mobile}) {
      width: 30vw;
      height: 30vw;
    }
  `,
  ButtonWrapper: styled.div`
    padding-top: 2rem;
  `,
  Wrapper: styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px;
  `,
};

export default ModalContent;
