import styled from "@emotion/styled";
import {
  useReactTable,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  getPaginationRowModel,
  getSortedRowModel,
  ColumnDef,
  flexRender,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import Cart from "../components/cart";
import Header from "../components/header";
import { fuzzyFilter } from "../components/tanstackTable/filter/fuzzyFilter";
import { pocaListColumns } from "../components/tanstackTable/columns/pocaList";
import { GetUser } from "../api/user_api";
import ArrowDown from "../components/icons/ArrowDown";
import ArrowUp from "../components/icons/ArrowUp";
import Filter from "../components/tanstackTable/filter/Filter";
import ProductRow from "../components/tanstackTable/productListTable/productRow";
import { useGetPocas } from "../query/poca";

const BodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #e5f1fc;
  height: 100vh;
`;
const TopContainer = styled.div``;
const BottomContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const CartContainer = styled.div`
  flex: 0.3;
`;

const ProductListContainer = styled.div`
  flex: 0.7;
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

export default function IndexPage() {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const { data: user } = useQuery(["user"], () => GetUser(22));

  const { data: pocaData, isLoading } = useGetPocas();

  // 데이터 초기화
  const data = useMemo(() => pocaData || [], [pocaData]);

  const columns = useMemo<ColumnDef<any, any>[]>(() => pocaListColumns, []);

  // 테이블 훅
  const table = useReactTable<any>({
    data,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: {
      columnFilters,
      globalFilter,
    },
    initialState: { pagination: { pageSize: 30 } },
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    getCoreRowModel: getCoreRowModel(),
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
    <BodyContainer>
      <TopContainer>
        <Header globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} />
      </TopContainer>
      <BottomContainer>
        {isLoading ? (
          // TODO 스켈레톤 or 로더
          "로딩중"
        ) : (
          <ProductListContainer>
            <TitleContainer>상품</TitleContainer>
            <TableContainer>
              <Table>
                <thead>
                  {table.getHeaderGroups().map((headerGroup: any) => (
                    <TableHeader key={headerGroup.id}>
                      <TableHeaderCellWrapper>
                        <TableHeaderCell>사진</TableHeaderCell>
                      </TableHeaderCellWrapper>
                      {headerGroup.headers.map((header: any) => {
                        return (
                          <TableHeaderCellWrapper
                            key={header.id}
                            colSpan={header.colSpan}
                          >
                            {header.isPlaceholder ? null : (
                              <>
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
                                {header.id === "nickname" &&
                                header.column.getCanFilter() ? (
                                  <Filter
                                    column={header.column}
                                    table={table}
                                  />
                                ) : null}
                              </>
                            )}
                          </TableHeaderCellWrapper>
                        );
                      })}
                      <TableHeaderCellWrapper>
                        <TableHeaderCell>장바구니</TableHeaderCell>
                      </TableHeaderCellWrapper>
                    </TableHeader>
                  ))}
                </thead>
                <tbody>
                  {table.getRowModel().rows.map((row: any) => {
                    return (
                      <ProductRow key={row.id} row={row}>
                        {row.getVisibleCells().map((cell: any) => {
                          return (
                            <TableCell key={cell.id} cell={cell}>
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext(),
                              )}
                            </TableCell>
                          );
                        })}
                      </ProductRow>
                    );
                  })}
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
        <CartContainer>
          <Cart />
        </CartContainer>
      </BottomContainer>
    </BodyContainer>
  );
}
