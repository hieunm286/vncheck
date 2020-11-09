/* Pagination Helprs */
import React from 'react';
import SVG from 'react-inlinesvg';
import { ToAbsoluteUrl } from './assets-helpers';

export const SortCaret = (order: any, column: any) => {
  if (!order)
    return (
      <span className="svg-icon svg-icon-sm svg-icon-primary ml-1 svg-icon-sort">
        <SVG src={ToAbsoluteUrl('/media/svg/icons/Shopping/Sort1.svg')} />
      </span>
    );
  else if (order === 'asc')
    return (
      <span className="svg-icon svg-icon-sm svg-icon-primary ml-1">
        <SVG src={ToAbsoluteUrl('/media/svg/icons/Navigation/Up-2.svg')} />
      </span>
    );
  else if (order === 'desc')
    return (
      <span className="svg-icon svg-icon-sm svg-icon-primary ml-1">
        <SVG src={ToAbsoluteUrl('/media/svg/icons/Navigation/Down-2.svg')} />
      </span>
    );
  return null;
};

export const HeaderSortingClasses = (
  column: any,
  sortOrder: any,
  isLastSorting: any,
  colIndex: any,
) => (sortOrder === 'asc' || sortOrder === 'desc' ? 'sortable-active' : '');
