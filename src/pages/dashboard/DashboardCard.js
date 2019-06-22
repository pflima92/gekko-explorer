import React from "react";
import Card from "@material-ui/core/Card/Card";
import CardContent from "@material-ui/core/CardContent/CardContent";
import compose from "recompose/compose";
import { withStyles } from "@material-ui/core";
import MoreVertIcon from '@material-ui/icons/MoreVert';

import IconButton from "@material-ui/core/IconButton/IconButton";
import CardHeader from "@material-ui/core/CardHeader/CardHeader";
import { translate } from "react-admin";
import CardActions from "@material-ui/core/CardActions/CardActions";
import Divider from "@material-ui/core/Divider/Divider";
import * as PropTypes from "prop-types";

const styles = (theme, width) => ({
    listItem: {
        padding: `${theme.spacing.unit}px 0`,
    },
    main: {
        flex: '1',
        marginLeft: '1em',
        marginTop: 10,
    },
    card: {
        maxWidth: width || 450,
    }
});

const DashboardCard = ({ cardContent, cardAction, cardActions, title, icon, classes, translate }) => (
    <div className={classes.main}>
        <Card className={classes.card}>
            <CardHeader
                avatar={
                    icon
                }
                action={
                    cardAction && <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                }
                title={translate(title)}
            />
            <Divider />
            <CardContent>
                {React.cloneElement(cardContent, {})}
            </CardContent>
            <CardActions>
                {React.cloneElement(cardActions, {})}
            </CardActions>
        </Card>
    </div>
);

DashboardCard.propTypes = {
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
        .isRequired,
    icon: PropTypes.element,
    cardContent: PropTypes.node,
    cardAction: PropTypes.node,
    cardActions: PropTypes.node,
    classes: PropTypes.object,
    className: PropTypes.string,
    width: PropTypes.string
};

DashboardCard.defaultProps = {};

export default compose(
    translate,
    withStyles(styles),
)(DashboardCard);
