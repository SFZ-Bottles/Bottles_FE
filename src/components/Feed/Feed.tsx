import { FC, HTMLAttributes, PropsWithChildren, useState } from "react";
import FeedModal from "../Modal/FeedModal";
import CommentImage from "../Comment/CommentImage";
import Comment from "../Comment/CommentModal";
import * as S from "./Feed.styles";
import { FeedProps } from "./Feed.types";

interface Props extends HTMLAttributes<HTMLDivElement> {
  data: FeedProps[];
}

export const Feed: FC<PropsWithChildren<Props>> = ({
  children,
  data,
  ...props
}: Props) => {
  const [modal, setModal] = useState(false);
  const [albumId, setAlbumId] = useState("");

  const onImgClick = (id: string) => {
    setModal(true);
    setAlbumId(id);
  };

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
};
