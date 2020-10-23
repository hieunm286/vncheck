import React from 'react';
import {Card, CardBody} from '../card';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import {useIntl} from 'react-intl';
import {iconStyle} from "../common-const/const";
import {MasterTable} from "./master-table";
import {ActionColumnProps} from "../common-types/common-type";

export interface BasicUnitDataProps {
  showModal: any;
  hideModal: any;
  show: any;
  list: any[];
  total: number;
  loading: boolean;
  queryParams: any;
  setQueryParamsBase: any;
  ids: any[];
  setIds: any;
  setQueryParams: any;
}

export function MasterBody<T>({
                                showModal,
                                hideModal,
                                show,
                                entities,
                                total,
                                loading,
                                queryParams,
                                setQueryParamsBase,
                                ids,
                                setIds,
                                setQueryParams,
                                onEdit,
                                onDelete,
                                onShowDetail,
                                onCreate
                              }: ActionColumnProps<T> & { entities: T[], onShowDetail: (entity: T) => void, [T: string]: any }) {
  const intl = useIntl();
  
  return (
    <Card>
      <CardBody>
        <div className="row no-gutters mb-10">
          <div className="col-xxl-1 col-xl-2 col-lg-2 mr-5">
            <button
              type="button"
              className="btn btn-danger w-100"
              onClick={() => showModal(null, 'edit')}>
              + {intl.formatMessage({id: 'COMMON_COMPONENT.MASTER_BODY.HEADER.ADD_BTN'})}
            </button>
          </div>
          <div className="col-xxl-1 col-xl-2 col-lg-2 mr-5">
            <button
              type="button"
              className="btn btn-outline-danger w-100"
              onClick={() => showModal(null, 'deleteMany')}>
              <DeleteOutlineOutlinedIcon style={iconStyle}/>{' '}
              {intl.formatMessage({id: 'COMMON_COMPONENT.MASTER_BODY.HEADER.DELETE_BTN'})}
            </button>
          </div>
        </div>
        <MasterTable
          show={show}
          entities={entities}
          total={total}
          loading={loading}
          queryParams={queryParams}
          setQueryParamsBase={setQueryParamsBase}
          ids={ids}
          setIds={setIds}
          setQueryParams={setQueryParams}
          onShowDetail={onShowDetail}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      </CardBody>
    </Card>
  );
}
