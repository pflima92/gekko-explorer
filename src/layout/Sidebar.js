import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import Drawer from '@material-ui/core/Drawer';
import { withStyles } from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';
import { setSidebarVisibility } from 'react-admin';
import { getConfig } from '../config';
import { Typography } from '@material-ui/core';

export const DRAWER_WIDTH = 300;

const styles = theme => ({
    drawerPaper: {
        // height: 'auto',
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),

        marginTop: 48,
        height: '100vh',
        position: 'inherit',
        backgroundColor: theme.palette.background.default,
        borderRight: 'none'
    },
});

// We shouldn't need PureComponent here as it's connected
// but for some reason it keeps rendering even though mapStateToProps returns the same object
class ConsoleSidebar extends PureComponent {
    componentWillMount() {
        const { setSidebarVisibility } = this.props;
        setSidebarVisibility(false);
    }

    handleClose = () => this.props.setSidebarVisibility(false);

    toggleSidebar = () => this.props.setSidebarVisibility(!this.props.open);

    render() {
        const {
            children,
            classes,
            open,
            size,
            ...rest
        } = this.props;

        return (
            <Drawer
                variant="temporary"
                open={open}
                PaperProps={{
                    className: classes.drawerPaper,
                    style: { width: size },
                }}
                onClose={this.toggleSidebar}
                {...rest}
            >
                {React.cloneElement(children, {
                    onMenuClick: this.handleClose,
                })}
                <Typography style={{
                    display: 'flex',
                    position: 'absolute',
                    left: '10px',
                    bottom: '55px'
                }} variant="caption">Connected on Gekko: {getConfig().baseUrl}</Typography>
            </Drawer>
        );
    }
}

ConsoleSidebar.propTypes = {
    children: PropTypes.node.isRequired,
    classes: PropTypes.object,
    open: PropTypes.bool.isRequired,
    setSidebarVisibility: PropTypes.func.isRequired,
    size: PropTypes.number,
    width: PropTypes.string,
};

ConsoleSidebar.defaultProps = {
    size: DRAWER_WIDTH,
    open: false
};

const mapStateToProps = state => ({
    open: state.admin.ui.sidebarOpen,
    locale: state.locale, // force redraw on locale change
});

export default compose(
    connect(
        mapStateToProps,
        { setSidebarVisibility }
    ),
    withStyles(styles),
    withWidth({ resizeInterval: Infinity }) // used to initialize the visibility on first render
)(ConsoleSidebar);
