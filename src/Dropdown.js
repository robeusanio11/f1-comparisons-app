import React from 'react';

const Dropdown = ({ options, selectedDriver, onChange }) => (
  <select value={selectedDriver} onChange={onChange}>
    <option value="">Select a driver</option>
    {options.map((option) => (
      <option key={option.number} value={option.number}>
        {option.name}
      </option>
    ))}
  </select>
);

export default Dropdown;