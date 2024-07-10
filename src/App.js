import React, { useEffect, useState } from 'react';
import './App.css';

function App() {

  const [laps, setLaps] = useState([]);

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
    </div>
  );
}

export default App;
