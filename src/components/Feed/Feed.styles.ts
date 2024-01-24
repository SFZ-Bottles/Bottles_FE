import { styled } from "styled-components";
import { media } from "../../style/theme";

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
`;

export const AlbumContainer = styled.div`
  display: grid;
  padding-top: 40px;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  height: 100%;

  @media screen and (max-width: ${media.mobile}) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export const ImgDiv = styled.img`
  width: 25vw;
  height: 25vw;

  @media screen and (max-width: ${media.tablet}) {
    width: 40vw;
    height: 40vw;
  }

  @media screen and (max-width: ${media.mobile}) {
    width: 60vw;
    height: 60vw;
  }
`;
