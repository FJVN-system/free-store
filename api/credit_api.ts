import axios from "axios";

export async function GetCredit(companyId: any, userId: any): Promise<any> {
  const { data } = await axios(
    `http://fjvn-api-server-prod-1286120377.ap-northeast-2.elb.amazonaws.com/${companyId}/credit/${userId}`,
    // `http://localhost:8080/${companyId}/credit/${userId}`,
  );

  return data;
}
