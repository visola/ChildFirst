import I18n from 'components/I18n';
import React from 'react';
import Security from 'security';

export default class Home extends React.Component {

  render() {
    let name = Security.user.firstName;
    return <p><I18n string="hello" name={name} /></p>;
  }

}
