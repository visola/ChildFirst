import React from 'react';
import 'babel-polyfill';

import Branch from 'model/Branch';
import Schools from 'model/Schools';

import I18n from 'components/I18n';
import FormGroup from 'components/bootstrap/FormGroup';
import Input from 'components/bootstrap/Input';

export default class Edit extends React.Component {

  state = {
    name: '',
    branch: this.props.branchId == 'new' ? new Branch() : new Branch({id:this.props.branchId}),
    schoolId: 0,
    schools: new Schools()
  }

  constructor (props) {
    super(props);
    let promises = [this.state.schools.fetch()];

    if (!this.state.branch.isNew()) {
      promises.push(this.state.branch.fetch());
    }

    Promise.all(promises)
      .then(this.handleLoaded.bind(this));
  }

  handleLoaded () {
    let schoolId = 0;
    if (this.state.branch.get('school')) {
      schoolId = this.state.branch.get('school').id;
    }
    this.setState({
      name: this.state.branch.get('name'),
      schoolId
    });
  }

  handleNameChange (newName) {
    let branch = this.state.branch;
    branch.set('name', newName);
    this.setState({branch});
  }

  handlePickSchool (e) {
    this.setState({schoolId:e.currentTarget.value});
  }

  handleSubmit (e) {
    e.preventDefault();
    this.state.branch.set('school', {id: this.state.schoolId});
    this.state.branch.save({wait:true})
      .then(this.handleLoaded.bind(this));;
  }

  render () {
    let titleString = this.state.branch.isNew() ? "new_branch" : "edit_branch";
    let branch = this.state.branch;
    return <div>
      <h2><I18n string={titleString} name={this.state.name} /></h2>
      <form onSubmit={this.handleSubmit.bind(this)}>
        <Input
          label="Name"
          onChange={this.handleNameChange.bind(this)}
          value={branch.get('name')} />
        <FormGroup label="School">
          <select
              className="form-control"
              onChange={this.handlePickSchool.bind(this)}
              value={this.state.schoolId}>
            <option value={0}>- Pick one -</option>
            {this.state.schools.map(s => <option key={s.id} value={s.id}>{s.get('name')}</option>)}
          </select>
        </FormGroup>
        <button className="btn btn-primary">Save</button>
      </form>
    </div>;
  }

}
