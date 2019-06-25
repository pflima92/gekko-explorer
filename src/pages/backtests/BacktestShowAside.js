import { Divider, CardActions, Button } from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import { Show, SimpleShowLayout, TextField, NumberField } from 'react-admin';

const BacktestTitle = ({ record }) => (<span>{` / #${record.id}`}</span>);

const BacktestShowHeader = ({ record, onCancel, className }) => (
    <div className={className}>
        <Typography variant="title">
            {record.id}
        </Typography>
        <IconButton onClick={onCancel}>
            <CloseIcon />
        </IconButton>
    </div>);

const ShowActions = ({ basePath, data, resource }) => (
    <CardActions style={{
        zIndex: 2,
        display: 'inline-block',
        float: 'right',
    }}>
        <Button color="secondary">Backtest Editor</Button>
        <Button color="primary">Details</Button>
    </CardActions>
);


const styles = theme => ({
    root: {
        paddingTop: 40,
        [theme.breakpoints.up('xs')]: {
            width: 500,
        },
        [theme.breakpoints.down('xs')]: {
            width: '100vw',
            marginTop: -30,
        },
    },
    title: {
        paddingTop: 10,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: '1em',
    },
    inlineField: {
        display: 'inline-block',
        width: '50%',
        whiteSpace: 'nowrap'
    },
});

/** https://app.gekkoplus.com/bot/fabrice2 */
const BacktestShowAside = withStyles(styles)(({ classes, onCancel, ...props }) => (
    <Show title={<BacktestTitle />} {...props}>
        <SimpleShowLayout className={classes.root}>
            <BacktestShowHeader className={classes.title} onCancel={onCancel} />
            <TextField source="exchange" />
            <TextField source="pair" className={classes.inlineField} />
            <TextField source="tradingAdvisor.method" className={classes.inlineField} />
            <Divider />

            <TextField source="performanceReport.startTime" className={classes.inlineField} />
            <NumberField source="performanceReport.trades" className={classes.inlineField} />

            <TextField source="performanceReport.endTime" className={classes.inlineField} />
            <NumberField source="performanceReport.market" options={{ maximumFractionDigits: 2 }} className={classes.inlineField} />

            <TextField source="performanceReport.timespan" />

            <NumberField source="performanceReport.startPrice" locales="en-US" className={classes.inlineField} options={{ maximumFractionDigits: 5 }} />
            <NumberField source="performanceReport.startBalance" className={classes.inlineField} options={{ maximumFractionDigits: 5 }} />
            <NumberField source="performanceReport.endPrice" locales="pt-BR" className={classes.inlineField} options={{ maximumFractionDigits: 5 }} />
            <NumberField source="performanceReport.balance" className={classes.inlineField} options={{ maximumFractionDigits: 5 }} />

            <NumberField source="performanceReport.relativeProfit" options={{ maximumFractionDigits: 3 }} />

            <Divider />

            <ShowActions />
        </SimpleShowLayout>
    </Show>
));
export default withStyles(styles)(BacktestShowAside);
