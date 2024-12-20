# poly shape

```js
const file = document.getElementById("fileupload");
const container = document.getElementById("container");
const canvas = document.getElementById("canvas1");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");

ctx.shadowOffsetX = 2
ctx.shadowOffsetY = 5
ctx.shadowBlur = 0
ctx.shadowColor = 'white'
let audioSource;
let analyser;


container.addEventListener("click", function () {
  const audio1 = document.getElementById("audio1");
  audio1.src = "tracks/ecsfatic.mp3";
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
    barHeight = dataArray[i] * 1.1;
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(i *  bufferLength / 1.2 );
    ctx.lineWidth = barHeight/7
    const hue = 200 + i * 5
  ctx.fillStyle = 'hsl(' + hue + ',100%,' + barHeight/3 + '%)'
  ctx.strokeStyle = 'hsl(' + hue + ',100%, 50%)'
  ctx.fillRect(0, 0, barWidth, barHeight)
  ctx.beginPath()
  ctx.arc(0, barHeight, barHeight/10, 0, Math.PI *2)

  ctx.arc(0, barHeight/1.5, barHeight/20, 0, Math.PI *2)

  ctx.arc(0, barHeight/2, barHeight/30, 0, Math.PI *2)

  ctx.arc(0, barHeight/3, barHeight/40, 0, Math.PI *2)
  ctx.fill()
ctx.beginPath()
ctx.moveTo(0, barHeight/1.1)
ctx.lineTo(barHeight/1.1, barHeight)
ctx.stroke()
   
    x += barWidth;
    ctx.restore();
  }

}

```