import React from 'react';

const Paragraph5 = ({ stala, Cx0 }) => {
  const formattedCx0 = Cx0 ? parseFloat(Cx0).toFixed(2) : 'N/A';
  const formattedStala = stala ? parseFloat(stala).toFixed(2) : 'N/A';
  return (
    <div>
      <span>
        <p>
          Korzystając z wypisanych wcześniej zależności otrzymujemy zależność,
          z której numerycznie można wyznaczyć kąt graniczny, dla którego tylko
          dla jednej prędkości moc niezbędna do pokonania zakrętu pokrywa się z
          mocą rozporządzalną.
        </p>
      </span>

      <div>
        <h4 className='font-bold'>
          <span>
            <p>
              N<sub>N-ZAKR</sub>=&#189;*&rho;*S*V<sup>3</sup>*cos<sup>-1.5</sup>(&phi;)*[{formattedStala}*(2*m*g)&frasl;(&rho;*S*V<sup>2</sup>*cos(&phi;))+
              {formattedCx0}]
            </p>
          </span>
        </h4>
      </div>

      <span>
        <p>
          Wynika stąd, że <h4 className='font-bold'>&phi;<sub>GRAN</sub>[&deg;]</h4> możemy wyznaczyć, gdy 
          <h4 className='font-bold'>
            <p>
              N<sub>N-ZAKR</sub>=&#189;*&rho;*S*V<sup>3</sup>*cos<sup>-1.5</sup>(&phi;)*[{formattedStala}*(2*m*g)&frasl;(&rho;*S*V<sup>2</sup>*cos(&phi;))+
              {formattedCx0}] = 0,85*P<sub>X</sub>
            </p>
          </h4>
        </p>
      </span>

      <span>
        <p>
          co jest możliwym do wykonania po przekształceniach zadaniem numerycznym, które w ogólności bez działania na konkretnych liczbach przerasta niestety możliwości stosowanego oprogramowania i jako takie zostało pominięte w tym projekcie.
        </p>
      </span>
    </div>
  );
};

export default Paragraph5;
