import React from 'react'

const Paragraph3 = ({Cx0, stala}) => {
  return (
    <div>
      <h2 className='text-2xl font-bold'>4.) Moc niezbędna do wykonania zakrętu</h2>
      <h4><span><p>Moc niezbędna do wykonania zakrętu dana jest następującym wzorem:</p></span></h4>
      <h4 className='font-bold'><span><p>N<sub>n-zakr</sub>=N<sub>n</sub>*cos<sup>(-1.5)</sup>(&phi;)</p></span></h4>
      <span><p>,gdzie</p></span>
      <h4  className='font-bold'><span><p>N<sub>N</sub>=P<sub>X</sub>*V=&#189;*&rho;*S*C<sub>X</sub>*V<sup>3</sup></p></span></h4>
      <span><p><span className='font-bold'>C<sub>X</sub></span> w powyższym wzorem wyznacza się zwykle metodą używaną, m. in. podczas przedmiotu Mechanika Lotu 1 w realizowanych wówczas 
      projektach 2 i 3. Dzięki wartościom podanym na początku strony można oszacować <span className='font-bold'>C<sub>X</sub></span> w stosunku do <span className='font-bold'> C<sub>Z</sub></span>, dzięki tzw. biegunowej analitycznej</p></span>
      <span><p>I tak jest ona dana jako: </p></span>
      <h4 className='font-bold'>C<sub>X</sub> = C<sub>X0</sub>+C<sub>Z</sub><sup>2</sup>*&pi;<sup>-1</sup>*&Lambda;<sup>-1</sup><sub>e</sub></h4>
      <span><p>Co po podstawieniu liczbowych wartości daje nam:</p></span>
      <div style={{ fontWeight: 'bold' , color: 'blue'}}>
      <span><p> C<sub>X</sub> = {Cx0} + {stala.toFixed(2)}*C<sub>Z</sub><sup>2</sup></p></span></div>
    
      <div className='flex flex-row' style={{ marginLeft: '305px' }}>
      <h2 className='text-2xl'>
        <span>
          <p>Tabele z wartościami <span className='font-bold'>N<sub>n</sub></span>, <span className='font-bold'>N<sub>n-zakr</sub></span> oraz <span className='font-bold'>C<sub>Z</sub></span> dla poszczególnych prędkości</p>
        </span>
      </h2>
    </div>
    </div>
  )
}

export default Paragraph3
