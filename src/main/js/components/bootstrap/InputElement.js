import classNames from 'classnames';
import React from 'react';

export default class InputElement extends React.Component {

  state = {
    value : this.props.value || ''
  }

  componentWillReceiveProps (nextProps) {
    this.setState({value: nextProps.value || ''});
  }

  handleChange (e) {
    this.setState({value: e.target.value});
  }

  render () {
    let {propsClassName, ...props} = this.props;

    let classes = {
      "form-control": true
    };

    return <div className="form-group">
      <label for={this.props.name}>{this.props.label}</label>
      <input
        type="text"
        {...props}
        className={classNames(classes, propsClassName)}
        onChange={this.handleChange.bind(this)}
        value={this.state.value || ''}
      />
    </div>;
  }

}
