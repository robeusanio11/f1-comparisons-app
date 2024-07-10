import React, { useEffect, useState } from 'react';
import drivers from './f1Drivers2024.js';
import Dropdown from './Dropdown.js';
import './App.css';

function App() {

  const [selectedDriver1, setSelectedDriver1] = useState('');
  const [selectedDriver2, setSelectedDriver2] = useState('');
  const [laps, setLaps] = useState([]);

  const handleDriver1Change = (event) => {
    setSelectedDriver1(event.target.value);
  };

  const handleDriver2Change = (event) => {
    setSelectedDriver2(event.target.value);
  };

  const fetchLaps = async () => {
    const res = await(fetch('https://api.openf1.org/v1/laps?session_key=latest'));
    console.log(res)
    const lapData = await res.json();
    console.log(lapData)
    setLaps(lapData);
  }
  
  // useEffect(() => {
  //   fetchLaps();
  // }, []);

  return (
    <div className="App">
      <button onClick={fetchLaps}>get laps</button>
      {/*DROPDOWN*/}
      <div>
          <label htmlFor="driver-select">Select a Driver: </label>
          <select id="driver-select" value={selectedDriver1} onChange={handleDriver1Change}>
            <option value="">--Select a Driver--</option>
            {Object.entries(drivers).map(([number, name]) => (
              <option key={number} value={name.toLowerCase().replace(/ /g, '-')}>
                {name}
              </option>
            ))}
          </select>
        </div>
    </div>
  );
}

export default App;
