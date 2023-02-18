import { NextPage } from "next";
import styled from "@emotion/styled";
import Search from "../search";


const Header: NextPage<any> = ({ }: any) => {
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