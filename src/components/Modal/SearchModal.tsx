import { styled } from "styled-components";
import SearchBar from "../../components/SearchBar/SearchBar";
import { useEffect, useState } from "react";
import { Card } from "../../components/Card/Card";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import useDebounce from "../../hooks/useDebounce";
import { modeNavigation } from "../../utils/modeUtils";
import AuthService from "../../utils/authService";
import { SearchApi } from "../../services/searchApi";
import { useSetRecoilState } from "recoil";
import { searchState } from "../../atom/atom";

interface IUser {
  message: string;
  num: number;
  result: string[];
}

const SearchModal = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [token] = AuthService.getTokenAndId();
  const setSearch = useSetRecoilState(searchState);
  const { data: users, refetch } = useQuery(
    ["searchUsers", name],
    () => SearchApi.SearchUsers(name, token),
    {
      enabled: false,
    }
  );

  const debouncedRefetch = useDebounce(() => {
    refetch();
  }, 1000);

  const onCardClicked = (id: string) => {
    setSearch(false);
    navigate(modeNavigation(`/home/album/${id}`));
  };

  useEffect(() => {
    if (name) {
      debouncedRefetch();
    }
  }, [name, debouncedRefetch]);

  return (
    <S.Container>
      <S.SearchBarWrapper>
        <SearchBar value={name} onChange={(e) => setName(e.target.value)} />
      </S.SearchBarWrapper>
      <S.ItemContainer>
        {name
          ? users?.data?.result?.map((info: any) => (
              <S.Item onClick={() => onCardClicked(info.id)}>
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
    z-index: 99;
    animation: slideDown 0.5s ease-out;

    @keyframes slideDown {
      from {
        transform: translateY(-100%);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }
  `,

  ItemContainer: styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    align-items: center;
    gap: 20px;
    width: 100%;
    height: 450px;
    background-color: ${(props) => props.theme.color.bgColor};
    overflow: auto;
    padding: 2rem 0;
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

  SearchBarWrapper: styled.div`
    width: 100%;
    border-bottom: 2px solid ${(props) => props.theme.color.navBorder};
  `,
};

export default SearchModal;
