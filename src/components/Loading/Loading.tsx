import * as S from "./Loading.styles";

const Loading = () => {
  return (
    <S.LoadingContainer>
      <S.LoadingImage src={"/img/logo.png"} alt="로딩중" />
      <S.LoadingText>앨범 불러오는 중</S.LoadingText>
    </S.LoadingContainer>
  );
};

export default Loading;
