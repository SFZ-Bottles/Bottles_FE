import { useRecoilState } from "recoil";
import { albumState, templateState } from "../../atom/atom";
import FileInput from "../../contents/Modal/FileInput";
import UploadButton from "../../contents/Button/UploadButton";
import { useState } from "react";
import { ButtonDiv, CustomButton} from "../../styled-components/styled_Modal";
import { ModalContainer, ModalImgDiv } from "../../styled-components/styled_Home";
import ModalInput from "./ModalInput";

interface ITemplate{
  id: string;
  url: string;
  text: string;
  file: any;
  species: string;
  order: number;
}


interface IAlbum{
  is_private: boolean;
  num: number;
  user_id: string;
  title: string;
  preface: string;
  data: {
      pages: ITemplate[];
  };
}

function ModalContent({onClose, modalType, listNum, setListNum, children}: any) {
    const [template, setTemplate] = useRecoilState<any>(templateState);
    const [fileReader, setFileReader] = useState();
    const [image, setImage] = useState<any>();
    const [text, setText] = useState("");
    const [board, setBoard] = useRecoilState<IAlbum>(albumState);
    
    const encodeFile = (fileBlob: any) => {
        const reader = new FileReader();
    
        if (!fileBlob) return;
    
        reader.readAsDataURL(fileBlob);
        console.log(reader);
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
        setImage(files[0]);
        const uploadImage = files[0];
        encodeFile(uploadImage);
      };

      const handleComplete = (listNum: number) => {
        let formData = new FormData();
        formData.append("image", image);
        formData.append('hi', 'hihihi');
        
        const newItem = {
            id: modalType,
            url: `img/${modalType}.svg`,
            text: text,
            file: formData,
            species: modalType,
            order: listNum
        };
        setTemplate((prev: any[]) => [...prev, newItem]);
        setListNum((prev: number) => prev + 1);
        onClose(null);
      };

    return(
        <ModalContainer>
          {modalType}
                {modalType !== "text" ?
                <>
                  {modalType === "cover" ?
                    <ModalInput P={{
                      value: board,
                      set: setBoard
                  }}
                  inputInfo={{
                      first: "Title",
                      second: "Preface"
                  }}/>
                  :
                  null}
                  <UploadButton label="파일 선택" onChange={onFileReaderChange}/>
                  <ModalImgDiv>
                    {fileReader ?
                        <img style={{maxWidth:"300px", maxHeight:"300px"}} src={fileReader} alt="업로드 오류"/>
                        :
                        <img style={{width:"200px", height:"200px"}} src="/img/image.svg" alt="이미지"/>
                    }
                  </ModalImgDiv>
                </>
                :
                <FileInput setText={setText}>
            </FileInput>
            }
            <ButtonDiv>
              {modalType !== "text" ?
              fileReader ?
              <CustomButton onClick={() => handleComplete(listNum)}>완료</CustomButton>
              :
              null
              :
              <CustomButton onClick={() => handleComplete(listNum)}>완료</CustomButton>
              }
              <CustomButton onClick={() => onClose(null)}>취소</CustomButton>
            </ButtonDiv>
        </ModalContainer>
    );
}

export default ModalContent;