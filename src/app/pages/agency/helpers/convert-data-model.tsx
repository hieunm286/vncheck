export const convertToForm = (entity: any) => {
  return {...entity, 
    storeLevel: entity.storeLevel.name,
    state: entity.address.state,
    city: entity.address.city,
    district: entity.address.district,
    detailAddress: entity.address.address,
    phoneNumber: entity.phone,
    username: entity.owner.username,
    ownerName: entity.owner.firstName + ' ' + entity.owner.lastName,
    ownerPhoneNumber: entity.owner.phone,
    email: entity.owner.email,
    gender: entity.owner.gender,
    birthDay: Date.parse(entity.owner.birthDay),
    roleName: entity.owner.role.roleType,
    status: entity.status
    // avatar: , 
  };
}

export const convertToServer = (entity: any) => {
  const shippingAddress = entity.shippingAddress;
  console.log(shippingAddress)
  shippingAddress.map((addr: any) => {
    console.log(addr);
    if(addr._id) {
      if(addr._id.toString().match(/^[0-9a-fA-F]{24}$/)) {
        return addr;
      } else {
        const _addr = delete addr._id;
        return _addr;
      }
    } else {
      return addr;
    }
  });
  console.log(shippingAddress)
  
  let _entity = {...entity,
    storeLevel: {
      name: entity.storeLevel
    },
    address: {
      state: entity.state,
      city: entity.city,
      district: entity.district,
      address: entity.detailAddress,
    },
    shippingAddress: shippingAddress,
    phone: entity.phoneNumber,
    owner: {
      username: entity.username,
      //TODO: concencus with backend ownerName
      phone: entity.ownerPhoneNumber,
      email: entity.email,
      gender: entity.gender,
      birthDay: entity.birthDay.toString(),
      role: {
        roleType: entity.roleName,
      }
    },
    status: entity.status,
  };

  delete _entity.state;
  delete _entity.city;
  delete _entity.district;
  delete _entity.detailAddress;
  delete _entity.phoneNumber;

  delete _entity.username;
  delete _entity.ownerPhoneNumber;
  delete _entity.email;
  delete _entity.gender;
  delete _entity.roleName;


  return _entity;
}