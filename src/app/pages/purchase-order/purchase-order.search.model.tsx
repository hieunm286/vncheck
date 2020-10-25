export type SearchModel = {
  [T: string]: {
    type: 'string' |'number' |'Datetime',
    placeholder: string,
    label: string,
  }
}
