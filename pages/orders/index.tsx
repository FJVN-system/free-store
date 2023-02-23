import styled from "@emotion/styled";
import { useQuery } from "@tanstack/react-query";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  ColumnDef,
} from "@tanstack/react-table";
import { useMemo } from "react";
import { GetOrders } from "../../api/orders_api";
import { GetUser } from "../../api/user_api";

const OrdersContainer = styled.div`
  height: 200px;
  background-color: brown;
  flex: 0.3;
`;

export default function Orders() {
  const { data: user } = useQuery<any>(["user"], async () => {
    await GetUser(22);
  });

  const { data: ordersData } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const data = await GetOrders(user?.companyId, user?.id);
      return data;
    },
  });

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
    initialState: { pagination: { pageSize: 30 } },
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
      <div>
        <button
          type="button"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          {"<<"}
        </button>
        <button
          type="button"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {"<"}
        </button>
        <span>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </strong>
        </span>
        <span>
          <input
            type="number"
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
          />
        </span>
        <button
          type="button"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {">"}
        </button>
        <button
          type="button"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          {">>"}
        </button>

        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
        >
          {[30, 50, 100].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
        <span> 총 : {table.getPrePaginationRowModel().rows.length} 개</span>
      </div>
    </OrdersContainer>
  );
}
