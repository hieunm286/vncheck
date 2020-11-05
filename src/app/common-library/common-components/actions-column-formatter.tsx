// please be familiar with react-bootstrap-table-next column formaters
// https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html?selectedKind=Work%20on%20Columns&selectedStory=Column%20Formatter&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Factions%2Factions-panel
/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from 'react';
import SVG from 'react-inlinesvg';
import Visibility from '@material-ui/icons/Visibility';
import './master-table.scss';
import { ToAbsoluteUrl } from '../helpers/assets-helpers';
import { ActionColumnProps } from '../common-types/common-type';
import { IntlShape } from 'react-intl';
import { Link } from 'react-router-dom';

export function ActionsColumnFormatter<T>(
  cellContent: any,
  row: any,
  rowIndex: number,
  { onShowDetail, onDelete, onEdit, intl }: ActionColumnProps<T> & { intl: IntlShape },
) {
  console.log(row);
  return (
    <>
      <a
        title={intl.formatMessage({ id: 'COMMON_COMPONENT.MASTER_BODY.TABLE.SHOW_DETAIL_BTN' })}
        className="btn btn-icon btn-light btn-hover-primary btn-sm visibility"
        onClick={() => onShowDetail(row)}>
        <span className="svg-icon svg-icon-md svg-icon-primary">
          <Visibility className="text-primary eye" />
        </span>
      </a>
      <a
        // to={`/purchase-order/${row.code}`}
        // title={intl.formatMessage({id: 'COMMON_COMPONENT.MASTER_BODY.TABLE.EDIT_BTN'})}
        className="btn btn-icon btn-light btn-hover-primary btn-sm mx-1"
        onClick={() => onEdit(row)}>
        <span className="svg-icon svg-icon-md svg-icon-primary">
          <SVG
            src={ToAbsoluteUrl('/media/svg/icons/Communication/Write.svg')}
            title={intl.formatMessage({ id: 'COMMON_COMPONENT.MASTER_BODY.TABLE.EDIT_BTN' })}
          />
        </span>
      </a>
      <a
        // title={intl.formatMessage({id: 'COMMON_COMPONENT.MASTER_BODY.TABLE.DELETE_BTN'})}
        className="btn btn-icon btn-light btn-hover-primary btn-sm"
        onClick={() => onDelete(row)}>
        <span className="svg-icon svg-icon-md svg-icon-primary">
          <SVG
            src={ToAbsoluteUrl('/media/svg/icons/General/Trash.svg')}
            title={intl.formatMessage({ id: 'COMMON_COMPONENT.MASTER_BODY.TABLE.DELETE_BTN' })}
          />
        </span>
      </a>
    </>
  );
}
