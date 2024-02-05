import styled from "styled-components";
import { media } from "./theme";
import { FlexCenterCSS } from "./commonStyle";

export const ChoiceBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1.5rem;
  font-size: 2rem;
  padding-bottom: 3rem;
  border-bottom: 3px dashed black;
`;

export const TemplateContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
  padding-top: 30px;

  @media screen and (max-width: ${media.tablet}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const Template = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 130px;
  height: 150px;
  border: 2px solid black;
  position: relative;

  @media screen and (max-width: ${media.mobile}) {
    width: 100px;
    height: 100px;
  }
`;

export const Phrase = styled.div`
  font-size: 2rem;
`;

export const ModalContainer = styled.div`
  display: grid;
  min-width: 400px;
  min-height: 400px;

  & > :first-child {
    ${FlexCenterCSS}
    padding: 1rem 0;
    border-bottom: 2px solid gray;
    width: 100%;
    font-size: 1.5rem;
    font-weight: 700;
  }

  @media screen and (max-width: ${media.mobile}) {
    width: 80vw;
    height: 130vw;
    min-width: 100px;
    min-height: 250px;
  }
`;

export const ModalImgDiv = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;
