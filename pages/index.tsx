import React from "react";
import Head from "next/head";
import { NextPage } from "next";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import { GetUsers } from "../api/user_api";
import Header from "../components/header";
import ProductList from "../components/productList";
import { useCreateUser } from "../query/users";

export async function getStaticProps() {
  const queryClient = new QueryClient()

  try {
    await Promise.all([
      queryClient.prefetchQuery(["users"], GetUsers)
    ]);
    return {
      props: {
        dehydratedState: dehydrate(queryClient),
      },
    };
  } catch (e) {
    console.log("index 페이지 try 에러", e)
    return {
      notFound: true,
    };
  } finally {
    queryClient.clear();
  }
}
const IndexPage: NextPage<any> = () => {
  const { data: usersData } = useQuery(['users'], GetUsers)
  const createUser = useCreateUser({ "userName": "affbcd" })

  return (
    <div>
      <Head>
        <title>Home page</title>
      </Head>
      <Header />
      {usersData && usersData?.map((user: any, i: any) => <span key={i}>{user.userName}</span>)}
      <button onClick={() => createUser.mutate()}>버튼</button>
      <ProductList />
    </div>
  );
};

export default IndexPage;
