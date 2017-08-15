import React from 'react';
import ReactDOM from 'react-dom';
import {
 BrowserRouter as Router,
 Route
} from 'react-router-dom';

import Home from './containers/Home';
import Login from './containers/Login';
import { registerHelpers } from './HandlebarsHelpers';

registerHelpers();

const Application = () => (
  <Router>
    <div>
      <Route exact path="/" component={Home} />
      <Route path="/login" component={Login} />
    </div>
  </Router>
)

ReactDOM.render(
  <Application />,
  document.getElementById('container')
);
