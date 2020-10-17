import React from "react";
import {useSubheader} from "../layout/_core/metronic-subheader";

export const MyPage = () => {
    const suhbeader: any = useSubheader();
    suhbeader.setTitle("My Custom title");

    return (<>My Page</>);
};
