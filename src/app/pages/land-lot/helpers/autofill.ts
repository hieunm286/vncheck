import { ChangeEvent } from 'react';

export const stringOnChange = (e: ChangeEvent<HTMLInputElement>, searchM: any, search: any, onChange: any, key: string) => {
    const value = e.target.value.toUpperCase();
      if(searchM[key].keyField === "lotSubLotCode") {
        if(value.length > 3) {

        } else if(value.length === 3 || value.length === 2) {
          const newCharacterEntered = value.slice(-1);
          if('0' <= newCharacterEntered && newCharacterEntered <= '9') {
            onChange({
              ...search, 
              [key]: value,
              subLot: {label: value.substring(1, value.length), value: value.substring(1, value.length)}
            });
          }
        }
        else if(value.length === 1) {
          if('A' <= value && value <= 'Z') {
            onChange({
              ...search, 
              [key]: value,
              lot: {label: value, value: value},
              subLot: {label: '', value: ''}
            });
          }
        }
        else { // value.length === 0
          onChange({
            ...search, 
            [key]: value,
            lot: {label: value, value: value},
            subLot: {label: '', value: ''}
          });
        }
      } else {
        onChange({ ...search, [key]: value });
      }
  };
