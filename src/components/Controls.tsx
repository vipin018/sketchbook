import React from 'react';

interface ControlsProps {
  distort: number;
  onDistortChange: (value: number) => void;
}

const Controls = ({ distort, onDistortChange }: ControlsProps) => {
  return (
    <div className="absolute top-10 right-10 z-10 bg-white p-4 rounded-lg shadow-lg">
      <div className="mb-4">
        <label htmlFor="distort" className="block text-sm font-medium text-gray-700">
          Distort
        </label>
        <input
          type="range"
          id="distort"
          min="0"
          max="1"
          step="0.01"
          value={distort}
          onChange={(e) => onDistortChange(parseFloat(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
      </div>
    </div>
  );
};

export default Controls;
