import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { Field, Form, Formik } from 'formik';
import { useIntl } from 'react-intl';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import * as Yup from 'yup';
import { MainInput } from '../../../common-library/forms/main-input';
import { DefaultPagination, iconStyle } from '../../../common-library/common-consts/const';
import { OldModifyModel } from '../../../common-library/common-types/common-type';
import CustomImageUpload from '../../../common-library/forms/custom-image-upload';
import { getNewImage, getOnlyFile } from '../../../common-library/helpers/common-function';
import { Card, CardBody, CardHeader } from '../../../common-library/card';
import { uploadImage } from '../../purchase-order/purchase-order.service';
import ModifyEntityPage from '../../../common-library/common-components/modify-entity-page';
import { diff } from 'deep-object-diff';
import ModifyEntityPageAgency from './modify-entity-page-agency';
import FormTemplate from './form-template';

function ModifyShippingAddressDialogForm<T>({
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
  modifyModel: OldModifyModel;
  formPart: any;
  validation: any;
}) {
  const intl = useIntl();
  
  const [images, setImages] = useState(entity);
  const [imageRootArr, setImageRootArr] = useState<any>([]);

  const [search, setSearch] = useState<any>(entity);


  const onChange = (imageList: any, addUpdateIndex: any, key: any) => {
    const imageArray = getOnlyFile(imageList);

    const newArr = getNewImage(imageRootArr, imageArray);
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
        if (entity._id) {
          const updateValue = diff(entity, values);
          if (entity.isDefault || entity.isDefault === false) {
            onModify({ 
              _id: values._id,
              isDefault: values.isDefault,
              state: values.state,
              city: values.city,
              district: values.district,
              address: values.address,
            });
          } else {
            onModify({_id: values._id, ...updateValue});
          }
          
        } else {
          onModify(values)
        } 

        onHide();
      }}>
      {({ values, handleSubmit }) => (
        <>
          <Modal.Body className="overlay overlay-block cursor-default">
            <Form className="form form-label-right">
              {Object.keys(formPart).map(key => (
                <React.Fragment key={key}>
                <FormTemplate 
                  formValues={values}
                  images={images}
                  onChange={(imageList: any, addUpdateIndex: any, key: any) => {
                    onChange(imageList, addUpdateIndex, key);

                  }}
                  modifyModel={modifyModel[0]}
                  column={1}
                />
                </React.Fragment>
              ))}
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

export default ModifyShippingAddressDialogForm;
