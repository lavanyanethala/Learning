import React from "react";
import { Box } from "@mui/material";

// ============================================================================
// BRAND & DEVELOPER TOOL ICONS (Crisp, High-Resolution Professional Vectors)
// ============================================================================

export function VsCodeIcon({ size = 26, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M189.6 253.2c6.2 3.2 13.8 2.2 19-2.6l42.6-39c5.2-4.8 8.2-11.6 8.2-18.6V63c0-7-3-13.8-8.2-18.6l-42.6-39c-5.2-4.8-12.8-5.8-19-2.6-6.2 3.2-10 9.4-10 16.2v39.4L90.8 14.8c-4.8-4-11.6-4.6-17-1.6L7.2 46C2.6 48.4 0 53.4 0 58.4v139.2c0 5 2.6 10 7.2 12.4l66.6 32.8c5.4 3 12.2 2.4 17-1.6l88.8-43.2v39c0 6.6 3.8 13 10 16.2zM196.6 65l33.8-21.6v169.2l-33.8-21.6V65zM63.8 178.6L24 160v-64l39.8-18.6v101.2zm23-49.6L143 83.2 173 104l-64 48-22.2-23zm0 0l22.2 23 64 48-30 20.8-56.2-45.8v-46z" fill="#007ACC"/>
    </svg>
  );
}

export function NodeJsIcon({ size = 26, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M128 10l106 61.2v122.4L128 255 22 193.6V71.2L128 10z" fill="#539E43"/>
      <path d="M128 26.6l91.6 52.8v105.8L128 238.2 36.4 185.2V79.4L128 26.6z" fill="#333333"/>
      <path d="M128 65l61 35.2v70.4L128 206l-61-35.4v-70.4L128 65z" fill="#539E43"/>
      <path d="M115 110h26v45h-26z" fill="#FFFFFF"/>
    </svg>
  );
}

export function GitIcon({ size = 26, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M251.2 119.8L136.2 4.8a18.4 18.4 0 00-26 0l-26 26 33.4 33.4a22 22 0 0127.8 28.2l32.2 32.2a22 22 0 11-13 13L133 106v81.8a22 22 0 11-18.4 0v-85a22.2 22.2 0 01-12-28.8L69.8 41.2 4.8 106.2a18.4 18.4 0 000 26l115 115a18.4 18.4 0 0026 0l105.4-105.4a18.4 18.4 0 000-26z" fill="#F05032"/>
    </svg>
  );
}

export function ChromeIcon({ size = 26, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="128" cy="128" r="120" fill="#EA4335"/>
      <path d="M128 128l58.8-101.8A120 120 0 0038 48.6L96.8 150.4 128 128z" fill="#EA4335"/>
      <path d="M128 128l58.8 101.8A120 120 0 00248 128H130l-2 0z" fill="#4285F4"/>
      <path d="M128 128L69.2 26A120 120 0 008 128a120 120 0 0030 79.4L96.8 150.4 128 128z" fill="#FBBC05"/>
      <path d="M128 128h118A120 120 0 0138 207.4L96.8 105.6 128 128z" fill="#34A853"/>
      <circle cx="128" cy="128" r="54" fill="#FFFFFF"/>
      <circle cx="128" cy="128" r="42" fill="#1A73E8"/>
    </svg>
  );
}

export function FigmaIcon({ size = 26, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 38 57" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M19 28.5a9.5 9.5 0 1119 0 9.5 9.5 0 01-19 0z" fill="#1ABCFE"/>
      <path d="M0 47.5A9.5 9.5 0 019.5 38H19v9.5a9.5 9.5 0 01-19 0z" fill="#0ACF83"/>
      <path d="M19 0v19h9.5a9.5 9.5 0 100-19H19z" fill="#FF7262"/>
      <path d="M0 9.5A9.5 9.5 0 009.5 19H19V0H9.5A9.5 9.5 0 000 9.5z" fill="#F24E1E"/>
      <path d="M0 28.5A9.5 9.5 0 009.5 38H19V19H9.5A9.5 9.5 0 000 28.5z" fill="#A259FF"/>
    </svg>
  );
}

export function PostmanIcon({ size = 26, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="128" cy="128" r="128" fill="#FF6C37"/>
      <path d="M184.2 113.6c-1.8-6.2-7.4-10.6-13.8-10.6H91.4l24.6-24.6c4-4 4-10.4 0-14.4s-10.4-4-14.4 0L57.2 108.4c-4 4-4 10.4 0 14.4l44.4 44.4c2 2 4.6 3 7.2 3s5.2-1 7.2-3c4-4 4-10.4 0-14.4L91.4 128h76.2c3 0 5.6 2.2 6.2 5.2l7.2 32c1 4.4 5 7.6 9.4 7.6h17.2c5.6 0 10.2-4.6 10.2-10.2v-11.4l-33.6-37.6z" fill="#FFFFFF"/>
    </svg>
  );
}

export function InsomniaIcon({ size = 26, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="128" cy="128" r="128" fill="#5849BE"/>
      <path d="M128 44c-46.4 0-84 37.6-84 84s37.6 84 84 84 84-37.6 84-84c0-7.8-1.1-15.3-3.1-22.4-5.5 15.6-20.4 26.8-37.9 26.8-22.3 0-40.4-18.1-40.4-40.4 0-17.5 11.2-32.4 26.8-37.9-7.1-2-14.6-3.1-22.4-3.1h-3z" fill="#FFFFFF"/>
    </svg>
  );
}

export function PythonIcon({ size = 26, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M126.8 2c-35 0-33 15-33 15l.1 15.7h33.9v4.8H53.6s-21.7 2.4-21.7 34.6 19 33.7 19 33.7h11.3V89.4c0-14.5 12.6-27.2 27.2-27.2h46.7V42.6c0-13.6-11.3-40.6-49.3-40.6zm-17.8 10.3a5.5 5.5 0 110 11 5.5 5.5 0 010-11z" fill="#3776AB"/>
      <path d="M129.2 254c35 0 33-15 33-15l-.1-15.7h-33.9v-4.8h74.2s21.7-2.4 21.7-34.6-19-33.7-19-33.7h-11.3v16.4c0 14.5-12.6 27.2-27.2 27.2H119.9v19.6c0 13.6 11.3 40.6 49.3 40.6zm17.8-10.3a5.5 5.5 0 110-11 5.5 5.5 0 010 11z" fill="#FFD43B"/>
    </svg>
  );
}

export function JavaIcon({ size = 26, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M110.8 178.6c11.8 1.4 34.2 2 48.8-6.2 0 0-7.2 5.4-25.2 7.4-18.4 2-35.8-1.2-35.8-1.2h12.2zm-4.2-25.8c14 1.4 43.6 2.8 62.4-9 0 0-8.6 6.8-31 9.4-23.2 2.6-44.2-.4-44.2-.4h12.8zm-15.4 51.6c37.2 2.4 75-4.4 95.8-24.8-5.6 3.6-21.8 11.2-46.6 13.6-28.6 2.8-54-1-65.8-4 0 0 3.8 13.2 16.6 15.2zM152 74c10.8 12.2 1.4 23.4-14 36.6 22-8.4 38.6-24 23.8-42.6-14-17.8-46.2-12.2-66.2 16.8 16.6-18.2 45.6-23 56.4-10.8zm-33.6 40.4c17.4-14.8 33-31.2 19.8-46.2-7.6-8.6-23-9.8-38.6 1.4-15 10.6-26.6 31.4-6.8 54.4 8.6-3.4 17.6-6.6 25.6-9.6zm54.4 54.6c19.8-10.2 20.2-22.4 9.6-32.2-8.2-7.8-19.4-10.8-33-8.8 8.6 3 14.8 7.4 18.2 12.8 5.6 8.6-1.8 17.8-12.8 24.2 6.6 1.6 12.6 2.6 18 4z" fill="#EA580C"/>
      <path d="M72 206s20.6 6.8 56.4 5.2c35.8-1.4 55.6-8.6 55.6-8.6s-16 11.2-56 12.6C88 216.6 72 206 72 206z" fill="#0284C7"/>
    </svg>
  );
}

export function MongoDbIcon({ size = 26, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M128 6c-3 15-46 54-46 115 0 54.4 36.6 92.4 44.8 100.8.6.6 1.2 1.2 1.2 1.2v-217z" fill="#47A248"/>
      <path d="M128 6c3 15 46 54 46 115 0 54.4-36.6 92.4-44.8 100.8-.6.6-1.2 1.2-1.2 1.2v-217z" fill="#499D4A"/>
      <path d="M128 223c-1.4 3-4.6 12.6-7.8 21.6 4.8 3.8 8.8 5.4 8.8 5.4s4-1.6 8.8-5.4c-3.2-9-6.4-18.6-7.8-21.6h-2z" fill="#3F9142"/>
    </svg>
  );
}

export function PostgreSqlIcon({ size = 26, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M126.8 20.6c-48.4 0-82.6 34.6-82.6 84.4 0 34.4 16.6 63.8 42.6 77.2v31.6l28.4-15.6c3.8.6 7.6.8 11.6.8 48.4 0 82.6-34.6 82.6-84.4 0-49.8-34.2-94-82.6-94zm34.8 132.8c-7.6 12-20.6 19.8-35.4 19.8-11.4 0-21.6-4.6-28.8-12.4l-12.2 18.6c11.6 9.8 26.6 15.6 42.8 15.6 24.2 0 45-12.4 56.6-31.2l-23-10.4z" fill="#336791"/>
    </svg>
  );
}

export function MySqlIcon({ size = 26, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M194 65c-35-26-88-16-118 10-24 21-34 54-26 84 8 28 32 50 62 55 35 6 72-10 90-41 4-7 1-16-6-20s-16-1-20 6c-13 22-40 33-65 29-22-4-40-20-46-41-6-22 1-46 19-61 22-19 61-26 87-7 14 10 21 27 21 44 0 10-3 20-8 28-5 7-3 17 4 22s17 3 22-4c8-13 12-28 12-44 0-26-10-50-27-66z" fill="#00758F"/>
      <path d="M130 92c-15-2-30 6-36 20-6 14-1 30 11 39 12 9 29 8 40-2 11-10 13-27 5-39-5-11-12-17-20-18zm-2 41c-5 0-9-4-9-9s4-9 9-9 9 4 9 9-4 9-9 9z" fill="#F29111"/>
    </svg>
  );
}

export function DBeaverIcon({ size = 26, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="128" cy="128" r="118" fill="#6B4F3B"/>
      <path d="M78 98c0-26 22-48 50-48s50 22 50 48v60c0 26-22 48-50 48s-50-22-50-48V98z" fill="#E8D7C3"/>
      <ellipse cx="106" cy="116" rx="8" ry="12" fill="#2E1F14"/>
      <ellipse cx="150" cy="116" rx="8" ry="12" fill="#2E1F14"/>
      <path d="M120 136h16v18c0 4-4 8-8 8s-8-4-8-8v-18z" fill="#FFFFFF"/>
      <ellipse cx="128" cy="134" rx="14" ry="9" fill="#2E1F14"/>
    </svg>
  );
}

export function RedisIcon({ size = 26, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M128 16l106 54-106 54L22 70 128 16z" fill="#DC2626"/>
      <path d="M22 86l106 54v38L22 124V86z" fill="#991B1B"/>
      <path d="M234 86v38l-106 54v-38l106-54z" fill="#B91C1C"/>
      <path d="M22 140l106 54v46L22 186v-46z" fill="#991B1B"/>
      <path d="M234 140v46l-106 54v-46l106-54z" fill="#B91C1C"/>
    </svg>
  );
}

export function DockerIcon({ size = 26, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M248 114c-4-2-12-3-18-2-3-12-12-22-24-27l-8-3-5 7c-6 9-8 20-5 31-10 1-28 6-38 18H10c-5 0-10 4-10 9 2 40 28 85 85 85 64 0 108-41 127-92 16 1 32-11 36-26zM58 88H36V66h22v22zm28 0H64V66h22v22zm28 0H92V66h22v22zm28 0h-22V66h22v22zm-84 28H36V94h22v22zm28 0H64V94h22v22zm28 0H92V94h22v22zm28 0h-22V94h22v22zm28 0h-22V94h22v22z" fill="#2496ED"/>
    </svg>
  );
}

export function NvmIcon({ size = 26, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect x="18" y="18" width="220" height="220" rx="36" fill="#475569"/>
      <path d="M68 180V76h26l48 64V76h24v104h-26l-48-64v64H68z" fill="#FFFFFF"/>
      <circle cx="204" cy="52" r="14" fill="#38BDF8"/>
    </svg>
  );
}

// ============================================================================
// ESSENTIAL CAREER, CODING & DESIGN PLATFORMS ICONS
// ============================================================================

export function LeetCodeIcon({ size = 24, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M16.1 17.5l-4.5 4.5a5.5 5.5 0 01-7.8-7.8l6.3-6.3a5.5 5.5 0 017.8 7.8l-1.8 1.8" stroke="#FFA116" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9.5 12.5h8" stroke="#FFA116" strokeWidth="2.2" strokeLinecap="round"/>
    </svg>
  );
}

export function GitHubIconVector({ size = 24, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
    </svg>
  );
}

export function LinkedInIconVector({ size = 24, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
    </svg>
  );
}

export function CodePenIconVector({ size = 24, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg" {...props}>
      <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"/>
      <line x1="12" y1="22" x2="12" y2="15.5"/>
      <polyline points="22 8.5 12 15.5 2 8.5"/>
      <polyline points="2 15.5 12 8.5 22 15.5"/>
      <line x1="12" y1="2" x2="12" y2="8.5"/>
    </svg>
  );
}

export function StackBlitzIconVector({ size = 24, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M10.8 2L3 13.5h7.2L9.2 22l11.8-12h-7.8L14.4 2h-3.6z"/>
    </svg>
  );
}

export function HackerRankIconVector({ size = 24, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M12 2L2 7.8v8.4L12 22l10-5.8V7.8L12 2zm3.6 13.6h-2v-3.2h-3.2v3.2h-2V8.4h2v3.2h3.2V8.4h2v7.2z"/>
    </svg>
  );
}

export function AosIconVector({ size = 24, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M4 17l6-6-6-6"/>
      <path d="M12 19h8"/>
      <path d="M13 13l4-4"/>
    </svg>
  );
}

export function LusionIconVector({ size = 24, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
      <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
      <line x1="12" y1="22.08" x2="12" y2="12"/>
    </svg>
  );
}

export function OverleafIconVector({ size = 24, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
      <line x1="16" y1="13" x2="8" y2="13"/>
      <line x1="16" y1="17" x2="8" y2="17"/>
      <line x1="10" y1="9" x2="8" y2="9"/>
    </svg>
  );
}

export function GoogleFontsIconVector({ size = 24, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M9.93 13.5h4.14L12 7.98zM20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-4.05 16.5l-1.14-3H9.17l-1.12 3H5.96l5.11-13h1.86l5.11 13h-2.09z"/>
    </svg>
  );
}

export function ReactIconsVector({ size = 24, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
      <ellipse cx="12" cy="12" rx="10" ry="4.2" fill="none" stroke="currentColor" strokeWidth="1.8"/>
      <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(60 12 12)" fill="none" stroke="currentColor" strokeWidth="1.8"/>
      <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(120 12 12)" fill="none" stroke="currentColor" strokeWidth="1.8"/>
      <circle cx="12" cy="12" r="2" fill="currentColor"/>
    </svg>
  );
}

export function UnsplashIconVector({ size = 24, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M7.5 6.75V2.25h9v4.5h-9zm9 3.75h4.5v11.25H3V10.5h4.5v4.5h9v-4.5z"/>
    </svg>
  );
}

export function IndeedIconVector({ size = 24, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M12.6 2C9.4 2 6.8 4.4 6.4 7.6l2.3.4c.3-2.3 2.2-4 4.5-4 2.5 0 4.6 2 4.6 4.6 0 1.8-1 3.3-2.5 4.1l-1.2.6v3.1h2.4v-1.8c1.9-1 3.2-2.9 3.2-5.1 0-3.8-3.1-6.9-7.1-6.9zm-1.3 14.8h2.6v2.6h-2.6v-2.6z"/>
    </svg>
  );
}

export function WellfoundIconVector({ size = 24, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M12 2l2.6 6.5L21 9.8l-5 4.3 1.5 6.9-5.5-3.5-5.5 3.5L8 14.1 3 9.8l6.4-1.3L12 2z"/>
    </svg>
  );
}

export function GlassdoorIconVector({ size = 24, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14c-2.8 0-5-2.2-5-5s2.2-5 5-5 5 2.2 5 5-2.2 5-5 5z"/>
    </svg>
  );
}

export function ResumeIoIconVector({ size = 24, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
    </svg>
  );
}

// ============================================================================
// HELPER ICON RESOLVER FOR SOFTWARES
// ============================================================================

export function renderSoftwareIcon(id, size = 28) {
  switch (id) {
    case "vscode":
      return <VsCodeIcon size={size} />;
    case "nodejs":
      return <NodeJsIcon size={size} />;
    case "git":
      return <GitIcon size={size} />;
    case "chrome":
      return <ChromeIcon size={size} />;
    case "figma":
      return <FigmaIcon size={size} />;
    case "postman":
      return <PostmanIcon size={size} />;
    case "insomnia":
      return <InsomniaIcon size={size} />;
    case "python":
      return <PythonIcon size={size} />;
    case "jdk":
      return <JavaIcon size={size} />;
    case "mongodb":
      return <MongoDbIcon size={size} />;
    case "postgresql":
      return <PostgreSqlIcon size={size} />;
    case "mysql":
      return <MySqlIcon size={size} />;
    case "dbeaver":
      return <DBeaverIcon size={size} />;
    case "redis":
      return <RedisIcon size={size} />;
    case "docker":
      return <DockerIcon size={size} />;
    case "nvm":
      return <NvmIcon size={size} />;
    default:
      return <VsCodeIcon size={size} />;
  }
}

// ============================================================================
// HELPER ICON RESOLVER FOR PLATFORMS
// ============================================================================

export function renderPlatformIcon(id, size = 22) {
  switch (id) {
    case "leetcode":
      return <LeetCodeIcon size={size} />;
    case "github":
      return <GitHubIconVector size={size} />;
    case "linkedin":
      return <LinkedInIconVector size={size} />;
    case "codepen":
      return <CodePenIconVector size={size} />;
    case "stackblitz":
      return <StackBlitzIconVector size={size} />;
    case "hackerrank":
      return <HackerRankIconVector size={size} />;
    case "aos":
      return <AosIconVector size={size} />;
    case "lusion":
      return <LusionIconVector size={size} />;
    case "overleaf":
      return <OverleafIconVector size={size} />;
    case "google-fonts":
      return <GoogleFontsIconVector size={size} />;
    case "react-icons":
      return <ReactIconsVector size={size} />;
    case "figma":
      return <FigmaIcon size={size} />;
    case "unsplash":
      return <UnsplashIconVector size={size} />;
    case "indeed":
      return <IndeedIconVector size={size} />;
    case "wellfound":
      return <WellfoundIconVector size={size} />;
    case "glassdoor":
      return <GlassdoorIconVector size={size} />;
    case "resume-io":
      return <ResumeIoIconVector size={size} />;
    default:
      return <LeetCodeIcon size={size} />;
  }
}
