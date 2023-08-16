import { styled } from "styled-components";
import SearchBar from "../../contents/SearchBar/SearchBar";
import { useState } from "react";

const SearchPage = () => {
  const [input, setInput] = useState("");
  return (
    <>
      <SearchBar input={input} setInput={setInput}/>
    </>
  );
};


export default SearchPage;