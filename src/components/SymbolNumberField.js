import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import pure from 'recompose/pure';
import Typography from '@material-ui/core/Typography';
import sanitizeRestProps from './sanitizeRestProps';

const hasNumberFormat = !!(
    typeof Intl === 'object' &&
    Intl &&
    typeof Intl.NumberFormat === 'function'
);

export const SymbolNumberField = ({
    className,
    record,
    source,
    locales,
    options,
    textAlign,
    ...rest
}) => {
    if (!record) return null;
    let value = get(record, source);
    if (value == null) return null;
    if (!hasNumberFormat) {
        return (
            <Typography
                component="span"
                body1="body1"
                className={className}
                {...sanitizeRestProps(rest)}
            >
                {value}
            </Typography>
        );
    }

    const icon = value >= 0 ? '(+)' : '(-)';
    value = icon + ' ' + value.toLocaleString(locales, options);

    return (
        <Typography
            component="span"
            body1="body1"
            className={className}
            {...sanitizeRestProps(rest)}
        >
            {value}
        </Typography>
    );
};

SymbolNumberField.propTypes = {
    addLabel: PropTypes.bool,
    basePath: PropTypes.string,
    classes: PropTypes.object,
    className: PropTypes.string,
    cellClassName: PropTypes.string,
    headerClassName: PropTypes.string,
    label: PropTypes.string,
    locales: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.string),
    ]),
    options: PropTypes.object,
    record: PropTypes.object,
    textAlign: PropTypes.string,
    sortBy: PropTypes.string,
    source: PropTypes.string.isRequired,
};

// wat? TypeScript looses the displayName if we don't set it explicitly
SymbolNumberField.displayName = 'SymbolNumberField';

const ComposedSymbolNumberField = pure(SymbolNumberField);

ComposedSymbolNumberField.defaultProps = {
    addLabel: true,
    textAlign: 'right',
};
export default ComposedSymbolNumberField;
