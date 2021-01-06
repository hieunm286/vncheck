export type UserModel = {
  _id: string;
  code: string;
  name: string;
  phone: string;
  status: number | string | boolean;
  address: {
    state: string;
    city: string;
    district: string;
    address: string;
  };
}

export type UserModelForQR = Partial<UserModel> & {
  fullName: string;
}