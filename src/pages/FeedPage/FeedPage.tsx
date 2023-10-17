import { useEffect, useState } from "react";
import { getAlbum } from "../../services/API";
import { styled } from "styled-components";
import Comment from "../../contents/Comment/CommentModal";
import Modal2 from "../../contents/Modal/Modal2";
import CommentImage from "../../contents/Comment/CommentImage";
import { useQuery } from "react-query";

function FeedPage(){
    const id: string | null= localStorage.getItem('id');
    const [modal, setModal] = useState(false);
    const [AlbumId, setAlbumId] = useState<string>();
    const {isLoading, data} = useQuery(["feedAlbum",id], getAlbum);
    
    const onImgClick = (id: string) => {
        setModal(true);
        setAlbumId(id);
    };

    return(
        <S.Container>
            <S.AlbumContainer>
                {data?.map((album: any, index: number) => (
                <S.ImgDiv 
                key={index}
                onClick={() => onImgClick(album.id)} 
                address={album.cover_image_url}>
                </S.ImgDiv>
                )
                )}
            </S.AlbumContainer>
            {modal && AlbumId? 
                <div style={{display: "flex", position: "absolute"}}>
                <Modal2 onClose={() => setModal(false)}>
                    {{
                        left: <CommentImage AlbumId={AlbumId}/>,
                        right: <Comment AlbumId={AlbumId}/>
                    }}
                </Modal2>
                </div>
            :
            null
            }
        </S.Container>
    )
}

const S = {
    Container: styled.div`
        display: flex;
        width: 100%;
        height: 100%;
        justify-content: center;
    `,
    AlbumContainer: styled.div`
        display: grid;
        padding-top: 40px;
        grid-template-columns: repeat(2,1fr);
        width: 800px;
        gap: 10px;
        height: 100%;
    `,
    ImgDiv: styled.div<{address: string}>`
        background-image: url(${props=> props.address});
        width: 400px;
        height: 400px;
        background-size: cover;
    `
}

export default FeedPage;