import { styled } from "styled-components";
import { FlexColumnCenterCSS } from "../../../style/commonStyle";
import { media } from "../../../style/theme";

function IntroContent() {
  return (
    <S.Container>
      <S.Bold>About Bottles</S.Bold>
      <S.CenterAlignWrapper>
        Bottles는 익명 고민상담 SNS입니다.
        <br />
        우리들은 일상속에서 여러 고민을 마주합니다. <br />
        어떤 고민들은 쉽게 주변에 도움을 구할 수 있는 반면, <br />
        어떠한 고민들은 사회속에 여러 관계를 맺고 살아가는 우리에게 말못할
        속앓이로 남아버리고는 합니다. <br />
        이럴 때 우리는 Bottles를 이용하여 두가지의 다른 나를 분리하여 고민을
        상담 받을 수 있습니다.
        <br />
        일상의 나와 분리된 익명의 나를 이용해 보세요.
        <br />
        익명이 보장된 상태로 랜덤한 다수에게 본인의 고민을 전송하여 상담 받을 수
        있습니다. <br />
        또한 타인으로부터 익명의 게시글을 받고 익명 댓글로 조언을 해줄 수
        있습니다. <br /> <br /> Bottles에서 진솔한 고민을 나누어 보세요.
      </S.CenterAlignWrapper>

      <S.Bold>How to use</S.Bold>
      <S.CommonAlignWrapper>
        Bottles는 같은 기능을 두가지 분리된 ‘나’로서 사용 가능합니다.
        <br />
        <span>1. 일상 모드 활용 방법:</span>
        <br />
        1) 이미지와 텍스트로 게시글을 작성하여 일상 이야기를 나누세요. <br />
        2) 친구를 팔로우하고 팔로워를 늘려서 소통의 폭을 확장하세요. <br />
        3) 댓글과 채팅을 통해 다양한 의견과 조언을 얻을 수 있습니다.
        <br />
        <span>2. 익명 모드 활용 방법:</span>
        <br />
        1) 로고를 클릭하여 익명 모드로 전환하면 다른 사용자들에게 익명으로
        고민을 전송할 수 있습니다. <br />
        2) 남들의 익명 게시글에 댓글을 달고 조언을 제공할 수 있습니다. <br />
        3) 상대방과 익명 채팅을 통해 더 깊은 대화를 나눌 수 있습니다.
        <br />
      </S.CommonAlignWrapper>
      <S.Bold style={{ color: "red" }}>주의사항</S.Bold>
      <S.CenterAlignWrapper>
        1. 상호 존중과 이해를 기반으로 합니다. 모든 사용자들은 서로를 존중하며
        상호 이해의 공간을 만들어 나가야 합니다.
        <br />
        2. 익명성을 존중하면서도, 건설적이고 따뜻한 조언을 적극적으로
        공유해주세요. 모두가 함께 성장하는데 기여할 수 있는 가치 있는 의견을
        제시해 주세요.
        <br />
        3. 특히 익명 모드에서는 예민한 주제에 대한 더 큰 이해와 성숙한 응답이
        필요합니다. 예민한 주제에 대한 논의 시, 서로에게 더욱 신중한 접근을
        부탁드립니다.
        <br />
        <br />
        이러한 가이드라인을 준수하여, Bottles를 안전하고 따뜻한 공간으로 만들어
        나가기를 기대합니다.
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
    font-size: 15px;
    font-weight: bold;
    line-height: 1.5;

    padding: 5rem 0;
  `,

  CommonAlignWrapper: styled.div`
    font-size: 15px;
    font-weight: bold;
    line-height: 1.5;
    padding: 5rem 0;
    & > span {
      font-size: 17px;
    }
  `,
};

export default IntroContent;
