import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { AppBar, Layout } from 'react-admin';
import Menu from './CustomMenu';
import Sidebar from './Sidebar';
import Logo from './Logo';
import { black, red } from '@material-ui/core/colors';

const styles = {
    title: {
        flex: 1,
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
    },
    spacer: {
        flex: 1,
    },
};

const CustomAppBar = withStyles(styles)(({ classes, ...props }) => (
    <AppBar {...props}>
        <Typography
            variant="title"
            color="inherit"
            className={classes.title}
            id="react-admin-title"
        />
        <Logo />
        <span className={classes.spacer} />
    </AppBar>
));

const CustomLayout = props => (
    <Layout
        menu={Menu}
        appBar={CustomAppBar}
        sidebar={Sidebar}
        {...props} />
);

const darkTheme = {
    palette: {
        primary: red,
        secondary: black,
    },
};

export default connect(
    state => ({
        theme: darkTheme,
    }),
    {}
)(CustomLayout);