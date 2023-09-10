import React from 'react';
import Plotly from 'plotly.js-dist';
import Plot from 'react-plotly.js';

const Plot4 = ({ maxSpeed, CzMax, LoadFactorTable }) => {
  return (
    <div>
      <div>
        <Plot
          data={LoadFactorTable}
          layout={{
            title: 'Współczynnik obciążeń dla zakrętu na stałym kącie natarcia',
            xaxis: { title: 'Prędkość [m/s]', range: [0, maxSpeed] },
            yaxis: { title: 'M_g[1]', range: [0, 7] },
          }}
        />
      </div>
      <div>
        <h4 style={{ marginLeft: '80px' }}>
          <span>
            <p>
              Współczynnik obciążeń dla zakrętu na stałym kącie natarcia{' '}
              <span className='font-bold'>
                {' '}
                (C<sub>z</sub>={(0.8 * CzMax).toFixed(2)})
              </span>
            </p>
          </span>
        </h4>
      </div>
    </div>
  );
};

export default Plot4;
