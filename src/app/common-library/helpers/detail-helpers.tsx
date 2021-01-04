import React, { ReactElement } from 'react';
import { DetailImage } from '../common-components/detail/detail-image';
import { format } from 'date-fns';
import { useIntl } from 'react-intl';
import _ from 'lodash';

export const DisplayString = (input: string) => {
  return <>{input}</>;
};
export const DisplayCelcius = (input: string) => {
  return <>{input + '°C'}</>;
};

export const DisplayPersonName = (name: { firstName: string; lastName: string }) => {
  return <>{`${name.firstName} ${name.lastName}`}</>;
};

export const DisplayPersonNameByArray = (
  person: any[],
): ReactElement => {
  // if (!_.isArray(person)) return <></>;
  return(
  <>
    {person.map(
      (personInfo: any, key: number) => <React.Fragment key={key}>{personInfo.fullName}</React.Fragment>
    )}
  </>
  );
};

export const DisplayPercent = (input: string) => {
  return <>{input + '%'}</>;
};

export const DisplayArray = (arr: string[], separator: string = ', ') => {
  return <>{arr.join(separator)}</>;
};

export const DisplayAddress = (address: {
  address: string;
  district: string;
  city: string;
  state: string;
}) => {
  const addressString = `${address.address}, ${address.district}, ${address.city}, ${address.state}`;
  return <>{addressString}</>;
};

export const DisplayDateTime = (input: string, _format?: string) => {
  if (!_.isString(input)) return <></>
  const date_input = new Date(input);
  return <>{format(date_input, _format ?? 'dd/MM/yyyy H:mma')}</>;
};
export const DisplayLink = (input: any, key?: string) => {
  const intl = useIntl();
  console.log(input)
  return (
    <a href={key ? input[key] : input} target={'_blank'} rel="noopener noreferrer">
      {intl.formatMessage({ id: 'CLICK_TO_DOWNLOAD' })}
    </a>
  );
};

// export const DisplayCoordinates = (arr: string[]) => {
//   return (<>{`${arr[0]}`}</>)
// }

export const DisplayCoordinates = (arr: string[]) => {
  return (
    <a
      href={`https://maps.google.com/?ll=${arr[1]},${arr[0]}`}
      target={'_blank'}>{`${arr[0]}, ${arr[1]}`}</a>
  );
};

export const DisplayImage = (images: any) => {
  return <DetailImage images={images} />;
};
