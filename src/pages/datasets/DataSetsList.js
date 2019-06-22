import React, { Fragment } from 'react';
import { Button, List as MuiList, ListItem, ListItemText, Typography } from '@material-ui/core';
import { Datagrid, List, TextField } from 'react-admin';
import Moment from 'react-moment';

const format = 'DD-MM-YYYY HH:mm:ss';

const handleUpdate = () => {
};

const DataSetsBulkActionButtons = props => (
    <Fragment>
        {/* Add the default bulk delete action */}
        <Button color="default" onClick={handleUpdate}  {...props}>Update</Button>
    </Fragment>
);

const RangesList = ({ record }) => (
    <MuiList component="nav"
        aria-labelledby="nested-list-subheader">
        {record.ranges.map(row => (
            <ListItem>
                <ListItemText
                    primary={
                        <Typography variant="body1" >From: <Moment unix format={format} date={row.from} /> - To: <Moment unix format={format} date={row.to} /></Typography>}
                />
            </ListItem>
        ))}
    </MuiList>
);

const DataSetsList = ({ ...props }) => (
    <List
        bulkActionButtons={<DataSetsBulkActionButtons />}
        {...props}>
        <Datagrid expand={<RangesList />} hover={true}>
            <TextField source="exchange" />
            <TextField source="currency" />
            <TextField source="asset" />
        </Datagrid>
    </List>
);

export default DataSetsList;
