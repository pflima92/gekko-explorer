import React from 'react';
import pure from 'recompose/pure';
import Moment from 'react-moment';

const DataSetDuration = ({ record = {} }) => (
    <Moment duration={record.from}
        date={record.to}
    />
);

const PureDataSetDuration = pure(DataSetDuration);
export default PureDataSetDuration;
