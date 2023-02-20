import styled from "@emotion/styled";
import { useQuery } from "@tanstack/react-query";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  ColumnDef,
} from "@tanstack/react-table";
import { useMemo } from "react";
import { GetShipping } from "../../api/shipping_api";
import Shipping from "../../components/shipping";
import ShippingItems from "../../components/shippingitem";

const ShippingContainer = styled.div`
  height: 200px;
  background-color: brown;
  flex: 0.3;
`;

export default function Shippings() {
  const {
    data: shippingData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["shippings"],
    queryFn: async () => {
      const data = await GetShipping("inter-qwe", 22);
      return data;
    },
  });

  console.log("shippingData", shippingData);

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
        accessorFn: (row) => row.shippedAddressName,
        id: "shippedAddressName",
        header: "배송지이름",
        cell: (info) => info.getValue(),
      },
      {
        accessorFn: (row) => row.shippingType,
        id: "shippingType",
        header: "배송사",
        cell: (info) => info.getValue(),
      },
      {
        accessorFn: (row) => row.totalPrice,
        id: "totalPrice",
        header: "총액",
        cell: (info) => info.getValue(),
      },
    ],
    [],
  );

  // 데이터 초기화
  const data = useMemo(() => shippingData || [], [shippingData]);
  // @ts-ignore
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <ShippingContainer>
      {isLoading && "로딩중"}
      {isError && "에러"}
      {shippingData && (
        <>
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
                  <Shipping row={row} flexRender={flexRender} />
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
            <span> 총 : {table.getRowModel().rows.length} 개</span>
          </div>
        </>
      )}
    </ShippingContainer>
  );
}
