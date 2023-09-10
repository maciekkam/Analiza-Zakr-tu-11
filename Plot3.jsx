import React from 'react'
import Plotly from 'plotly.js-dist';
import Plot from 'react-plotly.js';

const Plot3 = ({maxSpeed, plot3Data}) => {
  return (
    <div style={{ fontWeight: 'bold', fontStyle: 'italic', textDecoration: 'underline', color: 'red' }}>    <Plot
      data={plot3Data}
      layout={{
        title: 'Nn-zakr w zależności od V dla różnych Fi',
        xaxis: { title: 'Prędkość [m/s]', range: [30, maxSpeed] },
        yaxis: { title: 'Nn-Zakr [kW]', range: [0, 2000] },
      }}
    />
  </div>
  )
}

export default Plot3