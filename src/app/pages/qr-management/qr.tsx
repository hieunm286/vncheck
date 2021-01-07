import React, {Fragment, useCallback, useEffect, useMemo, useState} from "react";
import {useIntl} from 'react-intl';

import * as UserService from '../user/user.service';
import {InitMasterProps} from "../../common-library/helpers/common-function";
import {Count, Create, Delete, DeleteMany, Get, GetAll, GetType, QrTypeList, Update} from './qr.service';
import {QrModel} from './qr.model';
import {MasterHeader} from "../../common-library/common-components/master-header";
import {MasterBody} from "../../common-library/common-components/master-body";

import {DefaultPagination, SortColumn} from '../../common-library/common-consts/const';


import {DeleteEntityDialog} from "../../common-library/common-components/delete-entity-dialog";
import DeleteManyEntitiesDialog from '../../common-library/common-components/delete-many-entities-dialog';
import {Link, Route, Switch, useHistory} from 'react-router-dom';
import {MasterBodyColumns, RenderInfoDetail, SearchModel} from "../../common-library/common-types/common-type";
import {MasterEntityDetailPage} from "../../common-library/common-components/master-detail-page";
import {producerInfo,} from "./qr.render-info";
import {detailEntityMock, mobileSaleMock} from "./qr-mock";
import ModifyEntityDialog from "../../common-library/common-components/modify-entity-dialog";
import {MasterQrChildDetail} from "./qr-detail";
import {
  DisplayArray,
  DisplayCoordinates,
  DisplayDate,
  DisplayDateTime,
  DisplayTable
} from "../../common-library/helpers/detail-helpers";
import 'react-toastify/dist/ReactToastify.css';
import {AxiosResponse} from 'axios';
import {ActionsColumnFormatter} from "../../common-library/common-components/actions-column-formatter";
import {MasterEntityDetailDialog} from "../../common-library/common-components/master-entity-detail-dialog";
import {DetailImage} from "../../common-library/common-components/detail/detail-image";
import {Select} from 'antd';
import * as Yup from "yup";
import {format} from "date-fns";

const Option = {Select};
const headerTitle = 'QR.MASTER.HEADER.TITLE';
const tableTitle = 'SHIPPING_AGENCY.MASTER.TABLE.TITLE';
const detailDialogTitle = 'SHIPPING_AGENCY.DETAIL_DIALOG.TITLE';
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
        formatter: (cell: any, row: any, rowIndex: number) => (<>{cell}</>),
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
        formatter: (cell: any, row: any, rowIndex: number) => (<>{cell ?? intl.formatMessage({id: 'NO_INFORMATION'})}</>),
      },
      activeAt: {
        dataField: 'activeAt',
        text: `${intl.formatMessage({id: 'QR.MASTER.TABLE.ACTIVE_AT'})}`,
        ...SortColumn,
        formatter: (input: any) => (input ?
          <DisplayDate input={input}/> : (<>{intl.formatMessage({id: 'NO_INFORMATION'})}</>)),
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
  
  
  const shippingInfo: RenderInfoDetail = [{
    
    header: 'THÔNG TIN VẬN CHUYỂN',
    className: 'col-12',
    titleClassName: 'col-3 mb-10',
    dataClassName: 'col-12 mb-10',
    data: {
      'sellStatus': {
        title: '',
        formatter: (entity: any[]) => {
          
          return <DisplayTable entities={mobileSaleMock.shippingInfo} columns={shippingInfoColumns}/>
        }
      }
    },
  }];
  
  
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
                setShowImage(true)
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
  
  const validationSchema = useMemo(() => Yup.object().shape({
    total: Yup.number()
      .min(1, 'VALIDATE.ERROR.MIN_1'),
  }), []);
  
  const distributionInfo: RenderInfoDetail = [{
    
    header: 'THÔNG TIN PHÂN PHỐI',
    className: 'col-12',
    titleClassName: 'col-3 mb-10',
    dataClassName: 'col-12 mb-10',
    data: {
      'sellStatus': {
        title: '',
        formatter: (entity: any[]) => {
          
          return <DisplayTable entities={mobileSaleMock.distributionInfo} columns={distributionInfoColumns}/>
        }
      }
    },
  }];
  const downloadQrFile = useCallback((e: QrModel) => {
    return add(e).then((res: AxiosResponse<QrModel>) => {
      const date_input = new Date();
      const a = document.createElement("a"); //Create <a>
      a.href = "data:application/octet-stream;base64," + res.data.buffers; //Image Base64 Goes here
      a.download = `qr-code-${format(date_input, 'dd-MM-yyyy')}.tiff`; //File name Here
      a.click();
    })
  }, []);
  
  
  const imageRenderDetail: RenderInfoDetail = [
    {
      header: '',
      className: 'col-12',
      titleClassName: '',
      dataClassName: 'col-12',
      data: {
        'productPlan.packing.packingImage': {
          title: '',
          formatter: (input, entity) => {
            return (<DetailImage images={input} renderInfo={entity} className='text-center' width={300} height={300}/>);
          }
        },
      },
    },
    {
      header: '',
      className: 'col-12',
      titleClassName: '',
      dataClassName: 'row mb-3 pl-5',
      data: {
        'code': {
          title: 'Mã QR sản phẩm',
        },
        'productPlan.seeding.species.name': {
          title: 'Thông tin sản phẩm',
        },
        'takenBy.fullName': {
          title: 'Người chụp',
        },
        'activeBy.fullName': {
          title: 'Người gán mã',
        },
        'activeAt': {
          title: 'Thời gian gán mã',
          formatter: (date: string) => DisplayDateTime(date),
        },
        'takenLocation.coordinates': {
          title: 'Địa điểm chụp',
          formatter: DisplayCoordinates,
        },
      },
      // titleClassName: 'col-3'
    },
  ];
  
  const QrRenderDetail2 = [
    ...shippingInfo,
    ...distributionInfo,
  ]
  
  const renderInfoProduct: RenderInfoDetail = useMemo(() => ([
    ...producerInfo,
    // ...seedingInfo,
    // ...plantingInfo,
    // ...harvestingInfo,
    // ...preliminaryTreatmentInfo,
    // ...cleaningInfo,
    // ...packingInfo,
    // ...preservationInfo,
    // ...shippingInfo,
    // ...distributionInfo,
    // ...sellStatus
  ]), []);
  const renderInfoPacking: RenderInfoDetail = useMemo(() => ([
    ...producerInfo,
    // ...seedingInfo,
    // ...plantingInfo,
    // ...harvestingInfo,
    // ...preliminaryTreatmentInfo,
    // ...cleaningInfo,
    // ...packingInfo,
    // ...preservationInfo,
    // ...shippingInfo,
    // ...distributionInfo,
    // ...sellStatus
  ]), []);
  const [dE, setDE] = useState<any>(null);
  const [matchId, setMatchId] = useState<any>(null);
  const [renderInfo, setRenderInfo] = useState(renderInfoProduct);
  useEffect(() => {
    matchId && get({_id: matchId} as any).then(e => {
      const qr = e.data;
      setRenderInfo(qr.type === '1' ? renderInfoProduct : renderInfoPacking);
      setDE(qr);
    });
  }, [matchId]);
  return (
    <Fragment>
      <DeleteEntityDialog
        moduleName={moduleName}
        entity={deleteEntity}
        onDelete={deleteFn}
        isShow={showDelete}
        onHide={() => {
          setShowDelete(false);
        }}
        loading={loading}
        error={error}
      />
      <DeleteManyEntitiesDialog
        moduleName={moduleName}
        selectedEntities={selectedEntities}
        loading={loading}
        isShow={showDeleteMany}
        onDelete={deleteMany}
        onHide={() => {
          setShowDeleteMany(false);
        }}
        error={error}
      />
      
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
            formModel={{
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
  
            }}
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
                <MasterEntityDetailPage
                  entity={dE}
                  renderInfo={renderInfo} // renderInfo={detailModel}
                  code={match && match.params.code}
                  onClose={() => history.push('/qr')}
                />
                <MasterEntityDetailDialog
                  title='Hình ảnh'
                  moduleName='Hình ảnh'
                  show={showImage}
                  entity={detailEntityMock}
                  renderInfo={imageRenderDetail}
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
        <Route path="/qr/qr-child/123456">
          {({history, match}) => {
            return (
              <MasterQrChildDetail
                entity={{}}
                columns={Object.values(columns)}
              />
            );
          }}
        </Route>
      </Switch>
    </Fragment>
  );
}

export default QrPage;