import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { Field, Form, Formik } from 'formik';
import { useIntl } from 'react-intl';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import * as Yup from 'yup';
import { MainInput } from '../../../common-library/forms/main-input';
import { DefaultPagination, iconStyle } from '../../../common-library/common-consts/const';
import { ModifyModel } from '../../../common-library/common-types/common-type';
import CustomImageUpload from '../../../common-library/forms/custom-image-upload';
import { GetHomePage, getNewImage, getOnlyFile } from '../../../common-library/helpers/common-function';
import { Card, CardBody, CardHeader } from '../../../common-library/card';
import { uploadImage } from '../../../pages/purchase-order/purchase-order.service';
import ModifyEntityPageLandLot from './modify-entity-page-land-lot';
import { diff } from 'deep-object-diff';
import { AxiosResponse } from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useHistory } from 'react-router';

function ModifyEntityDialogForm<T>({
  entity,
  onHide,
  onModify,
  modifyModel,
  formPart,
  validation,
  refreshData,
}: {
  entity: any;
  onHide: () => void;
  onModify: (values: any) => Promise<AxiosResponse<T>>;
  modifyModel: ModifyModel;
  formPart: any;
  validation: any;
  refreshData: () => void;
}) {
  const intl = useIntl();
  const modifyM = { ...modifyModel } as any;
  const [images, setImages] = useState(entity);
  const [imageRootArr, setImageRootArr] = useState<any>([]);

  const [search, setSearch] = useState<any>(entity);

  const loadOptions = async (
    search: string,
    prevOptions: any,
    { page }: any,
    service: any,
    keyField: string,
    key: string,
  ) => {
    const queryProps: any = {};
    queryProps[keyField] = search;

    const paginationProps = {
      ...DefaultPagination,
      page: page,
    };

    const entities = await service.GetAll({ queryProps, paginationProps });
    const count = await service.Count({ queryProps });

    const hasMore = prevOptions.length < count.data - (DefaultPagination.limit ?? 0);

    // setSearchTerm({ ...searchTerm, [key]: search });

    const data = [...new Set(entities.data)];

    return {
      options: data.map((e: any) => {
        return { label: e[keyField], value: e._id };
      }),
      hasMore: hasMore,
      additional: {
        page: page + 1,
      },
    };
  };

  const getPromise = (entity: any, values: any, onModify: (values: any) => Promise<AxiosResponse<T>>) => {
    // entity: entity from server
    // values: fields from form
    if (entity._id) {
      const updateValue = diff(entity, values);
      return onModify({ _id: values._id, ...updateValue });
    } else {
      return onModify(values)
    } 
  }

  const notify = (error: string) => {
    toast.error(`😠 ${error}`, {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const notifySuccess = () => {
    toast.success(`😠 Thành công`, {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const [errorMsg, setErrorMsg] = useState<string | undefined>();



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
      onSubmit={(values, {setSubmitting, setFieldError, setErrors}) => {
        // if (entity._id) {
        //   const updateValue = diff(entity, values);
        //   onModify({ _id: values._id, ...updateValue });
        // } else {
        //   onModify(values)
        // } 
        getPromise(entity, values, onModify)
        .then((res: any) => {
          notifySuccess()
          setErrorMsg(undefined);
          refreshData();
          onHide();
        })
        .catch(error => {
          const errorMsg = error.data || error.response.data;
          const formattedErrorMsg = intl.formatMessage({id: errorMsg});
          setSubmitting(false);
          setErrorMsg(formattedErrorMsg);
          // Object.keys(values).map((fieldName: string) => {
          //   console.log(fieldName)
          // })
          setErrors({lot: formattedErrorMsg, subLot: formattedErrorMsg})
          // setFieldError('lot', 'oc cho');
          notify(formattedErrorMsg);
        });


      }}>
      {({ values, handleSubmit, handleBlur, handleChange, setFieldValue, resetForm }) => (
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
                    <ModifyEntityPageLandLot
                      images={images}
                      onChange={(imageList: any, addUpdateIndex: any, key: any) => {
                        onChange(imageList, addUpdateIndex, key);
                      }}
                      values={values}
                      handleChange={handleChange}
                      setFieldValue={setFieldValue}
                      modifyModel={formPart[key].modifyModel as any}
                      column={formPart[key].modifyModel.length}
                      title={formPart[key].title}
                      entity={search}
                      // setSearch={setSearch}
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
