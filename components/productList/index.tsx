import { NextPage } from "next";
import styled from "@emotion/styled";
import { GetProducts } from "../../api/products_api";
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';

export async function getStaticProps() {
  const queryClient = new QueryClient()

  try {
    await Promise.all([
      queryClient.prefetchQuery(["products"], GetProducts),
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

const ProductList: NextPage<any> = ({ }: any) => {
  const { data: productData } = useQuery(['products'], GetProducts)
  return (
    <ProductListContainer>
      {productData?.map((product: any, i: any) =>
        <span key={i}>{product.title}</span>
      )}
    </ProductListContainer>
  );
};

export default ProductList;

const ProductListContainer = styled.div`
    height: 30px;
    background-color: gray;
    padding: 2px;
`