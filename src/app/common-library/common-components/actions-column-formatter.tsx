// please be familiar with react-bootstrap-table-next column formaters
// https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html?selectedKind=Work%20on%20Columns&selectedStory=Column%20Formatter&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Factions%2Factions-panel
/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from 'react';
import SVG from 'react-inlinesvg';
import Visibility from '@material-ui/icons/Visibility';
import './master-table.scss';
import { ToAbsoluteUrl } from '../helpers/assets-helpers';
import {ActionColumnProps} from "../common-types/common-type";



export function ActionsColumnFormatter<T>(
  cellContent: any,
  row: T,
  rowIndex: number,
  {
    onShowDetail,
    onDelete,
    onEdit,
  }: ActionColumnProps<T>,
) {
  return (
    <>
      <a
        title={'detailTitle'}
        className="btn btn-icon btn-light btn-hover-danger btn-sm visibility"
        onClick={() => onShowDetail(row)}>
        <span className="svg-icon svg-icon-md svg-icon-danger">
          <Visibility className="text-danger eye" />
        </span>
      </a>
      <a
        title={'editTitle'}
        className="btn btn-icon btn-light btn-hover-danger btn-sm mx-1"
        onClick={() => onEdit(row)}>
        <span className="svg-icon svg-icon-md svg-icon-danger">
          <SVG src={ToAbsoluteUrl('/media/svg/icons/Communication/Write.svg')} />
        </span>
      </a>
      <a
        title={'deleteTitle'}
        className="btn btn-icon btn-light btn-hover-danger btn-sm"
        onClick={() => onDelete(row)}>
        <span className="svg-icon svg-icon-md svg-icon-danger">
          <SVG src={ToAbsoluteUrl('/media/svg/icons/General/Trash.svg')} />
        </span>
      </a>
    </>
  );
}
