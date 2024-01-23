import { styled } from "styled-components";
import { FlexCenterCSS } from "../../style/commonStyle";
import { media } from "../../style/theme";

function ToggleButton() {
  return (
    <S.ButtonWrapper>
      <img src="/img/menu.png" alt="메뉴버튼" />
    </S.ButtonWrapper>
  );
}

const S = {
  ButtonWrapper: styled.div`
    ${FlexCenterCSS}
    border: 2px solid gray;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    background-color: white;
  `,
};

export default ToggleButton;
