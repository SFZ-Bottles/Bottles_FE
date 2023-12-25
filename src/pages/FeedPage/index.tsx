import { useEffect, useState } from "react";
import { styled } from "styled-components";
import Comment from "../../components/Comment/CommentModal";
import FeedModal from "../../components/Modal/FeedModal";
import CommentImage from "../../components/Comment/CommentImage";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import AlbumApi from "../../services/albumApi";
import { media } from "../../style/theme";
import AuthService from "../../utils/authService";
import { useRecoilValue } from "recoil";
import { themeState } from "../../atom/atom";

function FeedPage() {
  const params = useParams();
  const theme = useRecoilValue(themeState);
  const target = params.id || "follow";
  const [, id] = AuthService.getTokenAndId();
  const [modal, setModal] = useState(false);
  const [AlbumId, setAlbumId] = useState<string>();

  const { data: albums } = useQuery(["feedAlbum", target, id], () =>
    AlbumApi.get(target)
  );

  useEffect(() => {
    // window.location.reload();
  }, [theme]);

  const onImgClick = (id: string) => {
    setModal(true);
    setAlbumId(id);
  };

  return (
    <S.Container>
      <S.AlbumContainer>
        {albums?.data.result.map((album: any, index: number) => (
          <S.ImgDiv
            key={index}
            onClick={() => onImgClick(album.id)}
            src={album.cover_image_url}
          />
        ))}
      </S.AlbumContainer>
      {modal && AlbumId ? (
        <div style={{ display: "flex", position: "absolute" }}>
          <FeedModal onClose={() => setModal(false)}>
            {{
              left: <CommentImage AlbumId={AlbumId} />,
              right: <Comment AlbumId={AlbumId} />,
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
  `,
  ImgDiv: styled.img`
    width: 25vw;
    height: 25vw;

    @media screen and (max-width: ${media.tablet}) {
      width: 40vw;
      height: 40vw;
    }
  `,
};

export default FeedPage;
