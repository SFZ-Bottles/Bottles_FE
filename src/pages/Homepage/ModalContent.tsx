import { useRecoilState } from "recoil";
import { templateState } from "../../atom/atom";
import FileInput from "../../contents/Modal/FileInput";
import UploadButton from "../../contents/Button/UploadButton";
import { useState } from "react";
import { ButtonDiv, CustomButton } from "../../styled-components/styled_Modal";
import React from "react";

function ModalContent({onClose, modalType ,children}: any) {
    const [template, setTemplate] = useRecoilState<any>(templateState);
    const [fileReader, setFileReader] = useState();
    const [text, setText] = useState("");
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
    
        encodeFile(uploadImage);
      };

      const handleComplete = () => {
        const newItem = {
            id: modalType,
            url: `img/${modalType}.svg`,
            text: text,
            file: fileReader,
        };
    
        setTemplate((prev: any[]) => [...prev, newItem]);
        onClose(null);
      };

    return(
        <React.Fragment>
            <FileInput setText={setText}>
                {modalType !== "text" ?
                <UploadButton label="파일 선택" onChange={onFileReaderChange}/>
                :
                null}
                {fileReader ?
                    <img style={{width:"200px", height:"200px"}} src={fileReader} alt="업로드 오류"/>
                    :
                    null
                }
            </FileInput>
            <ButtonDiv>
                <CustomButton onClick={handleComplete}>완료</CustomButton>
                <CustomButton onClick={() => onClose(null)}>취소</CustomButton>
            </ButtonDiv>
        </React.Fragment>
    );
}

export default ModalContent;