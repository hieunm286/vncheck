import React, {useMemo} from 'react';
import {AgencyTypeTable} from './agency-type-table/agency-type-table';
import {useAgencyTypeUIContext} from './agency-type-ui-context';
import {Card, CardBody, CardHeader} from "../../../components/card";
import {AgencyTypeGrouping} from "./agency-type-group/agency-type-grouping";

export function AgencyTypeCard() {
    const agencyTypeUIContext: any = useAgencyTypeUIContext();
    const agencyTypeUIProps = useMemo(() => {
        return {
            ids: agencyTypeUIContext.ids,
            newAgencyTypeButtonClick: agencyTypeUIContext.newAgencyTypeButtonClick,
        };
    }, [agencyTypeUIContext]);

    return (
        <Card className="h-100">
            <CardHeader title="DANH SÁCH LOẠI ĐẠI LÝ"/>
            <CardBody>
                <button className="btn btn-danger" onClick={agencyTypeUIProps.newAgencyTypeButtonClick}>
                    Tạo mới
                </button>
                {/* <AgencyTypeFilter /> */}
                {agencyTypeUIProps.ids.length > 0 && <AgencyTypeGrouping/>}
                <AgencyTypeTable/>
            </CardBody>
        </Card>
    );
}
