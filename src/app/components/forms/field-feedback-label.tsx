import React from 'react';
import { FormattedMessage } from 'react-intl';

const inputLabel = ({ label, touched, error, customFeedbackLabel }: any) => {
  if (touched && error) {
    return <div className="invalid-feedback">{error}</div>;
  }

  if (touched && !error && label) {
    return <></>;
  }

  return (
    <div className="feedback">
      {customFeedbackLabel && <>{customFeedbackLabel}</>}
      {!customFeedbackLabel && <></>}
    </div>
  );
};

const selectLabel = ({ label, touched, error, customFeedbackLabel }: any) => {
  if (touched && error) {
    return <div className="invalid-feedback">{error}</div>;
  }

  return (
    <div className="feedback">
      {customFeedbackLabel && <>{customFeedbackLabel}</>}
      {!customFeedbackLabel && label && (
        <>
          <FormattedMessage id="VALIDATION.SELECT_FEEDBACK_LABEL"></FormattedMessage> <b>{label}</b>
        </>
      )}
    </div>
  );
};

export function FieldFeedbackLabel({ label, touched, error, type, customFeedbackLabel }: any) {
  switch (type) {
    case 'text':
      return inputLabel({ label, touched, error, customFeedbackLabel });
    case 'email':
      return inputLabel({ label, touched, error, customFeedbackLabel });
    case 'password':
      return inputLabel({ label, touched, error, customFeedbackLabel });
    default:
      return selectLabel({ label, touched, error, customFeedbackLabel });
  }
}
