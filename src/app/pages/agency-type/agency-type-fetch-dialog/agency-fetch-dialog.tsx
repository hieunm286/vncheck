import React, {useEffect, useMemo} from 'react';
import {Modal} from 'react-bootstrap';
import {shallowEqual, useSelector} from 'react-redux';
import {useAgencyUIContext} from "../agency-ui-context";
import {AgencyStatusCssClasses} from "../agency-ui-helpers";

const selectedCustomers = (entities: any, ids: any) => {
    const _agency: any[] = [];
    ids.forEach((id: any) => {
        const agency = entities.find((el: any) => el.id === id);
        if (agency) {
            _agency.push(agency);
        }
    });
    return _agency;
};

export function CustomersFetchDialog({show, onHide}: any) {
    // Customers UI Context
    const agencyUIContext = useAgencyUIContext();
    const agencyUIProps = useMemo(() => {
        return {
            ids: agencyUIContext.ids,
        };
    }, [agencyUIContext]);

    // Customers Redux state
    const {agency} = useSelector(
        (state: any) => ({
            agency: selectedCustomers(state.agency.entities, agencyUIProps.ids),
        }),
        shallowEqual,
    );

    // if agency weren't selected we should close modal
    useEffect(() => {
        if (!agencyUIProps.ids || agencyUIProps.ids.length === 0) {
            onHide();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [agencyUIProps.ids]);

    return (
        <Modal show={show} onHide={onHide} aria-labelledby="example-modal-sizes-title-lg">
            <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-lg">Fetch selected elements</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="timeline timeline-5 mt-3">
                    {agency.map(agency => (
                        <div className="timeline-item align-items-start" key={`id${agency.id}`}>
                            <div
                                className="timeline-label font-weight-bolder text-dark-75 font-size-lg text-right pr-3"/>
                            <div className="timeline-badge">
                                <i
                                    className={`fa fa-genderless text-${
                                        AgencyStatusCssClasses[agency.phone]
                                    } icon-xxl`}
                                />
                            </div>
                            <div className="timeline-content text-dark-50 mr-5">
                <span
                    className={`label label-lg label-light-${
                        AgencyStatusCssClasses[agency.paid]
                    } label-inline`}>
                  ID: {agency.id}
                </span>
                                <span className="ml-3">{agency.email}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </Modal.Body>
            <Modal.Footer>
                <div>
                    <button type="button" onClick={onHide} className="btn btn-light btn-elevate">
                        Cancel
                    </button>
                    <> </>
                    <button type="button" onClick={onHide} className="btn btn-danger btn-elevate">
                        Ok
                    </button>
                </div>
            </Modal.Footer>
        </Modal>
    );
}
