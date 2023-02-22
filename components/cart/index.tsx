import styled from "@emotion/styled";
import { useQuery } from "@tanstack/react-query";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useMemo } from "react";
import { GetUser } from "../../api/user_api";
import {
  useGetCartItems,
  UseGetCartItemsForStaticProps,
} from "../../query/cartitems";
import { useCreateOrder } from "../../query/order";
import CartQtyInput from "../cartqtyinput";
import { cartItemsColumns } from "../tanstackTable/columns/cartItems";

const CartContainer = styled.div`
  height: 200px;
  background-color: brown;
  flex: 0.3;
`;

export async function getStaticProps() {
  await UseGetCartItemsForStaticProps(22);
}

export default function Cart() {
  // TODO 로그인 후 처리
  const { data: user } = useQuery(["user"], () => GetUser(22));

  // const userId = user?.id;
  const { data: cartItemsData } = useGetCartItems(user?.id);

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
      장바구니
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
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ),
                )}
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button type="button" onClick={() => onSubmit()}>
          주문하기
        </button>
      </div>
    </CartContainer>
  );
}
