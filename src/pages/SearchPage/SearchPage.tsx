import { styled } from "styled-components";
import SearchBar from "../../contents/SearchBar/SearchBar";
import { useEffect, useState } from "react";
import { getUserList } from "../../services/API";
import { Card } from "../../contents/Comment/Comment";

const SearchPage = () => {
  const [name, setName] = useState("");
  const [userList, setUserList] = useState([]);
  const getUsers = async () => {
    setUserList(await getUserList());
  };

  useEffect(() => {
    getUsers();
  },[]);

  return (
    <S.Container>
      <SearchBar input={name} setInput={setName}/>
      <S.ItemContainer>
        {name ?
        userList.filter((value: any) => value.name.includes(name))?.map((info: any) => (
          <S.Item>
            <Card>
              <Card.UserProfile src={null}/>
              <Card.UserId>
                {info.name} 
              </Card.UserId>
              <Card.UserDescribe>
                {info.info}
              </Card.UserDescribe>
            </Card>
          </S.Item>
        ))
      :
      null}
      </S.ItemContainer>
    </S.Container>
  );
};

const S = {
  Container: styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
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

  Item: styled.div`
  display: flex;
  align-items: center;
  width: 300px;
  height: 100px;
  border: 2px solid #D9D9D9;
  border-radius: 2rem;
  justify-content: space-between;
  padding: 0 20px;
  cursor: pointer;
  `,

}


export default SearchPage;