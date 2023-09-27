import { styled } from "styled-components";
import SearchBar from "../../contents/SearchBar/SearchBar";
import { useEffect, useState } from "react";
import { getUserList } from "../../services/API";
import MemberCard from "../../components/MemberCard/MemberCard";

const SearchPage = () => {
  const [name, setName] = useState("");
  const [userList, setUserList] = useState([]);
  const getUsers = async () => {
    setUserList(await getUserList());
  };

  useEffect(() => {
    getUsers();
  },[name]);
  return (
    <S.Container>
      <SearchBar input={name} setInput={setName}/>
      <S.ItemContainer>
        {name ?
        userList.filter((value: any) => value.name.includes(name))?.map((info: any) => (
          <MemberCard info={info} onClick={() => {}}/>
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

}


export default SearchPage;