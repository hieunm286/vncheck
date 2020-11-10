import React from 'react';
import { Table } from 'react-bootstrap';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';

const data: any = {
  dlc: {
    _id: 'dlc1',
    title: 'Đại lý cấp 1',
    child: [
      {
        _id: 'xxx-xxx',
        title: 'Đại lý cấp 2',
        parentId: 'dlc1',
      },
    ],
  },
  sieuthi: {
    _id: 'sieuthi',
    title: 'Siêu thị',
    child: [],
  },
  bigC: {
    _id: 'bigC',
    title: 'Big C',
    child: [
      {
        _id: 'xxx-xxx4',
        title: 'Đại lý cấp 4',
        parentId: 'bigC',
      },
      {
        _id: 'xxx-xxx5',
        title: 'Đại lý cấp 5',
        parentId: 'bigC',
      },
    ],
  },
};

const data2: any = [
  {
    _id: 'dlc1',
    title: 'Đại lý cấp 1',
    child: [
      {
        _id: 'xxx-xxx',
        title: 'Đại lý cấp 2',
        parentId: 'dlc1',
      },
    ],
  },
  {
    _id: 'sieuthi',
    title: 'Siêu thị',
    child: [],
  },
  {
    _id: 'bigC',
    title: 'Big C',
    child: [
      {
        _id: 'xxx-xxx4',
        title: 'Đại lý cấp 4',
        parentId: 'bigC',
      },
      {
        _id: 'xxx-xxx5',
        title: 'Đại lý cấp 5',
        parentId: 'bigC',
      },
    ],
  },
];

const showArray = (data: any): any => {
  const showArr: any = {};
  Object.keys(data).forEach(key => {
    showArr[key] = false;
  });

  return showArray;
};

const showArray_v2 = (data: any): any => {
  const boolArray: any[] = new Array(data.length);
  // Make all array's element is 0
  boolArray.fill(false);
  return boolArray;
};

const ConvertToTreeNode = () => {
  const treeData :any[] = [];
  data2.forEach((value: any, key: any) => {
    const treeNode = {
      title: value.title,
      value: Math.trunc(key / 10) + '-' + key,
      key: Math.trunc(key / 10) + '-' + key,
      children: value.child.map((childValue: any, childKey: any)=> ({
        title: childValue.title,
        value: Math.trunc(key / 10) + '-' + Math.trunc(childKey / 10) + '-' + childKey,
        key: Math.trunc(key / 10) + '-' + Math.trunc(childKey / 10) + '-' + childKey,
      }))
    }

    treeData.push(treeNode)
  })

  return treeData;
}

function MasterTreeStructure() {
  const [showChildren, setShowChildren] = React.useState<any>({
    ...showArray(data),
  });

  const [showChildrenV2, setShowChildrenV2] = React.useState<any>([...showArray_v2(data2)]);

  const onEdit = (data: any) => {
    console.log(data);
  };

  return (
    <>
      {data2.map((value: any, key: any) => {
        return (
          <div key={'parent ' + key} className="row">
            <div className="col-6">
              <Table borderless>
                <tbody>
                  <tr>
                    <td className="w-50">
                      <div className="mb-5">
                        <button
                          onClick={() => {
                            const clone = [...showChildrenV2];
                            
                            clone[key] = !clone[key];
                            setShowChildrenV2(clone);
                          }}
                          style={{ backgroundColor: 'white', border: 'none' }}>
                          {'>'}
                        </button>
                        {value.title}
                      </div>
                    </td>
                    <td>
                      <button
                        style={{ backgroundColor: 'white', border: 'none' }}
                        className="text-primary"
                        onClick={() => onEdit(value)}>
                        <AddIcon />
                      </button>
                      <button
                        style={{ backgroundColor: 'white', border: 'none' }}
                        className="text-primary"
                        onClick={() => onEdit(value)}>
                        <EditIcon />
                      </button>
                    </td>
                  </tr>
                  {showChildrenV2[key] &&
                    value.child.map((childItem: { title: React.ReactNode }, keyItem: any) => (
                      <tr key={'children' + keyItem}>
                        <td className="w-120px">
                          <p className="ml-15">{childItem.title}</p>
                        </td>
                        <td>
                          <button
                            style={{ backgroundColor: 'white', border: 'none' }}
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
                    ))}
                </tbody>
              </Table>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default MasterTreeStructure;
