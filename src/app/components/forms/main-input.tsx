import React from 'react';
import './custom.css';
import {FieldFeedbackLabel} from "./field-feedback-label";

const getFieldCSSClasses = (touched: any, errors: any) => {
    const classes = ['form-control'];
    if (touched && errors) {
        classes.push('is-invalid');
    }

    if (touched && !errors) {
        classes.push('is-valid');
    }

    return classes.join(' ');
};

export function MainInput({
                              field, // { name, value, onChange, onBlur }
                              form: {touched, errors}, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                              label,
                              withFeedbackLabel,
                              withValidation,
                              customFeedbackLabel,
                              isHorizontal,
                              type = 'text',
                              ...props
                          }: any) {
    return (
        <>
            <div className={isHorizontal && 'd-flex align-items-center'}>
                {label && <label className={isHorizontal && 'mb-0 input-label'}
                >{label}</label>}
                <input
                    type={type}
                    className={
                        type === 'text' || type === 'email' || type === 'file' || type === 'image' ? (
                            withFeedbackLabel
                                ? getFieldCSSClasses(touched[field.name], errors[field.name])
                                : 'form-control') : ''
                    }
                    {...field}
                    {...props}
                />
                {withFeedbackLabel && (
                    <FieldFeedbackLabel
                        error={errors[field.name]}
                        touched={touched[field.name]}
                        label={label}
                        type={type}
                        customFeedbackLabel={customFeedbackLabel}
                    />
                )}
            </div>
        </>
    );
}
