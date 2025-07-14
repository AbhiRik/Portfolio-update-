// Gradient Particles Background Responsive to Cursor
// Inspired by modern portfolio backgrounds
const PARTICLE_COUNT = 32;
const COLORS = [
  'rgba(200,255,255,0.6)', // light cyan
  'rgba(0,234,255,0.7)',   // cyan
  'rgba(127,95,255,0.7)',  // purple
  'rgba(255,255,255,0.5)', // white
  'rgba(220,220,255,0.5)'  // very light blue
];

const canvas = document.createElement('canvas');
canvas.id = 'particles-bg';
canvas.style.position = 'fixed';
canvas.style.top = '0';
canvas.style.left = '0';
canvas.style.width = '100vw';
canvas.style.height = '100vh';
canvas.style.zIndex = '0';
canvas.style.pointerEvents = 'none';
document.body.prepend(canvas);

const ctx = canvas.getContext('2d');
let width = window.innerWidth;
let height = window.innerHeight;
canvas.width = width;
canvas.height = height;

window.addEventListener('resize', () => {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
});

// Particle definition
function randomBetween(a, b) { return a + Math.random() * (b - a); }
class Particle {
  constructor() {
    this.radius = randomBetween(32, 80);
    this.x = randomBetween(0, width);
    this.y = randomBetween(0, height);
    this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
    this.angle = randomBetween(0, Math.PI * 2);
    this.speed = randomBetween(0.02, 0.07); // slowed down
    this.orbit = randomBetween(20, 120);
    this.alpha = randomBetween(0.5, 1);
    this.baseX = this.x;
    this.baseY = this.y;
  }
  update(mouse) {
    // Orbit movement
    this.angle += this.speed * 0.18; // slower angle increment
    this.x = this.baseX + Math.cos(this.angle) * this.orbit + (mouse.x - width/2) * 0.08;
    this.y = this.baseY + Math.sin(this.angle) * this.orbit + (mouse.y - height/2) * 0.08;
  }
  draw(ctx) {
    const grad = ctx.createRadialGradient(this.x, this.y, this.radius * 0.2, this.x, this.y, this.radius);
    grad.addColorStop(0, this.color);
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.globalAlpha = this.alpha;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fillStyle = grad;
    ctx.fill();
    ctx.globalAlpha = 1;
  }
}

const particles = Array.from({length: PARTICLE_COUNT}, () => new Particle());
let mouse = {x: width/2, y: height/2};
window.addEventListener('mousemove', e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

function animate() {
  ctx.clearRect(0, 0, width, height);
  for (const p of particles) {
    p.update(mouse);
    p.draw(ctx);
  }
  requestAnimationFrame(animate);
}
animate();
