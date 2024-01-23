import { styled } from "styled-components";
import AlbumApi from "../../services/albumApi";
import { useQuery } from "react-query";
import { FlexCenterCSS, FlexColumnCenterCSS } from "../../style/commonStyle";

function CommentImage({ AlbumId }: { AlbumId: string }) {
  const { data: album } = useQuery(["detail", AlbumId], () =>
    AlbumApi.getDetail(AlbumId)
  );

  return (
    <S.ImageContainer>
      {album?.data?.result?.map((content: any, index: number) =>
        content.species !== "text" ? (
          <S.ImageDiv>
            {content.species === "video" ? (
              <video
                muted
                autoPlay
                loop
                style={{ width: "100%", height: "100%" }}
                src={content?.data}
              ></video>
            ) : (
              <>
                <img
                  style={{ width: "100%", height: "100%" }}
                  src={content?.data}
                  alt="이미지"
                />
                <S.ImageTitle>
                  {content.species === "cover" && (
                    <>
                      <span>{album?.data?.title}</span>
                      <span>{album?.data?.preface}</span>
                    </>
                  )}
                </S.ImageTitle>
              </>
            )}
          </S.ImageDiv>
        ) : (
          <S.TextDiv key={index}>{content?.data}</S.TextDiv>
        )
      )}
    </S.ImageContainer>
  );
}

const S = {
  ImageDiv: styled.div`
    ${FlexColumnCenterCSS}
    position: relative;
    width: 100%;
    height: 80%;
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
    ${FlexColumnCenterCSS}
    position: absolute;
    font-size: 2.5rem;
    font-weight: 800;
    bottom: 20%;
    & > span {
      padding-top: 2rem;
      font-size: 1.5rem;
    }
    color: "black";
  `,
  TextDiv: styled.div`
    ${FlexCenterCSS}
    position: relative;
    flex-direction: column;
    font-size: 2rem;
    width: 100%;
    height: 80%;
  `,
};

export default CommentImage;
