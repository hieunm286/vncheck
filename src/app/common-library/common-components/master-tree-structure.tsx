import React from 'react';
import { Table } from 'react-bootstrap';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import { TreeData } from '../../pages/multilevel-sale/multilevel-sale.model';

const showArray_v2 = (fileds: any, data: any): any => {
  const AllField: any = fileds;

  data.forEach((el: any, key: number) => {
    if (el.child && el.child.length > 0) {
      AllField[el._id] = false;

      showArray_v2(AllField, el.child);
    }
  });

  return AllField;
};

interface TreeDataProp {
  data: TreeData[];
}

const MasterTreeStructure: React.FC<TreeDataProp> = ({ data }) => {
  const [showChildrenV2, setShowChildrenV2] = React.useState<any>({ ...showArray_v2({}, data) });

  const onEdit = (data: TreeData): void => {
    console.log(data);
  };

  const onShowChildren = (key: string): void => {
    const clone = { ...showChildrenV2 };

    clone[key] = !clone[key];
    setShowChildrenV2(clone);
  };

  const renderChild = (data: TreeData[], size: number, skipDistance: number) => {
    return (
      <>
        {data.map((childItem: TreeData, keyItem: number) => (
          <React.Fragment key={'children' + keyItem}>
            <tr>
              <td>
                <div style={{ marginLeft: `${size}rem` }}>
                  {childItem.child && childItem.child.length > 0 ? (
                    <button
                      onClick={() => onShowChildren(childItem._id)}
                      style={{ backgroundColor: 'white', border: 'none' }}>
                      {'>'}
                    </button>
                  ) : (
                    <button
                      onClick={() => onShowChildren(childItem._id)}
                      style={{ backgroundColor: 'white', border: 'none' }}>
                      {'\u00A0'}
                    </button>
                  )}
                  <span onClick={() => onShowChildren(childItem._id)}>{childItem.title}</span>
                </div>
              </td>
              <td>
                <button
                  style={{ backgroundColor: 'white', border: 'none' }}
                  onClick={() => onEdit(childItem)}
                  className="text-primary">
                  <AddIcon />
                </button>
                <button
                  style={{ backgroundColor: 'white', border: 'none' }}
                  className="text-primary">
                  <EditIcon />
                </button>
              </td>
            </tr>
            {showChildrenV2[childItem._id] &&
              childItem.child &&
              childItem.child.length > 0 &&
              renderChild(childItem.child, size + skipDistance, skipDistance)}
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
              //       <span onClick={() => onShowChildren(value._id)}>{value.title}</span>
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
              showChildrenV2[value._id] && renderChild(value.child, 3.75, 3.75)
            )})} */}
        </tbody>
      </Table>

      {/* })} */}
    </>
  );
};

export default MasterTreeStructure;
