import styled from "@emotion/styled";
import { useQuery } from "@tanstack/react-query";
import { flexRender } from "@tanstack/react-table";
import { useState } from "react";
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
`;
export default function ProductRow({ row }: any) {
  const [qty, setQty] = useState<any>("");
  const qtyHandler = (e: any) => {
    setQty(Number(e.target.value));
  };
  // TODO 성능개선 : 유저아이디랑 핸들 섬밋은 부모로부터?

  const { data: user } = useQuery(["user"], () => GetUser(22));

  const data = { usersId: user?.id, productId: row.original.id, qty };
  const { mutate: addCart } = useAddCart();

  const handleSubmit = () => {
    if (qty === "") {
      alert("올바를 숫자를 써줘");
      return;
    }
    addCart(data);
    setQty("");
  };
  return (
    <TableRow key={row.id}>
      {row.getVisibleCells().map((cell: any) => {
        return (
          <TableCell key={cell.id}>
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </TableCell>
        );
      })}

      <TableCell style={{ display: "flex" }}>
        <input value={qty} type="number" onChange={(e) => qtyHandler(e)} />
        <button type="button" onClick={() => handleSubmit()}>
          담기
        </button>
      </TableCell>
    </TableRow>
  );
}
