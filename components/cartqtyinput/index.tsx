import styled from "@emotion/styled";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { GetUser } from "../../api/user_api";
import { useDeleteCart, useModifyCart } from "../../query/cartitems";

const CartQtyInputContainer = styled.div`
  border: 1px solid #8f8f8fff;
  border-radius: 10px;
  padding: 3px;
  width: 250px;
  margin: 0 auto;
`;
const CartInput = styled.input`
  border: none;
  outline: none;
  text-align: center;
  width: 100px;
`;

const CartRowButton = styled.button`
  border: none;
  padding: 5px 10px;
  margin-right: 5px;
  font-size: 15px;
  border-radius: 10px;
  background-color: #152b7b;
  color: #ffffff;
  cursor: pointer;
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
      <CartInput type="numbur" value={qty} onChange={handleCellValue} />
      <CartRowButton type="button" onClick={onModify}>
        수정
      </CartRowButton>
      <CartRowButton type="button" onClick={onDelete}>
        삭제
      </CartRowButton>
    </CartQtyInputContainer>
  );
}
