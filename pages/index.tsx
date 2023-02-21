import styled from "@emotion/styled";
import Cart from "../components/cart";
import ProductList from "../components/productList";

const BodyContainer = styled.div`
  display: flex;
`;

export default function IndexPage() {
  return (
    <div>
      <BodyContainer>
        <ProductList />
        <Cart />
      </BodyContainer>
    </div>
  );
}
