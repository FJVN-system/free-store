import styled from "@emotion/styled";
import { useQuery } from "@tanstack/react-query";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  ColumnDef,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  ColumnFiltersState,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { GetShipping } from "../../api/shipping_api";
import { GetUser } from "../../api/user_api";
import Header from "../../components/header";
import ArrowDown from "../../components/icons/ArrowDown";
import ArrowUp from "../../components/icons/ArrowUp";
import Shipping from "../../components/shipping";
import ShippingItems from "../../components/shippingitem";
import { fuzzyFilter } from "../../components/tanstackTable/filter/fuzzyFilter";
import ProductRow from "../../components/tanstackTable/productListTable/productRow";

const ShippingContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #e5f1fc;
  height: 100vh;
`;

const TopContainer = styled.div``;
const BottomContainer = styled.div`
  display: flex;
`;

const ProductListContainer = styled.div`
  width: 100%;
  margin-top: 10px;
`;

const TitleContainer = styled.div`
  font-weight: bold;
  color: #152b7b;
  font-size: 30px;
  text-align: center;
`;

const TableContainer = styled.div`
  padding: 10px 10px;
  margin: 0px 20px 10px;
  border-radius: 5px;
  background-color: #fbfeff;
`;

const TotalPerPageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  color: gray;
  font-weight: bold;
  margin-top: 10px;
`;

const PerPage = styled.select`
  height: 25px;
  margin: 0px 5px;
  font-size: 18px;
  border-color: gray;
  background-color: transparent;
  color: #1b3d7c;
  outline: none;
  text-align: center;
`;

const Table = styled.table`
  width: 100%;
`;

const TableHeader = styled.tr`
  background-color: #152b7b;
  color: #ffffff;
  font-size: 18px;
`;

const TableHeaderCellWrapper = styled.th`
  padding: 3px 10px;
`;

const TableHeaderCell = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const TableRow = styled.tr<any>`
  border: 1px;
  background-color: transparent;
  text-align: center;
`;

const TableCell = styled.td<any>`
  padding: 5px 5px;
  border-bottom: 1px solid rgba(77, 130, 141, 0.2);
`;

const NavButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NavButton = styled.button`
  background-color: ${(props) => (props.disabled ? "gray" : "#152b7b")};
  color: ${(props) => (props.disabled ? "lightgray" : "white")};
  border: none;
  height: 26px;
  width: 30px;
  font-weight: bold;
`;

const NavText = styled.span`
  font-weight: bold;
  color: #1b3d7c;
  margin: 0px 5px;
`;
const NavInput = styled.input`
  border: 1px solid lightgray;
  height: 22px;
  width: 50px;
  text-align: center;
  font-size: medium;
  background-color: transparent;
  color: #1b3d7c;
  outline: none;
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  ::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export default function Shippings() {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const [globalFilter, setGlobalFilter] = useState("");

  const { data: userData } = useQuery(["user"], () => GetUser(22));

  const user = useMemo(() => userData || [], [userData]);

  const { data: shippingData, isLoading } = useQuery({
    queryKey: ["shippings"],
    queryFn: async () => {
      const data = await GetShipping(22222, 22);
      return data;
    },
    enabled: !!userData,
  });
  const data = useMemo(() => shippingData || [], [shippingData]);

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

  const [asd, setAsd] = useState(false);
  const handler = () => {
    setAsd(!asd);
  };

  // 데이터 초기화
  // @ts-ignore
  const table = useReactTable({
    data,
    columns,
    initialState: { pagination: { pageSize: 30 } },
    state: {
      columnFilters,
      globalFilter,
    },
    getCoreRowModel: getCoreRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    globalFilterFn: fuzzyFilter,
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: false,
  });
  return (
    <ShippingContainer>
      <TopContainer>
        <Header globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} />
      </TopContainer>
      <BottomContainer>
        {isLoading ? (
          // TODO 스켈레톤 or 로더
          "로딩중"
        ) : (
          <ProductListContainer>
            <TitleContainer>배송내역</TitleContainer>
            <TableContainer>
              <Table>
                <thead>
                  {table.getHeaderGroups().map((headerGroup: any) => (
                    <TableHeader key={headerGroup.id}>
                      {headerGroup.headers.map((header: any) => {
                        return (
                          <TableHeaderCellWrapper
                            key={header.id}
                            colSpan={header.colSpan}
                          >
                            {header.isPlaceholder ? null : (
                              <TableHeaderCell
                                {...{
                                  onClick:
                                    header.column.getToggleSortingHandler(),
                                }}
                              >
                                <div style={{ marginRight: "5px" }}>
                                  {flexRender(
                                    header.column.columnDef.header,
                                    header.getContext(),
                                  )}
                                </div>
                                {{
                                  asc: <ArrowDown />,
                                  desc: <ArrowUp />,
                                }[header.column.getIsSorted() as string] ?? (
                                  <ArrowDown />
                                )}
                              </TableHeaderCell>
                            )}
                          </TableHeaderCellWrapper>
                        );
                      })}
                      <TableHeaderCellWrapper>
                        <TableHeaderCell>비고</TableHeaderCell>
                      </TableHeaderCellWrapper>
                    </TableHeader>
                  ))}
                </thead>
                <tbody>
                  {table.getRowModel().rows.map((row: any) => (
                    <TableRow key={row.id} row={row}>
                      {row.getVisibleCells().map((cell: any) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </TableCell>
                      ))}
                      <TableCell>
                        <button type="button" onClick={handler}>
                          배송상품내용
                        </button>
                      </TableCell>
                      {asd && <ShippingItems />}
                    </TableRow>
                  ))}
                </tbody>
              </Table>
              <TotalPerPageContainer>
                <span>
                  {" "}
                  Total : {table.getPrePaginationRowModel().rows.length} 개 /
                  페이지 당{" "}
                </span>
                <PerPage
                  value={table.getState().pagination.pageSize}
                  onChange={(e) => {
                    table.setPageSize(Number(e.target.value));
                  }}
                >
                  {[30, 50, 100].map((pageSize) => (
                    <option key={pageSize} value={pageSize}>
                      {pageSize}
                    </option>
                  ))}
                </PerPage>
                개
              </TotalPerPageContainer>
              <NavButtonContainer>
                <NavButton
                  type="button"
                  onClick={() => table.setPageIndex(0)}
                  disabled={!table.getCanPreviousPage()}
                >
                  {"<<"}
                </NavButton>
                <NavButton
                  type="button"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  {"<"}
                </NavButton>
                <NavText>
                  {table.getState().pagination.pageIndex + 1} page of{" "}
                  {table.getPageCount()}
                </NavText>
                <span>
                  <NavInput
                    type="number"
                    defaultValue={table.getState().pagination.pageIndex + 1}
                    onChange={(e) => {
                      const page = e.target.value
                        ? Number(e.target.value) - 1
                        : 0;
                      table.setPageIndex(page);
                    }}
                  />
                </span>
                <NavButton
                  type="button"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                >
                  {">"}
                </NavButton>
                <NavButton
                  type="button"
                  onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                  disabled={!table.getCanNextPage()}
                >
                  {">>"}
                </NavButton>
              </NavButtonContainer>
            </TableContainer>
          </ProductListContainer>
        )}
      </BottomContainer>
    </ShippingContainer>
  );
}
