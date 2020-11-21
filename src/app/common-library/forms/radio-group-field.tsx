import React, { useState } from "react";
import { FormControlLabel, Radio, RadioGroup } from "@material-ui/core";
import { useField, useFormikContext } from "formik";


export const FormikRadioGroup = ({
  // form: { touched, errors },
  ariaLabel,
  name,
  addresses,
  } : {
  // form: {touched: any, errors: any},
  ariaLabel: any,
  name: any,
  addresses: any,
  }
  
  ) => {
  const { setFieldValue, errors, touched } = useFormikContext<any>();
  // const [field] = useField(props);
  const [addressesState, setAddressesState] = useState<any>(addresses[0]._id);
  const handleAddressChange = (e : any) => {
    console.log(e.target.value)
    setAddressesState(e.target.value);
    setFieldValue('defaultShippingAddress', e.target.value)
  }
  
  return (
    <React.Fragment>
      <RadioGroup aria-label={ariaLabel} name={name} value={addressesState} onChange={(e: any) => handleAddressChange(e)}>
        {addresses.map((entity : any, key: any) => (
        <div className="mt-3" key={key}>
          <FormControlLabel name="defaultShippingAddress" value={entity._id} control={<Radio />} label={getShippingAddress(entity)} />
        </div>
        ))}
      </RadioGroup>
    
      {/* {touched[field.name] && errors[field.name] && (
        <React.Fragment>{errors[field.name]}</React.Fragment>
      )} */}
    </React.Fragment>
  );
};

const getShippingAddress = (entity: any) => {
  return entity.address + ', ' + entity.district + ', ' + entity.city + ', ' + entity.state;
}