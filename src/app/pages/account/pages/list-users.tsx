import React from 'react';
import InfiniteList from './lists/infinite-list';
import InfiniteLists from './lists/infinite-lists';

function ListUsers(props) {
  return (
    <div>
      {/* <InfiniteList /> */}
      <InfiniteLists />
    </div>
  );
}

export default ListUsers;
