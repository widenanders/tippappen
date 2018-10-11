import React from 'react';
import firebase from 'firebase/app';
import SeasonSelector from './season-selector.jsx';
import TablesList from './tables-list.jsx';
import Loading from './loading.jsx'

require("firebase/database");

firebase.initializeApp({
  apiKey: 'AIzaSyBEUCjPNLUrP93EwF2r6ZdPckWwWm1PpGo',
  authDomain: "https://tippafett.firebaseapp.com",
  databaseURL: 'https://tippafettdevelop.firebaseio.com/',
  storageBucket: 'gs://tippafett.appspot.com'
});

const usersRef = firebase.database().ref().child('users');

function getCurrentSeason() {
  const JULY = 6;
  const date = new Date();
  const passedJuly = date.getMonth() > JULY;
  const current = date.getFullYear();
  const next = current - 2000 + 1;
  return passedJuly
    ? `${ current }-${ next }`
    : `${ current - 1 }-${ next - 1 }`;
}

class Entry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedSeason: getCurrentSeason(),
      accessData: null,
      season: null,
      standings: null,
      users: null,
      isLoading: true,
    };
  }

  componentDidMount() {
    this.setState({
      isLoading: true
    });
    usersRef.on('value', snapshot => {
      this.setState({
        users: snapshot.val()
      })
    })
    fetch('http://18.130.171.87:8080/fetchtoken', { method: 'POST' })
      .then(response => response.json())
      .then(data => this.setState({accessData: data}, this.fetchTable));
  }

  fetchTable() {
    this.setState({
      isLoading: true
    });
    fetch('http://18.130.171.87:8080/fetchtable', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify({
        accessData: this.state.accessData,
        season: this.state.selectedSeason
      })
    })
      .then(response => response.json())
      .then(data => this.setState({
        standings: data,
        isLoading: false
      }));
  }

  onSeasonSelect = e => {
    const selectedSeason = e.currentTarget.value;
    this.setState({
      selectedSeason,
    }, this.fetchTable);
  }

  render() {
    if (!this.state.users) return null;
    const users = Object.keys(this.state.users).map(user => this.state.users[user]);
    return this.state.standings && (
      <div>
        <div className="page-header">
            <h1>Tippappen</h1>
            <SeasonSelector
              season={this.state.selectedSeason}
              onSelect={ this.onSeasonSelect }
            />
        </div>
        <TablesList
          users={ users }
          standings={this.state.standings}
          selectedSeason={ this.state.selectedSeason }
        />
        { this.state.isLoading && <Loading /> }
      </div>
    );
  }
};

export default Entry;
