import React, { Component } from 'react';
import { connect } from 'react-redux';
import { I18n, setLocale } from 'react-redux-i18n';

import RaisedButton from 'material-ui/RaisedButton';

class LanguageSelector extends Component {
    render() {
        const { className, lang, dispatch } = this.props;

        return (
            <div className={className}>
                <RaisedButton
                    onTouchTap={() => dispatch(setLocale('cs'))}
                    label={I18n.t('czech')}
                    primary={lang === 'cs'}
                />
                <RaisedButton
                    onTouchTap={() => dispatch(setLocale('en'))}
                    label={I18n.t('english')}
                    primary={lang === 'en'}
                />
            </div>
        );
    }
}

export default connect(
(state, props) => ({
    ...props,
    lang: state.i18n.locale
}))(LanguageSelector);

