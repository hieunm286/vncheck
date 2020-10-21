import React, {useEffect, useState} from 'react';
import {Table} from 'react-bootstrap';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';
import {API_BASE_URL} from '../../../enviroment';

function AgencyDetail(props: any) {
  const {agency} = props;
  const [shippingAddress, setShippingAddress] = useState([]);
  
  console.log(agency);
  
  useEffect(() => {
    if (agency.shipping_address) {
      const t = JSON.parse(agency.shipping_address);
      console.log(t);
      setShippingAddress(t);
    }
  }, [agency]);
  
  return (
    <div className="container mt-10">
      <h3 className="text-danger">THÔNG TIN CHI TIẾT</h3>
      <div className="row mt-10">
        <div className="col-lg-6">
          <h5>THÔNG TIN ĐẠI LÝ</h5>
          <Table borderless>
            <tbody>
            <tr>
              <td className="w-120px">Tên đại lý:</td>
              <td>{agency.name}</td>
            </tr>
            <tr>
              <td>Mã đại lý:</td>
              <td>{agency.agency_id}</td>
            </tr>
            <tr>
              <td>Địa chỉ đại lý:</td>
              <td>
                {agency.agency_addresses?.address +
                ', ' +
                agency.agency_addresses?.district +
                ', ' +
                agency.agency_addresses?.city +
                ', ' +
                agency.agency_addresses?.state}
              </td>
            </tr>
            <tr>
              <td>Điện thoại:</td>
              <td>{agency.phone}</td>
            </tr>
            <tr>
              <td>Trạng thái:</td>
              <td>
                {agency.status === 0 ? (
                  <CheckCircleIcon style={{color: '#1DBE2D'}}/>
                ) : (
                  <IndeterminateCheckBoxIcon/>
                )}
              </td>
            </tr>
            <tr>
              <td>Hình ảnh đại lý:</td>
              <td>
                {agency.agency_images?.map((value: any, key: any) => (
                  <img key={key} src={`${API_BASE_URL}${value.image_name}`} alt="" width="100%"/>
                ))}
              </td>
            </tr>
            </tbody>
          </Table>
        </div>
        <div className="col-lg-6">
          <h5>THÔNG TIN CHỦ ĐẠI LÝ</h5>
          <Table borderless>
            <tbody>
            <tr>
              <td>Tên chủ đại lý:</td>
              <td>{agency.owner_name}</td>
            </tr>
            <tr>
              <td>Email:</td>
              <td>{agency.email}</td>
            </tr>
            <tr>
              <td>Số điện thoại:</td>
              <td>{agency.owner_phone}</td>
            </tr>
            </tbody>
          </Table>
          <h5>ĐỊA CHỈ GIAO HÀNG</h5>
          {shippingAddress && shippingAddress.length === 0 && <p>Chưa có địa chỉ giao hàng</p>}
          {shippingAddress.map((value: any, key) => (
            <div>
              <p key={key}>
                {value.address + ', ' + value.district + ', ' + value.city + ', ' + value.state}
                {value.id == 0 && <span className="text-muted"> [Mặc định]</span>}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AgencyDetail;
