import I18n from '../components/I18n';
import React from 'react';

export default class Login extends React.Component {

  render() {
    let url = `/authenticate/google?path=${window.location.pathname}`;
    return <div className="login">
      <h3><I18n string="please_login" /></h3>
      <p>
        <a className="google-button btn" href={url}>
          <I18n string="login_with_google" />
        </a>
      </p>
    </div>;
  }

}
