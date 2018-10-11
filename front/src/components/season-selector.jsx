import React from 'react';

function SeasonSelector({ onSelect }) {
  const seasons = [
    '2018-19',
    '2017-18',
    '2016-17',
    '2015-16',
    '2014-15',
    '2013-14',
    '2012-13',
    '2011-12',
  ]
  return (
    <div className="season-selector">
      Välj säsong:
      <select onChange={ onSelect }>
        {
          seasons.map(season => {
            return <option key={ season }>{ season }</option>;
          })
        }
      </select>
    </div>
  )
}

export default SeasonSelector;
