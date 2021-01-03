import React from "react"
import {DetailImage} from "../common-components/detail/detail-image";
import {format} from "date-fns";
import {useIntl} from "react-intl";

export const DisplayString = (input: string) => {
  return (<>{input}</>)
}
export const DisplayCelcius = (input: string) => {
  return (<>{input + '°C'}</>)
}

export const DisplayPersonName = (name: { firstName: string, lastName: string }) => {
  return (<>{`${name.firstName} ${name.lastName}`}</>)
}

export const DisplayPercent = (input: string) => {
  return (<>{input + '%'}</>)
}

export const DisplayArray = (arr: string[], separator: string = ', ') => {
  return (<>{arr.join(separator)}</>)
}

export const DisplayAddress = (address: { address: string, district: string, city: string, state: string }) => {
  const addressString = `${address.address}, ${address.district}, ${address.city}, ${address.state}`;
  return (<>{addressString}</>);
}

export const DisplayDateTime = (input: string, _format?: string) => {
  const date_input = new Date(input);
  return (<>{format(date_input, _format ?? 'dd/MM/yyyy H:mma',)}</>)
}
export const DisplayLink = (input: any, key?: string) => {
  const intl = useIntl();
  return (<a href={key ? input[key] : input} target={'_blank'}>
    {intl.formatMessage({id: 'CLICK_TO_DOWNLOAD'})}
  </a>)
}

// export const DisplayCoordinates = (arr: string[]) => {
//   return (<>{`${arr[0]}`}</>)
// }

export const DisplayCoordinates = (arr: string[]) => {
  return (<a href={`https://maps.google.com/?ll=${arr[1]},${arr[0]}`} target={'_blank'}>{`${arr[0]}, ${arr[1]}`}</a>)
}


export const DisplayImage = (images: any) => {
  return (<DetailImage images={images}/>)
}
