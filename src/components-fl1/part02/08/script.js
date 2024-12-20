const file = document.getElementById("fileupload");
const container = document.getElementById("container");
const canvas = document.getElementById("canvas1");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");

// ctx.lineCap = 'round'
// ctx.shadowOffsetX = 5;
// ctx.shadowOffsetY = 5;
// ctx.shadowBlur = 0;
// ctx.shadowColor = "white";
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
  audio1.src = "tracks/dumpweed30.mp3";
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
    barHeight = dataArray[i] * 0.8;
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    // ctx.rotate(i * Math.PI * 10 / bufferLength);
    ctx.rotate(i * 0.14);
    const hue = i * 1.5;

    ctx.fillStyle = "hsl(" + hue + ",100%," + barHeight / 3 + "%)";
    ctx.strokeStyle = "white";
    ctx.fillRect(barHeight / 2, barHeight / 2, barWidth, barHeight);
    barHeight > 80
      ? ctx.strokeRect(barHeight / 2, barHeight / 2, barWidth, barHeight * 1.2)
      : ctx.strokeRect(0, 0, 0, 0);
    barHeight > 110
      ? ctx.strokeRect(
          barHeight / 2,
          barHeight * 1.8,
          barWidth,
          barHeight * 0.2,
        )
      : ctx.strokeRect(0, 0, 0, 0);

    x += barWidth;
    ctx.restore();
  }
}
