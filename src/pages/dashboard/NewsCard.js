import React from "react";
import compose from "recompose/compose";
import {withStyles} from "@material-ui/core";
import {translate} from "react-admin";
import DashboardCard from "./DashboardCard";
import AnnouncementIcon from "@material-ui/icons/Announcement"
import Button from "@material-ui/core/Button/Button";
import List from "@material-ui/core/List/List";
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";

const styles = {};

const NewsCard = ({classes, translate}) => (
    <DashboardCard
        title={'dashboard.cards.news.title'}
        icon={<AnnouncementIcon/>}
        cardContent={
            <List disablePadding>
                <ListItem className={classes.listItem}>
                    <ListItemText primary={"Now the Jspare Platform support multiples exchanges, either are available `Binance` or `Kraken`."}
                                  secondary={"3 days ago"}/>
                </ListItem>
                <ListItem className={classes.listItem}>
                    <ListItemText primary={"Jspare Platform is in PoC."}
                                  secondary={"2 months ago"}/>
                </ListItem>
            </List>
        }
        cardActions={<Button size="small" color="primary">View All</Button>}
    />
);

export default compose(
    translate,
    withStyles(styles),
)(NewsCard);
