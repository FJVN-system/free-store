import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteCartItem,
  addCartItems,
  getCartItems,
  modifyCartItem,
} from "../api/cartsItems_api";

export function useGetCartsItems(userId: any) {
  return useQuery({
    queryKey: ["cartsitems"],
    queryFn: async () => {
      const data = await getCartItems(userId);
      return data;
    },
    onError: (e) => console.log("e", e),
    enabled: !!userId,
  });
}

export const useAddCart = (payload: any) => {
  const queryClient = useQueryClient();
  return useMutation(() => addCartItems(payload), {
    onSuccess: () => queryClient.invalidateQueries(["cartsitems"]),
    onError: (e) => console.log(e),
    onSettled: (data, error, variables, context) => {
      if (data && data.data && data.data.errorMessage) {
        alert(data.data.errorMessage);
      }
    },
  });
};

export const useDeleteCart = (payload: any) => {
  const queryClient = useQueryClient();
  return useMutation(() => deleteCartItem(payload), {
    onSuccess: () => {
      queryClient.invalidateQueries(["cartsitems"]);
      alert("삭제했습니다");
    },
    onError: (e) => console.log(e),
    onSettled: (data, error, variables, context) => {
      if (data && data.data && data.data.errorMessage) {
        alert(data.data.errorMessage);
      }
      // console.log("data", data);
      // console.log("error", error);
      // console.log("variables", variables);
      // console.log("context", context);
    },
  });
};

export const useModifyCart = (payload: any) => {
  const queryClient = useQueryClient(); // queryClient는 전역변수이다. react-query로 불러온 모든 query를 관리가능하다.
  return useMutation(() => modifyCartItem(payload), {
    onSuccess: () => queryClient.invalidateQueries(["cartsitems"]),
    onError: (e) => console.log(e),
    onSettled: (data, error, variables, context) => {
      // console.log("data", data);
      // console.log("error", error);
      // console.log("variables", variables);
      // console.log("context", context);
    },
  });
};

// export async function UseGetCartItemsForStaticProps(userId: any) {
//   const queryClient = useQueryClient(); // queryClient는 전역변수이다. react-query로 불러온 모든 query를 관리가능하다.
//   try {
//     await Promise.all([
//       queryClient.prefetchQuery({
//         queryKey: ["cartitems"],
//         queryFn: async () => {
//           const data = await getCartItems(userId);
//           return data;
//         },
//       }),
//     ]);
//     return {
//       props: {
//         dehydratedState: dehydrate(queryClient),
//       },
//     };
//   } catch (e) {
//     console.log("index 페이지 try 에러", e);
//     return {
//       notFound: true,
//     };
//   } finally {
//     queryClient.clear();
//   }
// }
