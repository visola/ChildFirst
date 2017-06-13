import React from 'react';

import User from 'model/User';

import I18n from 'components/I18n';
import Input from 'components/bootstrap/Input';

export default class Edit extends React.Component {

  state = {
    email: '',
    user: this.props.userId == 'new' ? new User() : new User({id:this.props.userId})
  }

  constructor (props) {
    super(props);

    if (!this.state.user.isNew()) {
      this.state.user.fetch()
        .then(this.handleLoaded.bind(this));
    }
  }

  handleLoaded () {
    this.setState({email:this.state.user.get('email')});
  }

  handleChange (field, newValue) {
    let user = this.state.user;
    user.set(field, newValue);
    this.setState({user});
  }

  handleSubmit (e) {
    e.preventDefault();
    this.state.user.save({wait:true})
      .then(this.handleLoaded.bind(this));;
  }

  render () {
    let titleString = this.state.user.isNew() ? "new_user" : "edit_user";
    return <div>
      <h2><I18n string={titleString} email={this.state.email} /></h2>
      <form onSubmit={this.handleSubmit.bind(this)}>
        <Input
          label="Email"
          onChange={this.handleChange.bind(this, 'email')}
          value={this.state.user.get('email')} />
          <Input
            label="First name"
            onChange={this.handleChange.bind(this, 'firstName')}
            value={this.state.user.get('firstName')} />
          <Input
            label="Last name"
            onChange={this.handleChange.bind(this, 'lastName')}
            value={this.state.user.get('lastName')} />
        <button className="btn btn-primary">Save</button>
      </form>
    </div>;
  }

}
