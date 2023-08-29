import { useEffect, useState } from "react";
import { getAlbum } from "../../services/API";
import { styled } from "styled-components";
import Modal from "../../contents/Modal/Modal";
import Comment from "../../contents/Comment/CommentModal";
import Modal2 from "../../contents/Modal/Modal2";
import CommentImage from "../../contents/Comment/CommentImage";


export const result = [
    {
        id: 'slsl',
        userId: 'EXUSER',
        cover_image_url: "/img/image1.jpg",
        title: 'first',
        create_at: "2023-07-22T09", 
    },
    {
        id: 'slsl',
        userId: 'EXUSER',
        cover_image_url: "/img/image2.jpg",
        title: 'second',
        create_at: "2023-07-22T09", 
    },
    {
        id: 'slsl',
        userId: 'EXUSER',
        cover_image_url: "/img/image3.jpg",
        title: 'third',
        create_at: "2023-07-22T09", 
    },
    {
        id: 'slsl',
        userId: 'EXUSER',
        cover_image_url: "/img/image4.jpg",
        title: 'fourth',
        create_at: "2023-07-22T09", 
    },
];

function FeedPage(){
    const [modal, setModal] = useState(false);
    const [commentModal, setCommentModal] = useState(false);
    const initialFeed = async () => {
        const id = 'gg';
        const token = localStorage.getItem('token');
        // await getAlbum(id, token);
    };

    const onImgClick = (URL: string) => {
        setModal(true);
    };

    return(
        <S.Container>
            <S.AlbumContainer>
                {result.map((album: any, index) => (
                <S.ImgDiv 
                key={index}
                onClick={() => onImgClick(album.cover_image_url)} 
                address={album.cover_image_url}>
                </S.ImgDiv>
                )
                )}
            </S.AlbumContainer>
            {modal ? 
                <div style={{display: "flex", position: "absolute"}}>
                <Modal2 onClose={() => setModal(false)}>
                    {{
                        left: <CommentImage/>,
                        right: <Comment/>
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