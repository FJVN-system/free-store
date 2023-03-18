import styled from "@emotion/styled";
import React from "react";
import Header from "../header";

const LayoutContainer = styled.div`
  display: flex;
  flex: 1;
`;

export default function Layout({ children }: any) {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}
