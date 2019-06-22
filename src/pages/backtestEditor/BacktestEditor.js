import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { compose } from 'recompose';
import { Typography } from '@material-ui/core';

import { SimpleForm, Title, translate, TextInput } from 'react-admin';
import { getConfig } from '../../config';
import { CodeEditorField } from '../../components/CodeEditorField';

const styles = {};

class BacktestEditor extends Component {

    state = {
        exchanges: [],
    }

    componentDidMount() {
        fetch(`${getConfig().baseUrl}/api/exchanges`)
            .then(res => res.json())
            .then((json) => this.setState({
                exchanges: json
            }))
            .catch((e) => {
                alert('Error: fail to load data')
            });
    }

    handleSubmit(data) {
        alert(JSON.stringify(data));
    }

    render() {
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

                    <SimpleForm defaultValue={{ baseUrl: 'teste', params: 'foo=value' }} save={this.handleSubmit} >
                        <TextInput label={"configuration.gekko.endpoint"} source={"baseUrl"} type="url" />
                        <CodeEditorField source="params" mode="toml" theme="monokai" />
                    </SimpleForm>
                </CardContent>
            </Card>
        )
    }
}

export default compose(
    withStyles(styles),
    translate
)(BacktestEditor);
