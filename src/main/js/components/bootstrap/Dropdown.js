import classNames from 'classnames';
import React from 'react';
import ReactDOM from 'react-dom';

export default class Dropdown extends React.Component {

  state = {
    toggle: false
  }

  constructor(props) {
    super(props);
    this.handleDocumentClick = this.handleDocumentClick.bind(this);
    document.addEventListener('click', this.handleDocumentClick, true);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleDocumentClick, true);
  }

  handleClick(e) {
    e.preventDefault();
    this.setState({toggle: !this.state.toggle});
  }

  handleDocumentClick(e) {
    let domNode = ReactDOM.findDOMNode(this);
    if (domNode && domNode.firstChild && !domNode.firstChild.contains(e.target)) {
      this.setState({toggle: false});
    }
  }

  render () {
    let classes = {
      open: this.state.toggle,
      dropdown: true
    };

    return <li className={classNames(classes)}>
      <a className="dropdown-toggle" href="#" onClick={this.handleClick.bind(this)} >
        {this.renderIcon()}
        {this.renderTitle()}
        &nbsp;
        <i className="fa fa-caret-down"></i>
      </a>
      {this.props.children}
    </li>;
  }

  renderIcon () {
    if (this.props.icon) {
      return <i className={this.props.icon} />;
    }
  }

  renderTitle () {
    if (this.props.title) {
      return <span>{this.props.title}</span>;
    }
  }

}
