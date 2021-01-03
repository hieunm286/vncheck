import React from "react"
import {DetailImage} from "../common-components/detail/detail-image";
import {format} from "date-fns";

export const DisplayString = (input: string) => {
  return (<>{input}</>)
}

export const DisplayArray = (arr: string[], separator: string) => {
  return (<>{arr.join(separator)}</>)
}

export const DisplayDateTime = (input: string, _format?: string) => {
  const date_input = new Date(input);
  return (<>{format(date_input, _format ?? 'dd/MM/yyyy H:mma',)}</>)
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
