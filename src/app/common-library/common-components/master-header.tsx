import React from 'react';
import {useIntl} from 'react-intl';
import {Field, Formik} from 'formik';
import SearchIcon from '@material-ui/icons/Search';
import {Input} from '../forms/input';
import {Card, CardBody, CardHeader} from '../card';
import SVG from 'react-inlinesvg';
import {ToAbsoluteUrl} from '../helpers/assets-helpers';
import {SearchModel} from "../common-types/common-type";

export function MasterHeader<T>({title, onSearch, searchModel, initValue}: { searchModel: SearchModel, title: string; initValue: T, onSearch: (data: T) => void }) {
  const intl = useIntl();
  const handleResetForm = (resetForm: any) => {
    resetForm();
    onSearch(initValue);
  };
  const searchM: any = {...searchModel};
  
  return (
    <Card>
      <CardHeader title={intl.formatMessage({id: title}).toUpperCase()}/>
      <CardBody>
        <Formik
          initialValues={initValue}
          onSubmit={values => {
            onSearch(values);
          }}>
          {({values, handleSubmit, handleBlur, handleChange, setFieldValue, resetForm}) => (
            <form onSubmit={handleSubmit} className="form form-label-right">
              <div className="form-group row">
                {searchModel ? Object.keys(searchM).map((key) => {
                  switch (searchM[key].type) {
                    case 'string':
                      return (<div className="col-xxl-3 col-md-3 mt-md-0 mt-5" key={'master_header' + key}>
                        <Field
                          name={key}
                          component={Input}
                          placeholder={intl.formatMessage({id: searchM[key].placeholder})}
                          label={intl.formatMessage({id: searchM[key].label})}
                          withFeedbackLabel={true}
                        />
                      </div>)
                    case 'number':
                      return (<>NOT IMPLEMENTED!</>);
                    case 'Datetime':
                      return (<>NOT IMPLEMENTED!</>);
                  }
                  return (<>NOT IMPLEMENTED!</>)
                }) : (<></>)}
                
                {/*<div className="col-xxl-3 col-md-3 mt-md-0 mt-5">*/}
                {/*  <Field*/}
                {/*    name="code"*/}
                {/*    component={Input}*/}
                {/*    placeholder={intl.formatMessage({id: 'PURCHASE_ORDER.MASTER.CODE_INPUT'})}*/}
                {/*    label={intl.formatMessage({id: 'PURCHASE_ORDER.MASTER.CODE_INPUT_LB'})}*/}
                {/*    withFeedbackLabel={true}*/}
                {/*  />*/}
                {/*</div>*/}
                
                {/*<div className="col-xxl-3 col-md-3 mt-md-0 mt-5">*/}
                {/*  <Field*/}
                {/*    name="name"*/}
                {/*    component={Input}*/}
                {/*    placeholder={intl.formatMessage({id: 'BASIC_UNIT.CARD_HEADER.NAME_INPUT'})}*/}
                {/*    label={intl.formatMessage({id: 'BASIC_UNIT.CARD_HEADER.NAME'})}*/}
                {/*    withFeedbackLabel={true}*/}
                {/*  />*/}
                {/*</div>*/}
              </div>
              <div>
                <button className="btn btn-danger" type="submit">
                  <SearchIcon/>
                  {intl.formatMessage({id: 'COMMON_COMPONENT.MASTER_HEADER.SEARCH_BTN'})}
                </button>
                <button
                  className="btn btn-outline-danger ml-5"
                  type="reset"
                  onClick={() => handleResetForm(resetForm)}>
                  <SVG src={ToAbsoluteUrl('/media/svg/vncheck/reset-filter.svg')}/>
                  &nbsp;
                  {intl.formatMessage({id: 'COMMON_COMPONENT.MASTER_HEADER.RESET_FILTER_BTN'})}
                </button>
              </div>
            </form>
          )}
        </Formik>
      </CardBody>
    </Card>
  );
}
