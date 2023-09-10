import React from 'react'
import Plotly from 'plotly.js-dist';
import Plot from 'react-plotly.js';

const Plot2 = ({plot2Data}) => {
  return (
    <div style={{ fontWeight: 'bold', fontStyle: 'italic', textDecoration: 'underline', color: 'red' }}>
    <Plot
      data={plot2Data}
      layout={{
        title: 'Wspolczynnik sily nosnej niezbedny do wykonania zakretu',
        xaxis: { title: 'V [m/s]' },
        yaxis: { title: 'Cz [1]', range: [0, 2.5] },
      }}
    />
  </div>
  )
}

export default Plot2