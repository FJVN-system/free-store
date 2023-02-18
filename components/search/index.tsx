import { NextPage } from "next";
import styled from "@emotion/styled";

const Search: NextPage<any> = ({ }: any) => {
  return (
    <SearchContainer />
  );
};

export default Search;

const SearchContainer = styled.div`
    background-color: white;
    border-radius: 15px;
    height: 100%;
    width: 200px;
`