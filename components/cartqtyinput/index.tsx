import styled from "@emotion/styled";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { GetUser } from "../../api/user_api";
import { useDeleteCart, useModifyCart } from "../../query/cartitems";

const CartQtyInputContainer = styled.td`
  display: flex;
`;

export default function CartQtyInput({ cell, flexRender }: any) {
  const { data: user } = useQuery(["user"], () => GetUser(22));
  const { mutate: deleteCart } = useDeleteCart();
  const { mutate: modifyCart } = useModifyCart();

  const [qty, setQty] = useState(cell.row.original.qty);

  const data = { usersId: user?.id, cartItemId: cell.row.original.id, qty };
  const handleCellValue = (e: any) => {
    setQty(Number(e.target.value));
  };

  const onDelete = (e: any) => {
    e.preventDefault();
    deleteCart(data);
  };

  const onModify = (e: any) => {
    e.preventDefault();
    modifyCart(data);
    setQty(data.qty);
  };

  return (
    <CartQtyInputContainer>
      <input type="numbur" value={qty} onChange={handleCellValue} />
      {flexRender(cell.column.columnDef.cell, cell.getContext())}
      <button type="button" onClick={onModify}>
        수정
      </button>
      <button type="button" onClick={onDelete}>
        삭제
      </button>
    </CartQtyInputContainer>
  );
}
