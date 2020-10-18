import React, {useMemo} from 'react';

import {AgencyTable} from './agency-table/agency-table';
import {useAgencyUIContext} from './agency-ui-context';
import {Link} from 'react-router-dom';
import {Card, CardBody, CardHeader} from "../../../components/card";

export function AgencyCard() {
    const agencyUIContext: any = useAgencyUIContext();
    const agencyUIProps = useMemo(() => {
        return {
            ids: agencyUIContext.ids,
            newUserButtonClick: agencyUIContext.newUserButtonClick,
        };
    }, [agencyUIContext]);

    return (
        <Card className="h-100">
            <CardHeader title="DANH SÁCH ĐẠI LÝ"/>

            <CardBody>
                <div className="row no-gutters mb-10"/>

                {/* <AgencyFilter /> */}
                <AgencyTable/>
            </CardBody>
        </Card>
    );
}
