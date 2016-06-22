import React from 'react';

import I18n from 'components/I18n';
import Link from 'components/Link';
import Branches from 'model/Branches';

export default class List extends React.Component {

  state = {
    branches: new Branches()
  }

  constructor (props) {
    super(props);

    this.state.branches.fetch()
      .then(this.forceUpdate.bind(this, null));
  }

  render () {
    return <div>
      <h2><I18n string="title_branches" /></h2>
      <div className="btn-group">
        <Link href={`/branches/new`} className="btn btn-primary"><I18n string="button_create_new" /></Link>
      </div>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {this.state.branches.map(function (branch) {
            let path = `/branches/${branch.id}`;
            return <tr key={branch.id}>
              <td><Link href={path}>{branch.id}</Link></td>
              <td>{branch.get('name')}</td>
            </tr>;
          })}
        </tbody>
      </table>
    </div>;
  }

}
