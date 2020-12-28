import React from "react";

export const makeTablePaginationRenderer = ({
                                              isLoading,
                                              totalCount,
                                              limit
                                            }: any) => (props: any) => {
  console.log(props, isLoading, totalCount);
  const {pages, onPageChange} = props;
  return (
    <div className="custom-pagination">
      {pages && pages.length > 0 && isLoading && (
        <span className={"spinner spinner-md spinner-primary"}/>
      )}
      {pages.map((p: any) => (
        <button
          key={p.page}
          className="btn btn-success"
          onClick={() => onPageChange(p.page)}
        >
          {p.page}
        </button>
      ))}
    </div>
  );
};
