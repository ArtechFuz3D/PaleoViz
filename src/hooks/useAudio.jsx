import React, { useState } from 'react';

// export function VolumeController({ gain }) {
//   const [volume, setVolume] = useState(gain.gain.value);

//   const handleVolumeChange = (event) => {
//     const newVolume = parseFloat(event.target.value);
//     setVolume(newVolume);
//     gain.gain.value = newVolume;
//   };

//   return (
//     <div className="volume-controller">
//       <span>Volume: </span>
//       <input
//         type="range"
//         min="0.0"
//         max="1.0"
//         step="0.01"
//         value={volume}
//         onChange={handleVolumeChange}
//       />
//       <datalist id="volumes">
//         <option value="0.0" label="Mute"></option>
//         <option value="1.0" label="100%"></option>
//       </datalist>
//     </div>
//   );
// }

async function createAudio(url) {
  const res = await fetch(url);
  const buffer = await res.arrayBuffer();
  const context = new (window.AudioContext || window.AudioContext)();
  const source = context.createBufferSource();
  source.buffer = await new Promise((res) =>
    context.decodeAudioData(buffer, res)
  );
  source.loop = true;

  const gain = context.createGain();
  gain.gain.value = 1; // Default volume

  const analyser = context.createAnalyser();
  analyser.fftSize = 2048;
  source.connect(analyser);
  analyser.connect(gain);
  gain.connect(context.destination);

  const data = new Uint8Array(analyser.frequencyBinCount);

  source.start(1);

  return {
    context,
    source,
    gain,
    data,
    update: () => {
      analyser.getByteFrequencyData(data);
      return (data.avg = data.reduce(
        (prev, cur) => prev + cur / data.length,
        0
      ));
    },
    setVolume: (volume) => {
      gain.gain.value = volume;
    },
    VolumeController: () => <VolumeController gain={gain} /> // Export VolumeController with gain
  };
}

export default createAudio;


//  async function createAudio(url) {
//   const res = await fetch(url);
//   const buffer = await res.arrayBuffer();
//   const context = new (window.AudioContext || window.AudioContext)();
//   const source = context.createBufferSource();
//   source.buffer = await new Promise((res) =>
//     context.decodeAudioData(buffer, res)
//   );
//   source.loop = true;

//   const gain = context.createGain();
//   gain.gain.value = 0.5; // Default volume

//   const analyser = context.createAnalyser();
//   analyser.fftSize = 2048;
//   source.connect(analyser);
//   analyser.connect(gain);
//   gain.connect(context.destination);

//   const data = new Uint8Array(analyser.frequencyBinCount);

//   source.start(1);
  
//   // console.log('Gain Node Created:', gain); // Add this line to verify
//   return {
//     context,
//     source,
//     gain,
//     data,
//     update: () => {
//       analyser.getByteFrequencyData(data);
//       return (data.avg = data.reduce(
//         (prev, cur) => prev + cur / data.length,
//         0
//       ));
//     },
//     setVolume: (volume) => {
//       gain.gain.value = volume; // Update the volume value
//     },
//   };
// }

// export default createAudio;


// async function createAudio(url) {
//   const res = await fetch(url);
//   const buffer = await res.arrayBuffer();
//   const context = new (window.AudioContext || window.AudioContext)();
//   const source = context.createBufferSource();
//   source.buffer = await new Promise((res) =>
//     context.decodeAudioData(buffer, res)
//   );
//   source.loop = true;

//   const gain = context.createGain();
//   gain.gain.value = 0.5; // Set the volume

//   const analyser = context.createAnalyser();
//   analyser.fftSize = 2048;
//   source.connect(analyser);
//   analyser.connect(gain);
//   gain.connect(context.destination);

//   const data = new Uint8Array(analyser.frequencyBinCount);


//   source.start(0);

//   return {
//     context,
//     source,
//     gain,
//     data,
//     update: () => {
//       analyser.getByteFrequencyData(data);
//       return (data.avg = data.reduce(
//         (prev, cur) => prev + cur / data.length,
//         0
//       ));
//     },
//     setVolume: (volume) => {
//       gain.gain.value = volume; // Update the volume value
//     },
//   };
// }



// export default createAudio;
