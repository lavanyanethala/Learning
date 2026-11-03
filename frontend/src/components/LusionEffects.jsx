import React, { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import { Box, useTheme } from "@mui/material";

export default function LusionEffects() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const [scrollProgress, setScrollProgress] = useState(0);
  const spotlightRef = useRef(null);
  const mousePos = useRef({ x: -200, y: -200, targetX: -200, targetY: -200 });

  // 1. Lenis Smooth Momentum Scroll Engine (Lusion signature fluid scrolling)
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    let animationFrameId;

    function raf(time) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }

    animationFrameId = requestAnimationFrame(raf);

    // Scroll progress handler
    lenis.on("scroll", (e) => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        setScrollProgress((e.scroll / scrollHeight) * 100);
      }
    });

    return () => {
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
    };
  }, []);

  // 2. Interactive Spotlight Cursor Aura with Lerp inertia (Lusion dynamic pointer effect)
  useEffect(() => {
    let active = true;
    let auraAnimFrame;

    const handleMouseMove = (e) => {
      mousePos.current.targetX = e.clientX;
      mousePos.current.targetY = e.clientY;
    };

    const animateAura = () => {
      if (!active) return;
      const { targetX, targetY } = mousePos.current;
      // Spring lerp
      mousePos.current.x += (targetX - mousePos.current.x) * 0.12;
      mousePos.current.y += (targetY - mousePos.current.y) * 0.12;

      if (spotlightRef.current) {
        spotlightRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0) translate(-50%, -50%)`;
      }
      auraAnimFrame = requestAnimationFrame(animateAura);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    auraAnimFrame = requestAnimationFrame(animateAura);

    return () => {
      active = false;
      cancelAnimationFrame(auraAnimFrame);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // 3. Lusion 3D Interactive Card Perspective Tilt Engine
  useEffect(() => {
    const cards = document.querySelectorAll(".interactive-card, .lusion-tilt");

    const handleCardMouseMove = (e) => {
      const card = e.currentTarget;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -6; // Max 6deg tilt
      const rotateY = ((x - centerX) / centerX) * 6;

      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;
      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    };

    const handleCardMouseLeave = (e) => {
      const card = e.currentTarget;
      card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)";
    };

    cards.forEach((card) => {
      card.addEventListener("mousemove", handleCardMouseMove);
      card.addEventListener("mouseleave", handleCardMouseLeave);
    });

    return () => {
      cards.forEach((card) => {
        card.removeEventListener("mousemove", handleCardMouseMove);
        card.removeEventListener("mouseleave", handleCardMouseLeave);
      });
    };
  });

  // 4. Lusion Scroll Reveal Observer (Intersection Observer for staggered fade/glide)
  useEffect(() => {
    const targets = document.querySelectorAll(".lusion-reveal, .interactive-card, .lusion-fade-in");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );

    targets.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  });

  return (
    <>
      {/* Scroll Depth Progress Bar (Top of Screen) */}
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "3.5px",
          width: `${scrollProgress}%`,
          background: "linear-gradient(90deg, #2E5E99 0%, #7BA4D0 100%)",
          boxShadow: "0 0 14px rgba(46, 94, 153, 0.7), 0 0 4px rgba(123, 164, 208, 0.8)",
          zIndex: 99999,
          pointerEvents: "none",
          transition: "width 0.1s linear",
        }}
      />

      {/* Lusion Ambient Reactive Cursor Aura */}
      <Box
        ref={spotlightRef}
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: { xs: 260, md: 420 },
          height: { xs: 260, md: 420 },
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 9998,
          background: isDark
            ? "radial-gradient(circle, rgba(46, 94, 153, 0.18) 0%, rgba(123, 164, 208, 0.08) 45%, transparent 70%)"
            : "radial-gradient(circle, rgba(46, 94, 153, 0.08) 0%, rgba(123, 164, 208, 0.05) 45%, transparent 70%)",
          filter: "blur(20px)",
          willChange: "transform",
          mixBlendMode: isDark ? "screen" : "multiply",
        }}
      />

      {/* Floating Organic Ambient Light Mesh Orbs */}
      <Box
        sx={{
          position: "fixed",
          top: "-10vw",
          right: "-10vw",
          width: "45vw",
          height: "45vw",
          borderRadius: "50%",
          background: isDark
            ? "radial-gradient(circle, rgba(46, 94, 153, 0.12) 0%, rgba(123, 164, 208, 0.06) 60%, transparent 80%)"
            : "radial-gradient(circle, rgba(46, 94, 153, 0.05) 0%, rgba(123, 164, 208, 0.03) 60%, transparent 80%)",
          filter: "blur(60px)",
          pointerEvents: "none",
          zIndex: 0,
          animation: "lusionFloat1 18s ease-in-out infinite",
        }}
      />
      <Box
        sx={{
          position: "fixed",
          bottom: "-10vw",
          left: "-10vw",
          width: "50vw",
          height: "50vw",
          borderRadius: "50%",
          background: isDark
            ? "radial-gradient(circle, rgba(123, 164, 208, 0.08) 0%, rgba(46, 94, 153, 0.04) 60%, transparent 80%)"
            : "radial-gradient(circle, rgba(123, 164, 208, 0.04) 0%, rgba(46, 94, 153, 0.02) 60%, transparent 80%)",
          filter: "blur(70px)",
          pointerEvents: "none",
          zIndex: 0,
          animation: "lusionFloat2 22s ease-in-out infinite",
        }}
      />
    </>
  );
}
