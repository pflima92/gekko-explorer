import React from "react";
import compose from "recompose/compose";
import {withStyles} from "@material-ui/core";
import {translate} from "react-admin";
import DashboardCard from "./DashboardCard";
import UsersInfoIcon from "@material-ui/icons/AccountBox"
import Button from "@material-ui/core/Button/Button";
import List from "@material-ui/core/List/List";
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";

const styles = {};

const UsersInfoCard = ({classes, translate}) => (
    <DashboardCard
        title={'dashboard.cards.usersInfo.title'}
        icon={<UsersInfoIcon/>}
        cardContent={
            <List disablePadding>
                <ListItem className={classes.listItem}>
                    <ListItemText primary={"Active Users"}
                                  secondary={"4"}/>
                </ListItem>
                <ListItem className={classes.listItem}>
                    <ListItemText primary={"Incidents"}
                                  secondary={"Nothing related"}/>
                </ListItem>
            </List>
        }
        cardActions={<Button size="small" color="primary">View list</Button>}
    />
);

export default compose(
    translate,
    withStyles(styles),
)(UsersInfoCard);
