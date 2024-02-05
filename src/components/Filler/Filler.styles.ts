import { styled } from "styled-components";
import { FlexColumnCenterCSS } from "../../style/commonStyle";

export const Wrapper = styled.div`
  ${FlexColumnCenterCSS}
  width: 100%;
  min-height: 80vh;
`;

export const EmptySpace = styled.div`
  text-align: center;
  padding: 20px;
`;

export const MyText = styled.p`
  font-size: 40px;
  padding-bottom: 20px;
  color: ${(props) => props.theme.fontColor};
`;

export const Text = styled.p`
  font-size: 25px;
  padding: 10px;
  color: grey;
`;
