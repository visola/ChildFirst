import Handlebars from 'handlebars';
import React from 'react';
import dictionary from '../i18n/dictionary';

export default class I18n extends React.Component {

  render() {
    let { string, ...props } = this.props;
    let templateString = dictionary.get(string);
    if (!templateString) {
      return <i18n>{`[!!${string}!!]`}</i18n>;
    }

    let template = Handlebars.compile(templateString);
    return <i18n>{template(props)}</i18n>;
  }

}
