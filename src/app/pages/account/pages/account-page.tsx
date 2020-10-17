import React from 'react';
import {Redirect, Switch} from 'react-router-dom';
import ListUsers from './list-users';
import TagsInput from './tags-input';
import User from './user';
import {ContentRoute} from "../../../layout/components/content/content-route";

function AccountPage(props: any) {
    return (
        <Switch>
            <Redirect exact={true} from="/account" to="account/user"/>
            <ContentRoute path="/account/user" component={User}/>
            <ContentRoute path="/account/list-user" component={ListUsers}/>
            <ContentRoute path="/account/tags-user" component={TagsInput}/>
        </Switch>
    );
}

export default AccountPage;
