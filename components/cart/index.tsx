import styled from "@emotion/styled";
import { useQuery } from "@tanstack/react-query";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useMemo } from "react";
import { GetUser } from "../../api/user_api";
import { useGetCartItems } from "../../query/cartitems";
import { useCreateOrder } from "../../query/order";
import CartQtyInput from "../cartqtyinput";
import ArrowDown from "../icons/ArrowDown";
import ArrowUp from "../icons/ArrowUp";
import { cartItemsColumns } from "../tanstackTable/columns/cartItems";

const CartContainer = styled.div`
  margin-top: 10px;
`;
const TitleContainer = styled.div`
  text-align: center;
  font-size: 30px;
  font-weight: bold;
  color: #152b7b;
`;
const TableContainer = styled.div`
  padding: 10px 10px;
  margin-right: 20px;
  border-radius: 5px;
  background-color: #fbfeff;
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

const EmptyText = styled.div`
  background-color: #e8e8e8;
  padding: 20px 20px;
  margin: 0px 2px;
  text-align: center;
  font-weight: bold;
`;

const TableRow = styled.tr`
  border: 1px;
  background-color: transparent;
  text-align: center;
`;

const TableCell = styled.td<any>`
  padding: 5px 0px;
  border-bottom: 1px solid rgba(77, 130, 141, 0.2);
  color: #1b3d7c;
  font-weight: bold;
  font-size: 18px;
`;

const OrderButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const OrderButton = styled.button`
  border: none;
  padding: 20px 40px;
  font-size: 20px;
  border-radius: 10px;
  background-color: #152b7b;
  color: #ffffff;
  cursor: pointer;
`;

export default function Cart() {
  // TODO 로그인 후 처리
  const { data: user } = useQuery(["user"], () => GetUser(22));

  const { data: cartItemsData, isLoading } = useGetCartItems(user?.id);

  // 데이터 초기화
  const data = useMemo(() => cartItemsData || [], [cartItemsData]);
  const columns = useMemo(() => cartItemsColumns || [], []);

  // @ts-ignore
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const { mutate: createOrder, isSuccess, data: succesData } = useCreateOrder();

  const onSubmit = () => {
    createOrder(user.id);
  };

  useEffect(() => {
    if (succesData && succesData.data && succesData.data.errorMessage) {
      alert(succesData.data.errorMessage);
    } else if (isSuccess) {
      alert(
        `${succesData.data.itemCount} 종류의 상품, ${succesData.data.itemQty} 개의 상품, 총 ${succesData.data.totalPrice}원의 상품이 주문되었습니다`,
      );
    }
  }, [isSuccess, succesData]);

  return (
    <CartContainer>
      <TitleContainer>장바구니</TitleContainer>
      {isLoading ? (
        "로딩중"
      ) : (
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
                              onClick: header.column.getToggleSortingHandler(),
                            }}
                          >
                            <div style={{ marginRight: "10px" }}>
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
                  <TableHeaderCell>총액</TableHeaderCell>
                </TableHeader>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row
                    .getVisibleCells()
                    .map((cell) =>
                      cell.column.id === "qty" ? (
                        <CartQtyInput
                          key={cell.id}
                          cell={cell}
                          flexRender={flexRender}
                        />
                      ) : (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </TableCell>
                      ),
                    )}
                  <TableCell>{row.original.price * row.original.qty}</TableCell>
                </TableRow>
              ))}
            </tbody>
            {/* )} */}
          </Table>
          {table.getRowModel().rows.length < 1 && (
            <EmptyText>장바구니가 비었습니다</EmptyText>
          )}
        </TableContainer>
      )}

      <OrderButtonContainer>
        <OrderButton type="button" onClick={() => onSubmit()}>
          주문하기
        </OrderButton>
      </OrderButtonContainer>
    </CartContainer>
  );
}
