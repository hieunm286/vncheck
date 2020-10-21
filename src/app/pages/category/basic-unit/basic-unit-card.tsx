import React from 'react';
import { Card, CardBody, CardHeader } from '../../../common-library/card';
import BasicUnitTable from './basic-unit-table/basic-unit-table';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import InsertDriveFileOutlinedIcon from '@material-ui/icons/InsertDriveFileOutlined';
import { iconStyle } from '../style';
import { useIntl } from 'react-intl';

export interface BasicUnitDataProps {
  showModal: any;
  hideModal: any;
  show: any;
  basicUnitArray: any[];
  total: number;
  loading: boolean;
  queryParams: any;
  setQueryParamsBase: any;
  ids: any[];
  setIds: any;
  setQueryParams: any;
}

function BasicUnitCard({
  showModal,
  hideModal,
  show,
  basicUnitArray,
  total,
  loading,
  queryParams,
  setQueryParamsBase,
  ids,
  setIds,
  setQueryParams,
}: BasicUnitDataProps) {
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
              + {intl.formatMessage({ id: 'BASIC_UNIT.CARD.HEADER.BUTTON.ADD' })}
            </button>
          </div>
          <div className="col-xxl-1 col-xl-2 col-lg-2 mr-5">
            <button
              type="button"
              className="btn btn-outline-danger w-100"
              onClick={() => showModal(null, 'deleteMany')}>
              <DeleteOutlineOutlinedIcon style={iconStyle} />{' '}
              {intl.formatMessage({ id: 'BASIC_UNIT.CARD.HEADER.BUTTON.DELETE' })}
            </button>
          </div>
        </div>
        <BasicUnitTable
          showModal={showModal}
          hideModal={hideModal}
          show={show}
          basicUnitArray={basicUnitArray}
          total={total}
          loading={loading}
          queryParams={queryParams}
          setQueryParamsBase={setQueryParamsBase}
          ids={ids}
          setIds={setIds}
          setQueryParams={setQueryParams}
        />
      </CardBody>
    </Card>
  );
}

export default BasicUnitCard;
