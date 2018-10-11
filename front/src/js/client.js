import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Entry from '../components/entry.jsx';

class Layout extends Component {
  render() {
    return <Entry />
  }
}

const app = document.getElementById('app');

ReactDOM.render(<Layout/>, app);
