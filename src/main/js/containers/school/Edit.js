import React from 'react';

import School from 'model/School';

import I18n from 'components/I18n';
import Input from 'components/bootstrap/Input';

export default class Edit extends React.Component {

  state = {
    name: '',
    school: new School({id:this.props.schoolId})
  }

  constructor (props) {
    super(props);

    this.state.school.fetch()
      .then(this.handleLoaded.bind(this));
  }

  handleLoaded () {
    this.setState({name:this.state.school.get('name')});
  }

  handleNameChange (newName) {
    let school = this.state.school;
    school.set('name', newName);
    this.setState({school});
  }

  handleSubmit (e) {
    e.preventDefault();
    this.state.school.save({wait:true})
      .then(this.handleLoaded.bind(this));;
  }

  render () {
    return <div>
      <h2><I18n string="edit_school" name={this.state.name} /></h2>
      <form onSubmit={this.handleSubmit.bind(this)}>
        <Input
          label="Name"
          onChange={this.handleNameChange.bind(this)}
          value={this.state.school.get('name')} />
        <button className="btn btn-primary">Save</button>
      </form>
    </div>;
  }

}
