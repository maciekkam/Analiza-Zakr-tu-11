import React from 'react';

const Radius = ({tableStyles, cellStyles, RadiusTable, angle}) => {
  // Styl dla pogrubionego tekstu
  const boldCellStyles = {
    ...cellStyles,
    fontWeight: 'bold'
  };

  return (
    <div>
     <table style={tableStyles}>
      <thead>
        <tr>
          <th style={cellStyles} rowSpan={2}>V [m/s]</th>
          <th style={cellStyles} colSpan={15}>R[m]</th>
        </tr>
        <tr>
          {Array.from({length: 15}, (_, i) => i * 5 + 5).map((angle) => (
            <th key={angle} style={cellStyles}> &phi; {angle} [°]</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Array.isArray(RadiusTable) ? RadiusTable.map((row, index) => (
          <tr key={index}>
            {Array.isArray(row) ? row.map((cell, cellIndex) => (
              <td key={cellIndex} style={cellIndex === 0 ? boldCellStyles : cellStyles}>
                {typeof cell === 'number' ? cell.toFixed(2) : cell}
              </td>
            )) : null}
          </tr>
        )) : null}
      </tbody>
    </table>
      <h4 className='font-bold'>
        <span>
          <p>
            Tabela zależności promienia zakrętu dla poszczególnych prędkości i kątów przechylenia oraz graniczne wartości promienia zakrętu i prędkości.
          </p>
        </span>
      </h4>
    </div>
    
  );
}

export default Radius;
