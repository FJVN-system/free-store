import styled from "@emotion/styled";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Search from "../icons/Search";
// import DebouncedInput from "../tanstackTable/debounceInput";

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  flex: 1;
`;

const TopContainer = styled.div`
  height: 126px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #152b7b;
`;

const CompanyLogo = styled.div`
  font-size: 36px;
  color: #ffffff;
  margin-left: 57px;
  font-weight: bold;
`;
const SearchInputContainer = styled.div`
  background-color: #ffffff;
  border: 1px lightgray solid;
  border-radius: 10px;
  display: flex;
  align-items: center;

  > svg {
    color: gray;
    height: 28px;
    padding-right: 32px;
  }
`;
const SearchInput = styled.input`
  border: none;
  height: 58px;
  width: 687px;
  font-size: 20px;
  border-radius: 10px;
  padding-left: 28px;
  outline: none;
`;

const LoginButton = styled.div`
  border: 1px #ffffff solid;
  color: #ffffff;
  border-radius: 10px;
  height: 40px;
  width: 120px;
  margin-right: 53px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BottomContainer = styled.div`
  height: 58px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  width: 100%;
  box-shadow: #6969692c 0px 3px 6px;
  margin-bottom: 10px;
`;

const MenuButton = styled.div`
  font-size: 24px;
  color: #152b7b;
  font-weight: bold;
  padding: 0px 100px;
  a {
    text-decoration: none;
    color: inherit;
  }
`;

function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <SearchInputContainer>
      <SearchInput
        {...props}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <Search />
    </SearchInputContainer>
  );
}

export default function Header({ globalFilter, setGlobalFilter }: any) {
  return (
    <HeaderContainer>
      <TopContainer>
        <CompanyLogo>회사 로고</CompanyLogo>
        <DebouncedInput
          value={globalFilter ?? ""}
          onChange={(value: any) => setGlobalFilter(String(value))}
          placeholder="Search"
        />
        <LoginButton>로그인</LoginButton>
      </TopContainer>
      <BottomContainer>
        <MenuButton>
          <Link href="/">홈</Link>
        </MenuButton>
        <MenuButton>
          <Link href="/orders">주문내역</Link>
        </MenuButton>
        <MenuButton>
          <Link href="/shippings">배송내역</Link>
        </MenuButton>
        <MenuButton>
          <Link href="/credit">크래딧</Link>
        </MenuButton>
      </BottomContainer>
    </HeaderContainer>
  );
}
