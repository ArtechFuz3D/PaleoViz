const file = document.getElementById("fileupload");
const container = document.getElementById("container");
const canvas = document.getElementById("canvas1");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");

let audioSource;
let analyser;

// Initialize the visualizer mode variable
let currentVisualizer = 'visualizer'; // Default visualizer

const sprite = new Image();
sprite.src = "dinow.svg";

const sprite2 = new Image();
sprite2.src = "dinopw.svg";
const sprite3 = new Image();
sprite3.src = "brex.svg";

const audio1 = document.getElementById("audio1");

// Playlist array (can be expanded)
const playlist = [
  "tracks/nirvana.mp3",
  "tracks/seagulls40.mp3",
  "tracks/rendezvouz.mp3",
  "tracks/youdontbringmeflowers.mp3",
];

let currentTrackIndex = 0;
let isPlaying = false;

// Function to update the audio source and play a new track
function playTrack(index) {
  // Set the audio source based on the playlist index
  audio1.src = playlist[index];
  audio1.load();
  audio1.play();

  // Create a new AudioContext and set up the audio elements
  const audioContext = new AudioContext();
  audioSource = audioContext.createMediaElementSource(audio1);

  // Create a GainNode for volume control
  const gainNode = audioContext.createGain();

  // Set the default volume to 50% (0.5)
  gainNode.gain.setValueAtTime(0.5, audioContext.currentTime);

  // Create an AnalyserNode for audio visualizer
  analyser = audioContext.createAnalyser();

  // Connect the audioSource -> GainNode -> Analyser -> AudioContext.destination
  audioSource.connect(gainNode);
  gainNode.connect(analyser);
  analyser.connect(audioContext.destination);

  analyser.fftSize = 32 * 4;
  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);

  const barWidth = 15;
  let barHeight;
  let x;

  // Animation loop for visualizer
  function animate() {
    x = 0;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    analyser.getByteFrequencyData(dataArray);
    // drawVisualiser(bufferLength, x, barWidth, barHeight, dataArray);
    // drawVisualiser2(bufferLength, x, barWidth, barHeight, dataArray);
    // drawVisualiser3(bufferLength, x, barWidth, barHeight, dataArray);
    // Use the selected visualizer
  if (currentVisualizer === 'visualizer') {
    drawVisualiser(bufferLength, x, barWidth, barHeight, dataArray);
  } else if (currentVisualizer === 'visualizer2') {
    drawVisualiser2(bufferLength, x, barWidth, barHeight, dataArray);
  } else if (currentVisualizer === 'visualizer3') {
    drawVisualiser3(bufferLength, x, barWidth, barHeight, dataArray);
  } else if (currentVisualizer === 'visualizer4') {
    drawVisualiser4(bufferLength, x, barWidth, barHeight, dataArray);
  } else if (currentVisualizer === 'visualizer5') {
    drawVisualiser5(bufferLength, x, barWidth, barHeight, dataArray);
  }
    requestAnimationFrame(animate);
  }
  animate();
}

// Function to update the visualizer based on selection
document.getElementById("visualizerSelect").addEventListener("change", function(event) {
  currentVisualizer = event.target.value;  // Set selected visualizer
  playTrack(currentTrackIndex); // Restart the track to apply the new visualizer
});

// Playlist navigation functions
document.getElementById("nextBtn").addEventListener("click", function () {
  currentTrackIndex = (currentTrackIndex + 1) % playlist.length; // Loop to first track
  playTrack(currentTrackIndex);
});

document.getElementById("prevBtn").addEventListener("click", function () {
  currentTrackIndex =
    (currentTrackIndex - 1 + playlist.length) % playlist.length; // Loop to last track
  playTrack(currentTrackIndex);
});

// Play/Pause toggle
document.getElementById("playPauseBtn").addEventListener("click", function () {
  if (isPlaying) {
    audio1.pause();
    document.getElementById("playPauseBtn").classList.remove("mdi-pause");
    document.getElementById("playPauseBtn").classList.add("mdi-play");
  } else {
    audio1.play();
    document.getElementById("playPauseBtn").classList.remove("mdi-play");
    document.getElementById("playPauseBtn").classList.add("mdi-pause");
  }
  isPlaying = !isPlaying;
});

// File upload functionality
file.addEventListener("change", function () {
  const files = this.files;
  audio1.src = URL.createObjectURL(files[0]);
  audio1.load();
  audio1.play();

  const audioContext = new AudioContext();
  audioSource = audioContext.createMediaElementSource(audio1);
  analyser = audioContext.createAnalyser();
  audioSource.connect(analyser);
  analyser.connect(audioContext.destination);
  analyser.fftSize = 32 * 4;
  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);

  const barWidth = 15;
  let barHeight;
  let x;

  function animate() {
    x = 0;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    analyser.getByteFrequencyData(dataArray);
    drawVisualiser(bufferLength, x, barWidth, barHeight, dataArray);
    drawVisualiser2(bufferLength, x, barWidth, barHeight, dataArray);
    drawVisualiser3(bufferLength, x, barWidth, barHeight, dataArray);
    drawVisualiser4(bufferLength, x, barWidth, barHeight, dataArray);
    drawVisualiser5(bufferLength, x, barWidth, barHeight, dataArray);
    requestAnimationFrame(animate);
  }
  animate();
});

// Generate playlist
function generatePlaylist() {
  const playlistElement = document.getElementById("playlist");
  playlistElement.innerHTML = "";
  playlist.forEach((track, index) => {
    const listItem = document.createElement("li");
    listItem.textContent = `Track ${index + 1}`;
    listItem.addEventListener("click", () => playTrack(index));
    playlistElement.appendChild(listItem);
  });
}

// Initializing the playlist
generatePlaylist();

// Initial track play
playTrack(currentTrackIndex);


function drawVisualiser(bufferLength, x, barWidth, barHeight, dataArray) {
  for (let i = 0; i < bufferLength; i++) {
    barHeight = dataArray[i] * 1.1;
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(i * 1.6180339887);
    ctx.drawImage(sprite, 0, barHeight, barHeight / 2.5, barHeight / 2.5);
    x += barWidth;
    ctx.restore();
  }

  let size = dataArray[15] * 1.5 > 100 ? dataArray[15] : 100;
  ctx.drawImage(
    sprite,
    canvas.width / 2 - size / 2,
    canvas.height / 2 - size / 2,
    size,
    size,
  );
}

function drawVisualiser2(bufferLength, x, barWidth, barHeight, dataArray) {
  for (let i = 0; i < bufferLength; i++) {
    barHeight = dataArray[i] * 1.4;
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(((i * Math.PI * 10) / bufferLength) * 4);

    const hue = 250 + i * 0.3;
    ctx.fillStyle = "hsl(" + hue + ",100%," + barHeight / 3 + "%)";
    ctx.fillRect(0, 0, barWidth, barHeight);

    x += barWidth;
    ctx.restore();
  }
}

function drawVisualiser3(bufferLength, x, barWidth, barHeight, dataArray) {
  for (let i = 0; i < bufferLength; i++) {
    barHeight = dataArray[i];
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(i * 2.2);

    ctx.shadowBlur = 50;
    // const hue = 200 + i * 0.3
    const hue = 190 + (i * barHeight) / 15;
    ctx.strokeStyle = "hsl(" + hue + ",100%, 50%)";
    // ctx.fillStyle = 'hsl(' + hue + ',100%,' + barHeight/3 + '%)'
    ctx.fillStyle = "hsl(" + hue + ",100%, 50%)";
    // ctx.strokeStyle = 'hsl(' + hue + ',100%,' + barHeight/3 + '%)'
    // ctx.fillRect(0,0,barWidth,barHeight)
    // ctx.lineWidth = barHeight/20
    ctx.lineWidth = barHeight / 20 > 0.2 ? barHeight / 20 : 0.2;

    ctx.beginPath();
    ctx.arc(barHeight + 75, barHeight + 75, 50, 0, Math.PI * 2);
    ctx.moveTo(barHeight + 110, barHeight + 75);
    ctx.arc(barHeight + 75, barHeight + 75, 35, 0, Math.PI);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(barHeight + 65, barHeight + 65);
    ctx.arc(barHeight + 60, barHeight + 65, 5, 0, Math.PI * 2);
    ctx.moveTo(barHeight + 95, barHeight + 65);
    ctx.arc(barHeight + 90, barHeight + 65, 5, 0, Math.PI * 2);
    ctx.fill();

    x += barWidth;
    ctx.restore();
  }
}

function drawVisualiser4(bufferLength, x, barWidth, barHeight, dataArray) {
  // Calculate the available space per bar, based on canvas width
  const totalWidth = canvas.width; // Assuming a horizontal layout
  const spacing = (totalWidth - (bufferLength * barWidth)) / (bufferLength - 40); // Equal spacing between bars

  // Draw on the left side
  for (let i = 0; i < bufferLength; i++) {
      barHeight = dataArray[i] + (canvas.height / 4);

      // Position for horizontal display on the left
      const posX = canvas.width / 2 - x; // Mirror position on the left
      const posY = canvas.height;

      // Save the context state
      ctx.save();

      // Center and rotate the context for each image
      ctx.translate(posX, posY);
      ctx.drawImage(
          sprite2,
          -barHeight / 2.5, // Center the image horizontally
          -barHeight / 2.5, // Center the image vertically
          barHeight / 2.5, // Scale width of the bone
          barHeight / 2.5 // Scale height of the bone
      );

      // Restore the context state
      ctx.restore();

      // Increment x for the next position
      x += barWidth + spacing; // Dynamically calculated spacing
  }

  // Reset x for the right side
  x = barWidth + spacing;

  // Draw on the right side
  for (let i = 0; i < bufferLength; i++) {
      barHeight = dataArray[i] + (canvas.height / 4);

      // Position for horizontal display on the right
      const posX = canvas.width / 2 + x; // Mirror position on the right
      const posY = canvas.height;

      // Save the context state
      ctx.save();

      // Center and rotate the context for each image
      ctx.translate(posX, posY);
      ctx.drawImage(
          sprite2,
          -barHeight / 2.5, // Center the image horizontally
          -barHeight / 2.5, // Center the image vertically
          barHeight / 2.5, // Scale width of the bone
          barHeight / 2.5 // Scale height of the bone
      );

      // Restore the context state
      ctx.restore();

      // Increment x for the next position
      x += barWidth + spacing; // Dynamically calculated spacing
  }
}


// function drawVisualiser4(bufferLength, x, barWidth, barHeight, dataArray) {
//   // Calculate the available space per bar, based on canvas width
//   const totalWidth = canvas.width; // Assuming a horizontal layout
//   const spacing = (totalWidth - (bufferLength * barWidth)) / (bufferLength - 1); // Equal spacing between bars

//   for (let i = 0; i < bufferLength; i++) {
//       barHeight = dataArray[i] + (canvas.height / 4);

//       // Position for horizontal display
//       const posX = x;
//       const posY = canvas.height;

//       // Save the context state
//       ctx.save();

//       // Center and rotate the context for each image
//       ctx.translate(posX, posY);
//       ctx.drawImage(
//           sprite2,
//           -barHeight / 2.5, // Center the image horizontally
//           -barHeight / 2.5, // Center the image vertically
//           barHeight / 2.5, // Scale width of the bone
//           barHeight / 2.5 // Scale height of the bone
//       );

//       // Restore the context state
//       ctx.restore();

//       // Increment x for the next bone position
//       x += barWidth + spacing * 4; // Dynamically calculated spacing
//   }
// }


// function drawVisualiser4(bufferLength, x, barWidth, barHeight, dataArray) {
//   for (let i = 0; i < bufferLength; i++) {
//       barHeight = dataArray[i] + (canvas.height / 4);

//       // Position for horizontal display
//       const posX = x ;
//       const posY = canvas.height / 2;

//       // Save the context state
//       ctx.save();

//       // Center and rotate the context for each image
//       ctx.translate(posX, posY);
//       // ctx.rotate(i * 0.1); // Small angle rotation for horizontal positioning
//       ctx.drawImage(
//           sprite,
//           -barHeight / 2.5, // Center the image horizontally
//           -barHeight / 2.5, // Center the image vertically
//           barHeight / 2.5, // Scale width of the bone
//           barHeight / 2.5 // Scale height of the bone
//       );

//       // Restore the context state
//       ctx.restore();

//       // Increment x for the next bone position
//       x += barWidth + 25; // Adjust spacing between bones
//   }

// }

//
//

function drawVisualiser5(bufferLength, x, barWidth, barHeight, dataArray) {

  for (let i = 0; i < bufferLength; i++) {
    // remove this first if statement to default to tutorial
    // if (i < bufferLength * 0.8){
    barHeight = dataArray[i] * 2
    ctx.save()
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(i * 3.2);
    // const hue = 200 + i * 0.3
    const hue = 200 + i * 3
    ctx.strokeStyle = 'hsl(' + hue + ',100%,' + barHeight/3 + '%)'
    // ctx.fillRect(0,0,barWidth,barHeight)
    ctx.beginPath()
    ctx.moveTo(0,0)
    ctx.lineTo(0,barHeight)
    ctx.stroke()
    x += barWidth
    // }
    // as cycle through bufferlength, if i is more than bufferlength times 0.6, this will only run last 40% of data arry, ie lower frequencies
    // if (i > bufferLength * 0.2){ // this multipolication value will neeed adjusting based on song
    // if (i > bufferLength * 0.5){
    // if (i > bufferLength * 0.62 && i > bufferLength * 0.61){
    if (i > bufferLength * 0.55 ){ // targets specific freq
      ctx.beginPath()
      ctx.arc(0, 0, barHeight/1.5, 0, Math.PI * 2)
      ctx.stroke()

    }
    // if (i < bufferLength * 0.4){
    //   ctx.beginPath()
    //   ctx.arc(0, 0, barHeight/2, 0, Math.PI * 2)
    //   ctx.stroke()

    // }
    ctx.restore();
  }
}
