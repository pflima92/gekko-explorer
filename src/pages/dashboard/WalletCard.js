import React from "react";
import compose from "recompose/compose";
import {withStyles} from "@material-ui/core";
import {translate} from "react-admin";
import DashboardCard from "./DashboardCard";
import PdiIcon from "@material-ui/icons/Whatshot"
import Button from "@material-ui/core/Button/Button";
import List from "@material-ui/core/List/List";
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";

const styles = {};

const WalletCard = ({classes, translate}) => (
    <DashboardCard
        title={'dashboard.cards.walletInfo.title'}
        icon={<PdiIcon/>}
        cardContent={
            <List disablePadding>
                <ListItem className={classes.listItem}>
                    <ListItemText primary={"Values on Wallet"}
                                  secondary={"USD $5.054,89"}/>
                </ListItem>
                <ListItem className={classes.listItem}>
                    <ListItemText primary={"Gekkos Running"}
                                  secondary={"0"}/>
                </ListItem>
            </List>
        }
        cardActions={<Button size="small" color="primary">{translate('dashboard.cards.walletInfo.seeMore')}</Button>}
    />
);

export default compose(
    translate,
    withStyles(styles),
)(WalletCard);
