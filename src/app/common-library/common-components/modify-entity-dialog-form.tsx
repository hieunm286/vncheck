import React from 'react';
import { Modal } from 'react-bootstrap';
import { Field, Form, Formik } from 'formik';
import { useIntl } from 'react-intl';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import * as Yup from 'yup';
import { MainInput } from '../forms/main-input';
import { iconStyle } from '../common-consts/const';
import { ModifyModel } from '../common-types/common-type';

const PurchaseOrderSchema = Yup.object().shape({
  code: Yup.string().required('Vui lòng nhập mã đơn vị'),
  agencyAddress: Yup.string().required('Vui lòng nhập tên đơn vị'),
  phoneNumber: Yup.string().required('Vui lòng nhập số điện thoại'),
});

function ModifyEntityDialogForm<T>({
  entity,
  onHide,
  onModify,
  modifyModel,
}: {
  entity: T;
  onHide: () => void;
  onModify: (values: any) => void;
  modifyModel: ModifyModel;
}) {
  const intl = useIntl();
  const modifyM = { ...modifyModel } as any;
  return (
    <Formik
      enableReinitialize={true}
      initialValues={entity}
      validationSchema={PurchaseOrderSchema}
      onSubmit={values => {
        onModify(values);
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
              {modifyModel ? (
                Object.keys(modifyM).map(key => {
                  switch (modifyM[key].type) {
                    case 'string':
                      return (
                        <div className="mt-3">
                          <Field
                            name={key}
                            component={MainInput}
                            placeholder={intl.formatMessage({
                              id: modifyM[key].placeholder,
                            })}
                            withFeedbackLabel
                            labelWidth={4}
                            isHorizontal
                            label={intl.formatMessage({
                              id: modifyM[key].label,
                            })}
                          />
                        </div>
                      );
                    case 'number':
                      return <>NOT IMPLEMENTED!</>;
                    case 'Datetime':
                      return <>NOT IMPLEMENTED!</>;
                  }
                  return <>NOT IMPLEMENTED!</>;
                })
              ) : (
                <></>
              )}
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <button type="submit" onClick={() => handleSubmit()} className="btn btn-primary">
              <SaveOutlinedIcon style={iconStyle} /> Lưu
            </button>
            <button type="button" onClick={onHide} className="btn btn-outline-primary">
              <CancelOutlinedIcon style={iconStyle} /> Hủy
            </button>
          </Modal.Footer>
        </>
      )}
    </Formik>
  );
}

export default ModifyEntityDialogForm;
