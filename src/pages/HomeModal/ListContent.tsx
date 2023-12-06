import { useRecoilState, useRecoilValue } from "recoil";
import { albumState, contentState, templateState } from "../../atom/atom";
import {
  AddButton,
  Box,
  BoxContainer,
  DeleteButton,
  ListContainer,
  UploadButton,
} from "../../styled-components/styled_Modal";
import { regist, registAlbum } from "../../services/API";
import { IAlbum } from "./ModalContent";
import AlbumApi from "../../services/albumApi";

interface ITemplate {
  data: string;
  species: string;
  order: number;
  content: any;
}

function ListContent() {
  const [template, setTemplate] = useRecoilState<ITemplate[]>(templateState);
  const [board, setBoard] = useRecoilState<IAlbum>(albumState);

  const deleteClick = (indexNum: number) => {
    setTemplate((prev: any) => prev.filter((index: any) => index !== indexNum));
  };

  const uploadClick = async () => {
    const data = await AlbumApi.regist(
      { pages: template },
      { ...board, num: template.length }
    );
  };

  const getImage = (species: string) => {
    if (species === "cover") return "/img/cover.svg";
    else if (species === "text") return "/img/text.svg";
    else if (species === "image") return "/img/image.svg";
    else return "/img/video.svg";
  };

  return (
    <ListContainer>
      {template.map((item: ITemplate, index: number) =>
        template.length > 0 ? (
          <BoxContainer key={index}>
            <div>({index + 1}/12)</div>
            <Box>
              <img
                style={{ width: "50px", height: "50px" }}
                src={getImage(item.species)}
                alt={item.data}
              />
            </Box>
            <DeleteButton onClick={() => deleteClick(index)}>x</DeleteButton>
          </BoxContainer>
        ) : null
      )}
      <UploadButton onClick={uploadClick}>제출</UploadButton>
    </ListContainer>
  );
}

export default ListContent;
