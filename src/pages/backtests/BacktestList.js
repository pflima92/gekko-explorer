import React, { Fragment, Component } from 'react';
import compose from 'recompose/compose';
import classnames from 'classnames';
import { BooleanInput, Datagrid, DateField, DateTimeInput, Filter, List, SelectInput, TextField, TextInput } from 'react-admin';
import { SymbolNumberField } from '../../components'
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Route } from 'react-router';
import Drawer from '@material-ui/core/Drawer';
import { createStyles, withStyles } from '@material-ui/core/styles';
import BacktestListActions from './BacktestListActions';
import BacktestShowAside from './BacktestShowAside';

const styles = theme => createStyles({
    root: {
        display: 'flex',
    },
    list: {
        flexGrow: 1,
        transition: theme.transitions.create(['all'], {
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginRight: 0,
    },
    listWithDrawer: {
        marginRight: 400,
    },
});

const BacktestFilter = (props) => (
    <Filter {...props}>
        <TextInput source="id" />
        <TextInput source="parentId" />
        <SelectInput
            source="market.exchange"
            choices={[
                { id: 'binance', name: 'Binance' },
                { id: 'bitfinex', name: 'Bitfinex' },
                { id: 'coinfalcon', name: 'CoinFalcon' },
                { id: 'exmo', name: 'EXMO' },
                { id: 'gdax', name: 'GDAX' },
                { id: 'kraken', name: 'Kraken' },
                { id: 'luno', name: 'Luno' },
                { id: 'poloniex', name: 'Poloniex' }
            ]}
        />
        <TextInput source="market.currency" />
        <TextInput source="market.asset" />
        <TextInput source="tradingAdvisor.method" />
        <BooleanInput source="onlyPositiveProfit" />
        <DateTimeInput source="date_gte" />
    </Filter>
);

class BacktestList extends Component {
    render() {
        const { classes, ...props } = this.props;
        return (
            <div className={classes.root}>
                <Route path="/backtests/:id/show">
                    {({ match }) => {
                        const isMatch =
                            !!(match &&
                                match.params &&
                                match.params.id !== 'create');

                        return (
                            <Fragment>
                                <List
                                    {...props}
                                    className={classnames(classes.list, {
                                        [classes.listWithDrawer]: isMatch
                                    })}
                                    actions={<BacktestListActions />}
                                    filters={<BacktestFilter />}
                                    perPage={100}
                                >
                                    <Datagrid rowClick="show" hover={true}>
                                        <DateField source="timestamp" sortable={false} showTime />
                                        <TextField source="tradingAdvisor.method" sortable={false} />
                                        <TextField source="exchange" sortable={false} />
                                        <TextField source="pair" sortable={false} />
                                        <TextField source="performanceReport.startTime" sortable={false} />
                                        <TextField source="performanceReport.endTime" sortable={false} />
                                        <TextField source="performanceReport.market" sortable={false} />
                                        <TextField source="performanceReport.profit" sortable={false} />
                                        <SymbolNumberField source="performanceReport.relativeProfit" sortable={false} />
                                    </Datagrid>
                                </List>
                                <Drawer
                                    variant="persistent"
                                    open={isMatch}
                                    anchor="right"
                                    onClose={this.handleClose}
                                    classes={{
                                        paper: classes.drawerPaper
                                    }}
                                >
                                    {/* To avoid any errors if the route does not match, we don't render at all the component in this case */}
                                    {isMatch ? (
                                        <BacktestShowAside
                                            id={match.params.id}
                                            {...props}
                                            onCancel={this.handleClose}
                                        />
                                    ) : null}
                                </Drawer>
                            </Fragment>
                        );
                    }}
                </Route>
            </div>
        );
    }

    handleClose = () => {
        this.props.push('/backtests');
    };
}

export default compose(
    connect(undefined, { push }),
    withStyles(styles)
)(BacktestList);
