import axios from "axios";

export async function GetUsers(): Promise<any> {
  const { data } = await axios(
    "fjvn-api-server-prod-2119653329.ap-northeast-2.elb.amazonaws.com/users",
  );
  return data;
}

export async function CreateUser(userdata: any): Promise<any> {
  const { data } = await axios.post(
    "fjvn-api-server-prod-2119653329.ap-northeast-2.elb.amazonaws.com/users",
    userdata,
  );
  return data;
}
