import { ColumnDef } from "@tanstack/react-table";
import { fuzzySort } from "../sorter/fuzzySort";

export const productListColumns: ColumnDef<any, any>[] = [
  {
    accessorFn: (row) => row.artist,
    id: "artist",
    header: "Artist",
    cell: (info) => info.getValue(),
    filterFn: "fuzzy",
    sortingFn: fuzzySort,
  },
  {
    accessorFn: (row) => row.title,
    id: "title",
    header: "Title",
    cell: (info) => info.getValue(),
    filterFn: "fuzzy",
    sortingFn: fuzzySort,
  },
  {
    accessorFn: (row) => row.barcode,
    id: "barcode",
    header: "Barcode",
    cell: (info) => info.getValue(),
    filterFn: "fuzzy",
    sortingFn: fuzzySort,
  },
  {
    accessorFn: (row) => row.category,
    id: "category",
    header: "Category",
    cell: (info) => info.getValue(),
    filterFn: "fuzzy",
    sortingFn: fuzzySort,
  },
];
