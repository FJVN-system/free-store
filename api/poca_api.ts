import axios from "axios";

export async function getPocas(): Promise<any> {
  const { data } = await axios(
    // `http://fjvn-api-server-prod-2119653329.ap-northeast-2.elb.amazonaws.com/${companyId}/products`,
    `http://localhost:8080/pocas`,
  );

  return data;
}

export async function GetProductsByCategory(
  companyId: any,
  category: any,
): Promise<any> {
  const { data } = await axios(
    `http://fjvn-api-server-prod-2119653329.ap-northeast-2.elb.amazonaws.com/${companyId}/products/${category}`,
  );

  return data;
}
