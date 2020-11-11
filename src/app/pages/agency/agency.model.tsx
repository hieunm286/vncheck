export interface AgencyModel {
  _id: string;
  code: string;
  name: string;
  // address: string;
  // address: {
  //   state: string;
  //   city: string;
  //   district: string;
  //   address: string;
  // };
  // imagePath: Array<string>;
  owner: string;
  phone: string;
  // shippingAddress: string;
  // shippingAddress: Array<
  //   {
  //     address: string;
  //     state: string;
  //     city: string;
  //     district: string;
  //     isDefault: boolean
  //   }
  // >;
  status: boolean;
  taxId: string;
  type: string;
}
