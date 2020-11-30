import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { Field, Form, Formik } from 'formik';
import { useIntl } from 'react-intl';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import * as Yup from 'yup';
import { MainInput } from '../forms/main-input';
import { DefaultPagination, iconStyle } from '../common-consts/const';
import { ModifyModel } from '../common-types/common-type';
import CustomImageUpload from '../forms/custom-image-upload';
import { getNewImage, getOnlyFile } from '../helpers/common-function';
import { Card, CardBody, CardHeader } from '../card';
import { uploadImage } from '../../pages/purchase-order/purchase-order.service';
import ModifyEntityPage from './modify-entity-page';
import { diff } from 'deep-object-diff';

function ModifyEntityDialogForm<T>({
  entity,
  onHide,
  onModify,
  modifyModel,
  formPart,
  validation,
}: {
  entity: any;
  onHide: () => void;
  onModify: (values: any) => void;
  modifyModel: ModifyModel;
  formPart: any;
  validation: any;
}) {
  const intl = useIntl();
  
  const [images, setImages] = useState(entity);
  const [imageRootArr, setImageRootArr] = useState<any>([]);

  const [search, setSearch] = useState<any>(entity);

  console.log(search)

  const onChange = (imageList: any, addUpdateIndex: any, key: any) => {
    const imageArray = getOnlyFile(imageList);

    const newArr = getNewImage(imageRootArr, imageArray);
    console.log(key);
    newArr.forEach((file, index) => {
      uploadImage(file)
        .then(res => {
          // console.log('update: ' + index);
        })
        .catch(err => {
          console.log(err);
        });
    });
    // data for submit
    setImages({ ...images, [key]: imageList });
    setImageRootArr(imageArray);
  };

  return (
    <Formik
      enableReinitialize={true}
      initialValues={entity}
      validationSchema={validation}
      onSubmit={values => {
        console.log(values)
        if (entity._id) {
          const updateValue = diff(entity, values);
          onModify({ _id: values._id, ...updateValue });
        } else {
          onModify(values)
        } 

        onHide();
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
              {Object.keys(formPart).map(key => (
                <React.Fragment key={key}>
                  {/* {formPart[key].header && (
                      title={
                        <>
                          <a onClick={() => history.goBack()}>
                            <ArrowBackIosIcon />
                          </a>
                          {entityForEdit
                            ? `CHỈNH SỬA ${formPart[key].header}`
                            : `THÊM MỚI ${formPart[key].header}`}
                        </>
                      }
                    
                  )} */}
                  <ModifyEntityPage
                    images={images}
                    onChange={(imageList: any, addUpdateIndex: any, key: any) => {
                      onChange(imageList, addUpdateIndex, key);
                    }}
                    modifyModel={formPart[key].modifyModel as any}
                    column={formPart[key].modifyModel.length}
                    title={formPart[key].title}
                    search={search}
                    setSearch={setSearch}
                  />
                </React.Fragment>
              ))}
            </Form>
            {/* <Form className="form form-label-right">
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
            </Form> */}
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
