import React, { useEffect, useState } from 'react';
import { ModifyModel } from '../common-types/common-type';
import { useIntl } from 'react-intl';
import { generateInitForm, getOnlyFile } from '../helpers/common-function';
import { Field, Form, Formik } from 'formik';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import * as Yup from 'yup';
import { MainInput } from '../forms/main-input';
import { iconStyle } from '../common-consts/const';
import { Link, useHistory } from 'react-router-dom';
import ImageUploading from 'react-images-uploading';
import CustomImageUpload from '../forms/custom-image-upload';

function ModifyEntityPage<T>({
  entity,
  onModify,
  title,
  modifyModel,
  reduxModel,
  code,
  get,
}: {
  modifyModel: ModifyModel;
  title: string;
  entity: T;
  onModify: (values: any) => void;
  reduxModel: string;
  code: string | null;
  get: (code: string) => any | null;
}) {
  const intl = useIntl();
  const initForm = generateInitForm(modifyModel);
  const modifyM = { ...modifyModel } as any;
  const history = useHistory();
  const [entityForEdit, setEntityForEdit] = useState(entity);

  const [images, setImages] = useState([]);
  const [imageRootArr, setImageRootArr] = useState<any>([]);

  const onChange = (imageList: any, addUpdateIndex: any) => {
    console.log(imageList);
    const imageArray = getOnlyFile(imageList);
    // data for submit
    setImages(imageList);
    setImageRootArr(imageArray);
  };

  console.log(imageRootArr);

  useEffect(() => {
    if (code) {
      get(code).then((res: { data: any }) => {
        console.log(res.data);
        setEntityForEdit(res.data);
      });
    }
  }, [code]);

  return (
    <Formik
      enableReinitialize={true}
      initialValues={entityForEdit || initForm}
      // validationSchema={PurchaseOrderSchema}
      onSubmit={values => {
        onModify(values);
        history.push('/purchase-order');
        console.log(values);
      }}>
      {({ handleSubmit }) => (
        <>
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
                    return <>NOT IMPLEMENTED!</>;
                  case 'Datetime':
                    return <>NOT IMPLEMENTED!</>;
                  case 'image':
                    return (
                      <div className="mt-3" key={key}>
                        <CustomImageUpload
                          images={images}
                          onChange={onChange}
                          label="Thêm ảnh"
                          labelWidth={4}
                          isHorizontal={true}
                          isRequired
                        />
                      </div>
                    );
                }
                return <>NOT IMPLEMENTED!</>;
              })
            ) : (
              <></>
            )}
          </Form>

          <button type="submit" onClick={() => handleSubmit()} className="btn btn-primary mr-2">
            <SaveOutlinedIcon style={iconStyle} /> Lưu
          </button>
          <Link to="/purchase-order">
            <button type="button" className="btn btn-outline-primary">
              <CancelOutlinedIcon style={iconStyle} /> Hủy
            </button>
          </Link>
        </>
      )}
    </Formik>
  );
}

export default ModifyEntityPage;
