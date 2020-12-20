import React, {useState} from 'react';
import {Modal} from 'react-bootstrap';
import {Field, Form, Formik} from 'formik';
import {useIntl} from 'react-intl';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import * as Yup from 'yup';
import {MainInput} from '../forms/main-input';
import {DefaultPagination, iconStyle} from '../common-consts/const';
import {ModifyForm, ModifyModel, OldModifyModel} from '../common-types/common-type';
import CustomImageUpload from '../forms/custom-image-upload';
import {getNewImage, getOnlyFile} from '../helpers/common-function';
import {Card, CardBody, CardHeader} from '../card';
import {uploadImage} from '../../pages/purchase-order/purchase-order.service';
import ModifyEntityPage from './modify-entity-page';
import {diff} from 'deep-object-diff';

function ModifyEntityDialogForm<T>({
                                     entity = {},
                                     onHide,
                                     onModify,
                                     modifyForm,
                                     validation,
                                   }: {
  entity?: any;
  onHide: () => void;
  onModify: (values: any) => void;
  modifyForm: ModifyForm;
  validation: any;
}) {
  const intl = useIntl();
  const [images, setImages] = useState(entity);
  const [imageRootArr, setImageRootArr] = useState<any>([]);
  
  // const [search, setSearch] = useState<any>(entity);
  //
  //
  // const onChange = (imageList: any, addUpdateIndex: any, key: any) => {
  //   const imageArray = getOnlyFile(imageList);
  //
  //   const newArr = getNewImage(imageRootArr, imageArray);
  //
  //   newArr.forEach((file, index) => {
  //     uploadImage(file)
  //       .then(res => {
  //         // console.log('update: ' + index);
  //       })
  //       .catch(err => {
  //         console.log(err);
  //       });
  //   });
  //   // data for submit
  //   setImages({...images, [key]: imageList});
  //   setImageRootArr(imageArray);
  // };
  console.log(entity);
  return (
    <Formik
      // enableReinitialize={true}
      initialValues={entity}
      validationSchema={validation}
      onSubmit={values => {
        // if (entity._id) {
        //   const updateValue = diff(entity, values);
        //   onModify({_id: values._id, ...updateValue});
        // } else {
          onModify({...entity, ...values, __v:undefined});
        // }
        onHide();
      }}>
      {({handleSubmit}) => (
        <>
          <Modal.Body className="overlay overlay-block cursor-default">
            {/* {actionsLoading && (
                        <div className="overlay-layer bg-transparent">
                            <div className="spinner spinner-lg spinner-success"/>
                        </div>
                    )} */}
            <Form className="form form-label-right">
              {Object.keys(modifyForm).map(key => (
                <React.Fragment key={key}>
                  <ModifyEntityPage
                    images={images}
                    onChange={(imageList: any, addUpdateIndex: any, key: any) => {
                      // onChange(imageList, addUpdateIndex, key);
                    }}
                    entity={entity}
                    modifyModel={modifyForm[key].modifyModel}
                    column={modifyForm[key].modifyModel.length}
                    title={modifyForm[key].title}
                  />
                </React.Fragment>
              ))}
            </Form>
          </Modal.Body>
          <Modal.Footer className="border-top-0 pt-10">
            <button type="submit" onClick={() => handleSubmit()} className="btn btn-primary fixed-btn-width">
              <SaveOutlinedIcon style={iconStyle}/>
              {intl.formatMessage({id: 'COMMON_COMPONENT.MODIFY_DIALOG.SAVE_BTN'})}
            </button>
            <button type="button" onClick={onHide} className="btn btn-outline-primary fixed-btn-width">
              <CancelOutlinedIcon style={iconStyle}/>
              {intl.formatMessage({id: 'COMMON_COMPONENT.MODIFY_DIALOG.CLOSE_BTN'})}
            </button>
          </Modal.Footer>
        </>
      )}
    </Formik>
  );
}

export default ModifyEntityDialogForm;
