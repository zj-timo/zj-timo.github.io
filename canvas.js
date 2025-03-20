function initCanvasEffect() {
  const canvases = document.querySelectorAll(".bg-canvas");
  canvases.forEach((canvas) => {
    const ctx = canvas.getContext("2d");
    let particles = [];
    const particleCount = 50; // 粒子数量
    const maxDistance = 150; // 粒子间最大连接距离

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    class Particle {
      constructor(x, y, dx, dy, size) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.size = size;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0, 255, 255, 0.6)";
        ctx.fill();
        ctx.closePath();
      }

      update() {
        if (this.x + this.size > canvas.width || this.x - this.size < 0) {
          this.dx = -this.dx;
        }
        if (this.y + this.size > canvas.height || this.y - this.size < 0) {
          this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;
      }
    }

    function connectParticles() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0, 255, 255, ${
              1 - distance / maxDistance
            })`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
            ctx.closePath();
          }
        }
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });
      connectParticles();
      requestAnimationFrame(animate);
    }

    function createParticles() {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        const size = Math.random() * 3 + 1;
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const dx = (Math.random() - 0.5) * 2;
        const dy = (Math.random() - 0.5) * 2;
        particles.push(new Particle(x, y, dx, dy, size));
      }
    }

    createParticles();
    animate();
  });

  // 动态调整 canvas 尺寸
  window.addEventListener("resize", () => {
    canvases.forEach((canvas) => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    });
  });
}

document.addEventListener("DOMContentLoaded", initCanvasEffect);
