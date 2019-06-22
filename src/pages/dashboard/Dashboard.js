import React, { Fragment } from 'react';
import { Grid } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';
import { translate } from 'react-admin';
import compose from 'recompose/compose';
import FavoritesCard from './FavoritesCard';

const styles = {
    root: {
        flexGrow: 1,
    }
};

const Dashboard = () => (
    <Fragment>
        <Grid container  >
            <Grid item xs={4}>
                <FavoritesCard />
            </Grid>
        </Grid>
    </Fragment>
);

export default compose(
    translate,
    withStyles(styles)
)(Dashboard);
