import { useEffect, useRef } from "react";

function drawDecorations(ctx, deco, w, h, accent) {
  ctx.save();
  ctx.globalAlpha = 0.12;
  ctx.fillStyle = accent;

  if (deco === "leafy") {
    // Curved leaf shapes
    for (let i = 0; i < 8; i++) {
      const x = (i % 4) * (w / 4) + (i % 2 === 0 ? 20 : -20);
      const y = Math.floor(i / 4) * (h / 2) + 40;
      ctx.beginPath();
      ctx.ellipse(x, y, 120, 40, (i % 2) * 0.4, 0, Math.PI * 2);
      ctx.fill();
    }
  } else if (deco === "stamps") {
    // Circular stamps around edges
    const centers = [
      [w * 0.12, h * 0.18],
      [w * 0.85, h * 0.2],
      [w * 0.2, h * 0.82],
      [w * 0.86, h * 0.78],
    ];
    centers.forEach(([cx, cy]) => {
      ctx.beginPath();
      ctx.arc(cx, cy, 80, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();
      ctx.ellipse(cx - 15, cy - 10, 35, 18, 0.6, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalCompositeOperation = "source-over";
    });
  } else if (deco === "dots") {
    // Minimal dotted texture
    for (let i = 0; i < 200; i++) {
      const x = Math.random() * w;
      const y = Math.random() * h;
      const r = Math.random() * 3 + 1;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  ctx.restore();
}

export default function useFlyerRenderer({ items, title, footer, size, template }) {
  const canvasRef = useRef(null);

  const render = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const { w, h } = { w: size.w, h: size.h };
    canvas.width = w;
    canvas.height = h;

    // Background
    ctx.fillStyle = template.bg;
    ctx.fillRect(0, 0, w, h);

    // Decorations
    drawDecorations(ctx, template.deco, w, h, template.accent);

    // Title
    ctx.fillStyle = template.accent;
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.font = Math.floor(w * 0.06) + "px Inter, system-ui, Segoe UI, Roboto, sans-serif";
    ctx.fillText(title.toUpperCase(), w / 2, h * 0.06);

    // Divider line
    ctx.globalAlpha = 0.18;
    ctx.fillRect(w * 0.1, h * 0.13, w * 0.8, 4);
    ctx.globalAlpha = 1;

    // Item list rendering
    const left = w * 0.12;
    const right = w * 0.88;
    const top = h * 0.18;
    const rowH = Math.min(90, Math.max(60, Math.floor(h * 0.06)));
    const spacing = 30;
    ctx.textAlign = "left";

    items.forEach((it, idx) => {
      const y = top + idx * (rowH + spacing);
      const r = rowH * 0.52;

      // Background circle behind icon
      ctx.save();
      ctx.fillStyle = template.accent;
      ctx.globalAlpha = 0.12;
      ctx.beginPath();
      ctx.arc(left + r, y + r, r, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Icon
      ctx.font = Math.floor(rowH * 0.8) + 'px "Segoe UI Emoji", Apple Color Emoji, Noto Color Emoji';
      ctx.fillText(it.icono || "🫛", left + r * 0, y + r * 0.1);

      // Item name
      const nameX = 20 + left + r * 2 + 10;
      const nameY = y + r * 0.2;
      ctx.font = Math.floor(rowH * 0.7) + "px Inter, system-ui, Segoe UI, Roboto";
      ctx.fillStyle = "#111827";
      ctx.fillText(it.nombre, nameX, nameY);

      // Price
      ctx.textAlign = "right";
      ctx.font = "700 " + Math.floor(rowH * 0.7) + "px Inter, system-ui, Segoe UI, Roboto";
      ctx.fillStyle = template.accent;
      ctx.fillText(it.precio, right, 5 + y + r * 0.05);
      ctx.textAlign = "left";
    });

    // Footer strip
    const stripH = Math.floor(h * 0.12);
    ctx.fillStyle = template.accent;
    ctx.globalAlpha = 0.08;
    ctx.fillRect(0, h - stripH, w, stripH);
    ctx.globalAlpha = 1;

    ctx.fillStyle = "#111827";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = Math.floor(w * 0.04) + "px Inter, system-ui, Segoe UI, Roboto";
    ctx.fillText(footer, w / 2, h - stripH / 2);
  };

  useEffect(() => {
    render();
  }, [items, title, footer, size, template]);

  const toDataURL = () => (canvasRef.current ? canvasRef.current.toDataURL("image/png", 1) : "");

  return { canvasRef, toDataURL, render };
}
