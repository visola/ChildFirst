import React from 'react';

import Branch from 'model/Branch';
import Schools from 'model/Schools';

import I18n from 'components/I18n';
import Input from 'components/bootstrap/Input';

export default class Edit extends React.Component {

  state = {
    name: '',
    branch: this.props.branchId == 'new' ? new Branch() : new Branch({id:this.props.branchId})
  }

  constructor (props) {
    super(props);

    if (!this.state.branch.isNew()) {
      this.state.branch.fetch()
        .then(this.handleLoaded.bind(this));
    }
  }

  handleLoaded () {
    this.setState({name:this.state.branch.get('name')});
  }

  handleNameChange (newName) {
    let school = this.state.branch;
    branch.set('name', newName);
    this.setState({school});
  }

  handleSubmit (e) {
    e.preventDefault();
    this.state.branch.save({wait:true})
      .then(this.handleLoaded.bind(this));;
  }

  render () {
    let titleString = this.state.branch.isNew() ? "new_branch" : "edit_branch";
    return <div>
      <h2><I18n string={titleString} name={this.state.name} /></h2>
      <form onSubmit={this.handleSubmit.bind(this)}>
        <Input
          label="Name"
          onChange={this.handleNameChange.bind(this)}
          value={this.state.branch.get('name')} />
        <button className="btn btn-primary">Save</button>
      </form>
    </div>;
  }

}
