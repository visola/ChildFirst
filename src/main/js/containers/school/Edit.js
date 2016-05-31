import React from 'react';

import School from 'model/School';

import I18n from 'components/I18n';
import InputElement from 'components/bootstrap/InputElement';

export default class Edit extends React.Component {

  state = {
    school: new School({id:this.props.schoolId})
  }

  constructor (props) {
    super(props);

    this.state.school.fetch()
      .then(this.forceUpdate.bind(this, null));
  }

  render () {
    return <div>
      <h2><I18n string="edit_school" name={this.state.school.get('name')} /></h2>
      <form>
        <InputElement label="Name" value={this.state.school.get('name')} />
      </form>
    </div>;
  }

}
