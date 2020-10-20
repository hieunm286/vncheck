import React from 'react';

interface ItemProps {
  item: any;
  key: number;
}

const InfiniteItem: React.FC<ItemProps> = ({item}: ItemProps) => {
  return (
    <div className="infinite-item">
      <div className="d-flex item">
        <img
          src="https://media.suckhoedoisong.vn/thumb_600x400/Images/bichvan/2019/07/03/6-loi-ich-suc-khoe-khi-an-xoai1562121727.jpg"
          alt=""
          width="75"
          height="75"
        />
        <div className="ml-3">
          <h4>{item.username}</h4>
          <span className="text-muted">Quả xoài. Tên thật là xoài, là loài trái cây màu vàng</span>
          <br/>
          <strong>Như trên nhưng vẫn là quả xoài với màu chữ đậm</strong>
        </div>
      </div>
      <hr/>
    </div>
  );
};

export default InfiniteItem;
