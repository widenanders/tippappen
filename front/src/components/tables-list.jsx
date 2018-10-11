import React from 'react';

import UserTable from './user-table.jsx';

function TablesList({ users, selectedSeason, standings }) {
  return (
    <div className="flex">
      {
        users.map(user => {
          return (
            <UserTable
              key={ user.name }
              userName={ user.name }
              season={ user[selectedSeason] }
              standings={standings}
            />
          )}
        )
      }
    </div>
  )
};

export default TablesList;
