import styled from "styled-components";

export const HeaderContainer = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  background-color: ${(props) => props.theme.color.bgColor};
  height: 6rem;
  top: 0;
  left: 0;
  width: 100%;
  padding: 10px;
  gap: 3rem;
  z-index: 2;
  border-bottom: 3px solid #d9d9d9;
  border-color: ${(props) => props.theme.color.navBorder};
`;

export const HeaderItem = styled.div<{ $active: boolean }>`
  display: flex;
  justify-content: center;
  padding-top: 15px;
  align-items: center;
  font-size: 20px;
  cursor: pointer;
  font-weight: ${(props) => (props.$active ? "bold" : "400")};
`;

export const Logo = styled.div`
  font-size: 40px;
  letter-spacing: 10px;
  font-weight: bold;
  cursor: pointer;
  padding-left: 1rem;
`;

export const LogoutItem = styled.div`
  font-size: 18px;
  justify-content: flex-end;
  cursor: pointer;
  margin-left: auto;
  margin-right: 80px;
  margin-top: 30px;
  opacity: 0.5;
`;

export const ImageContainer = styled.div`
  width: 200px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
