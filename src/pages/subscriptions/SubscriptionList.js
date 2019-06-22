
import React from 'react';
import { Datagrid, List, TextField } from 'react-admin';

const SubscriptionList = ({ ...props }) => (
    <List
        {...props}>
        <Datagrid hover={true}>
            <TextField source="exchange" />
            <TextField source="currency" />
            <TextField source="asset" />
        </Datagrid>
    </List>
);

export default SubscriptionList;
