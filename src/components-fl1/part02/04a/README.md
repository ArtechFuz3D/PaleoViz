# Double layerd

```js

...src=

  // Create an AudioContext
const audioContext = new AudioContext();

// Create the audio source from the audio element
const audioSource = audioContext.createMediaElementSource(audio1);

// Create an array to store the BiquadFilterNodes (for EQ bands)
const filters = [];

// Define frequency bands for the equalizer
// const frequencies = [
//   40, 50, 60, 70, 80, 90, 100, 110, 120, 
//   200, 300, 400, 500, 600, 700, 800, 900, 1000, 
//   2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000
// ];
// const frequencies = [60, 70, 80, 90, 100, 110, 120, 130]; // Common EQ bands (bass, mid, treble)
const frequencies = [100, 110, 120 ]; // Common EQ bands (bass, mid, treble)

// Create a GainNode for overall volume control
const masterGain = audioContext.createGain();
masterGain.gain.value = 0.1; // Set initial master volume

// Create BiquadFilterNodes for each frequency band
frequencies.forEach((frequency) => {
  const filter = audioContext.createBiquadFilter();
  // filter.type = "peaking"; // Use "peaking" filter for EQ bands
  filter.type = "lowshelf"; 
  filter.frequency.value = frequency; // Set the target frequency
  filter.Q.value = 0; // Bandwidth: 1 is a reasonable starting point
  filter.gain.value = 0; // Default gain for each band
  filters.push(filter);
});

// Connect the filters in parallel to the audio source
filters.forEach((filter) => {
  audioSource.connect(filter);
  filter.connect(masterGain); // Connect each filter to the master gain
});

// Optional: Create an AnalyserNode (e.g., for visualizing later)
const analyser = audioContext.createAnalyser();
masterGain.connect(analyser); // Connect master gain to the analyser
analyser.connect(audioContext.destination); // Connect analyser to the speakers

// Play the audio
audio1.play();

// Adjust EQ band gains dynamically
// filters.forEach((filter, index) => {
//   // Example gain values: You can customize these based on your requirements
//   if (index <= 3) {
//     filter.gain.value = 0; // Boost the first five bands
//   } else if (index <= 9) {
//     filter.gain.value = 5; // Boost mid frequencies
//   } else if (index <= 15) {
//     filter.gain.value = 5; // Cut higher mid frequencies slightly
//   } else {
//     filter.gain.value = 0; // Slight boost for high frequencies
//   }
// });

// Adjust EQ band gains dynamically (example usage)
filters[0].gain.value = 5;  // Boost the first band (20 Hz) by 10 dB
filters[1].gain.value = 0;  // Boost the second band (30 Hz) by 10 dB
filters[2].gain.value = 0;  // Boost the third band (40 Hz) by 10 dB
// filters[3].gain.value = 0;  // Boost the fourth band (50 Hz) by 10 dB
// filters[4].gain.value = 0;  // Boost the fifth band (60 Hz) by 10 dB
// filters[5].gain.value = 0;   // Boost the sixth band (70 Hz) by 5 dB
// filters[6].gain.value = 0;   // Boost the seventh band (80 Hz) by 5 dB
// filters[7].gain.value = 0;   // Boost the eighth band (90 Hz) by 5 dB
// filters[8].gain.value = 1;   // Boost the ninth band (100 Hz) by 5 dB
// filters[9].gain.value = -10;   // Boost the tenth band (200 Hz) by 3 dB
// filters[10].gain.value = -10;  // Boost the eleventh band (300 Hz) by 2 dB
// filters[11].gain.value = -10; // Cut the twelfth band (400 Hz) by -2 dB
// filters[12].gain.value = -10; // Cut the thirteenth band (500 Hz) by -3 dB
// filters[13].gain.value = -10; // Cut the fourteenth band (600 Hz) by -3 dB
// filters[14].gain.value = -10; // Cut the fifteenth band (700 Hz) by -5 dB
// filters[15].gain.value = -10; // Cut the sixteenth band (800 Hz) by -5 dB
// filters[16].gain.value = -10; // Cut the seventeenth band (900 Hz) by -5 dB
// filters[17].gain.value = -10;  // Boost the eighteenth band (1000 Hz) by 3 dB
// filters[18].gain.value = -10;  // Boost the nineteenth band (2000 Hz) by 4 dB
// filters[19].gain.value = -10;  // Boost the twentieth band (3000 Hz) by 5 dB
// filters[20].gain.value = -10;  // Boost the twenty-first band (4000 Hz) by 6 dB
// filters[21].gain.value = -10;  // Boost the twenty-second band (5000 Hz) by 6 dB
// filters[22].gain.value = -10;  // Boost the twenty-third band (6000 Hz) by 7 dB
// filters[23].gain.value = -10;  // Boost the twenty-fourth band (7000 Hz) by 7 dB
// filters[24].gain.value = -10;  // Boost the twenty-fifth band (8000 Hz) by 8 dB
// filters[25].gain.value = -10;  // Boost the twenty-sixth band (9000 Hz) by 8 dB
// filters[26].gain.value = -10;  // Boost the twenty-seventh band (10000 Hz) by 9 dB

...fftsize

```