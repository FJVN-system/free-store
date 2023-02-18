import Head from "next/head";
import { GetStaticProps, NextPage } from "next";
import styled from "@emotion/styled";

// export const getStaticProps: GetStaticProps = async (_context) => {
  // fetch list of posts
//   const users = await GetUsers();
//   return {
//     props: {
//       userDataList: users,
//     },
//   };
// };
const Search: NextPage<any> = ({
  userDataList
}: any) => {
console.log("userDataList", userDataList)
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