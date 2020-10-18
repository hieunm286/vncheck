import React from 'react';
import {useField} from 'formik';
import {FieldFeedbackLabel} from './field-feedback-label';

const getFieldCSSClasses = (touched: any, errors: any) => {
    const classes = ['form-control', 'form-control-solid'];
    if (touched && errors) {
        classes.push('is-invalid-select');
    }

    if (touched && !errors) {
        classes.push('is-valid-select');
    }

    return classes.join(' ');
};

export function Select({label, withFeedbackLabel, type = 'text', customFeedbackLabel, children, isHorizontal, ...props}: any) {
    const [field, meta] = useField(props);
    const {touched, error} = meta;
    return (
        <>
            <div className={isHorizontal && 'd-flex align-items-center'}>
                {label && <label className={isHorizontal && 'mb-0 select-label'}
                >{label}</label>}
                <select
                    className={
                        withFeedbackLabel ? getFieldCSSClasses(touched, error) : 'form-control form-control-solid'
                    }
                    {...field}
                    {...props}>
                    {children}
                </select>
                {withFeedbackLabel && (
                    <FieldFeedbackLabel
                        erros={error}
                        touched={touched}
                        label={label}
                        customFeedbackLabel={customFeedbackLabel}
                    />
                )}
            </div>
        </>
    );
}
