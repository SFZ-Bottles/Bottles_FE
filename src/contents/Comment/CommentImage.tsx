import { styled } from "styled-components";
import { result } from "../../pages/FeedPage/FeedPage";

function CommentImage(){
    return (
        <S.Container>
            <S.ImageContainer>
            {result?.map((album) =>(
                    <S.ImageDiv URL={album.cover_image_url}>
                        <S.ImageTitle>
                            {album.title}
                        </S.ImageTitle>
                    </S.ImageDiv>
            ))}
            </S.ImageContainer>
        </S.Container>
    );
}

const S = {
    Container: styled.div`
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      flex-direction: column;
    `,
    ImageDiv: styled.div<{URL: string}>`
        display: flex;
        position: relative;
        align-items: center;
        flex-direction: column;
        width: 100%;
        height: 80%;
        background-size: cover;
        background-image: url(${props => props.URL});
    `,
    ImageContainer: styled.div`
        width: 100%;
        height: 100%;
        overflow: scroll;
        overflow-x: hidden;
        &::-webkit-scrollbar {
            width: 0;
        }
    `,
    ImageTitle: styled.span`
        position: absolute;
        font-size: 2.5rem;
        font-weight: 800;
        bottom: 20%;
    `
}

export default CommentImage;