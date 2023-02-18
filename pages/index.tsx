import Head from "next/head";
import { GetStaticProps, NextPage } from "next";
import { PostData } from "../types/postdata";
import { GetPosts } from "../api/postdata_api";
import { globalStyles } from "../global";
import { GetUsers } from "../api/user_api";
import Header from "../components/header";
import ProductList from "../components/productList";

export const getStaticProps: GetStaticProps = async () => {
  // fetch list of posts
  const posts: PostData[] = await GetPosts();
  const users = await GetUsers();
  // const products = await GetProducts();
  return {
    props: {
      postDataList: posts,
      userDataList: users,
      // productsDataList: products,
    },
  };
};
const IndexPage: NextPage<any> = ({
  postDataList, userDataList
}: any) => {
  console.log("postDataList", postDataList)
  console.log("userDataList", userDataList)
  return (
    <>
      {globalStyles}
      <div>
        <Head>
          <title>Home page</title>
        </Head>
        <Header />
        <ProductList />
        만수형 바보

        {/* // {postDataList.map((post: PostData) => (
        //   <Post {...post} key={post.id} />
        // ))} */}

      </div>
    </>
  );
};

export default IndexPage;
