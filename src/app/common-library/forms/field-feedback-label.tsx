import React from 'react';
import { FormattedMessage } from 'react-intl';

interface FeedBackProps {
  label: string;
  touched: any;
  error?: any;
  customFeedbackLabel: string;
  type?: string;
}

const inputLabel = ({ label, touched, error, customFeedbackLabel }: FeedBackProps) => {
  // console.log('touced:' + touched)
  //   console.log('err:' + error)

  if (touched && error) {
    return (
      <div className="invalid-feedback">
        {/* <FormattedMessage id={error}></FormattedMessage> */}
        {error}
      </div>
    );
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

const selectLabel = ({ label, touched, error, customFeedbackLabel }: FeedBackProps) => {
  if (touched && error) {
    return (
      <div className="invalid-feedback">
        <FormattedMessage id={error}></FormattedMessage>
      </div>
    );
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

export function FieldFeedbackLabel({
  label,
  touched,
  error,
  type,
  customFeedbackLabel,
}: FeedBackProps) {
  switch (type) {
    case 'text':
      return inputLabel({ label, touched, error, customFeedbackLabel });
    case 'string':
      return inputLabel({ label, touched, error, customFeedbackLabel });
    case 'email':
      return inputLabel({ label, touched, error, customFeedbackLabel });
    case 'password':
      return inputLabel({ label, touched, error, customFeedbackLabel });
    case 'number':
      return inputLabel({ label, touched, error, customFeedbackLabel });
    case 'Datetime':
      return inputLabel({ label, touched, error, customFeedbackLabel });
    default:
      return selectLabel({ label, touched, error, customFeedbackLabel });
  }
}
