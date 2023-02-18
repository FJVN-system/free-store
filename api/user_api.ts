export async function GetUsers(): Promise<any> {
    const response = await fetch(
      'http://fjvn-api-alb-1996066582.ap-northeast-2.elb.amazonaws.com/users'
    )
    const userList = (await response.json()) 
    return userList
  }
  