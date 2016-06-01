import classNames from 'classnames';
import React from 'react';

export default class Input extends React.Component {

  state = {
    value : this.props.value || ''
  }

  componentWillReceiveProps (nextProps) {
    this.setState({value: nextProps.value || ''});
  }

  getValue () {
    if (this.state.value == '') {
      return null;
    }
    return this.state.value;
  }

  isToggleButton() {
    let {type} = this.props;
    return type == 'checkbox' || type == 'radio';
  }

  handleChange (e) {
    let value = this.isToggleButton() ? e.target.checked : e.target.value;
    this.setState({value});
    if (this.props.onChange) {
      this.props.onChange(value, e);
    }
  }

  render () {
    if (this.isToggleButton()) {
      return this.renderCheckboxOrRadio();
    } else {
      return this.renderOtherTypes();
    }
  }

  renderCheckboxOrRadio() {
    return <div className="form-group">
      <label for={this.props.name}>
        {this.renderInput(false)} {this.props.label}
      </label>
    </div>;
  }

  renderInput(formControl = true) {
    let {className, type, ...props} = this.props;
    type = type || 'text';

    let classes = {
      "form-control": formControl
    };

    return <input
      {...props}
      type={type}
      className={classNames(classes, className)}
      onChange={this.handleChange.bind(this)}
      value={this.state.value || ''}
    />;
  }

  renderOtherTypes() {
    return <div className="form-group">
      <label for={this.props.name}>{this.props.label}</label>
      {this.renderInput()}
    </div>;
  }

}
