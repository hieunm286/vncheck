import React, {ReactElement} from "react";
import {PaginationLinks} from "./pagination-links";
import {PaginationToolbar} from "./pagination-toolbar";
import {PaginationOptions} from "react-bootstrap-table-next";

export function Pagination({children, isLoading, paginationProps}: { children?: ReactElement, isLoading: boolean, paginationProps: PaginationOptions }) {
  return (
    <>
      {children}
      <div className="d-flex justify-content-between align-items-center flex-wrap">
        <PaginationLinks paginationProps={paginationProps}/>
        <PaginationToolbar
          isLoading={isLoading}
          paginationProps={paginationProps}
        />
      </div>
    </>
  );
}
