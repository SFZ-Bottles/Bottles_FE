import { FC, HTMLAttributes, PropsWithChildren, useState } from "react";
import FeedModal from "../Modal/FeedModal";
import AlbumModal from "../Comment/AlbumModal";
import CommentModal from "../Comment/CommentModal";
import * as S from "./Feed.styles";
import { FeedProps } from "./Feed.types";

interface Props extends HTMLAttributes<HTMLDivElement> {
  data: FeedProps[];
}

export const Feed: FC<PropsWithChildren<Props>> = ({ data }: Props) => {
  const [albumState, setAlbumState] = useState({
    modal: false,
    albumId: "",
    owner: "",
  });

  const onAlbumClicked = (id: string, owner: string) => {
    setAlbumState({ modal: true, albumId: id, owner: owner });
  };

  return (
    <S.Container>
      <S.AlbumContainer>
        {data?.map((album: any, index: number) => (
          <S.ImgDiv
            key={index}
            onClick={() => onAlbumClicked(album.id, album.user_id)}
            src={album.cover_image_url}
          />
        ))}
      </S.AlbumContainer>

      {/* 앨범 클릭시 모달 창  */}
      {albumState.modal && albumState.albumId ? (
        <div style={{ display: "flex", position: "absolute" }}>
          <FeedModal
            onClose={() => setAlbumState({ ...albumState, modal: false })}
          >
            {{
              left: <AlbumModal AlbumId={albumState.albumId} />,
              right: (
                <CommentModal
                  AlbumId={albumState.albumId}
                  owner={albumState.owner}
                  onClose={() => setAlbumState({ ...albumState, modal: false })}
                />
              ),
            }}
          </FeedModal>
        </div>
      ) : null}
    </S.Container>
  );
};
