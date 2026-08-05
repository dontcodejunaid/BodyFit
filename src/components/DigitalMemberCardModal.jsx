import React, { useRef } from 'react';
import { X, QrCode, ShieldCheck, Download, Calendar, MapPin, Sparkles, User, Dumbbell } from 'lucide-react';
import logoImg from '../assets/logo.png';

/**
 * Generates a deterministic array of QR module rect coordinates based on a seed string (Pass ID).
 * Grid size: 21x21 modules.
 */
function generateQRModules(seedString) {
  let hash = 0;
  const str = seedString || 'BF-DEFAULT-PASS';
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }

  const gridSize = 21;
  const cellSize = 100 / gridSize;
  const grid = Array.from({ length: gridSize }, () => Array(gridSize).fill(false));

  const markFinder = (startR, startC) => {
    for (let r = 0; r < 7; r++) {
      for (let c = 0; c < 7; c++) {
        const isBorder = r === 0 || r === 6 || c === 0 || c === 6;
        const isCenter = r >= 2 && r <= 4 && c >= 2 && c <= 4;
        if (isBorder || isCenter) {
          grid[startR + r][startC + c] = true;
        }
      }
    }
  };

  markFinder(0, 0);
  markFinder(0, gridSize - 7);
  markFinder(gridSize - 7, 0);

  let state = Math.abs(hash) || 987654321;
  const nextRandom = () => {
    state = (state * 1664525 + 1013904223) % 4294967296;
    return state / 4294967296;
  };

  const modules = [];

  for (let r = 0; r < gridSize; r++) {
    for (let c = 0; c < gridSize; c++) {
      const inTopLeft = r < 8 && c < 8;
      const inTopRight = r < 8 && c >= gridSize - 8;
      const inBottomLeft = r >= gridSize - 8 && c < 8;

      if (!inTopLeft && !inTopRight && !inBottomLeft) {
        if (nextRandom() > 0.52) {
          grid[r][c] = true;
        }
      }

      if (grid[r][c]) {
        const isTLCenter = r >= 2 && r <= 4 && c >= 2 && c <= 4;
        const isTRCenter = r >= 2 && r <= 4 && c >= gridSize - 5 && c <= gridSize - 3;
        const isBLCenter = r >= gridSize - 5 && r <= gridSize - 3 && c >= 2 && c <= 4;
        const isOrange = isTLCenter || isTRCenter || isBLCenter;

        modules.push({
          x: (c * cellSize).toFixed(2),
          y: (r * cellSize).toFixed(2),
          w: (cellSize + 0.1).toFixed(2),
          h: (cellSize + 0.1).toFixed(2),
          fill: isOrange ? '#f97316' : '#0f172a'
        });
      }
    }
  }

  return modules;
}

export default function DigitalMemberCardModal({ memberData, isOpen, onClose }) {
  const cardRef = useRef(null);

  if (!isOpen || !memberData) return null;

  const { customer, plan, paymentResult } = memberData;
  const memberName = customer?.name || 'BodyFit Member';
  const memberPhone = customer?.phone || '+91 98765 43210';
  const planName = plan?.name || 'Standard Membership';
  const passId = paymentResult?.paymentId ? `BF-${paymentResult.paymentId.slice(-8).toUpperCase()}` : 'BF-2026-8492';
  
  // Expiry date calculation (1 month or 1 year)
  const validUntilDate = new Date();
  validUntilDate.setDate(validUntilDate.getDate() + 30);
  const formattedValidity = validUntilDate.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  const qrModules = generateQRModules(passId);

  // Dedicated 1-Page PDF Print Handler
  const handlePrintPass = () => {
    const printWindow = window.open('', '_blank', 'width=500,height=700');
    if (!printWindow) {
      alert('Please allow popups for this site to download/print your 1-page pass.');
      return;
    }

    const qrSvgContent = `
      <svg viewBox="0 0 100 100">
        <rect x="0" y="0" width="100" height="100" fill="#ffffff" rx="4" />
        ${qrModules.map(m => `<rect x="${m.x}" y="${m.y}" width="${m.w}" height="${m.h}" fill="${m.fill}" />`).join('')}
      </svg>
    `;

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>BodyFit Pass - ${memberName}</title>
          <style>
            * { box-sizing: border-box; margin: 0; padding: 0; }
            html, body {
              width: 100%;
              height: 100%;
              max-height: 100vh;
              overflow: hidden;
              background-color: #020617;
              color: #ffffff;
              font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
              display: flex;
              align-items: center;
              justify-content: center;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            @page {
              size: portrait;
              margin: 0;
            }
            .card {
              width: 380px;
              max-width: 90%;
              background: #090d16;
              border: 1px solid rgba(249, 115, 22, 0.5);
              border-radius: 24px;
              padding: 22px;
              box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5);
              position: relative;
              overflow: hidden;
              page-break-inside: avoid;
              break-inside: avoid;
            }
            .header {
              display: flex;
              align-items: center;
              justify-content: space-between;
              margin-bottom: 16px;
            }
            .brand {
              font-size: 16px;
              font-weight: 900;
              letter-spacing: 1px;
              color: #ffffff;
              text-transform: uppercase;
              line-height: 1;
            }
            .sub {
              font-size: 9px;
              color: #f97316;
              font-weight: 700;
              text-transform: uppercase;
              letter-spacing: 2px;
              margin-top: 2px;
            }
            .badge {
              background: rgba(16, 185, 129, 0.2);
              border: 1px solid rgba(16, 185, 129, 0.4);
              color: #34d399;
              font-size: 9px;
              font-weight: 900;
              padding: 4px 10px;
              border-radius: 20px;
              letter-spacing: 1px;
            }
            .member-section {
              margin-bottom: 14px;
            }
            .label {
              font-size: 9px;
              color: #94a3b8;
              font-weight: 700;
              text-transform: uppercase;
              letter-spacing: 1px;
              display: block;
              margin-bottom: 2px;
            }
            .val-name {
              font-size: 20px;
              font-weight: 900;
              color: #ffffff;
              letter-spacing: -0.5px;
            }
            .grid {
              display: flex;
              justify-content: space-between;
              margin-top: 10px;
            }
            .pass-id {
              font-family: monospace;
              color: #fbbf24;
              font-weight: 700;
              font-size: 13px;
            }
            .plan-name {
              color: #ffffff;
              font-weight: 700;
              font-size: 13px;
            }
            .qr-box {
              background: rgba(255, 255, 255, 0.95);
              border-radius: 16px;
              padding: 16px;
              text-align: center;
              margin: 14px 0;
            }
            .qr-box svg {
              width: 155px;
              height: 155px;
              margin: 0 auto;
              display: block;
            }
            .qr-cap {
              font-size: 9px;
              font-weight: 800;
              color: #1e293b;
              letter-spacing: 1px;
              margin-top: 8px;
              display: block;
            }
            .footer {
              display: flex;
              justify-content: space-between;
              font-size: 10px;
              color: #cbd5e1;
              border-top: 1px solid rgba(255,255,255,0.1);
              padding-top: 10px;
              margin-top: 12px;
            }
          </style>
        </head>
        <body>
          <div class="card">
            <div class="header">
              <div>
                <div class="brand">BODYFIT</div>
                <div class="sub">Fitness Centre</div>
              </div>
              <div class="badge">● ACTIVE PASS</div>
            </div>
            
            <div class="member-section">
              <span class="label">MEMBER NAME</span>
              <div class="val-name">${memberName}</div>
              <div class="grid">
                <div>
                  <span class="label">PASS ID</span>
                  <div class="pass-id">${passId}</div>
                </div>
                <div>
                  <span class="label">PLAN TYPE</span>
                  <div class="plan-name">${planName}</div>
                </div>
              </div>
            </div>

            <div class="qr-box">
              ${qrSvgContent}
              <span class="qr-cap">SCAN AT GYM TURNSTILE FOR ENTRY</span>
            </div>

            <div class="footer">
              <span>📍 Amrit Nagar Branch</span>
              <span>📅 Valid Till: ${formattedValidity}</span>
            </div>
          </div>

          <script>
            window.onload = function() {
              setTimeout(function() {
                window.print();
              }, 250);
            };
          </script>
        </body>
      </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-8 space-y-6 p-6">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-orange-400" />
            <h3 className="text-base font-extrabold text-white">Digital Entry Pass</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* On-Screen Digital Membership Card */}
        <div
          ref={cardRef}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-orange-950 border border-orange-500/40 p-6 shadow-2xl text-slate-100 space-y-6"
        >
          {/* Decorative Lighting Orbs */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-orange-500/15 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-amber-500/15 rounded-full blur-2xl pointer-events-none" />

          {/* Card Header: Brand Logo & Status */}
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-2.5">
              <img src={logoImg} alt="BodyFit" className="w-9 h-9 object-contain" />
              <div>
                <span className="text-base font-black tracking-wider uppercase text-white block leading-none">
                  BODYFIT
                </span>
                <span className="text-[10px] text-orange-400 font-bold uppercase tracking-widest">
                  Fitness Centre
                </span>
              </div>
            </div>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-[10px] font-black uppercase tracking-wider">
              ● ACTIVE PASS
            </span>
          </div>

          {/* Member Main Info */}
          <div className="relative z-10 space-y-3 pt-2">
            <div className="space-y-0.5">
              <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">MEMBER NAME</span>
              <h4 className="text-xl font-black text-white tracking-tight">{memberName}</h4>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs pt-1">
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">PASS ID</span>
                <span className="font-mono text-amber-400 font-bold">{passId}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">PLAN TYPE</span>
                <span className="text-white font-bold truncate block">{planName}</span>
              </div>
            </div>
          </div>

          {/* SVG QR Code for Turnstile Check-In (Bigger) */}
          <div className="relative z-10 p-5 rounded-2xl bg-white/95 backdrop-blur-md flex flex-col items-center justify-center gap-2 text-slate-950 shadow-xl">
            <svg viewBox="0 0 100 100" className="w-36 h-36">
              <rect x="0" y="0" width="100" height="100" fill="#ffffff" rx="4" />
              {qrModules.map((m, idx) => (
                <rect key={idx} x={m.x} y={m.y} width={m.w} height={m.h} fill={m.fill} />
              ))}
            </svg>
            <span className="text-[10px] font-extrabold tracking-wider uppercase text-slate-700">
              SCAN AT GYM TURNSTILE FOR ENTRY
            </span>
          </div>

          {/* Footer Metadata */}
          <div className="relative z-10 flex items-center justify-between text-[11px] text-slate-300 pt-1 border-t border-slate-800/80">
            <div className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-orange-400" />
              <span>Amrit Nagar Branch</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              <span>Valid Till: {formattedValidity}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={handlePrintPass}
            className="flex-1 py-3.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-extrabold text-xs flex items-center justify-center gap-2 transition-colors border border-slate-700 shadow-md"
          >
            <Download className="w-4 h-4 text-orange-400" />
            <span>Download Pass</span>
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-3.5 px-4 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-extrabold text-xs transition-colors shadow-lg shadow-orange-600/20"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
