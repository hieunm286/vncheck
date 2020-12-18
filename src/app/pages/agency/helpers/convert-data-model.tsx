import { getShippingAddress } from '../../../common-library/forms/radio-group-field';
import { GetImage } from '../agency.service';

export const convertToForm = (entity: any) => {
  const _entity = {...entity, 
    storeLevel: entity.storeLevel._id,
    state: entity.address.state,
    city: entity.address.city,
    district: entity.address.district,
    detailAddress: entity.address.address,
    phoneNumber: entity.phone,
    username: entity.owner.username,
    ownerName: entity.owner.fullName,
    ownerPhoneNumber: entity.owner.phone,
    email: entity.owner.email,
    gender: entity.owner.gender,
    birthDay: entity.owner.birthDay, // entity.owner.birthDay && Date.parse(entity.owner.birthDay),
    roleName: {label: entity.owner.role.name, value: entity.owner.role._id},
    status: entity.status,
    defaultShippingAddress: getShippingAddress(entity.shippingAddress.find((addr: any) => {return addr.isDefault === true})),
    // avatar: , 
    avatar: entity.owner.image || [],
    image: entity.images || [],
  };
  delete _entity.images

  let images : Array<any> = []
  if(_entity && _entity.image) {
    console.log('oc cho')
    _entity.image.map((image: any) => {
      GetImage(image.path).then((res: any) => {
        let base64 = 'data:image/png;base64,' + Buffer.from(res, 'binary').toString('base64');
        let file = dataURLtoFile(base64, image.path.split('/')[1])
        images.push({data_url: base64, file: file});

      })
    })
  }

  _entity.image = images;

  console.log(_entity)

  
  return _entity;
}

function dataURLtoFile(dataurl: any, filename: any) {
  
  var arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), 
      n = bstr.length, 
      u8arr = new Uint8Array(n);
      
  while(n--){
      u8arr[n] = bstr.charCodeAt(n);
  }
  
  return new File([u8arr], filename, {type:mime});
}


export const convertToServer = (entity: any) => {
  console.log(entity.detailAddress)
  const shippingAddress = entity.shippingAddress || [];
  shippingAddress.map((addr: any) => {
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
  
  let _entity = {...entity,
    storeLevel: entity.storeLevel || '',
    address: {
      state: entity.state || '',
      city: entity.city || '',
      district: entity.district || '',
      address: entity.detailAddress || '',
    },
    shippingAddress: shippingAddress || [],
    phone: entity.phoneNumber || '',
    owner: {
      _id: entity.owner._id,
      username: entity.username,
      fullName: entity.ownerName || '',
      phone: entity.ownerPhoneNumber || '',
      email: entity.email,
      gender: entity.gender || '',
      avatar: entity.avatar,
      // birthDay: entity.birthDay && entity.birthDay.toString()  || '',
      birthDay: entity.birthDay,
      role: entity.roleName.value,
      // roleId: (entity.roleName && entity.roleName.value) ? entity.roleName.value : '',
      image: entity.avatar[0]
    },
    status: entity.status,
    images: entity.image,
  };

  
  if(_entity.images.length === 0) delete _entity.images;
  if(_entity.owner.avatar.length === 0) delete _entity.owner.avatar;

  delete _entity.code;
  
  delete _entity.avatar;
  delete _entity.image;
  delete _entity.state;
  delete _entity.city;
  delete _entity.district;
  delete _entity.detailAddress;
  delete _entity.phoneNumber;

  delete _entity.username;
  delete _entity.ownerPhoneNumber;
  delete _entity.ownerName;
  delete _entity.email;
  delete _entity.gender;
  delete _entity.roleName;

  delete _entity.birthDay;
  delete _entity.defaultShippingAddress;



  return _entity;
}