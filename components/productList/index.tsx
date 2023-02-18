import { NextPage } from "next";
import styled from "@emotion/styled";
import { GetProducts } from "../../api/products_api";
import { useEffect, useState } from "react";


const ProductList: NextPage<any> = ({}: any) => {

  const [ products, setProducts] = useState<any[]>([])

  useEffect(() => {
    (async () => {
      const products = await GetProducts();
      setProducts(products)
      })();

  }, [])
  
    
  return (
    <ProductListContainer>
      {products?.map((product, i):any => 
        <span key={i}>{product.title}</span>
      )}
      
    </ProductListContainer>
  );
};

export default ProductList;

const ProductListContainer = styled.div`
    height: 30px;
    background-color: gray;
    padding: 2px;
`