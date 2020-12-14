import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useIntl } from 'react-intl';
import { ModifyModel } from '../../../common-library/common-types/common-type';
import { ConvertSelectSearch, generateInitForm } from '../../../common-library/helpers/common-function';
import { DefaultPagination } from '../../../common-library/common-consts/const';
import ModifyEntityDialogForm from '../../../common-library/common-components/modify-entity-dialog-form';

function ModifyEntityDialogAgency<T>({
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
}: {
  modifyModel: any;
  title: string;
  isShow: boolean;
  onHide: () => void;
  entity: T;
  onModify: (values: any) => void;
  code?: string | null;
  get?: (code: string) => any | null;
  formPart?: any;
  allFormField: any;
  allFormButton?: any;
  validation?: any;
  autoFill?: any;
  homePage?: string;
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
      <Modal.Header closeButton className="border-bottom-0">
        <Modal.Title id="example-modal-sizes-title" className="text-primary">
          <span>{intl.formatMessage({ id: title }).toUpperCase()}</span>
        </Modal.Title>
      </Modal.Header>

      <ModifyEntityDialogForm

        modifyModel={modifyModel}
        formPart={formPart}
        validation={validation}
        entity={(autoFill ? ConvertSelectSearch(entity, autoFill.searchSelectField) : ConvertSelectSearch(entity)) || initForm}
        onHide={onHide}
        onModify={onModify}
      />
    </Modal>
  );
}

export default ModifyEntityDialogAgency;
