import React, { Component, Fragment } from 'react';
import { compose } from 'recompose';
import withStyles from '@material-ui/core/styles/withStyles';
import * as moment from 'moment';
import { Create, BooleanInput, CheckboxGroupInput, DateTimeInput, FormDataConsumer, required, SelectInput, SimpleForm, translate } from 'react-admin';

import { getConfig } from "../../config";
import { distinct } from '../../components/functions';

const styles = {
    currency_select: { marginLeft: 32 },
};

const mapToObject = (a) => ({ value: a });

const getCurrencies = (exchanges, currency = null) => {
    if (exchanges.length <= 0) return [];
    const el = exchanges.find(e => currency === e.slug);
    return el && (el.markets.map(m => m.pair[0]).filter(distinct).map(mapToObject) || []);
}

const getAssets = (exchanges, exchange = null, currency = null) => {
    if (exchanges.length <= 0 || exchange === null || currency === null) return [];
    const el = exchanges.find(e => exchange === e.slug);
    return el && (el.markets.filter(m => m.pair[0] === currency).map(m => m.pair[1]).filter(distinct).map(mapToObject) || []);
}

const defaultValue = {
    watch: {
        exchange: null,
        assets: [],
        currency: null
    },
    importer: {
        daterange: {
            from: moment().subtract(1, 'months').toDate(),
            to: new Date()
        }
    },
    candleWriter: {
        enabled: true
    }
};

class DataSetImport extends Component {

    state = {
        exchanges: [],
    }

    static propTypes = {
    }

    componentWillMount() {
        fetch(`${getConfig().baseUrl}/api/exchanges`)
            .then(res => res.json())
            .then((json) => this.setState({
                exchanges: json
            }))
            .catch((e) => {
                alert('Error: fail to load data')
            });
    }

    render() {
        return (
            <Create {...this.props}>
                <SimpleForm defaultValue={defaultValue} redirect="list">
                    <SelectInput source="watch.exchange" choices={this.state.exchanges} optionText="name" optionValue="slug" validate={required()} />
                    <FormDataConsumer>
                        {({ formData, ...rest }) =>
                            <Fragment>
                                <SelectInput
                                    source="watch.currency"
                                    choices={getCurrencies(this.state.exchanges, formData.watch.exchange)}
                                    optionText="value"
                                    optionValue="value"
                                    validate={required()}
                                    {...rest}
                                />
                                <CheckboxGroupInput source="watch.assets" choices={getAssets(this.state.exchanges, formData.watch.exchange, formData.watch.currency)}
                                    optionText="value"
                                    optionValue="value" />
                            </Fragment>
                        }
                    </FormDataConsumer>
                    <DateTimeInput source="importer.daterange.from" validate={required()} />
                    <DateTimeInput source="importer.daterange.to" validate={required()} />
                    <BooleanInput source="candleWriter.enabled" />
                </SimpleForm>
            </Create>
        )
    }
}

export default compose(
    withStyles(styles),
    translate
)(DataSetImport);
