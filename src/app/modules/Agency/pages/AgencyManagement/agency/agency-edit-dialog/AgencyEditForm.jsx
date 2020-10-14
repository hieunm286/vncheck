// Form is based on Formik
// Data validation is based on Yup
// Please, be familiar with article first:
// https://hackernoon.com/react-form-validation-with-formik-and-yup-8b76bda62e10
import React, { useEffect, useRef, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {
  MainInput,
  Select,
  DatePickerField,
  CustomSelect,
} from '../../../../../../../_metronic/_partials/controls';
// import COUNTRY_LIST from '../../../../../../_metronic/country/country';

import STATE_LIST from '../../../../../../../_metronic/AdministrativeDivision/state.json';
import CITY_LIST from '../../../../../../../_metronic/AdministrativeDivision/city.json';
import DISTRICT_LIST from '../../../../../../../_metronic/AdministrativeDivision/district.json';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';

import '../Agency.css';
import { Link, useHistory } from 'react-router-dom';
import { FormControlLabel, Switch } from '@material-ui/core';
import { AgencyShippingAddressTable } from './agency-shipping-address/agency-shipping-address-table/AgencyShippingAddressTable';
import { AgencyShippingEditDialog } from './agency-shipping-address/agency-shipping-edit-dialog/AgencyShippingEditDialog';
import { AgencyShippingDetailDialog } from './agency-shipping-address/agency-shipping-detail-dialog/AgencyShippingDetailDialog';
import { AgencyShippingDeleteDialog } from './agency-shipping-address/agency-shipping-delete-dialog/AgencyShippingDeleteDialog';
import { getCodeFromName, getNameFromCode } from '../../../../utilities/utilities';
import { API_BASE_URL } from '../../../../../../Const';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
// eslint-disable-next-line no-restricted-imports
import { makeStyles } from '@material-ui/core/styles';
import './style/AgencyEditForm.scss';

const useStyles = makeStyles(theme => ({
  root: {
    marginLeft: '8%',
  },
}));

const NewAgencySchema = Yup.object().shape({
  agency_id: Yup.string()
    .required('Vui lòng nhập mã đại lý')
    .matches(/^[a-zA-Z0-9]+$/u, {
      message: 'Mã đại lý không thể chứa dấu cách và chữ cái có dấu',
    })
    .trim('Mã đại lý không thể bắt đầu bằng dấu cách'),
  name: Yup.string()
    .max(255, 'Tên quá dài, vui lòng nhập lại!')
    .required('Vui lòng nhập tên đại lý'),
  agency_type_id: Yup.string().required('Vui lòng nhập mã loại đại lý! VD: DLC1,...'),
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
    .max(11, 'Số điện thoại không hợp lệ')
    .min(3, 'Số điện thoại không hợp lệ'),
  tax_id: Yup.string()
    .required('Vui lòng nhập mã số thuế')
    .matches(/^[0-9]+$/)
    .max(13, 'Mã số thuế không hợp lệ'),
  owner_name: Yup.string()
    .max(255, 'Tên quá dài, vui lòng nhập lại!')
    .required('Vui lòng nhập tên chủ đại lý'),
  owner_phone: Yup.string()
    .required('Vui lòng nhập số điện thoại')
    .max(11, 'Số điện thoại không hợp lệ')
    .min(3, 'Số điện thoại không hợp lệ'),
  email: Yup.string()
    .email('Email không hợp lệ')
    .required('Vui lòng nhập email của đại lý'),
});
export function AgencyEditForm({ saveAgency, agency, actionsLoading, onHide }) {
  const [administrativeDivision, setAdministrativeDivision] = useState({
    state: '',
    city: '',
    district: '',
    status: agency.status == 0 ? true : false,
    address: '',
  });

  const classes = useStyles();

  const history = useHistory();

  const [agencyImage, setAgencyImage] = useState(null);
  const [imgPreview, setImgPreview] = useState();
  const refImage = useRef();
  const [show, setShow] = useState({
    showEdit: false,
    showDelete: false,
    showView: false,
  });
  const [rowShippingData, setRowShippingData] = useState({
    data: {},
    rowIndex: -1,
  });
  const [shippingArr, setShippingArr] = useState([]);
  const [isSubmit, setIsSubmit] = useState(false);
  const [checkAll, setCheckAll] = useState(false);

  useEffect(() => {
    if (
      administrativeDivision.state !== '' &&
      administrativeDivision.city !== '' &&
      administrativeDivision.district !== ''
    ) {
      setCheckAll(true);
    } else {
      setCheckAll(false);
    }
  }, [administrativeDivision.state, administrativeDivision.city, administrativeDivision.district]);

  useEffect(() => {
    setAdministrativeDivision({
      state: agency.agency_addresses.state
        ? getCodeFromName(Object.values(STATE_LIST), agency.agency_addresses.state)
        : '',
      city: getCodeFromName(Object.values(CITY_LIST), agency.agency_addresses?.city),
      district: getCodeFromName(Object.values(DISTRICT_LIST), agency.agency_addresses?.district),
      status: agency.status == 0 ? true : false,
      address: agency.agency_addresses?.address,
    });
  }, [agency]);

  console.log(imgPreview);

  useEffect(() => {
    const currentImg =
      agency.agency_images && agency.agency_images.length > 0
        ? `${API_BASE_URL}${agency.agency_images[0].image_name}`
        : '';
    setImgPreview(currentImg);
  }, [agency.agency_images]);

  useEffect(() => {
    if (!agencyImage) {
      if (refImage.current) {
        const imageURL = URL.createObjectURL(refImage.current);
        setImgPreview(imageURL);
        setAgencyImage(refImage.current);
      }
      return;
    }

    const imageURL = URL.createObjectURL(agencyImage);
    setImgPreview(imageURL);
    refImage.current = agencyImage;

    return () => URL.revokeObjectURL(imageURL);
  }, [agencyImage, agency]);

  const handleChange = e => {
    const fname = e.target.name;
    const fvalue = e.target.files;
    e.preventDefault();

    setAgencyImage(e.target.files[0]);
  };

  const openModal = field => {
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

  const getDataFromRow = (data, rowIndex) => {
    console.log(rowIndex);
    setRowShippingData({
      data: data,
      rowIndex: rowIndex,
    });
  };

  const addNewShipping = () => {
    setRowShippingData({
      data: {},
      rowIndex: -1,
    });
    openModal('showEdit');
  };

  const saveNewData = (data, rowIndex) => {
    let currentData = [...shippingArr];
    if (rowIndex === -1) {
      currentData.push(data);
    } else if (rowIndex === -5) {
      currentData.splice(rowIndex, 1);
    } else {
      currentData[rowIndex] = data;
    }
    setShippingArr(currentData);
  };

  const switchAddress = rowIndex => {
    const index = shippingArr.findIndex(el => el.id === '0');
    const updateShippingArr = [...shippingArr];
    const temp_id = updateShippingArr[index].id;
    updateShippingArr[index].id = updateShippingArr[rowIndex].id;
    updateShippingArr[rowIndex].id = temp_id;
    setShippingArr(updateShippingArr);
  };

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={agency}
        validationSchema={NewAgencySchema}
        setFieldValue
        onSubmit={values => {
          console.log(agencyImage);

          const newValues = {
            ...values,
            state: getNameFromCode(Object.values(STATE_LIST), administrativeDivision.state),
            city: getNameFromCode(Object.values(CITY_LIST), administrativeDivision.city),
            district: getNameFromCode(
              Object.values(DISTRICT_LIST),
              administrativeDivision.district,
            ),
            address: administrativeDivision.address,
            image: agencyImage,
            status: administrativeDivision.status ? 0 : 1,
            shipping_address: agency.shipping_address
              ? agency.shipping_address
              : JSON.stringify(shippingArr),
          };
          console.log(newValues);
          if (checkAll) {
            saveAgency(newValues);
            history.push('/agency/agency-management/');
          }
        }}>
        {({ handleSubmit, touched, errors }) => (
          <>
            <Form className="form">
              <h3 className="text-danger mb-10">
                <Link to="/agency/agency-management/">
                  <ArrowBackIosIcon />
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
                      disabled={agency.agency_id !== '' ? true : false}
                    />
                  </div>

                  <div className="mt-5">
                    <Field
                      name="agency_type_id"
                      component={MainInput}
                      placeholder="Nhập loại đại lý"
                      withFeedbackLabel
                      label="Loại đại lý"
                      isHorizontal={true}
                    />
                  </div>

                  <div className="mt-5">
                    <CustomSelect
                      name="state"
                      label="Tỉnh/Thành phố"
                      value={administrativeDivision.state}
                      isHorizontal={true}
                      checkSelect={
                        !isSubmit ? true : administrativeDivision.state === '' ? false : true
                      }
                      onChange={e =>
                        setAdministrativeDivision({
                          ...administrativeDivision,
                          state: e.target.value,
                          city: '',
                          district: '',
                        })
                      }>
                      <option defaultValue hidden>
                        Chọn
                      </option>
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
                      name="city"
                      label="Quận/Huyện"
                      value={administrativeDivision.city}
                      isHorizontal={true}
                      checkSelect={administrativeDivision.city !== '' ? true : false}
                      onChange={e =>
                        setAdministrativeDivision({
                          ...administrativeDivision,
                          city: e.target.value,
                          district: '',
                        })
                      }>
                      <option defaultValue hidden>
                        Chọn
                      </option>
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
                      name="district"
                      label="Phường/Xã"
                      value={administrativeDivision.district}
                      isHorizontal={true}
                      checkSelect={administrativeDivision.district !== '' ? true : false}
                      onChange={e =>
                        setAdministrativeDivision({
                          ...administrativeDivision,
                          district: e.target.value,
                        })
                      }>
                      <option defaultValue hidden>
                        Chọn
                      </option>
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
                      onChange={e =>
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
                        <label>Trạng thái</label>
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
                          inputProps={{ 'aria-label': 'primary checkbox' }}
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
                        {imgPreview && (
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
                        />
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
                      style={{ marginRight: '7%' }}
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
                      style={{ marginRight: '7%' }}
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
                      style={{ marginRight: '7%' }}
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
                <button className="btn btn-outline-danger" type="button" onClick={onHide}>
                  <span>
                    <CancelIcon></CancelIcon> Hủy
                  </span>
                </button>
              </div>
            </Form>
            <> </>
          </>
        )}
      </Formik>
    </>
  );
}
