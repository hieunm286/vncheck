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
  mode?: 'horizontal' | 'vertical' | undefined;
}

function CustomImageUpload({
                             label,
                             labelWidth,
                             pathField = 'path',
                             required,
                             name,
                             mode,
                             maxNumber = 3,
                           }: ImageUploadPros) {
  const {errors, touched, setFieldValue, values,} = useFormikContext<any>();
  const [field, fieldMeta, fieldHelper] = useField({name});
  const [images, setImages] = useState<any>([]);
  const getImage = useCallback((path: string) => {
    const isBase64 = (s: string) => s.indexOf("data:image") == 0;
    return path ? isBase64(path) ? path : ToDataURL('/' + path)
      .catch(error => {
        console.log(error); // Logs an error if there was one
        throw error;
      }) : undefined;
  }, []);
  useEffect(() => {
    if (field.value) {
      if (_.isArray(field.value)) {
        console.log(field.value)
        Promise.all(field.value.map((f) => {
          return getImage(f[pathField])
        })).then((images) => {
          const t = images.map((image: any, index) => ({...field.value[index], [pathField]: image}));
          console.log(t)
          setImages(t);
        });
      } else {
        Promise.all([getImage(field.value[pathField])]).then(images => {
          const t = images.map((image: any) => ({...field.value, [pathField]: image}));
          console.log(t)
          setImages(t);
        });
      }
    }
  }, [field.value]);
  
  const getImageMetaList = useCallback((file: any, key: string): Promise<any[]> => {
    if (!file) return Promise.resolve([]);
    return Promise.all(file.map((item: any) => {
      return exifr.parse(item.file)
    }));
  }, []);
  
  const handleChange = useCallback((imageList: any[], addUpdateIndex: any, key: string) => {
    console.log(imageList);
    const newArr = getNewImage(images, imageList);
    const promise = getImageMetaList(newArr, key);
    promise.then((metadataList) => {
      setFieldValue(name, imageList.map((image: any, index) => {
        let result = {[pathField]: image[pathField]};
        if (metadataList[index]) {
          result.location = {
            type: 'Point',
            coordinates: [metadataList[index].lat, metadataList[index].long],
          };
          result.takenTime = metadataList[index].time
        }
        return result;
      }));
    });
  }, []);
  
  const getDeleteImage = useCallback((index: number) => {
    // let updateArr = [...imageData];
    // let arr = updateArr.filter((values: any, indexs: number) => indexs !== index);
    // setImageData(arr);
  }, []);
  
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
            handleChange(imageList, addUpdateIndex, name);
          }}
          maxNumber={maxNumber}
          dataURLKey={pathField}>
          {({
              imageList,
              onImageUpload,
              onImageRemoveAll,
              onImageUpdate,
              onImageRemove,
              isDragging,
              dragProps,
            }) => {
            console.log(imageList);
            return (
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
                      <img src={image[pathField]} alt="" width="100" height="100"/>
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
                  {!(images && images.length >= maxNumber) && (
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
            )
          }}
        </ImageUploading>
      </div>
    </div>
  );
}

export default CustomImageUpload;
