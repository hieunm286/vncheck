import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import ModifyEntityDialogForm from './modify-entity-dialog-form';
import { useIntl } from 'react-intl';
import { OldModifyModel } from '../../../common-library/common-types/common-type';
import { generateInitForm } from '../../../common-library/helpers/common-function';
import { DefaultPagination } from '../../../common-library/common-consts/const';
import { AxiosResponse } from 'axios';

function ModifyEntityDialog<T>({
  isShow,
  onHide,
  entity,
  onModify,
  title,
  modifyModel,
  code,
  get,
  formPart,
  allFormField,
  allFormButton,
  validation,
  autoFill,
  homePage,
  refreshData,
}: {
  modifyModel?: any;
  title: string;
  isShow: boolean;
  onHide: () => void;
  entity: T;
  onModify: (values: any) => Promise<AxiosResponse<T>>;
  code?: string | null;
  get?: (code: string) => any | null;
  formPart?: any;
  allFormField?: any;
  allFormButton?: any;
  validation?: any;
  autoFill?: any;
  homePage?: string;
  refreshData: () => void;
}) {
  const intl = useIntl();
  const initForm = autoFill
    ? generateInitForm(allFormField, autoFill.field, autoFill.data)
    : generateInitForm(allFormField);
  const [search, onChange] = useState<any>(initForm);

  const loadOptions = async (
    search: string,
    prevOptions: any,
    { page }: any,
    service: any,
    keyField: string,
    key: string,
  ) => {
    const queryProps: any = {};
    queryProps[keyField] = search;

    const paginationProps = {
      ...DefaultPagination,
      page: page,
    };

    const entities = await service.GetAll({ queryProps, paginationProps });
    const count = await service.Count({ queryProps });

    const hasMore = prevOptions.length < count.data - (DefaultPagination.limit ?? 0);

    // setSearchTerm({ ...searchTerm, [key]: search });

    const data = [...new Set(entities.data)];

    return {
      options: data.map((e: any) => {
        return { label: e[keyField], value: e._id };
      }),
      hasMore: hasMore,
      additional: {
        page: page + 1,
      },
    };
  };

  return (
    <Modal show={isShow} onHide={onHide} aria-labelledby="example-modal-sizes-title-lg">
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title" className="text-primary">
          <span>{intl.formatMessage({ id: title })}</span>
        </Modal.Title>
      </Modal.Header>
      
      <ModifyEntityDialogForm
        modifyModel={modifyModel}
        formPart={formPart}
        validation={validation}
        entity={entity}
        onHide={onHide}
        onModify={onModify}
        refreshData={refreshData}
      />
    </Modal>
  );
}

export default ModifyEntityDialog;
