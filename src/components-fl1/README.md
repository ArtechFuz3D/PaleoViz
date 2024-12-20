# saved progress of cool viz

```astro
---
import "@fontsource-variable/inter";

import "~/styles/index.css";


const { generator, site } = Astro;
const image = new URL("social.jpg", site);
const description =
  "Build fast websites, faster. Astro is a new kind of site builder for the modern web. Lightning-fast performance meets powerful developer experience.";



---

<!doctype html>
<html lang="en" class="h-full motion-safe:scroll-smooth" data-theme="dark">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE-edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
    <meta name="generator" content={generator} />

    <title>FLViz1 JS Sounds</title>
    <meta name="description" content={description} />

    <!-- social media -->
    <meta property="og:title" content="FLViz1 JS Sounds" />
    <meta property="og:type" content="website" />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={image} />
    <meta property="og:url" content={site} />
    <meta name="twitter:card" content="summary_large_image" />

    <!-- initialize theme -->
    <script is:inline>
      const themeSaved = localStorage.getItem("theme");

      if (themeSaved) {
        document.documentElement.dataset.theme = themeSaved;
      } else {
        const prefersDark = window.matchMedia(
          "(prefers-color-scheme: dark)",
        ).matches;
        document.documentElement.dataset.theme = prefersDark ? "dark" : "light";
      }

      window
        .matchMedia("(prefers-color-scheme: dark)")
        .addEventListener("change", (event) => {
          if (!localStorage.getItem("theme")) {
            document.documentElement.dataset.theme = event.matches
              ? "dark"
              : "light";
          }
        });
    </script>
  </head>
  <body
    class="h-full overflow-x-hidden bg-default text-default text-base selection:bg-secondary selection:text-white"
  >


    <!-- <PlaybackManager client:only="react"/> -->

    <div id="container" class=" space-y-24 px-8 py-8 absolute h-full ">
    <!-- <button  id="button1">BUTT 1</button>
    <button  id="button2">BUTT 2</button> -->


    <!-- <canvas class="absolute h-full blur-sm invert brightness-150 hover:blur-lg" id="canvas1"></canvas> -->
    <!-- <canvas class="absolute h-full blur-lg brightness-200" id="canvas1"></canvas> -->
    <canvas class="absolute h-full blur-xl hover:blur brightness-200" id="canvas1"></canvas>
    <audio class="  mt-150-auto block "  id="audio1" controls></audio>

    <div  class="absolute white z-100 ">
    <input class="bg-black bottom-10 font-black flex-auto block " type="file"  id="fileupload" accept="audio/*" />
  </div>
    <script src="../components-fl1/scripta.js" ></script>
</div>

  </body>
</html>

```

```js
// const button1 = document.getElementById("button1")
// let audio1 = new Audio()
// audio1.src = 'tracks/rhinestone.mp3'
const file = document.getElementById('fileupload')

const container = document.getElementById('container')
const canvas = document.getElementById('canvas1')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
const ctx = canvas.getContext('2d')
let audioSource
let analyser



container.addEventListener('click', function() {
    const audio1 = document.getElementById('audio1')

    audio1.src = 'tracks/rhinestone.mp3'
    const audioContext = new AudioContext()
    audio1.play()


    audioSource = audioContext.createMediaElementSource(audio1)
    analyser = audioContext.createAnalyser()
    audioSource.connect(analyser)
    analyser.connect(audioContext.destination)
    analyser.fftSize = 256
    const bufferLength = analyser.frequencyBinCount
    const dataArray = new Uint8Array(bufferLength)

    const barWidth = (canvas.width/2)/bufferLength
    let barHeight
    let x
    
    function animate(){
        x = 0
        ctx.clearRect(0,0,canvas.width, canvas.height )
        analyser.getByteFrequencyData(dataArray)
        drawVisualiser(bufferLength, x, barWidth, barHeight, dataArray)

        requestAnimationFrame(animate)
    }
    animate()
})

file.addEventListener('change', function() {
    // console.log(this.files)
    const files = this.files
    const audio1 = document.getElementById('audio1')
    audio1.src = URL.createObjectURL(files[0])
    audio1.update()
    audio1.load()
    audio1.play()

    audioSource = audioContext.createMediaElementSource(audio1)
    analyser = audioContext.createAnalyser()
    audioSource.connect(analyser)
    analyser.connect(audioContext.destination)
    analyser.fftSize = 8
    const bufferLength = analyser.frequencyBinCount
    const dataArray = new Uint8Array(bufferLength)

    const barWidth = (canvas.width/2)/bufferLength
    let barHeight
    let x
    function animate(){
        x = 0
        ctx.clearRect(0,0,canvas.width, canvas.height)
        analyser.getByteFrequencyData(dataArray)
        // for (let i = 0; i < bufferLength; i++){
        //     barHeight = dataArray[i]
        //     ctx.fillStyle = 'white'
        //     ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight)
        //     x += barWidth
        // }
        drawVisualiser(bufferLength, x, barWidth, barHeight, dataArray)

        requestAnimationFrame(animate)
    }
    animate()
})

// function drawVisualiser(bufferLength, x, barWidth, barHeight, dataArray){

//     for (let i = 0; i < bufferLength; i++){
//         // barHeight = dataArray[i]
//         barHeight =  dataArray[i] + (canvas.height/4 )
//         // const red = 100
//         const red = i * barHeight/30
//         // const green = 100
//         const green = i * 2
//         // const blue = Math.random(i * barHeight/4)
//         // const blue = barHeight/2
//         const blue = barHeight
//         // ctx.fillStyle = 'white'
//         ctx.fillStyle = 'white'
//         ctx.fillRect(x, canvas.height - barHeight -100, barWidth, 20)
//         ctx.fillStyle = 'rgb(' + red + ',' + green + ',' + blue + ')'
//         ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight)
//         x += barWidth
//     }
// }
function drawVisualiser(bufferLength, x, barWidth, barHeight, dataArray){

    for (let i = 0; i < bufferLength; i++){
        barHeight = dataArray[i]
        // barHeight =  dataArray[i] + (canvas.height/4 )
        ctx.save()
        // translate changes the origin of the object?
        ctx.translate(canvas.width/2, canvas.height/2)
        ctx.rotate(i + Math.PI * 2 / bufferLength)
        // const red = 100
        const red = i * barHeight/30
        // const green = 100
        const green = i * 2
        // const blue = Math.random(i * barHeight/4)
        // const blue = barHeight/2
        const blue = barHeight
        // ctx.fillStyle = 'white'
        ctx.fillStyle = 'white'
        ctx.fillRect(x, canvas.height - barHeight -10, barWidth, 20)
        ctx.fillStyle = 'rgb(' + red + ',' + green + ',' + blue + ')'
        // ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight)
        ctx.fillRect(0, 0, barWidth, barHeight)
        x += barWidth
        ctx.restore()
    }
}

```


## 2

```js
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

  audio1.src = "tracks/nowherefastremastered.mp3";
  const audioContext = new AudioContext();
  audio1.play();

  audioSource = audioContext.createMediaElementSource(audio1);
  analyser = audioContext.createAnalyser();
  audioSource.connect(analyser);
  analyser.connect(audioContext.destination);
  analyser.fftSize = 256;
  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);

  const barWidth = canvas.width / 2 / bufferLength;
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
  analyser.fftSize = 8;
  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);

  const barWidth = canvas.width / 2 / bufferLength;
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
    barHeight = dataArray[i];
    // barHeight =  dataArray[i] + (canvas.height/4 )
    ctx.save();
    // translate changes the origin of the object?
    ctx.translate(canvas.width / 2, canvas.height / 2);
    // ctx.rotate(i + Math.PI * 2 / bufferLength)
    ctx.rotate((i * Math.PI * 2) / bufferLength);
    // const red = 100
    const red = (i * barHeight) / 30;
    // const green = 100
    const green = i * 2;
    // const blue = Math.random(i * barHeight/4)
    // const blue = barHeight/2
    const blue = barHeight / 2;
    // ctx.fillStyle = 'white'
    // ctx.fillStyle = 'white'
    // ctx.fillRect(0, 0, barWidth, 1)
    const hue = i * 15;
    ctx.fillStyle = "hsl(" + hue + ",100%, 50%)";
    // ctx.fillStyle = "rgb(" + red + "," + green + "," + blue + ")";
    // ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight)
    ctx.fillRect(0, 0, barWidth, barHeight);
    x += barWidth;
    ctx.restore();
  }
}

```