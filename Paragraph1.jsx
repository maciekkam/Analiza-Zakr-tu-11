import React from 'react'

const Paragraph1 = ({CzMax}) => {
  return (
    <div>
    <h2 className='text-2xl font-bold'>1.) Maksymalny kąt przechylenia</h2>
    <p>
      Maksymalny kąt przechylenia określony jest w zależności od dopuszczalnego współczynnika obciążeń, zgodnie ze wzorem:
      <span className='font-bold'> &phi;<sub>MAX</sub>=arccos(1&frasl;m<sub>g</sub>)</span>
    </p>
    <p>
      Gdzie za kąt <span className='font-bold'> &phi; </span>  przyjmujemy maksymalną wartość <span className='font-bold'> &phi;<sub>MAX</sub></span>. 
      </p>
     <p> Dopuszczalny współczynnik obciążeń (po lewej stronie wzoru) przyjmuje się równy <span className='font-bold'>3.8</span> (zgodnie z przepisami <span className='font-bold'>JAR-23</span>). 
    </p>
    Jest to największy dopuszczalny współczynnik dla klasycznych samolotów nieakrobacyjnych.
    <span><p>Skąd dostajemy: </p></span>
    <p></p>
    <h4 className='font-bold'><span><p>  &phi;<sub>MAX</sub>=arccos(<span>1</span> &frasl; <span>3.8</span>)=75&deg;</p></span></h4>
      <h2 className='text-2xl font-bold'>2.) Promień zakrętu w funkcji prędkości lotu i kąta przechylenia</h2>
    <span><p>Dla kątów przechylenia od 0 do 75 stopni, oraz szeregu prędkości (co 10 mniejszych od maksymalnej aż do 0) oblicza się
      promień zakrętu z zależności: </p></span>
    <h4 className='font-bold'><span>R = V<sup>2</sup>&frasl;(g*tan(&phi;))</span></h4>
    <span><p>Dodatkowo uwzględnia się ograniczenie ze względu na maksymalną wartość współczynnika siły nośnej</p></span>    
    <div><h4 className='font-bold'><span><p> Cz<sub>MAX</sub> = {CzMax} </p></span></h4></div>
    <span><p>Oblicza się graniczne prędkości dla zakręcania przy tym współczynniku:</p></span>       
    <h4 className='font-bold'>Cz = (2 * m * g) / (&rho; * S * V<sup>2</sup>) * (1 / cos(&phi;))</h4>
    <span><p>Skąd wynika, że</p></span> 
    <h4 className='font-bold'><span><p>V<sub>Gran_Cz_MAX</sub>=&radic;((2*m*g)&frasl;(&rho;*Cz<sub>MAX</sub>*cos(&phi;)))</p></span></h4>
    <span><p>i dla tej prędkości oblicza się potem graniczny promień zakrętu 
    <h4 className='font-bold'>R<sub>Cz_MAX</sub></h4> z poprzedniej zależności. </p></span> 
    </div>
  )
}

export default Paragraph1
