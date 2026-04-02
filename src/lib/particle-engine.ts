export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  opacity: number;
  color: string;
  phase: number;
}

export interface DataPacket {
  fromIndex: number;
  toIndex: number;
  progress: number;
  speed: number;
  color: string;
}

export interface MatrixColumn {
  x: number;
  chars: string[];
  y: number;
  speed: number;
  opacity: number;
  changeCounter: number;
}

const ACCENT = "20, 170, 169"; // #14AAA9 as RGB
const ACCENT_LIGHT = "28, 196, 195"; // #1cc4c3
const PRIMARY = "4, 65, 67"; // #044143

function randomChar(): string {
  const chars = "01ABCDEF";
  return chars[Math.floor(Math.random() * chars.length)];
}

export function createParticles(width: number, height: number, count: number): Particle[] {
  const particles: Particle[] = [];
  for (let i = 0; i < count; i++) {
    const baseRadius = 1.5 + Math.random() * 2;
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      radius: baseRadius,
      baseRadius,
      opacity: 0.3 + Math.random() * 0.5,
      color: Math.random() > 0.3 ? ACCENT : ACCENT_LIGHT,
      phase: Math.random() * Math.PI * 2,
    });
  }
  return particles;
}

export function createDataPackets(count: number, particleCount: number): DataPacket[] {
  const packets: DataPacket[] = [];
  for (let i = 0; i < count; i++) {
    packets.push({
      fromIndex: Math.floor(Math.random() * particleCount),
      toIndex: Math.floor(Math.random() * particleCount),
      progress: Math.random(),
      speed: 0.003 + Math.random() * 0.005,
      color: Math.random() > 0.4 ? ACCENT : ACCENT_LIGHT,
    });
  }
  return packets;
}

export function createMatrixColumns(width: number, count: number): MatrixColumn[] {
  const cols: MatrixColumn[] = [];
  const spacing = width / count;
  for (let i = 0; i < count; i++) {
    const charCount = 8 + Math.floor(Math.random() * 12);
    cols.push({
      x: spacing * i + Math.random() * spacing,
      chars: Array.from({ length: charCount }, () => randomChar()),
      y: Math.random() * -500,
      speed: 0.3 + Math.random() * 0.7,
      opacity: 0.03 + Math.random() * 0.04,
      changeCounter: 0,
    });
  }
  return cols;
}

export function updateAndDraw(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  particles: Particle[],
  packets: DataPacket[],
  matrixCols: MatrixColumn[],
  scanY: { value: number },
  time: number
) {
  ctx.clearRect(0, 0, width, height);

  // --- Dot grid pattern ---
  ctx.fillStyle = `rgba(${ACCENT}, 0.025)`;
  const gridSize = 44;
  for (let gx = 0; gx < width; gx += gridSize) {
    for (let gy = 0; gy < height; gy += gridSize) {
      ctx.beginPath();
      ctx.arc(gx, gy, 0.8, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // --- Matrix rain ---
  ctx.font = "10px monospace";
  for (const col of matrixCols) {
    col.y += col.speed;
    col.changeCounter++;
    if (col.changeCounter > 20) {
      col.changeCounter = 0;
      const idx = Math.floor(Math.random() * col.chars.length);
      col.chars[idx] = randomChar();
    }
    if (col.y > height + 200) {
      col.y = -200;
    }
    for (let j = 0; j < col.chars.length; j++) {
      const charY = col.y + j * 14;
      if (charY < 0 || charY > height) continue;
      const fade = j / col.chars.length;
      ctx.fillStyle = `rgba(${ACCENT}, ${col.opacity * fade})`;
      ctx.fillText(col.chars[j], col.x, charY);
    }
  }

  // --- Update particles ---
  for (const p of particles) {
    p.x += p.vx;
    p.y += p.vy;
    p.phase += 0.02;
    p.radius = p.baseRadius + Math.sin(p.phase) * 0.5;

    if (p.x < 0) p.x = width;
    if (p.x > width) p.x = 0;
    if (p.y < 0) p.y = height;
    if (p.y > height) p.y = 0;
  }

  // --- Connection lines ---
  const maxDist = 150;
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < maxDist) {
        const opacity = (1 - dist / maxDist) * 0.15;
        ctx.strokeStyle = `rgba(${ACCENT}, ${opacity})`;
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }

  // --- Draw particles ---
  for (const p of particles) {
    // Glow
    if (p.opacity > 0.5) {
      const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 6);
      grad.addColorStop(0, `rgba(${p.color}, ${p.opacity * 0.3})`);
      grad.addColorStop(1, `rgba(${p.color}, 0)`);
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius * 6, 0, Math.PI * 2);
      ctx.fill();
    }
    // Core
    ctx.fillStyle = `rgba(${p.color}, ${p.opacity})`;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fill();
  }

  // --- Data packets ---
  for (const pkt of packets) {
    pkt.progress += pkt.speed;
    if (pkt.progress >= 1) {
      pkt.progress = 0;
      pkt.fromIndex = Math.floor(Math.random() * particles.length);
      pkt.toIndex = Math.floor(Math.random() * particles.length);
    }
    const from = particles[pkt.fromIndex];
    const to = particles[pkt.toIndex];
    if (!from || !to) continue;
    const px = from.x + (to.x - from.x) * pkt.progress;
    const py = from.y + (to.y - from.y) * pkt.progress;

    const grad = ctx.createRadialGradient(px, py, 0, px, py, 4);
    grad.addColorStop(0, `rgba(${pkt.color}, 0.8)`);
    grad.addColorStop(1, `rgba(${pkt.color}, 0)`);
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(px, py, 4, 0, Math.PI * 2);
    ctx.fill();
  }

  // --- Scan line ---
  scanY.value += 0.4;
  if (scanY.value > height + 120) scanY.value = -120;
  const scanGrad = ctx.createLinearGradient(0, scanY.value - 60, 0, scanY.value + 60);
  scanGrad.addColorStop(0, "rgba(20, 170, 169, 0)");
  scanGrad.addColorStop(0.5, "rgba(20, 170, 169, 0.04)");
  scanGrad.addColorStop(1, "rgba(20, 170, 169, 0)");
  ctx.fillStyle = scanGrad;
  ctx.fillRect(0, scanY.value - 60, width, 120);

  ctx.strokeStyle = "rgba(20, 170, 169, 0.08)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(0, scanY.value);
  ctx.lineTo(width, scanY.value);
  ctx.stroke();
}
