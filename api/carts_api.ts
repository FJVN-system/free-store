import axios from "axios";

export async function getCartItems(userId: any): Promise<any> {
  const { data } = await axios(
    `http://fjvn-api-alb-1996066582.ap-northeast-2.elb.amazonaws.com/carts/${userId}`,
  );
  return data;
}

export function fetchCartItems(data: any): Promise<any> {
  return axios.post(
    `http://fjvn-api-alb-1996066582.ap-northeast-2.elb.amazonaws.com/carts`,
    data,
  );
}
