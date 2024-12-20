const file = document.getElementById("fileupload");
const container = document.getElementById("container");
const canvas = document.getElementById("canvas1");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");

// ctx.lineCap = 'round'
ctx.shadowOffsetX = 5;
ctx.shadowOffsetY = 5;
ctx.shadowBlur = 0;
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
  audio1.src = "tracks/dointime17.mp3";
  const audioContext = new AudioContext();
  audio1.play();

  audioSource = audioContext.createMediaElementSource(audio1);
  analyser = audioContext.createAnalyser();
  audioSource.connect(analyser);
  analyser.connect(audioContext.destination);
  analyser.fftSize = 64;
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
  analyser.fftSize = 64;
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
    barHeight = dataArray[i] * 1;
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(i * 8.13);
    const hue = 20 + i * 0.4
    // ctx.fillStyle = 'hsl(' + hue + ',100%,' + barHeight/3 + '%)'
    ctx.strokeStyle = 'hsl(' + hue + ',100%,' + barHeight/3 + '%)'

    // ctx.fillRect(0,0,barWidth,barHeight)

    ctx.font = dataArray[i] + 'px Helvetica' /4
    ctx.fillText('SummerTime', 40, barHeight*1.6)
    ctx.strokeText('SummerTime', 40, barHeight*1.6)

    x += barWidth;
    ctx.restore();
  }

  const fontSize = dataArray[15] / 3
  ctx.font = fontSize + 'px Helvetica'
  ctx.fillText('SummerTime', canvas.width*0.5 -fontSize/3, canvas.height*0.5  +fontSize/3)
  ctx.strokeText('SummerTime', canvas.width*0.5 -fontSize/3, canvas.height*0.5  +fontSize/3)

}
