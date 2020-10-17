import React, {useState, useEffect} from 'react';
import {shallowEqual, useSelector} from 'react-redux';
import {Modal} from 'react-bootstrap';
import {ModalProgressBar} from '../../../../../../components/modal-progress-bar';

export function AgencyShippingEditDialogHeader({rowShippingData}: any) {
    // Customers Redux state
    const {actionsLoading} = useSelector(
        (state: any) => ({
            actionsLoading: state.agencyType.actionsLoading,
        }),
        shallowEqual,
    );

    const [title, setTitle] = useState('');
    // Title couting
    useEffect(() => {
        let _title = rowShippingData.rowIndex > -1 ? '' : 'Thêm mới địa chỉ giao hàng';
        if (rowShippingData.rowIndex > -1) {
            _title = `Chỉnh sửa địa chỉ giao hàng`;
        }

        setTitle(_title);
        // eslint-disable-next-line
    }, [rowShippingData]);

    return (
        <>
            {actionsLoading && <ModalProgressBar/>}
            <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-lg" className="text-danger">
                    {title}
                </Modal.Title>
            </Modal.Header>
        </>
    );
}
