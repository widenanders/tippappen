import React from 'react';

import Table from './table.jsx';

function UserTable({ userName, season, standings }) {
  const teams = season && season.table.map((team, i) => {
    if (standings) {
      const answer = standings.find(item => {
        return item.team_code.toUpperCase() === team.code.toUpperCase()
      });
      const diff = answer && Math.abs(i + 1  - answer.rank);
      return {
        name: team.name,
        actualRank: answer && answer.rank,
        score: diff === 0 ? 3 : (diff === 1 ? 1 : 0),
        code: team.code
      }
    }
  });

  return !teams ? null : (
    <div className="hej">
      <div className="user-name">{ `User: ${userName}` }</div>
      <Table
        teams={ teams }
      />
    </div>
  );
}

export default UserTable;
