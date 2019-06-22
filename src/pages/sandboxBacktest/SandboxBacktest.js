import React, { Component, Fragment } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import { compose } from 'recompose';
import { Title, translate } from 'react-admin';
import { split as SplitEditor } from 'react-ace';
import { strategyTemplate, paramsTemplate } from './template';

import 'brace/mode/yaml';
import 'brace/mode/javascript';
import 'brace/theme/monokai';

const styles = {};

class SandboxBacktest extends Component {

    componentDidMount() {
    }

    render() {
        return (
            <Fragment>
                <Title title={'Sandbox Backtest'} />
                <SplitEditor
                    placeholder={["Insert your strategy here.", "Insert your params here."]}
                    mode={"javascript"}
                    theme="monokai"
                    fontSize={14}
                    width={`1400px`}
                    height={`700px`}
                    showPrintMargin={true}
                    showGutter={true}
                    highlightActiveLine={true}
                    splits={2}
                    orientation="beside"
                    value={[strategyTemplate, paramsTemplate]}
                    name="editor"
                    setOptions={{
                        enableBasicAutocompletion: true,
                        enableLiveAutocompletion: true,
                        enableSnippets: false,
                        showLineNumbers: true,
                        tabSize: 2,
                    }} />
            </Fragment>
        )
    }
}

export default compose(
    withStyles(styles),
    translate
)(SandboxBacktest);
