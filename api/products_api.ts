export async function GetProducts(): Promise<any> {
    const response = await fetch(
      'http://fjvn-api-alb-1996066582.ap-northeast-2.elb.amazonaws.com/products'
    )
    const productList = (await response.json()) 
    return productList
  }
  