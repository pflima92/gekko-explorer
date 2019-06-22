import React, { Component } from 'react';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';
import Icon from '@material-ui/core/Icon'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import menuJson from '../menu.json'

import {
    translate,
    DashboardMenuItem,
    MenuItemLink,
    Responsive,
} from 'react-admin';

import SubMenu from './SubMenu';

let subMenus = {};
for (var key in menuJson) {
    subMenus[key] = false;
}

class CustomMenu extends Component {
    state = {
        menu: menuJson,
        ...subMenus
    };

    static propTypes = {
        onMenuClick: PropTypes.func,
        logout: PropTypes.object,
    };

    handleToggle = menu => {
        this.setState(state => ({ [menu]: !state[menu] }));
    };

    render() {
        const { onMenuClick, open, logout, translate, hasDashboard } = this.props;
        return (
            <div>
                {' '}
                {hasDashboard && <DashboardMenuItem onClick={onMenuClick} />}
                {this.state.menu
                    .map((r, i) => {
                        let render = null;
                        if (r.childs && r.childs.length > 0) {
                            render = <SubMenu
                                key={i.name}
                                handleToggle={() => this.handleToggle(r.name)}
                                isOpen={this.state[r.name]}
                                sidebarIsOpen={open}
                                name={r.name}
                                icon={<Icon>{r.icon}</Icon>}>

                                {r.childs
                                    .map((c, ci) => (
                                        <MenuItemLink
                                            key={c.name}
                                            to={c.to}
                                            primaryText={translate(c.name, {
                                                smart_count: 2,
                                            })}
                                            leftIcon={<Icon>{c.icon}</Icon>}
                                            onClick={onMenuClick}
                                        />
                                    ))}
                            </SubMenu>
                        } 
                        
                        if(r.to) {

                            render = <MenuItemLink
                                key={r.name}
                                to={r.to}
                                primaryText={translate(r.name, {
                                    smart_count: 2,
                                })}
                                leftIcon={<Icon>{r.icon}</Icon>}
                                onClick={onMenuClick}
                            />
                        }
                        return render;
                    })
                }
                <Responsive
                    small={logout}
                    medium={null} // Pass null to render nothing on larger devices
                />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    open: state.admin.ui.sidebarOpen,
    theme: state.theme,
    locale: state.i18n.locale,
});

const enhance = compose(
    withRouter,
    connect(
        mapStateToProps,
        {}
    ),
    translate
);

export default enhance(CustomMenu);