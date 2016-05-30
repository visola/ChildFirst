import React from 'react';

export default class DropdownMenu extends React.Component {

  render () {
    return <ul className="dropdown-menu">
      {this.props.children}
    </ul>;
  }

}
