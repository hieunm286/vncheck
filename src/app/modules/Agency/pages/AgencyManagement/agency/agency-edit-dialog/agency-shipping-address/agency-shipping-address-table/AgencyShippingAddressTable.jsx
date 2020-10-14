// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import {
  NoRecordsFoundMessage,
  PleaseWaitMessage,
} from '../../../../../../../../../_metronic/_helpers';
import * as columnFormatters from './column-formatters';
import * as actions from '../../../../_redux/agencyAction';
import './AgencyTable.scss';

export function AgencyShippingAddressTable({
  openModal,
  getDataFromRow,
  shippingArr,
  agency,
  switchAddress,
}) {
  const { currentState } = useSelector(
    state => ({
      currentState: state.agency,
    }),
    shallowEqual,
  );
  const { entities, agencyForEdit } = currentState;

  const dispatch = useDispatch();

  // Table columns
  const columns = [
    {
      dataField: 'default',
      text: 'Tên đại lý',
      sort: true,
      headerClasses: 'd-none',
      headerAttrs: {
        hidden: true,
      },
      formatter: (cell, row) =>
        row.address + ', ' + row.district + ', ' + row.city + ', ' + row.state,
    },

    {
      dataField: 'action',
      text: 'Actions',
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditAgencyShippingDialog: openModal,
        openDeleteAgencyShippingDialog: openModal,
        openDetailAgencyShippingDialog: openModal,
      },
      classes: 'text-center pr-0',
      headerAttrs: {
        hidden: true,
      },
      headerClasses: 'd-none',
      // style: {
      //   minWidth: '130px',
      // },
    },
  ];

  const selectRow = {
    mode: 'radio',
    // clickToSelect: true,
    selected: ['0'],
    onSelect: (row, isSelect, rowIndex, e) => {
      const shippingAdressArr =
        agencyForEdit && agencyForEdit.shipping_address
          ? JSON.parse(agencyForEdit.shipping_address)
          : [];

      if (agencyForEdit) {
        const index = shippingAdressArr.findIndex(el => el.id === '0');

        const temp_id = shippingAdressArr[index].id;
        shippingAdressArr[index].id = shippingAdressArr[rowIndex].id;
        shippingAdressArr[rowIndex].id = temp_id;

        const updateAgency = {
          ...agencyForEdit,
          shipping_address: JSON.stringify(shippingAdressArr),
        };

        dispatch(actions.updateAgency(updateAgency)).then(() => {
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
    onClick: (e, row, rowIndex) => {
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
      <PleaseWaitMessage entities={entities} />
      <NoRecordsFoundMessage entities={entities} />
    </BootstrapTable>
  );
}
