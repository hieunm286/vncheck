import React, {ReactElement, useCallback, useEffect, useState} from 'react';
import ImageUploading from 'react-images-uploading';
import {GetClassName, getNewImage, ToDataURL} from '../helpers/common-function';
import exifr from 'exifr';
import './custom-image-upload.scss';
import {useField, useFormikContext} from 'formik';
import {CloseOutlined} from '@material-ui/icons';
import _ from "lodash";

interface ImageUploadPros {
  value: any[];
  label: string | ReactElement;
  onChange?: any;
  labelWidth?: number;
  required?: boolean | ((values: any) => boolean);
  name: string;
  maxNumber?: number;
  pathField?: string;
  multiple?: boolean;
  mode?: 'horizontal' | 'vertical' | undefined;
}

function CustomImageUpload({
                             label,
                             labelWidth,
                             pathField = 'path',
                             required,
                             name,
                             mode,
                             maxNumber = 1,
                           }: ImageUploadPros) {
  const {errors, touched, setFieldValue, values,} = useFormikContext<any>();
  const [field, fieldMeta, fieldHelper] = useField({name});
  
  const [imageData, setImageData] = useState<{ data_url: any; exif: any }[]>([]);
  const [images, setImages] = useState<any>(null);
  const getImage = useCallback((path: string) => {
    return ToDataURL('/' + path)
      .then(dataUrl => {
        return {data_url: dataUrl};
      })
      .catch(error => {
        console.log(error); // Logs an error if there was one
        throw error;
      });
  }, []);
  useEffect(() => {
    if (field.value) {
      if (_.isArray(field.value)) {
        const arr: any[] = [];
        field.value.forEach((f) => {
          getImage(f[pathField]).then((image: any) => {
            arr.push(image);
          });
        });
        setImages(arr);
      } else {
        getImage(field.value[pathField]).then((image: any) => {
          setImages(image);
        });
      }
    }
  }, [field.value]);
  
  const ImageMeta = (file: any, key: string) => {
    if (!file) return '';
    
    file.forEach((item: any) => {
      exifr.parse(item.file).then(res => {
        const image = {
          data_url: item.data_url,
          exif: {
            time: res?.CreateDate,
            lat: res?.latitude,
            long: res?.longitude,
          },
        };
        
        const data: any[] = [];
        data.push(image);
        
        setImageData(prevImages => [...prevImages, ...data]);
      });
    });
  };
  
  // const handleChange = (imageList: any, addUpdateIndex: any, key: string) => {
  //   const newArr = getNewImage(imagess, imageList);
  //
  //   ImageMeta(newArr, key);
  //
  //   setImagess(imageList);
  // };
  //
  const getDeleteImage = (index: number) => {
    let updateArr = [...imageData];
    
    let arr = updateArr.filter((values: any, indexs: number) => indexs !== index);
    
    setImageData(arr);
  };
  
  useEffect(() => {
    if (name && values) {
      setFieldValue(name, imageData);
    }
  }, [imageData]);
  //
  // useEffect(() => {
  //   if (value) {
  //     setImagess(value);
  //   }
  // }, [value]);
  //
  return (
    <div className={mode === 'horizontal' ? 'row' : ''}>
      <div className={GetClassName(labelWidth, true)}>
        {typeof label === 'string' ? (
          <label className={mode === 'horizontal' ? 'mb-0 mt-2' : ''}>
            {label}
            {required && <span className="text-danger"> *</span>}
          </label>
        ) : (
          label
        )}
      </div>
      <div className={GetClassName(labelWidth, false)}>
        <ImageUploading
          multiple={maxNumber > 1}
          value={images}
          onChange={(imageList: any, addUpdateIndex: any) => {
            if (name) {
              // handleChange(imageList, addUpdateIndex, name);
            }
          }}
          maxNumber={maxNumber}
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
                className={
                  errors[name] && touched[name]
                    ? 'is-invalid d-flex flex-wrap upload__image-wrapper'
                    : 'd-flex flex-wrap upload__image-wrapper'
                }>
                {imageList.map((image, index) => (
                  <div key={index} className="image-item imagePreview mr-1">
                    <img src={image['data_url']} alt="" width="100" height="100"/>
                    {/* <div className="image-item__btn-wrapper"> */}
                    <button
                      type="button"
                      className="close"
                      onClick={() => {
                        onImageRemove(index);
                        getDeleteImage(index);
                      }}>
                      <CloseOutlined/>
                    </button>
                  </div>
                ))}
                {images.length < maxNumber && (
                  <button
                    type="button"
                    style={isDragging ? {color: 'red'} : undefined}
                    onClick={onImageUpload}
                    className="button-add-image text-primary"
                    {...dragProps}>
                    <svg
                      width="30"
                      height="30"
                      viewBox="0 0 25 24"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M2.5 2.5H18.75V11.25H21.25V2.5C21.25 1.12125 20.1287 0 18.75 0H2.5C1.12125 0 0 1.12125 0 2.5V17.5C0 18.8787 1.12125 20 2.5 20H12.5V17.5H2.5V2.5Z"
                        fill="currentColor"
                      />
                      <path
                        d="M7.5 10L3.75 15H17.5L12.5 7.5L8.75 12.5L7.5 10Z"
                        fill="currentColor"
                      />
                      <path
                        d="M21.25 13.75H18.75V17.5H15V20H18.75V23.75H21.25V20H25V17.5H21.25V13.75Z"
                        fill="currentColor"
                      />
                    </svg>
                  </button>
                )}
              </div>
              {errors[name] && touched[name] ? (
                <div className="invalid-feedback">{errors[name]}</div>
              ) : (
                <></>
              )}
            </>
          )}
        </ImageUploading>
      </div>
    </div>
  );
}

export default CustomImageUpload;
