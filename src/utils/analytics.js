/**
 * Internal Lightweight Analytics & Conversion Tracker
 */

const ANALYTICS_KEY = 'bodyfit_analytics_v1';

function getStoredAnalytics() {
  try {
    const raw = localStorage.getItem(ANALYTICS_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to parse analytics storage:', e);
  }
  return {
    totalVisitors: 1420,
    pageViews: 3840,
    trialBookings: 86,
    membershipPurchases: 42,
    revenueGenerated: 147000,
    mostPopularPlan: 'Standard (Gym + Classes)',
    recentEvents: []
  };
}

function saveAnalytics(data) {
  try {
    localStorage.setItem(ANALYTICS_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Failed to save analytics storage:', e);
  }
}

export function trackEvent(eventType, eventData = {}) {
  const current = getStoredAnalytics();
  const newEvent = {
    type: eventType,
    data: eventData,
    timestamp: new Date().toISOString()
  };

  current.recentEvents = [newEvent, ...(current.recentEvents || [])].slice(0, 50);

  if (eventType === 'PAGE_VIEW') {
    current.pageViews += 1;
  } else if (eventType === 'TRIAL_BOOKED') {
    current.trialBookings += 1;
  } else if (eventType === 'MEMBERSHIP_PURCHASED') {
    current.membershipPurchases += 1;
    if (eventData.amount) {
      current.revenueGenerated += Number(eventData.amount);
    }
  }

  saveAnalytics(current);
}

export function getAnalyticsSummary() {
  const data = getStoredAnalytics();
  const conversionRate = data.totalVisitors > 0 
    ? ((data.membershipPurchases / data.totalVisitors) * 100).toFixed(1)
    : '3.0';

  return {
    ...data,
    conversionRate
  };
}
