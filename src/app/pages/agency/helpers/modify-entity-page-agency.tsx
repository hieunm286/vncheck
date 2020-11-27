import React, { useEffect, useState } from 'react';
import { ModifyModel } from '../../../common-library/common-types/common-type';
import { useIntl } from 'react-intl';
import { generateInitForm, getNewImage, getOnlyFile } from '../../../common-library/helpers/common-function';
import { Field, Form, Formik, useFormikContext } from 'formik';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import * as Yup from 'yup';
import { MainInput } from '../../../common-library/forms/main-input';
import { DefaultPagination, iconStyle } from '../../../common-library/common-consts/const';
import { Link, useHistory } from 'react-router-dom';
import ImageUploading from 'react-images-uploading';
import CustomImageUpload from '../../../common-library/forms/custom-image-upload';
import { uploadImage } from '../../purchase-order/purchase-order.service';
import { Card, CardBody } from '../../../common-library/card';
import { DatePickerField } from '../../../common-library/forms/date-picker-field';
import { Switch } from '@material-ui/core';
import CheckCircleOutlinedIcon from '@material-ui/icons/CheckCircleOutlined';
import { InfiniteSelect } from '../../../common-library/forms/infinite-select';
import TagInput from '../../../common-library/forms/tag-input';
import ImgGallery from '../../../common-library/forms/image-gallery';
import { FormikRadioGroup } from '../../../common-library/forms/radio-group-field';
import FormTemplate from './form-template';
import ModifyEntityDialogAgency from './modify-entity-dialog-agency';
import {
  GenerateAllFormField
} from '../../../common-library/helpers/common-function';
import { DeleteEntityDialog } from '../../../common-library/common-components/delete-entity-dialog';

const dataT: any = [
  {
    _id: 'abc',
    code: '000001',
    name: 'Rau muống',
    barcode: '8930000001',
    imageURL: 'https://product.hstatic.net/1000191320/product/rau-cai-chip_master.jpg',
    growingDays: 15,
    plantingDays: 30,
    expiryDays: 30,
  },
  {
    _id: 'abcd',
    code: '000003',
    name: 'Rau cải',
    barcode: '8930000003',
    imageURL: 'https://product.hstatic.net/1000191320/product/rau-cai-chip_master.jpg',
    growingDays: 15,
    plantingDays: 30,
    expiryDays: 60,
  },
  {
    _id: 'abce',
    code: '000004',
    name: 'Rau muống',
    barcode: '8930000004',
    imageURL: 'https://product.hstatic.net/1000191320/product/rau-cai-chip_master.jpg',
    growingDays: 15,
    plantingDays: 30,
    expiryDays: 17,
  },
  {
    _id: 'abcf',
    code: '000005',
    name: 'Rau muống',
    barcode: '8930000005',
    imageURL: 'https://product.hstatic.net/1000191320/product/rau-cai-chip_master.jpg',
    growingDays: 15,
    plantingDays: 30,
    expiryDays: 19,
  },
  {
    _id: 'abdacf',
    code: '000009',
    name: 'Rau cần',
    barcode: '8930000009',
    imageURL: 'https://product.hstatic.net/1000191320/product/rau-cai-chip_master.jpg',
    growingDays: 15,
    plantingDays: 30,
    expiryDays: 19,
  },
];

function ModifyEntityPageAgency<T>({
  // entity,
  // onModify,
  // title,
  modifyModel,
  // reduxModel,
  // code,
  // get,
  images,
  onChange,
  title,
  column,
  search,
  setSearch,
  handleChangeTag,
  values,
}: {
  modifyModel: any;
  // title: string;
  // entity: T;
  // onModify: (values: any) => void;
  // reduxModel: string;
  // code: string | null;
  // get: (code: string) => any | null;
  images?: any;
  onChange?: any;
  title?: string;
  column?: number;
  search?: any;
  setSearch?: any;
  handleChangeTag?: any;
  values?: any;
}) {
  const intl = useIntl();
  // const initForm = generateInitForm(modifyModel);
  const modifyM = { ...modifyModel } as any;

  const [entities, setEntities] = useState<T[]>([]);
  const [deleteEntity, setDeleteEntity] = useState<T>(null as any);
  const [editEntity, setEditEntity] = useState(values.shippingAddress);
  const [createEntity, setCreateEntity] = useState<T | null>(null as any);
  const [selectedEntities, setSelectedEntities] = useState<T[]>([]);
  const [detailEntity, setDetailEntity] = useState<T>(null as any);
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [entityNumber, setEntityNumber] = useState(0);
  const { setFieldValue, errors, touched } = useFormikContext<any>();

  const getShippingAddress = (entityNumber: number) => {
    return new Promise((resolve, reject) => {
      if(values.shippingAddress) {
        resolve(values.shippingAddress[entityNumber]);
      } else {
        reject((err: any) => {
          console.log(err);
        });
      }
    })
  }

  const getShippingAddresses = () => {
    return new Promise((resolve, reject) => {
      if(values.shippingAddress) {
        resolve(values.shippingAddress);
      } else {
        reject((err: any) => {
          console.log(err);
        });
      }
    })
  }

  const PurchaseOrderSchema = Yup.object().shape({
    // code: Yup.string()
    //   .min(3, 'Minimum 3 symbols')
    //   .max(50, 'Maximum 50 symbols')
    //   .required('Code không được để trống'),
    // // dateofbirth: Yup.mixed()
    // //   .nullable(false)
    // //   .required('Date of Birth is required'),
    state: Yup.string().required(intl.formatMessage({id: 'AGENCY.EDIT.VALIDATION.SHIPPING_ADDRESS_STATE'})),
    city: Yup.string().required(intl.formatMessage({id: 'AGENCY.EDIT.VALIDATION.SHIPPING_ADDRESS_CITY'})),
    district: Yup.string().required(intl.formatMessage({id: 'AGENCY.EDIT.VALIDATION.SHIPPING_ADDRESS_DISTRICT'})),
    address: Yup.string().required(intl.formatMessage({id: 'AGENCY.EDIT.VALIDATION.SHIPPING_ADDRESS_ADDRESS'})),
    // phoneNumber: Yup.string()
    //   .required('Last name không được để trống')
    //   .matches(/[0-9]$/u, {
    //     message: 'Vui lòng nhập tên đúng định dạng',
    //   }),
    // time: Yup.date().required('Vui lòng nhập date'),
    // time2: Yup.date().required('Vui lòng nhập date'),
    // quantity: Yup.number().required('Vui lòng nhập số lượng'),
    // agency: Yup.object().shape({
    //   name: Yup.string().required('Name ko đc để trống'),
    //   taxId: Yup.string().required('TaxId ko đc để trống'),
    // }),
    // staff: Yup.array().min(1, 'Nhân viên ko đc để trống')
  });

  const modifyModelAddress = [
    {
      title: '',
      data: {
        // code: {
        //   type: 'string',
        //   placeholder: intl.formatMessage({ id: 'PURCHASE_ORDER.MASTER.HEADER.CODE.PLACEHOLDER' }),
        //   label: intl.formatMessage({ id: 'PURCHASE_ORDER.MASTER.HEADER.CODE.LABEL' }),
        //   required: true,
        //   disabled: !!editEntity,
        // },
        // agencyAddress: {
        //   type: '',
        //   placeholder: intl.formatMessage({ id: 'PURCHASE_ORDER.MASTER.HEADER.NAME.PLACEHOLDER' }),
        //   required: true,
        //   label: intl.formatMessage({ id: 'PURCHASE_ORDER.MASTER.HEADER.NAME.LABEL' }),
        // },
        state: {
          type: 'string',
          placeholder: intl.formatMessage({
            id: 'AGENCY.EDIT.PLACEHOLDER.SHIPPING_ADDRESS_STATE',
          }),
          required: true,
          label: intl.formatMessage({ id: 'AGENCY.EDIT.LABEL.SHIPPING_ADDRESS_STATE' }),
        },
        city: {
          type: 'string',
          placeholder: intl.formatMessage({
            id: 'AGENCY.EDIT.PLACEHOLDER.SHIPPING_ADDRESS_CITY',
          }),
          required: true,
          label: intl.formatMessage({ id: 'AGENCY.EDIT.LABEL.SHIPPING_ADDRESS_CITY' }),
        },
        district: {
          type: 'string',
          placeholder: intl.formatMessage({
            id: 'AGENCY.EDIT.PLACEHOLDER.SHIPPING_ADDRESS_DISTRICT',
          }),
          required: true,
          label: intl.formatMessage({ id: 'AGENCY.EDIT.LABEL.SHIPPING_ADDRESS_DISTRICT' }),
        },
        address: {
          type: 'string',
          placeholder: intl.formatMessage({
            id: 'AGENCY.EDIT.PLACEHOLDER.SHIPPING_ADDRESS_ADDRESS',
          }),
          required: true,
          label: intl.formatMessage({ id: 'AGENCY.EDIT.LABEL.SHIPPING_ADDRESS_ADDRESS' }),
        },
        // phoneNumber: {
        //   type: 'string',
        //   placeholder: intl.formatMessage({
        //     id: 'PURCHASE_ORDER.MASTER.TABLE.PHONE_NUMBER_COLUMN',
        //   }),
        //   required: true,
        //   label: intl.formatMessage({ id: 'PURCHASE_ORDER.MASTER.TABLE.PHONE_NUMBER_COLUMN' }),
        // },
        // image: {
        //   type: 'image',
        //   placeholder: intl.formatMessage({ id: 'PURCHASE_ORDER.MASTER.HEADER.CODE.LABEL' }),
        //   label: 'Album 1',
        // },
        // image2: {
        //   type: 'image',
        //   placeholder: intl.formatMessage({ id: 'PURCHASE_ORDER.MASTER.HEADER.CODE.LABEL' }),
        //   label: 'Album 2',
        // },
        // agency: {
        //   type: 'object',
        //   name: {
        //     type: 'string',
        //     label: 'Name',
        //     placeholder: 'Name',
        //   },
        //   taxId: {
        //     type: 'string',
        //     label: 'Tax',
        //     placeholder: 'Tax',
        //   },
        // },
        // staff: {
        //   type: 'tag',
        //   label: 'Nhân viên',
        //   placeholder: 'Nhân viên',
        // }
      },
    },
    // {
    //   title: 'Test222',
    //   data: {
    //     test1: {
    //       type: 'string',
    //       placeholder: intl.formatMessage({ id: 'PURCHASE_ORDER.MASTER.HEADER.CODE.PLACEHOLDER' }),
    //       label: intl.formatMessage({ id: 'PURCHASE_ORDER.MASTER.HEADER.CODE.LABEL' }),
    //       disabled: !!editEntity,
    //     },
    //     test2: {
    //       type: 'string',
    //       placeholder: intl.formatMessage({ id: 'PURCHASE_ORDER.MASTER.HEADER.NAME.PLACEHOLDER' }),
    //       label: intl.formatMessage({ id: 'PURCHASE_ORDER.MASTER.HEADER.NAME.LABEL' }),
    //     },
    //     test3: {
    //       type: 'string',
    //       placeholder: intl.formatMessage({
    //         id: 'PURCHASE_ORDER.MASTER.TABLE.PHONE_NUMBER_COLUMN',
    //       }),
    //       label: intl.formatMessage({ id: 'PURCHASE_ORDER.MASTER.TABLE.PHONE_NUMBER_COLUMN' }),
    //     },
    //   },
    // },
  ];

  const createTitle = 'AGENCY.EDIT.HEADER.ADD_NEW_SHIPPING_ADDRESS';
  const updateTitle = 'AGENCY.EDIT.HEADER.EDIT_SHIPPING_ADDRESS';
  const deleteTitle = 'AGENCY.EDIT.HEADER.DELETE_SHIPPING_ADDRESS';
  const moduleName = 'AGENCY.EDIT.HEADER.SHIPPING_ADDRESS';
  const formPart: any = {
    form_1: {
      title: '',
      modifyModel: modifyModelAddress,
      header: 'ĐƠN HÀNG',
    },
  }

  const allFormField: any = {
    ...GenerateAllFormField(
      modifyModelAddress,
      // , modifyModel_2, modifyModel_3, modifyModel_4
    ),
  };

  const allFormButton: any = {
    save: {
      role: 'submit',
      type: 'submit',
      linkto: undefined,
      className: 'btn btn-primary mr-2',
      label: 'Lưu',
      icon: <SaveOutlinedIcon />,
    },
    cancel: {
      role: 'link-button',
      type: 'button',
      linkto: '/purchase-order',
      className: 'btn btn-outline-primary mr-2',
      label: 'Hủy',
      icon: <CancelOutlinedIcon />,
    },
    test: {
      role: 'button',
      type: 'button',
      linkto: undefined,
      className: 'btn btn-outline-primary',
      label: 'Test',
      icon: <CancelOutlinedIcon />,
    },
  };

  const deleteFn = (entity: any) => {
    console.log(entity)
    getShippingAddressesSync()
    .then((shippingAddresses: any) => {
      setFieldValue('shippingAddress', shippingAddresses.filter((addr: any) => {
          return entity._id !== addr._id;
        })
      );
      values.shippingAddress = values.shippingAddress.filter((addr: any) => {
        return entity._id !== addr._id;
      });
      setDeleteEntity(entity);
      setShowDelete(false);
    });
  };

  const getShippingAddressSync = async (entityNumber: number) => {
    const shippingAddress = await getShippingAddress(entityNumber);
    return shippingAddress;
  };
  const getShippingAddressesSync = async () => {
    const shippingAddress = await getShippingAddresses();
    return shippingAddress;
  };


  const update = (entity: any) => {
    getShippingAddressesSync()
    .then((shippingAddresses: any) => {
      setFieldValue('shippingAddress', shippingAddresses.map((addr: any) => {
          return entity._id === addr._id ? entity : addr;
        })
      )
      values.shippingAddress = values.shippingAddress.map((addr: any) => {
        return entity._id === addr._id ? entity : addr;
      })
      setEditEntity(entity)
    });
  }

  const create = (entity: any) => {
    getShippingAddressesSync()
    .then((shippingAddresses: any) => {
        // setEntityNumber(shippingAddresses.length + 1);
        const _entity = {...entity, _id: (shippingAddresses.length + 1).toString(), isDefault: false};
        shippingAddresses.push(_entity);
        setFieldValue('shippingAddress', shippingAddresses);
        // values.shippingAddress.push(_entity);
        setCreateEntity(_entity)
    });
  }

  useEffect(() => {
    getShippingAddressesSync()
    .then((res: any) => {
      setEditEntity(res[0])
    });
  },[]);

  useEffect(() => {
    getShippingAddressSync(entityNumber)
    .then((res: any) => {
      setEditEntity(res);
      setDeleteEntity(res);
    });
  }, [entityNumber]);



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

    console.log(keyField);
    console.log(key);

    // const entities = await service.GetAll({ queryProps, paginationProps });
    // const count = await service.Count({ queryProps });

    // const hasMore = prevOptions.length < count.data - (DefaultPagination.limit ?? 0);

    // // setSearchTerm({ ...searchTerm, [key]: search });

    const data = [...new Set(dataT)];

    return {
      options: data.map((e: any) => {
        console.log(e);
        return { label: e[keyField], value: e._id };
      }),
      hasMore: false,
      additional: {
        page: page + 1,
      },
    };
  };

  // const sleep = (ms: any) =>
  // new Promise(resolve => {
  //   setTimeout(() => {
  //     resolve();
  //   }, ms);
  // });

  // const loadOptions = async (search: any, prevOptions: any) => {
  //   await sleep(1000);

  //   let filteredOptions;
  //   if (!search) {
  //     filteredOptions = data;
  //   } else {
  //     const searchLower = search.toLowerCase();
  //     console.log(data)
  //     filteredOptions = data.filter(({ name }: any) =>
  //       name.toLowerCase().includes(searchLower)
  //     );
  //   }

  //   const hasMore = filteredOptions.length > prevOptions.length + 10;
  //   const slicedOptions = filteredOptions.slice(
  //     prevOptions.length,
  //     prevOptions.length + 10
  //   );

  //   return {
  //     options: slicedOptions,
  //     hasMore
  //   };
  // };

  return (
    // <Card>
    //   <CardBody>
    //     <Formik
    //       enableReinitialize={true}
    //       initialValues={entityForEdit || initForm}
    //       // validationSchema={PurchaseOrderSchema}
    //       onSubmit={values => {
    //         onModify(values);
    //         history.push('/purchase-order');
    //       }}>
    //       {({ handleSubmit }) => (
    <>
      {/* <Form className="form form-label-right"> */}
      {title && <h6 className="text-primary">{title.toUpperCase()}</h6>}
      <div className={(column ? column : 1) > 1 ? 'row' : ''}>
        {/* {modifyModel &&
          modifyModel.map((value: any, key: any) => (
            <div className={`col-md-${12 / (column ? column : 1)} col-12`} key={key}>
                <FormTemplate 
                  values={values}
                  images={images}
                  onChange={(imageList: any, addUpdateIndex: any, key: any) => {
                    onChange(imageList, addUpdateIndex, key);

                  }}
                  modifyModel={modifyModel}
                  column={column}
                  value={value}
                />
            </div>
          ))} */}
        {
          modifyModel && (
            <>
              <div className={`col-md-${12 / (column ? column : 1)} col-12`} key={0}>
                <FormTemplate 
                  formValues={values}
                  images={images}
                  onChange={(imageList: any, addUpdateIndex: any, key: any) => {
                    onChange(imageList, addUpdateIndex, key);

                  }}
                  modifyModel={modifyModel}
                  column={column}
                  value={modifyModel[0]}
                />
              </div>
              <div className={`col-md-${12 / (column ? column : 1)} col-12`} key={1}>
                <FormTemplate 
                  formValues={values}
                  images={images}
                  onChange={(imageList: any, addUpdateIndex: any, key: any) => {
                    onChange(imageList, addUpdateIndex, key);

                  }}
                  modifyModel={modifyModel}
                  column={column}
                  value={modifyModel[1]}
                />
                <FormTemplate 
                  formValues={values}
                  images={images}
                  onChange={(imageList: any, addUpdateIndex: any, key: any) => {
                    onChange(imageList, addUpdateIndex, key);

                  }}
                  modifyModel={modifyModel}
                  column={column}
                  value={modifyModel[2]}
                  handleEditButton={setShowEdit}
                  handleDeleteButton={setShowDelete}
                  handleAddButton={setShowCreate}
                  setShippingAddressEntity={setEntityNumber}
                />
              </div>
            </>
          )
        }
      </div>

      <ModifyEntityDialogAgency
        isShow={showEdit}
        entity={editEntity}
        onModify={update}
        title={updateTitle}
        formPart={formPart}
        allFormField={allFormField}
        allFormButton={allFormButton}
        validation={PurchaseOrderSchema}
        onHide={() => {
          setShowEdit(false);
        }}
      />

      <ModifyEntityDialogAgency
        isShow={showCreate}
        entity={createEntity}
        onModify={create}
        title={createTitle}
        formPart={formPart}
        allFormField={allFormField}
        allFormButton={allFormButton}
        validation={PurchaseOrderSchema}
        onHide={() => {
          setShowCreate(false);
        }}
      />

      <DeleteEntityDialog
        moduleName={moduleName}
        title={deleteTitle}
        entity={deleteEntity}
        onDelete={deleteFn}
        isShow={showDelete}
        onHide={() => {
          setShowDelete(false);
        }}
      />
    </>
  );
}

export default ModifyEntityPageAgency;
