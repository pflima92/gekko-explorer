import React from "react";
import compose from "recompose/compose";
import { withStyles } from "@material-ui/core";
import { translate } from "react-admin";
import DashboardCard from "./DashboardCard";
import FavoriteIcon from "@material-ui/icons/Favorite"
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import MenuList from "@material-ui/core/MenuList/MenuList";
import { yellow } from "@material-ui/core/colors";
import { Link } from "ra-ui-materialui";

const styles = {};

const FavoritesCard = ({ classes, translate }) => (
    <DashboardCard
        title={'dashboard.cards.favorites.title'}
        icon={<FavoriteIcon style={{ color: yellow[500] }} />}
        cardContent={
            <MenuList>
                <MenuItem to='/backtests' component={Link} className={classes.listItem}>
                    <ListItemText primary={translate('resources.backtests.name', { smart_count: 2 })} />
                </MenuItem >
                <MenuItem to='/backtest-editor' component={Link} className={classes.listItem}>
                    <ListItemText primary={translate('resources.backtestEditor.name')} />
                </MenuItem >
            </MenuList>
        }
        cardActions={<span />}
    />
);

export default compose(
    translate,
    withStyles(styles),
)(FavoritesCard);
