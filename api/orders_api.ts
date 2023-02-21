import axios from "axios";

export async function GetOrders(companyId: any, userId: any): Promise<any> {
  console.log(companyId, userId);
  const { data } = await axios(
    // `http://fjvn-api-alb-1996066582.ap-northeast-2.elb.amazonaws.com/${companyId}/ordersitem/${userId}`,
    `http://fjvn-api-alb-1996066582.ap-northeast-2.elb.amazonaws.com/11111/ordersitem/22`,
  );

  return data;
}
