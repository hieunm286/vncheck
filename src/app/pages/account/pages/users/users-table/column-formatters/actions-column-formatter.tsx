// please be familiar with react-bootstrap-table-next column formaters
// https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html?selectedKind=Work%20on%20Columns&selectedStory=Column%20Formatter&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Factions%2Factions-panel
/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from 'react';
import SVG from 'react-inlinesvg';
import Visibility from '@material-ui/icons/Visibility';
import './actions-column.scss';
import {ToAbsoluteUrl} from "../../../../../../components/helpers/assets-helpers";

export function ActionsColumnFormatter(
    cellContent: any,
    row: any,
    rowIndex: number,
    {openEditUserDialog, openDeleteUserDialog}: any,
) {
    return (
        <>
            <a
                title="View user"
                className="btn btn-icon btn-light btn-hover-danger btn-sm visibility"
                onClick={() => openEditUserDialog(row.username)}>
        <span className="svg-icon svg-icon-md svg-icon-danger">
          {/* <SVG src={ToAbsoluteUrl('/media/svg/icons/Communication/Write.svg')} /> */}
            <Visibility className="text-danger eye"/>
        </span>
            </a>
            <a
                title="Edit user"
                className="btn btn-icon btn-light btn-hover-danger btn-sm mx-1"
                onClick={() => openEditUserDialog(row.username)}>
        <span className="svg-icon svg-icon-md svg-icon-danger">
          <SVG src={ToAbsoluteUrl('/media/svg/icons/Communication/Write.svg')}/>
        </span>
            </a>
            <a
                title="Delete user"
                className="btn btn-icon btn-light btn-hover-danger btn-sm"
                onClick={() => openDeleteUserDialog(row.username)}>
        <span className="svg-icon svg-icon-md svg-icon-danger">
          <SVG src={ToAbsoluteUrl('/media/svg/icons/General/Trash.svg')}/>
        </span>
            </a>
        </>
    );
}
