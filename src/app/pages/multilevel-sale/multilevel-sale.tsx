import React from 'react';
import MultiLevelSaleBody from './multi-sale-body';
import { TreeData } from './multilevel-sale.model';

const data: TreeData[] = [
  {
    _id: 'dlc1',
    title: 'Nhà phân phối',
    child: [
      {
        _id: 'xxx-xxx',
				title: 'Tổng đại lý',
				child: [
					{
						_id: 'cccccc',
						title: 'Đại lý',
						child: [
							{
								_id: 'cccxzca',
								title: "Cửa hàng bán lẻ",
								child: []
							}
						]
					}
				],
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
				child: []
      },
      {
        _id: 'xxx-xxx5',
        title: 'Đại lý cấp 5',
				parentId: 'bigC',
				child: []
      },
    ],
  },
];

function MultilevelSale() {

	const TreeBody = [
		{
			type: 'Tree',
			data: data
		},
		{
			type: 'Table',
			data: data
		}
	]

  return (
    <React.Fragment>
			<MultiLevelSaleBody 
				title="Cấp bán hàng" 
				data={data}
				/>
    </React.Fragment>
  );
}

export default MultilevelSale;
