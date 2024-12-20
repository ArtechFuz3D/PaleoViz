const file = document.getElementById("fileupload");
const container = document.getElementById("container");
const canvas = document.getElementById("canvas1");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");

ctx.lineCap = 'square'
ctx.shadowOffsetX = 15;
ctx.shadowOffsetY = 10;
ctx.shadowBlur = 5;
ctx.shadowColor = "white";
// ctx.globalCompositeOperation = 'xor' // multiply, difference, color-dodge etc
// ctx.globalCompositeOperation = 'destination-under' // multiply, difference, color-dodge etc
// ctx.globalCompositeOperation = 'luminosity' // multiply, difference, color-dodge etc
// ctx.globalCompositeOperation = 'difference' // multiply, difference, color-dodge etc
// ctx.globalCompositeOperation = 'exclusion' // multiply, difference, color-dodge etc

// ctx.fillStyle = 'yellow'

let audioSource;
let analyser;

container.addEventListener("click", function () {
  const audio1 = document.getElementById("audio1");
  audio1.src = "tracks/rendezvouz.mp3";
  const audioContext = new AudioContext();
  // audio1.volume = 0.2;
  audio1.play();

  audioSource = audioContext.createMediaElementSource(audio1);
  analyser = audioContext.createAnalyser();
  audioSource.connect(analyser);
  analyser.connect(audioContext.destination);
  analyser.fftSize = 64 * 2;
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
  analyser.fftSize = 64 * 2;
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
    barHeight = dataArray[i] ;
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    // ctx.rotate(i * Math.PI * 10 / bufferLength);
    ctx.rotate(i * 6);
    const hue = i * 6;

    ctx.lineWidth = barHeight*0.25
    ctx.beginPath()
    ctx.moveTo(0,0)
    ctx.lineTo(0,barHeight)
    ctx.stroke()

    ctx.lineWidth = barHeight*0.2
    ctx.strokeStyle = 'rgba(150,150,150, 1)'
    ctx.beginPath()
    ctx.moveTo(0,0)
    ctx.lineTo(0,barHeight)
    ctx.stroke()


    // ctx.fillStyle = "hsl(" + hue + ",100%," + barHeight / 3 + "%)";
    // ctx.fillRect(0, 0, barWidth, barHeight);
    x += barWidth;
    ctx.restore();
  }
  for (let i = bufferLength; i > 20; i--) {
    barHeight = dataArray[i] > 80 ? dataArray[i] : 80
    ctx.save()
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(i * 3);
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.arc(0, barHeight * 3.5, barHeight*0.3, 0, Math.PI * 2)
    ctx.fillStyle = 'rgba(150,150,150, 1)'

    ctx.fill()
    ctx.stroke()
    ctx.restore();
  }
}
