import React from 'react'
import Plotly from 'plotly.js-dist';
import Plot from 'react-plotly.js';


const Plot1 = ({plotData}) => {
  return (
    <div style={{ fontWeight: 'bold', fontStyle: 'italic', textDecoration: 'underline', color: 'red' }}>
    <Plot
      data={plotData}
      layout={{
        title: 'Promień zakrętu w funkcji prędkości oraz kąta przechylenia',
        xaxis: { title: 'Prędkość [m/s]' },
        yaxis: { title: 'Promień zakrętu [m]'},
      }}
    />
  </div>
  )
}

export default Plot1