import React from 'react';
import InfiniteList from './lists/InfiniteList';
import InfiniteLists from './lists/InfiniteLists';

function ListUsers(props) {
  return (
    <div>
      {/* <InfiniteList /> */}
      <InfiniteLists />
    </div>
  );
}

export default ListUsers;
