import classNames from 'classnames';
import React from 'react';

import I18n from 'components/I18n';
import Link from 'components/Link';

export default class DropdownItem extends React.Component {

  render () {
    let path = window.location.pathname;
    let icon = this.props.icon ? <i className={this.props.icon}></i> : null;
    return <li className={classNames({active:path == this.props.href})}>
      <Link href={this.props.href}>
        {icon}
        {this.renderTitle()}
      </Link>
    </li>;
  }

  renderTitle () {
    if (this.props.titleKey) {
      return <I18n string={this.props.titleKey} />;
    }

    if (this.props.title) {
      return <span>{this.props.title}</span>
    }
  }

}
