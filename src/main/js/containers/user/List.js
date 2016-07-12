import React from 'react';

import I18n from 'components/I18n';
import Link from 'components/Link';
import Users from 'model/Users';

export default class List extends React.Component {

  state = {
    users: new Users()
  }

  constructor (props) {
    super(props);

    this.state.users.fetch()
      .then(this.forceUpdate.bind(this, null));
  }

  render () {
    return <div>
      <h2><I18n string="title_users" /></h2>
      <div className="btn-group">
        <Link href={`/users/new`} className="btn btn-primary"><I18n string="button_create_new" /></Link>
      </div>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Is Admin</th>
          </tr>
        </thead>
        <tbody>
          {this.state.users.map(function (user) {
            let path = `/users/${user.id}`;
            return <tr key={user.id}>
              <td><Link href={path}>{user.id}</Link></td>
              <td>{user.get('firstName')}</td>
              <td>{user.get('lastName')}</td>
              <td>{user.get('admin') === true ? 'Yes' : 'No'}</td>
            </tr>;
          })}
        </tbody>
      </table>
    </div>;
  }

}
