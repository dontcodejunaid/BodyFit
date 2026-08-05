import React, { useEffect, useState } from 'react';
import {
  CalendarCheck, Settings2, BarChart3, LogOut, ExternalLink, MonitorSmartphone,
} from 'lucide-react';
import BookingsPanel from './BookingsPanel';
import ManagePanel from './ManagePanel';
import AnalyticsPanel from './AnalyticsPanel';
import { getBookings, bucketOf } from '../../utils/adminStore';
import { getSession, logout } from '../../utils/adminAuth';
import logoImg from '../../assets/logo.png';

const TABS = [
  { id: 'bookings', label: 'Bookings', icon: CalendarCheck },
  { id: 'manage', label: 'Manage', icon: Settings2 },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
];

export default function AdminDashboard({ onLogout, onExit }) {
  const [tab, setTab] = useState('bookings');
  const [bookings, setBookings] = useState(() => getBookings());

  const session = getSession();
  const todayCount = bookings.filter((booking) => bucketOf(booking) === 'today').length;
  const pendingCount = bookings.filter((booking) => (booking.status || 'Pending') === 'Pending').length;

  // Keep the list live without a manual reload.
  //
  // IMPORTANT: this only sees bookings stored in THIS browser. localStorage is
  // per-device, so a booking made on a customer's phone never reaches another
  // machine's dashboard no matter how often we poll. Cross-device visibility
  // needs a shared backend — see the note in utils/adminStore.js.
  useEffect(() => {
    const refresh = () => setBookings(getBookings());

    // 'storage' fires for other tabs; the poll and focus handlers cover this one.
    window.addEventListener('storage', refresh);
    window.addEventListener('focus', refresh);
    document.addEventListener('visibilitychange', refresh);
    const interval = setInterval(refresh, 5000);

    return () => {
      window.removeEventListener('storage', refresh);
      window.removeEventListener('focus', refresh);
      document.removeEventListener('visibilitychange', refresh);
      clearInterval(interval);
    };
  }, []);

  const handleLogout = () => {
    logout();
    onLogout();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Top bar */}
      <header className="sticky top-0 z-10 border-b border-slate-800 bg-slate-950/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-4">
          <div className="flex items-center gap-3">
            <img alt="Body Fit" className="h-9 w-auto" src={logoImg} />
            <div>
              <div className="font-teko text-xl leading-none tracking-wide text-white">
                OWNER <span className="text-orange-500">PANEL</span>
              </div>
              <div className="mt-0.5 text-[11px] text-slate-500">
                {session?.name ? `${session.name} · ` : ''}
                {session?.email}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              className="inline-flex items-center gap-2 rounded-lg border border-slate-800 px-3 py-2 text-xs font-semibold text-slate-400 transition-colors hover:text-white"
              onClick={onExit}
              type="button"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              View site
            </button>
            <button
              className="inline-flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs font-bold text-red-400 transition-colors hover:bg-red-500/20"
              onClick={handleLogout}
              type="button"
            >
              <LogOut className="h-3.5 w-3.5" />
              Sign out
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="mx-auto flex max-w-7xl items-center gap-1 px-6">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              className={`-mb-px inline-flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-bold transition-colors ${
                tab === id
                  ? 'border-orange-500 text-white'
                  : 'border-transparent text-slate-500 hover:text-slate-300'
              }`}
              key={id}
              onClick={() => setTab(id)}
              type="button"
            >
              <Icon className="h-4 w-4" />
              {label}
              {id === 'bookings' && pendingCount > 0 && (
                <span className="rounded-full bg-amber-500/20 px-1.5 py-0.5 text-[10px] font-black text-amber-400">
                  {pendingCount}
                </span>
              )}
            </button>
          ))}
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">
        {tab === 'bookings' && (
          <>
            <div className="mb-6">
              <h1 className="font-teko text-3xl uppercase tracking-wide text-white">Bookings</h1>
              <p className="mt-1 text-sm text-slate-400">
                {todayCount} today · {pendingCount} awaiting your decision
              </p>
            </div>

            <div className="mb-6 flex items-start gap-3 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-xs leading-relaxed text-amber-200">
              <MonitorSmartphone className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
              <div>
                <strong className="font-bold">This list is stored on this device only.</strong>{' '}
                Bookings are saved in each visitor&apos;s own browser, so a booking made on a
                customer&apos;s phone — or on another admin&apos;s laptop — will not appear here.
                The list refreshes automatically every few seconds, but only for bookings made in
                this browser. Sharing bookings across devices requires a backend database.
              </div>
            </div>
            <BookingsPanel bookings={bookings} onChange={setBookings} />
          </>
        )}

        {tab === 'manage' && (
          <>
            <div className="mb-6">
              <h1 className="font-teko text-3xl uppercase tracking-wide text-white">Manage</h1>
              <p className="mt-1 text-sm text-slate-400">
                Membership plans, trainers, and class schedule slots.
              </p>
            </div>
            <ManagePanel />
          </>
        )}

        {tab === 'analytics' && (
          <>
            <div className="mb-6">
              <h1 className="font-teko text-3xl uppercase tracking-wide text-white">Analytics</h1>
              <p className="mt-1 text-sm text-slate-400">
                Booking trends, popular services, and revenue estimate.
              </p>
            </div>
            <AnalyticsPanel bookings={bookings} />
          </>
        )}
      </main>
    </div>
  );
}
