import React, {useEffect} from 'react';
import {Modal} from 'react-bootstrap';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {ModalProgressBar} from '../../../../../components/modal-progress-bar';
// import * as actions from '../../../../_redux/agencyAction';
import * as actions from '../../../_redux/agency-action';
import DeleteIcon from '@material-ui/icons/Delete';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';

export function AgencyShippingDeleteDialog({
                                               show,
                                               openModal,
                                               hideModal,
                                               rowShippingData,
                                               saveNewData,
                                           }: any) {
    const dispatch = useDispatch();
    const {isLoading, agencyForEdit} = useSelector(
        (state: any) => ({
            isLoading: state.agencyType.actionsLoading,
            error: state.agencyType.error,
            agencyForEdit: state.agency.agencyForEdit,
        }),
        shallowEqual,
    );

    useEffect(() => {
    }, [agencyForEdit, dispatch]);

    const deleteAgencyType = () => {
        const shippingAdressArr =
            agencyForEdit && agencyForEdit.shipping_address
                ? JSON.parse(agencyForEdit.shipping_address)
                : [];
        shippingAdressArr.splice(rowShippingData.rowIndex, 1);

        if (rowShippingData.data.id == 0 && shippingAdressArr.length > 0) {
            shippingAdressArr[shippingAdressArr.length - 1].id = '0';
        }
        const updateAgency = {
            ...agencyForEdit,
            shipping_address: JSON.stringify(shippingAdressArr),
        };
        console.log(updateAgency);
        saveNewData({}, -5);
        (dispatch(actions.updateAgency(updateAgency)) as any).then(() => {
            hideModal();
            if (agencyForEdit) {
                dispatch(actions.fetchAgencyById(agencyForEdit.agency_id));
            }
        });
    };

    const cancelAndRefresh = () => {
        hideModal();
    };

    return (
        <Modal show={show} onHide={hideModal} aria-labelledby="example-modal-sizes-title-lg">
            {/*begin::Loading*/}
            {isLoading && <ModalProgressBar/>}
            {/*end::Loading*/}
            <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-lg" className="text-danger">
                    XÓA ĐỊA CHỈ
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {!isLoading && (
                    <div>
                        <p>Bạn đang thực hiện xóa địa chỉ giao hàng này </p>

                        <p className="mt-3">Tiếp tục xóa?</p>
                    </div>
                )}
                {isLoading && <span>Đang xóa đại lý...</span>}
            </Modal.Body>
            <Modal.Footer>
                <div>
                    <button type="button" onClick={deleteAgencyType} className="btn btn-danger btn-elevate">
                        <DeleteIcon/> Xóa
                    </button>
                    <button type="button" onClick={cancelAndRefresh} className="btn btn-outline-danger">
                        <CancelOutlinedIcon/> Hủy bỏ
                    </button>
                </div>
            </Modal.Footer>
        </Modal>
    );
}
