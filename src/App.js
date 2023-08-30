import React, { useState, useEffect} from 'react';
import Plotly from 'plotly.js-dist';
import Plot from 'react-plotly.js';


const tableStyles = {
  borderCollapse: 'collapse'
};

const cellStyles = {
  border: '1px solid black',
  padding: '5px'
};

const App = () => {
  const [CzMax, setCzMax] = useState(0);
  const [mass, setMass] = useState(0);
  const [density, setDensity] = useState(0);
  const [maxSpeed, setMaxSpeed] = useState(0);
  const [Cx0, setCx0] = useState(0);
  const [Lambda_e, setLambda_e] = useState(0);
  const [S, setS] = useState(0);
  const [Px, setPx] = useState(0);
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
      for (let angle = 5; angle <= 80; angle += 5) {
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
    const speeds = RadiusTable.map(row => row[0]); // prędkości z twojej tablicy

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
    const speeds = czTable.map(row => row[0]); // prędkości z twojej tablicy

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
    <div>

      <input 
        type="number" 
        placeholder="Cz Max" 
        onChange={(e) => setCzMax(e.target.value)} 
      />
      <input 
        type="number" 
        placeholder="Masa samolotu w kg" 
        onChange={(e) => setMass(e.target.value)} 
      />
      <input 
        type="number" 
        placeholder="Gęstość powietrza w kg/m^3" 
        onChange={(e) => setDensity(e.target.value)} 
      />
      <input 
        type="number" 
        placeholder="Prędkość maksymalna w m/s" 
        onChange={(e) => setMaxSpeed(e.target.value)} 
      />
      <input 
        type="number" 
        placeholder="Pole powierzchni skrzydła w m^2" 
        onChange={(e) => setS(e.target.value)} 
      />
      <input 
        type="number" 
        placeholder="Moc silnika w W" 
        onChange={(e) => setPx(e.target.value)} 
      />
      <input
        type="number"
        placeholder="C_x0"
        onChange={(e) => setCx0(e.target.value)}
      />
      <input
        type="number"
        placeholder="Lambda_e"
        onChange={(e) => setLambda_e(e.target.value)}
      />

      
      <h1>Analiza Zakrętu</h1>
      <h2>1.) Maksymalny kąt przechylenia</h2>
    Maksymalny kąt przechylenia określony jest w zależności od dopuszczalnego współczynnika obciążeń, zgodnie ze wzorem:
      <h4><span> <p> &phi;<sub>MAX</sub>=arccos(<span>1</span>&frasl;<span>m<sub>g</sub></span>)</p></span></h4>
    <span><p> Gdzie za kąt &phi; przyjmujemy maksymalną wartość &phi;<sub>MAX</sub>. Dopuszczalny współczynnik obciążeń (po lewej stronie wzoru) przyjmuje się równy
    3.8 (zgodnie z przepisami JAR-23). Jest to największy dopuszczalny współczynnik dla klasycznych samolotów nieakrobacyjnych. </p></span>
    <span><p>Skąd dostajemy: </p></span>
    <h4><span><p>  &phi;<sub>MAX</sub>=arccos(<span>1</span> &frasl; <span>3.8</span>)=75&deg;</p></span></h4>
      <h2>2.) Promień zakrętu w funkcji prędkości lotu i kąta przechylenia</h2>
    <span><p>Dla kątów przechylenia od 0 do 75 stopni, oraz szeregu prędkości (co 10 mniejszych od maksymalnej aż do 0) oblicza się
      promień zakrętu z zależności: </p></span>
    <h4><span>R = V<sup>2</sup>&frasl;(g*tan(&phi;))</span></h4>
    <span><p>Dodatkowo uwzględnia się ograniczenie ze względu na maksymalną wartość współczynnika siły nośnej</p></span>    
    <div><span><p> Cz<sub>MAX</sub> = {CzMax} </p></span></div>
    <span><p>Oblicza się graniczne prędkości dla zakręcania przy tym współczynniku:</p></span>       
    <h4>Cz = (2 * m * g) / (&rho; * S * V<sup>2</sup>) * (1 / cos(&phi;))</h4>
    <span><p>Skąd wynika, że</p></span> 
    <h4><span><p>V<sub>Gran_Cz_MAX</sub>=&radic;((2*m*g)&frasl;(&rho;*Cz<sub>MAX</sub>*cos(&phi;)))</p></span></h4>
    <span><p>i dla tej prędkości oblicza się potem graniczny promień zakrętu <h4>R<sub>Cz_MAX</sub></h4> z poprzedniej zależności. </p></span> 

    <div>
            <table style={tableStyles}>
                <thead>
                    <tr>
                        <th style={cellStyles}>Kąt fi (°)</th>
                        {data.fiDegs.map((value, index) => (
                            <th key={index} style={cellStyles}>{value}</th>
                        ))}
                    </tr>
                    <tr>
                        <th style={cellStyles}>V_granczmax [m/s]</th>
                        {data.V_granczmaxs.map((value, index) => (
                            <th key={index} style={cellStyles}>{value.toFixed(2)}</th>
                        ))}
                    </tr>
                    <tr>
                        <th style={cellStyles}>R_granczmax [m] </th>
                        {data.R_granczmaxs.map((value, index) => (
                            <th key={index} style={cellStyles}>{value.toFixed(2)}</th>
                        ))}
                    </tr>
                </thead>
            </table>
            <p></p>
        </div>
<p></p>

<table style={tableStyles}>
            <thead>
                <tr>
                    <th style={cellStyles} rowSpan={2}>V [m/s]</th>
                    <th style={cellStyles} colSpan={15}>R[m]</th>
                </tr>
                <tr>
                    {Array.from({length: 15}, (_, i) => i * 5 + 5).map((angle) => (
                        <th key={angle} style={cellStyles}>Fi {angle} [deg]</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {RadiusTable.map((row, index) => (
                    <tr key={index}>
                        {row.map((cell, index) => (
                            <td key={index} style={cellStyles}>{cell}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
   
   <h4><span><p>Tabela zależności promienia zakrętu dla poszczególnych prędkości i kątów przechylenia oraz graniczne wartości promienia zakrętu i prędkości.</p></span></h4>
 
   
   <div style={{ fontWeight: 'bold', fontStyle: 'italic', textDecoration: 'underline', color: 'red' }}>
        <Plot
          data={plotData}
          layout={{
            title: 'Promień zakrętu w zależności od prędkości',
            xaxis: { title: 'Prędkość [m/s]' },
            yaxis: { title: 'Promień zakrętu [m]'},
          }}
        />
      </div>

  <h4><span><p>Promień zakrętu w funkcji prędkości i kąta przechylenia.</p></span></h4>

  <h5><span><p> Nie jest możliwe wykonanie zakrętu o mniejszym promieniu niż ten określony przez maksymalny współczynnik siły nośnej!</p></span></h5>

  <h2>3.) Współczynnik siły nośnej wymagany do wykonania zakrętu</h2>

  <h4><span><p>Wymagany współczynnik siły nośnej do wykonania zakrętu określa zależność:</p></span></h4>
  <h4>Cz = (2 * m * g) / (&rho; * S * V<sup>2</sup>) * (1 / cos(&phi;))</h4>
  <h4><span><p>przy czym trzeba pamiętać o ograniczeniu ze względu na Cz<sub>MAX</sub></p></span></h4>
  
  <div>
            <table style={tableStyles}>
                <thead>
                    <tr>
                        <th style={cellStyles}>V [m/s]</th>
                        {Array.from({length: 15}, (_, i) => i * 5 + 5).map((angle) => (
                            <th key={angle} style={cellStyles}>Fi {angle} [deg]</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {czTable.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {row.map((cell, cellIndex) => (
                                <td key={cellIndex} style={cellStyles}>{cell}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

  <h4><span><p>Tabela zależności Cz dla różnych prędkości i różnych kątów przechylenia</p></span></h4>

  <div style={{ fontWeight: 'bold', fontStyle: 'italic', textDecoration: 'underline', color: 'red' }}>
        <Plot
          data={plot2Data}
          layout={{
            title: 'Wspolczynnik sily nosnej niezbedny do wykonania zakretu',
            xaxis: { title: 'V [m/s]' },
            yaxis: { title: 'Cz [1]', range: [0, 2.5] },
          }}
        />
      </div>
      <h5><span><p> Współczynnik musi być nad przerywaną linią, aby zakręt był możliwy do wykonania!</p></span></h5>
  <h2>4.) Moc niezbędna do wykonania zakrętu</h2>
  <h4><span><p>Moc niezbędna do wykonania zakrętu dana jest następującym wzorem:</p></span></h4>
  <h4><span><p>N<sub>n-zakr</sub>=N<sub>n</sub>*cos<sup>(-1.5)</sup>(&phi;)</p></span></h4>
  <span><p>,gdzie</p></span>
  <h4><span><p>N<sub>N</sub>=P<sub>X</sub>*V=&#189;*&rho;*S*C<sub>X</sub>*V<sup>3</sup></p></span></h4>
  <span><p>C<sub>X</sub> w powyższym wzorem wyznacza się zwykle metodą używaną, m. in. podczas przedmiotu Mechanika Lotu 1 w realizowanych wówczas 
  projektach 2 i 3. Dzięki wartościom podanym na początku strony można oszacować C<sub>X</sub> w stosunku do C<sub>Z</sub>, dzięki tzw. biegunowej analitycznej</p></span>
  <span><p>I tak jest ona dana jako: </p></span>
  <h4>C<sub>X</sub> = C<sub>X0</sub>+C<sub>Z</sub><sup>2</sup>*&pi;<sup>-1</sup>*&Lambda;<sup>-1</sup><sub>e</sub></h4>
  <div style={{ fontWeight: 'bold' , color: 'blue'}}>
  <span><p> C<sub>X</sub> = {Cx0} + {stala}*C<sub>Z</sub><sup>2</sup></p></span></div>

  <h4><span><p>Tabele z wartościami N<sub>n</sub>, N<sub>n-zakr</sub> oraz C<sub>Z</sub> dla poszczególnych prędkości.</p></span></h4>

  <div>
            <table style={tableStyles}>
                <caption><h3>FI = 0°</h3></caption>
                <thead>
                    <tr>
                        <th style={cellStyles}>V[m/s]</th>
                        <th style={cellStyles}>Nr[kW]</th>
                        <th style={cellStyles}>Cz[1]</th>
                        <th style={cellStyles}>Cx[1]</th>
                        <th style={cellStyles}>Nn[kW]</th>
                        <th style={cellStyles}>Nn-Zakr[kW]</th>
                    </tr>
                </thead>
                <tbody>
                    {PowerTable0.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {row.map((cell, cellIndex) => (
                                <td key={cellIndex} style={cellStyles}>{cell}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        <div>
            <table style={tableStyles}>
                <caption><h3>FI = 5°</h3></caption>
                <thead>
                    <tr>
                        <th style={cellStyles}>V[m/s]</th>
                        <th style={cellStyles}>Nr[kW]</th>
                        <th style={cellStyles}>Cz[1]</th>
                        <th style={cellStyles}>Cx[1]</th>
                        <th style={cellStyles}>Nn[kW]</th>
                        <th style={cellStyles}>Nn-Zakr[kW]</th>
                    </tr>
                </thead>
                <tbody>
                    {PowerTable5.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {row.map((cell, cellIndex) => (
                                <td key={cellIndex} style={cellStyles}>{cell}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        <div>
            <table style={tableStyles}>
                <caption><h3>FI = 10°</h3></caption>
                <thead>
                    <tr>
                        <th style={cellStyles}>V[m/s]</th>
                        <th style={cellStyles}>Nr[kW]</th>
                        <th style={cellStyles}>Cz[1]</th>
                        <th style={cellStyles}>Cx[1]</th>
                        <th style={cellStyles}>Nn[kW]</th>
                        <th style={cellStyles}>Nn-Zakr[kW]</th>
                    </tr>
                </thead>
                <tbody>
                    {PowerTable10.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {row.map((cell, cellIndex) => (
                                <td key={cellIndex} style={cellStyles}>{cell}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        <div>
            <table style={tableStyles}>
                <caption><h3>FI = 15°</h3></caption>
                <thead>
                    <tr>
                        <th style={cellStyles}>V[m/s]</th>
                        <th style={cellStyles}>Nr[kW]</th>
                        <th style={cellStyles}>Cz[1]</th>
                        <th style={cellStyles}>Cx[1]</th>
                        <th style={cellStyles}>Nn[kW]</th>
                        <th style={cellStyles}>Nn-Zakr[kW]</th>
                    </tr>
                </thead>
                <tbody>
                    {PowerTable15.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {row.map((cell, cellIndex) => (
                                <td key={cellIndex} style={cellStyles}>{cell}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        <div>
            <table style={tableStyles}>
                <caption><h3>FI = 20°</h3></caption>
                <thead>
                    <tr>
                        <th style={cellStyles}>V[m/s]</th>
                        <th style={cellStyles}>Nr[kW]</th>
                        <th style={cellStyles}>Cz[1]</th>
                        <th style={cellStyles}>Cx[1]</th>
                        <th style={cellStyles}>Nn[kW]</th>
                        <th style={cellStyles}>Nn-Zakr[kW]</th>
                    </tr>
                </thead>
                <tbody>
                    {PowerTable20.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {row.map((cell, cellIndex) => (
                                <td key={cellIndex} style={cellStyles}>{cell}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        <div>
            <table style={tableStyles}>
                <caption><h3>FI = 25°</h3></caption>
                <thead>
                    <tr>
                        <th style={cellStyles}>V[m/s]</th>
                        <th style={cellStyles}>Nr[kW]</th>
                        <th style={cellStyles}>Cz[1]</th>
                        <th style={cellStyles}>Cx[1]</th>
                        <th style={cellStyles}>Nn[kW]</th>
                        <th style={cellStyles}>Nn-Zakr[kW]</th>
                    </tr>
                </thead>
                <tbody>
                    {PowerTable25.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {row.map((cell, cellIndex) => (
                                <td key={cellIndex} style={cellStyles}>{cell}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        <div>
            <table style={tableStyles}>
                <caption><h3>FI = 30°</h3></caption>
                <thead>
                    <tr>
                        <th style={cellStyles}>V[m/s]</th>
                        <th style={cellStyles}>Nr[kW]</th>
                        <th style={cellStyles}>Cz[1]</th>
                        <th style={cellStyles}>Cx[1]</th>
                        <th style={cellStyles}>Nn[kW]</th>
                        <th style={cellStyles}>Nn-Zakr[kW]</th>
                    </tr>
                </thead>
                <tbody>
                    {PowerTable30.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {row.map((cell, cellIndex) => (
                                <td key={cellIndex} style={cellStyles}>{cell}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        <div>
            <table style={tableStyles}>
                <caption><h3>FI = 35°</h3></caption>
                <thead>
                    <tr>
                        <th style={cellStyles}>V[m/s]</th>
                        <th style={cellStyles}>Nr[kW]</th>
                        <th style={cellStyles}>Cz[1]</th>
                        <th style={cellStyles}>Cx[1]</th>
                        <th style={cellStyles}>Nn[kW]</th>
                        <th style={cellStyles}>Nn-Zakr[kW]</th>
                    </tr>
                </thead>
                <tbody>
                    {PowerTable35.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {row.map((cell, cellIndex) => (
                                <td key={cellIndex} style={cellStyles}>{cell}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        <div>
            <table style={tableStyles}>
                <caption><h3>FI = 40°</h3></caption>
                <thead>
                    <tr>
                        <th style={cellStyles}>V[m/s]</th>
                        <th style={cellStyles}>Nr[kW]</th>
                        <th style={cellStyles}>Cz[1]</th>
                        <th style={cellStyles}>Cx[1]</th>
                        <th style={cellStyles}>Nn[kW]</th>
                        <th style={cellStyles}>Nn-Zakr[kW]</th>
                    </tr>
                </thead>
                <tbody>
                    {PowerTable40.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {row.map((cell, cellIndex) => (
                                <td key={cellIndex} style={cellStyles}>{cell}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        <div>
            <table style={tableStyles}>
                <caption><h3>FI = 45°</h3></caption>
                <thead>
                    <tr>
                        <th style={cellStyles}>V[m/s]</th>
                        <th style={cellStyles}>Nr[kW]</th>
                        <th style={cellStyles}>Cz[1]</th>
                        <th style={cellStyles}>Cx[1]</th>
                        <th style={cellStyles}>Nn[kW]</th>
                        <th style={cellStyles}>Nn-Zakr[kW]</th>
                    </tr>
                </thead>
                <tbody>
                    {PowerTable45.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {row.map((cell, cellIndex) => (
                                <td key={cellIndex} style={cellStyles}>{cell}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        <div>
            <table style={tableStyles}>
                <caption><h3>FI = 50°</h3></caption>
                <thead>
                    <tr>
                        <th style={cellStyles}>V[m/s]</th>
                        <th style={cellStyles}>Nr[kW]</th>
                        <th style={cellStyles}>Cz[1]</th>
                        <th style={cellStyles}>Cx[1]</th>
                        <th style={cellStyles}>Nn[kW]</th>
                        <th style={cellStyles}>Nn-Zakr[kW]</th>
                    </tr>
                </thead>
                <tbody>
                    {PowerTable50.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {row.map((cell, cellIndex) => (
                                <td key={cellIndex} style={cellStyles}>{cell}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        <div>
            <table style={tableStyles}>
                <caption><h3>FI = 55°</h3></caption>
                <thead>
                    <tr>
                        <th style={cellStyles}>V[m/s]</th>
                        <th style={cellStyles}>Nr[kW]</th>
                        <th style={cellStyles}>Cz[1]</th>
                        <th style={cellStyles}>Cx[1]</th>
                        <th style={cellStyles}>Nn[kW]</th>
                        <th style={cellStyles}>Nn-Zakr[kW]</th>
                    </tr>
                </thead>
                <tbody>
                    {PowerTable55.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {row.map((cell, cellIndex) => (
                                <td key={cellIndex} style={cellStyles}>{cell}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        <div>
            <table style={tableStyles}>
                <caption><h3>FI = 60°</h3></caption>
                <thead>
                    <tr>
                        <th style={cellStyles}>V[m/s]</th>
                        <th style={cellStyles}>Nr[kW]</th>
                        <th style={cellStyles}>Cz[1]</th>
                        <th style={cellStyles}>Cx[1]</th>
                        <th style={cellStyles}>Nn[kW]</th>
                        <th style={cellStyles}>Nn-Zakr[kW]</th>
                    </tr>
                </thead>
                <tbody>
                    {PowerTable60.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {row.map((cell, cellIndex) => (
                                <td key={cellIndex} style={cellStyles}>{cell}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        <div>
            <table style={tableStyles}>
                <caption><h3>FI = 65°</h3></caption>
                <thead>
                    <tr>
                        <th style={cellStyles}>V[m/s]</th>
                        <th style={cellStyles}>Nr[kW]</th>
                        <th style={cellStyles}>Cz[1]</th>
                        <th style={cellStyles}>Cx[1]</th>
                        <th style={cellStyles}>Nn[kW]</th>
                        <th style={cellStyles}>Nn-Zakr[kW]</th>
                    </tr>
                </thead>
                <tbody>
                    {PowerTable65.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {row.map((cell, cellIndex) => (
                                <td key={cellIndex} style={cellStyles}>{cell}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        <div>
            <table style={tableStyles}>
                <caption><h3>FI = 70°</h3></caption>
                <thead>
                    <tr>
                        <th style={cellStyles}>V[m/s]</th>
                        <th style={cellStyles}>Nr[kW]</th>
                        <th style={cellStyles}>Cz[1]</th>
                        <th style={cellStyles}>Cx[1]</th>
                        <th style={cellStyles}>Nn[kW]</th>
                        <th style={cellStyles}>Nn-Zakr[kW]</th>
                    </tr>
                </thead>
                <tbody>
                    {PowerTable70.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {row.map((cell, cellIndex) => (
                                <td key={cellIndex} style={cellStyles}>{cell}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        <div>
            <table style={tableStyles}>
                <caption><h3>FI = 75°</h3></caption>
                <thead>
                    <tr>
                        <th style={cellStyles}>V[m/s]</th>
                        <th style={cellStyles}>Nr[kW]</th>
                        <th style={cellStyles}>Cz[1]</th>
                        <th style={cellStyles}>Cx[1]</th>
                        <th style={cellStyles}>Nn[kW]</th>
                        <th style={cellStyles}>Nn-Zakr[kW]</th>
                    </tr>
                </thead>
                <tbody>
                    {PowerTable75.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {row.map((cell, cellIndex) => (
                                <td key={cellIndex} style={cellStyles}>{cell}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        <div>
        <Plot
          data={plot3Data}
          layout={{
            title: 'Nn-zakr w zależności od V dla różnych Fi',
            xaxis: { title: 'Prędkość [m/s]', range: [0, 220] },
            yaxis: { title: 'Nn-Zakr [kW]', range: [0, 2000] },
          }}
        />
      </div>


      <h5><span><p>Wykres wskazuje nam moce niezbędne do wejścia w zakręt. Moc nie może być większa niż rozporządzalna, gdyż samolot nie dysponuje taką mocą. Możemy
        również operować jedynie w zakresie prędkości większych niż prędkość dla kąt granicznego, który wynika z ograniczenia na moc dla maksymalnego współczynnika siły nośnej
        oraz jego punktu przecięcia z wykresem Nr, a także ogranicza nas maksymalna prędkość samolotu w ruchu poziomym, powyżej której jak zadeklarowano na początku programu samolot nie może lecieć.</p></span></h5>


  <span><p>Z wykresu można wyznaczyć:</p></span> 
  <ul>
  <li>Maksymalną prędkość lotu poziomego V<sub>MAX-POZ</sub>={maxSpeed} m/s</li>
  <li>Moc niezbędna do pokonania zakrętu oraz prędkość lotu dla kąta granicznego to odpowiednio: N<sub>NIEZB</sub> = {Px*0.85*0.001} kW oraz V<sub>GRAN</sub> = {(((0.85 * Px * 2) / (density * S * (stala * CzMax ** 2 + Number(Cx0)))) ** (1 / 3)).toFixed(2)} m/s
 </li>
  </ul>
  <span><p>Korzystając z wypisanych wcześniej zależności otrzymujemy zależność, z której numerycznie można wyznaczyć kąt graniczny, dla którego tylko
    dla jednej prędkości moc niezbędna do pokonania zakrętu pokrywa się z mocą rozporządzalną.</p></span> 

<div><h4><span><p>N<sub>N-ZAKR</sub>=&#189;*&rho;*S*V<sup>3</sup>*cos<sup>-1.5</sup>(&phi;)*[{stala}*(2*m*g)&frasl;(&rho;*S*V<sup>2</sup>*cos(&phi;))+
{Cx0}]</p></span></h4></div>

<span><p>Wynika stąd, że <h4>&phi;<sub>GRAN</sub>[&deg;]</h4> możemy wyznaczyć, gdy <h4>N<sub>N-ZAKR</sub>=&#189;*&rho;*S*V<sup>3</sup>*cos<sup>-1.5</sup>(&phi;)*[{stala}*(2*m*g)&frasl;(&rho;*S*V<sup>2</sup>*cos(&phi;))+
{Cx0}] = 0,85*P<sub>X</sub> </h4></p></span>
co jest możliwym do wykonania po przekształceniach zadaniem numerycznym, które w ogólności bez działania na konkretnych liczbach przerasta niestety możliwości stosowanego oprogramowania i jako takie zostało pominięte w tym projekcie. 

<h2>5.) Promień, współczynnik obciążeń, kąt przechylenia</h2>

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
<div><h4><span><p>Współczynnik obciążeń dla zakrętu na stałym kącie natarcia (C<sub>z</sub>={0.8*CzMax})</p></span></h4></div>

<div>
            <Plot
            data={plot4Data}
            layout={{
                title: 'R oraz φ w zależności od V',
                xaxis: { title: 'V [m/s]', range: [0, maxSpeed] },
                yaxis: { title: 'R[m] oraz φ [deg.]', range: [0, 1000] },
              }}
            />
        </div>


<h4><span><p>Promień zakrętu oraz kąt przechylenia dla zakrętu na stałym kacie natarcia(C<sub>Z</sub>={0.8*CzMax})</p></span></h4>

    </div>
  );
};

export default App;


