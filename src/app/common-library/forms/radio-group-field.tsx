import React, { useEffect, useState } from "react";
import { FormControlLabel, Radio, RadioGroup } from "@material-ui/core";
import { useField, useFormikContext } from "formik";
import { Button } from "react-bootstrap";
import { useIntl } from "react-intl";
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { Element } from 'react-scroll';
import StyledRadio from "./StyledRadio";



export const FormikRadioGroup = ({
  // form: { touched, errors },
  ariaLabel,
  name,
  addresses,
  handleAddButton,
  handleEditButton,
  handleDeleteButton,
  setShippingAddressEntity,
} : {
  // form: {touched: any, errors: any},
  ariaLabel: any;
  name: any;
  addresses: any,
  handleAddButton?: any;
  handleEditButton?: any;
  handleDeleteButton?: any;
  setShippingAddressEntity?: any;
  }
  
  ) => {
  const { values, setFieldValue, errors, touched } = useFormikContext<any>();
  // const [field] = useField(props);

  const intl = useIntl();

  const [addressesState, setAddressesState] = useState<any>('');


  useEffect(() => {
    if(addresses && addresses.length) {
      const defaultAddress = addresses.find((addr: any) => addr.isDefault === true);
      if(defaultAddress) {
        setAddressesState(defaultAddress._id);
      }
    }
  }, [addresses.length]);

  const handleAddressChange = (e : any) => {
    setAddressesState(e.target.value);
    let defaultAddress = values.shippingAddress.find((addr: any) => { return addr._id === e.target.value});
    values.shippingAddress = values.shippingAddress.map((addr: any) => {
      return addr._id === e.target.value ? {...addr, isDefault: true} : {...addr, isDefault:false};
    })
    setFieldValue('defaultShippingAddress', getShippingAddress(defaultAddress));
  }
  
  return (
    <React.Fragment>
      <RadioGroup aria-label={ariaLabel} name={name} value={addressesState} onChange={(e: any) => handleAddressChange(e)}>
      <Element name="test7" className="element" id="containerElement" style={{
            position: 'relative',
            maxHeight: '200px',
            padding: '0px 40px 0px 2px',
            overflowY: 'scroll',
            overflowX: 'hidden',
            width: '100%',
            marginBottom: 0,
          }}>
        {addresses.map((entity : any, key: any) => (
        <div className="mt-3 row" key={key}>
          <React.Fragment>
          <div className="col-md-10 col-12">
            <FormControlLabel name="defaultShippingAddress" value={entity._id} control={<StyledRadio />} label={getShippingAddress(entity)} />
          </div>
          <div className="col-md-1 col-12">
            <Button type="button" variant="primary" onClick={(e: any) => {
                if(handleEditButton && setShippingAddressEntity) {
                  handleEditButton(true);
                  setShippingAddressEntity(key);
                }
              }
              }><EditIcon /></Button>
          </div>
          {
            entity.isDefault === false ? (
            <div className="col-md-1 col-12">
              <Button type="button" variant="primary" onClick={(e: any) => {
                if(handleDeleteButton && setShippingAddressEntity) 
                  handleDeleteButton(true);
                  setShippingAddressEntity(key)
                }
                }><DeleteIcon /></Button>
            </div>
            ) : (<></>)
          }
          
          </React.Fragment>
        </div>
        ))}
        </Element>
      </RadioGroup>
      <Button type="button" variant="primary"
        onClick={ (e: any) => {
            handleAddButton(true)
          }
        }
        ><AddIcon /> {intl.formatMessage({id: 'AGENCY.EDIT.BUTTON.ADD_NEW_ADDRESS'})}
      </Button>
    
      {/* {touched[field.name] && errors[field.name] && (
        <React.Fragment>{errors[field.name]}</React.Fragment>
      )} */}
    </React.Fragment>
  );
};

export const getShippingAddress = (entity: any) => {
  return entity.address + ', ' + entity.district + ', ' + entity.city + ', ' + entity.state;
}