// please be familiar with react-bootstrap-table-next column formaters
// https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html?selectedKind=Work%20on%20Columns&selectedStory=Column%20Formatter&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Factions%2Factions-panel
/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from 'react';
import SVG from 'react-inlinesvg';
import './style/production-plan.scss';
import { IntlShape } from 'react-intl';
import { ToAbsoluteUrl } from '../../common-library/helpers/assets-helpers';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import Visibility from '@material-ui/icons/Visibility';

interface ActionColumnProps<T> {
  onEdit: (entity: T) => void;
  onShowHistory: (entity: any) => void;
  onView: (entity: any) => void;
}

export function ProductPlanActionsColumn<T>(
  cellContent: any,
  row: any,
  rowIndex: number,
  { onShowHistory, onEdit, onView }: ActionColumnProps<T> & { intl: IntlShape },
) {
  return (
    <>
      <a
        className="btn btn-icon btn-light btn-hover-primary btn-sm visibility mx-1"
        onClick={() => onView(row)}>
        <span className="svg-icon svg-icon-md svg-icon-primary">
          <Visibility className="text-primary eye" />
        </span>
      </a>
      <a
        className="btn btn-icon btn-light btn-hover-primary btn-sm visibility mx-1"
        onClick={() => onShowHistory(row)}>
        <span className="svg-icon svg-icon-md svg-icon-primary">
          <FileCopyIcon className="text-primary eye" />
        </span>
      </a>
      <a
        // to={`/purchase-order/${row.code}`}
        // title={intl.formatMessage({id: 'COMMON_COMPONENT.MASTER_BODY.TABLE.EDIT_BTN'})}
        className="btn btn-icon btn-light btn-hover-primary btn-sm mx-1"
        onClick={() => onEdit(row)}>
        <span className="svg-icon svg-icon-md svg-icon-primary">
          <SVG src={ToAbsoluteUrl('/media/svg/icons/Communication/Write.svg')} />
        </span>
      </a>
    </>
  );
}
