import React, { Component, Fragment } from 'react';
import { compose } from 'recompose';
import * as moment from 'moment';
import * as toml from 'toml';
import { Typography, Divider, Button } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import withStyles from '@material-ui/core/styles/withStyles';

import { DateTimeInput, FormDataConsumer, required, SelectInput, SelectArrayInput, SimpleForm, Title, TextInput, translate } from 'react-admin';

import { CodeEditorField } from '../../components/CodeEditorField';
import { distinct } from '../../components/functions';
import { getConfig } from '../../config';
import { uuidv4 } from '../../components/uuid';
import { Link } from 'ra-ui-materialui';

const styles = {
    inlineField: {
        display: 'inline-block',
        width: '50%',
        whiteSpace: 'nowrap'
    }
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
    parentId: uuidv4(),
    watch: {
        exchange: 'binance',
        currency: 'BNB',
        asset: { _values: ['XRP'] }
    },
    tradingAdvisor: {
        "enabled": true,
        "method": null,
        "candleSize": 60,
        "historySize": 10
    },
    backtest: {
        daterange: {
            from: moment().subtract(1, 'months').toDate(),
            to: new Date()
        }
    },
    duration: 'custom'
};

const durationChoices = [
    {
        name: '30 days', value: {
            daterange: {
                from: moment().subtract(1, 'months').toDate(),
                to: moment().subtract(1, 'days').toDate()
            }
        }
    },
    {
        name: 'one week', value: {
            daterange: {
                from: moment().subtract(7, 'days').toDate(),
                to: moment().subtract(1, 'days').toDate()
            }
        }
    },
    {
        name: 'one day', value: {
            daterange: {
                from: moment().subtract(2, 'days').toDate(),
                to: moment().subtract(1, 'days').toDate()
            }
        }
    },
    {
        name: 'custom', value: 'custom'
    }
];



class BacktestEditor extends Component {

    state = {
        exchanges: [],
        strategies: [],
        result: null
    }

    componentDidMount() {
        fetch(`${getConfig().baseUrl}/api/exchanges`)
            .then(res => res.json())
            .then((json) => this.setState({
                exchanges: json
            }))
            .then(() => fetch(`${getConfig().baseUrl}/api/strategies`))
            .then(res => res.json())
            .then((json) => this.setState({
                strategies: json
            }))
            .catch((e) => {
                alert('Error: fail to load data')
            });
    }

    handleSubmit(data) {

        let params = data.params;

        let paramsAsObject = toml.parse(params);

        let request = {
            parentId: data.parentId,
            watch: { ...data.watch },
            tradingAdvisor: data.tradingAdvisor,
            backtest: 'custom' !== data.duration ? data.duration : data.backtest,
            paperTrader: {
                "feeMaker": 0.25,
                "feeTaker": 0.25,
                "feeUsing": "maker",
                "slippage": 0.05,
                "simulationBalance": {
                    "asset": 0,
                    "currency": 100
                },
                "reportRoundtrips": true,
                "enabled": true
            },
        };

        request[data.tradingAdvisor.method] = paramsAsObject;

        fetch(`${getConfig().baseUrl}/api/backtestBulk`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(request)
        }).then(() => {
            alert(`Backtest Successfully triggered with parentId=${data.parentId}`);
            window.location = `#/backtests?filter={"parentId":"${data.parentId}"}`
        }).catch(err => alert(`Fail while processing your current backtest. ${err.message}`));


        this.setState({
            results: {
                parentId: data.parentId
            }
        });
    }

    render() {
        const { classes } = this.props;
        return (
            <Card>
                <Title title={'Sandbox Backtest'} />
                <CardContent>
                    <Typography gutterBottom variant="title">
                        Sandbox Backtest
                    </Typography>
                    <Typography variant="body1">
                        Gekko supports backtesting strategies over historical data. A Backtest is a simulation where you simulate running a strategy over a long time (such as the last 30 days) in a matter of seconds. Backtesting requires having market data locally available already. After a backtest Gekko will provide statistics about the market and the strategy's performance.
                    </Typography>
                    <SimpleForm defaultValue={defaultValue} save={this.handleSubmit} >
                        <SelectInput source="watch.exchange" choices={this.state.exchanges} optionText="name" optionValue="slug" validate={required()} />
                        <FormDataConsumer>
                            {({ formData, ...rest }) =>
                                <Fragment>
                                    <SelectInput
                                        source="watch.currency"
                                        choices={getCurrencies(this.state.exchanges, formData.watch.exchange)}
                                        optionText="value"
                                        optionValue="value"
                                        className={classes.inlineField}
                                        validate={required()}
                                        {...rest}
                                    />
                                    <SelectArrayInput source="watch.asset._values" choices={getAssets(this.state.exchanges, formData.watch.exchange, formData.watch.currency)}
                                        style={{ marginLeft: 10, width: 300 }}
                                        optionText="value"
                                        optionValue="value" resettable />
                                </Fragment>
                            }
                        </FormDataConsumer>
                        <SelectInput label={'Duration'} source="duration" optionText="name"
                            optionValue="value" choices={durationChoices} />
                        <FormDataConsumer>
                            {({ formData, ...rest }) =>
                                formData.duration === 'custom' &&
                                <Fragment>
                                    <DateTimeInput source="backtest.daterange.from" validate={required()} />
                                    <DateTimeInput source="backtest.daterange.to" style={{ marginLeft: '10px' }} validate={required()} />
                                </Fragment>
                            }
                        </FormDataConsumer>
                        <SelectInput source="tradingAdvisor.method" choices={this.state.strategies} optionText="name" optionValue="name" validate={required()} />
                        <FormDataConsumer>
                            {({ formData, ...rest }) => {
                                if (formData.tradingAdvisor && formData.tradingAdvisor.method) {
                                    formData.params = this.state.strategies.filter(s => s.name === formData.tradingAdvisor.method)[0].params;
                                }
                                return (<CodeEditorField source="params" mode="toml" theme="monokai" />);
                            }}
                        </FormDataConsumer>
                        <TextInput fullWidth helperText={"Identify the group of that multiple backtest."} source="parentId" />
                    </SimpleForm>
                </CardContent>
                <Divider />
                {this.state.result &&
                    <CardContent>
                        <Typography gutterBottom variant="title">
                            Results
                        </Typography>


                        <Button variant="text" to="/backtests" component={Link} >
                            Backtests Results
                        </Button>



                    </CardContent>}
            </Card>
        )
    }
}

export default compose(
    withStyles(styles),
    translate
)(BacktestEditor);
