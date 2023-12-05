import styled from "styled-components";
import {
  FlexCenterCSS,
  FlexColumnCenterCSS,
} from "../../styled-components/commonStyle";
import { useNavigate } from "react-router-dom";

const floatAnimation = `
  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-20px); }
  }
`;

const FloatingBottle = styled.div`
  ${floatAnimation}
  animation: float 4s ease-in-out infinite;
  background: url("/img/bottle.png") no-repeat center center;
  background-size: cover;
  width: 400px;
  height: 400px;
`;

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <S.Container>
      <S.ButtonDiv>
        <button onClick={() => navigate("/home/feed")}>홈으로</button>
        <button onClick={() => navigate(-1)}>이전 페이지</button>
      </S.ButtonDiv>
      <FloatingBottle />
    </S.Container>
  );
};

const S = {
  Container: styled.div`
    ${FlexColumnCenterCSS}
    align-items: center;
    background-color: #f5ffff;
    width: 100vw;
    height: 100vh;
    gap: 2rem;
  `,

  ButtonDiv: styled.div`
    ${FlexCenterCSS}
    gap: 3rem;
  `,
};

export default NotFoundPage;
