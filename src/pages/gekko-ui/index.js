import React, { Component, Fragment } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { Title, translate } from 'react-admin';
import { compose } from 'recompose';
import Iframe from 'react-iframe'
import { getConfig } from '../../config';

const styles = {};

class GekkoUi extends Component {

    componentDidMount() {
    }

    render() {
        return (
            <Fragment>
                <Title title={'Gekko UI'} />
                <Iframe url={getConfig().baseUrl}
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
