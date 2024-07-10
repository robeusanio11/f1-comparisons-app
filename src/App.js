import React, { useEffect, useState } from 'react';
import drivers from './f1Drivers2024.js';
import Dropdown from './Dropdown.js';
import './App.css';

function App() {

  const [selectedDriver1, setSelectedDriver1] = useState('');
  const [driver1Laps, setDriver1Laps] = useState([]);
  const [laps, setLaps] = useState([]);

  const handleDriver1Change = (event) => {
    setSelectedDriver1(event.target.value);
  };

  const fetchLaps = async () => {
    const res = await(fetch('https://api.openf1.org/v1/laps?session_key=latest'));
    const lapData = await res.json();
    setLaps(lapData);
  }

  useEffect(() => {
    if (selectedDriver1) {
      const driverNumber = drivers[selectedDriver1]
      const driverLaps = laps.filter(lap => lap.driver_number === driverNumber);
      setDriver1Laps(driverLaps)
    } else { setDriver1Laps([]) }
  }, [selectedDriver1, laps])

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
          {Object.keys(drivers).map((driver) => (
            <option key={drivers[driver]} value={driver}>
              {driver}
            </option>
          ))}
        </select>
      </div>

      {/*SHOW LAPS*/}
      <div>
        <h2>Lap Times for {selectedDriver1}</h2>
        {driver1Laps.length > 0 ? (
          <ul>
            {driver1Laps.map((lap) => (
              <li key={lap.lap_number}>
                Lap {lap.lap_number}: {lap.lap_duration} seconds
              </li>
            ))}
          </ul>
        ) : (
          <p>No lap data available for this driver.</p>
        )}
      </div>
    </div>
  );
}

export default App;
