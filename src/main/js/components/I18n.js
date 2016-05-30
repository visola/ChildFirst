import Handlebars from 'handlebars';
import React from 'react';
import Strings from 'i18n!nls/strings';

export default class I18n extends React.Component {

  render() {
    let { string, ...props } = this.props;
    let template = Handlebars.compile(Strings[string]);
    return <i18n>{template(props)}</i18n>;
  }

}
