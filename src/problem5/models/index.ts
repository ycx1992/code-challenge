// Return message data format
export type Rtn = {
  code: number;
  msg: string;
  data: any;
};

export type Sales = {
  contact?: string;
  gender?: string;
  age?: number;
  state?: string;
  product_code?: string;
  product_type?: string;
  price?: number;
  profit?: number;
  lead?: number;
  month?: number;
  year?: number;
};
