
import styled from 'styled-components';

export const HeaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #f0f0f0;
  padding: 10px;
  display: flex;
`;

export const HeaderItem = styled.div<{ isTitle?: boolean; isActive?: boolean }>`
  font-size: ${({ isTitle }) => (isTitle ? '40px' : '20px')};
  padding-top: ${({ isTitle }) => (isTitle ? '0px' : '20px')};
  padding-right: 30px;
  
  letter-spacing: ${({ isTitle }) => (isTitle ? '7px' : '0px')};
  cursor: pointer;
  margin-top:10px;
  margin-left:${({ isTitle }) => (isTitle ? '60px' : '10px')};

  ${({ isTitle }) => (isTitle ? 'font-weight: bold;' : '')}

  ${({ isActive }) => isActive && 'font-weight: bold;'} /* Apply bold style to active item */

  a {
    color: black; /* Set link color to black */
    text-decoration: none; /* Remove underlines from links */
    transition: font-weight 0.2s; /* Add a transition effect for font-weight change */

    &:hover {
      font-weight: bold; /* Change font-weight on hover */
    }
  } 
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
