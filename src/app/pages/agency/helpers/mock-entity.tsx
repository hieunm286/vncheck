import {AgencyModel} from "../agency.model";

export const mockAgency: AgencyModel = {
  _id: "1824702981740u9weaufq",
  code: "Agency code",
  name: "Agency name",
  // address: "",
  address: {
    address: "Số 2 ngõ 219 Trung Kính",
    district: "Yên Hòa",
    city: "Cầu Giấy",
    state: "Hà Nội",
  },
  image: ["a;jfkd;sa", 'aj2ofu2iouf'],
  owner: {
    address: {
      address: "abz",
      district: "Bình Liêu",
      city: "Bình Liêu",
      state: "Quảng Ninh",
    },
    email: "",
    fullName: "",
    gender: "",
    phone: "",
    role: {
      name: "Admin",
      _id: "8943urf9gvh34hq9a[0ur23",
      level: 2,
      scope: "Xem ti vi, bật điều hòa",
    }
  },
  phone: "2819470127",
  // shippingAddress: "",
  shippingAddress: [
    // {
    //   _id: "1",
    //   address: "Số 2 ngõ 219 Trung Kính",
    //   district: "Yên Hòa",
    //   city: "Cầu Giấy",
    //   state: "Hà Nội",
    //   isDefault: false,
    // },
    // {
    //   _id: "2",
    //   address: "abz",
    //   district: "Bình Liêu",
    //   city: "Bình Liêu",
    //   state: "Quảng Ninh",
    //   isDefault: true,
    // }
  ],
  status: false,
  taxId: "29849247809278329",
  // storeLevel: {label: 'label',value: 'value'},
  storeLevel: "5fca5573e4d7bd0041f287e6",
  
  
  username: "nongdan2",
  // fullName: "Nguyen Van A",
  ownerName: "Nguyen Van A",
  ownerPhoneNumber: "0344974562",
  email: "nongdan2@admin.com",
  birthDay: new Date(1982, 3, 6),
  gender: "0",
  roleName: {label: 'Worker', value: "5fca5573e4d7bd0041f287e1"},
  phoneNumber: "0976582403",
  
  detailAddress: "Số 2 ngõ 219 Trung Kính",
  district: "Yên Hoà",
  city: "Cầu Giấy",
  state: "Hà Nội",
  
}

export const initAgency: AgencyModel = {
  // _id: "",
  code: "",
  name: "",
  // address: "",
  address: {
    address: "",
    district: "",
    city: "",
    state: "",
  },
  image: [''],
  owner: {
    address: {
      address: "",
      district: "",
      city: "",
      state: "",
    },
    email: "",
    fullName: "",
    gender: "1",
    phone: "",
    role: {
      name: "",
      // _id: "",
      level: 2,
      scope: "",
    }
  },
  phone: "",
  // shippingAddress: "",
  shippingAddress: [
    // {
    //   address: "",
    //   district: "",
    //   city: "",
    //   state: "",
    //   isDefault: false,
    // },
    // {
    //   address: "",
    //   district: "",
    //   city: "",
    //   state: "",
    //   isDefault: true,
    // }
  ],
  status: false,
  taxId: "",
  // storeLevel: {label: 'label',value: 'value'},
  storeLevel: null,
  
  
  username: "",
  // fullName: "Nguyen Van A",
  ownerName: "",
  ownerPhoneNumber: "",
  email: "",
  birthDay: null,
  gender: null,
  roleName: null,
  phoneNumber: "",
  
  detailAddress: "",
  district: null,
  city: null,
  state: null,
  
}