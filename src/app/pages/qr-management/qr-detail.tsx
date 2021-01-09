import * as React from 'react';
import BootstrapTable, { ColumnDescription } from 'react-bootstrap-table-next';
import { useHistory } from 'react-router';
import { childQrBodyEntities } from './qr-mock';
import { QrChild, QrParent } from './qr.model';

type QrParentProps = {
  entity: QrParent;
}

type QrChildProps = {
  entity: QrChild;
  columns: ColumnDescription[];
  columns2?: ColumnDescription[];
  columns3?: ColumnDescription[];
}

type MasterQrParentDetailProps = QrParentProps & {
  code: string | null;
  onClose: () => void;
  get: ((code: string) => any | null) | null;
  header?: string;
}

export function MasterQrParentDetail({entity, code,...props }: MasterQrParentDetailProps) {

  const history = useHistory();
  
  return (
    <>
      {/* <MasterEntityDetailPage
        entity={entity}
        renderInfo={detailModel}
        // mode='line'
        code={code}
        onClose={() => history.push('/qr')}
        get={QrService.GetById}
        /> */}
    </>
  )
}

export function MasterQrChildDetail({entity, ...props }: QrChildProps) {

  const entities = [
    {

    }
  ]
  return (
    <>
      <BootstrapTable
        {...props}
        data={childQrBodyEntities}
        columns={props.columns}
        keyField="_id"
        wrapperClasses="table-responsive"
        bordered={false}
        classes="table table-head-custom table-vertical-center overflow-hidden noBorderOnClick"
        bootstrap4
        remote
      >
      </BootstrapTable>

      <BootstrapTable
        {...props}
        data={childQrBodyEntities}
        columns={props.columns}
        keyField="_id"
        wrapperClasses="table-responsive"
        bordered={false}
        classes="table table-head-custom table-vertical-center overflow-hidden noBorderOnClick"
        bootstrap4
        remote
      >
      </BootstrapTable>

      <BootstrapTable
        {...props}
        data={childQrBodyEntities}
        columns={props.columns}
        keyField="_id"
        wrapperClasses="table-responsive"
        bordered={false}
        classes="table table-head-custom table-vertical-center overflow-hidden noBorderOnClick"
        bootstrap4
        remote
      >
      </BootstrapTable>
    </>
  )
}
