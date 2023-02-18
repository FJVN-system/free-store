import Head from "next/head";
import { GetStaticProps, NextPage } from "next";
import Post from "../components/post";
import { PostData, PostDataListProps } from "../types/postdata";
import { GetPosts } from "../api/postdata_api";
import { globalStyles } from "../global";
import { GetUsers } from "../api/user_api";

export const getStaticProps: GetStaticProps = async (_context) => {
  // fetch list of posts
  const posts: PostData[] = await GetPosts();
  const users = await GetUsers();
  return {
    props: {
      postDataList: posts,
      userDataList: users,
    },
  };
};
const IndexPage: NextPage<any> = ({
  postDataList,userDataList
}: any) => {

  return (
    <>
    {globalStyles}
    <div>
      <Head>
        <title>Home page</title>
      </Head>

      <h1>List of posts</h1>
      <h1>한글</h1>
      <section>
        {postDataList.map((post: PostData) => (
          <Post {...post} key={post.id} />
        ))}
      </section>
    </div>
    </>
  );
};

export default IndexPage;
