import React from 'react';
import { Route } from 'react-router-dom';

import GekkoUi from './pages/gekko-ui';
import BacktestEditor from './pages/backtestEditor/BacktestEditor';
import Configuration from './pages/configuration/Configuration';

export default [
    <Route path="/backtest-editor" component={BacktestEditor} />,
    <Route path="/gekko-ui" component={GekkoUi} />,
    <Route path="/settings" component={Configuration} />,
];
