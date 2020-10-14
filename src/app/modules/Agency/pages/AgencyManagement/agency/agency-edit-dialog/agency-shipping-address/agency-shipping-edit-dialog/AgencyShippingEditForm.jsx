// Form is based on Formik
// Data validation is based on Yup
// Please, be familiar with article first:
// https://hackernoon.com/react-form-validation-with-formik-and-yup-8b76bda62e10
import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {
  Input,
  MainInput,
  Select,
  CustomInput,
} from '../../../../../../../../../_metronic/_partials/controls';
// import COUNTRY_LIST from '../../../../../../_metronic/country/country';
import STATE_LIST from '../../../../../../../../../_metronic/AdministrativeDivision/state.json';
import CITY_LIST from '../../../../../../../../../_metronic/AdministrativeDivision/city.json';
import DISTRICT_LIST from '../../../../../../../../../_metronic/AdministrativeDivision/district.json';
import { getCodeFromName, getNameFromCode } from '../../../../../../utilities/utilities';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
const NewShippingAddressSchema = Yup.object().shape({
  // email: Yup.string()
  //   .min(3, 'Minimum 3 symbols')
  //   .max(50, 'Maximum 50 symbols')
  //   .email('Vui lòng nhập đúng email')
  //   .required('Email không được để trống'),
  // // dateofbirth: Yup.mixed()
  // //   .nullable(false)
  // //   .required('Date of Birth is required'),
  // first_name: Yup.string()
  //   .required('Vui lòng nhập First name')
  //   .matches(/^([^0-9!@#\\$%\\^\\&*\\)\\(+=._-]*)$/u, {
  //     message: 'Vui lòng nhập tên đúng định dạng',
  //   })
  //   .trim('Tên không thể bắt đầu bằng dấu cách'),
  // last_name: Yup.string()
  //   .required('Last name không được để trống')
  //   .matches(/^([^0-9!@#\\$%\\^\\&*\\)\\(+=._-]*)$/u, {
  //     message: 'Vui lòng nhập tên đúng định dạng',
  //   }),
  // username: Yup.string().required('AgencyTypename không được để trống'),
  // password: Yup.string().required('Password không được để trống'),
});

const labelStyle = {
  width: '40%',
};

export function AgencyShippingEditForm({ saveAgency, agency, actionsLoading, onHide }) {
  const [administrativeDivision, setAdministrativeDivision] = useState({
    state: agency.data.state ? getCodeFromName(Object.values(STATE_LIST), agency.data.state) : '',
    city: getCodeFromName(Object.values(CITY_LIST), agency.data.city),
    district: getCodeFromName(Object.values(DISTRICT_LIST), agency.data.district),
    address: agency.data.address,
    id: agency.data.id,
  });

  // const handleChange = event => {
  //   console.log(state.type_status);
  //   setState({ ...state, [event.target.name]: event.target.checked });
  // };
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={agency}
        validationSchema={NewShippingAddressSchema}
        onSubmit={values => {
          const newValues = {
            state: getNameFromCode(Object.values(STATE_LIST), administrativeDivision.state),
            city: getNameFromCode(Object.values(CITY_LIST), administrativeDivision.city),
            district: getNameFromCode(
              Object.values(DISTRICT_LIST),
              administrativeDivision.district,
            ),
            address: administrativeDivision.address,
            id: administrativeDivision.id,
          };
          saveAgency(newValues, values.rowIndex);
        }}>
        {({ handleSubmit }) => (
          <>
            <Modal.Body className="overlay overlay-block cursor-default">
              {actionsLoading && (
                <div className="overlay-layer bg-transparent">
                  <div className="spinner spinner-lg spinner-success" />
                </div>
              )}
              <Form className="form form-label-right">
                <div className="mt-5">
                  <Select
                    name="state"
                    label="Tỉnh/Thành phố"
                    width="50%"
                    value={administrativeDivision.state}
                    isHorizontal={true}
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
                  </Select>
                </div>
                <div className="mt-5">
                  <Select
                    name="city"
                    label="Quận/Huyện"
                    value={administrativeDivision.city}
                    isHorizontal={true}
                    width="50%"
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
                  </Select>
                </div>
                <div className="mt-5">
                  <Select
                    name="district"
                    label="Phường/Xã"
                    value={administrativeDivision.district}
                    isHorizontal={true}
                    width="50%"
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
                  </Select>
                </div>
                <div className="mt-5">
                  <Field
                    name="address"
                    width="50%"
                    component={CustomInput}
                    placeholder="Nhập mã địa chỉ"
                    label="Địa chỉ giao hàng"
                    isHorizontal={true}
                    value={administrativeDivision.address}
                    onChange={e =>
                      setAdministrativeDivision({
                        ...administrativeDivision,
                        address: e.target.value,
                      })
                    }
                  />
                </div>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <button
                type="submit"
                onClick={() => handleSubmit()}
                className="btn btn-danger btn-elevate">
                <SaveOutlinedIcon /> Lưu{'\u00A0'}
                {'\u00A0'}
                {'\u00A0'}
              </button>
              <button type="button" onClick={onHide} className="btn btn-outline-danger">
                <CancelOutlinedIcon /> Hủy bỏ
              </button>
            </Modal.Footer>
          </>
        )}
      </Formik>
    </>
  );
}
