import React from 'react';

const Table = ({ tableStyles, cellStyles, PowerTable, angle }) => {
  const borderStyles = {
    border: '1px solid black',
  };

  const boldCellStyles = {
    ...cellStyles,
    ...borderStyles,
    fontWeight: 'bold',
  };

  return (
    <table style={{ ...tableStyles, ...borderStyles }}>
      <caption style={{ ...borderStyles, padding: '5px' }}><h3 className='font-bold'>FI = {angle}°</h3></caption>
      <thead>
        <tr style={borderStyles}>
          <th style={{ ...cellStyles, ...borderStyles }}>V[m/s]</th>
          <th style={{ ...cellStyles, ...borderStyles }}>Nr[kW]</th>
          <th style={{ ...cellStyles, ...borderStyles }}>Cz[1]</th>
          <th style={{ ...cellStyles, ...borderStyles }}>Cx[1]</th>
          <th style={{ ...cellStyles, ...borderStyles }}>Nn[kW]</th>
          <th style={{ ...cellStyles, ...borderStyles }}>Nn-Zakr[kW]</th>
        </tr>
      </thead>
      <tbody>
        {PowerTable.map((row, rowIndex) => (
          <tr key={rowIndex} style={borderStyles}> 
            {row.map((cell, cellIndex) => (
              <td key={cellIndex} style={cellIndex === 0 ? boldCellStyles : { ...cellStyles, ...borderStyles }}>
                {typeof cell === 'number' ? cell.toFixed(2) : cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
