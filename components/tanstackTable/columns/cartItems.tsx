import { ColumnDef } from "@tanstack/react-table";

export const cartItemsColumns: ColumnDef<any, any>[] = [
  {
    accessorFn: (row) => row.artist,
    id: "artist",
    header: "아티스트",
    cell: (info) => info.getValue(),
  },
  {
    accessorFn: (row) => row.member,
    id: "member",
    header: "맴버",
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
