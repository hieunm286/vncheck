import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { TreeData } from '../../pages/multilevel-sale/multilevel-sale.model';
import { ChildFriendly } from '@material-ui/icons';
import { ConvertStatusToBoolean } from '../helpers/common-function';


interface TreeDataProp {
  data: TreeData[];
  onCreate?: (entity: any) => void;
    onEdit?: (entity: any) => void;
    onDelete?: (entity: any) => void; 
    onFetchAgency?: (entity: any) => void;
    showChildren: any;
}

const MasterTreeStructure: React.FC<TreeDataProp> = ({ data, onCreate, onEdit, onDelete, onFetchAgency, showChildren }) => {
  const [showChildrenV2, setShowChildrenV2] = useState(showChildren);
  const [currentChild, setCurrentChild] = useState<string | undefined>()

  // useEffect(() => {
  //   setShowChildrenV2(showChildren)
  // }, [showChildren])

  const handleAdd = (data: TreeData): void => {
    if (onCreate) {
      onCreate(data)
    }
  }
  const handleEdit = (data: TreeData): void => {
    if (onEdit) {
      onEdit(data)
    }
  };

  const onShowChildren = (key: string): void => {
    const clone = { ...showChildrenV2 };

    clone[key] = !clone[key];
    setShowChildrenV2(clone);
  };

  const handleClick = (data: TreeData): void => {
    console.log(data);
    setCurrentChild(data._id)
    if (onFetchAgency) {
      onFetchAgency(data)
    }
  }

  const handleDelete = (data: TreeData): void => {
    console.log(data);
    if (onDelete) {
      onDelete(data)
    }
  }



  const renderChild = (data: TreeData[], size: number, skipDistance: number) => {
    return (
      <>
        {data.map((childrenItem: TreeData, keyItem: number) => (
          <React.Fragment key={'childrenren' + keyItem}>
            <tr>
              <td onClick={() => handleClick(childrenItem)} className={currentChild === childrenItem._id ? 'text-primary font-weight-bold' : ''} >
                <div style={{ marginLeft: `${size}rem` }}>
                  {/* {childrenItem.children && childrenItem.children.length > 0 ? (
                    <button
                      onClick={() => onShowChildren(childrenItem._id)}
                      style={{ backgroundColor: 'white', border: 'none' }}>
                      {'>'}
                    </button>
                  ) : (
                    <button
                      onClick={() => onShowChildren(childrenItem._id)}
                      style={{ backgroundColor: 'white', border: 'none' }}>
                      {'\u00A0'}
                    </button>
                  )} */}
                  <span onClick={() => onShowChildren(childrenItem._id)} style={{ cursor: 'pointer' }}>{childrenItem.name}</span>
                </div>
              </td>
              <td>
                <button
                  style={{ backgroundColor: 'white', border: 'none' }}
                  onClick={() => handleAdd(childrenItem)}
                  className="text-primary">
                  <AddIcon />
                </button>
                <button
                  style={{ backgroundColor: 'white', border: 'none' }}
                  onClick={() => handleEdit(childrenItem)}
                  className="text-primary">
                  <EditIcon />
                </button>
                <button
                  style={{ backgroundColor: 'white', border: 'none' }}
                  onClick={() => handleDelete(childrenItem)}
                  className="text-primary">
                  <DeleteIcon />
                </button>
              </td>
            </tr>
            {
              childrenItem.children &&
              childrenItem.children.length > 0 &&
              renderChild(childrenItem.children, size + skipDistance, skipDistance)}
          </React.Fragment>
        ))}
      </>
    );
  };

  return (
    <>
      {/* {data.map((value: TreeData, key: number) => { */}
      <Table borderless>
        <tbody>
          {renderChild(data, 0, 3.75)}

          {/* {data.map((value: TreeData, key: number) => {
              return (

              // <tr>
              //   <td className="w-50">
              //     <div className="mb-5">
              //       <button
              //         onClick={() => onShowChildren(value._id)}
              //         style={{ backgroundColor: 'white', border: 'none' }}>
              //         {'>'}
              //       </button>
              //       <span onClick={() => onShowChildren(value._id)}>{value.name}</span>
              //     </div>
              //   </td>
              //   <td>
              //     <button
              //       style={{ backgroundColor: 'white', border: 'none' }}
              //       className="text-primary"
              //       onClick={() => onEdit(value)}>
              //       <AddIcon />
              //     </button>
              //     <button
              //       style={{ backgroundColor: 'white', border: 'none' }}
              //       className="text-primary"
              //       onClick={() => onEdit(value)}>
              //       <EditIcon />
              //     </button>
              //   </td>
              // </tr>
              showChildrenV2[value._id] && renderChild(value.children, 3.75, 3.75)
            )})} */}
        </tbody>
      </Table>

      {/* })} */}
    </>
  );
};

export default MasterTreeStructure;
