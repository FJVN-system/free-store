import styled from "@emotion/styled";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import { GetProducts } from "../../api/products_api";

const ProductListContainer = styled.div`
  height: 30px;
  background-color: gray;
  padding: 2px;
`;

export async function getStaticProps() {
  const queryClient = new QueryClient();

  try {
    await Promise.all([queryClient.prefetchQuery(["products"], GetProducts)]);
    return {
      props: {
        dehydratedState: dehydrate(queryClient),
      },
    };
  } catch (e) {
    console.log("index 페이지 try 에러", e);
    return {
      notFound: true,
    };
  } finally {
    queryClient.clear();
  }
}

export default function ProductList() {
  const { data: productData } = useQuery(["products"], GetProducts);
  console.log("data", productData);
  return (
    <ProductListContainer>
      {productData?.map((product: any) => (
        <span key={product.id}>{product.title}</span>
      ))}
    </ProductListContainer>
  );
}
