import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { useFormikContext } from 'formik';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import * as Yup from 'yup';
import FormTemplate from './form-template';
import {
  GenerateAllFormField
} from '../../../common-library/helpers/common-function';
import { DeleteEntityDialog } from '../../../common-library/common-components/delete-entity-dialog';
import ModifyEntityDialog from '../../../common-library/common-components/modify-entity-dialog';
import ModifyShippingAddressDialog from './modify-shipping-address-dialog';
import { NotifyDialog } from '../../../common-library/common-components/notify-dialog';


function ModifyEntityPageAgency<T>({
  modifyModel,
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
  const modifyM = { ...modifyModel } as any;

  const [entities, setEntities] = useState<T[]>([]);
  const [deleteEntity, setDeleteEntity] = useState<T>();
  const [editEntity, setEditEntity] = useState(values && values.shippingAddress);
  const [createEntity, setCreateEntity] = useState<any>({
    state: null,
    city: null,
    district: null,
    isDefault: false
  });
  const [selectedEntities, setSelectedEntities] = useState<T[]>([]);
  const [detailEntity, setDetailEntity] = useState<T>(null as any);
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [entityNumber, setEntityNumber] = useState(-1);
  const { setFieldValue, errors, touched } = useFormikContext<any>();

  const [ showNotifyDialog, setShowNotifyDialog ] = useState<boolean>(false);

  const getShippingAddress = (entityNumber: number) => {
    return new Promise((resolve, reject) => {
      if(values && values.shippingAddress) {
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
      if(values && values.shippingAddress) {
        resolve(values.shippingAddress);
      } else {
        reject((err: any) => {
          console.log(err);
        });
      }
    })
  }

  const PurchaseOrderSchema = Yup.object().shape({
    state: Yup.string().required(intl.formatMessage({id: 'AGENCY.EDIT.VALIDATION.SHIPPING_ADDRESS_STATE'})),
    city: Yup.string().required(intl.formatMessage({id: 'AGENCY.EDIT.VALIDATION.SHIPPING_ADDRESS_CITY'})),
    district: Yup.string().required(intl.formatMessage({id: 'AGENCY.EDIT.VALIDATION.SHIPPING_ADDRESS_DISTRICT'})),
    address: Yup.string().required(intl.formatMessage({id: 'AGENCY.EDIT.VALIDATION.SHIPPING_ADDRESS_ADDRESS'})),
  });

  const modifyModelAddress = [
    {
      title: '',
      data: {
        state: {
          type: 'stateSelect',
          placeholder: intl.formatMessage({
            id: 'AGENCY.EDIT.PLACEHOLDER.SHIPPING_ADDRESS_STATE',
          }),
          required: true,
          label: intl.formatMessage({ id: 'AGENCY.EDIT.LABEL.SHIPPING_ADDRESS_STATE' }),
        },
        city: {
          type: 'citySelect',
          placeholder: intl.formatMessage({
            id: 'AGENCY.EDIT.PLACEHOLDER.SHIPPING_ADDRESS_CITY',
          }),
          required: true,
          label: intl.formatMessage({ id: 'AGENCY.EDIT.LABEL.SHIPPING_ADDRESS_CITY' }),
        },
        district: {
          type: 'districtSelect',
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
      },
    },
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
    getShippingAddressesSync()
    .then((shippingAddresses: any) => {
      const deleteAddr = shippingAddresses.find((addr: any) => addr._id === entity._id);
      shippingAddresses = shippingAddresses.filter((addr: any) => {
            return entity._id !== addr._id;
          });
      const lastIdx = shippingAddresses.length - 1;
      const currentDefault = currentAddress > lastIdx ? lastIdx : currentAddress;
      if(currentDefault <= -1) {
        setCurrentAddress(currentDefault);
      } else {
        setCurrentAddress(currentDefault);
        shippingAddresses[currentDefault].isDefault = true;
      }
      for(let i = deleteAddr._id; i <= lastIdx - 1; i++) {
        shippingAddresses[i]._id --;
      }
      setFieldValue('shippingAddress', shippingAddresses);
      values.shippingAddress = shippingAddresses
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
        const _entity = {...entity, _id: (shippingAddresses.length), isDefault: shippingAddresses.length === 0 ? true : false};
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
    getShippingAddressesSync()
    .then((res: any) => {
      setEditEntity(res[entityNumber]);
      setDeleteEntity(res[entityNumber]);
    });
  }, [entityNumber]);

  
  const [currentAddress, setCurrentAddress] = useState<any>('');

  return (
    <>
      {title && <h6 className="text-primary">{title.toUpperCase()}</h6>}
      <div className={(column ? column : 1) > 1 ? 'row' : ''}>
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
                  modifyModel={modifyModel[0]}
                  column={column}
                />
              </div>
              <div className={`col-md-${12 / (column ? column : 1)} col-12`} key={1}>
                <FormTemplate 
                  formValues={values}
                  images={images}
                  onChange={(imageList: any, addUpdateIndex: any, key: any) => {
                    onChange(imageList, addUpdateIndex, key);

                  }}
                  modifyModel={modifyModel[1]}
                  column={column}
                />
                <div className={'mt-2'}></div>
                <FormTemplate 
                  formValues={values}
                  images={images}
                  onChange={(imageList: any, addUpdateIndex: any, key: any) => {
                    onChange(imageList, addUpdateIndex, key);

                  }}
                  modifyModel={modifyModel[2]}
                  column={column}
                  handleEditButton={setShowEdit}
                  handleDeleteButton={setShowDelete}
                  handleAddButton={setShowCreate}
                  setShippingAddressEntity={setEntityNumber}
                  currentAddress={currentAddress}
                  setCurrentAddress={setCurrentAddress}
                />
              </div>
            </>
          )
        }
      </div>

      <ModifyShippingAddressDialog
        modifyModel={modifyModelAddress}
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

      <ModifyShippingAddressDialog
        modifyModel={modifyModelAddress}
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
        loading={false}
        error=''
      />

      <NotifyDialog
        isShow={showNotifyDialog}
        onHide={() => setShowNotifyDialog(false)}
        moduleName='SHIPPING_ADDRESS.MODULE_NAME'
        notifyMessage='DELETE.ERROR.SHIPPING_ADDRESS.SHIPPING_ADDRESS_IN_USE'
      />
    </>
  );
}

export default ModifyEntityPageAgency;
