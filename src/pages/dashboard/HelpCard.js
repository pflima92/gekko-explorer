import React from "react";
import compose from "recompose/compose";
import {withStyles} from "@material-ui/core";
import {translate} from "react-admin";
import DashboardCard from "./DashboardCard";
import HelpIcon from "@material-ui/icons/Help"
import Button from "@material-ui/core/Button/Button";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import MenuList from "@material-ui/core/MenuList/MenuList";
import {blue} from "@material-ui/core/colors";

const styles = {};

const HelpCard = ({classes, translate}) => (
    <DashboardCard
        title={'dashboard.cards.help.title'}
        icon={<HelpIcon style={{color: blue[500]}} />}
        cardContent={
            <MenuList>
                <MenuItem className={classes.listItem}>
                    <ListItemText primary={"How to setup my first strategy?"}/>
                </MenuItem >
                <MenuItem  className={classes.listItem}>
                    <ListItemText primary={"How to create my wallet?"}/>
                </MenuItem >
                <MenuItem  className={classes.listItem}>
                    <ListItemText primary={"How to use the vccode-jspare-ext"}/>
                </MenuItem >
            </MenuList>
        }
        cardActions={<Button size="small" color="primary">Complete guide</Button>}
    />
);

export default compose(
    translate,
    withStyles(styles),
)(HelpCard);
