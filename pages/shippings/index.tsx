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
      )}
    </ShippingContainer>
  );
}
