import React from 'react';
import Plotly from 'plotly.js-dist';
import Plot from 'react-plotly.js';

const Plot5 = ({ maxSpeed, CzMax, plot4Data }) => {
  return (
    <div>
      <div>
        <Plot
          data={plot4Data}
          layout={{
            title: 'R oraz φ w zależności od V',
            xaxis: { title: 'V [m/s]', range: [0, maxSpeed] },
            yaxis: { title: 'R[m] oraz φ [deg.]', range: [0, 2000] },
          }}
        />
      </div>
      <div>
        <h4 style={{ marginLeft: '80px' }}>
          <span>
            <p>
              Promień zakrętu oraz kąt przechylenia dla zakrętu na stałym kącie natarcia{' '}
              <span className='font-bold'>
                (C<sub>Z</sub>={(0.8 * CzMax).toFixed(2)})
              </span>
            </p>
          </span>
        </h4>
      </div>
    </div>
  );
};

export default Plot5;
