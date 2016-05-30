import React from 'react';

export default class Link extends React.Component {

  handleClick (e) {
    let href = this.props.href;
    e.preventDefault();
    require(['router'], function (router) {
      router.default.navigate(href, {trigger: true});
    });
  }

  render() {
    return <a href="#" onClick={this.handleClick.bind(this)} {...this.props} >
      {this.props.children}
    </a>
  }

}
