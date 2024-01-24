import { styled } from "styled-components";
import SearchBar from "../../components/SearchBar/SearchBar";
import { useEffect, useState } from "react";
import { Card } from "../../components/Card/Card";
import { useQuery } from "react-query";
import { getSearchedUsers } from "../../services/API";
import { useNavigate } from "react-router-dom";
import useDebounce from "../../hooks/useDebounce";
import { modeNavigation } from "../../utils/modeUtils";

interface IUser {
  message: string;
  num: number;
  result: string[];
}

const SearchPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const { data, refetch } = useQuery<IUser>(
    ["searchUsers", name],
    () => getSearchedUsers(name),
    {
      enabled: false,
    }
  );

  const debouncedRefetch = useDebounce(() => {
    refetch();
  }, 1000);

  useEffect(() => {
    if (name) {
      debouncedRefetch();
    }
  }, [name, debouncedRefetch]);

  return (
    <S.Container>
      <SearchBar value={name} onChange={(e) => setName(e.target.value)} />
      <S.ItemContainer>
        {name
          ? data?.result?.map((info: any) => (
              <S.Item
                onClick={() =>
                  navigate(modeNavigation(`/home/album/${info.id}`))
                }
              >
                <Card>
                  <Card.UserProfile src={info.avatar} />
                  <Card.UserId>{info.id}</Card.UserId>
                  <Card.UserDescribe>{info.info}</Card.UserDescribe>
                </Card>
              </S.Item>
            ))
          : null}
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
    border: 2px solid #d9d9d9;
    border-radius: 2rem;
    justify-content: space-between;
    padding: 0 20px;
    cursor: pointer;
  `,
};

export default SearchPage;
