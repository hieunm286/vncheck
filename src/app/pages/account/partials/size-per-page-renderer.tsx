import React from "react";

export function sizePerPageRenderer({
                                        options,
                                        currSizePerPage,
                                        onSizePerPageChange
                                    }: any) {
    const onChange = (event: any) => {
        const newValue = +event.target.value;
        onSizePerPageChange(newValue);
    };

    return (
        <div className="pagination-toolbar">
            <select
                className="form-control font-brand"
                style={{width: "60px"}}
                value={currSizePerPage}
                onChange={onChange}
            >
                {options.map((option: any) => {
                    return (
                        <option key={option.text} value={option.page}>
                            {option.text}
                        </option>
                    );
                })}
            </select>
        </div>
    );
}
