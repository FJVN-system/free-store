import styled from "@emotion/styled";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { GetUser } from "../../api/user_api";
import { useDeleteCart, useModifyCart } from "../../query/cartitems";

const CartQtyInputContainer = styled.td`
  display: flex;
`;

export default function CartQtyInput({ cell }: any) {
  const { data: user } = useQuery(["user"], () => GetUser(22));
  const { mutate: deleteCart } = useDeleteCart();
  const { mutate: modifyCart, isSuccess, data: modifyData } = useModifyCart();

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
  };

  useEffect(() => {
    if (isSuccess) {
      setQty(modifyData.data.qty);
    }
    if (modifyData && modifyData.data && modifyData.data.errorMessage) {
      alert(modifyData.data.errorMessage);
      setQty(cell.row.original.qty);
    }
  }, [isSuccess, modifyData, cell]);

  return (
    <CartQtyInputContainer>
      <input type="numbur" value={qty} onChange={handleCellValue} />
      <button type="button" onClick={onModify}>
        수정
      </button>
      <button type="button" onClick={onDelete}>
        삭제
      </button>
    </CartQtyInputContainer>
  );
}
