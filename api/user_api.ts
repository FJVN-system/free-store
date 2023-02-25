import axios from "axios";

export async function GetUsers(): Promise<any> {
  const { data } = await axios(
    "http://fjvn-api-server-prod-1286120377.ap-northeast-2.elb.amazonaws.com/users",
  );
  return data;
}

export async function GetUser(userId: any): Promise<any> {
  const { data } = await axios(
    `http://fjvn-api-server-prod-1286120377.ap-northeast-2.elb.amazonaws.com/users/${userId}`,
  );
  return data;
}

export async function CreateUser(userdata: any): Promise<any> {
  const { data } = await axios.post(
    "http://fjvn-api-server-prod-1286120377.ap-northeast-2.elb.amazonaws.com/users",
    userdata,
  );
  return data;
}
