import { flexRender } from "@tanstack/react-table";
import React, { useState } from "react";
import ShippingItems from "../shippingitem";

export default function Shipping({ row }: any) {
  const [asd, setAsd] = useState(false);
  const handler = () => {
    setAsd(!asd);
  };
  return (
    <tr>
      {row.getVisibleCells().map((cell: any) => (
        <td key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </td>
      ))}
      <td>
        <button type="button" onClick={handler}>
          배송상품내용
        </button>
      </td>
      {asd && <ShippingItems />}
    </tr>
  );
}
