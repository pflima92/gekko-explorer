import React from 'react';
import {
    Responsive,
    SimpleList,
    List,
    Datagrid,
    NumberField,
    TextField,
} from 'react-admin';

export const PositionList = props => (
    <List {...props}>
        <Responsive
            small={
                <SimpleList
                    primaryText={record => record.currency}
                    secondaryText={record => record.date}
                    tertiaryText={record => record.cost}
                />
            }
            medium={
                <Datagrid>
                    <TextField source="currency" />
                    <TextField source="pair" />
                    <TextField source="date" />
                    <NumberField source="amount" />
                    <NumberField source="cost" />
                    <NumberField source="result" />
                    <TextField source="age" />
                </Datagrid>
            }
        />
    </List>
);