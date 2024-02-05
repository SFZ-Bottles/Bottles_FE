import { styled } from "styled-components";
import { FlexColumnCenterCSS } from "../../../style/commonStyle";
import { media } from "../../../style/theme";

function GroupIntro() {
  return (
    <S.Container>
      <S.Bold>About SFZ</S.Bold>

      <S.CenterAlignWrapper>
        저희는 가치 있는 서비스를 개발하는 팀입니다.
        <br />
        <br />
        악상기호 sfz(sforzando)는 하나의 음이나 화연을 갑작스럽게 강조하라는
        의미입니다.
        <br />
        우리도 이처럼 여러분의 인식에 강하게 인식되어
        <br />
        삶을 조금 더 즐겁게 만드는 작품을 개발하고자 합니다.
        <br />
        <br />
        우리의 작품과 함께하며 특별한 경험을 즐기시기를 바랍니다.
        <br />
        <br />
        <br />
        <br />
        <S.Bold>Contact</S.Bold>
        <div>Email | bhwkd@naver.com</div>
      </S.CenterAlignWrapper>
    </S.Container>
  );
}

const S = {
  Container: styled.div`
    width: 100%;
    ${FlexColumnCenterCSS}
    padding: 5rem 90px;
    @media screen and (max-width: ${media.mobile}) {
      padding: 2rem 0;
    }
  `,
  Bold: styled.span`
    font-size: 1.5rem;
    font-weight: bold;
  `,
  CenterAlignWrapper: styled.div`
    text-align: center;
    font-size: 17px;
    font-weight: bold;
    line-height: 1.5;

    padding: 5rem 0;

    & > div {
      color: gray;
    }
  `,
};

export default GroupIntro;
