import { useState } from "react";
import { styled } from "styled-components";
import FeedModal from "../Modal/FeedModal";
import CommentImage from "../Comment/CommentImage";
import Comment from "../Comment/CommentModal";
import { media } from "../../style/theme";

function Feed({ data }: any) {
  const [modal, setModal] = useState(false);
  const [albumId, setAlbumId] = useState("");

  const onImgClick = (id: string) => {
    setModal(true);
    setAlbumId(id);
  };

  console.log(data, "data");

  return (
    <S.Container>
      <S.AlbumContainer>
        {data?.map((album: any, index: number) => (
          <S.ImgDiv
            key={index}
            onClick={() => onImgClick(album.id)}
            src={album.cover_image_url}
          />
        ))}
      </S.AlbumContainer>
      {modal && albumId ? (
        <div style={{ display: "flex", position: "absolute" }}>
          <FeedModal onClose={() => setModal(false)}>
            {{
              left: <CommentImage AlbumId={albumId} />,
              right: <Comment AlbumId={albumId} />,
            }}
          </FeedModal>
        </div>
      ) : null}
    </S.Container>
  );
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
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    height: 100%;

    @media screen and (max-width: ${media.mobile}) {
      grid-template-columns: repeat(1, 1fr);
    }
  `,
  ImgDiv: styled.img`
    width: 25vw;
    height: 25vw;

    @media screen and (max-width: ${media.tablet}) {
      width: 40vw;
      height: 40vw;
    }

    @media screen and (max-width: ${media.mobile}) {
      width: 60vw;
      height: 60vw;
    }
  `,
};

export default Feed;
