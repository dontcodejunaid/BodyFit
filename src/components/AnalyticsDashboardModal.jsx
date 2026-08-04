import React, { useState, useEffect } from 'react';
import { X, TrendingUp, Users, CalendarCheck, CreditCard, PieChart, RefreshCw, Activity, DollarSign } from 'lucide-react';
import { getAnalyticsSummary } from '../utils/analytics';

export default function AnalyticsDashboardModal({ isOpen, onClose }) {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    if (isOpen) {
      setStats(getAnalyticsSummary());
    }
  }, [isOpen]);

  if (!isOpen || !stats) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-8 p-6 space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-white">BodyFit Business Analytics</h3>
              <p className="text-xs text-slate-400">Real-time Conversion & Traffic Metrics</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Top Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
            <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
              <span>Total Visitors</span>
              <Users className="w-4 h-4 text-orange-400" />
            </div>
            <div className="text-xl font-black text-white">{stats.totalVisitors}</div>
            <span className="text-[10px] text-emerald-400 font-bold">+12% this week</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
            <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
              <span>Conversion Rate</span>
              <TrendingUp className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-xl font-black text-amber-400">{stats.conversionRate}%</div>
            <span className="text-[10px] text-emerald-400 font-bold">High intent lead flow</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
            <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
              <span>Booked Trials</span>
              <CalendarCheck className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-xl font-black text-white">{stats.trialBookings}</div>
            <span className="text-[10px] text-slate-500 font-medium">Free passes claimed</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
            <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
              <span>Memberships</span>
              <CreditCard className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-xl font-black text-emerald-400">{stats.membershipPurchases}</div>
            <span className="text-[10px] text-emerald-400 font-bold">Active paid passes</span>
          </div>
        </div>

        {/* Revenue Banner */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-950 via-orange-950/40 to-slate-950 border border-orange-500/30 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-orange-400 uppercase tracking-wider block">TOTAL REVENUE GENERATED</span>
            <span className="text-2xl font-black text-white">₹{stats.revenueGenerated.toLocaleString()}</span>
          </div>
          <span className="px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20 text-xs font-bold">
            Most Popular: {stats.mostPopularPlan}
          </span>
        </div>

        {/* Recent Real-time Event Log */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
            <PieChart className="w-4 h-4 text-orange-400" />
            Recent Live Visitor Events
          </h4>

          <div className="max-h-48 overflow-y-auto space-y-2 pr-1">
            {stats.recentEvents && stats.recentEvents.length > 0 ? (
              stats.recentEvents.map((evt, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-slate-950 border border-slate-800/80 text-xs flex items-center justify-between">
                  <span className="font-semibold text-white">{evt.type}</span>
                  <span className="text-[10px] text-slate-500">{new Date(evt.timestamp).toLocaleTimeString()}</span>
                </div>
              ))
            ) : (
              <div className="text-center py-6 text-slate-500 text-xs">
                No recent events logged yet. Interact with booking forms or membership plans to see live conversion logging!
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <button
          onClick={onClose}
          className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-colors"
        >
          Close Analytics Dashboard
        </button>

      </div>
    </div>
  );
}
