import { styled } from "styled-components";
import { FlexCenterCSS, FlexColumnCenterCSS } from "../../style/commonStyle";
import { media } from "../../style/theme";
import { Link } from "react-router-dom";

export const Container = styled.div`
  position: fixed;
  ${FlexColumnCenterCSS};
  width: 100%;
  z-index: 3;
`;

export const ModalContainer = styled.div`
  ${FlexColumnCenterCSS};
  position: absolute;
`;

export const HeaderContainer = styled.div<{ $url: string }>`
  ${FlexCenterCSS}
  justify-content: start;
  font-size: 1.3rem;
  background-color: ${(props) => props.theme.color.bgColor};
  background-color: ${(props) =>
    props.$url === "/home/pin" ? "#555a5f" : props.theme.color.bgColor};
  height: 6rem;
  top: 0;
  left: 0;
  width: 100%;
  padding: 10px;
  gap: 3rem;
  border-bottom: 3px solid #d9d9d9;
  border-color: ${(props) => props.theme.color.navBorder};
  border-color: ${(props) =>
    props.$url === "/home/pin" ? "black" : props.theme.color.navBorder};
  z-index: 100;
  color: ${(props) => props.theme.color.fontColor};
  color: ${(props) =>
    props.$url === "/home/pin" ? "white" : props.theme.color.fontColor};

  & > :first-child {
    font-size: 2em;
    letter-spacing: 0.2em;
    font-weight: bold;
    cursor: pointer;
    padding-left: 1rem;

    @media screen and (max-width: 478px) {
      font-size: 1.3rem;
      padding-left: 0.5rem;
      margin-top: 0.6rem;
      gap: 1px;
      letter-spacing: 2px;
    }
  }

  & > :last-child {
    font-size: 1em;
    justify-content: flex-end;
    cursor: pointer;
    margin-left: auto;
    margin-right: 1em;
    margin-top: 30px;
    opacity: 0.5;

    @media screen and (max-width: ${media.mobile}) {
      display: none;
    }
  }

  @media screen and (max-width: ${media.tablet}) {
    gap: 1.5rem;
    font-size: 1rem;
  }

  @media screen and (max-width: 478px) {
    gap: 10px;
  }
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  text-decoration: none;
  transition: font-weight 0.2s;
  &:hover {
    font-weight: bold;
  }
`;

export const HeaderItem = styled.div<{ $active: boolean }>`
  ${FlexCenterCSS};
  padding-top: 15px;
  font-size: 0.8em;
  cursor: pointer;
  font-weight: ${(props) => (props.$active ? "bold" : "400")};
  &:hover {
    font-weight: 700;
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  opacity: 0.3;
  background-color: rgba(0, 0, 0, 0.3);
  width: 100%;
  height: 100%;
  z-index: 98;
`;
