const file = document.getElementById("fileupload");
const container = document.getElementById("container");
const canvas = document.getElementById("canvas1");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");

// ctx.lineCap = 'round'
// ctx.shadowOffsetX = 2;
// ctx.shadowOffsetY = 5;
// ctx.shadowBlur = 20;
// ctx.shadowColor = "white";
// ctx.globalCompositeOperation = 'xor' // multiply, difference, color-dodge etc 
// ctx.globalCompositeOperation = 'destination-under' // multiply, difference, color-dodge etc 
// ctx.globalCompositeOperation = 'luminosity' // multiply, difference, color-dodge etc 
// ctx.globalCompositeOperation = 'difference' // multiply, difference, color-dodge etc 
// ctx.globalCompositeOperation = 'exclusion' // multiply, difference, color-dodge etc 

ctx.fillStyle = 'yellow'

let audioSource;
let analyser;

container.addEventListener("click", function () {
  const audio1 = document.getElementById("audio1");
  audio1.src = "tracks/38.mp3";
  const audioContext = new AudioContext();
  audio1.play();

  audioSource = audioContext.createMediaElementSource(audio1);
  analyser = audioContext.createAnalyser();
  audioSource.connect(analyser);
  analyser.connect(audioContext.destination);
  analyser.fftSize = 32 * 4 * 4;
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
  analyser.fftSize = 32 * 4* 4;
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
    requestAnimationFrame(animate);
  }
  animate();
});

function drawVisualiser(bufferLength, x, barWidth, barHeight, dataArray) {
  for (let i = 0; i < bufferLength; i++) {
    // barHeight = dataArray[i] * 1.9;
    barHeight = dataArray[i] * 1;
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    // ctx.rotate((i * bufferLength) / 11.2);
    ctx.rotate(i * 1.1);
    // ctx.lineWidth = barHeight / 7;
    ctx.fillRect(0,0,-barHeight/2,-barHeight)


    x += barWidth;
    ctx.restore();
  }
  for (let i = 0; i < 15; i++) {
    barHeight = dataArray[i] * 0.8;
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(i * 1.2);

    ctx.beginPath()
    ctx.arc(0,barHeight * 1.4, barHeight/4, 0, Math.PI*2)
    ctx.fill()

    x += barWidth;
    ctx.restore();
  }
}
