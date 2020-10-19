import React from 'react';
import { Card, CardBody, CardHeader } from '../../../components/card';
import BasicUnitTable from './basic-unit-table/basic-unit-table';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import InsertDriveFileOutlinedIcon from '@material-ui/icons/InsertDriveFileOutlined';

function BasicUnitCard({ showModal, hideModal, show, basicUnitArray }: any) {
  return (
    <Card>
      <CardBody>
        <div className="row no-gutters mb-10">
          <div className="col-xxl-1 col-xl-2 col-lg-2 mr-5">
            <button
              type="button"
              className="btn btn-danger w-100"
              onClick={() => showModal(null, 'edit')}>
              + Tạo mới
            </button>
          </div>
          <div className="col-xxl-1 col-xl-2 col-lg-2 mr-5">
            <button
              type="button"
              className="btn btn-outline-danger w-100"
              // onClick={agencyUIProps.openDeleteManyAgencyDialog}
            >
              <DeleteOutlineOutlinedIcon style={{ fontSize: 17 }} /> Xóa
            </button>
          </div>
        </div>
        <BasicUnitTable
          showModal={showModal}
          hideModal={hideModal}
          show={show}
          basicUnitArray={basicUnitArray}
        />
      </CardBody>
    </Card>
  );
}

export default BasicUnitCard;
