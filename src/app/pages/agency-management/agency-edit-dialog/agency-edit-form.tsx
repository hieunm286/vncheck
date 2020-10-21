// Form is based on Formik
// Data validation is based on Yup
// Please, be familiar with article first:
// https://hackernoon.com/react-form-validation-with-formik-and-yup-8b76bda62e10
import React, {useEffect, useState} from 'react';
import {Field, Form, Formik} from 'formik';
import * as Yup from 'yup';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import STATE_LIST from '../../../../_metronic/AdministrativeDivision/state.json';
import CITY_LIST from '../../../../_metronic/AdministrativeDivision/city.json';
import DISTRICT_LIST from '../../../../_metronic/AdministrativeDivision/district.json';

import '../agency.css';
import {Link, useHistory} from 'react-router-dom';
import {Switch} from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ImageUploading from 'react-images-uploading';
import './style/agency-edit-form.scss';
import { getCodeFromName, getNameFromCode } from '../utilities';
import { MainInput } from '../../../common-library/forms/main-input';

import { CustomSelect } from '../../../common-library/forms/custom-select';
import { AgencyShippingAddressTable } from './agency-shipping-address/agency-shipping-address-table/agency-shipping-address-table';
import { AgencyShippingEditDialog } from './agency-shipping-address/agency-shipping-edit-dialog/agency-shipping-edit-dialog';
import { AgencyShippingDetailDialog } from './agency-shipping-address/agency-shipping-detail-dialog/agency-shipping-detail-dialog';
import { AgencyShippingDeleteDialog } from './agency-shipping-address/agency-shipping-delete-dialog/agency-shipping-delete-dialog';

const getOnlyFile = (arr: any[]) => {
  const fileArray: any[] = [];
  arr.forEach(values => {
    fileArray.push(values.file);
  });
  console.log(fileArray);
  return fileArray;
};

const getBase64Array = (arr: any[]) => {
  const base64Array: any[] = [];
  arr.forEach(values => {
    if (values.file) {
      base64Array.push(values.data_url);
    }
  });
  return JSON.stringify(base64Array);
};

const convertBinaryToArrayBuffer = (bnr: ArrayBuffer) => {
  let buffer = Buffer.from(bnr);
  let arraybuffer = Uint8Array.from(buffer).buffer;
  
  return arraybuffer;
};

const NewAgencySchema = Yup.object().shape({
  agency_id: Yup.string()
    .required('Vui lòng nhập mã đại lý')
    .matches(/^[a-zA-Z0-9!@#$%^&*_]+$/u, {
      message: 'Mã đại lý không thể chứa dấu cách và chữ cái có dấu',
    }),
  name: Yup.string()
    .max(255, 'Tên quá dài, vui lòng nhập lại!')
    .required('Vui lòng nhập tên đại lý'),
  // agency_type_id: Yup.string().required('Vui lòng nhập mã loại đại lý! VD: DLC1,...'),
  // agency_addresses: Yup.object({
  //   state: Yup.string()
  //     .required('ccc')
  //     .matches(/^[a-zA-Z0-9]+$/u, { excludeEmptyString: false, message: 'XX' }),
  //   address: Yup.string().required('Vui lòng nhập địa chỉ đại lý'),
  // }),
  
  // // address: Yup.string().required('Vui lòng nhập địa chỉ đại lý'),
  // state: Yup.string()
  //   .required('ccc')
  //   .matches(/^[a-zA-Z0-9]+$/u, { excludeEmptyString: false, message: 'XX' }),
  phone: Yup.string()
    .required('Vui lòng nhập số điện thoại')
    .matches(/^[0-9+]+$/u, {
      message: 'Số điện thoại không hợp lệ',
    })
    .max(11, 'Số điện thoại không hợp lệ')
    .min(8, 'Số điện thoại không hợp lệ'),
  tax_id: Yup.string()
    .required('Vui lòng nhập mã số thuế')
    .matches(/^[0-9]+$/u, {
      message: 'Mã số thuế không hợp lệ',
    })
    .max(13, 'Mã số thuế không hợp lệ'),
  owner_name: Yup.string()
    .max(255, 'Tên quá dài, vui lòng nhập lại!')
    .required('Vui lòng nhập tên chủ đại lý'),
  owner_phone: Yup.string()
    .required('Vui lòng nhập số điện thoại')
    .matches(/^[0-9+]+$/u, {
      message: 'Số điện thoại không hợp lệ',
    })
    .max(11, 'Số điện thoại không hợp lệ')
    .min(8, 'Số điện thoại không hợp lệ'),
  email: Yup.string()
    .email('Email không hợp lệ')
    .required('Vui lòng nhập email của đại lý'),
});

interface AgencyEditState {
  saveAgency: (agency: any, imageArray: any) => any;
  agency: any;
  actionsLoading: boolean;
  onHide: () => void;
  agencyType: any[];
}

interface AdministrativeDivisionState {
  state: string | number;
  city: string | number;
  district: string | number;
  status: boolean;
  address: string;
}

interface FormikActions<Values> {
  setFieldValue<Field extends keyof Values>(
    field: Field,
    value: Values[Field],
    shouldValidate?: boolean,
  ): void;
}

export function AgencyEditForm({
                                 saveAgency,
                                 agency,
                                 actionsLoading,
                                 onHide,
                                 agencyType,
                               }: AgencyEditState) {
  const [administrativeDivision, setAdministrativeDivision] = useState<AdministrativeDivisionState>(
    {
      state: '',
      city: '',
      district: '',
      status: agency.status == 0 ? true : false,
      address: '',
    },
  );
  
  const [agencyTypeValue, setAgencyTypeValue] = useState('');
  
  const history = useHistory();
  
  const [agencyImage, setAgencyImage] = useState(null);
  
  const [show, setShow] = useState({
    showEdit: false,
    showDelete: false,
    showView: false,
  });
  
  const [rowShippingData, setRowShippingData] = useState({
    state: '',
    city: '',
    district: '',
    address: '',
    id: '',
    rowIndex: -1,
  });
  
  console.log(agencyType);
  
  const [shippingArr, setShippingArr] = useState<any>([]);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [checkAll, setCheckAll] = useState<boolean>(false);
  
  const [images, setImages] = useState<any>([]);
  const [imagesDelete, setImagesDelete] = useState<any>([]);
  
  const onChange = (imageList: any, addUpdateIndex: any) => {
    // data for submit
    setImages(imageList);
  };
  
  const getDeleteImage = (index: number) => {
    const imageDeleteArr = [...imagesDelete];
    imageDeleteArr.push(images[index]);
    setImagesDelete(imageDeleteArr);
  };
  
  useEffect(() => {
    if (
      administrativeDivision.state !== '' &&
      administrativeDivision.city !== '' &&
      administrativeDivision.district !== '' &&
      agencyTypeValue !== ''
    ) {
      setCheckAll(true);
    } else {
      setCheckAll(false);
    }
  }, [
    administrativeDivision.state,
    administrativeDivision.city,
    administrativeDivision.district,
    agencyTypeValue,
  ]);
  
  useEffect(() => {
    setAdministrativeDivision({
      state:
        agency.agency_addresses && agency.agency_addresses.state
          ? getCodeFromName(Object.values(STATE_LIST), agency.agency_addresses.state)
          : '',
      city: agency.agency_addresses.city
        ? getCodeFromName(Object.values(CITY_LIST), agency.agency_addresses.city)
        : '',
      district: getCodeFromName(Object.values(DISTRICT_LIST), agency.agency_addresses?.district),
      status: agency.status == 0 ? true : false,
      address: agency.agency_addresses?.address,
    });
    
    const typeIndex = agencyType.findIndex(el => el.agency_type_id === agency.agency_type_id);
    if (typeIndex !== -1) {
      setAgencyTypeValue(agencyType[typeIndex].agency_type_id);
    } else {
      setAgencyTypeValue('');
    }
  }, [agency]);
  
  useEffect(() => {
    // setImages([]);
    console.log('run effect');
    console.log(images);
    if (agency.agency_images && agency.agency_images.length > 0) {
      // for (let i = 0; i < agency.agency_images.length; i ++) {
      //   const imageApiURL = `${API_BASE_URL}${agency.agency_images[i].image_name}`
      //   const imageURL = URL.createObjectURL(imageApiURL);
      // }
      console.log('runnnnnnnnnnnnn');
      const initImage: any[] = [];
      agency.agency_images.forEach((image: { image_base: any }) => {
        const dataURL = {data_url: image.image_base, file: null};
        console.log(dataURL);
        const index = images.findIndex((el: { data_url: any }) => el.data_url === dataURL.data_url);
        // if (index === -1) {
        initImage.push(dataURL);
        // }
      });
      setImages(initImage);
    } else {
      setImages([]);
    }
    // return () => setImages([]);
  }, [agency]);
  
  const handleChange = (e: { target: { name: any; files: any[] }; preventDefault: () => void }) => {
    const fname = e.target.name;
    const fvalue = e.target.files;
    e.preventDefault();
    
    setAgencyImage(e.target.files[0]);
  };
  
  console.log(images);
  
  const openModal = (field: string) => {
    setShow({
      ...show,
      [field]: true,
    });
  };
  
  const hideModal = () => {
    setShow({
      showEdit: false,
      showDelete: false,
      showView: false,
    });
  };
  
  const getDataFromRow = (
    data: { state: any; city: any; district: any; address: any; id: any },
    rowIndex: any,
  ) => {
    console.log(rowIndex);
    setRowShippingData({
      state: data.state,
      city: data.city,
      district: data.district,
      address: data.address,
      id: data.id,
      rowIndex: rowIndex,
    });
  };
  
  const addNewShipping = () => {
    setRowShippingData({
      state: '',
      city: '',
      district: '',
      address: '',
      id: '',
      rowIndex: -1,
    });
    openModal('showEdit');
  };
  
  const saveNewData = (data: any, rowIndex: number, action: string) => {
    let currentData = [...shippingArr];
    
    if (rowIndex === -1) {
      console.log('run push');
      currentData.push(data);
    } else if (action === 'delete') {
      currentData.splice(rowIndex, 1);
      if (shippingArr.length > 0 && shippingArr[rowIndex].id == 0 && currentData.length > 0) {
        currentData[currentData.length - 1].id = '0';
      }
      console.log('run delete');
    } else {
      console.log('run edit');
      currentData[rowIndex] = data;
    }
    console.log(currentData);
    setShippingArr(currentData);
  };
  
  const switchAddress = (rowIndex: number) => {
    const index = shippingArr.findIndex((el: { id: string }) => el.id === '0');
    const updateShippingArr = [...shippingArr];
    const temp_id = updateShippingArr[index].id;
    updateShippingArr[index].id = updateShippingArr[rowIndex].id;
    updateShippingArr[rowIndex].id = temp_id;
    setShippingArr(updateShippingArr);
  };
  
  const handleDeleteAddress = (rowIndex: number) => {
  };
  
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={agency}
        validationSchema={NewAgencySchema}
        // setFieldValue={true}
        onSubmit={values => {
          console.log(agencyImage);
          
          const newValues = {
            ...values,
            agency_type_id: agencyTypeValue,
            state: getNameFromCode(Object.values(STATE_LIST), administrativeDivision.state),
            city: getNameFromCode(Object.values(CITY_LIST), administrativeDivision.city),
            district: getNameFromCode(
              Object.values(DISTRICT_LIST),
              administrativeDivision.district,
            ),
            address: administrativeDivision.address,
            baseData: getBase64Array(images),
            imageToDelete: JSON.stringify(imagesDelete),
            status: administrativeDivision.status ? 0 : 1,
            shipping_address: agency.shipping_address
              ? agency.shipping_address
              : JSON.stringify(shippingArr),
          };
          console.log(newValues);
          console.log(getOnlyFile(images));
          if (checkAll) {
            saveAgency(newValues, getOnlyFile(images));
            history.push('/agency/agency-management/');
          }
        }}>
        {({handleSubmit, touched, errors}) => (
          <>
            <Form className="form">
              <h3 className="text-danger mb-10">
                <Link to="/agency/agency-management/">
                  <ArrowBackIosIcon/>
                </Link>
                THÔNG TIN CHI TIẾT
              </h3>
              <div className="form-group row">
                {/* Last Name */}
                <div className="col-lg-6">
                  <h5 className="text-danger">THÔNG TIN ĐẠI LÝ</h5>
                  <div className="mt-5">
                    <Field
                      name="name"
                      component={MainInput}
                      placeholder="Nhập tên đại lý"
                      label="Tên đại lý"
                      withFeedbackLabel
                      isHorizontal={true}
                    />
                  </div>
                  
                  <div className="mt-5">
                    <Field
                      name="agency_id"
                      component={MainInput}
                      placeholder="Nhập mã đại lý"
                      label="Mã đại lý"
                      isHorizontal={true}
                      withFeedbackLabel
                      disabled={agency.agency_id !== ''}
                    />
                  </div>
                  
                  <div className="mt-5">
                    <CustomSelect
                      type="text"
                      labelWidth={null}
                      width={null}
                      disabled={false}
                      name="agency_type_id"
                      label="Loại đại lý"
                      value={agencyTypeValue}
                      withFeedbackLabel={true}
                      isHorizontal={true}
                      checkSelect={!isSubmit || (isSubmit && agencyTypeValue !== '')}
                      onChange={(e: any) => setAgencyTypeValue(e.target.value)}>
                      <option hidden>Chọn</option>
                      {agencyType.map((value, key) => (
                        <option key={key} value={value.agency_type_id}>
                          {value.type_name}
                        </option>
                      ))}
                    </CustomSelect>
                  </div>
                  
                  <div className="mt-5">
                    <CustomSelect
                      type="text"
                      labelWidth={null}
                      width={null}
                      disabled={false}
                      name="state"
                      label="Tỉnh/Thành phố"
                      value={administrativeDivision.state}
                      withFeedbackLabel={true}
                      isHorizontal={true}
                      checkSelect={!isSubmit || (isSubmit && administrativeDivision.state !== '')}
                      onChange={(e: any) =>
                        setAdministrativeDivision({
                          ...administrativeDivision,
                          state: e.target.value,
                          city: '',
                          district: '',
                        })
                      }>
                      <option hidden>Chọn</option>
                      {Object.values(STATE_LIST).map((value, key) => (
                        <option key={key} value={value.code}>
                          {value.name}
                        </option>
                      ))}
                      {/* <option defaultValue hidden>
                        Please choose user's role
                      </option> */}
                    </CustomSelect>
                  </div>
                  <div className="mt-5">
                    <CustomSelect
                      type="text"
                      labelWidth={null}
                      width={null}
                      name="city"
                      label="Quận/Huyện"
                      value={administrativeDivision.city}
                      withFeedbackLabel={true}
                      isHorizontal={true}
                      checkSelect={
                        !isSubmit ? true : administrativeDivision.city === '' ? false : true
                      }
                      disabled={administrativeDivision.state === '' ? true : false}
                      onChange={(e: any) =>
                        setAdministrativeDivision({
                          ...administrativeDivision,
                          city: e.target.value,
                          district: '',
                        })
                      }>
                      <option hidden>Chọn</option>
                      {Object.values(CITY_LIST).map(
                        (value, key) =>
                          value.parent_code === administrativeDivision.state && (
                            <option key={key} value={value.code}>
                              {value.name}
                            </option>
                          ),
                      )}
                    </CustomSelect>
                  </div>
                  <div className="mt-5">
                    <CustomSelect
                      type="text"
                      labelWidth={null}
                      width={null}
                      name="district"
                      label="Phường/Xã"
                      value={administrativeDivision.district}
                      withFeedbackLabel={true}
                      isHorizontal={true}
                      checkSelect={
                        !isSubmit ? true : administrativeDivision.district === '' ? false : true
                      }
                      disabled={administrativeDivision.city === '' ? true : false}
                      onChange={(e: any) =>
                        setAdministrativeDivision({
                          ...administrativeDivision,
                          district: e.target.value,
                        })
                      }>
                      <option hidden>Chọn</option>
                      {Object.values(DISTRICT_LIST).map(
                        (value, key) =>
                          value.parent_code === administrativeDivision.city && (
                            <option key={key} value={value.code}>
                              {value.name}
                            </option>
                          ),
                      )}
                    </CustomSelect>
                  </div>
                  <div className="mt-5">
                    <Field
                      name="address"
                      component={MainInput}
                      placeholder="Nhập địa chỉ đại lý"
                      label="Địa chỉ đại lý"
                      isHorizontal={true}
                      withFeedbackLabel
                      value={administrativeDivision.address}
                      onChange={(e: any) =>
                        setAdministrativeDivision({
                          ...administrativeDivision,
                          address: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="mt-5">
                    <div className="row">
                      <div className="col-md-3 col-12">
                        <label className="mt-2">Trạng thái</label>
                      </div>
                      <div className="col-md-9 col-12">
                        <Switch
                          checked={administrativeDivision.status}
                          onChange={e =>
                            setAdministrativeDivision({
                              ...administrativeDivision,
                              status: e.target.checked,
                            })
                          }
                          color="primary"
                          name="type_status"
                          inputProps={{'aria-label': 'primary checkbox'}}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mt-5">
                    <Field
                      name="phone"
                      component={MainInput}
                      placeholder="Nhập số điện thoại"
                      withFeedbackLabel
                      label="Điện thoại"
                      isHorizontal={true}
                    />
                  </div>
                  <div className="mt-5">
                    <Field
                      name="tax_id"
                      component={MainInput}
                      placeholder="Nhập mã số thuế"
                      withFeedbackLabel
                      label="Mã số thuế"
                      isHorizontal={true}
                    />
                  </div>
                  <div className="mt-5">
                    <div className="row">
                      <div className="col-md-3 col-12">
                        <label className="form-label">Hình ảnh đại lý</label>
                      </div>
                      <div className="col-md-9 col-12">
                        {/* {imgPreview && (
                          <div className="imagePreview">
                            <img
                              src={imgPreview}
                              alt=""
                              width="200px"
                              height="200px"
                              className="mr-2 agency-image"
                            />
                            <span
                              className="close"
                              onClick={() => {
                                setAgencyImage(null);
                                URL.revokeObjectURL(imgPreview);
                                setImgPreview('');
                              }}>
                              x
                            </span>
                          </div>
                        )}

                        <label className="form-label" htmlFor="image-upload">
                          <svg
                            width="40"
                            height="40"
                            viewBox="0 0 25 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M2.5 2.5H18.75V11.25H21.25V2.5C21.25 1.12125 20.1287 0 18.75 0H2.5C1.12125 0 0 1.12125 0 2.5V17.5C0 18.8787 1.12125 20 2.5 20H12.5V17.5H2.5V2.5Z"
                              fill="#EE4C4C"
                            />
                            <path
                              d="M7.5 10L3.75 15H17.5L12.5 7.5L8.75 12.5L7.5 10Z"
                              fill="#EE4C4C"
                            />
                            <path
                              d="M21.25 13.75H18.75V17.5H15V20H18.75V23.75H21.25V20H25V17.5H21.25V13.75Z"
                              fill="#EE4C4C"
                            />
                          </svg>
                        </label>
                        <input
                          className="form-input d-none"
                          name="agency-image"
                          type="file"
                          id="image-upload"
                          onChange={handleChange}
                        /> */}
                        <ImageUploading
                          multiple
                          value={images}
                          onChange={onChange}
                          maxNumber={69}
                          dataURLKey="data_url">
                          {({
                              imageList,
                              onImageUpload,
                              onImageRemoveAll,
                              onImageUpdate,
                              onImageRemove,
                              isDragging,
                              dragProps,
                            }) => (
                            // write your building UI
                            <div className="d-flex flex-wrap upload__image-wrapper">
                              {imageList.map((image, index) => (
                                <div key={index} className="image-item imagePreview">
                                  <img src={image['data_url']} alt="" width="100" height="100"/>
                                  {/* <div className="image-item__btn-wrapper"> */}
                                  <button
                                    type="button"
                                    className="close"
                                    onClick={() => {
                                      onImageRemove(index);
                                      getDeleteImage(index);
                                    }}>
                                    x
                                  </button>
                                  &nbsp;
                                </div>
                                // </div>
                              ))}
                              <button
                                type="button"
                                style={isDragging ? {color: 'red'} : undefined}
                                onClick={onImageUpload}
                                className="button-add-image"
                                {...dragProps}>
                                <svg
                                  width="40"
                                  height="40"
                                  viewBox="0 0 25 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg">
                                  <path
                                    d="M2.5 2.5H18.75V11.25H21.25V2.5C21.25 1.12125 20.1287 0 18.75 0H2.5C1.12125 0 0 1.12125 0 2.5V17.5C0 18.8787 1.12125 20 2.5 20H12.5V17.5H2.5V2.5Z"
                                    fill="#EE4C4C"
                                  />
                                  <path
                                    d="M7.5 10L3.75 15H17.5L12.5 7.5L8.75 12.5L7.5 10Z"
                                    fill="#EE4C4C"
                                  />
                                  <path
                                    d="M21.25 13.75H18.75V17.5H15V20H18.75V23.75H21.25V20H25V17.5H21.25V13.75Z"
                                    fill="#EE4C4C"
                                  />
                                </svg>
                              </button>
                            </div>
                          )}
                        </ImageUploading>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <h5 className="text-danger">THÔNG TIN CHỦ ĐẠI LÝ</h5>
                  <div className="mt-5 w-100">
                    <Field
                      name="owner_name"
                      component={MainInput}
                      placeholder="Nhập họ tên chủ đại lý"
                      label="Tên chủ đại lý"
                      withFeedbackLabel
                      isHorizontal={true}
                      style={{marginRight: '7%'}}
                    />
                  </div>
                  <div className="mt-5">
                    <Field
                      type="email"
                      name="email"
                      component={MainInput}
                      placeholder="Nhập Email"
                      label="Email"
                      withFeedbackLabel
                      isHorizontal={true}
                      style={{marginRight: '7%'}}
                    />
                  </div>
                  <div className="mt-5">
                    <Field
                      name="owner_phone"
                      component={MainInput}
                      placeholder="Nhập điện thoại liên hệ"
                      label="Điện thoại liên hệ"
                      isHorizontal={true}
                      withFeedbackLabel
                      style={{marginRight: '7%'}}
                    />
                  </div>
                  
                  <div className="mt-10">
                    <h5 className="mt-5 text-danger">ĐỊA CHỈ GIAO HÀNG</h5>
                    <AgencyShippingAddressTable
                      openModal={openModal}
                      getDataFromRow={getDataFromRow}
                      shippingArr={shippingArr}
                      agency={agency}
                      switchAddress={switchAddress}
                    />
                    <AgencyShippingEditDialog
                      show={show.showEdit}
                      openModal={openModal}
                      hideModal={hideModal}
                      shippingArr={shippingArr}
                      saveNewData={saveNewData}
                      rowShippingData={rowShippingData}
                    />
                    <AgencyShippingDetailDialog
                      show={show.showView}
                      openModal={openModal}
                      hideModal={hideModal}
                      rowShippingData={rowShippingData}
                    />
                    <AgencyShippingDeleteDialog
                      show={show.showDelete}
                      openModal={openModal}
                      saveNewData={saveNewData}
                      hideModal={hideModal}
                      rowShippingData={rowShippingData}
                    />
                    <div>
                      <button className="btn btn-danger" type="button" onClick={addNewShipping}>
                        + Thêm địa chỉ mới
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <button
                  type="submit"
                  onClick={() => {
                    handleSubmit();
                    setIsSubmit(true);
                  }}
                  className="btn btn-danger mr-4">
                  <span>
                    <SaveIcon></SaveIcon> Lưu
                  </span>
                </button>
                <button
                  className="btn btn-outline-danger"
                  type="button"
                  onClick={() => {
                    onHide();
                    // setImages([]);
                  }}>
                  <span>
                    <CancelIcon></CancelIcon> Hủy
                  </span>
                </button>
              </div>
            </Form>
          </>
        )}
      </Formik>
    </>
  );
}
