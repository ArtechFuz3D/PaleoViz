# 03 good , before start 03 so technically 02

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
  audio1.src = "tracks/worldholdon.mp3";
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
    barHeight = dataArray[i] * 1.4;
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    // ctx.rotate(i * Math.PI * 10 /bufferLength * 4);
    // ctx.rotate(i * bufferLength * -3.164);
    ctx.rotate(i * bufferLength * 4.83 / Math.sin(2));

    const hue =  50 + i * 4;
    // ctx.fillStyle = 'hsl(' + hue + ',100%,' + barHeight/3 + '%)'
    ctx.fillStyle = 'hsl(' + hue + ',100%, 50%)'
    // ctx.fillRect(0, 0, barWidth, barHeight);

    // ctx.beginPath()
    // ctx.arc(0, barHeight, barHeight/10, 0, Math.PI *2)

    // ctx.arc(0, barHeight/1.5, barHeight/20, 0, Math.PI *2)

    // ctx.arc(0, barHeight/2, barHeight/30, 0, Math.PI *2)

    // ctx.arc(0, barHeight/3, barHeight/40, 0, Math.PI *2)
    // ctx.fill()
    ctx.beginPath()
    ctx.arc(10, barHeight, barHeight/10, 0, Math.PI *2)
    ctx.fill()
    ctx.beginPath()
    ctx.arc(10, barHeight/1.5, barHeight/20, 0, Math.PI *2)
    ctx.fill()
    ctx.beginPath()
    ctx.arc(10, barHeight/2, barHeight/30, 0, Math.PI *2)
    ctx.fill()
    ctx.beginPath()
    ctx.arc(10, barHeight/3, barHeight/40, 0, Math.PI *2)
    ctx.fill()

    // ctx.stroke()

    x += barWidth;
    ctx.restore();
  }
}
```