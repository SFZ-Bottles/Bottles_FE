import { styled } from "styled-components";
import { FlexColumnCenterCSS } from "../../style/commonStyle";

export const Wrapper = styled.div`
  ${FlexColumnCenterCSS}
  width: 100%;
  height: 100%;
`;

export const EmptySpace = styled.div`
  text-align: center;
  padding: 20px;
`;

export const ImageContainer = styled.div`
  margin-top: 100px;
`;

export const MyText = styled.p`
  font-size: 40px;
  padding-bottom: 20px;
  color: #333;
`;

export const Text = styled.p`
  font-size: 25px;
  padding: 10px;
  color: grey;
`;
