const file = document.getElementById("fileupload");
const container = document.getElementById("container");
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Additional canvases for constellations
const canvas3 = document.getElementById("canvas-constellation");
const ctx3 = canvas3.getContext("2d");
canvas3.width = window.innerWidth;
canvas3.height = window.innerHeight;

const canvas2 = document.getElementById("canvas-constellation2");
const ctx2 = canvas2.getContext("2d");
canvas2.width = window.innerWidth;
canvas2.height = window.innerHeight;

// Variables for audio and visualization
let audioSource;
let analyser;
let dataArray;
let bufferLength;

class Particle {
  constructor(effect, index) {
    this.effect = effect;
    this.index = index;
    this.radius = Math.random() * 5 + 2;
    this.x = Math.random() * this.effect.width;
    this.y = Math.random() * this.effect.height;
    this.baseX = this.x;
    this.baseY = this.y;
    this.vx = Math.random() * 2 - 1;
    this.vy = Math.random() * 2 - 1;
    this.friction = 0.95;
    this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
  }

  draw(context) {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    context.fillStyle = this.color;
    context.fill();
  }

  update(audioData) {
    for (let i = 0; i < bufferLength; i++) {

      const frequency = audioData[this.index];
      const scale = frequency / 250;
      this.radius = 5 + scale * 250;
      // this.x += this.vx * this.friction * (bufferLength * frequency);
      // this.y += this.vy * this.friction * (bufferLength * frequency) ;
      this.x += this.vx * this.friction / bufferLength;
      this.y += this.vy * this.friction / bufferLength ;
    }


    if (this.x < this.radius || this.x > this.effect.width - this.radius) {
      this.vx *= -1;
    }
    if (this.y < this.radius || this.y > this.effect.height - this.radius) {
      this.vy *= -1;
    }
  }

  reset() {
    this.x = Math.random() * this.effect.width;
    this.y = Math.random() * this.effect.height;
  }
}

class Effect {
  constructor(canvas, context) {
    this.canvas = canvas;
    this.context = context;
    this.width = canvas.width;
    this.height = canvas.height;
    this.particles = [];
    this.numberOfParticles = 50;

    this.createParticles();
    window.addEventListener("resize", this.resize.bind(this));
  }

  createParticles() {
    this.particles = [];
    for (let i = 0; i < this.numberOfParticles; i++) {
      this.particles.push(new Particle(this, i));
    }
  }

  handleParticles(audioData) {
    this.particles.forEach((particle) => {
      particle.update(audioData);
      particle.draw(this.context);
    });
    this.connectParticles();
  }

  connectParticles() {
    const maxDistance = 200;
    this.particles.forEach((a, i) => {
      for (let j = i + 1; j < this.particles.length; j++) {
        const b = this.particles[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const distance = Math.hypot(dx, dy);

        if (distance < maxDistance) {
          const opacity = 1 - distance / maxDistance;
          this.context.save();
          this.context.globalAlpha = opacity;
          this.context.beginPath();
          this.context.moveTo(a.x, a.y);
          this.context.lineTo(b.x, b.y);
          this.context.lineWidth = 20
          this.context.strokeStyle = `hsl(200, 100%, 70%)`;
          this.context.stroke();
          this.context.restore();
        }
      }
    });
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.createParticles();
  }
}

const effect = new Effect(canvas3, ctx3);

function setupAudio(audioElement) {
  const audioContext = new AudioContext();
  audioSource = audioContext.createMediaElementSource(audioElement);
  analyser = audioContext.createAnalyser();
  analyser.fftSize =128;
  bufferLength = analyser.frequencyBinCount;
  dataArray = new Uint8Array(bufferLength);

  audioSource.connect(analyser);
  analyser.connect(audioContext.destination);

  effect.numberOfParticles = bufferLength;
  effect.createParticles();
}

function drawVisualiser() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  analyser.getByteFrequencyData(dataArray);

  const barWidth = 15;
  let x = 0;
  for (let i = 0; i < bufferLength; i++) {
    const barHeight = dataArray[i] * 0.1;
    ctx.fillStyle = `hsl(${(i * 10) + 200}, 100%, 50%)`;
    // ctx.fillRect(x, (canvas.height/2) - barHeight, barWidth, barHeight);
    ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
    x += barWidth + 5;
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx3.clearRect(0, 0, canvas3.width, canvas3.height);

  drawVisualiser();
  analyser.getByteFrequencyData(dataArray);
  effect.handleParticles(dataArray);

  requestAnimationFrame(animate);
}

// Event listeners
container.addEventListener("click", () => {
  const audio1 = document.getElementById("audio1");
  audio1.src = "tracks/youdontbringmeflowers.mp3";
  audio1.volume = 1;
  audio1.play();
  setupAudio(audio1);
  animate();
});

file.addEventListener("change", function () {
  const files = this.files;
  if (files.length) {
    const audio1 = document.getElementById("audio1");
    audio1.src = URL.createObjectURL(files[0]);
    audio1.play();
    setupAudio(audio1);
    animate();
  }
});
