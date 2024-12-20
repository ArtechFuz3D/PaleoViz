const file = document.getElementById("fileupload");
const container = document.getElementById("container");
const canvas = document.getElementById("canvas1");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");

ctx.lineWidth = 3

// ctx.lineCap = 'square'
// ctx.shadowOffsetX = 15;
// ctx.shadowOffsetY = 10;
// ctx.shadowBlur = 5;
// ctx.shadowColor = "white";
// ctx.globalCompositeOperation = 'xor' // multiply, difference, color-dodge etc
// ctx.globalCompositeOperation = 'multiply' // multiply, difference, color-dodge etc
// ctx.globalCompositeOperation = 'luminosity' // multiply, difference, color-dodge etc
// ctx.globalCompositeOperation = 'difference' // multiply, difference, color-dodge etc
// ctx.globalCompositeOperation = 'exclusion' // multiply, difference, color-dodge etc

// ctx.fillStyle = 'yellow'

let audioSource;
let analyser;

container.addEventListener("click", function () {
  const audio1 = document.getElementById("audio1");
  audio1.src = "tracks/ecsfatic.mp3";
  const audioContext = new AudioContext();
  // audio1.volume = 0.6;
  audio1.play();

  audioSource = audioContext.createMediaElementSource(audio1);
  analyser = audioContext.createAnalyser();
  audioSource.connect(analyser);
  analyser.connect(audioContext.destination);
  analyser.fftSize = 64 ;
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
  analyser.fftSize = 64 ;
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
