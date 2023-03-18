import axios from "axios";

export async function GetProducts(): Promise<any> {
  const { data } = await axios(
    "fjvn-api-server-prod-2119653329.ap-northeast-2.elb.amazonaws.com/products",
  );

  return data;
}
