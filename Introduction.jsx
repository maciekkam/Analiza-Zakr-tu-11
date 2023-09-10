import React from 'react';

const Introduction = () => {
  return (
    <div>
      <h2 className='text-2xl font-bold'>3.) Współczynnik siły nośnej wymagany do wykonania zakrętu</h2>
      <h4>
        <span>
          <p>Wymagany współczynnik siły nośnej do wykonania zakrętu określa zależność:</p>
        </span>
      </h4>
      <h4 className='font-bold'>
        Cz = (2 * m * g) / (&rho; * S * V<sup>2</sup>) * (1 / cos(&phi;))
      </h4>
      <h4>
        <span>
          <p>przy czym trzeba pamiętać o ograniczeniu ze względu na <span className='font-bold'>Cz<sub>MAX</sub></span></p>
        </span>
      </h4>
    </div>
  );
};

export default Introduction;
