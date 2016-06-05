import React from 'react';

export default class ReactUtils {

  static findAllChildren(component) {
    let result = [];
    if (component.props.children) {
      let children = component.props.children;
      React.Children.forEach(children, child => {
        result.push(child);
        ReactUtils.findAllChildren(child).forEach(cc => result.push(cc));
      });
    }
    return result;
  }

  static findPropInAllChildren(component, propName) {
    let result = [];
    ReactUtils.findAllChildren(component).forEach(child => {
      if (child.props[propName]) {
        result.push(child.props[propName]);
      }
    });
    return result;
  }

}
