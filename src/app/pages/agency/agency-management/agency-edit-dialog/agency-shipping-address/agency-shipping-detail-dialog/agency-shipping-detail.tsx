import React from 'react';
import { Table } from 'react-bootstrap';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';

function AgencyShippingDetail(props) {
  const { data } = props.rowShippingData;
  return (
    <div className="container mt-10">
      <h3 className="text-danger">THÔNG TIN ĐỊA CHỈ</h3>
      <Table borderless>
        <tbody>
          <tr>
            <td>Tỉnh/Thành phố: </td>
            <td>{data.state}</td>
          </tr>
          <tr>
            <td>Quận/Huyện: </td>
            <td>{data.city}</td>
          </tr>
          <tr>
            <td>Phường/Xã: </td>
            <td>{data.district}</td>
          </tr>
          <tr>
            <td>Địa chỉ giao hàng: </td>
            <td>{data.address}</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default AgencyShippingDetail;
