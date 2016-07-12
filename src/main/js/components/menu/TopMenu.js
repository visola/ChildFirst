import React from "react";

import Dropdown from 'components/bootstrap/Dropdown'
import DropdownItem from 'components/bootstrap/DropdownItem'
import DropdownMenu from 'components/bootstrap/DropdownMenu'
import Link from 'components/Link';

export default class TopMenu extends React.Component {

  render () {
    return <nav className="navbar navbar-default" role="navigation">
      {this.renderHeader()}
      {this.renderMenus()}
    </nav>;
  }

  renderHeader() {
    return <div className="navbar-header">
      <Link className="navbar-brand" href="/">Child First</Link>
    </div>;
  }

  renderIcons() {
    return <ul className="nav navbar-nav navbar-right">
      <Dropdown icon={"fa fa-user fa-fw"}>
        <DropdownMenu>
          <DropdownItem href="/profile" icon="fa fa-user fa-fw" title={this.props.user.sub} />
          <li className="divider"></li>
          <DropdownItem href="/logout" icon="fa fa-sign-out fa-fw" title="Logout" />
        </DropdownMenu>
      </Dropdown>
    </ul>;
  }

  renderMenus() {
    if (this.props.user) {
      return <div className="collapse navbar-collapse">
        {this.renderMenu()}
        {this.renderIcons()}
      </div>;
    }
  }

  renderMenu() {
    return <ul className="nav navbar-nav">
      {this.renderAdminMenu()}
      {this.renderSchoolMenu()}
    </ul>;
  }

  renderAdminMenu() {
    if (this.props.user.isAdmin) {
      return <Dropdown title="Administration">
        <DropdownMenu>
          <DropdownItem href="/schools" titleKey="label_schools" />
          <DropdownItem href="/users" titleKey="label_users" />
        </DropdownMenu>
      </Dropdown>;
    }
  }

  renderSchoolMenu() {
    return <Dropdown title="School">
      <DropdownMenu>
        <DropdownItem href="/branches" titleKey="label_branches" />
      </DropdownMenu>
    </Dropdown>;
  }

}
