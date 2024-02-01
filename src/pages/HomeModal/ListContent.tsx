import { useRecoilState } from "recoil";
import { albumState, templateState } from "../../atom/atom";
import {
  Box,
  BoxContainer,
  DeleteButton,
  ListContainer,
} from "../../style/styled_Modal";
interface ITemplate {
  data: string;
  species: string;
  order: number;
  content: any;
}

function ListContent() {
  const [template, setTemplate] = useRecoilState<ITemplate[]>(templateState);

  const deleteClick = (indexNum: number) => {
    setTemplate((prev: ITemplate[]) => [
      ...prev.slice(0, indexNum),
      ...prev.slice(indexNum + 1),
    ]);
  };

  const getImage = (species: string) => {
    if (species === "cover") return "/img/cover.svg";
    else if (species === "text") return "/img/text.svg";
    else if (species === "image") return "/img/image.svg";
    else return "/img/video.svg";
  };

  return (
    <ListContainer count={template.length}>
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
    </ListContainer>
  );
}

export default ListContent;
