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
import { ToAbsoluteUrl } from "../helpers/assets-helpers";
import SVG from 'react-inlinesvg';



export const FormikRadioGroup = ({
  // form: { touched, errors },
  ariaLabel,
  name,
  addresses,
  handleAddButton,
  handleEditButton,
  handleDeleteButton,
  setShippingAddressEntity,
  currentAddress,
  setCurrentAddress,
} : {
  // form: {touched: any, errors: any},
  ariaLabel: any;
  name: any;
  addresses: any,
  handleAddButton?: any;
  handleEditButton?: any;
  handleDeleteButton?: any;
  setShippingAddressEntity?: any;
  currentAddress: any;
  setCurrentAddress: any;
  }
  
  ) => {
  const { values, setFieldValue, errors, touched } = useFormikContext<any>();
  // const [field] = useField(props);

  const intl = useIntl();


  useEffect(() => {
    if(addresses && addresses.length) {
      const defaultAddress = addresses.find((addr: any) => addr.isDefault === true);
      if(defaultAddress) {
        setCurrentAddress(defaultAddress._id);
      }
    }
  }, [addresses.length]);

  const handleAddressChange = (e : any) => {
    setCurrentAddress(e.target.value);
    const selectedIdx = parseInt(e.target.value)
    let defaultAddress = values.shippingAddress.find((addr: any) => { return addr._id === selectedIdx});
    values.shippingAddress = values.shippingAddress.map((addr: any) => {
      return addr._id === selectedIdx ? {...addr, isDefault: true} : {...addr, isDefault:false};
    })
    setFieldValue('defaultShippingAddress', getShippingAddress(defaultAddress));
    setCurrentAddress(defaultAddress._id)
  }
  
  return (
    <React.Fragment>
      <RadioGroup aria-label={ariaLabel} name={name} value={currentAddress} onChange={(e: any) => handleAddressChange(e)}>
      <Element name="test7" className="element" id="containerElement" style={{
            position: 'relative',
            maxHeight: '200px',
            padding: '0px 0px 0px 2px',
            overflowY: 'scroll',
            overflowX: 'hidden',
            width: '100%',
            marginBottom: '5px',
            marginTop: '5px',
          }}>
        {addresses.map((entity : any, key: any) => (
        <div className="mt-3 row" key={key}>
          <React.Fragment>
          <div className="col-md-10 col-12">
            <FormControlLabel name="defaultShippingAddress" value={entity._id} control={<StyledRadio />} label={getShippingAddress(entity)} />
          </div>
          {/* <div className="col-md-1 col-12">
            <Button type="button" variant="primary" onClick={(e: any) => {
                if(handleEditButton && setShippingAddressEntity) {
                  handleEditButton(true);
                  setShippingAddressEntity(key);
                }
              }
              }><EditIcon /></Button>
          </div>
          <div className="col-md-1 col-12">
            <Button type="button" variant="primary" onClick={(e: any) => {
              if(handleDeleteButton && setShippingAddressEntity) 
                handleDeleteButton(true);
                setShippingAddressEntity(key)
              }
              }><DeleteIcon /></Button>
          </div> */}

          <a
            // title={intl.formatMessage({id: 'COMMON_COMPONENT.MASTER_BODY.TABLE.EDIT_BTN'})}
            className="btn btn-icon btn-light btn-hover-primary btn-sm mx-1"
            onClick={() => {
              if(handleEditButton && setShippingAddressEntity) {
                handleEditButton(true);
                setShippingAddressEntity(key);
              }
            }
          }>
            <span className="svg-icon svg-icon-md svg-icon-primary">
              <SVG
                src={ToAbsoluteUrl('/media/svg/icons/Communication/Write.svg')}
                title={intl.formatMessage({id: 'COMMON_COMPONENT.MASTER_BODY.TABLE.EDIT_BTN'})}
              />
            </span>
          </a>
          <a
            // title={intl.formatMessage({id: 'COMMON_COMPONENT.MASTER_BODY.TABLE.DELETE_BTN'})}
            className="btn btn-icon btn-light btn-hover-primary btn-sm visibility"
            onClick={() => {
              if(handleDeleteButton && setShippingAddressEntity) {
                handleDeleteButton(true);
                setShippingAddressEntity(key)
              }
            }
          }>
            <span className="svg-icon svg-icon-md svg-icon-primary">
              <span className="svg-icon svg-icon-md svg-icon-primary">
                <DeleteIcon className="text-primary eye"/>
              </span>
            </span>
          </a>
          
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