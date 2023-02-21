import styled from "@emotion/styled";
import { useEffect, useState } from "react";

const CartQtyInputContainer = styled.td`
  display: flex;
`;

export default function CartQtyInput({ cell }: any) {
  const [cellValue, setCellValue] = useState(cell.getValue());
  const handleCellValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCellValue(event.currentTarget.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  useEffect(() => {
    setCellValue(cell.getValue());
  }, [cell]);

  return (
    <CartQtyInputContainer onSubmit={(e: any) => handleSubmit(e)}>
      <input type="numbur" value={cellValue} onChange={handleCellValue} />
      <button type="submit" onClick={handleSubmit}>
        수정
      </button>
    </CartQtyInputContainer>
  );
}
