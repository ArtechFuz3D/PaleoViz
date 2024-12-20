// const button1 = document.getElementById("button1")
// let audio1 = new Audio()
// audio1.src = 'tracks/rhinestone.mp3'
const file = document.getElementById("fileupload");

const container = document.getElementById("container");
const canvas = document.getElementById("canvas1");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");
let audioSource;
let analyser;

container.addEventListener("click", function () {
  const audio1 = document.getElementById("audio1");
  audio1.src = "tracks/loverc.mp3";
  const audioContext = new AudioContext();
  const gainNode = audioContext.createGain();
  gainNode.gain.value = 0.3; // Very low volume
  
  audio1.play();
  
  // Create audio source from the audio element
  const audioSource = audioContext.createMediaElementSource(audio1);
  
  // Create analyser node
  const analyser = audioContext.createAnalyser();
  
  // Connect the audio source to the gain node
  audioSource.connect(gainNode);
  
  // Connect the gain node to the analyser
  gainNode.connect(analyser);
  
  // Connect the analyser to the audio context's destination (speakers)
  analyser.connect(audioContext.destination);
  
  // Optionally connect the gain node directly to the destination
  gainNode.connect(audioContext.destination);
  analyser.fftSize = 256;
  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);

//   const barWidth = canvas.width / 2 / bufferLength;
//   const barWidth = 50;
  const barWidth = 15;
  let barHeight;
  let x;

  function animate() {
    x = 0;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    analyser.getByteFrequencyData(dataArray);
    drawVisualiser(bufferLength, x, barWidth, barHeight, dataArray);
    requestAnimationFrame(animate);
  }
  animate();
});

file.addEventListener("change", function () {
  const files = this.files;
  const audio1 = document.getElementById("audio1");
  audio1.src = URL.createObjectURL(files[0]);
  audio1.update();
  audio1.load();
  audio1.play();

  audioSource = audioContext.createMediaElementSource(audio1);
  analyser = audioContext.createAnalyser();
  audioSource.connect(analyser);
  analyser.connect(audioContext.destination);
  analyser.fftSize = 256;
  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);

//   const barWidth = canvas.width / 2 / bufferLength;
  const barWidth = 15
  let barHeight;
  let x;
  function animate() {
    x = 0;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    analyser.getByteFrequencyData(dataArray);
    drawVisualiser(bufferLength, x, barWidth, barHeight, dataArray);
    requestAnimationFrame(animate);
  }
  animate();
});

function drawVisualiser(bufferLength, x, barWidth, barHeight, dataArray) {
  for (let i = 0; i < bufferLength; i++) {
    barHeight = dataArray[i] * 1.5;

    // for static circel centered
    // barHeight = dataArray[i] * 1.5 + 150;
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);

    // rotate determines shape, higher values = more subdivided spiral
    // ctx.rotate((i * Math.PI * 2) / bufferLength);
    // ctx.rotate((i * Math.PI * 4) / bufferLength);
    // ctx.rotate((i * Math.PI * 40) / bufferLength);
    // ctx.rotate(i + Math.PI * 8 / bufferLength);
    ctx.rotate(i * Math.PI * 20 / bufferLength);
    // const hue = i * 15;
    // const hue = i * 5;
    // const hue = i * 50;
    // const hue = i /2;
    const hue = i * 2;
    ctx.fillStyle = 'hsl(' + hue + ',100%,' + barHeight/3 + '%)'
    ctx.fillRect(0, 0, barWidth, barHeight);

    x += barWidth;
    ctx.restore();
  }
}
