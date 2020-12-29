import React, {Fragment, useCallback, useEffect, useMemo, useState} from "react";
import {useIntl} from 'react-intl';


import {ConvertToTreeNode, InitMasterProps} from "../../common-library/helpers/common-function";

import {Count, Create, Delete, DeleteMany, Get, GetAll, Update} from './agency.service';
import {AgencyModel} from './agency.model';
import {MasterHeader} from "../../common-library/common-components/master-header";
import {MasterBody} from "../../common-library/common-components/master-body";
import {
  ActionsColumnFormatter,
  TickColumnFormatter
} from '../../common-library/common-components/actions-column-formatter';

import {DefaultPagination, iconStyle, NormalColumn, SortColumn} from '../../common-library/common-consts/const';


import {DeleteEntityDialog} from "../../common-library/common-components/delete-entity-dialog";
import DeleteManyEntitiesDialog from '../../common-library/common-components/delete-many-entities-dialog';
import {Route, Switch, useHistory} from 'react-router-dom';
import * as MultilevelSaleService from '../multilevel-sale/multilevel-sale.service';
import * as RoleService from './helpers/role.service';
import {
  ModifyForm,
  ModifyInputGroup,
  RenderInfoDetailDialog,
  SearchModel
} from "../../common-library/common-types/common-type";
import {MasterEntityDetailDialog} from "../../common-library/common-components/master-entity-detail-dialog";
import {GetCity, GetDistrict, GetState} from "../address/address.service";
import EntityCrudPage from "../../common-library/common-components/entity-crud-page";
import SaveOutlinedIcon from "@material-ui/icons/SaveOutlined";
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";
import AddIcon from "@material-ui/icons/Add";
import ModifyEntityDialog from "../../common-library/common-components/modify-entity-dialog";
import {GetLots, GetSubLots} from "../land-lot/land-lot.service";

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


export function AgencyShippingAddress({entity} : any) {
  const {
    showCreate,
    setShowCreate,
    showEdit,
    setShowEdit,
    editEntity,
    loading
  } = InitMasterProps<any>({
    getServer: Get,
    countServer: Count,
    createServer: Create,
    deleteServer: Delete,
    deleteManyServer: DeleteMany,
    getAllServer: GetAll,
    updateServer: Update
  });
  const intl = useIntl();
  const [state, setState] = useState<string | null | undefined>(null);
  const [city, setCity] = useState<string | null | undefined>(null);
  useEffect(() => {
    setState(entity?.state);
    setCity(entity?.city);
  }, [entity]);
  const getCity = useCallback(({queryProps, paginationProps}: any): Promise<any> => {
    console.log(state);
    return GetCity({queryProps: {...queryProps, state}, paginationProps})
  }, [state]);
  const getDistrict = useCallback(({queryProps, paginationProps}: any): Promise<any> => {
    console.log(city);
    return GetDistrict({queryProps: {...queryProps, city}, paginationProps})
  }, [city]);
  const [group1, setGroup1] = useState<ModifyInputGroup>({
    _subTitle: '',
    state: {
      _type: 'search-select',
      onSearch: GetState,
      onChange: (value: any, {setFieldValue, setFieldTouched}: any) => {
        if (state != value) {
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
        if (city != value) {
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
    detailAddress: {
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
  const [createEntity,setCreateEntity] = useState({});
  return(<Fragment>
    <button type="button" className="btn btn-primary" onClick={() => {
      setShowCreate(true);
    }}>
      <AddIcon style={iconStyle}/>
      {intl.formatMessage({id: 'AGENCY.MODIFY.ADD_SHIPPING_ADDRESS'})}
    </button>
    <ModifyEntityDialog
      formModel={createForm}
      show={showCreate}
      entity={createEntity}
      onModify={() => {
        console.log(1)}}
      onHide={() => {
        setShowCreate(false);
      }}
    />
    <ModifyEntityDialog
      formModel={updateForm}
      show={showEdit}
      entity={editEntity}
      onModify={(...add) => {
        console.log(add)}}
      onHide={() => {
        setShowEdit(false);
      }}
      loading={loading}
    />

  </Fragment>)
}
