import React from 'react';
import Security from 'security';
import TopMenu from 'components/menu/TopMenu';

export default class Application extends React.Component {

  render() {
    return <div>
        <TopMenu user={Security.user} />
        <div id="content">{this.props.children}</div>
      </div>;
  }

}
