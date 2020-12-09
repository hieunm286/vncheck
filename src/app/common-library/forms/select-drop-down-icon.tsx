import React from 'react';
import DropDownIcon from '../../../../public/media/svg/vncheck/select-dropdown.svg';
import SVG from "react-inlinesvg";
import { ToAbsoluteUrl } from '../helpers/assets-helpers';

const  SelectDropDownIcon = () => {
  return (
    // <div className='d-flex'>
      <span style={{width: '24px', height: '24px'}} className="svg-icon-primary d-flex align-items-center">
        <SVG style={{width: '24px', height: '24px'}} src={ToAbsoluteUrl('/media/svg/vncheck/select-dropdown.svg')} />
      </span>
    // </div>
  )
}

export default SelectDropDownIcon;
