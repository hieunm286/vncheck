import React from 'react';
import MultiLevelSaleBody from './multi-sale-body';
import { TreeData } from './multilevel-sale.model';

const data: TreeData[] = [
  {
    _id: 'dlc1',
    name: 'Nhà phân phối',
    code: '1213',
    level: 1,
    status: '1',
    children: [
      {
        _id: 'xxx-xxx',
        name: 'Tổng đại lý',
        code: '123rf13',
        level: 2,
        status: '1',
        children: [
          {
            _id: 'cccccc',
            name: 'Đại lý',
            code: '1savas213',
            level: 3,
            status: '1',
            children: [
              {
                _id: 'cccxzca',
                name: 'Cửa hàng bán lẻ',
                code: 'sàvasf1213',
                level: 4,
                status: '1',
               
              },
            ],
          },
        ],
        parent: 'dlc1',
      },
      {
        _id: 'xxx-xczxxx',
        name: 'Tổng đại lý 2',
        code: '12đá13',
        level: 2,
        status: '1',
        parent: 'dlc1',
      },
    ],
  },
  {
    _id: 'sieuthi',
    name: 'Siêu thị',
    code: '12ábsdb13',
    level: 1,
    status: '1',
  },
  {
    _id: 'bigC',
    name: 'Big C',
    code: '1213',
    level: 1,
    status: '1',
    children: [
      {
        _id: 'xxx-xxx4',
        name: 'Đại lý cấp 4',
        parent: 'bigC',
        code: '12ávasv13',
        level: 2,
        status: '1',
      },
      {
        _id: 'xxx-xxx5',
        name: 'Đại lý cấp 5',
        parent: 'bigC',
        code: '12173783',
        level: 2,
        status: '1',
      },
    ],
  },
];

function MultilevelSale() {
  const TreeBody = [
    {
      name: 'Cấp',
      type: 'Tree',
      data: data,
    },
    {
      name: 'Test',
      type: 'Table',
      data: data,
    },
  ];

  return (
    <React.Fragment>
      <MultiLevelSaleBody title="Cấp bán hàng" data={data} body={TreeBody} />
    </React.Fragment>
  );
}

export default MultilevelSale;
