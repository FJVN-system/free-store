import axios from "axios";

export async function getCartItems(userId: any): Promise<any> {
  const { data } = await axios.get(
    // `http://fjvn-api-server-prod-1286120377.ap-northeast-2.elb.amazonaws.com/carts/${userId}`,
    `http://localhost:8080/cartsitems/${userId}`,
  );
  return data;
}

export function addCartItems(data: any): Promise<any> {
  return axios.post(
    // `http://fjvn-api-server-prod-1286120377.ap-northeast-2.elb.amazonaws.com/carts`,
    `http://localhost:8080/cartsitems`,
    data,
  );
}

export function deleteCartItem(data: any): Promise<any> {
  return axios.delete(
    // `http://fjvn-api-server-prod-1286120377.ap-northeast-2.elb.amazonaws.com/carts`,
    `http://localhost:8080/cartsitems/${data}`,
  );
}

export function modifyCartItem(data: any): Promise<any> {
  return axios.post(
    // `http://fjvn-api-server-prod-1286120377.ap-northeast-2.elb.amazonaws.com/carts`,
    `http://localhost:8080/cartsitems`,
    data,
  );
}
