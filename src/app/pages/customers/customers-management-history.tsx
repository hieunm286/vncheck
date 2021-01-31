import React, { ReactElement } from 'react';
import { Card, CardHeader, CardBody } from '../../common-library/card';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import BootstrapTable from 'react-bootstrap-table-next';
import { SortDefault } from '../../common-library/common-consts/const';
import { Spin } from 'antd';
import { PleaseWaitMessage, NoRecordsFoundMessage } from '../../common-library/helpers/pagination-helper';
import { AxiosResponse } from 'axios';

interface Prop {
  columns: { [X: string]: any };
  code: string;
  history: any;
  title: string | ReactElement;
  onFetch: (code: string) => Promise<AxiosResponse<any>>;
}

function CustomersManagementView({ columns, code, history, title, onFetch }: Prop) {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [entity, setEntity] = React.useState<{ [X: string]: any }[]>([]);

  React.useEffect(() => {
    setLoading(true);
    onFetch(code)
      .then(res => {
        setEntity(res.data.data);
      })
      .catch(err => console.log(err))
      .finally(() => {
        setLoading(false);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code]);

  return (
    <Card>
      <CardHeader
        title={
          <>
            <span onClick={() => history.goBack()} className=" cursor-pointer text-primary font-weight-boldest">
              <ArrowBackIosIcon /> {code}
            </span>
          </>
        }
      />
      <CardBody>
        <div className="mt-8 mb-10">
          <span className="text-primary detail-dialog-subtitle">{title}</span>
        </div>
        {loading ? (
          <BootstrapTable
            wrapperClasses="table-responsive"
            bordered={false}
            classes="table table-head-custom table-vertical-center overflow-hidden noBorderOnClick"
            bootstrap4
            remote
            keyField="_id"
            data={entity}
            columns={Object.values(columns)}
            defaultSorted={SortDefault as any}>
            <PleaseWaitMessage entities={entity} />
            <NoRecordsFoundMessage entities={entity} />
          </BootstrapTable>
        ) : (
            <div className="text-center"><Spin size="default" /></div>
          
        )}
      </CardBody>
    </Card>
  );
}

export default CustomersManagementView;
