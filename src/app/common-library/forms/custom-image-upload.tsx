import React, {ReactElement, useEffect, useState} from 'react';
import ImageUploading from 'react-images-uploading';
import {getNewImage, getOnlyBase64} from '../helpers/common-function';
import exifr from 'exifr';
import './custom-image-upload.scss';
import {useFormikContext} from 'formik';

interface ImageUploadPros {
  value: any[];
  label: string | ReactElement;
  onChange?: any;
  labelWidth?: number;
  isHorizontal?: boolean;
  required?: boolean;
  name: string;
  multiple?: boolean;
}

const getClassName = (labelWidth: number | null | undefined, labelStart: boolean) => {
  const classes: string[] = [];
  
  if (labelStart) {
    if (labelWidth) {
      classes.push(`col-xl-${labelWidth}`);
      classes.push(`col-md-${labelWidth}`);
      classes.push('col-12');
    } else {
      classes.push(`col-xl-3`);
      classes.push(`col-md-3`);
      classes.push('col-12');
    }
  } else {
    if (labelWidth) {
      classes.push(`col-xl-${12 - labelWidth - 1}`);
      classes.push(`col-md-${12 - labelWidth}`);
      classes.push('col-12');
    } else {
      classes.push(`col-xl-8`);
      classes.push(`col-md-9`);
      classes.push('col-12');
    }
  }
  
  return classes.join(' ');
};

function CustomImageUpload({
                             label,
                             labelWidth,
                             value,
                             isHorizontal,
                             required,
                             name,
                             multiple
                           }: ImageUploadPros) {
  const {errors, touched, setFieldValue} = useFormikContext<any>();
  
  const [imageData, setImageData] = useState<{ data_url: any; exif: any }[]>([]);
  const [imagess, setImagess] = useState(value || []);
  
  const ImageMeta = (file: any, key: string) => {
    if (!file) return '';
    
    file.forEach((item: any) => {
      exifr.parse(item.file).then(res => {
        const image = {
          data_url: item.data_url,
          exif: {
            time: res.CreateDate,
            lat: res.latitude,
            long: res.longitude
          },
        };
        
        const data: any[] = [];
        data.push(image);
        
        setImageData(prevImages => [...prevImages, ...data]);
      });
    });
  };
  
  const handleChange = (
    imageList: any,
    addUpdateIndex: any,
    key: string,
  ) => {
    const newArr = getNewImage(imagess, imageList);
    
    ImageMeta(newArr, key);
    
    setImagess(imageList);
  };
  
  const getDeleteImage = (index: number) => {
    let updateArr = [...imageData];
    
    let arr = updateArr.filter((values: any, indexs: number) => indexs !== index)
    
    setImageData(arr)
  }
  
  useEffect(() => {
    if (name) {
      setFieldValue(name, imageData)
    }
  }, [imageData])

  useEffect(() => {
    if (value) {
      setImagess(value)
    }
  }, [value])

  return (
    <div className={isHorizontal ? 'row' : ''}>
      <div className={getClassName(labelWidth, true)}>
        {typeof label === 'string' ? (
          <label className={isHorizontal ? 'mb-0 select-label mt-2' : ''}>
            {label}
            {required && <span className="text-danger"> *</span>}
          </label>
        ) : label}
      </div>
      <div className={getClassName(labelWidth, false)}>
        <ImageUploading
          multiple={multiple}
          value={imagess}
          onChange={(imageList: any, addUpdateIndex: any) => {
            if (name) {
              handleChange(imageList, addUpdateIndex, name)
            }
            
          }
          }
          maxNumber={69}
          dataURLKey="data_url">
          {({
              imageList,
              onImageUpload,
              onImageRemoveAll,
              onImageUpdate,
              onImageRemove,
              isDragging,
              dragProps,
            }) => (
            // write your building UI
            <>
              <div
                className={(errors[name] && touched[name]) ? "is-invalid d-flex flex-wrap upload__image-wrapper" : "d-flex flex-wrap upload__image-wrapper"}>
                {imageList.map((image, index) => (
                  <div key={index} className="image-item imagePreview">
                    <img src={image['data_url']} alt="" width="100" height="100"/>
                    {/* <div className="image-item__btn-wrapper"> */}
                    <button
                      type="button"
                      className="close"
                      onClick={() => {
                        onImageRemove(index);
                        getDeleteImage(index);
                      }}>
                      x
                    </button>
                    &nbsp;
                  </div>
                  // </div>
                ))}
                <button
                  type="button"
                  style={isDragging ? {color: 'red'} : undefined}
                  onClick={onImageUpload}
                  className="button-add-image"
                  {...dragProps}>
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 25 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M2.5 2.5H18.75V11.25H21.25V2.5C21.25 1.12125 20.1287 0 18.75 0H2.5C1.12125 0 0 1.12125 0 2.5V17.5C0 18.8787 1.12125 20 2.5 20H12.5V17.5H2.5V2.5Z"
                      fill="#27AE60"
                    />
                    <path d="M7.5 10L3.75 15H17.5L12.5 7.5L8.75 12.5L7.5 10Z" fill="#27AE60"/>
                    <path
                      d="M21.25 13.75H18.75V17.5H15V20H18.75V23.75H21.25V20H25V17.5H21.25V13.75Z"
                      fill="#27AE60"
                    />
                  </svg>
                </button>
              </div>
              {
                (errors[name] && touched[name]) ? (
                  <div className="invalid-feedback">{errors[name]}</div>
                ) : <></>
              }
            </>
          )}
        </ImageUploading>
      </div>
    </div>
  );
}

export default CustomImageUpload;
