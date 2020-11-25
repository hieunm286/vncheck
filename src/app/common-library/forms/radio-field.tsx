import React, { useState, useEffect } from "react";
import { FormControlLabel, Radio, RadioGroup } from "@material-ui/core";
import { useField, useFormikContext } from "formik";
import { Button } from "react-bootstrap";
import { useIntl } from "react-intl";
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { Element } from 'react-scroll';
import StyledRadio from "./StyledRadio";



export const RadioField = ({
  // form: { touched, errors },
  ariaLabel,
  name,
  defaultValue,
} : {
  // form: {touched: any, errors: any},
  ariaLabel?: any;
  name?: any;
  defaultValue?: any;
  }
  
  ) => {
  const { values, setFieldValue, errors, touched } = useFormikContext<any>();
  // const [field] = useField(props);

  const intl = useIntl();

  const [genderState, setGenderState] = useState<any>(1);
  const handleAddressChange = (e : any) => {
    console.log(e.target.value)
    setGenderState(e.target.value);
    // setFieldValue('defaultShippingAddress', e.target.value)
    setFieldValue('gender', e.target.value)
  }
  
  const getGender = () => {
    return new Promise((resolve, reject) => {
      if(defaultValue) {
        resolve(defaultValue);
      } else {
        reject((err: any) => {
          console.log(err)
        });
      }
    })
  }

  const getGenderSync = async () => {
    const gender = await getGender();
    return gender;
  }

  useEffect(() => {
    getGenderSync().then((res) => {
      console.log(res);
      setGenderState(res);
    })
    // console.log(gender)
    return () => {
    }
  }, [])

  console.log(values.gender)
  return (
    <React.Fragment>
      <RadioGroup aria-label={ariaLabel} name="gender" defaultValue={values.gender} value={values.gender} onChange={(e: any) => handleAddressChange(e)}>
          <div className="col-md-6 col-12">
            <FormControlLabel name={name} value="1" control={<StyledRadio />} label="Nam" />
          </div>
          <div className="col-md-6 col-12">
            <FormControlLabel name={name} value="0" control={<StyledRadio />} label="Nữ" />
          </div>
      </RadioGroup>
    
      {/* {touched[field.name] && errors[field.name] && (
        <React.Fragment>{errors[field.name]}</React.Fragment>
      )} */}
    </React.Fragment>
  );
};