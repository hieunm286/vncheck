import React, {useMemo, useState} from 'react';
import {isEqual} from 'lodash';
import {useAgencyTypeUIContext} from '../agency-type-ui-context';
import {Field, Formik} from 'formik';
import {Input, Select} from '../../../../_metronic/_partials/controls/index';
import STATE_LIST from '../../../../_metronic/AdministrativeDivision/state.json';
import CITY_LIST from '../../../../_metronic/AdministrativeDivision/city.json';
import DISTRICT_LIST from '../../../../_metronic/AdministrativeDivision/district.json';
import SearchIcon from '@material-ui/icons/Search';
import './agency-type-filter.scss';

const prepareFilter = (queryParams: any, values: any) => {
  const {agencyTypeId, agencyTypeName, state, city, district, address, status} = values;
  const newQueryParams = {...queryParams};
  const filter = {...values};
  // Filter by selected field
  // Filter by all fields
  // if (searchText) {
  //   filter.firstName = searchText;
  //   filter.email = searchText;
  // }
  console.log(filter);
  newQueryParams.filter = filter;
  return newQueryParams;
};

const getNameFromCode = (arr: any, code: any) => {
  const index = arr.findIndex((el: any) => el.code === code);
  if (index === -1) return '';
  return arr[index].name;
};

export function AgencyTypeFilter() {
  // Customers UI Context
  const agencyTypeUIContext: any = useAgencyTypeUIContext();
  const agencyTypeUIProps = useMemo(() => {
    return {
      queryParams: agencyTypeUIContext.queryParams,
      setQueryParams: agencyTypeUIContext.setQueryParams,
    };
  }, [agencyTypeUIContext]);
  
  const [administrativeDivision, setAdministrativeDivision] = useState({
    state: '',
    city: '',
    district: '',
    status: '',
  });
  
  // queryParams, setQueryParams,
  const applyFilter = (values: any) => {
    console.log(values);
    const newQueryParams = prepareFilter(agencyTypeUIProps.queryParams, values);
    if (!isEqual(newQueryParams, agencyTypeUIProps.queryParams)) {
      newQueryParams.pageNumber = 1;
      // update list by queryParams
      agencyTypeUIProps.setQueryParams(newQueryParams);
    }
  };
  
  return (
    <>
      <Formik
        initialValues={{
          agencyTypeName: '', // values => All=""/Susspended=0/Active=1/Pending=2
          agencyTypeId: '', // values => All=""/Business=0/Individual=1
          state: administrativeDivision.state,
          city: administrativeDivision.city,
          district: administrativeDivision.district,
          address: '',
          status: administrativeDivision.status,
        }}
        onSubmit={values => {
          values.state = getNameFromCode(Object.values(STATE_LIST), administrativeDivision.state);
          values.city = getNameFromCode(Object.values(CITY_LIST), administrativeDivision.city);
          values.district = getNameFromCode(
            Object.values(DISTRICT_LIST),
            administrativeDivision.district,
          );
          
          applyFilter(values);
        }}>
        {({values, handleSubmit, handleBlur, handleChange, setFieldValue}) => (
          <form onSubmit={handleSubmit} className="form form-label-right">
            <div className="form-group row">
              <div className="col-pc-2 col-md-3">
                <Field
                  name="agencyTypeName"
                  component={Input}
                  placeholder="Nhập tên đại lý"
                  label="Tên đại lý"
                  withFeedbackLabel={false}
                />
              </div>
              <div className="col-pc-2 col-md-3">
                <Field
                  name="agencyTypeId"
                  component={Input}
                  placeholder="Enter Last Name"
                  label="Mã đại lý"
                />
              </div>
              <div className="col-pc-2 col-md-3">
                <Select
                  name="state"
                  label="Tỉnh/Thành phố"
                  value={administrativeDivision.state}
                  onChange={(e: any) =>
                    setAdministrativeDivision({
                      ...administrativeDivision,
                      state: e.target.value,
                      // stateName: e.target.name,
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
                </Select>
              </div>
              <div className="col-pc-2 col-md-3">
                <Select
                  name="city"
                  label="Quận/Huyện"
                  value={administrativeDivision.city}
                  onChange={(e: any) =>
                    setAdministrativeDivision({...administrativeDivision, city: e.target.value})
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
                </Select>
              </div>
              <div className="col-pc-2 col-md-3">
                <Select
                  name="district"
                  label="Phường/Xã"
                  value={administrativeDivision.district}
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
                </Select>
              </div>
              <div className="col-pc-2 col-md-3">
                <Field
                  name="address"
                  component={Input}
                  placeholder="Enter Last Name"
                  label="Địa chỉ đại lý"
                />
              </div>
              <div className="col-pc-2 col-md-3">
                <Select name="status" label="Trạng thái">
                  <option hidden>Chọn</option>
                  <option value="active">Active</option>
                  <option value="disable">Disable</option>
                </Select>
              </div>
            </div>
            <div>
              <button className="btn btn-danger" type="submit">
                <SearchIcon/>
                Tìm kiếm
              </button>
              <button className="btn btn-outline-danger ml-5" type="reset">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M13.125 4.99362L12.5064 4.375L10.5 6.38138L8.49362 4.375L7.875 4.99362L9.88138 7L7.875 9.00594L8.49406 9.625L10.5 7.61862L12.5068 9.625L13.125 9.00681L11.1186 7L13.125 4.99362Z"
                    fill="#0B9446"
                  />
                  <path
                    d="M1.75 1.75C1.51794 1.75 1.29538 1.84219 1.13128 2.00628C0.967187 2.17038 0.875 2.39294 0.875 2.625V4.01188C0.874967 4.12685 0.897592 4.2407 0.941583 4.34692C0.985573 4.45314 1.05007 4.54965 1.13138 4.63094L4.375 7.875V11.375C4.375 11.6071 4.46719 11.8296 4.63128 11.9937C4.79538 12.1578 5.01794 12.25 5.25 12.25H7C7.23206 12.25 7.45462 12.1578 7.61872 11.9937C7.78281 11.8296 7.875 11.6071 7.875 11.375V10.5H7V11.375H5.25V7.51188L4.99362 7.25594L1.75 4.01231V2.625H10.5V3.5H11.375V2.625C11.375 2.39294 11.2828 2.17038 11.1187 2.00628C10.9546 1.84219 10.7321 1.75 10.5 1.75H1.75Z"
                    fill="#0B9446"
                  />
                </svg>
                Bỏ lọc
              </button>
            </div>
          </form>
        )}
      </Formik>
    </>
  );
}
