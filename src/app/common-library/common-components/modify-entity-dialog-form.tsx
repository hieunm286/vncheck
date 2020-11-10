import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { Field, Form, Formik } from 'formik';
import { useIntl } from 'react-intl';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import * as Yup from 'yup';
import { MainInput } from '../forms/main-input';
import { iconStyle } from '../common-consts/const';
import { ModifyModel } from '../common-types/common-type';
import CustomImageUpload from '../forms/custom-image-upload';
import { getOnlyFile } from '../helpers/common-function';

const PurchaseOrderSchema = Yup.object().shape({
  code: Yup.string().required('VALIDATE_TEST_01'),
  agencyAddress: Yup.string().required('VALIDATE_TEST_01'),
  phoneNumber: Yup.string().required('VALIDATE_TEST_01'),
});

// type PurchaseOrderValidation = Yup.InferType<typeof PurchaseOrderSchema>

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
  const [images, setImages] = useState([]);
  const [imageRootArr, setImageRootArr] = useState<any>([]);

  const onChange = (imageList: any, addUpdateIndex: any) => {
    console.log(imageList);
    const imageArray = getOnlyFile(imageList);
    // data for submit
    setImages(imageList);
    setImageRootArr(imageArray);
  };
  
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
                        <div className="mt-3" key={key}>
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
                      return <></>;
                    case 'Datetime':
                      return <></>;
                    case 'image':
                      return (
                        <div className="mt-3" key={key}>
                          <CustomImageUpload
                            images={images}
                            onChange={onChange}
                            label={intl.formatMessage({
                              id: modifyM[key].label,
                            })}
                            labelWidth={4}
                            isHorizontal={true}
                            required={modifyM[key].required}
                          />
                        </div>
                      );
                  }
                  return <></>;
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
