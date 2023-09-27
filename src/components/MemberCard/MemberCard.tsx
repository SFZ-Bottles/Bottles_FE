import { styled } from "styled-components";

function MemberCard({info, onClick}: any){
    return(
        <S.Item onClick={onClick}>
          <S.UserContainer>
            <S.Profile/>
            <S.UserDiv>
                <S.UserName>
                    {info?.name}
                </S.UserName>
                <S.UserInfo>
                    {info?.info}
                </S.UserInfo>
            </S.UserDiv>
          </S.UserContainer>
            <S.Message src="/img/message.svg"/>
        </S.Item>
    )
}

const S = {
  UserContainer: styled.div`
    display: flex;
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
}

export default MemberCard;