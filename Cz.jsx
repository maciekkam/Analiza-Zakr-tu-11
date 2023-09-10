import React from 'react';

const Cz = ({ tableStyles, cellStyles, czTable }) => {
  const boldCellStyles = {
    ...cellStyles,
    fontWeight: 'bold'
  };

  return (
    <div>
      {czTable ? (
        <table style={tableStyles}>
          <thead>
            <tr>
              <th style={cellStyles}>V [m/s]</th>
              {Array.from({ length: 15 }, (_, i) => i * 5 + 5).map((angle) => (
                <th key={angle} style={cellStyles}>
                  &phi; {angle} [°]
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {czTable.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} style={cellIndex === 0 ? boldCellStyles : cellStyles}>
                    {typeof cell === 'number' ? cell.toFixed(2) : cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Dane są niekompletne lub nieistniejące.</p>
      )}
          <h4 className='font-bold'>
        <span>
          <p>
Tabela zależności Cz dla różnych prędkości i różnych kątów przechylenia
          </p>
        </span>
      </h4>
    </div>
  );
};

export default Cz;
