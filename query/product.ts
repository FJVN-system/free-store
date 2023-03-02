import { dehydrate, useQuery, useQueryClient } from "@tanstack/react-query";
import { GetProducts, GetProductsByCategory } from "../api/products_api";

export const useGetProducts = (companyId: any) => {
  return useQuery({
    queryKey: ["products"],
    queryFn: () => {
      const data = GetProducts(companyId);
      return data;
    },
    onError: (e) => {
      console.log("e", e);
    },
    enabled: !!companyId,
  });
};

export const useGetProductsByCategory = (companyId: any, category: any) => {
  return useQuery({
    queryKey: ["productsByCategory"],
    queryFn: async () => {
      const data = await GetProductsByCategory(companyId, category);
      return data;
    },
    onError: (e) => {
      console.log("e", e);
    },
    enabled: !!companyId,
  });
};

export async function UseGetProductsForStaticProps(companyId: any) {
  const queryClient = useQueryClient(); // queryClient는 전역변수이다. react-query로 불러온 모든 query를 관리가능하다.
  try {
    await Promise.all([
      queryClient.prefetchQuery({
        queryKey: ["products"],
        queryFn: async () => {
          const data = await GetProducts(companyId);
          return data;
        },
      }),
    ]);
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
