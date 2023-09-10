import React from 'react';

const Gran = ({ tableStyles, cellStyles, data }) => {
  return (
    <div>
      {data && data.fiDegs && data.V_granczmaxs && data.R_granczmaxs ? (
        <table style={tableStyles}>
          <thead>
            <tr>
              <th style={cellStyles}>Kąt &phi; (°)</th>
              {data.fiDegs.map((value, index) => (
                <th key={index} style={cellStyles}>
                  {value}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <th style={cellStyles}>V_granczmax [m/s]</th>
              {data.V_granczmaxs.map((value, index) => (
                <td key={index} style={cellStyles}>
                  {value.toFixed(2)}
                </td>
              ))}
            </tr>
            <tr>
              <th style={cellStyles}>R_granczmax [m]</th>
              {data.R_granczmaxs.map((value, index) => (
                <td key={index} style={cellStyles}>
                  {value.toFixed(2)}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      ) : (
        <p>Dane są niekompletne lub nieistniejące.</p>
      )}
      <p></p>
    </div>
  );
};

export default Gran;
