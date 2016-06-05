import Handlebars from 'handlebars';
import React from 'react';
import Strings from 'i18n!nls/strings';

export default class I18n extends React.Component {

  render() {
    let { string, ...props } = this.props;
    let templateString = Strings[string];
    if (!templateString) {
      return <i18n>{`[!!${string}!!]`}</i18n>;
    }

    let template = Handlebars.compile(templateString);
    return <i18n>{template(props)}</i18n>;
  }

}
