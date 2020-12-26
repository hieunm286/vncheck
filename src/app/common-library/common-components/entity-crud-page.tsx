import React, {useEffect, useState} from 'react';
import {useIntl} from 'react-intl';
import {GetHomePage,} from '../helpers/common-function';
import {Form, Formik} from 'formik';
import {Link, useHistory} from 'react-router-dom';
import {Card, CardBody, CardHeader} from '../card';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import {ModifyForm} from "../common-types/common-type";
import _ from "lodash";
import {ModifyEntityPage} from "./modify-entity-page";

function EntityCrudPage({
                          entity = {},
                          onModify,
                          moduleName = 'COMMON_COMPONENT.CREATE_UPDATE.MODULE_NAME',
                          code,
                          get,
                          formModel,
                          actions,
                          validation,
                        }: {
  // modifyModel: ModifyModel;
  moduleName?: string;
  entity?: any;
  onModify: (values: any) => void;
  code?: string;
  get?: (code: string) => any;
  formModel: ModifyForm;
  // allFormField: any;
  actions: any;
  validation?: any;
  autoFill?: any;
}) {
  const intl = useIntl();
  const history = useHistory();
  const [entityForEdit, setEntityForEdit] = useState(entity);
  const {_header, ...modifyPanels} = formModel;
 
  useEffect(() => {
    if (code) {
      get && get(code).then((res: { data: any }) => {
        setEntityForEdit(res.data)
      });
    }
  }, [code]);
  
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={entityForEdit}
        validationSchema={validation}
        onSubmit={(values, {setSubmitting}) => {
          onModify(values);
          history.push(GetHomePage(window.location.pathname));
        }}>
        {({handleSubmit, setFieldValue}) => (
          <>
            <Form className="form form-label-right">
              {Object.keys(modifyPanels).map((key, index, keys) => {
                const val = modifyPanels[key];
                if (_.isString(val)) throw new Error('Sử dụng sai cách ' + key + '\n' + JSON.stringify(modifyPanels));
                const {_title, ...panel} = val;
                return (
                  <Card key={key} className={'modify-page'}>
                    <CardHeader className={'border-bottom-0'}
                                title={index == 0 ? (
                                  <a onClick={() => history.goBack()}
                                     className={'cursor-pointer text-primary font-weight-boldest'}>
                                    <ArrowBackIosIcon/>
                                    {intl
                                      .formatMessage({id: _header}, {moduleName: intl.formatMessage({id: moduleName})})
                                      .toUpperCase()}
                                  </a>) : (
                                  <>{intl.formatMessage(
                                    {id: _title},
                                    {moduleName: intl.formatMessage({id: moduleName})})
                                    .toUpperCase()}</>)}
                    />
                    <CardBody>
                      <ModifyEntityPage
                        // className={formPart[key].className}
                        // images={images}
                        inputGroups={panel}
                      />
                      {(
                        <div className="text-right mt-10" key={key}>
                          {Object.keys(actions.data).map(keyss => {
                            switch (actions.data[keyss].role) {
                              case 'submit':
                                console.log(actions.data[keyss])
                                return (
                                  <button
                                    formNoValidate
                                    type={actions.data[keyss].type}
                                    className={actions.data[keyss].className}
                                    key={keyss}
                                    onClick={() => handleSubmit()}>
                                    {actions.data[keyss].icon} {actions.data[keyss].label}
                                  </button>
                                );
                              
                              case 'button':
                                console.log(actions.data[keyss])
                                
                                return (
                                  <button
                                    type={actions.data[keyss].type}
                                    className={actions.data[keyss].className}
                                    key={keyss}>
                                    {actions.data[keyss].icon} {actions.data[keyss].label}
                                  </button>
                                );
                              case 'link-button':
                                return (
                                  <Link to={actions.data[keyss].linkto} key={keyss}>
                                    <button
                                      type={actions.data[keyss].type}
                                      className={actions.data[keyss].className}>
                                      {actions.data[keyss].icon} {actions.data[keyss].label}
                                    </button>
                                  </Link>
                                );
                            }
                          })}
                        </div>
                      )}
                    </CardBody>
                  </Card>
                )
              })}
            </Form>
            {/*
            <button type="submit" onClick={() => handleSubmit()} className="btn btn-primary mr-2">
              <SaveOutlinedIcon style={iconStyle} /> Lưu
            </button>

            <Link to="/purchase-order">
              <button type="button" className="btn btn-outline-primary">
                <CancelOutlinedIcon style={iconStyle} /> Hủy
              </button>
            </Link> */}
          </>
        )}
      </Formik>
    </>
  );
}

export default EntityCrudPage;
