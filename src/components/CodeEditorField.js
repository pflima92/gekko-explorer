import React from 'react';
import AceEditor from "react-ace";
import 'brace/mode/javascript';
import 'brace/mode/toml';
import 'brace/theme/monokai';
import { Labeled } from 'react-admin';
import { Field } from 'redux-form';
import { addField } from 'ra-core';

const aceOnBlur = (onBlur) => (_event, editor) => {
    const value = editor.getValue();
    onBlur(value);
};

const ReduxAce = ({ input, className, mode, theme}) => (
    <Labeled label={input.name}>
        <AceEditor
            placeholder={"Insert your params here."}
            mode={mode}
            theme={theme}
            fontSize={14}
            width={`300px`}
            height={`235px`}
            showPrintMargin={true}
            showGutter={true}
            highlightActiveLine={true}
            value={input.value}
            className={className}
            name={input.name}
            onBlur={aceOnBlur}
            setOptions={{
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true,
                enableSnippets: false,
                showLineNumbers: true,
                tabSize: 2,
            }} />
    </Labeled>
);

export const CodeEditorField = ({
    source,
    input,
    ...rest
}) => {
    return (
        <Field
            name={source}
            component={ReduxAce}
            {...rest}
        />
    );
};
export default addField(CodeEditorField);
