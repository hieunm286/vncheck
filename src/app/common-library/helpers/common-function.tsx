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
import EXIF from 'exif-js';
import { isEmpty } from 'lodash';
import { diff } from 'deep-object-diff';

export const CapitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const deCapitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toLowerCase() + string.slice(1);
};

export const generateInitForm = (modifyModel: any, initField?: string, initData?: string) => {
  const initValue = {} as any;

  Object.keys(modifyModel).map(key => {
    if (modifyModel[key].type === 'string') {
      initValue[key] = '';
    } else if (modifyModel[key].type === 'number') {
      initValue[key] = 0;
    } else if (modifyModel[key].type === 'SearchSelect') {
      initValue[key] = null;
    } else if (modifyModel[key].type === 'Datetime') {
      initValue[key] = null;
    } else if (modifyModel[key].type === 'image') {
      initValue[key] = []
    } 
    else if (modifyModel[key].type === 'boolean') {
      initValue[key] = true
    } 
    else if (modifyModel[key].type === 'radioGroup') {
      initValue[key] = [];
    } else if (modifyModel[key].type === 'display') {
      initValue[key] = '';
    } else if (modifyModel[key].type === 'stateSelect') {
      initValue[key] = '';
    } else if (modifyModel[key].type === 'citySelect') {
      initValue[key] = '';
    } else if (modifyModel[key].type === 'districtSelect') {
      initValue[key] = '';
    }  else if (modifyModel[key].type === 'option') {
      key === 'gender' ? initValue[key] = '1' : initValue[key] = '0' // male gender
    } 
    // else {
    //   initValue[key] = '';
    else if (modifyModel[key].type === 'object') {
      // initValue[key] = {}
      initValue[key] = generateInitForm(modifyModel[key].data)
      console.log(generateInitForm(modifyModel[key].data))
      // Object.keys(modifyModel[key]).map(childKey => {
      //   if (modifyModel[key][childKey].type === 'string') {
      //     initValue[key][childKey] = ''
      //   } else if (modifyModel[key][childKey].type === 'number') {
      //     initValue[key][childKey] = undefined
      //   }
      // })
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

export const getOnlyBase64 = (arr: any[]) => {
  const base64Array: any[] = [];

  arr.forEach(values => {
    base64Array.push(values.data_url);
  });

  return base64Array;
};

export const getNewImage = (prevArr: any[], currentArr: any[]) => {
  const newArr: any[] = [];

  if (prevArr.length === 0) {
    return currentArr;
  }

  currentArr.forEach((curEl: any) => {
    const index = prevArr.findIndex(prevEl => isEmpty(diff(curEl, prevEl)) === true);

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
      title: value.name,
      value: value._id,
      key: value._id,
      children: value.children && value.children.map((childValue: any, childKey: any) => ({
        title: childValue.name,
        value: childValue._id,
        key: childValue._id,
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

export const getField = (field: any, fieldName: string) => {
  if (fieldName.indexOf('.') === -1) {
    return field[fieldName]
  }

  const arrName = fieldName.split('.')

  console.log(field)
  console.log(fieldName)

  if (!field[arrName[0]]) return;

  let fields: any = field[arrName[0]]

  arrName.forEach((el: string, key: number) => {
    if (key > 0) {
      if (fields[el]) {
        fields = fields[el]
      } 
    }
    
  })

  return fields
}

export const getFieldV2 = (field: any, fieldName: string[]) => {

  if (!field[fieldName[0]]) return;

  let fields: any = field[fieldName[0]]

  fieldName.forEach((el: string, key: number) => {
    if (key > 0) {
      if (fields[el]) {
        fields = fields[el]
      } 
    }
    
  })

  return fields
}
interface FieldProp {
  field: string;
  ref?: { prop: string, key: string }
}

export const ConvertSelectSearch = (entity: any, keyField?: FieldProp[]) => {

  if (!entity) return;

  const convertEntity = {...entity};

  if (keyField && keyField.length > 0) {

    keyField.forEach(({ field, ref }: FieldProp) => {
      if (ref && (!ref.prop || ref.prop === '')) {
        convertEntity[field] = { label: getField(convertEntity[field], ref.key), value: entity._id }
      } else
      if (ref && convertEntity[ref.prop]) {
        convertEntity[field][ref.prop] = { label: getField(convertEntity[ref.prop], ref.key), value: entity._id }
      } else {
      convertEntity[field] = { label: convertEntity[field], value: entity._id }
      }
    })

    return convertEntity;
  }

  return convertEntity;
}

// export const ExportFieldOfSelectSearch = (formPart: any) => {
//   const fieldArr = [];

//   Object.keys(formPart).forEach(key => {
//     formPart[key].modifyModel.forEach(item => {
//       if ()
//     })
//   })

// }

export const ConvertStatusToBoolean = (data: any) => {
  return data.status && typeof data.status === 'string' ? {...data, status: data.status === "1" ? true : false} : data;
}

export const ConvertStatusToString = (data: any) => {
  return typeof data.status === 'boolean' ? {...data, status: data.status ? "1" : "0"} : data;
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
  const [filterProps, setFilterProps] = useState();
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('')

  const dispatch = useDispatch();

  const getAll = useCallback(
    (filterProps?) => {
      setLoading(true);
      getAllServer({ paginationProps, queryProps: filterProps })
        .then(getAllResponse => {
          // countServer(filterProps).then(countResponse => {
          //   setEntities(getAllResponse.data);
          //   setLoading(false);
          //   setTotal(countResponse.data);
          // });
          const data: any = getAllResponse.data
          setEntities(data.data ? data.data : data);
            setLoading(false);
            setTotal(data.paging ? data.paging.total : 5);
        })
        .catch(error => {
          console.log(error);
          setError(error.message)
          setLoading(false);
        });
    },
    [paginationProps],
  );

  const refreshData = () => {
    // setPaginationProps({ ...paginationProps, page: 1 });
    setTrigger(!trigger);
    setShowDelete(false);
    setShowDetail(false);
    setShowEdit(false);
    setShowDeleteMany(false);
    setShowCreate(false);
    setSelectedEntities([]);
    setLoading(false);
    setFilterProps(undefined);
    setError('')
  };
  
  const deleteFn = (entity: T) => {
    setLoading(true);
    deleteServer(entity).then(refreshData).catch(error => {
      setError(error.message || error.response.data || JSON.stringify(error))
      setLoading(false);
    });
  };

  const deleteMany = () => {
    setLoading(true);
    deleteManyServer(selectedEntities)
      .then(refreshData)
      .catch(error => {
        setError(error.message)
        setLoading(false);
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
        setError(error.message)
      });
  };
  const update = (entity: T) => {
    setLoading(true);
    updateServer(entity)
      .then(refreshData)
      .catch(error => {
        setError(error.message || JSON.stringify(error))
        setLoading(false);
      });
  };

  const add = (entity: T) => {
    setLoading(true);
    createServer(entity)
      .then(refreshData)
      .catch(error => {
        setError(error.message || JSON.stringify(error))
        setLoading(false);
      });
  };

  const updatePromise = (entity: T) => {
    return updateServer(entity)
      
  };

  const addPromise = (entity: T) => {
    return createServer(entity)
      
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
    error,
    setError,
    add,
    update,
    addPromise,
    updatePromise,
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
//       sortBy: pre.sortBy + (i == 0 ? '' : ',') + current,
//       sortType: pre.sortType + (i == 0 ? '' : ',') + params.sortList[current]
//     }
//   }, {sortBy: '', sortType: ''});
//   const res = Object.entries({
//     ...params,
//     sortList: undefined, ...orderParams
//   }).map(([key, value]) => `${key}=${value}`).join('&');
//   return res;
// }
