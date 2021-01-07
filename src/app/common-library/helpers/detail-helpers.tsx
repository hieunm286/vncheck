import React, {useEffect, useState} from "react"
import {DetailImage} from "../common-components/detail/detail-image";
import {format} from "date-fns";
import {IntlShape, useIntl} from "react-intl";
import {MasterTable} from "../common-components/master-table";
import {MasterBodyColumns, PaginationProps} from "../common-types/common-type";
import {GetCompareFunction} from "./common-function";
import {Link} from "react-router-dom";
import moment from "moment";

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
        (personInfo: any, key: number) => <React.Fragment
          key={key}>{personInfo.user ? personInfo.user.fullName : personInfo.fullName}</React.Fragment>
      )}
    </>
  );
};

export const DisplayPercent = (input: string) => {
  if (!input) return <></>
  return (<>{input + '%'}</>)
}

export const DisplayArray = (arr: string[], separator: string = ', ') => {
  if (!arr) return <></>
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
export const DisplayDate = ({input, _format}: { input: string, _format?: string }) => {
  const intl = useIntl();
  if (!input) return <></>
  const date_input = new Date(input);
  const timestamp = new Date();
  const inverseOffset = moment(timestamp).utcOffset() * -1;
  
  return (<>
    {input
      ? format(moment(date_input).add(inverseOffset, 'm').toDate(), _format ?? 'dd/MM/yyyy')
      : intl.formatMessage({id: 'NO_INFORMATION'})}
  </>)
}

export const DisplayDateTime = (input: string, _format?: string) => {
  if (!input) return (<></>)
  const date_input = new Date(input);
  const timestamp = new Date();
  const inverseOffset = moment(timestamp).utcOffset() * -1;
  return (<>{format(moment(date_input).add(inverseOffset, 'm').toDate(), _format ?? 'dd/MM/yyyy H:mma')}</>)
}

export const DisplayDownloadLink = (input: any, key?: string) => {
  const intl = useIntl();
  if (!input) return <></>
  return (<a href={key ? input[key] : input} rel="noopener noreferrer" target={'_blank'}>
    {intl.formatMessage({id: 'CLICK_TO_DOWNLOAD'})}
  </a>)
}

export const DisplayInnerLink = (link: any, title?: string) => {
  const intl = useIntl();
  if (!link) return (<></>);
  return (<Link to={link}>
    {title ?? intl.formatMessage({id: 'CLICK_TO_VIEW'})}
  </Link>)
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
  }, [columns])
  return (<MasterTable entities={_innerEntities}
                       columns={_innerColumns}
                       paginationParams={paginationParams}
                       setPaginationParams={setPaginationParams}
                       disablePagination={true}/>
  )
}

export const DisplayCoordinates = (arr: string[]) => {
  return arr && arr.length == 2 ? (
    <a
      href={`https://google.com/maps/search/${arr[1]},+${arr[0]}`}
      rel="noopener noreferrer"
      target={'_blank'}>{`${arr[0]}, ${arr[1]}`}</a>
  ) : (<></>);
};

export const Display3Info = (image: any, _: any, intl: IntlShape) => {
  return (<>
    <div className={'titleeee mb-1'}>{intl.formatMessage({id: 'IMAGE.TAKEN_BY'})}
      {image.takenBy?.fullName ?? image.takenBy?.firstName ? `${image.takenBy?.firstName} ${image.takenBy?.lastName}` : intl.formatMessage({id: 'NO_INFORMATION'})}
    </div>
    <div
      className={'titleeee mb-1'}>{intl.formatMessage({id: 'IMAGE.TAKEN_TIME'})}
      {image.takenTime ? DisplayDateTime(image.takenTime) : intl.formatMessage({id: 'NO_INFORMATION'})}</div>
    <div
      className={'titleeee mb-1'}>{intl.formatMessage({id: 'IMAGE.LOCATION'})}
      {image.location?.coordinates ? DisplayCoordinates(image.location?.coordinates) : intl.formatMessage({id: 'NO_INFORMATION'})}
    </div>
  </>)
}

export const DisplayImage = (images: any, renderInfo?: { title?: string, data?: { [KeyField: string]: string } }) => {
  return (<DetailImage images={images} renderInfo={renderInfo}/>)
}

export const DisplayDiffTime = (input: any, entity: any) => {
  return (
    <>
      {(entity.endTime && entity.startTime) ? entity.endTime.toLocaleString() + ', ' + entity.startTime.toLocaleString()
        : ''
      }
    </>
  )
}