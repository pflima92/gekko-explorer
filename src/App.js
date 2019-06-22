import React, { Component } from "react";
import { Admin, Resource } from "react-admin";

import englishMessages from './i18n/en';

import ApiDataProvider from "./providers/apiDataProvider";
import CustomLayout from "./layout/CustomLayout";
import CustomRoutes from "./routes";

import CustomMenu from "./layout/CustomMenu";
import Dashboard from "./pages/dashboard/Dashboard";

import backtests from "./pages/backtests";
import datasets from "./pages/datasets";
import imports from "./pages/imports";
import subscriptions from "./pages/subscriptions";

const i18nProvider = locale => englishMessages;

class App extends Component {
    state = { dataProvider: null };

    async componentWillMount() {
        const dataProvider = ApiDataProvider('/api');
        this.setState({ dataProvider });
    }

    render() {
        const { dataProvider } = this.state;

        if (!dataProvider) {
            return (
                <div className="loader-container" >
                    <div className="loader">Loading...</div>
                </div>
            );
        }

        return (
            <Admin
                dataProvider={dataProvider}
                i18nProvider={i18nProvider}
                appLayout={CustomLayout}
                menu={CustomMenu}
                customRoutes={CustomRoutes}
                dashboard={Dashboard}
                locale="en">

                {/*  MySpace */}
                <Resource {...backtests} />
                <Resource {...datasets} />

                {/* System */}
                <Resource {...imports} />
                <Resource {...subscriptions} />
            </Admin>
        );
    }
}
export default App;
