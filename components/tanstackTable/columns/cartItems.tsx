import { ColumnDef } from "@tanstack/react-table";

export const cartItemsColumns: ColumnDef<any, any>[] = [
  // {
  //   accessorFn: (row) => row.id,
  //   id: "id",
  //   header: "주문번호",
  //   cell: (info) => info.getValue(),
  // },
  {
    accessorFn: (row) => row.productTitle,
    id: "productTitle",
    header: "상품명",
    cell: (info) => info.getValue(),
  },
  {
    accessorFn: (row) => row.price,
    id: "price",
    header: "가격",
    cell: (info) => info.getValue(),
  },
  {
    accessorFn: (row) => row.qty,
    id: "qty",
    header: "수량",
    cell: (info) => info.getValue(),
  },
];
