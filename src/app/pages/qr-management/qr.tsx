import React, {Fragment, useCallback, useEffect, useMemo, useState} from "react";
import {useIntl} from 'react-intl';

import * as UserService from '../user/user.service';
import {InitMasterProps} from "../../common-library/helpers/common-function";
import {Count, Create, Delete, DeleteMany, Get, GetAll, GetType, QrTypeList, Update} from './qr.service';
import {QrModel} from './qr.model';
import {MasterHeader} from "../../common-library/common-components/master-header";
import {MasterBody} from "../../common-library/common-components/master-body";

import {DefaultPagination, NormalColumn, SortColumn} from '../../common-library/common-consts/const';
import {Link, Route, Switch, useHistory} from 'react-router-dom';
import {
  InputGroups,
  MasterBodyColumns, ModifyForm,
  RenderInfoDetail,
  SearchModel
} from "../../common-library/common-types/common-type";
import {MasterEntityDetailPage} from "../../common-library/common-components/master-detail-page";
import {
  cleaningInfo,
  commonInfo,
  harvestingInfo,
  packingInfo,
  plantingInfo,
  preliminaryTreatmentInfo,
  preservationInfo,
  producerInfo,
  seedingInfo,
  sellStatus,
} from "./qr.render-info";
import {mobileSaleMock} from "./qr-mock";
import ModifyEntityDialog from "../../common-library/common-components/modify-entity-dialog";
import {
  Display3Info,
  DisplayArray,
  DisplayDate,
  DisplayDateTime,
  DisplayInnerLink,
  DisplayPersonName,
  DisplayTable
} from "../../common-library/helpers/detail-helpers";
import 'react-toastify/dist/ReactToastify.css';
import {AxiosResponse} from 'axios';
import {ActionsColumnFormatter} from "../../common-library/common-components/actions-column-formatter";
import {MasterEntityDetailDialog} from "../../common-library/common-components/master-entity-detail-dialog";
import {Select} from 'antd';
import * as Yup from "yup";
import {format} from "date-fns";
import {DetailImage} from "../../common-library/common-components/detail/detail-image";
import {ModifyEntityPage} from "../../common-library/common-components/modify-entity-page";
import {Formik} from "formik";
import EntityCrudPage from "../../common-library/common-components/entity-crud-page";
import * as ShippingAgencyService from "../shipping-agency/shipping-agency.service";

const Option = {Select};
const headerTitle = 'QR.MASTER.HEADER.TITLE';
const tableTitle = 'SHIPPING_AGENCY.MASTER.TABLE.TITLE';
const detailBodyTitle = 'QR.DETAIL.TITLE';
const detailHeaderTitle = 'QR.HEADER.DETAIL.TITLE';
const moduleName = 'QR.MODULE_NAME';
const deleteDialogTitle = 'SHIPPING_AGENCY.DELETE_DIALOG.TITLE';
const deleteDialogBodyTitle = 'SHIPPING_AGENCY.DELETE_DIALOG.BODY_TITLE';
const createTitle = 'QR.CREATE.HEADER';
const updateTitle = 'SHIPPING_AGENCY.UPDATE.HEADER';

// const createTitle = 'PURCHASE_ORDER.CREATE.TITLE';
// const updateTitle = 'PURCHASE_ORDER.UPDATE.TITLE';
const bodyTitle = 'QR.MASTER.BODY.TITLE';


function QrPage() {
  const history = useHistory();
  const intl = useIntl();
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
    add, update, get, deleteMany, deleteFn, getAll, refreshData,
  } = InitMasterProps<QrModel>({
    getServer: Get,
    countServer: Count,
    createServer: Create,
    deleteServer: Delete,
    deleteManyServer: DeleteMany,
    getAllServer: GetAll,
    updateServer: Update
  });
  
  useEffect(() => {
    getAll(filterProps);
  }, [paginationProps, filterProps]);
  
  const [qrType, setQrType] = useState<string>();
  const [showImage, setShowImage] = useState<boolean>(false);
  
  
  const columns = useMemo(() => {
    return {
      _id: {
        dataField: '_id',
        text: `${intl.formatMessage({id: 'QR.MASTER.TABLE.CODE'})}`,
        ...SortColumn,
        align: 'center',
        formatter: (cell: string, row: any, rowIndex: number) => {
          console.log(row.type === '1');
          return <Link to={'qr/' + (row.codeType === '1' ? '' : '') + row._id}>{cell}</Link>
        },
      },
      'createdBy': {
        dataField: 'createdBy.fullName',
        text: `${intl.formatMessage({id: 'QR.MASTER.TABLE.CREATED_BY'})}`,
        ...SortColumn,
        align: 'center',
        formatter: (cell: any, row: any, rowIndex: number) => (row?.createdBy ?
          <DisplayPersonName {...row.createdBy}/> : (<>{intl.formatMessage({id: 'NO_INFORMATION'})}</>)),
      },
      createdAt: {
        dataField: 'createdAt',
        text: `${intl.formatMessage({id: 'QR.MASTER.TABLE.CREATED_DATE'})}`,
        ...SortColumn,
        formatter: (input: any) => (<DisplayDate input={input}/>),
        align: 'center',
      },
      'activeBy': {
        dataField: 'activeBy.fullName',
        text: `${intl.formatMessage({id: 'QR.MASTER.TABLE.ACTIVE_BY'})}`,
        ...SortColumn,
        align: 'center',
        formatter: (cell: any, row: any, rowIndex: number) => (row?.activeBy ?
          <DisplayPersonName {...row.activeBy}/> : (<>{intl.formatMessage({id: 'NO_INFORMATION'})}</>)),
      },
      activeAt: {
        dataField: 'activeAt',
        text: `${intl.formatMessage({id: 'QR.MASTER.TABLE.ACTIVE_AT'})}`,
        ...SortColumn,
        formatter: (input: any) => (input ? DisplayDateTime(input) : (<>{intl.formatMessage({id: 'NO_INFORMATION'})}</>)),
        align: 'center',
      },
      type: {
        dataField: 'type',
        text: `${intl.formatMessage({id: 'QR.MASTER.TABLE.CODE_TYPE'})}`,
        ...SortColumn,
        formatter: (cell: any, row: any, rowIndex: number) =>
          (<>{QrTypeList.find(t => t.code === cell)?.name}</>),
        align: 'center',
      },
    }
  }, []);
  
  
  const searchModel: SearchModel = {
    '_id': {
      type: 'string',
      label: 'QR.MASTER.SEARCH.CODE',
    },
    createdBy: {
      type: 'search-select',
      label: 'QR.MASTER.SEARCH.CREATED_BY',
      selectField: '_id',
      keyField: 'fullName',
      onSearch: UserService.GetAll,
    },
    createdAt: {
      type: 'date-time',
      label: 'QR.MASTER.SEARCH.CREATED_DATE',
    },
    activeBy: {
      type: 'search-select',
      label: 'QR.MASTER.SEARCH.ACTIVE_BY',
      selectField: '_id',
      keyField: 'fullName',
      onSearch: UserService.GetAll,
    },
    activeAt: {
      type: 'date-time',
      label: 'QR.MASTER.SEARCH.ACTIVE_AT',
    },
    __type: {
      type: 'search-select',
      label: 'QR.MASTER.SEARCH.CODE_TYPE',
      onSearch: GetType,
      keyField: 'name',
      selectField: 'code',
      onChange: (e, {setFieldValue}) => {
        setFieldValue('type', e?.code);
      }
    },
  };
  
  const shippingInfoColumns: MasterBodyColumns = [
    {
      dataField: 'exportTime',
      text: 'Thời gian xuất hàng',
      formatter: (date: string) => {
        return DisplayDateTime(date);
      },
      ...SortColumn,
      align: 'center',
    },
    {
      text: 'Địa điểm xuất hàng',
      dataField: 'exportAddress',
      formatter: (input) => {
        return DisplayArray(input)
      },
      ...SortColumn,
      align: 'center',
    },
    {
      text: 'Nhân viên xuất hàng',
      dataField: 'exportStaff.fullName',
      ...SortColumn,
      align: 'center',
    },
    {
      text: 'Nhân viên vận chuyển',
      dataField: 'shipper.fullName',
      ...SortColumn,
      align: 'center',
    },
  ];
  
  
  const shippingInfo= useMemo((): RenderInfoDetail => ([{
    header: 'THÔNG TIN VẬN CHUYỂN',
    className: 'col-12',
    titleClassName: 'col-3 mb-10',
    dataClassName: 'col-12 mb-10',
    data: {
      'sellStatus': {
        title: '',
        formatter: (val, entity) => {
          const isShow = entity.type === '1' ? (entity.productPlan != null) : entity.children.length > 0;
          return <DisplayTable entities={isShow ? mobileSaleMock.shippingInfo : []} columns={shippingInfoColumns}/>
        }
      }
    },
  }]),[]);
  
  
  const distributionInfoColumns: MasterBodyColumns = [
    ...shippingInfoColumns,
    {
      dataField: 'receiveTime',
      text: 'Thời gian nhận hàng',
      formatter: (date: string) => {
        return DisplayDateTime(date);
      },
      ...SortColumn,
      align: 'center',
    },
    {
      text: 'Địa điểm nhận hàng',
      dataField: 'receiveAddress',
      formatter: (input) => {
        return DisplayArray(input)
      },
      ...SortColumn,
      align: 'center',
    },
    {
      dataField: 'receiveStaff.fullName',
      text: 'Nhân viên xuất hàng',
      ...SortColumn,
      align: 'center',
    },
    {
      dataField: 'image.path',
      text: 'Hình ảnh',
      formatter: (cell: any, row: any, rowIndex: number) => {
        return (
          <>
            {ActionsColumnFormatter(cell, row, rowIndex, {
              onShowDetail: (cell: any) => {
                setShowImage(true);
                setLogisticImage(row);
              },
              intl
            })}
          </>
        )
      },
      ...SortColumn,
      align: 'center',
    },
  ];
  const [logisticImageDetail, setLogisticImage] = useState<any>(null);
  const logisticImageRenderDetail = useMemo((): RenderInfoDetail => ([
    {
      className: 'col-12',
      titleClassName: 'col-12',
      dataClassName: 'col-12 mb-10',
      data: {
        'imageBefore': {
          title: 'Hình ảnh xuất kho',
          formatter: (image, entity) => {
            const renderInfo = {
              title: 'IMAGE_INFO',
              component: Display3Info
            }
            return <DetailImage images={image} renderInfo={renderInfo} width={90} height={90} className={'mt-3 mr-3'}/>
          }
        },
        'imageAfter': {
          title: 'Hình ảnh nhập kho',
          formatter: (image, entity) => {
            const renderInfo = {
              title: 'IMAGE_INFO',
              component: Display3Info
            }
            return <DetailImage images={image} renderInfo={renderInfo} width={90} height={90} className={'mt-3 mr-3'}/>
          }
        },
      }
    }
  ]), []);
  const validationSchema = useMemo(() => Yup.object().shape({
    total: Yup.number()
      .min(1, 'VALIDATE.ERROR.MIN_1'),
  }), []);
  
  const distributionInfo = useMemo((): RenderInfoDetail => ([    {
    header: 'THÔNG TIN PHÂN PHỐI',
    className: 'col-12',
    titleClassName: 'col-3 mb-10',
    dataClassName: 'col-12 mb-10',
    data: {
      'sellStatus': {
        title: '',
        formatter: (val, entity) => {
          const isShow = entity.type === '1' ? (entity.productPlan != null) : entity.children.length > 0;
          return <DisplayTable entities={isShow ? mobileSaleMock.distributionInfo : []}
                               columns={distributionInfoColumns}/>
        }
      }
    },
  }]),[]);
  const downloadQrFile = useCallback((e: QrModel) => {
    return add(e).then((res: AxiosResponse<QrModel>) => {
      const date_input = new Date();
      const a = document.createElement("a"); //Create <a>
      a.href = "data:application/octet-stream;base64," + res.data.buffers; //Image Base64 Goes here
      a.download = `qr-code-${format(date_input, 'dd-MM-yyyy')}.tiff`; //File name Here
      a.click();
    })
  }, []);
  
  
  const parentQrInfo: RenderInfoDetail = useMemo(() => ([
    {
      header: 'THÔNG TIN LOGISTIC',
      className: 'col-12 mb-5',
      titleClassName: 'col-3 mb-3',
      dataClassName: 'col-9 mb-3 pl-5',
      data: {
        'scanAt': {
          title: 'Ngày gán QR',
          formatter: (input) => DisplayDateTime(input)
        },
        'scanBy.fullName': {
          title: 'Người gán QR',
        },
      },
    }
  ]), []);
  
  const childQrColumns = useMemo(() => [{
    dataField: '_',
    text: `${intl.formatMessage({id: 'ORDINAL'})}`,
    align: 'center',
    formatter: (cell: string, row: any, rowIndex: number) => {
      return (<>{rowIndex + 1}</>)
    }
  }, {
    dataField: '_id',
    text: `${intl.formatMessage({id: 'QR.MASTER.TABLE.CODE'})}`,
    align: 'center',
    ...NormalColumn,
    formatter: (e: any) => <DisplayInnerLink link={`/qr/${e}`} title={e}/>
  }, {
    dataField: 'createdBy.fullName',
    text: `${intl.formatMessage({id: 'QR.MASTER.TABLE.CREATED_BY'})}`,
    ...SortColumn,
    align: 'center',
    formatter: (cell: any, row: any, rowIndex: number) => (row?.createdBy ?
      <DisplayPersonName {...row.createdBy}/> : (<>{intl.formatMessage({id: 'NO_INFORMATION'})}</>)),
  }, {
    dataField: 'createdAt',
    text: `${intl.formatMessage({id: 'QR.MASTER.TABLE.CREATED_DATE'})}`,
    ...SortColumn,
    formatter: (input: any) => (<DisplayDate input={input}/>),
    align: 'center',
  }, {
    dataField: 'activeBy.fullName',
    text: `${intl.formatMessage({id: 'QR.MASTER.TABLE.ACTIVE_BY'})}`,
    ...SortColumn,
    align: 'center',
    formatter: (cell: any, row: any, rowIndex: number) => (row?.activeBy ?
      <DisplayPersonName {...row.activeBy}/> : (<>{intl.formatMessage({id: 'NO_INFORMATION'})}</>)),
  }, {
    dataField: 'activeAt',
    text: `${intl.formatMessage({id: 'QR.MASTER.TABLE.ACTIVE_AT'})}`,
    ...SortColumn,
    formatter: (input: any) => (input ? DisplayDateTime(input) : (<>{intl.formatMessage({id: 'NO_INFORMATION'})}</>)),
    align: 'center',
  },], []);
  const childQrInfo: RenderInfoDetail = useMemo(() => ([
    {
      header: 'Thông tin QR con',
      className: 'col-12',
      titleClassName: 'mb-10',
      dataClassName: 'col-12 mb-10',
      data: {
        'children': {
          formatter: (entity: any[]) => {
            return <DisplayTable entities={entity ?? []} columns={childQrColumns}/>
          }
        }
      },
    }
  ]), []);
  
  const [dE, setDE] = useState<any>(null);
  
  // const headerInfo: RenderInfoDetail = useMemo(() => [
  //   {
  //     header: detailBodyTitle,
  //     className: 'col-12',
  //     titleClassName: 'mb-10',
  //     dataClassName: 'col-3 mb-10',
  //     data: {
  //       '_id': {
  //         formatter: (entity) => {
  //           return (<Formik
  //             enableReinitialize={true}
  //             initialValues={{}} onSubmit={() => {
  //           }}>
  //             <ModifyEntityPage
  //               mode={'vertical'}
  //               inputGroups={panel}/>
  //           </Formik>)
  //         }
  //       }
  //     },
  //   }
  // ], [dE]);
  const renderInfoProduct: RenderInfoDetail = useMemo(() => ([
    ...producerInfo,
    ...commonInfo,
    ...seedingInfo,
    ...plantingInfo,
    ...harvestingInfo,
    ...preliminaryTreatmentInfo,
    ...cleaningInfo,
    ...packingInfo,
    ...preservationInfo,
    ...shippingInfo,
    ...distributionInfo,
    ...sellStatus
  ]), []);
  const renderInfoPacking: RenderInfoDetail = useMemo(() => ([
    ...parentQrInfo,
    ...childQrInfo,
    ...distributionInfo,
    ...shippingInfo,
  ]), []);
  const [matchId, setMatchId] = useState<any>(null);
  const [renderInfo, setRenderInfo] = useState(renderInfoProduct);
  
  const panel = useMemo((): InputGroups => ({
  
  }), []);
  const createForm = useMemo((): ModifyForm => ({
    _header: createTitle,
    _panel1: {
      _title: 'EMPTY',
      group1: {
        _subTitle: 'EMPTY',
        type: {
          required: true,
          _type: 'search-select',
          onSearch: GetType,
          keyField: 'name',
          selectField: 'code',
          label: 'QR.EDIT.CODE_TYPE',
        },
        total: {
          required: true,
          _type: 'string-number',
          onChange: (e, {setFieldValue, values}) => {
            setFieldValue('total', e.target.value && e.target.value !== '' && Number(e.target.value));
          },
          label: 'QR.EDIT.QUANTITY',
        },
      }
    }
  }), []);
  const detailForm = useMemo((): ModifyForm => ({
    _header: detailHeaderTitle,
    _panel1: {
      _title: 'EMPTY',
      group1: {
        _subTitle: 'EMPTY',
        _className: 'col-12 form-group row master-header-search-margin',
        _inputClassName: 'col-xxl-2 col-md-3 master-header-search-input-margin',
        _id: {
          _type: 'string',
          disabled: true,
          label: 'Mã QR',
        }, createdBy: {
          _type: 'object',
          fullName: {
            _type: 'string',
            disabled: true,
            label: 'Người tạo mã',
          },
        }, createdAt: {
          _type: 'date-time',
          disabled: true,
          label: 'Ngày tạo mã',
        }, type: {
          _type: 'string',
          disabled: true,
          formatter: (e)=>(e ? QrTypeList.find((val, index, arr) =>
              val.code.toLowerCase().indexOf(e.toLowerCase()) > -1
          )?.name:''),
          label: 'Loại mã',
        },
      }
    }
  }), []);
  
  useEffect(() => {
    matchId && get({_id: matchId} as any).then(e => {
      const qr = e.data;
      setRenderInfo(qr.type === '1' ? renderInfoProduct : renderInfoPacking);
      setDE(qr);
    });
  }, [matchId]);
  return (
    <Fragment>
      <Switch>
        <Route path="/qr" exact={true}>
          <MasterHeader
            title={headerTitle}
            onSearch={(value) => {
              setPaginationProps(DefaultPagination)
              setFilterProps(value)
            }}
            searchModel={searchModel}
          />
          <MasterBody
            title={bodyTitle}
            onCreate={() => {
              // history.push(`${window.location.pathname}/0000000`);
              setShowCreate(true);
            }}
            // entities={bodyEntities}
            entities={entities}
            total={total}
            columns={columns}
            loading={loading}
            paginationParams={paginationProps}
            setPaginationParams={setPaginationProps}
          />
          <ModifyEntityDialog
            show={showCreate}
            validation={validationSchema}
            formModel={createForm}
            loading={loading}
            onHide={refreshData}
            onModify={downloadQrFile}
          />
        </Route>
        <Route path="/qr/:code">
          {({history, match}) => {
            setMatchId(match && match.params.code);
            return (
              <>
                {/*<MasterEntityDetailPage*/}
                {/*  entity={dE}*/}
                {/*  header={detailHeaderTitle}*/}
                {/*  renderInfo={headerInfo}*/}
                {/*  code={match && match.params.code}*/}
                {/*  onClose={() => history.push('/qr')}*/}
                {/*/>*/}
                <EntityCrudPage
                  onModify={(()=>{}) as any}
                  moduleName={moduleName}
                  formModel={detailForm}
                  mode={'vertical'}
                  entity={dE}
                />
                <MasterEntityDetailPage
                  entity={dE}
                  header={detailBodyTitle}
                  renderInfo={renderInfo}
                  code={match && match.params.code}
                />
                <MasterEntityDetailDialog
                  title='EMPTY'
                  show={showImage}
                  entity={logisticImageDetail}
                  renderInfo={logisticImageRenderDetail}
                  onHide={() => {
                    setShowImage(false)
                  }
                  }
                  size='sm'
                />
              </>
            );
          }}
        </Route>
      </Switch>
    </Fragment>
  );
}

export default QrPage;
