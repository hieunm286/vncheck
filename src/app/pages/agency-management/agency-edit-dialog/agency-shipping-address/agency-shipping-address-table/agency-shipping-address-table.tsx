// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React from 'react';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';

import * as actions from '../../../_redux/agency-action';
import './agency-table.scss';
import BootstrapTable from "react-bootstrap-table-next";
import {ActionsColumnFormatter} from "./column-formatters/actions-column-formatter";
import {NoRecordsFoundMessage, PleaseWaitMessage} from "../../../../../components/helpers/table-pagination-helpers";

export function AgencyShippingAddressTable({
                                               openModal,
                                               getDataFromRow,
                                               shippingArr,
                                               agency,
                                               switchAddress,
                                           }: any) {
    const {currentState} = useSelector(
        (state: any) => ({
            currentState: state.agency,
        }),
        shallowEqual,
    );
    const {entities, agencyForEdit} = currentState;

    const dispatch = useDispatch();

    // Table columns
    const columns = [
        {
            dataField: 'default',
            text: 'Tên đại lý',
            sort: true,
            headerClasses: 'd-none',
            formatter: (cell: any, row: any) =>
                row.address + ', ' + row.district + ', ' + row.city + ', ' + row.state,
        },

        {
            dataField: 'action',
            text: 'Actions',
            formatter: ActionsColumnFormatter,
            formatExtraData: {
                openEditAgencyShippingDialog: openModal,
                openDeleteAgencyShippingDialog: openModal,
                openDetailAgencyShippingDialog: openModal,
            },
            classes: 'text-center pr-0',
            headerClasses: 'd-none',
            // style: {
            //   minWidth: '130px',
            // },
        },
    ];

    const selectRow: any = {
        mode: 'radio',
        // clickToSelect: true,
        selected: ['0'],
        onSelect: (row: any, isSelect: any, rowIndex: any, e: any) => {
            const shippingAdressArr =
                agencyForEdit && agencyForEdit.shipping_address
                    ? JSON.parse(agencyForEdit.shipping_address)
                    : [];

            if (agencyForEdit) {
                const index = shippingAdressArr.findIndex((el: any) => el.id === '0');

                const temp_id = shippingAdressArr[index].id;
                shippingAdressArr[index].id = shippingAdressArr[rowIndex].id;
                shippingAdressArr[rowIndex].id = temp_id;

                const updateAgency = {
                    ...agencyForEdit,
                    shipping_address: JSON.stringify(shippingAdressArr),
                };

                (dispatch(actions.updateAgency(updateAgency)) as any).then(() => {
                    if (agencyForEdit) {
                        dispatch(actions.fetchAgencyById(agencyForEdit.agency_id));
                    }
                });
            } else {
                switchAddress(rowIndex);
            }
            // shippingAdressArr[rowIndex].id = "0";
        },
    };

    const rowEvents = {
        onClick: (e: any, row: any, rowIndex: any) => {
            getDataFromRow(row, rowIndex);
        },
    };

    return (
        <BootstrapTable
            selectRow={selectRow}
            wrapperClasses="table-responsive"
            bordered={false}
            classes="table table-head-custom table-borderless table-vertical-center overflow-hidden"
            bootstrap4
            remote
            keyField="id"
            data={agencyForEdit ? JSON.parse(agencyForEdit.shipping_address) : shippingArr}
            columns={columns}
            rowEvents={rowEvents}>
            <PleaseWaitMessage entities={entities}/>
            <NoRecordsFoundMessage entities={entities}/>
        </BootstrapTable>
    );
}
