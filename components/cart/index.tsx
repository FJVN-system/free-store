import styled from "@emotion/styled";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  ColumnDef,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { GetCartItems } from "../../api/carts_api";
import CartQtyInput from "../cartqtyinput";

// type Person = {
//   firstName: string;
//   lastName: string;
//   age: number;
//   visits: number;
//   status: string;
//   progress: number;
// };

// const defaultData: Person[] = [
//   {
//     firstName: "tanner",
//     lastName: "linsley",
//     age: 24,
//     visits: 100,
//     status: "In Relationship",
//     progress: 50,
//   },
//   {
//     firstName: "tandy",
//     lastName: "miller",
//     age: 40,
//     visits: 40,
//     status: "Single",
//     progress: 80,
//   },
//   {
//     firstName: "joe",
//     lastName: "dirte",
//     age: 45,
//     visits: 20,
//     status: "Complicated",
//     progress: 10,
//   },
// ];

// const columnHelper = createColumnHelper<Person>();

// const columns: ColumnDef<Person, any>[] = [
//   columnHelper.accessor("firstName", {
//     cell: (info) => info.getValue(),
//     footer: (info) => info.column.id,
//   }),
//   columnHelper.accessor((row) => row.lastName, {
//     id: "lastName",
//     cell: (info) => <i>{info.getValue()}</i>,
//     header: () => <span>Last Name</span>,
//     footer: (info) => info.column.id,
//   }),
//   columnHelper.accessor("age", {
//     header: () => "Age",
//     cell: (info) => info.renderValue(),
//     footer: (info) => info.column.id,
//   }),
//   columnHelper.accessor("visits", {
//     header: () => <span>Visits</span>,
//     footer: (info) => info.column.id,
//   }),
//   columnHelper.accessor("status", {
//     header: "Status",
//     footer: (info) => info.column.id,
//   }),
//   columnHelper.accessor("progress", {
//     id: "progress",
//     header: "Profile Progress",
//     footer: (info) => info.column.id,
//   }),
// ];

const CartContainer = styled.div`
  height: 200px;
  background-color: brown;
  flex: 0.3;
`;

export async function getStaticProps() {
  const queryClient = new QueryClient();
  try {
    // await Promise.all([queryClient.prefetchQuery(["cartitems"], GetCartItems)]);
    await Promise.all([
      queryClient.prefetchQuery({
        queryKey: ["cartitems"],
        queryFn: async () => {
          const data = await GetCartItems(33);
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

export default function Cart() {
  const { data: cartItemsData } = useQuery({
    queryKey: ["cartitems"],
    queryFn: async () => {
      const data = await GetCartItems(33);
      return data;
    },
  });

  console.log("cartItemsData", cartItemsData);
  // 컬럼 선언 및 설정
  const columns = useMemo<ColumnDef<any, any>[]>(
    () => [
      {
        accessorFn: (row) => row.id,
        id: "id",
        header: "주문번호",
        cell: (info) => info.getValue(),
      },
      {
        accessorFn: (row) => row.productTitle,
        id: "productTitle",
        header: "productTitle",
        cell: (info) => info.getValue(),
      },
      {
        accessorFn: (row) => row.qty,
        id: "qty",
        header: "qty",
        cell: (info) => info.getValue(),
      },
      {
        accessorFn: (row) => row.price,
        id: "price",
        header: "price",
        cell: (info) => info.getValue(),
      },
    ],
    [],
  );

  // 데이터 초기화
  const data = useMemo(() => cartItemsData || [], [cartItemsData]);

  // @ts-ignore
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <CartContainer>
      장바구니
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) =>
                cell.column.id === "qty" ? (
                  <td key={cell.id}>
                    <CartQtyInput cell={cell} />
                  </td>
                ) : (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    원
                  </td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button type="button">주문하기</button>
      </div>
    </CartContainer>
  );
}
