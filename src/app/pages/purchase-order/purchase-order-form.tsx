import React, { useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { Formik, Form, Field } from 'formik';
import { Switch } from '@material-ui/core';
import { useIntl } from 'react-intl';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import * as Yup from 'yup';
import { MainInput } from '../../common-library/forms/main-input';
import { iconStyle } from '../../common-library/common-consts/const';

const PurchaseOrderSchema = Yup.object().shape({
  code: Yup.string().required('Vui lòng nhập mã đơn vị'),
  agencyAddress: Yup.string().required('Vui lòng nhập tên đơn vị'),
  phoneNumber: Yup.string().required('Vui lòng nhập số điện thoại'),
});

function PurchaseOrderForm({
  unitForEdit,
  onHide,
  handleActionPurchaseOrder,
  error,
}: {
  unitForEdit: any;
  onHide: any;
  handleActionPurchaseOrder: any;
  error: string;
}) {
  const [state, setState] = React.useState({
    status: unitForEdit.status == 1,
  });
  const intl = useIntl();

  useEffect(() => {
    setState({ status: unitForEdit.status == 1 });
  }, [unitForEdit.status]);

  const handleChange = (event: any) => {
    console.log(state.status);
    setState({ ...state, [event.target.name]: event.target.checked });
  };
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={unitForEdit}
        validationSchema={PurchaseOrderSchema}
        onSubmit={values => {
          handleActionPurchaseOrder(values);
        }}>
        {({ handleSubmit }) => (
          <>
            <Modal.Body className="overlay overlay-block cursor-default">
              {/* {actionsLoading && (
                        <div className="overlay-layer bg-transparent">
                            <div className="spinner spinner-lg spinner-success"/>
                        </div>
                    )} */}
              <Form className="form form-label-right">
                <div className="mt-3">
                  <Field
                    name="code"
                    component={MainInput}
                    placeholder={intl.formatMessage({
                      id: 'PURCHASE_ORDER.MASTER.TABLE.CODE_COLUMN',
                    })}
                    withFeedbackLabel
                    labelWidth={4}
                    isHorizontal
                    label={intl.formatMessage({ id: 'PURCHASE_ORDER.MASTER.TABLE.CODE_COLUMN' })}
                  />
                  {error !== '' && (
                    <div className="row">
                      <div className="col-md-4"/>
                      <div className="col-md-8">
                        <span className="text-danger">{error}</span>
                      </div>
                    </div>
                  )}
                </div>
                <div className="mt-3">
                  <Field
                    name="agencyAddress"
                    component={MainInput}
                    labelWidth={4}
                    placeholder={intl.formatMessage({
                      id: 'PURCHASE_ORDER.MASTER.TABLE.AGENCY_ADDRESS',
                    })}
                    withFeedbackLabel
                    isHorizontal
                    label={intl.formatMessage({ id: 'PURCHASE_ORDER.MASTER.TABLE.AGENCY_ADDRESS' })}
                  />
                </div>

                <div className="mt-3">
                  <Field
                    name="phoneNumber"
                    component={MainInput}
                    labelWidth={4}
                    placeholder={intl.formatMessage({
                      id: 'PURCHASE_ORDER.MASTER.TABLE.PHONE_NUMBER',
                    })}
                    withFeedbackLabel
                    isHorizontal
                    label={intl.formatMessage({ id: 'PURCHASE_ORDER.MASTER.TABLE.PHONE_NUMBER' })}
                  />
                </div>
                {/* <div className="mt-3 row">
                  <label className="col-md-4">
                    {intl.formatMessage({ id: 'BASIC_UNIT.CARD.TABLE.STATUS' })}
                  </label>
                  <div className="col-md-8">
                    <Switch
                      checked={state.status}
                      onChange={handleChange}
                      color="primary"
                      name="status"
                      inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                  </div>
                </div> */}
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <button type="submit" onClick={() => handleSubmit()} className="btn btn-danger">
                <SaveOutlinedIcon style={iconStyle} /> Lưu
              </button>
              <button
                type="button"
                onClick={() => onHide('edit')}
                className="btn btn-outline-danger">
                <CancelOutlinedIcon style={iconStyle} /> Hủy
              </button>
            </Modal.Footer>
          </>
        )}
      </Formik>
    </>
  );
}

export default PurchaseOrderForm;
