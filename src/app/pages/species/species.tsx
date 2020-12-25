import React, {Fragment, useEffect, useState, useMemo} from 'react';
import {useIntl} from 'react-intl';
import {
  DefaultPagination,
  NormalColumn,
  SortColumn,
  StatusValue,
} from '../../common-library/common-consts/const';
import {MasterHeader} from '../../common-library/common-components/master-header';
import {MasterBody} from '../../common-library/common-components/master-body';
import {ActionsColumnFormatter} from '../../common-library/common-components/actions-column-formatter';
import {DeleteEntityDialog} from '../../common-library/common-components/delete-entity-dialog';
import DeleteManyEntitiesDialog from '../../common-library/common-components/delete-many-entities-dialog';
import {
  generateInitForm,
  getField,
  InitMasterProps,
} from '../../common-library/helpers/common-function';
import {Switch, Route, useHistory} from 'react-router-dom';
import EntityCrudPage from '../../common-library/common-components/entity-crud-page';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import * as Yup from 'yup';
import {SpeciesModel} from './species.model';
import * as ProductTypeService from './species.service';
import 'react-toastify/dist/ReactToastify.css';
import {
  MasterEntityDetailDialog
} from "../../common-library/common-components/master-entity-detail-dialog";
import { ModifyForm, ModifyInputGroup, RenderInfoDetailDialog, SearchModel } from '../../common-library/common-types/common-type';

const headerTitle = 'PRODUCT_TYPE.MASTER.HEADER.TITLE';
const bodyTitle = 'PRODUCT_TYPE.MASTER.BODY.TITLE';
const moduleName = 'PRODUCT_TYPE.MODULE_NAME';
const deleteDialogTitle = 'PRODUCT_TYPE.DELETE_DIALOG.TITLE';
const createTitle = 'PRODUCT_TYPE.CREATE.TITLE';
const updateTitle = 'PRODUCT_TYPE.UPDATE.TITLE';

export const GenerateCode = (data: any[]) => {
  const lastEntity = data[data.length - 1].code;
  let i;
  for (i = 0; i < lastEntity.length; i++) {
    if (lastEntity[i] !== '0') {
      break;
    }
  }
  
  const lastIndex = parseInt(lastEntity.slice(i));
  
  if (lastIndex < 9) {
    return `00000${lastIndex + 1}`;
  } else if (lastIndex < 99) {
    return `0000${lastIndex + 1}`;
  } else if (lastIndex < 999) {
    return `000${lastIndex + 1}`;
  }
  return `00${lastIndex + 1}`;
};

function Species() {
  const intl = useIntl();
  
  const history = useHistory();
  const {
    entities,
    setEntities,
    deleteEntity,
    setDeleteEntity,
    editEntity,
    setEditEntity,
    createEntity,
    setCreateEntity,
    selectedEntities,
    setSelectedEntities,
    detailEntity,
    setDetailEntity,
    showDelete,
    setShowDelete,
    showEdit,
    setShowEdit,
    showCreate,
    setShowCreate,
    showDetail,
    setShowDetail,
    showDeleteMany,
    setShowDeleteMany,
    paginationProps,
    setPaginationProps,
    filterProps,
    setFilterProps,
    total,
    setTotal,
    loading,
    setLoading,
    error,
    setError,
    add,
    update,
    get,
    deleteMany,
    deleteFn,
    getAll,
    refreshData,
  } = InitMasterProps<SpeciesModel>({
    getServer: ProductTypeService.Get,
    countServer: ProductTypeService.Count,
    createServer: ProductTypeService.Create,
    deleteServer: ProductTypeService.Delete,
    deleteManyServer: ProductTypeService.DeleteMany,
    getAllServer: ProductTypeService.GetAll,
    updateServer: ProductTypeService.Update,
  });
  console.log(entities);
  useEffect(() => {
    getAll(filterProps);
  }, [paginationProps, filterProps]);
  
  const columns = {
    code: {
      dataField: 'code',
      text: `${intl.formatMessage({id: 'PRODUCT_TYPE.MASTER.TABLE.CODE_COLUMN'})}`,
      ...SortColumn,
      classes: 'text-center',
    },
    name: {
      dataField: 'name',
      text: `${intl.formatMessage({id: 'PRODUCT_TYPE.MASTER.TABLE.NAME_COLUMN'})}`,
      ...SortColumn,
      classes: 'text-center',
    },
    
    barcode: {
      dataField: 'barcode',
      text: `${intl.formatMessage({id: 'PRODUCT_TYPE.MASTER.TABLE.BARCODE_COLUMN'})}`,
      ...SortColumn,
      classes: 'text-center',
      headerClasses: 'text-center',
    },
    action: {
      dataField: 'action',
      text: `${intl.formatMessage({id: 'PURCHASE_ORDER.MASTER.TABLE.ACTION_COLUMN'})}`,
      formatter: ActionsColumnFormatter,
      formatExtraData: {
        intl,
        onShowDetail: (entity: SpeciesModel) => {
          get(entity);
          setShowDetail(true);
          setDetailEntity(entity);
        },
        onDelete: (entity: SpeciesModel) => {
          setDeleteEntity(entity);
          setShowDelete(true);
        },
        onEdit: (entity: SpeciesModel) => {
          get(entity);
          // setShowEdit(true);
          setEditEntity(entity);
          history.push(`${window.location.pathname}/${entity._id}`);
        },
      },
      ...NormalColumn,
      style: {minWidth: '130px'},
    },
  };
  
  const schema = Yup.object().shape({
    name: Yup.string().required('Tên chủng loại không được để trống').matches(/^[aAàÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬbBcCdDđĐeEèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆfFgGhHiIìÌỉỈĩĨíÍịỊjJkKlLmMnNoOòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢpPqQrRsStTuUùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰvVwWxXyYỳỲỷỶỹỸýÝỵỴzZ ]+$/u, {
      message: 'Tên không hợp lệ. Tên không chứa số và ký tự đặc biệt',
    }).test('Exists validate', 'Tên chủng loại đã tồn tại', function (value) {
      if (editEntity) {
        const validArr = entities.filter(item => item._id !== editEntity._id)
        const index = validArr.findIndex(el => el.name === value)
        return index === -1
      }
      
      const index = entities.findIndex(el => el.name === value)
      return index === -1
    }),
    barcode: Yup.string()
      .required('GTIN không được để trống')
      .max(10, 'Vui lòng nhập tối đa 10 ký tự')
      .matches(/^[0-9]+$/u, {
        message: 'GTIN không hợp lệ. GTIN không chứa chữ cái và ký tự đặc biệt',
      }).test('Exists validate', 'GTIN đã tồn tại', function (value) {
        if (editEntity) {
          const validArr = entities.filter(item => item._id !== editEntity._id)
          const index = validArr.findIndex(el => el.barcode === value)
          return index === -1
        }
        const index = entities.findIndex(el => el.barcode === value)
        return index === -1
      }),
    growingDays: Yup.number()
      .required('Số ngày gieo giống không được để trống')
      .min(1, 'Số ngày không được ít hơn 1 nha')
      .typeError('Vui lòng nhập số'),
    plantingDays: Yup.number()
      .required('Số ngày gieo trồng không được để trống')
      .min(1, 'KSố ngày không được ít hơn 1 nha')
      .typeError('Vui lòng nhập số'),
    expiryDays: Yup.number()
      .required('Hạn sử dụng không được để trống')
      .min(1, 'Số ngày không được ít hơn 1 nha')
      .typeError('Vui lòng nhập số'),
  });

  const masterEntityDetailDialog: RenderInfoDetailDialog = [
    {
      data: {
        image: {
          formatter: (data) => (
            <img src={data ? data.path : ''} alt="rau" className="border border-primary" width="200px"
                 height="200px"/>
          )
        }
      },
      className: 'col-5 d-flex justify-content-center align-items-center ml-10',
      dataClassName: 'd-flex',
    },
    {
      data: {
        code: {title: 'PRODUCT_TYPE.MASTER.DETAIL_DIALOG.CODE'},
        name: {title: 'PRODUCT_TYPE.MASTER.DETAIL_DIALOG.NAME'},
        barcode: {title: 'PRODUCT_TYPE.MASTER.DETAIL_DIALOG.BARCODE'},
        growingDays: {title: 'PRODUCT_TYPE.MASTER.DETAIL_DIALOG.GROW'},
        plantingDays: {title: 'PRODUCT_TYPE.MASTER.DETAIL_DIALOG.PLANTING'},
        expiryDays: {title: 'PRODUCT_TYPE.MASTER.DETAIL_DIALOG.EXPIRY'},
      },
      className: 'col-6',
    },
  ];
  
  const productTypeSearchModel: SearchModel = {
    code: {
      type: 'string',
      label: 'PRODUCT_TYPE.MASTER.TABLE.CODE_COLUMN',
    },
    name: {
      type: 'string',
      label: 'PRODUCT_TYPE.MASTER.TABLE.NAME_COLUMN',
    },
  };
  
  const [group1, setGroup1] = useState<ModifyInputGroup>({
    _subTitle: 'THÔNG TIN CHUNG',
    _className: 'col-6 pr-xl-15 pr-md-10 pr-5',
    code: {
      _type: 'string',
      label: 'PRODUCT_TYPE.MASTER.TABLE.CODE_COLUMN',
      required: true,
      disabled: true,
    },
    name: {
      _type: 'string',
      required: true,
      label: 'PRODUCT_TYPE.MASTER.TABLE.NAME_COLUMN',
    },
    barcode: {
      _type: 'string',
      required: true,
      label: 'PRODUCT_TYPE.MASTER.TABLE.BARCODE_COLUMN',
    },
    images: {
      _type: 'image',
      // value: null,
      label: 'PRODUCT_TYPE.MASTER.IMAGE',
      maxNumber: 1
    },
    // avatar: {
    //   type: 'image',
    //   placeholder: 'PURCHASE_ORDER.MASTER.HEADER.CODE.LABEL',
    //   label: 'Album 2',
    // },
  });
  const [group2, setGroup2] = useState<ModifyInputGroup>({
    _subTitle: 'THÔNG TIN VÒNG ĐỜI',
    _className: 'col-6 pl-xl-15 pl-md-10 pl-5',
    growingDays: {
      _type: 'number',
      label: 'PRODUCT_TYPE.MASTER.DETAIL_DIALOG.GROW',
    },
    plantingDays: {
      _type: 'number',
      label: 'PRODUCT_TYPE.MASTER.DETAIL_DIALOG.PLANTING',
    },
    expiryDays: {
      _type: 'number',
      label: 'PRODUCT_TYPE.MASTER.DETAIL_DIALOG.EXPIRY',
    },
  });
  
  const createForm = useMemo((): ModifyForm => ({
    _header: "createTitle",
    panel1: {
      _title: '',
      group1: group1,
      group2: group2,
    },
  }), []);
  const updateForm = useMemo((): ModifyForm => ({...createForm, _header: "sada"}), [createForm]);

  const initForm = useMemo(() => ({
    code: '',
    name: '',
    barcode: '',
    images: [],
    growingDays: '',
    plantingDays: '',
    expiryDays: ''
  }), [])
  
  const allFormButton: any = {
    type: 'inside',
    data: {
      save: {
        role: 'submit',
        type: 'submit',
        linkto: undefined,
        className: 'btn btn-primary mr-5 pl-8 pr-8',
        label: 'Lưu',
        icon: <SaveOutlinedIcon/>,
      },
      cancel: {
        role: 'link-button',
        type: 'button',
        linkto: '/species',
        className: 'btn btn-outline-primary mr-2 pl-8 pr-8',
        label: 'Hủy',
        icon: <CancelOutlinedIcon/>,
      },
    },
  };
  return (
    <Fragment>
      {/* <ReactNotification /> */}
      {/* <ToastContainer /> */}
      <MasterEntityDetailDialog
        show={showDetail}
        entity={detailEntity}
        renderInfo={masterEntityDetailDialog}
        onHide={() => {
          setShowDetail(false);
        }}
        moduleName={moduleName}
        size={'lg'}
      />
      <DeleteEntityDialog
        moduleName={moduleName}
        entity={deleteEntity}
        onDelete={deleteFn}
        isShow={showDelete}
        loading={loading}
        error={error}
        onHide={() => {
          setShowDelete(false);
        }}
        title={deleteDialogTitle}
      />
      <DeleteManyEntitiesDialog
        moduleName={moduleName}
        selectedEntities={selectedEntities}
        loading={loading}
        isShow={showDeleteMany}
        onDelete={deleteMany}
        error={error}
        onHide={() => {
          setShowDeleteMany(false);
        }}
      />
      
      <Switch>
        <Route path="/species/new">
          <EntityCrudPage
            entity={initForm}
            onModify={add}
            // reduxModel="purchaseOrder"
            get={() => null}
            formModel={createForm}
            // allFormField={allFormField}
            actions={allFormButton}
            validation={schema}
            // autoFill={{
            //   field: 'code',
            //   data: GenerateCode(data),
            // }}
          />
        </Route>
        <Route path={`/species/:code`}>
          {({history, match}) => (
            // <ModifyEntityPage
            //   entity={editEntity}
            //   onModify={update}
            //   title={updateTitle}
            //   modifyModel={modifyModel}
            //   reduxModel="purchaseOrder"
            //   code={match && match.params.code}
            //   get={PurchaseOrderService.GetById}
            // />
            <EntityCrudPage
              entity={editEntity}
              onModify={update}
              code={match && match.params.code}
              get={ProductTypeService.GetById}
              formModel={updateForm}
              // allFormField={allFormField}
              actions={allFormButton}
              validation={schema}
            />
          )}
        </Route>
        <Route path="/species">
          <MasterHeader
            title={headerTitle}
            onSearch={value => {
              setPaginationProps(DefaultPagination);
              setFilterProps(value);
            }}
            searchModel={productTypeSearchModel}
          />
          <MasterBody
            title={bodyTitle}
            onCreate={() => {
              setCreateEntity(null);
              setEditEntity(null);
              // setShowCreate(true);
              history.push(`${window.location.pathname}/new`);
            }}
            onDeleteMany={() => setShowDeleteMany(true)}
            selectedEntities={selectedEntities}
            onSelectMany={setSelectedEntities}
            entities={entities}
            total={total}
            columns={columns as any}
            loading={loading}
            paginationParams={paginationProps}
            setPaginationParams={setPaginationProps}
            isShowId={true}
          />
          
          {/* <MasterTreeStructure /> */}
        </Route>
      </Switch>
    </Fragment>
  );
}

export default Species;
