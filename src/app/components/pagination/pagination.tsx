import React from "react";
import {PaginationLinks} from "./pagination-links";
import {PaginationToolbar} from "./pagination-toolbar";

export function Pagination(props: any) {
    const {children, isLoading, paginationProps, isShown} = props;
    return (
        <>
            {children}
            {isShown && (
                <div className="d-flex justify-content-between align-items-center flex-wrap">
                <PaginationLinks paginationProps={paginationProps}/>
                <PaginationToolbar
                    isLoading={isLoading}
                    paginationProps={paginationProps}
                />
            </div>
            )}
            
        </>
    );
}
