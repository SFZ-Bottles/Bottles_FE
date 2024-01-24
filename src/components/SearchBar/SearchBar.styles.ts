import { styled } from "styled-components";
import { media } from "../../style/theme";

export const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100px;
  background-color: ${(props) => props.theme.color.bgColor};
`;

export const SearchDiv = styled.div`
  display: flex;
  align-items: center;
  min-width: 200px;
  position: relative;
  padding: 0 2rem;

  @media screen and (max-width: ${media.mobile}) {
    width: 100px;
  }
`;

export const SearchIcon = styled.div`
  display: flex;
  position: absolute;
  width: 1rem;
  height: 1rem;
  left: 9%;
  background-size: cover;
  background-image: url("/img/search.svg");

  @media screen and (max-width: ${media.mobile}) {
    left: 0;
  }
`;
