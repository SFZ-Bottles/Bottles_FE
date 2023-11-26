import { useEffect, useState } from "react";
import { styled } from "styled-components";
import AlbumApi from "../../services/albumApi";
function CommentImage({ AlbumId }: { AlbumId: string }) {
  const [result, setResult] = useState<any>();

  const getDetail = async () => {
    if (!AlbumId) return;
    const result = await AlbumApi.getDetail(AlbumId);
    console.log(result);
    setResult(result);
  };

  useEffect(() => {
    getDetail();
  }, []);

  return (
    <S.Container>
      <S.ImageContainer>
        {result?.data?.result?.map((album: any) =>
          album.species === "image" || album.species === "cover" ? (
            <S.ImageDiv address={album?.data}>
              <S.ImageTitle>
                <span>{result?.title}</span>
                <span>{result?.preface}</span>
              </S.ImageTitle>
            </S.ImageDiv>
          ) : (
            <S.TextDiv>{album?.data}</S.TextDiv>
          )
        )}
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
  ImageDiv: styled.div<{ address: string }>`
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
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    font-size: 2.5rem;
    font-weight: 800;
    bottom: 20%;
    :last-child {
      padding-top: 2rem;
      font-size: 1.5rem;
    }
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
  `,
};

export default CommentImage;
