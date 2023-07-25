import { useRecoilState, useRecoilValue } from "recoil";
import { templateState } from "../../atom/atom";
import { Box, BoxContainer, DeleteButton, ListContainer } from "../../styled-components/styled_Modal";

interface ITemplate{
    id: string;
    url: string;
    text: string;
    file: any;
}

function ListContent(){
    const [template, setTemplate] = useRecoilState<ITemplate[]>(templateState);
    console.log(template);
    
    const deleteClick = (indexNum: number) => {
        setTemplate((prev: any) => 
            prev.filter((_: any, index: any) => index !== indexNum)
        );
    };

    return(
        <ListContainer>
            <BoxContainer>
                <Box>
                    {/* {template[1]?.set[0]?.file ?
                    <img style={{width: "50px", height: "50px"}} src={template[1]?.set[0]?.file} alt="이미지"/>
                    : <div>커버</div>} */}
                    커버
                </Box>
            </BoxContainer>
            {template.map((item: ITemplate, index: number) => (
                template.length > 0 ?
                <BoxContainer 
                key={item.id}
                >
                    <div>
                        ({index + 1}/12)
                    </div>
                    <Box>
                        <img style={{width: "50px", height: "50px"}} src={item.url} alt={item.id}/>
                    </Box>
                    <DeleteButton onClick={() => deleteClick(index)}>x</DeleteButton>
                </BoxContainer>
                :
                null
            ))}
        </ListContainer>
    );
}

export default ListContent;