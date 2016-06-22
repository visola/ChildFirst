import React from 'react';

import I18n from 'components/I18n';
import Link from 'components/Link';
import Schools from 'model/Schools';

export default class List extends React.Component {

  state = {
    schools: new Schools()
  }

  constructor (props) {
    super(props);

    this.state.schools.fetch()
      .then(this.forceUpdate.bind(this, null));
  }

  render () {
    return <div>
      <h2><I18n string="title_schools" /></h2>
      <div className="btn-group">
        <Link href={`/schools/new`} className="btn btn-primary"><I18n string="button_create_new" /></Link>
      </div>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {this.state.schools.map(function (school) {
            let path = `/schools/${school.id}`;
            return <tr key={school.id}>
              <td><Link href={path}>{school.id}</Link></td>
              <td>{school.get('name')}</td>
            </tr>;
          })}
        </tbody>
      </table>
    </div>;
  }

}
