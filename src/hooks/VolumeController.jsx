import React from 'react';

const VolumeController = ({ setVolume }) => {
  const handleVolumeChange = (event) => {
    const newVolume = parseFloat(event.target.value);
    setVolume(newVolume); // Update the volume using the setVolume function
  };

  return (
    <div className="volume-controller">
      <label htmlFor="volume">Volume: </label>
      <input
        id="volume"
        type="range"
        min="0.0"
        max="1.0"
        step="0.01"
        onChange={handleVolumeChange}
      />
    </div>
  );
};

export default VolumeController;
