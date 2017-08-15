import React from 'react';

import I18n from '../components/I18n';

export default class Home extends React.Component {

  render() {
    let name = null;
    return <p><I18n string="hello" name={name} /></p>;
  }

}