import React, { Component, Fragment } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { Title, translate } from 'react-admin';
import { compose } from 'recompose';
import Iframe from 'react-iframe'

import './index.css'

const styles = {};

class GekkoUi extends Component {

    componentDidMount() {
    }

    render() {
        return (
            <Fragment>
                <Title title={'Gekko UI'} />
                <Iframe url={'ext/gekko-ui/index.html'}
                    frameBorder={0}
                    width="100%"
                    height="1280px"
                    display="initial"
                    position="relative"
                    allowFullScreen />
            </Fragment>
        )
    }
}

export default compose(
    withStyles(styles),
    translate
)(GekkoUi);
