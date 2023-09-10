import React, { useState, useEffect} from 'react';
import Plotly from 'plotly.js-dist';
import Plot from 'react-plotly.js';
import Table from './components/Table';
import InputGroup from './components/InputGroup';
import Radius from './components/Radius';
import Paragraph1 from './components/Paragraph1';
import Paragraph2 from './components/Paragraph2';
import Paragraph3 from './components/Paragraph3';
import Paragraph4 from './components/Paragraph4';
import Paragraph5 from './components/Paragraph5';
import Introduction from './components/Introduction';
import Gran from './components/Gran';
import Cz from './components/Cz';
import Plot1 from './components/Plot1';
import Plot2 from './components/Plot2';
import Plot3 from './components/Plot3';
import Plot4 from './components/Plot4';
import Plot5 from './components/Plot5';

const tableStyles = {
  borderCollapse: 'collapse'
};
const cellStyles = {
  border: '1px solid black',
  padding: '5px'
};
const App = () => {
  const [CzMax, setCzMax] = useState(1.6);
  const [mass, setMass] = useState(1100);
  const [density, setDensity] = useState(0.81);
  const [maxSpeed, setMaxSpeed] = useState(83.89);
  const [Cx0, setCx0] = useState(0.027);
  const [Lambda_e, setLambda_e] = useState(7.7);
  const [S, setS] = useState(16.16);
  const [Px, setPx] = useState(108126);
  const g = 9.81; // przyspieszenie ziemskie
  let stala = 3.14159253749**(-1)*Lambda_e**(-1);
  const calculateVgranczmax = (fi) => Math.sqrt((2*mass*g)/(density*S*CzMax*Math.cos(fi)));
  const calculateRgranczmax = (V_granczmax, fi) => (V_granczmax**2)/(g*Math.tan(fi));
    const data = {
      fiDegs: [],
      V_granczmaxs: [],
      R_granczmaxs: []
    };
    for (let fiDeg = 5; fiDeg <= 75; fiDeg += 5) {
      const fi = fiDeg * Math.PI / 180; // konwersja na radiany
      const V_granczmax = calculateVgranczmax(fi);
      const R_granczmax = calculateRgranczmax(V_granczmax, fi);
      data.fiDegs.push(fiDeg);
      data.V_granczmaxs.push(V_granczmax);
      data.R_granczmaxs.push(R_granczmax);
    }
  const calculateRadiusTable = () => {
    let rows = [];
    for (let speed = maxSpeed; speed >= 30; speed -= 10) {
      let row = [];
      row.push(speed);
      for (let angle = 5; angle <= 75; angle += 5) {
        let angleRad = angle * Math.PI / 180; // konwersja  na radiany
        let R = ((speed **2) / (g * Math.tan(angleRad)));
        row.push(R);
      }
      rows.push(row);
    }
    return rows;
  };
  const RadiusTable = calculateRadiusTable();
  const createPlotData = () => {
    const plotData = [];
    const speeds = RadiusTable.map(row => row[0]); // prędkości z  tablicy
    for (let col = 1; col <= 15; col++) { // dla każdego kąta fi
      const trace = {
        type: 'scatter',
        mode: 'lines',
        name: `Fi ${(col - 1) * 5 + 5} [deg]`, // nazwa linii
        x: speeds,
        y: RadiusTable.map(row => row[col]), // promienie zakrętu dla danego kąta
      };
      plotData.push(trace);
    }
      // Załóżmy, że minV i minR to odpowiednio minimalna prędkość i promień.
      const minV = data.V_granczmaxs[0];
      const minR = data.R_granczmaxs[0];
  // Dodajemy pionową linię
  plotData.push({
    type: 'scatter',
    mode: 'lines',
    name: 'Rgran_czmax',
    x: [minV, minV],
    y: [0, minR],
    line: {width: 5, dash: 'dash'},
  });
  // Dodajemy linię dla zależności V_granczmax(R_granczmax)
  plotData.push({
    type: 'scatter',
    mode: 'lines',
    name: 'Vmin_poz',
    x: data.V_granczmaxs,
    y: data.R_granczmaxs,    
    line: {width: 5, dash: 'dash'},
  });
    return plotData;
  };
  const plotData = createPlotData();
  const calculateCzTable = () => {
    let rows = [];
    for (let speed = maxSpeed; speed >= 30; speed -= 10) {
      let row = [];
      row.push(speed);
      for (let angle = 5; angle <= 75; angle += 5) {
        let angleRad = angle * Math.PI / 180; // konwersja na radiany
        let Cz = (2 * mass * g) / (density * CzMax * speed ** 2) * (1 / Math.cos(angleRad));
        row.push(Cz);
      }
      rows.push(row);
    }
    return rows;
  };
  const czTable = calculateCzTable();
  const createPlot2Data = () => {
    const plot2Data = [];
    const speeds = czTable.map(row => row[0]); // prędkości z  tablicy
    for (let col = 1; col <= 15; col++) { // dla każdego kąta fi
      const trace = {
        type: 'scatter',
        mode: 'lines',
        name: `Fi ${(col - 1) * 5 + 5} [deg]`, // nazwa linii
        x: speeds,
        y: czTable.map(row => row[col]), // promienie zakrętu dla danego kąta
      };
      plot2Data.push(trace);
    }
      // Załóżmy, że minV i minR to odpowiednio minimalna prędkość i promień.
      const minV = data.V_granczmaxs[0];    
  // Dodajemy pionową linię
  plot2Data.push({
    type: 'scatter',
    mode: 'lines',
    name: `CzMax=${CzMax}`, 
    x: [minV, maxSpeed],
    y: [CzMax, CzMax],
    line: {width: 5, dash: 'dash'},
  });
    return plot2Data;
  };
  const plot2Data = createPlot2Data();
  const calculatePowerTable0 = () => {
    let rows = [];
    for (let speed = maxSpeed; speed >= 30; speed -= 10) {
      let row = [];
      row.push(speed);
      let Nr=Px*0.85*0.001;
      row.push(Nr);
      let Cz = ((2 * mass * g) / (density * S * speed ** 2));
      row.push(Cz);
      let Cx = Number(Cx0) + stala*Cz **2;
      row.push(Cx);
      let Nn = (0.001*0.5*density*S*Cx*speed **3);
      row.push(Nn);
      let Nn_zakr = Nn;
      row.push(Nn_zakr);
      rows.push(row);
    }
    return rows;
};
  const PowerTable0 = calculatePowerTable0();
  const calculatePowerTable5 = () => {
    let rows = [];
    for (let speed = maxSpeed; speed >= 30; speed -= 10) {
      let row = [];
      row.push(speed);
      let Nr=Px*0.85*0.001;
      row.push(Nr);
      let Cz = (2 * mass * g) / (density * S * speed ** 2) * (1 / Math.cos(0.08727));
      row.push(Cz);
      let Cx = stala*Cz **2 + Number(Cx0);
      row.push(Cx);
      let Nn = (0.001*0.5*density*S*Cx*speed **3);
      row.push(Nn);
      let Nn_zakr = Nn*1.01;
      row.push(Nn_zakr);
      rows.push(row);
    }
    return rows;
};
  const PowerTable5 = calculatePowerTable5();
  const calculatePowerTable10 = () => {
    let rows = [];
    for (let speed = maxSpeed; speed >= 30; speed -= 10) {
      let row = [];
      row.push(speed);
      let Nr=Px*0.85*0.001;
      row.push(Nr);
      let Cz = (2 * mass * g) / (density * S * speed ** 2) * (1 / Math.cos(0.1745));
      row.push(Cz);
      let Cx = stala*Cz **2 + Number(Cx0);
      row.push(Cx);
      let Nn = (0.001*0.5*density*S*Cx*speed **3);
      row.push(Nn);
      let Nn_zakr = Nn*1.02323;
      row.push(Nn_zakr);
      rows.push(row);
    }
    return rows;
};
  const PowerTable10 = calculatePowerTable10();
  const calculatePowerTable15 = () => {
    let rows = [];
    for (let speed = maxSpeed; speed >= 30; speed -= 10) {
      let row = [];
      row.push(speed);
      let Nr=Px*0.85*0.001;
      row.push(Nr);
      let Cz = (2 * mass * g) / (density * S * speed ** 2) * (1 / Math.cos(0.2618));
      row.push(Cz);
      let Cx = stala*Cz **2 + Number(Cx0);
      row.push(Cx);
      let Nn = (0.001*0.5*density*S*Cx*speed **3);
      row.push(Nn);
      let Nn_zakr = Nn*1.05338;
      row.push(Nn_zakr);
      rows.push(row);
    }
    return rows;
};
  const PowerTable15 = calculatePowerTable15();
  const calculatePowerTable20 = () => {
    let rows = [];
    for (let speed = maxSpeed; speed >= 30; speed -= 10) {
      let row = [];
      row.push(speed);
      let Nr=Px*0.85*0.001;
      row.push(Nr);
      let Cz = (2 * mass * g) / (density * S * speed ** 2) * (1 / Math.cos(0.3491));
      row.push(Cz);
      let Cx = stala*Cz **2 + Number(Cx0);
      row.push(Cx);
      let Nn = (0.001*0.5*density*S*Cx*speed **3);
      row.push(Nn);
      let Nn_zakr = Nn*1.0978;
      row.push(Nn_zakr);
      rows.push(row);
    }
    return rows;
};
  const PowerTable20 = calculatePowerTable20();
  const calculatePowerTable25 = () => {
    let rows = [];
    for (let speed = maxSpeed; speed >= 30; speed -= 10) {
      let row = [];
      row.push(speed);
      let Nr=Px*0.85*0.001;
      row.push(Nr);
      let Cz = (2 * mass * g) / (density * S * speed ** 2) * (1 / Math.cos(0.4363));
      row.push(Cz);
      let Cx = stala*Cz **2 + Number(Cx0);
      row.push(Cx);
      let Nn = (0.001*0.5*density*S*Cx*speed **3);
      row.push(Nn);
      let Nn_zakr = Nn*1.15901;
      row.push(Nn_zakr);
      rows.push(row);
    }
    return rows;
};
  const PowerTable25 = calculatePowerTable25();
  const calculatePowerTable30 = () => {
    let rows = [];
    for (let speed = maxSpeed; speed >= 30; speed -= 10) {
      let row = [];
      row.push(speed);
      let Nr=Px*0.85*0.001;
      row.push(Nr);
      let Cz = (2 * mass * g) / (density * S * speed ** 2) * (1 / Math.cos(0.5236));
      row.push(Cz);
      let Cx = stala*Cz **2 + Number(Cx0);
      row.push(Cx);
      let Nn = (0.001*0.5*density*S*Cx*speed **3);
      row.push(Nn);
      let Nn_zakr = Nn*1.24081;
      row.push(Nn_zakr);
      rows.push(row);
    }
    return rows;
};
  const PowerTable30 = calculatePowerTable30();
  const calculatePowerTable35 = () => {
    let rows = [];
    for (let speed = maxSpeed; speed >= 30; speed -= 10) {
      let row = [];
      row.push(speed);
      let Nr=Px*0.85*0.001;
      row.push(Nr);
      let Cz = (2 * mass * g) / (density * S * speed ** 2) * (1 / Math.cos(0.6109));
      row.push(Cz);
      let Cx = stala*Cz **2 + Number(Cx0);
      row.push(Cx);
      let Nn = (0.001*0.5*density*S*Cx*speed **3);
      row.push(Nn);
      let Nn_zakr = Nn*1.34882;
      row.push(Nn_zakr);
      rows.push(row);
    }
    return rows;
};
  const PowerTable35 = calculatePowerTable35();
  const calculatePowerTable40 = () => {
    let rows = [];
    for (let speed = maxSpeed; speed >= 30; speed -= 10) {
      let row = [];
      row.push(speed);
      let Nr=Px*0.85*0.001;
      row.push(Nr);
      let Cz = (2 * mass * g) / (density * S * speed ** 2) * (1 / Math.cos(0.6981));
      row.push(Cz);
      let Cx = stala*Cz **2 + Number(Cx0);
      row.push(Cx);
      let Nn = (0.001*0.5*density*S*Cx*speed **3);
      row.push(Nn);
      let Nn_zakr = Nn*1.49149;
      row.push(Nn_zakr);
      rows.push(row);
    }
    return rows;
};
  const PowerTable40 = calculatePowerTable40();
  const calculatePowerTable45 = () => {
    let rows = [];
    for (let speed = maxSpeed; speed >= 30; speed -= 10) {
      let row = [];
      row.push(speed);
      let Nr=Px*0.85*0.001;
      row.push(Nr);
      let Cz = (2 * mass * g) / (density * S * speed ** 2) * (1 / Math.cos(0.7854));
      row.push(Cz);
      let Cx = stala*Cz **2 + Number(Cx0);
      row.push(Cx);
      let Nn = (0.001*0.5*density*S*Cx*speed **3);
      row.push(Nn);
      let Nn_zakr = Nn*1.68179;
      row.push(Nn_zakr);      
      rows.push(row);
    }
    return rows;
};
  const PowerTable45 = calculatePowerTable45();
  const calculatePowerTable50 = () => {
    let rows = [];
    for (let speed = maxSpeed; speed >= 30; speed -= 10) {
      let row = [];
      row.push(speed);
      let Nr=Px*0.85*0.001;
      row.push(Nr);
      let Cz = (2 * mass * g) / (density * S * speed ** 2) * (1 / Math.cos(0.8727));
      row.push(Cz);
      let Cx = stala*Cz **2 + Number(Cx0);
      row.push(Cx);
      let Nn = (0.001*0.5*density*S*Cx*speed **3);
      row.push(Nn);
      let Nn_zakr = Nn*1.94043;
      row.push(Nn_zakr);
      rows.push(row);
    }
    return rows;
};
const PowerTable50 = calculatePowerTable50();
const calculatePowerTable55 = () => {
  let rows = [];
  for (let speed = maxSpeed; speed >= 30; speed -= 10) {
    let row = [];
    row.push(speed);
    let Nr=Px*0.85*0.001;
    row.push(Nr);
    let Cz = (2 * mass * g) / (density * S * speed ** 2) * (1 / Math.cos(0.9599));
    row.push(Cz);
    let Cx = stala*Cz **2 + Number(Cx0);
    row.push(Cx);
    let Nn = (0.001*0.5*density*S*Cx*speed **3);
    row.push(Nn);
    let Nn_zakr = Nn*2.30204;
    row.push(Nn_zakr);
    rows.push(row);
  }
  return rows;
};
  const PowerTable55 = calculatePowerTable55();
  const calculatePowerTable60 = () => {
    let rows = [];
    for (let speed = maxSpeed; speed >= 30; speed -= 10) {
      let row = [];
      row.push(speed);
      let Nr=(Px*0.85*0.001).toFixed(2);
      row.push(Nr);
      let Cz = (2 * mass * g) / (density * S * speed ** 2) * (1 / Math.cos(1.04719755));
      row.push(Cz);
      let Cx = stala*Cz **2 + Number(Cx0);
      row.push(Cx);
      let Nn = (0.001*0.5*density*S*Cx*speed **3);
      row.push(Nn);
      let Nn_zakr = Nn*2.82843;
      row.push(Nn_zakr); 
      rows.push(row);
    }
    return rows;
  };
    const PowerTable60 = calculatePowerTable60();
    const calculatePowerTable65 = () => {
      let rows = [];
      for (let speed = maxSpeed; speed >= 30; speed -= 10) {
        let row = [];
        row.push(speed);
        let Nr=Px*0.85*0.001;
        row.push(Nr);
        let Cz = (2 * mass * g) / (density * S * speed ** 2) * (1 / Math.cos(1.134));
        row.push(Cz);
        let Cx = stala*Cz **2 + Number(Cx0);
        row.push(Cx);
        let Nn = (0.001*0.5*density*S*Cx*speed **3);
        row.push(Nn);
        let Nn_zakr = Nn*3.6398;
        row.push(Nn_zakr);
        rows.push(row);
      }
      return rows;
    };
      const PowerTable65 = calculatePowerTable65();
      const calculatePowerTable70 = () => {
        let rows = [];
        for (let speed = maxSpeed; speed >= 30; speed -= 10) {
          let row = [];
          row.push(speed);
          let Nr=Px*0.85*0.001;
          row.push(Nr);
          let Cz = (2 * mass * g) / (density * S * speed ** 2) * (1 / Math.cos(1.222));
          row.push(Cz);
          let Cx = stala*Cz **2 + Number(Cx0);
          row.push(Cx);
          let Nn = (0.001*0.5*density*S*Cx*speed **3);
          row.push(Nn);
          let Nn_zakr = Nn*5;
          row.push(Nn_zakr);
          rows.push(row);
        }
        return rows;
      };
        const PowerTable70 = calculatePowerTable70();
        const calculatePowerTable75 = () => {
          let rows = [];
          for (let speed = maxSpeed; speed >= 30; speed -= 10) {
            let row = [];
            row.push(speed);
            let Nr=Px*0.85*0.001;
            row.push(Nr);
            let Cz = (2 * mass * g) / (density * S * speed ** 2) * (1 / Math.cos(1.309));
            row.push(Cz);
            let Cx = stala*Cz **2 + Number(Cx0);
            row.push(Cx);
            let Nn = (0.001*0.5*density*S*Cx*speed **3);
            row.push(Nn);
            let Nn_zakr = Nn*7.59461;
            row.push(Nn_zakr); 
            rows.push(row);
          }
          return rows;
        };  
        const PowerTable75 = calculatePowerTable75();
          const calculatePowerMaxTable = () => {
            let rows = [];
            for (let speed = maxSpeed; speed >= 30; speed -= 10) {
              let row = [];
              row.push(speed);
              let Nmax=0.001*0.5*density*S*(stala*(CzMax) **2 + Number(Cx0))*speed **3;
              row.push(Nmax);
              rows.push(row);
            }
            return rows;
          };
          const PowerMaxTable = calculatePowerMaxTable(); 
          const createPlotDataForNnZakr = () => {
            // Wyciągamy prędkości i Nn-zakr z PowerTable0
            const speeds0 = PowerTable0.map(row => row[0]);
            const nnZakr0 = PowerTable0.map(row => row[5]);
            const speeds5 = PowerTable5.map(row => row[0]);
            const nnZakr5 = PowerTable5.map(row => row[5]);
            const speeds10 = PowerTable10.map(row => row[0]);
            const nnZakr10 = PowerTable10.map(row => row[5]);
            const speeds15 = PowerTable15.map(row => row[0]);
            const nnZakr15 = PowerTable15.map(row => row[5]);
            const speeds20 = PowerTable20.map(row => row[0]);
            const nnZakr20 = PowerTable20.map(row => row[5]);
            const speeds25 = PowerTable25.map(row => row[0]);
            const nnZakr25 = PowerTable25.map(row => row[5]);
            const speeds30 = PowerTable30.map(row => row[0]);
            const nnZakr30 = PowerTable30.map(row => row[5]);
            const speeds35 = PowerTable35.map(row => row[0]);
            const nnZakr35 = PowerTable35.map(row => row[5]);
            const speeds40 = PowerTable40.map(row => row[0]);
            const nnZakr40 = PowerTable40.map(row => row[5]);
            const speeds45 = PowerTable45.map(row => row[0]);
            const nnZakr45 = PowerTable45.map(row => row[5]);
            const speeds50 = PowerTable50.map(row => row[0]);
            const nnZakr50 = PowerTable50.map(row => row[5]);
            const speeds55 = PowerTable55.map(row => row[0]);
            const nnZakr55 = PowerTable55.map(row => row[5]);
            const speeds60 = PowerTable60.map(row => row[0]);
            const nnZakr60 = PowerTable60.map(row => row[5]);
            const speeds65 = PowerTable65.map(row => row[0]);
            const nnZakr65 = PowerTable65.map(row => row[5]);
            const speeds70 = PowerTable70.map(row => row[0]);
            const nnZakr70 = PowerTable70.map(row => row[5]);
            const speeds75 = PowerTable75.map(row => row[0]);
            const nnZakr75 = PowerTable75.map(row => row[5]);
            const speedsmax = PowerMaxTable.map(row => row[0]);
            const nmax = PowerMaxTable.map(row => row[1]);
            const minV = data.V_granczmaxs[0];
            const Nr = Px*0.85*0.001;
            const Cx =  stala * CzMax **2 + Number(Cx0);
            const Vgran = ((0.85*Px*2)/(density*S*(stala*(CzMax) **2 + Number(Cx0)))) **(1/3);
            // Tworzymy dane dla wykresu
            return [
                {
                  type: 'scatter',
                  mode: 'lines',
                  name: 'Fi=0°',
                  x: speeds0,
                  y: nnZakr0,
                },
                {
                  type: 'scatter',
                  mode: 'lines',
                  name: 'Fi=5°',
                  x: speeds5,
                  y: nnZakr5,
                },
                {
                  type: 'scatter',
                  mode: 'lines',
                  name: 'Fi=10°',
                  x: speeds10,
                  y: nnZakr10,
                },
                {
                    type: 'scatter',
                    mode: 'lines',
                    name: 'Fi=15°',
                    x: speeds15,
                    y: nnZakr15,
                  },
                  {
                    type: 'scatter',
                    mode: 'lines',
                    name: 'Fi=20°',
                    x: speeds20,
                    y: nnZakr20,
                  },
                  {
                    type: 'scatter',
                    mode: 'lines',
                    name: 'Fi=25°',
                    x: speeds25,
                    y: nnZakr25,
                  },
                  {
                    type: 'scatter',
                    mode: 'lines',
                    name: 'Fi=30°',
                    x: speeds30,
                    y: nnZakr30,
                  },
                  {
                    type: 'scatter',
                    mode: 'lines',
                    name: 'Fi=35°',
                    x: speeds35,
                    y: nnZakr35,
                  },
                  {
                    type: 'scatter',
                    mode: 'lines',
                    name: 'Fi=40°',
                    x: speeds40,
                    y: nnZakr40,
                  },
                  {
                    type: 'scatter',
                    mode: 'lines',
                    name: 'Fi=45°',
                    x: speeds45,
                    y: nnZakr45,
                  },
                  {
                    type: 'scatter',
                    mode: 'lines',
                    name: 'Fi=50°',
                    x: speeds50,
                    y: nnZakr50,
                  },
                  {
                    type: 'scatter',
                    mode: 'lines',
                    name: 'Fi=55°',
                    x: speeds55,
                    y: nnZakr55,
                  },
                  {
                    type: 'scatter',
                    mode: 'lines',
                    name: 'Fi=60°',
                    x: speeds60,
                    y: nnZakr60,
                  },
                  {
                    type: 'scatter',
                    mode: 'lines',
                    name: 'Fi=65°',
                    x: speeds65,
                    y: nnZakr65,
                  },
                  {
                    type: 'scatter',
                    mode: 'lines',
                    name: 'Fi=70°',
                    x: speeds70,
                    y: nnZakr70,
                  },
                  {
                    type: 'scatter',
                    mode: 'lines',
                    name: 'Fi=75°',
                    x: speeds75,
                    y: nnZakr75,
                  },
                  {
                    type: 'scatter',
                    mode: 'lines',
                    name: `Nr`, 
                    x: [30, maxSpeed],
                    y: [Nr, Nr],
                    line: {width: 8},
                  },
                  {
                    type: 'scatter',
                    mode: 'lines',
                    name: `Vmax-poz`, 
                    x: [maxSpeed, maxSpeed],
                    y: [0, Nr],
                    line: {width: 5, dash: 'dash'},
                  },
                  {
                    type: 'scatter',
                    mode: 'lines',
                    name: `Phi-gran`, 
                    x: [Vgran, Vgran],
                    y: [0, Nr],
                    line: {width: 5, dash: 'dash'},
                  },
                  {
                    type: 'scatter',
                    mode: 'lines',
                    name: `Nmax`, 
                    x: speedsmax,
                    y: nmax,
                    line: {width: 4},
                  }
                ];
            };
                  const plot3Data = createPlotDataForNnZakr();
                  const calculateLoadFactorTable = () => {
                    let rows = [];
                    for (let speed = maxSpeed; speed >= 30; speed -= 10) {
                      let row = [];
                      row.push(speed);
                      let Cz = 0.8 * CzMax;
                      let MG = ((density * S * Cz * speed * speed) / (2 * mass * g));
                      row.push(MG);
                      rows.push(row);
                    }  
                    // Uwaga: Tutaj używamy `rows` zamiast `LoadFactorTable`
                    const speedsFacs = rows.map(row => row[0]);
                    const Factors = rows.map(row => row[1]);  
                    return [
                      {
                        type: "scatter",
                        mode: "lines",
                        name: "m-g(V)",
                        x: speedsFacs,
                        y: Factors,
                      },
                      {
                        type: "scatter",
                        mode: "lines",
                        name: "m-g z przepisów",
                        x: [30, maxSpeed],
                        y: [3.8, 3.8],
                      },
                    ];
                  };   
                  const LoadFactorTable = calculateLoadFactorTable();
                  const calculateLastPlotTable = () => {
                    let rows = [];
                    for (let speed = maxSpeed; speed >= 30; speed -= 10) {
                      let row = [];
                      row.push(speed);
                      let Cz = 0.8 * CzMax;
                      let acosArgumentMax = (2*mass*g)/(density*S*speed*speed*CzMax);
                      let acosArgument = (2*mass*g)/(density*S*speed*speed*Cz); 
                      if (acosArgumentMax > 1 || acosArgument > 1) {
                        // Pomiń tę iterację i przejdź do następnej
                        continue;
                      } 
                      let Fi_Cz_Max = Math.acos(acosArgumentMax) * (180 / Math.PI);
                      let Fi_Cz = Math.acos(acosArgument) * (180 / Math.PI);
                      row.push(Cz);
                      row.push(Fi_Cz_Max);
                      row.push(Fi_Cz);
                  
                      let Radius = (speed * speed) / (g * Math.tan(Fi_Cz * (Math.PI / 180)));
                      row.push(Radius);
                      rows.push(row);
                    }  
                    const speedsLast = rows.map(row => row[0]);
                    const Fimaxes = rows.map(row => row[2]);
                    const Fi80s = rows.map(row => row[3]);
                    const Radius = rows.map(row => row[4]);
                    return [
                      {
                        type: "scatter",
                        mode: "lines",
                        name: "Fi(V)",
                        x: speedsLast,
                        y: Fi80s,
                      },
                      {
                        type: "scatter",
                        mode: "lines",
                        name: "R(V)",
                        x: speedsLast,
                        y: Radius,
                      },
                      {
                        type: "scatter",
                        mode: "lines",
                        name: "Fi_mg_max",
                        x: [0, maxSpeed],
                        y: [75, 75],
                      },
                      {
                        type: "scatter",
                        mode: "lines",
                        name: "Fi_Cz_Max",
                        x: speedsLast,
                        y: Fimaxes,
                      },
                      {
                        type: "scatter",
                        mode: "lines",
                        name: "V-min",
                        x: [30, 30],
                        y: [0, 10000],
                      },
                      {
                        type: "scatter",
                        mode: "lines",
                        name: "V-Max",
                        x: [maxSpeed, maxSpeed],
                        y: [0, 10000],
                      }
                    ];
                  };     
                  const plot4Data = calculateLastPlotTable();
  return (
    <div className='m-5'>   
      <h1 className='text-6xl text-bold mb-5' style={{ marginLeft: '410px' }}>Analiza Zakrętu </h1> 
      <div className='flex flex-row'>
        <div className='flex flex-col mr-5'>
          <InputGroup title ={"Cz_Max - Maksymalny współczynnik oporu"} value ={CzMax} set={setCzMax} unit=' - '/>
          <InputGroup title ={"M_Max - Masa samolotu" } value ={mass} set={setMass} unit=' kg '/>
          <InputGroup title ={"Rho - Gęstość powietrza" } value ={density} set={setDensity} unit=' kg/m^3 '/>
          <InputGroup title ={"V_Max - Prędkość maksymalna" } value ={maxSpeed} set={setMaxSpeed} unit=' m/s '/>
          <InputGroup title ={"S - Pole powierzchni skrzydła "  } value ={S} set={setS} unit=' m^2 '/>
          <InputGroup title ={"N - Moc silnika "   } value ={Px} set={setPx} unit=' W '/>
          <InputGroup title ={"C_x0 - współczynnik oporu przy zerowej sile nośnej "  } value ={Cx0} set={setCx0} unit=' - '/>
          <InputGroup title ={"Lambda_e - wydłużenie efektywne "  } value ={Lambda_e} set={setLambda_e} unit=' - '/>
        </div>
        <div style={{ marginTop: '100px' }}>
        <Paragraph1 CzMax={CzMax}/>
        </div>
      </div>
      <div style={{ marginTop: '30px' }}>
        <Gran tableStyles ={tableStyles} cellStyles={cellStyles} data={data}/>
        <Radius tableStyles ={tableStyles} cellStyles={cellStyles}  RadiusTable={RadiusTable}/>
        </div>
<div className='m-5'>
  <div className='flex flex-row'>
  <Plot1 plotData = {plotData}></Plot1>
  <div className='flex flex-col mr-5' style ={{ marginTop: '190px' }}>
  <Paragraph2></Paragraph2> 
    </div>
  </div>
</div>
  <Cz tableStyles ={tableStyles} cellStyles={cellStyles}  czTable={czTable}/>
  <div className='m-5'>
  <div className='flex flex-row'>
  <Plot2 plot2Data = {plot2Data}></Plot2>
  <div className='flex flex-col mr-5' style ={{ marginTop: '100px' }}>
  <Introduction></Introduction>
  <div className='flex flex-col mr-5' style ={{ marginTop: '100px' }}>
  <h5 className='font-bold'><span><p> Współczynnik musi być nad przerywaną linią, aby zakręt był możliwy do wykonania!</p></span></h5>
    </div>
    </div>
  </div>
</div>
<Paragraph3 Cx0={Cx0} stala={stala}></Paragraph3>
  <div className='m-5'>
  <div className='flex flex-row mr-5'>
    <div className='flex flex-row mr-5'>
      <div className='flex flex-row mr-5'>
      <Table tableStyles ={tableStyles} cellStyles={cellStyles}  PowerTable={PowerTable15} angle={0} />
      </div>
      <Table tableStyles ={tableStyles} cellStyles={cellStyles}  PowerTable={PowerTable15} angle={5} />
    </div>
    <Table tableStyles ={tableStyles} cellStyles={cellStyles}  PowerTable={PowerTable15} angle={10} />
  </div>
</div>
<div className='m-5'>
  <div className='flex flex-row mr-5'>
    <div className='flex flex-row mr-5'>
      <div className='flex flex-row mr-5'>
      <Table tableStyles ={tableStyles} cellStyles={cellStyles}  PowerTable={PowerTable15} angle={15} />
      </div>
      <Table tableStyles ={tableStyles} cellStyles={cellStyles}  PowerTable={PowerTable20} angle={20} />
    </div>
    <Table tableStyles ={tableStyles} cellStyles={cellStyles}  PowerTable={PowerTable25} angle={25} />
  </div>
</div>
<div className='m-5'>
  <div className='flex flex-row mr-5'>
    <div className='flex flex-row mr-5'>
      <div className='flex flex-row mr-5'>
      <Table tableStyles ={tableStyles} cellStyles={cellStyles}  PowerTable={PowerTable30} angle={30} />
      </div>
      <Table tableStyles ={tableStyles} cellStyles={cellStyles}  PowerTable={PowerTable35} angle={35} />
    </div>
    <Table tableStyles ={tableStyles} cellStyles={cellStyles}  PowerTable={PowerTable40} angle={40} />
  </div>
</div>
<div className='m-5'>
  <div className='flex flex-row mr-5'>
    <div className='flex flex-row mr-5'>
      <div className='flex flex-row mr-5'>
      <Table tableStyles ={tableStyles} cellStyles={cellStyles}  PowerTable={PowerTable45} angle={45} />
      </div>
      <Table tableStyles ={tableStyles} cellStyles={cellStyles}  PowerTable={PowerTable50} angle={50} />
    </div>
    <Table tableStyles ={tableStyles} cellStyles={cellStyles}  PowerTable={PowerTable55} angle={55} />
  </div>
</div>
<div className='m-5 flex flex-col'>
  <div className='flex flex-row'>
    <div className='mr-5'>
      <Table tableStyles={tableStyles} cellStyles={cellStyles} PowerTable={PowerTable60} angle={60} />
    </div>
    <div className='mr-5'>
      <Table tableStyles={tableStyles} cellStyles={cellStyles} PowerTable={PowerTable65} angle={65} />
    </div>
    <div className='mr-5'>
      <Table tableStyles={tableStyles} cellStyles={cellStyles} PowerTable={PowerTable70} angle={70} />
    </div>
  </div>
  <div style={{ height: '20px' }}>
  </div>
  <div className='flex flex-row'>
    <div className='mr-5'>
    </div>
    <div className='mr-5' style={{ marginLeft: '410px' }}>
      <Table tableStyles={tableStyles} cellStyles={cellStyles} PowerTable={PowerTable75} angle={75} />
    </div>
    <div className='mr-5'>
    </div>
  </div>
</div>
<div className='m-5'>
  <div className='flex flex-row'>
  <Plot3 maxSpeed = {maxSpeed} plot3Data = {plot3Data}></Plot3>
  <Paragraph4 maxSpeed = {maxSpeed} Px = {Px} density = {density} stala = {stala} CzMax = {CzMax} Cx0 = {Cx0} S={S}></Paragraph4>
</div>
</div> 
<Paragraph5 stala={stala} Cx0={Cx0}></Paragraph5>
<h2 className='text-2xl font-bold' style={{ marginLeft: '410px' }}>5.) Promień, współczynnik obciążeń, kąt przechylenia</h2>
<div className='m-5'>
  <div className='flex flex-row mr-5'>
    <div className='flex flex-row mr-5'>
      <div className='flex flex-row mr-5'>
      <Plot4 maxSpeed ={maxSpeed} CzMax={CzMax}  LoadFactorTable={LoadFactorTable} />
      </div>
      <Plot5 maxSpeed ={maxSpeed} CzMax={CzMax}  plot4Data={plot4Data} />
    </div>
  </div>
</div>
    </div>
  );
};
export default App;