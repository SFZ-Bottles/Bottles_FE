import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { getDetailAlbum } from "../../services/API";
function CommentImage({AlbumId}:{AlbumId: string}){
    const [result, setResult] = useState<any>();

    const getDetail = async () => {
        if(!AlbumId) return;
        const result = await getDetailAlbum(AlbumId);
        setResult(result);
        console.log(result);
    };
    
    useEffect(() => {
        getDetail();
    },[]);

    return (
        <S.Container>
            <S.ImageContainer>
            {result?.map((album: any) =>(
                    album.species === 'image' || album.species === 'cover' ?
                        <S.ImageDiv address={album?.data}>
                            <S.ImageTitle>
                                
                            </S.ImageTitle>
                        </S.ImageDiv>
                    :
                        <S.TextDiv>
                            {album?.data}
                        </S.TextDiv>
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
    ImageDiv: styled.div<{address: string}>`
        display: flex;
        position: relative;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        width: 100%;
        height: 80%;
        background-size: cover;
        background-image: url(${(props) => props.address});
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
    `,
    TextDiv: styled.div`
        display: flex;
        position: relative;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        font-size: 2rem;
        width: 100%;
        height: 80%;
    `
}

export default CommentImage;