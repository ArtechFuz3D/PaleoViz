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
ctx.globalCompositeOperation = 'difference' // multiply, difference, color-dodge etc 
// ctx.globalCompositeOperation = 'exclusion' // multiply, difference, color-dodge etc 
let audioSource;
let analyser;

container.addEventListener("click", function () {
  const audio1 = document.getElementById("audio1");
  audio1.src = "tracks/lastnight.mp3";
  const audioContext = new AudioContext();
  audio1.play();

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
    ctx.rotate(i * Math.PI * 4 /bufferLength);
    // ctx.lineWidth = barHeight / 7;
    // const hue = 200 + i * 5;
    const hue =  i * 0.3;
    // ctx.fillStyle = 'hsl(' + hue + ',100%,' + barHeight/3 + '%)'
    // ctx.strokeStyle = "hsl(" + hue + ",100%, 50%)";

    ctx.fillStyle = 'blue'
    ctx.strokeStyle = 'blue'

    ctx.lineWidth = barHeight/10
    // ctx.fillRect(0,0,barWidth,barHeight)
    ctx.beginPath();
    // ctx.moveTo(0, barHeight / 1.1);
    ctx.moveTo(0, 0);
    ctx.lineTo(0, barHeight);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(0, barHeight+barHeight/5, barHeight/20, 0, Math.PI*2)
    ctx.fill()

    ctx.beginPath();
    ctx.arc(0, barHeight+barHeight/2, barHeight/10, 0, Math.PI*2)
    ctx.fill()

    x += barWidth;
    ctx.restore();
  }
}
