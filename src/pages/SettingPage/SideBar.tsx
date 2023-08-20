import { styled } from "styled-components";
interface IProps{
    pageNum: number;
    setPageNum: React.Dispatch<React.SetStateAction<number>>;
}
function SideBar({pageNum, setPageNum}: IProps){
    const onClick = (num: number) => {
        setPageNum(num);
    };

    return(
        <S.Container>
            <S.MenuBar>
                <S.Content
                active={pageNum === 1}
                onClick={() => onClick(1)}>
                    개인정보 편집
                </S.Content>
                <S.Content
                active={pageNum === 2}
                onClick={() => onClick(2)}>
                    Bottles란?
                </S.Content>
                <S.Content
                active={pageNum === 3}
                onClick={() => onClick(3)}>
                    SFZ란?
                </S.Content>
                <S.Content
                active={pageNum === 4}
                onClick={() => onClick(4)}>
                    회원탈퇴
                </S.Content>
            </S.MenuBar>
        </S.Container>
    );
}

const S = {
    Container: styled.div`
        display: flex;
        position: fixed;
        align-items: center;
        margin-top: 4px;
        height: 90vh;
        width: 250px;
        border-right: 5px solid #D9D9D9;
        background-color: white;
    `,

    MenuBar: styled.div`
        display: flex;
        width: 100%;
        flex-direction: column;
        align-items: center;
    `,

    Content: styled.div<{active: boolean}>`
        display: flex;
        width: 100%;
        font-size: 2rem;
        height: 100px;
        justify-content: center;
        font-weight: ${(props) => props.active ? "600" : "400"};
        cursor: pointer;
    `
}

export default SideBar;