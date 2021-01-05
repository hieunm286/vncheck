import React, {useEffect, useState} from "react"
import {DetailImage} from "../common-components/detail/detail-image";
import {format} from "date-fns";
import {useIntl} from "react-intl";
import {MasterTable} from "../common-components/master-table";
import {MasterBodyColumns, PaginationProps} from "../common-types/common-type";
import {GetCompareFunction} from "./common-function";

export const DisplayString = (input: string) => {
  if (!input) return <></>
  return (<>{input}</>)
}
export const DisplayCelcius = (input: string) => {
  if (!input) return <></>
  return (<>{input + '°C'}</>)
}

export const DisplayPersonName = (name: { firstName: string; lastName: string }) => {
  return <>{`${name.firstName} ${name.lastName}`}</>;
};

export const DisplayPersonNameByArray = (
  person: any[],
) => {
  // if (!_.isArray(person)) return <></>;
  return (
    <>
      {person.map(
        (personInfo: any, key: number) => <React.Fragment key={key}>{personInfo.user ? personInfo.user.fullName : personInfo.fullName}</React.Fragment>
      )}
    </>
  );
};

export const DisplayPercent = (input: string) => {
  if (!input) return <></>
  return (<>{input + '%'}</>)
}

export const DisplayArray = (arr: string[], separator: string = ', ') => {
  return (<>{arr.join(separator)}</>)
}

export const DisplayAddress = (address: {
  address: string;
  district: string;
  city: string;
  state: string;
}) => {
  const addressString = `${address.address}, ${address.district}, ${address.city}, ${address.state}`;
  return (<>{addressString}</>);
}
export const DisplayDate = ({input}: { input: string }) => {
  const intl = useIntl();
  if (!input) return <></>
  return (<>
          {input
            ? new Intl.DateTimeFormat('en-GB').format(new Date(input))
            : intl.formatMessage({id: 'NO_INFORMATION'})}
        </>)
}

export const DisplayDateTime = (input: string, _format?: string) => {
  if (!input) return (<></>)
  const date_input = new Date(input);
  return (<>{format(date_input, _format ?? 'dd/MM/yyyy H:mma',)}</>)
}

export const DisplayDownloadLink = (input: any, key?: string) => {
  const intl = useIntl();
  if (!input) return <></>
  return (<a href={key ? input[key] : input} target={'_blank'}>
    {intl.formatMessage({id: 'CLICK_TO_DOWNLOAD'})}
  </a>)
}

export const DisplayTable = ({entities, columns}: { entities: any[], columns: MasterBodyColumns }) => {
  const [paginationParams, setPaginationParams] = useState<PaginationProps>({sortBy: '', sortType: ''});
  const [_innerEntities, setEntities] = useState(entities);
  const [_innerColumns, setColumns] = useState(columns);
  const intl = useIntl();
  useEffect(() => {
    let es = entities;
    if (es) {
      es = es.sort(GetCompareFunction({
        key: paginationParams.sortBy,
        orderType: paginationParams.sortType === 'asc' ? 1 : -1
      }))
    }
    setEntities(es);
  }, [entities, paginationParams]);
  useEffect(() => {
    setColumns(Object.values(columns).map(c => ({...c, text: intl.formatMessage({id: c.text})})));
  })
  return (<MasterTable entities={_innerEntities}
                       columns={_innerColumns}
                       paginationParams={paginationParams}
                       setPaginationParams={setPaginationParams}
                       disablePagination={true}/>
  )
}

export const DisplayCoordinates = (arr: string[]) => {
  return (
    <a
      href={`https://maps.google.com/?ll=${arr[1]},${arr[0]}`}
      target={'_blank'}>{`${arr[0]}, ${arr[1]}`}</a>
  );
};

export const DisplayImage = (images: any) => {
  return (<DetailImage images={images}/>)
}

export const DisplayDiffTime = (input: any, entity: any) => {return (
  <>
    {(entity.endTime && entity.startTime) ? entity.endTime.toLocaleString() + ', ' + entity.startTime.toLocaleString() 
    : ''
    }
  </>
  )}