import React from 'react';
import { connect } from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import compose from 'recompose/compose';
import { translate, changeLocale, TabbedForm, FormTab, TextInput, Title } from 'react-admin';
import { Typography } from '@material-ui/core';
import { getConfig, setConfig } from '../../config';

const styles = {
    label: { width: '10em', display: 'inline-block' },
    button: { margin: '1em' },
};

const handleSave = (values) => {
    setConfig(values);
    window.location.reload();
};

const Configuration = ({
    translate,
}) => (
        <Card>
            <Title title={translate('pos.configuration')} />
            <CardContent>
                <Typography gutterBottom variant="title">
                    {translate('pos.configuration')}
                </Typography>
                <TabbedForm defaultValue={getConfig()} save={handleSave} >
                    <FormTab label={'configuration.gekko.title'}>
                        <TextInput label={"configuration.gekko.endpoint"} source={"baseUrl"} type="url" />
                        <TextInput label={"configuration.gekko.wsEndpoint"} source={"websocket"} type="url" />
                    </FormTab>
                    <FormTab label={'configuration.auth.title'}>
                        <TextInput label={"configuration.auth.username"} source={"username"} />
                        <TextInput label={"configuration.auth.pwd"} source={"password"} type="password" />
                    </FormTab>
                </TabbedForm>
            </CardContent>
        </Card>
    );

const mapStateToProps = state => ({
    locale: state.i18n.locale,
});

export default compose(
    connect(
        mapStateToProps,
        {
            changeLocale
        }
    ),
    translate,
    withStyles(styles)
)(Configuration);
