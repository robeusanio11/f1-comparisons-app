import React, { useEffect, useState } from 'react';
import drivers from './f1Drivers2024.js';
import Dropdown from './Dropdown.js';
import './App.css';

function App() {

  const [selectedDriver1, setSelectedDriver1] = useState('');
  const [driver1QLaps, setDriver1QLaps] = useState([]);
  const [driver1RLaps, setDriver1RLaps] = useState([]);
  const [driver1Quali, setDriver1Quali] = useState(null);
  const [driver1BestLap, setDriver1BestLap] = useState(null);
  const [raceSessionKey, setRaceSessionKey] = useState(null);
  const [qualiSessionKey, setQualiSessionKey] = useState(null);
  const [qLaps, setQLaps] = useState([]);
  const [rLaps, setRLaps] = useState([])

  const handleDriver1Change = (event) => {
    setSelectedDriver1(event.target.value);
  };

  const getLatestMeeting = async () => {
    const res = await(fetch('https://api.openf1.org/v1/sessions?meeting_key=latest'))
    const meeting = await res.json()

    const qualiSession = meeting.find(session => session.session_type === 'Qualifying');
    const raceSession = meeting.find(session => session.session_type === 'Race');

    if (qualiSession) {
      const qSessionKey = qualiSession.session_key;
      setQualiSessionKey(qSessionKey)
    }
    if (raceSession) {
      const rSessionKey = raceSession.session_key;
      setRaceSessionKey(rSessionKey)
    }
  }
  const fetchLaps = async () => {
    await getLatestMeeting();

    const res1 = await(fetch(`https://api.openf1.org/v1/laps?session_key=${qualiSessionKey}`));
    const qLapData = await res1.json();
    setQLaps(qLapData);

    const res2 = await(fetch(`https://api.openf1.org/v1/laps?session_key=${raceSessionKey}`));
    const rLapData = await res2.json();
    setRLaps(rLapData);

  }
  // const fetchLaps = async () => {

  //   const res = await(fetch('https://api.openf1.org/v1/laps?session_key=latest'));
  //   const lapData = await res.json();

  //   setLaps(lapData);
  // }

  useEffect(() => {
    if (selectedDriver1) {
      const driverNumber = drivers[selectedDriver1]
      const driverRLaps = rLaps.filter(lap => lap.driver_number === driverNumber);
      setDriver1RLaps(driverRLaps)
    } else { setDriver1RLaps([]) }
  }, [selectedDriver1, rLaps])

  useEffect(() => {
    if (selectedDriver1) {
      const driverNumber = drivers[selectedDriver1]
      const driverQLaps = qLaps.filter(lap => lap.driver_number === driverNumber);
      setDriver1QLaps(driverQLaps)
    } else { setDriver1QLaps([]) }
  }, [selectedDriver1, qLaps])

  useEffect(() => {
    if (selectedDriver1) {
      driver1QLaps.forEach((lap) => {
        if (driver1Quali === null || lap.lap_duration < driver1Quali) {
          setDriver1Quali(lap.lap_duration)
        }
      })
    }
  }, [selectedDriver1, driver1QLaps])
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




      <div>{driver1Quali}</div>
      <div>{driver1BestLap}</div>
      {/*SHOW LAPS*/}
      {/* <div>
        <h2>Lap Times for {selectedDriver1}</h2>
        {driver1Laps.length > 0 ? (
          <ul>
            {driver1Laps.map((lap) => lap.lap_duration ? (
              <li key={lap.lap_number}>
                Lap {lap.lap_number}: {lap.lap_duration} seconds
              </li> ) : null
            )}
          </ul>
        ) : (
          <p>No lap data available for this driver.</p>
        )}
      </div> */}
    </div>
  );
}

export default App;
