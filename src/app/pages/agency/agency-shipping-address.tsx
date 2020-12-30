import React, {Fragment, useCallback, useEffect, useMemo, useState} from "react";
import {useIntl} from 'react-intl';


import {DeleteEntityDialog} from "../../common-library/common-components/delete-entity-dialog";
import {ModifyForm, ModifyInputGroup} from "../../common-library/common-types/common-type";
import {GetCity, GetDistrict, GetState} from "../address/address.service";
import ModifyEntityDialog from "../../common-library/common-components/modify-entity-dialog";

const headerTitle = 'AGENCY.MASTER.HEADER.TITLE';
const tableTitle = 'SHIPPING_AGENCY.MASTER.TABLE.TITLE';
const detailDialogTitle = 'SHIPPING_AGENCY.DETAIL_DIALOG.TITLE';
const moduleName = 'AGENCY.MODULE_NAME';
const deleteDialogTitle = 'SHIPPING_AGENCY.DELETE_DIALOG.TITLE';
const deleteDialogBodyTitle = 'SHIPPING_AGENCY.DELETE_DIALOG.BODY_TITLE';
const createTitle = 'SHIPPING_AGENCY.CREATE.HEADER';
const updateTitle = 'SHIPPING_AGENCY.UPDATE.HEADER';

// const createTitle = 'PURCHASE_ORDER.CREATE.TITLE';
// const updateTitle = 'PURCHASE_ORDER.UPDATE.TITLE';
const bodyTitle = 'AGENCY.MASTER.BODY.TITLE';


export function AgencyShippingAddress({
                                        onCreate,
                                        onEdit,
                                        onDelete,
                                        showCreate,
                                        showEdit,
                                        showDelete,
                                        editEntity,
                                        deleteEntity
                                      }:
                                        { onCreate: (...props: any) => any, onEdit: (...props: any) => any, onDelete: (...props: any) => any, showCreate: {show:boolean}, showEdit: {show:boolean}, showDelete: {show:boolean}, editEntity: any, deleteEntity: any }) {
  const intl = useIntl();
  const [state, setState] = useState<string | null | undefined>(null);
  const [city, setCity] = useState<string | null | undefined>(null);
  useEffect(() => {
    setState(editEntity?.state);
    setCity(editEntity?.city);
  }, [editEntity]);
  const getCity = useCallback(({queryProps, paginationProps}: any): Promise<any> => {
    return GetCity({queryProps: {...queryProps, state}, paginationProps})
  }, [state]);
  const getDistrict = useCallback(({queryProps, paginationProps}: any): Promise<any> => {
    return GetDistrict({queryProps: {...queryProps, city}, paginationProps})
  }, [city]);
  const [group1, setGroup1] = useState<ModifyInputGroup>({
    _subTitle: '',
    state: {
      _type: 'search-select',
      onSearch: GetState,
      onChange: (value: any, {setFieldValue, setFieldTouched}: any) => {
        console.log(state, value);
        if (!value || state != value) {
          setCity(null);
          setFieldValue('city', '');
          setFieldTouched('city', false);
          setFieldValue('district', '');
          setFieldTouched('district', false);
        }
        setState(value);
      },
      required: true,
      label: 'AGENCY.MODIFY.SHIPPING_ADDRESS.STATE',
    },
    city: {
      _type: 'search-select',
      onSearch: getCity,
      // selectField: 'code',
      required: true,
      onChange: (value: any, {setFieldValue, setFieldTouched}: any) => {
        if (!value || city != value) {
          setFieldValue('district', '');
          setFieldTouched('district', false);
        }
        setCity(value);
      },
      disabled: (values: any) => {
        return (values?.state === '');
      },
      label: 'AGENCY.MODIFY.SHIPPING_ADDRESS.CITY',
    },
    district: {
      _type: 'search-select',
      onSearch: getDistrict,
      // selectField: 'code',
      required: true,
      disabled: (values: any) => {
        return (values?.city === '');
      },
      label: 'AGENCY.MODIFY.SHIPPING_ADDRESS.DISTRICT',
    },
    address: {
      _type: 'string',
      required: true,
      label: 'AGENCY.MODIFY.SHIPPING_ADDRESS.ADDRESS',
    },
  });
  const createForm = useMemo((): ModifyForm => ({
    _header: createTitle,
    panel1: {
      _title: '',
      group1: group1,
    },
  }), [group1]);
  const updateForm = useMemo((): ModifyForm => {
    return ({...createForm, _header: updateTitle});
  }, [createForm]);
  const [_create, setShowCreate] = useState(showCreate?.show);
  useEffect(() => {
    setShowCreate(showCreate?.show);
  }, [showCreate]);
  
  const [_update, setShowUpdate] = useState(showEdit?.show);
  useEffect(() => {
    console.log(showEdit);
    setShowUpdate(showEdit?.show);
  }, [showEdit]);
  
  const [_delete, setShowDelete] = useState(showDelete?.show);
  useEffect(() => {
    console.log(showDelete);
    setShowDelete(showDelete?.show);
  }, [showDelete]);
  return (<Fragment>
    {/*<button type="button" className="btn btn-primary" onClick={() => {*/}
    {/*  setShowCreate(true);*/}
    {/*}}>*/}
    {/*  <AddIcon style={iconStyle}/>*/}
    {/*  {intl.formatMessage({id: 'AGENCY.MODIFY.ADD_SHIPPING_ADDRESS'})}*/}
    {/*</button>*/}
    <ModifyEntityDialog
      moduleName={moduleName}
      formModel={createForm}
      show={_create}
      onModify={onCreate}
      onHide={() => {
        setShowCreate(false);
      }}
    />
    <ModifyEntityDialog
      moduleName={moduleName}
      formModel={updateForm}
      show={_update}
      entity={editEntity}
      onModify={onEdit}
      onHide={() => {
        setShowUpdate(false);
      }}
    />
    <DeleteEntityDialog
      moduleName={moduleName}
      entity={deleteEntity}
      onDelete={onDelete}
      isShow={_delete}
      onHide={() => {
        setShowDelete(false);
      }}
    />
  </Fragment>)
}
