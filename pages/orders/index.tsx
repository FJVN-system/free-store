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
import { GetOrders } from "../../api/orders_api";

const OrdersContainer = styled.div`
  height: 200px;
  background-color: brown;
  flex: 0.3;
`;

export default function Orders() {
  const { data: ordersData } = useQuery(["orders"], GetOrders);

  console.log("orders", ordersData);
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
  const data = useMemo(() => ordersData || [], [ordersData]);

  // @ts-ignore
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <OrdersContainer>
      주문내역
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
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </OrdersContainer>
  );
}
