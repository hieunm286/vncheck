import React, {useMemo} from 'react';

import {AgencyTable} from './agency-table/agency-table';
import {useAgencyUIContext} from './agency-ui-context';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import InsertDriveFileOutlinedIcon from '@material-ui/icons/InsertDriveFileOutlined';
import {Card, CardBody} from "../../common-library/card";

export function AgencyCard() {
  const agencyUIContext: any = useAgencyUIContext();
  const agencyUIProps = useMemo(() => {
    return {
      ids: agencyUIContext.ids,
      newAgencyButtonClick: agencyUIContext.newAgencyButtonClick,
      openDeleteManyAgencyDialog: agencyUIContext.openDeleteManyAgencyDialog,
    };
  }, [agencyUIContext]);
  
  console.log(agencyUIProps.ids);
  
  return (
    <Card>
      <CardBody>
        <div className="row no-gutters mb-10">
          <div className="col-xxl-1 col-xl-2 col-lg-2 mr-5">
            <button
              type="button"
              className="btn btn-danger w-100"
              onClick={agencyUIProps.newAgencyButtonClick}>
              + Tạo mới
            </button>
          </div>
          <div className="col-xxl-1 col-xl-2 col-lg-2 mr-5">
            <button
              type="button"
              className="btn btn-danger w-100"
              onClick={agencyUIProps.openDeleteManyAgencyDialog}>
              <DeleteOutlineOutlinedIcon style={{fontSize: 17}}/> Xóa
            </button>
          </div>
          <div className="col-xxl-1 col-xl-2 col-lg-2 mr-5">
            <button type="button" className="btn btn-outline-danger w-100">
              <InsertDriveFileOutlinedIcon style={{fontSize: 17}}/> Nhập Excel
            </button>
          </div>
          <div className="col-xxl-1 col-xl-2 col-lg-2 mr-5">
            <button type="button" className="btn btn-outline-danger w-100">
              <InsertDriveFileOutlinedIcon style={{fontSize: 17}}/> Xuất excel
            </button>
          </div>
        </div>
        
        {/* <AgencyFilter /> */}
        {/* {agencyUIProps.ids.length > 0 && <AgencyGrouping />} */}
        <AgencyTable/>
      </CardBody>
    </Card>
  );
}
