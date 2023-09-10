import React from 'react';

const Paragraph4 = ({maxSpeed, Px, density, stala, CzMax, Cx0, S} ) => {
  
  // Sprawdzenie, czy maxSpeed jest liczbą i konwersja jeśli to konieczne
  const maxSpeedNumber = typeof maxSpeed === 'number' ? maxSpeed : Number(maxSpeed);

  // Jeżeli maxSpeedNumber nie jest liczbą, wartość będzie NaN, więc warto to również sprawdzić
  const displayMaxSpeed = !isNaN(maxSpeedNumber) ? maxSpeedNumber.toFixed(2) : "Nieokreślona";

  return (
    <div className='flex flex-col mr-5' style ={{ marginTop: '100px' }}>
    <h5><span><p>Wykres wskazuje nam moce niezbędne do wejścia w zakręt. Moc nie może być większa niż rozporządzalna, gdyż samolot nie dysponuje taką mocą. Możemy
        również operować jedynie w zakresie prędkości większych niż prędkość dla kąt granicznego, który wynika z ograniczenia na moc dla maksymalnego współczynnika siły nośnej
        oraz jego punktu przecięcia z wykresem <span className='font-bold'>Nr</span>, a także ogranicza nas maksymalna prędkość samolotu w ruchu poziomym, powyżej której jak zadeklarowano na początku programu samolot nie może lecieć.</p></span></h5>
        <span><p>Z wykresu można wyznaczyć:</p></span> 
  <ul>
    <li>Maksymalną prędkość lotu poziomego <span className='font-bold'>V<sub>MAX-POZ</sub>={displayMaxSpeed} m/s</span></li>
    <li>Moc niezbędna do pokonania zakrętu oraz prędkość lotu dla kąta granicznego to odpowiednio: <span className='font-bold'> N<sub>NIEZB</sub> = {(Px*0.85*0.001).toFixed(2)} kW </span> oraz <span className='font-bold'> V<sub>GRAN</sub> = {(((0.85 * Px * 2) / (density * S * (stala * CzMax ** 2 + Number(Cx0)))) ** (1 / 3)).toFixed(2)} m/s</span>
 </li>
  </ul>
    </div>
  )
}

export default Paragraph4;
