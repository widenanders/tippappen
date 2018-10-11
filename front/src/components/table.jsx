import React from 'react';

function Table({teams}) {
  const totalScore = teams.reduce((total, team) => total += team.score, 0);
  return (
    <table className="user-table">
      <thead className="user-table-head">
        <tr>
          <th></th>
          <th></th>
          <th style={{textAlign: 'left'}}>Team</th>
          <th>Actual rank</th>
          <th>Points</th>
        </tr>
      </thead>
      <tbody>
        {teams.map((team, i) => {
          return (
            <tr className="user-table-row" key={ i }>
              <td style={{textAlign: 'right'}}>{ i + 1 }</td>
              <td className="user-table-team-logo">
                <img src={ `src/assets/img/${team.code}.png` } />
              </td>
              <td className="user-table-team-name">{ team.name }</td>
              <td className="text-center">{ team.actualRank }</td>
              <td className="text-center">{ team.score }</td>
            </tr>
          )
        })}
      </tbody>
      <tfoot>
        <tr>
          <th></th>
          <th></th>
          <th></th>
          <th  className="text-right">Your total score:</th>
          <th>{totalScore}</th>
        </tr>
      </tfoot>
    </table>
  )
}

export default Table;
