import classNames from 'classnames';
import React from 'react';

export default class FormGroup extends React.Component {

  static defaultProps = {
    shouldRenderLabelBefore: true
  }

  render () {
    if (this.props.shouldRenderLabelBefore) {
      return this.renderLabelBeforeChildren();
    } else {
      return this.renderChildrenInsideLabel();
    }
  }

  renderChildrenInsideLabel() {
    return <div className="form-group">
      <label for={this.props.name}>
        {this.props.children}
        &nbsp;
        {this.props.label}
      </label>
    </div>;
  }

  renderLabelBeforeChildren() {
    return <div className="form-group">
      <label for={this.props.name}>{this.props.label}</label>
      {this.props.children}
    </div>;
  }

}
