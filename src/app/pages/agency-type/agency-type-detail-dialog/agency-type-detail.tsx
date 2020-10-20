import React from 'react';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';

export function AgencyTypeDetail(props: any) {
  const {agencyType} = props;
  return (
    <div className="container mt-10">
      <h3 className="text-danger">THÔNG TIN CHI TIẾT</h3>
      <div className="d-flex justify-content-between">
        <p>Tên loại: {agencyType.name}</p>
        <p>Mã loại: {agencyType.code}</p>
      </div>
      <p>
        Trạng thái hoạt động:{' '}
        {agencyType.status ? (
          <CheckCircleIcon style={{color: '#1DBE2D'}}/>
        ) : (
          <IndeterminateCheckBoxIcon/>
        )}
      </p>
    </div>
  );
}
