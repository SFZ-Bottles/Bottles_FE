import { useLocation } from "react-router-dom";
import SideBar from "../../components/SideBar/SideBar";
import { styled } from "styled-components";
import { useState } from "react";

const data = [
  {
    name: "dddcat",
    info: "I\'m a catttt"
  },
  {
    name: "ddd_Kang",
    info: "ma fxxking life"
  },
  {
    name: "ddd:)bbb",
    info: "."
  },
  {
    name: "dddoooggg",
    info: "mungmung"
  },
  {
    name: "example1",
    info: "..!"
  },
  {
    name: "example2",
    info: ".!"
  },
]

const MessagePage = () => {
  const [chatPerson, setChatPerson] = useState(data[0]);

  const onClickRoom = (idx: number) => {
    setChatPerson(data[idx]);
  };
  
  return (
    <S.Container>
      <SideBar>
        <S.ItemContainer>
          {data.map((item, index) => 
            <S.Item onClick={() => onClickRoom(index)}>
              <S.UserContainer>
                <S.Profile/>
                <S.UserDiv>
                  <S.UserName>
                    {item.name}
                  </S.UserName>
                  <S.UserInfo>
                    {item.info}
                  </S.UserInfo>
                </S.UserDiv>
              </S.UserContainer>
              <S.Message src="/img/message.svg"/>
            </S.Item>
          )}
        </S.ItemContainer>
      </SideBar>
      <S.ContentContainer>
        <S.ChatProfileDiv>
          <S.Profile/>
          <S.UserName>
            {chatPerson.name}
          </S.UserName>
        </S.ChatProfileDiv>
      </S.ContentContainer>
    </S.Container>
  );
};

const S = {
  Container: styled.div`
    display: flex;
    width: 100%;
    height: 100%;  
  `,

  ItemContainer: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    width: 450px;
    height: 100%;
    overflow: auto;
  `,

  UserContainer: styled.div`
    display: flex;
  `,

  ContentContainer: styled.div`
    display: flex;
    width: 100%;
    padding-top: 20px;
    padding-left: 460px;
    border-bottom: 2px solid #D9D9D9;
    border-color: ${props => props.theme.color.chatBorder}
  `,

  UserDiv: styled.div`
    display: flex;
    padding: 10px;
    flex-direction: column;
  `,

  UserName: styled.div`
    font-size: 1.5rem;
    font-weight: 700;
  `,

  UserInfo: styled.div`
    font-size: 1rem;
    color: #918f8f;
  `,

  Profile: styled.img`
    width: 70px;
    height: 70px;
    border: 2px solid #D9D9D9;
    border-radius: 40px;
    background-color: #9e9d9d;
  `,

  Item: styled.div`
    display: flex;
    align-items: center;
    width: 370px;
    height: 100px;
    border: 2px solid #D9D9D9;
    border-radius: 2rem;
    justify-content: space-between;
    padding: 0 20px;
    cursor: pointer;
  `,

  Message: styled.img`  
    width: 50px;
    height: 50px;
  `,

  ChatProfileDiv: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 160px;
  `
}

export default MessagePage;
