import classNames from 'classnames';
import React from 'react';

import FormGroup from 'components/bootstrap/FormGroup';

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
    return <FormGroup name={this.props.name}
      label={this.props.label}
      shouldRenderLabelBefore={!this.isToggleButton()}>
      {this.renderInput(!this.isToggleButton())}
    </FormGroup>
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

}
