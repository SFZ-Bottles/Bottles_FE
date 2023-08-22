import styled from 'styled-components';

export const SideBar = styled.div`
  position: fixed;
  top: 100px; 
  left: 0;
  width: 250px; 
  height: calc(100vh - 100px); 
  background-color: #f0f0f0;
  border-right: 3px solid lightgray;
  display: flex;
  justify-content: center;
  `;

export const SidebarList = styled.ul`
  list-style: none;
  margin: 150px 0px;
  
`;

export const SidebarItem = styled.li<{ isActive?: boolean }>`
  font-size: 25px;
  margin: 0;
  padding: 20px;
  
  
  a {
    color: black;
    text-decoration: none;
  }
`;

export const PageContainer = styled.div`
  position: fixed;
  left: 300px;
  top: 120px;
  width: 330px;
  height: calc(100vh - 100px);
  display: flex;
  flex-direction: column;
`;

export const ProfileList = styled.div`
  list-style: none;
  margin: 0px 0px;
`;

export const ProfileItem = styled.div`
  font-size: 25px;
  font-weight: bold;
  color: black;
  margin-bottom:30px;
`




 