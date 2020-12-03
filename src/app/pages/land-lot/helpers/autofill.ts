import { ChangeEvent } from 'react';

export const stringOnChange = (
  e: ChangeEvent<HTMLInputElement>, 
  searchM: any, 
  search: any, 
  setSearch: any, 
  key: string, 
  handleChange: any, 
  setFieldValue: any, 
  setIsDisabled: any, 
  isDisabled: any) => {
    const value = e.target.value.toUpperCase();
    if(searchM[key].keyField === "code") {
      let _disabled = {};
      if(value.length > 3) {

      } else if(value.length === 3 || value.length === 2) {
        const newCharacterEntered = value.slice(-1);
        if('0' <= newCharacterEntered && newCharacterEntered <= '9') {
          setIsDisabled(
            newStateWithTheseDisabled(isDisabled, ['lot', 'subLot'])
          );
          handleChange(e);

          setFieldValue(key, value);
          setFieldValue('subLot', value.substring(1, value.length));  

          setSearch({
            ...search, 
            [key]: value,
            subLot: {label: value.substring(1, value.length), value: value.substring(1, value.length)}
          });
        }
      }
      else if(value.length === 1) {
        if('A' <= value && value <= 'Z') {
          setIsDisabled(
            newStateWithTheseDisabled(isDisabled, ['lot', 'subLot'])
          );
          handleChange(e);

          setFieldValue('code', value.toUpperCase());
          setFieldValue('lot', value);
          setFieldValue('subLot', '');

          setSearch({
            ...search, 
            [key]: value,
            lot: {label: value, value: value},
            subLot: {label: '', value: ''}
          });
        }
      }
      else { // value.length === 0
        setIsDisabled(
          newStateWithTheseEnabled(isDisabled, Object.keys(isDisabled))
        );
        handleChange(e);

        setFieldValue('lot', value);
        setFieldValue('subLot', '');

        setSearch({
          ...search, 
          [key]: value,
          lot: {label: value, value: value},
          subLot: {label: '', value: ''}
        });
      }
    } else if(searchM[key].keyField === "lot"
      || search[key].keyField === "subLot"
    ) {
      setSearch({ ...search, [key]: value });
    } else {
      setSearch({ ...search, [key]: value });
    }
  };

  
export const searchSelectOnChange = (
  value: any, 
  values: any,
  searchM: any, 
  search: any, 
  setSearch: any, 
  key: string, 
  handleChange: any, 
  setFieldValue: any, 
  setIsDisabled: any, 
  isDisabled: any) => {
    if(searchM[key].keyField === "lot") {
      if(value) {
        setIsDisabled({...isDisabled, code: true, subLot: false});
        // setIsDisabled(
        //   newStateWithTheseDisabled(isDisabled, ['code'])
        // );
        // setIsDisabled(
        //   newStateWithTheseEnabled(isDisabled, ['subLot'])
        // );
        setFieldValue('code', value.label + values.subLot);
        setFieldValue('lot', value.label);
        // setFieldValue('subLot', '')
        setSearch({...search, code: value.label, lot: {value: value.label, label: value.label}, 
          // subLot: {value: '', label: ''}
        });
      }
    }

    if(searchM[key].keyField === "subLot") {
      if(value) {
        setIsDisabled(
          newStateWithTheseDisabled(isDisabled, ['code'])
        );
        setFieldValue('code', values.lot + value.label);
        // const newSearch = {...search, code: values.code + value.label, subLot: {value: value.value, label: value.label}};
        // console.log(newSearch)
        setSearch({...search, code: values.lot + value.label, subLot: {value: value.value, label: value.label}});
      }
    }
    

}

const newStateWithTheseDisabled = (obj: any, fields: any[]) => {
  let newObj = {...obj};
  Object.keys(obj).forEach(key => {
    if(fields.includes(key)) {
      newObj = {...newObj, [key]: true}
    }
  });
  return newObj;
}
  
  
const newStateWithTheseEnabled = (obj: any, fields: any[]) => {
  let newObj = {...obj};
  Object.keys(obj).forEach(key => {
    if(fields.includes(key)) {
      newObj = {...newObj, [key]: false}
    }
  });
  return newObj;
}
