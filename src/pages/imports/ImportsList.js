import { LinearProgress } from '@material-ui/core';
import React, { Fragment } from 'react';
import { Datagrid, DateField, List, TextField } from 'react-admin';
import DataSetDuration from '../../components/DataSetDuration';
import DoneIcon from '@material-ui/icons/Done'

const ImportProgress = ({ record }) => (record.done ? <DoneIcon /> : <LinearProgress />);


const BacktestList = ({ ...props }) => (
    <Fragment>
        <List
            {...props}>
            <Datagrid hover={true}>
                <TextField source="watch.exchange" />
                <TextField source="watch.currency" />
                <TextField source="watch.asset" />
                <DateField source="from" showTime />
                <DateField source="to" showTime />
                <DataSetDuration source="duration" />
                <ImportProgress label="Completed" source="done" />
            </Datagrid>
        </List>
    </Fragment>
);

export default BacktestList;
