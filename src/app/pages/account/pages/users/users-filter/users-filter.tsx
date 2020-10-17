import React, { useMemo } from 'react';
import { Formik } from 'formik';
import { isEqual } from 'lodash';
import { useUsersUIContext } from '../users-ui-context';

const prepareFilter = (queryParams, values) => {
  const { status, type, searchText, field } = values;
  console.log(field);
  const newQueryParams = { ...queryParams };
  const filter = {};
  // Filter by selected field
  filter.field = field !== '' ? field : undefined;
  // Filter by all fields
  filter.searchText = searchText;
  // if (searchText) {
  //   filter.firstName = searchText;
  //   filter.email = searchText;
  // }
  newQueryParams.filter = filter;
  return newQueryParams;
};

export function UsersFilter() {
  // Customers UI Context
  const customersUIContext = useUsersUIContext();
  const customersUIProps = useMemo(() => {
    return {
      queryParams: customersUIContext.queryParams,
      setQueryParams: customersUIContext.setQueryParams,
    };
  }, [customersUIContext]);

  // queryParams, setQueryParams,
  const applyFilter = values => {
    const newQueryParams = prepareFilter(customersUIProps.queryParams, values);
    if (!isEqual(newQueryParams, customersUIProps.queryParams)) {
      newQueryParams.pageNumber = 1;
      // update list by queryParams
      customersUIProps.setQueryParams(newQueryParams);
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          status: '', // values => All=""/Susspended=0/Active=1/Pending=2
          type: '', // values => All=""/Business=0/Individual=1
          field: '',
          searchText: '',
        }}
        onSubmit={values => {
          applyFilter(values);
        }}>
        {({ values, handleSubmit, handleBlur, handleChange, setFieldValue }) => (
          <form onSubmit={handleSubmit} className="form form-label-right">
            <div className="form-group row">
              <div className="col-lg-2">
                <select
                  className="form-control"
                  name="field"
                  placeholder="Field filter"
                  // TODO: Change this code
                  onChange={e => {
                    setFieldValue('field', e.target.value);
                    // handleSubmit();
                  }}
                  onBlur={handleBlur}
                  value={values.field}>
                  <option value="all">All</option>
                  <option value="email">Email</option>
                  <option value="phone">Phone</option>
                  <option value="location">Location </option>
                </select>
                <small className="form-text text-muted">
                  <b>Filter</b> by field
                </small>
              </div>
              <div className="col-lg-2">
                <input
                  type="text"
                  className="form-control"
                  name="searchText"
                  placeholder="Search"
                  onBlur={handleBlur}
                  value={values.searchText}
                  onChange={e => {
                    setFieldValue('searchText', e.target.value);
                    // handleSubmit();
                  }}
                />
                <small className="form-text text-muted">
                  <b>Search</b> in all fields
                </small>
              </div>
              <div className="col-lg-2">
                <button className="btn btn-danger" type="submit">
                  Filter
                </button>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </>
  );
}
