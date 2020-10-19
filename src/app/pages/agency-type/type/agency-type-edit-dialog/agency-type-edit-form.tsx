// Form is based on Formik
// Data validation is based on Yup
// Please, be familiar with article first:
// https://hackernoon.com/react-form-validation-with-formik-and-yup-8b76bda62e10
import React, {useEffect} from 'react';
import {Modal} from 'react-bootstrap';
import {Formik, Form, Field} from 'formik';
import * as Yup from 'yup';
import {Input, Select, DatePickerField} from '../../../../../_metronic/_partials/controls/index';
// import COUNTRY_LIST from '../../../../../../_metronic/country/country';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
// Validation schema
const AgencyTypeEditSchema = Yup.object().shape({
    // email: Yup.string()
    //   .min(3, 'Minimum 3 symbols')
    //   .max(50, 'Maximum 50 symbols')
    //   .email('Vui lòng nhập đúng email')
    //   .required('Email không được để trống'),
    // // dateofbirth: Yup.mixed()
    // //   .nullable(false)
    // //   .required('Date of Birth is required'),
    // first_name: Yup.string()
    //   .required('Vui lòng nhập First name')
    //   .matches(/^([^0-9!@#\\$%\\^\\&*\\)\\(+=._-]*)$/u, {
    //     message: 'Vui lòng nhập tên đúng định dạng',
    //   }),
    // last_name: Yup.string()
    //   .required('Last name không được để trống')
    //   .matches(/^([^0-9!@#\\$%\\^\\&*\\)\\(+=._-]*)$/u, {
    //     message: 'Vui lòng nhập tên đúng định dạng',
    //   }),
    // username: Yup.string().required('AgencyTypename không được để trống'),
    // // password: Yup.string().required('Password không được để trống'),
    // is_locked: Yup.string().required('Status không được để trống'),
});

const NewAgencyTypeSchema = Yup.object().shape({
    email: Yup.string()
        .min(3, 'Minimum 3 symbols')
        .max(50, 'Maximum 50 symbols')
        .email('Vui lòng nhập đúng email')
        .required('Email không được để trống'),
    // dateofbirth: Yup.mixed()
    //   .nullable(false)
    //   .required('Date of Birth is required'),
    first_name: Yup.string()
        .required('Vui lòng nhập First name')
        .matches(/^([^0-9!@#\\$%^&*)(+=._-]*)$/u, {
            message: 'Vui lòng nhập tên đúng định dạng',
        })
        .trim('Tên không thể bắt đầu bằng dấu cách'),
    last_name: Yup.string()
        .required('Last name không được để trống')
        .matches(/^([^0-9!@#\\$%^&*)(+=._-]*)$/u, {
            message: 'Vui lòng nhập tên đúng định dạng',
        }),
    username: Yup.string().required('AgencyTypename không được để trống'),
    password: Yup.string().required('Password không được để trống'),
});

export function AgencyTypeEditForm({saveAgencyType, agencyType, actionsLoading, onHide}: any) {
    const [state, setState] = React.useState({
        type_status: agencyType.type_status == 0,
    });

    useEffect(() => {
        setState({type_status: agencyType.type_status == 0});
    }, [agencyType.type_status]);

    const handleChange = (event: any) => {
        console.log(state.type_status);
        setState({...state, [event.target.name]: event.target.checked});
    };
    return (
        <>
            <Formik
                enableReinitialize={true}
                initialValues={agencyType}
                validationSchema={AgencyTypeEditSchema}
                onSubmit={values => {
                    // const newValues = {
                    //   ...values,
                    //   dateofbirth: new Date(values.dateofbirth).toISOString(),
                    // };
                    const updateValue = {
                        ...values,
                        type_status: state.type_status ? '0' : '1',
                    };
                    saveAgencyType(updateValue);
                }}>
                {({handleSubmit}) => (
                    <>
                        <Modal.Body className="overlay overlay-block cursor-default">
                            {actionsLoading && (
                                <div className="overlay-layer bg-transparent">
                                    <div className="spinner spinner-lg spinner-success"/>
                                </div>
                            )}
                            <Form className="form form-label-right">
                                <Field
                                    name="type_name"
                                    component={Input}
                                    placeholder="Nhập tên loại đại lý"
                                    withValidation
                                    isHorizontal
                                    label="Tên loại:"
                                />
                                <Field
                                    name="agency_type_id"
                                    component={Input}
                                    placeholder="Nhập mã loại đại lý"
                                    withValidation
                                    isHorizontal
                                    disabled={agencyType.agency_type_id !== ''}
                                    label="Mã loại:"
                                />
                                <div>
                                    <label>Trạng thái hoạt động:</label>
                                    <Switch
                                        checked={state.type_status}
                                        onChange={handleChange}
                                        color="primary"
                                        name="type_status"
                                        inputProps={{'aria-label': 'primary checkbox'}}
                                    />
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
                                className="btn btn-danger btn-elevate">
                                Save
                            </button>
                        </Modal.Footer>
                    </>
                )}
            </Formik>
        </>
    );
}
