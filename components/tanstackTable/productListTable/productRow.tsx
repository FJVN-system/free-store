import styled from "@emotion/styled";
import { useQuery } from "@tanstack/react-query";
import { flexRender } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { GetUser } from "../../../api/user_api";
import { useAddCart } from "../../../query/cartitems";

const TableRow = styled.tr`
  border: 1px;
  background-color: transparent;
  text-align: center;
`;
const TableCell = styled.td<any>`
  padding: 5px 5px;
  border-bottom: 1px solid rgba(77, 130, 141, 0.2);
  justify-content: center;
`;

const AddCartInputContainer = styled.div`
  border: 1px solid #8f8f8fff;
  border-radius: 10px;
  padding: 3px;
`;
const AddCartInputInput = styled.input`
  border: none;
  outline: none;
  text-align: center;
  width: 100px;
`;
const AddCartInputButton = styled.button`
  border: none;
  padding: 5px 10px;
  font-size: 15px;
  border-radius: 10px;
  background-color: #152b7b;
  color: #ffffff;
  cursor: pointer;
`;

export default function ProductRow({ row }: any) {
  const [qty, setQty] = useState<any>("");
  const qtyHandler = (e: any) => {
    setQty(Number(e.target.value));
  };

  const { data: user } = useQuery(["user"], () => GetUser(22));

  // const data = { userId: user?.id, pocaId: row.original.id, qty };
  const data = { userId: 11111111, pocaId: row.original.id, qty };
  const {
    data: addData,
    isLoading,
    isSuccess: isAddSuccess,
    status: isAddStatus,
    mutateAsync: addCart,
  } = useAddCart(data);
  const addCartsItemsData = useMemo(() => addData || [], [addData]);

  const handleSubmit = () => {
    if (qty === "") {
      alert("올바를 수량을 써주세요.");
      return;
    }
    addCart();
    setQty("");
  };
  return (
    <TableRow key={row.id}>
      <div>썸네일</div>
      {row.getVisibleCells().map((cell: any) => {
        return (
          <TableCell key={cell.id}>
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </TableCell>
        );
      })}

      <TableCell style={{ display: "flex" }}>
        <AddCartInputContainer>
          <AddCartInputInput
            value={qty}
            type="number"
            onChange={(e) => qtyHandler(e)}
          />
          <AddCartInputButton type="button" onClick={() => handleSubmit()}>
            담기
          </AddCartInputButton>
        </AddCartInputContainer>
      </TableCell>
    </TableRow>
  );
}
