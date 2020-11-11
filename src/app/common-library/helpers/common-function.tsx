import { isArray } from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { DefaultPagination } from '../common-consts/const';
import {
  CountProps,
  CreateProps,
  DeleteManyProps,
  DeleteProps,
  GetAllProps,
  GetProps,
  ModifyModel,
  UpdateProps,
} from '../common-types/common-type';

export const CapitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const generateInitForm = (modifyModel: any, initField?: string, initData?: string) => {
  const initValue = {} as any;

  Object.keys(modifyModel).map(key => {
    if (modifyModel[key].type === 'string') {
      initValue[key] = '';
    } else if (modifyModel[key].type === 'number') {
      initValue[key] = undefined;
    } else if (modifyModel[key].type === 'SearchSelect') {
      initValue[key] = null;
    } else if (modifyModel[key].type === 'Datetime') {
      initValue[key] = null;
    } else if (modifyModel[key].type === 'image') {
      initValue[key] = []
    } 
    else if (modifyModel[key].type === 'object') {
      initValue[key] = {}
      Object.keys(modifyModel[key]).map(childKey => {
        if (modifyModel[key][childKey].type === 'string') {
          initValue[key][childKey] = ''
        } else if (modifyModel[key][childKey].type === 'number') {
          initValue[key][childKey] = undefined
        }
      })
    }
  });

  if (initField && initData) {
    initValue[initField] = initData;
  }
  
  return initValue;
};

export const getOnlyFile = (arr: any[]) => {
  const fileArray: any[] = [];

  arr.forEach(values => {
    fileArray.push(values.file);
  });

  return fileArray;
};

export const getNewImage = (prevArr: any[], currentArr: any[]) => {
  const newArr: any[] = [];

  if (prevArr.length === 0) {
    return currentArr;
  }

  currentArr.forEach(curEl => {
    const index = prevArr.findIndex(prevEl => curEl === prevEl);

    if (index === -1) {
      newArr.push(curEl);
    }
  });

  return newArr;
};

export const ConvertToTreeNode = (data: any) => {
  const treeData: any[] = [];
  data.forEach((value: any, key: any) => {
    const treeNode = {
      title: value.title,
      value: value.code || value._id,
      key: value.code || value._id,
      children: value.child.map((childValue: any, childKey: any) => ({
        title: childValue.title,
        value: childValue.code || childValue._id,
        key: childValue.code || childValue._id,
      })),
    };

    treeData.push(treeNode);
  });

  return treeData;
};

export const GenerateAllFormField = (...params: any) => {

  let fieldForm: any = {};

  params.forEach((value: any) => {
    if (isArray(value)) {
      // fieldForm = {...fieldForm, ...Object.assign({}, ...value)}
      value.forEach((item: any) => {
        fieldForm = {...fieldForm, ...item.data}
      })
    }
  })

  return fieldForm;
}

export const GetHomePage = (url: string) => {
  const index = url.lastIndexOf('/')

  if (index === -1) return window.location.pathname;

  const homeURL: string = url.slice(0, index)

  return homeURL;
}

export function InitMasterProps<T>({
  getAllServer,
  countServer,
  getServer,
  createServer,
  updateServer,
  deleteServer,
  deleteManyServer,
}: {
  getAllServer: GetAllProps<T>;
  getServer: GetProps<T>;
  countServer: CountProps<T>;
  createServer: CreateProps<T>;
  updateServer: UpdateProps<T>;
  deleteServer: DeleteProps<T>;
  deleteManyServer: DeleteManyProps<T>;
}) {
  const [entities, setEntities] = useState<T[]>([]);
  const [deleteEntity, setDeleteEntity] = useState<T>(null as any);
  const [editEntity, setEditEntity] = useState<T | null>(null as any);
  const [createEntity, setCreateEntity] = useState<T | null>(null as any);
  const [selectedEntities, setSelectedEntities] = useState<T[]>([]);
  const [detailEntity, setDetailEntity] = useState<T>(null as any);
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [showDeleteMany, setShowDeleteMany] = useState(false);
  const [trigger, setTrigger] = useState(false);
  const [paginationProps, setPaginationProps] = useState(DefaultPagination);
  const [filterProps, setFilterProps] = useState({ name: '', code: '' });
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  const getAll = useCallback(
    (filterProps?) => {
      setLoading(true);
      getAllServer({ paginationProps, queryProps: filterProps })
        .then(getAllResponse => {
          countServer(filterProps).then(countResponse => {
            setEntities(getAllResponse.data);
            setLoading(false);
            setTotal(countResponse.data);
          });
        })
        .catch(error => {
          console.log(error);
        });
    },
    [paginationProps],
  );

  const refreshData = () => {
    setPaginationProps({ ...paginationProps, page: 1 });
    setTrigger(!trigger);
    setShowDelete(false);
    setShowDetail(false);
    setShowEdit(false);
    setShowDeleteMany(false);
    setShowCreate(false);
    setSelectedEntities([]);
    setLoading(false);
  };
  const deleteFn = (entity: T) => {
    deleteServer(entity).then(refreshData);
  };

  const deleteMany = () => {
    setLoading(true);
    deleteManyServer(selectedEntities)
      .then(refreshData)
      .catch(error => {
        console.log(error);
      });
  };

  const get = (entity: T, ModelSlice?: any) => {
    getServer(entity)
      .then(res => {
        setDetailEntity(res.data);
        setEditEntity(res.data);

        if (ModelSlice) {
          const { actions } = ModelSlice;
          const editEntity = res.data;

          dispatch(actions.entityFetched({ editEntity }));
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
  const update = (entity: T) => {
    updateServer(entity)
      .then(refreshData)
      .catch(error => {
        console.log(error);
      });
  };

  const add = (entity: T) => {
    createServer(entity)
      .then(refreshData)
      .catch(error => {
        console.log(error);
      });
  };
  return {
    entities,
    setEntities,
    deleteEntity,
    setDeleteEntity,
    editEntity,
    setEditEntity,
    createEntity,
    setCreateEntity,
    selectedEntities,
    setSelectedEntities,
    detailEntity,
    setDetailEntity,
    showDelete,
    setShowDelete,
    showEdit,
    setShowEdit,
    showCreate,
    setShowCreate,
    showDetail,
    setShowDetail,
    showDeleteMany,
    setShowDeleteMany,
    trigger,
    setTrigger,
    paginationProps,
    setPaginationProps,
    filterProps,
    setFilterProps,
    total,
    setTotal,
    loading,
    setLoading,
    add,
    update,
    get,
    deleteMany,
    deleteFn,
    getAll,
    refreshData,
  };
}

// export const ParamsSerializer = (params: { sortList: SortProps, [t: string]: any }): string => {
//   console.log(111);
//   const orderParams = Object.keys(params.sortList).reduce((pre, current, i) => {
//     return {
//       orderBy: pre.orderBy + (i == 0 ? '' : ',') + current,
//       orderType: pre.orderType + (i == 0 ? '' : ',') + params.sortList[current]
//     }
//   }, {orderBy: '', orderType: ''});
//   const res = Object.entries({
//     ...params,
//     sortList: undefined, ...orderParams
//   }).map(([key, value]) => `${key}=${value}`).join('&');
//   return res;
// }
