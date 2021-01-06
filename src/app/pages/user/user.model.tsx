export interface UserModel {
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
  }
}