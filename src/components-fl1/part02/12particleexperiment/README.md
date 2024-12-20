# Custom Particle Integration (pre attempt, combined files)

```js
const file = document.getElementById("fileupload");
const container = document.getElementById("container");
const canvas = document.getElementById("canvas1");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");

// ctx.lineWidth = 3

// ctx.lineCap = 'square'
ctx.shadowOffsetX = 0;
ctx.shadowOffsetY = 0;
// ctx.shadowBlur = 15;
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
  audio1.src = "tracks/mightbewrong.mp3";
  const audioContext = new AudioContext();
  audio1.volume = 0.6;
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
    barHeight = dataArray[i];
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(i * 2.2);

    ctx.shadowBlur = 50;
    // const hue = 200 + i * 0.3
    const hue = 190 + (i * barHeight) / 15;
    ctx.strokeStyle = "hsl(" + hue + ",100%, 50%)";
    // ctx.fillStyle = 'hsl(' + hue + ',100%,' + barHeight/3 + '%)'
    ctx.fillStyle = "hsl(" + hue + ",100%, 50%)";
    // ctx.strokeStyle = 'hsl(' + hue + ',100%,' + barHeight/3 + '%)'
    // ctx.fillRect(0,0,barWidth,barHeight)
    // ctx.lineWidth = barHeight/20
    ctx.lineWidth = barHeight / 20 > 0.2 ? barHeight / 20 : 0.2;

    ctx.beginPath();
    ctx.arc(barHeight + 75, barHeight + 75, 50, 0, Math.PI * 2);
    ctx.moveTo(barHeight + 110, barHeight + 75);
    ctx.arc(barHeight + 75, barHeight + 75, 35, 0, Math.PI);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(barHeight + 65, barHeight + 65);
    ctx.arc(barHeight + 60, barHeight + 65, 5, 0, Math.PI * 2);
    ctx.moveTo(barHeight + 95, barHeight + 65);
    ctx.arc(barHeight + 90, barHeight + 65, 5, 0, Math.PI * 2);
    ctx.fill();

    x += barWidth;
    ctx.restore();
  }
}

const canvas3 = document.getElementById("canvas-constellation");
const ctx3 = canvas3.getContext("2d");
canvas3.width = window.innerWidth;
canvas3.height = window.innerHeight;
const canvas2 = document.getElementById("canvas-constellation2");
const ctx2 = canvas2.getContext("2d");
canvas2.width = window.innerWidth;
canvas2.height = window.innerHeight;

const gradient = ctx3.createLinearGradient(0, 0, canvas3.width, canvas3.height);
gradient.addColorStop(0, "red");
gradient.addColorStop(0.5, "yellow");
gradient.addColorStop(1, "red");
ctx3.fillStyle = gradient;
ctx3.strokeStyle = "silver";

const gradient2 = ctx2.createLinearGradient(0, 0, canvas2.width, canvas2.height);
gradient2.addColorStop(0, "red");
gradient2.addColorStop(0.5, "yellow");
gradient2.addColorStop(1, "red");
ctx2.fillStyle = gradient2;
ctx2.strokeStyle = "silver";
ctx2.lineWidth = 0.5

class Particle {
  constructor(effect) {
    this.effect = effect;

    // this.radius = Math.random() * 7 + 2;
    // this.radius = 2;
    this.radius = Math.floor(Math.random() * (32 + 16 )* 2);
    // this.radius = Math.floor(Math.random() * 16 + 8 );
    this.buffer = this.radius * 4
    this.x =
      this.radius + Math.random() * (this.effect.width - this.radius * 2);
    this.y =
      this.radius + Math.random() * (this.effect.height - this.radius * 2);

    this.vx = Math.random() * 1 - 0.5;
    this.vy = Math.random() * 1 - 0.5;
    this.pushX = 0;
    this.pushY = 0;
    this.friction = 0.95;
  }
  draw(context) {
    context.beginPath();

    // First Arc (Partial)
    context.arc(this.x, this.y, this.radius, 2, Math.PI * 1.5, true); // Arc 1
    context.moveTo(this.x, this.y); // Reset starting point

    // Second Arc (Different Angles or Radius)
    context.arc(this.x, this.y, this.radius * 0.8, Math.PI, Math.PI * 2, false); // Arc 2

    // Draw a straight line
    context.moveTo(this.x, this.y); // Starting point for the line
    context.lineTo(this.x + 5, this.y + 15); // Straight line

    // Draw a bezier curve
    context.moveTo(this.x, this.y); // Starting point for the curve
    context.bezierCurveTo(
      this.cx1,
      this.cy1, // First control point
      this.cx2,
      this.cy2, // Second control point
      this.x2,
      this.y2, // End point
    );

    // Apply Stroke or Fill (Uncomment to render)
    // context.stroke(); // Uncomment to draw outlines
    context.fill(); // Uncomment to fill shapes
  }
  update() {
    if (this.effect.mouse.pressed) {
      const dx = this.x - this.effect.mouse.x;
      const dy = this.y - this.effect.mouse.y;
      const distance = Math.hypot(dx, dy);
      const force = (this.effect.mouse.radius / distance) * distance / this.effect.mouse.radius;
      // const force =  (distance / this.effect.mouse.radius);
      if (distance < this.effect.mouse.radius) {
        const angle = Math.atan2(dx, dy);
        // this.pushX += Math.cos(angle) * force;
        this.pushX -= Math.cos(angle) * force;
        this.pushY -= Math.sin(angle) * force;
      }
    }

    this.x += (this.pushX *= this.friction) + this.vx;
    this.y += (this.pushY *= this.friction) + this.vy;

    // if (this.x < this.radius) {
    if (this.x < this.buffer) {
      // this.x = this.radius;
      this.x = this.buffer;
      this.vx *= -1;
    // } else if (this.x > this.effect.width - this.radius) {
    } else if (this.x > this.effect.width - this.buffer) {
      // this.x = this.effect.width - this.radius;
      this.x = this.effect.width - this.buffer;
      this.vx *= -1;
    }
    // if (this.y < this.radius) {
    if (this.y < this.buffer) {
      // this.y = this.radius;
      this.y = this.buffer;
      this.vy *= -1;
    // } else if (this.y > this.effect.height - this.radius) {
    } else if (this.y > this.effect.height - this.buffer) {
      // this.y = this.effect.height - this.radius;
      this.y = this.effect.height - this.buffer;
      this.vy *= -1;
    }

    // this.x += (this.pushX *= this.friction) + this.vx;
    // this.y += (this.pushY *= this.friction) + this.vy;
  }
  reset() {
    this.x =
      this.radius + Math.random() * (this.effect.width - this.radius * 2);
    this.y =
      this.radius + Math.random() * (this.effect.height - this.radius * 2);
  }
}

class Effect {
  constructor(canvas, context) {
    this.canvas = canvas;
    this.context = context;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.particles = [];
    this.numberOfParticles = 50;
    this.createParticles();

    this.mouse = {
      x: 0,
      y: 0,
      pressed: false,
      radius: 200,
    };

    window.addEventListener("resize", (e) => {
      this.resize(e.target.window.innerWidth, e.target.window.innerHeight);
    });
    window.addEventListener("mousemove", (e) => {
      // console.log(e)
      // console.log(e.x, e.y)
      if (this.mouse.pressed) {
        this.mouse.x = e.x;
        this.mouse.y = e.y;
        // console.log(thios.mouse.x, this.mouse.y)
      }
    });
    window.addEventListener("mousemove", (e) => {
      this.mouse.pressed = true;
      this.mouse.x = e.x;
      this.mouse.y = e.y;
    });

    // window.addEventListener('mousedown', e => {
    //   this.mouse.pressed = true
    //   this.mouse.x = e.x
    //   this.mouse.y = e.y
    // })
    // window.addEventListener('mouseup', e => {
    //   this.mouse.pressed = false
    // })
  }
  createParticles() {
    for (let i = 0; i < this.numberOfParticles; i++) {
      this.particles.push(new Particle(this));
    }
  }
  handleParticles(context, context2) {
    this.connectParticles(context2);
    this.particles.forEach((particle) => {
      particle.draw(context);
      particle.update();
    });
  }
  connectParticles(context) {
    const maxDistance = 100;
    for (let a = 0; a < this.particles.length; a++) {
      for (let b = a; b < this.particles.length; b++) {
        // Pythagorean
        const dx = this.particles[a].x - this.particles[b].x;
        const dy = this.particles[a].y - this.particles[b].y;
        const distance = Math.hypot(dx, dy);
        if (distance < maxDistance) {
          const opacity = 1 - distance / maxDistance;
          // context.save();
          // context.globalAlpha = opacity;
          // context.beginPath();
          // context.moveTo(this.particles[a].x, this.particles[a].y);
          // context.lineTo(this.particles[b].x, this.particles[b].y);
          // context.stroke();
          // context.restore();
          context.save();
          context.globalAlpha = opacity;
          context.beginPath();
          context.moveTo(this.particles[a].x, this.particles[a].y);

          // Bezier Curve: Calculate control points for the curve
          let controlX1 = (this.particles[a].x + this.particles[b].x) / 2; // Midpoint X for control point 1
          let controlY1 = this.particles[a].y - 20; // Slight offset for curvature
          let controlX2 = (this.particles[a].x + this.particles[b].x) / 2; // Midpoint X for control point 2
          let controlY2 = this.particles[b].y + 20; // Slight offset for curvature

          // Draw a bezier curve between particles
          context.bezierCurveTo(
            controlX1,
            controlY1, // First control point
            controlX2,
            controlY2, // Second control point
            this.particles[b].x, // End point
            this.particles[b].y,
          );

          context.stroke();
          context.restore();
        }
      }
    }
  }
  resize(width, height) {
    this.canvas.width = width;
    this.canvas.height = height;
    this.width = width;
    this.height = height;
    const gradient = this.context.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, "red");
    gradient.addColorStop(0.5, "yellow");
    gradient.addColorStop(1, "red");
    this.context.fillStyle = gradient;
    this.context.strokeStyle = "silver";

    // this.context.fillStyle = "white"
    // this.context.strokeStyle = "white"
    this.particles.forEach((particle) => {
      particle.reset();
    });
  }
}
const effect = new Effect(canvas, canvas2, canvas3, ctx, ctx3, ctx2);

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx3.clearRect(0, 0, canvas3.width, canvas3.height);
  ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
  effect.handleParticles(ctx3, ctx2, ctx);
  requestAnimationFrame(animate);
}
animate();
```