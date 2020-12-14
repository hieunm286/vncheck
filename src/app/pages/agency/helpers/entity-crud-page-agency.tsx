import React, { useEffect, useState } from 'react';
import ModifyEntityPageAgency from './modify-entity-page-agency';
import { ConvertStatusToBoolean, generateInitForm, GetHomePage, getNewImage, getOnlyFile } from '../../../common-library/helpers/common-function';
import { Form, Formik } from 'formik';
import { Link, useHistory } from 'react-router-dom';
import { uploadImage } from '../../purchase-order/purchase-order.service';
import { Card, CardBody, CardHeader } from '../../../common-library/card';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { convertToForm } from './convert-data-model';
import { ConfirmDialog } from '../../../common-library/common-components/confirm-dialog';

function EntityCrudPageAgency({
  entity,
  onModify,
  title,
  reduxModel,
  code,
  get,
  formPart: formParts,
  allFormField,
  allFormButton,
  validation,
  setShowDialog,
}: {
  title?: string;
  entity?: any;
  onModify: (values: any) => void;
  reduxModel?: string;
  code?: string | null;
  get: (code: string) => any | null;
  formPart?: any;
  allFormField?: any;
  allFormButton?: any;
  validation?: any;
  setShowDialog?: any;
}) {
  const initForm = generateInitForm(allFormField);
  //   const modifyM = { ...modifyModel } as any;
  const history = useHistory();
  const [entityForEdit, setEntityForEdit] = useState(entity);

  const [images, setImages] = useState(initForm);
  const [imageRootArr, setImageRootArr] = useState<any>([]);

  const [ showConfirmDialog, setShowConfirmDialog ] = useState<any>(false);


  const [defaultShippingAddress, setDefaultShippingAddress] = useState(0);
  const handleShippingAddressChange = (e: any) => {
    setDefaultShippingAddress(e.target.value);
  }

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
    setImages({...images, [key]: imageList});
    setImageRootArr(imageArray);
  };

  useEffect(() => {
    if (code) {
      get(code).then((res: { data: any }) => {
        const entity = convertToForm(res.data);
        setEntityForEdit(ConvertStatusToBoolean(entity));
      });
    }
  }, [code]);

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={entityForEdit || initForm}
        validationSchema={validation}
        onSubmit={values => {
          onModify(values);
          // history.goBack()
          history.push(GetHomePage(window.location.pathname));

        }}>
        {({ values, handleSubmit }) => (
          <>
            <Form className="form form-label-right">
              {Object.keys(formParts).map(key => (
                <Card key={key}>
                  {formParts[key].header && (
                    <CardHeader
                      title={
                        <>
                          <a onClick={() => history.goBack()}>
                            <ArrowBackIosIcon />
                          </a>
                          {entityForEdit ? `CHỈNH SỬA ${formParts[key].header}` : `THÊM MỚI ${formParts[key].header}`}
                        </>
                      }
                    />
                  )}
                  <CardBody>
                    <ModifyEntityPageAgency
                      values={values}
                      images={images}
                      onChange={(imageList: any, addUpdateIndex: any, key: any) => {
                        onChange(imageList, addUpdateIndex, key);

                      }}
                      modifyModel={formParts[key].modifyModel as any}
                      column={2}
                    />
                  </CardBody>
                  {key === Object.keys(formParts)[Object.keys(formParts).length - 1] && (
                    <div className="text-right mb-5 mr-5" key={key}>
                    {Object.keys(allFormButton).map(key => {
                      switch (allFormButton[key].role) {
                        case 'submit':
                          return (
                            <button
                              type={allFormButton[key].type}
                              className={allFormButton[key].className}
                              key={key}
                              onClick={() => handleSubmit()}>
                              {allFormButton[key].icon} {allFormButton[key].label}
                            </button>
                          );

                        case 'button':
                          return (
                            <button
                              type={allFormButton[key].type}
                              className={allFormButton[key].className}
                              key={key}>
                              {allFormButton[key].icon} {allFormButton[key].label}
                            </button>
                          );
                        case 'link-button':
                          return (
                            <Link to={allFormButton[key].linkto} key={key}>
                              <button
                                type={allFormButton[key].type}
                                className={allFormButton[key].className}>
                                {allFormButton[key].icon} {allFormButton[key].label}
                              </button>
                            </Link>
                          );
                        case 'popupButton':
                          return (
                            <button
                              onClick={(e: any) => {
                                  setShowConfirmDialog(true);
                                }
                              }
                              type={allFormButton[key].type}
                              className={allFormButton[key].className}
                              key={key}>
                              {allFormButton[key].icon} {allFormButton[key].label}
                            </button>
                          );
                        }
                      })
                    }
                    </div>
                  )}
                   
                </Card>
              ))}
            
            </Form>

           
          </>
        )}
      </Formik>
      <ConfirmDialog
          moduleName='AGENCY.MODULE_NAME'
          confirmMessage='AGENCY.NOTIFY_DIALOG.NOTSAVE'
          onSubmit={() => {
            history.push('/agency')
            }
          }
          isShow={showConfirmDialog}
          onHide={() => {
            setShowConfirmDialog(false);
          }}
          loading={false}
          error=''
      />
    </>
  );
}

export default EntityCrudPageAgency;
