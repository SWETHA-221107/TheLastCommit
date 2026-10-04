import { useEffect, useRef } from "react";

const chars = [
  "0",
  "1",
  "{",
  "}",
  "<",
  ">",
  "/",
  "\\",
  ";",
  ":",
  "#",
  "$",
  "*",
  "+",
  "-",
  "_",
  "git",
  "commit",
];

type Particle = {
  x: number;
  y: number;
  vy: number;
  char: string;
};

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let animationId = 0;

    const particles: Particle[] = [];
    const mouse = {
      x: -1000,
      y: -1000,
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      width = rect.width;
      height = rect.height;

      canvas.width = width * dpr;
      canvas.height = height * dpr;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      particles.length = 0;

      const count = Math.min(100, Math.floor((width * height) / 9500));

      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vy: Math.random() * 0.35 + 0.08,
          char: chars[Math.floor(Math.random() * chars.length)],
        });
      }
    };

    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();

      mouse.x = event.clientX - rect.left;
      mouse.y = event.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      for (const particle of particles) {
        particle.y += particle.vy;

        if (particle.y > height + 20) {
          particle.y = -20;
          particle.x = Math.random() * width;
        }

        const dx = particle.x - mouse.x;
        const dy = particle.y - mouse.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        const nearby = distance < 170;

        ctx.font = nearby
          ? "13px 'DM Mono', monospace"
          : "11px 'DM Mono', monospace";

        nearby
            ? "rgba(156, 255, 0, 0.9)"
            : "rgba(156, 255, 0, 0.28)";

        ctx.fillText(particle.char, particle.x, particle.y);

        if (nearby) {
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);

          const endX =
            mouse.x + ((particle.x - mouse.x) * 0.35);
          const endY =
            mouse.y + ((particle.y - mouse.y) * 0.35);

          ctx.lineTo(endX, endY);

          ctx.strokeStyle = `rgba(156, 255, 0, ${
            0.16 * (1 - distance / 170)
          })`;

          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    resize();
    animate();

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="particle-background" />;
}