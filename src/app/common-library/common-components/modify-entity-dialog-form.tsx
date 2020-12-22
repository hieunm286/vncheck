import React, {useState} from 'react';
import {Modal} from 'react-bootstrap';
import {Field, Form, Formik} from 'formik';
import {useIntl} from 'react-intl';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import {ModifyForm, ModifyPanel} from '../common-types/common-type';
import {iconStyle} from "../common-consts/const";
import {ModifyEntityPage} from "./modify-entity-page";

function ModifyEntityDialogForm<T>({
                                     entity = {},
                                     onHide,
                                     onModify,
                                     modifyPanel,
                                     validation,
                                   }: {
  entity?: any;
  onHide: () => void;
  onModify: (values: any) => void;
  modifyPanel: ModifyPanel;
  validation: any;
}) {
  const intl = useIntl();
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
  const {_title, ...inputGroups} = modifyPanel;
  return (
    <Formik
      // enableReinitialize={true}
      initialValues={entity}
      // validationSchema={validation}
      onSubmit={values => {
        console.log(values)
        onModify({...entity, ...values, __v: undefined});
        onHide();
      }}>
      {({handleSubmit}) => (
        <>
          <Modal.Body className="overlay overlay-block cursor-default">
            <Form className="form form-label-right">
              {Object.keys(inputGroups).map(key => (
                <React.Fragment key={key}>
                  <ModifyEntityPage
                    inputGroups={inputGroups}
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
