const canvas = document.getElementById("canvas-constellation");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const canvas2 = document.getElementById("canvas-constellation2");
const ctx2 = canvas2.getContext("2d");
canvas2.width = window.innerWidth;
canvas2.height = window.innerHeight;

const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
gradient.addColorStop(0, "cyan");
gradient.addColorStop(0.5, "orange");
gradient.addColorStop(1, "teal");
ctx.fillStyle = gradient;
ctx.strokeStyle = "silver";
// ctx.lineWidth = 4.5;


const gradient2 = ctx2.createLinearGradient(
  0,
  0,
  canvas2.width,
  canvas2.height,
);
gradient2.addColorStop(0, "cyan");
gradient2.addColorStop(0.5, "orange");
gradient2.addColorStop(1, "teal");
ctx2.fillStyle = gradient2;
ctx2.strokeStyle = "cyan";
ctx2.lineWidth = 2.5;

const sprite = new Image();
sprite.src = "gamerex.svg"; // Path to your SVG or image file

class Particle {
  constructor(effect) {
    this.effect = effect;
    this.radius = Math.floor(Math.random() * (32 + 16) );
    this.buffer = this.radius * 4;
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
  // draw(context) {
  //   context.beginPath();

  //   // Outer Porthole Circle (Steampunk Frame)
  //   context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false); // Full circle for frame

  //   // Inner Decorative Ring
  //   context.moveTo(this.x + this.radius * 0.8, this.y); // Move to starting point
  //   context.arc(this.x, this.y, this.radius * 0.8, 0, Math.PI * 2, true); // Inner circle

  //   // Gear-Like Notches Around the Outer Circle
  //   let gearTeeth = 12; // Number of notches
  //   for (let i = 0; i < gearTeeth; i++) {
  //     let angle = (Math.PI * 2 * i) / gearTeeth; // Divide circle evenly
  //     let outerX = this.x + Math.cos(angle) * (this.radius + 5); // Outer notch point
  //     let outerY = this.y + Math.sin(angle) * (this.radius + 5);
  //     let innerX = this.x + Math.cos(angle) * this.radius; // Inner notch point
  //     let innerY = this.y + Math.sin(angle) * this.radius;
  //     context.moveTo(outerX, outerY);
  //     context.lineTo(innerX, innerY); // Draw line for gear tooth
  //   }

  //   // Crosshair-Like Spokes (Steampunk Compass)
  //   let spokes = 3; // Number of crosshairs
  //   for (let i = 0; i < spokes; i++) {
  //     let angle = (Math.PI * 2 * i) / spokes;
  //     let spokeX = this.x + Math.cos(angle) * this.radius * 0.6;
  //     let spokeY = this.y + Math.sin(angle) * this.radius * 0.6;
  //     context.moveTo(this.x, this.y); // Center point
  //     context.lineTo(spokeX, spokeY); // Line to spoke endpoint
  //   }

  //   // Nautical Wave-Like Bézier Curve
  //   context.moveTo(this.x - this.radius, this.y); // Starting point on the left
  //   context.bezierCurveTo(
  //     this.x - this.radius * 1.5,
  //     this.y - this.radius * 0.5, // Control point 1
  //     this.x + this.radius * 1.5,
  //     this.y + this.radius * 0.5, // Control point 2
  //     this.x + this.radius,
  //     this.y, // End point on the right
  //   );

  //   // Inner Dot Details (Rivets or Lights)
  //   let rivetCount = 8; // Number of decorative rivets
  //   for (let i = 0; i < rivetCount; i++) {
  //     let angle = (Math.PI * 2 * i) / rivetCount;
  //     let rivetX = this.x + Math.cos(angle) * (this.radius * 0.6);
  //     let rivetY = this.y + Math.sin(angle) * (this.radius * 0.6);
  //     context.moveTo(rivetX + 2, rivetY); // Adjust for small dot
  //     context.arc(rivetX, rivetY, 2, 0, Math.PI * 2, false); // Small circle for rivet
  //   }

  //   // Steampunk Color Styling
  //   context.strokeStyle = "rgba(255, 183, 77, 0.9)"; // Brass orange
  //   context.fillStyle = "rgba(20, 20, 90, 0.6)"; // Deep ocean blue
  //   // context.fillStyle = "rgba(40, 220, 230, 0.8)"; // Light Cornflower Blue

  //   context.lineWidth = 2;
  //   context.stroke();
  //   context.fill();
  // }
  // draw(context) {
  //   context.beginPath();
  
  //   // Draw the first bone (diagonal bone 1)
  //   context.moveTo(this.x - this.radius * 0.8, this.y - this.radius * 0.2); // Start point for the first bone
  //   context.lineTo(this.x + this.radius * 0.8, this.y + this.radius * 0.2); // End point for the first bone
    
  //   // Draw the second bone (diagonal bone 2, crossing the first one)
  //   context.moveTo(this.x - this.radius * 0.8, this.y + this.radius * 0.2); // Start point for the second bone
  //   context.lineTo(this.x + this.radius * 0.8, this.y - this.radius * 0.2); // End point for the second bone
  
  //   // Add a skull shape in the center of the crossbones (simplified)
  //   context.moveTo(this.x - this.radius * 0.3, this.y - this.radius * 0.2); // Start point for the skull left side
  //   context.arc(this.x, this.y, this.radius * 0.3, Math.PI, 0, true); // Top half of skull (arc)
  //   context.lineTo(this.x + this.radius * 0.3, this.y + this.radius * 0.2); // Bottom of skull
    
  //   // Draw the eyes (simplified circles inside the skull)
  //   let eyeRadius = this.radius * 0.05;
  //   context.moveTo(this.x - this.radius * 0.1, this.y - this.radius * 0.1); // Left eye start point
  //   context.arc(this.x - this.radius * 0.1, this.y - this.radius * 0.1, eyeRadius, 0, Math.PI * 2, false); // Left eye circle
  //   context.moveTo(this.x + this.radius * 0.1, this.y - this.radius * 0.1); // Right eye start point
  //   context.arc(this.x + this.radius * 0.1, this.y - this.radius * 0.1, eyeRadius, 0, Math.PI * 2, false); // Right eye circle
    
  //   // Draw a simple "mouth" (line for simplicity)
  //   context.moveTo(this.x - this.radius * 0.1, this.y + this.radius * 0.1); // Mouth left side
  //   context.lineTo(this.x + this.radius * 0.1, this.y + this.radius * 0.1); // Mouth right side
  
  //   // Skull & Crossbones Styling
  //   context.strokeStyle = "rgba(255, 255, 255, 0.8)"; // Bone white
  //   context.fillStyle = "rgba(0, 0, 0, 0.6)"; // Skull fill, semi-transparent black (for a skeleton look)
  
  //   context.lineWidth = 3;
  //   context.stroke();
  //   context.fill();
  // }
  draw(context) {

  
      context.drawImage(
        sprite,            
        this.x - this.radius,  
        this.y - this.radius, 
        this.radius * 2, 
        this.radius * 2   
      );

  }
  
  update() {
    if (this.effect.mouse.pressed) {
      const dx = this.x - this.effect.mouse.x;
      const dy = this.y - this.effect.mouse.y;
      const distance = Math.hypot(dx, dy);
      const force =
        ((this.effect.mouse.radius / distance) * distance) /
        this.effect.mouse.radius;
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
    this.numberOfParticles = 40;
    this.createParticles();

    this.mouse = {
      x: 0,
      y: 0,
      pressed: false,
      radius: 40,
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
    const maxDistance = 200;

    for (let a = 0; a < this.particles.length; a++) {
      for (let b = a + 1; b < this.particles.length; b++) {
        // Calculate distance between particles
        const dx = this.particles[a].x - this.particles[b].x;
        const dy = this.particles[a].y - this.particles[b].y;
        const distance = Math.hypot(dx, dy);

        if (distance < maxDistance) {
          const opacity = 1 - distance / maxDistance;

          // Draw Bezier curve between particles
          context.save();
          context.globalAlpha = opacity;
          context.beginPath();
          context.moveTo(this.particles[a].x, this.particles[a].y);

          const controlX = (this.particles[a].x + this.particles[b].x) * 0.5;
          const controlY = (this.particles[a].y + this.particles[b].y) * 0.5;

          context.bezierCurveTo(
            controlX + Math.sin(this.particles[a].y * 0.05) * 30,
            controlY - 50,
            controlX - Math.cos(this.particles[b].y * 0.05) * 30,
            controlY + 50,
            this.particles[b].x,
            this.particles[b].y,
          );
          context.stroke();
          context.restore();

          // Draw crosshair and wave at the midpoint of the connection
          this.drawCrosshairAndWave(
            context,
            { x: controlX, y: controlY },
            Math.atan2(dy, dx), // Rotation angle based on connection direction
            opacity,
          );
        }
      }
    }
  }

  // Helper method to draw crosshair-like spokes and nautical Bézier wave
  drawCrosshairAndWave(context, center, angle, opacity) {
    context.save();
    context.globalAlpha = opacity;

    // Translate and rotate canvas to align crosshair and wave
    context.translate(center.x, center.y);
    context.rotate(angle);

    // Enhanced Crosshair-Like Spokes
    const spokes = 8; // Number of main and intermediate spokes
    const radius = 40; // Radius of the crosshair
    const accentRadius = 5; // Radius for small circular accents

    context.beginPath();
    for (let i = 0; i < spokes; i++) {
      const spokeAngle = (Math.PI * 2 * i) / spokes;

      // Calculate main spoke endpoint
      const spokeX = Math.cos(spokeAngle) * radius;
      const spokeY = Math.sin(spokeAngle) * radius;

      // Thicker lines for main spokes
      if (i % 2 === 0) {
        context.lineWidth = 2;
        context.moveTo(0, 0);
        context.lineTo(spokeX, spokeY);

        // Add a circular accent at the endpoint
        context.moveTo(spokeX + accentRadius, spokeY); // Start new path for accent
        context.arc(spokeX, spokeY, accentRadius, 0, Math.PI * 2); // Draw circle
      } else {
        // Thinner intermediate spokes
        context.lineWidth = 1.5;
        const innerX = Math.cos(spokeAngle) * (radius * 0.6);
        const innerY = Math.sin(spokeAngle) * (radius * 0.6);
        context.moveTo(innerX, innerY);
        context.lineTo(spokeX, spokeY);
      }
    }
    context.stroke();

    // Optional: Add a central decorative circle
    context.beginPath();
    context.arc(0, 0, radius * 0.3, 0, Math.PI * 2); // Small circle at the center
    context.stroke();

    // Nautical wave-like Bézier curve
    const waveRadius = radius * 0.8;
    context.beginPath();
    context.moveTo(-waveRadius, 0); // Start point
    context.bezierCurveTo(
      -waveRadius * 1.5,
      -waveRadius * 0.5, // Control point 1
      waveRadius * 1.5,
      waveRadius * 0.5, // Control point 2
      waveRadius,
      0, // End point
    );
    context.stroke();

    context.restore();
  }



  resize(width, height) {
    this.canvas.width = width;
    this.canvas.height = height;
    this.width = width;
    this.height = height;
    const gradient = this.context.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, "cyan");
    gradient.addColorStop(0.5, "orange");
    gradient.addColorStop(1, "teal");
    this.context.fillStyle = gradient;
    this.context.strokeStyle = "orange";
    this.particles.forEach((particle) => {
      particle.reset();
    });
  }
}
const effect = new Effect(canvas, ctx, ctx2);

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
  effect.handleParticles(ctx, ctx2);
  requestAnimationFrame(animate);
}
animate();
