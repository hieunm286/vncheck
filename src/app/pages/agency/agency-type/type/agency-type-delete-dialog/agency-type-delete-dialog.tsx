import React, {useEffect, useMemo, useState} from 'react';
import {Modal} from 'react-bootstrap';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import * as actions from '../../_redux/agencyTypeAction';
import {useAgencyTypeUIContext} from '../agency-type-ui-context';
import {ModalProgressBar} from "../../../../../components/modal-progress-bar";

export function AgencyTypeDeleteDialog({id, show, onHide}: any) {
    // agency-type UI Context
    const agencyTypeUIContext: any = useAgencyTypeUIContext();
    const agencyTypeUIProps = useMemo(() => {
        return {
            setIds: agencyTypeUIContext.setIds,
            queryParams: agencyTypeUIContext.queryParams,
        };
    }, [agencyTypeUIContext]);

    // agency-type Redux state
    const dispatch = useDispatch();
    const {isLoading, error, agencyTypeForEdit} = useSelector(
        (state: any) => ({
            isLoading: state.agencyType.actionsLoading,
            error: state.agencyType.error,
            agencyTypeForEdit: state.agencyType.agencyTypeForEdit,
        }),
        shallowEqual,
    );

    // if !id we should close modal
    useEffect(() => {
        if (!id) {
            onHide();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    useEffect(() => {
        // server call for getting Customer by id
        dispatch(actions.fetchAgencyTypeById(id));
    }, [id, dispatch]);

    // looking for loading/dispatch
    useEffect(() => {
    }, [isLoading, error, dispatch]);

    const deleteAgencyType = () => {
        // server request for deleting customer by id
        (dispatch(actions.deleteAgencyType(id)) as any).then(() => {
            // refresh list after deletion
            if (agencyTypeForEdit.agencies.length === 0) {
                cancelAndRefresh();
            }
        });
    };

    const cancelAndRefresh = () => {
        dispatch(actions.fetchAllAgencyType(agencyTypeUIProps.queryParams));
        // closing delete modal
        onHide();
    };

    return (
        <Modal show={show} onHide={onHide} aria-labelledby="example-modal-sizes-title-lg">
            {/*begin::Loading*/}
            {isLoading && <ModalProgressBar/>}
            {/*end::Loading*/}
            <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-lg" className="text-danger">
                    Xóa loại đại lý
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {error ? (
                    <span>Không thể xóa đại lý!</span>
                ) : (
                    !isLoading && (
                        <div>
                            <p>Loại đại lý này sẽ bị xóa vĩnh viễn và không thể khôi phục. </p>
                            <p className="mt-3">
                                Lưu ý: Chỉ có thể xóa khi chưa có đại lý nào gắn với loại đại lý này.
                            </p>
                            <p className="mt-3">Tiếp tục xóa?</p>
                        </div>
                    )
                )}
                {isLoading && <span>Đang xóa đại lý...</span>}
            </Modal.Body>
            <Modal.Footer>
                <div>
                    <button type="button" onClick={cancelAndRefresh} className="btn btn-light btn-elevate">
                        Hủy bỏ
                    </button>
                    <> </>
                    <button type="button" onClick={deleteAgencyType} className="btn btn-danger btn-elevate">
                        Xóa
                    </button>
                </div>
            </Modal.Footer>
        </Modal>
    );
}
