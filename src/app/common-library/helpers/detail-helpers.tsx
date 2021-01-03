import React from "react"
import {DetailImage} from "../common-components/detail/detail-image";

export const DisplayString = (input: string) => {
  return (<>{input}</>)
}

export const DisplayArray = (arr: string[], separator: string) => {
  return (<>{arr.join(separator)}</>)
}

export const DisplayCoordinates = (arr: string[]) => {
  return (<>{`${arr[0]}`}</>)
}


export const DisplayImage = (images:any) => {
  return (<DetailImage images={images}/>)
}
