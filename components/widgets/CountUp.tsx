"use client";

import { useEffect } from "react";

export default function CountUp() {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>(".cv2-counter-num[data-target]");
    if (!elements.length) return;

    function animate(el: HTMLElement) {
      const target = Number(el.dataset.target ?? 0);
      const duration = 2000;
      const start = performance.now();
      function tick(now: number) {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3);
        el.textContent = Math.round(target * eased).toLocaleString();
        if (t < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    }

    function loop() {
      elements.forEach((el) => animate(el));
    }

    loop();
    const id = window.setInterval(loop, 8000);
    return () => window.clearInterval(id);
  }, []);

  return null;
}
