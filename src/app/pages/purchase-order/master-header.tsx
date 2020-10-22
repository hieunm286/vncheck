import React from 'react';
import {useIntl} from 'react-intl';
import {Field, Formik} from 'formik';
import SearchIcon from '@material-ui/icons/Search';
import {Input} from "../../common-library/forms/input";
import {Card, CardBody, CardHeader} from "../../common-library/card";
import SVG from "react-inlinesvg";
import {ToAbsoluteUrl} from "../../common-library/helpers/assets-helpers";

export function MasterHeader<T>({title, onSearch}: { title: any, onSearch: (data: T) => any }) {
  const intl = useIntl();
  const initValue: any = {
    code: '',
    name: '',
  };
  const handleResetForm = (resetForm: any) => {
    resetForm();
    
    onSearch(initValue);
  };
  const searchModel = [
    {name: 'code',}
  ]
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
                <div className="col-xxl-3 col-md-3 mt-md-0 mt-5">
                  <Field
                    name="code"
                    component={Input}
                    placeholder={intl.formatMessage({id: 'PURCHASE_ORDER.MASTER.CODE_INPUT'})}
                    label={intl.formatMessage({id: 'PURCHASE_ORDER.MASTER.CODE_INPUT_LB'})}
                    withFeedbackLabel={true}
                  />
                </div>
                <div className="col-xxl-3 col-md-3 mt-md-0 mt-5">
                  <Field
                    name="code"
                    component={Input}
                    placeholder={intl.formatMessage({id: 'PURCHASE_ORDER.MASTER.CODE_INPUT'})}
                    label={intl.formatMessage({id: 'PURCHASE_ORDER.MASTER.CODE_INPUT_LB'})}
                    withFeedbackLabel={true}
                  />
                </div>
                
                <div className="col-xxl-3 col-md-3 mt-md-0 mt-5">
                  <Field
                    name="name"
                    component={Input}
                    placeholder={intl.formatMessage({id: 'BASIC_UNIT.CARD_HEADER.NAME_INPUT'})}
                    label={intl.formatMessage({id: 'BASIC_UNIT.CARD_HEADER.NAME'})}
                    withFeedbackLabel={true}
                  />
                </div>
              </div>
              <div>
                <button className="btn btn-danger" type="submit">
                  <SearchIcon/>
                  {intl.formatMessage({id: 'BASIC_UNIT.CARD_HEADER.BUTTON.SEARCH'})}
                </button>
                <button
                  className="btn btn-outline-danger ml-5"
                  type="reset"
                  onClick={() => handleResetForm(resetForm)}>
                  <SVG src={ToAbsoluteUrl('/media/svg/vncheck/reset-filter.svg')}/>
                  &nbsp;
                  {intl.formatMessage({id: 'BASIC_UNIT.CARD_HEADER.BUTTON.RESET_FILTER'})}
                </button>
              </div>
            </form>
          )}
        </Formik>
      </CardBody>
    </Card>
  );
}
