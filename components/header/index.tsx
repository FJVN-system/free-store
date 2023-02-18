import { GetStaticProps, NextPage } from "next";
import styled from "@emotion/styled";
import Search from "../search";

// export const getStaticProps: GetStaticProps = async (_context) => {
// fetch list of posts
//   const users = await GetUsers();
//   return {
//     props: {
//       userDataList: users,
//     },
//   };
// };
const Header: NextPage<any> = ({
  userDataList
}: any) => {

  return (
    <HeaderContainer>

      <Search />

    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.div`
    height: 30px;
    background-color: gray;
    padding: 2px;
`