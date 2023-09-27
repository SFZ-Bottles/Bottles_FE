import styled from 'styled-components';

export const HeaderContainer = styled.div`
  position: fixed;
  display: flex;
  background-color: ${(props) => props.theme.color.bgColor};
  height: 90px;
  top: 0;
  left: 0;
  width: 100%;  
  padding: 10px;
  border-bottom: 3px solid #D9D9D9;
  border-color: ${props => props.theme.color.navBorder};
`;

export const HeaderItem = styled.div<{ title: boolean, active: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${({ title }) => (title ? '40px' : '20px')};
  padding-top: ${({ title }) => (title ? '0px' : '10px')};
  padding-right: 30px;
  
  letter-spacing: ${({ title }) => (title ? '7px' : '0px')};
  cursor: pointer;
  margin-top:10px;
  margin-left:${({ title }) => (title ? '60px' : '10px')};

  ${({ title }) => (title ? 'font-weight: bold;' : '')}

  ${({ active }) => active && 'font-weight: bold;'}
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

export const PageContainer = styled.div`
  padding-top: 130px; /* To push the content below the fixed header */
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
`;

export const ImageContainer = styled.div`
  width: 200px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const GrayCircle = styled.div`
  width: 150px;
  height: 150px;
  background-color: lightgray;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  position: relative;
`;

export const UserText = styled.span`
  font-size: 35px;
  font-weight: bold;
  color: black;
`;

export const Introduction  = styled.span`
  font-size: 35px;
  font-weight: bold;
  color: lightgray;
`;
