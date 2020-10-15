// Form is based on Formik
// Data validation is based on Yup
// Please, be familiar with article first:
// https://hackernoon.com/react-form-validation-with-formik-and-yup-8b76bda62e10
import React from 'react';
import { Modal } from 'react-bootstrap';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Input, Select, DatePickerField } from '../../../../../../_metronic/_partials/controls';
import COUNTRY_LIST from '../../../../../../_metronic/country/country';

// Validation schema
const UserEditSchema = Yup.object().shape({
  email: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Email is required'),
  dateofbirth: Yup.mixed()
    .nullable(false)
    .required('Date of Birth is required'),
  phone: Yup.string()
    .min(9, 'Minimum 3 symbols')
    .max(13, 'Maximum 13 symbols')
    .required('Phone number is required'),
  paid: Yup.number().required('Paid is required'),
  // children: Yup.object({
  //   gpa: Yup.number().required('GPA is required'),
  // }),
  location: Yup.string().required('Location is required'),
});

export function UserEditForm({ saveUser, user, actionsLoading, onHide }) {
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={user}
        validationSchema={UserEditSchema}
        onSubmit={values => {
          const newValues = {
            ...values,
            dateofbirth: new Date(values.dateofbirth).toISOString(),
          };
          saveUser(newValues);
        }}>
        {({ handleSubmit }) => (
          <>
            <Modal.Body className="overlay overlay-block cursor-default">
              {actionsLoading && (
                <div className="overlay-layer bg-transparent">
                  <div className="spinner spinner-lg spinner-success" />
                </div>
              )}
              <Form className="form form-label-right">
                <div className="form-group row">
                  {/* First Name */}
                  <div className="col-lg-4">
                    <Field name="email" component={Input} placeholder="Email" label="Email" />
                  </div>

                  {/* Last Name */}
                  <div className="col-lg-4">
                    <Field name="phone" component={Input} placeholder="Last Name" label="Phone" />
                  </div>
                  <div className="col-lg-4">
                    <Field
                      //   type="email"
                      name="paid"
                      component={Input}
                      placeholder="Paid"
                      label="Paid"
                    />
                  </div>
                </div>
                {/* Email */}
                <div className="form-group row">
                  <div className="col-lg-4">
                    <Field
                      //   type="email"
                      name="children.gpa"
                      component={Input}
                      placeholder="GPA"
                      label="GPA"
                    />
                  </div>
                  {/* Date of birth */}
                  <div className="col-lg-4">
                    <DatePickerField name="dateofbirth" label="Date of Birth" />
                  </div>
                  <div className="col-lg-4">
                    <Select name="location" label="Location">
                      {COUNTRY_LIST.map((value, key) => (
                        <option key={key} value={value.code}>
                          {value.name}
                        </option>
                      ))}
                    </Select>
                  </div>
                </div>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <button type="button" onClick={onHide} className="btn btn-light btn-elevate">
                Cancel
              </button>
              <> </>
              <button
                type="submit"
                onClick={() => handleSubmit()}
                className="btn btn-primary btn-elevate">
                Save
              </button>
            </Modal.Footer>
          </>
        )}
      </Formik>
    </>
  );
}
