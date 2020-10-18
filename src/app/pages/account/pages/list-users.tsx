import React from 'react';
import InfiniteLists from './lists/infinite-lists';

function ListUsers(props: any) {
    return (
        <div>
            {/* <InfiniteList /> */}
            <InfiniteLists/>
        </div>
    );
}

export default ListUsers;
