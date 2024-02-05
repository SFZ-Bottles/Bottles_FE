import { styled } from "styled-components";

export const Container = styled.div`
  display: flex;
  position: fixed;
  align-items: center;
  margin-top: 10px;
  width: inherit;
  z-index: 2;
  height: 90vh;
  border-right: 5px solid #d9d9d9;
  border-top: 3px solid #d9d9d9;
  border-color: ${(props) => props.theme.color.navBorder};
  background-color: ${(props) => props.theme.color.bgColor};
`;
