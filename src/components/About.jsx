import React, { useState, useEffect } from 'react';
import {
  Target, HeartPulse, Trophy, CheckCircle2, ShieldCheck, Star,
  Sparkles, Award, Dumbbell, Activity, Users2, Edit3, Save, RotateCcw, X
} from 'lucide-react';
import ownerImg from '../assets/owner.png';
import Component from './ui/gradient-bars-background';

const INITIAL_ABOUT_DATA = {
  header: {
    badge: 'About Body Fit Fitness Centre',
    titleMain: 'More Than a Gym - A Community',
    titleSub: 'Built on Discipline & Growth',
    story: 'Body Fit Fitness Centre was founded with a simple belief: fitness should be accessible, motivating, and sustainable for everyone - not just athletes. Located in the heart of Amrit Nagar, we\'ve built a space where beginners feel welcome and serious lifters feel challenged. Our certified trainers, modern equipment, and supportive community come together to help every member reach their goals, one rep at a time.'
  },
  tabContents: {
    philosophy: {
      title: '1. Consistency Over Intensity',
      quote: 'Sustainable progress beats short bursts of extreme effort. We focus on building lifelong habits.',
      bullets: [
        'Sustainable, habit-building fitness routines',
        'Long-term progressive development over quick fixes',
        'Designed for beginners and advanced athletes alike'
      ]
    },
    equipment: {
      title: '2. Community First',
      quote: 'Members train together, motivate each other, and celebrate wins together in an ego-free space.',
      bullets: [
        'Positive and inspiring training atmosphere',
        'Supportive member network & shared milestones',
        'State-of-the-art machinery and dedicated functional zones'
      ]
    },
    coaching: {
      title: '3. Expert Guidance',
      quote: 'Every plan is backed by certified trainers, not guesswork.',
      bullets: [
        'ACE Certified Trainers & structured guidance',
        'Custom workout & form assessment routines',
        'Regular tracking to ensure consistent results'
      ]
    }
  },
  founder: {
    badge: 'Head Coach & Owner',
    title: 'Owner\'s Note',
    note: '"We didn\'t just want to open another gym — we wanted to build a place where people actually show up. Every piece of equipment, every class, every trainer we hired was chosen with that goal in mind."',
    rating: '4.9 / 5 Rating'
  },
  highlights: [
    {
      id: 'trainers',
      title: 'Consistency Over Intensity',
      description: 'Sustainable progress beats short bursts of extreme effort.',
      color: 'from-orange-500 to-amber-500'
    },
    {
      id: 'equipment',
      title: 'Community First',
      description: 'Members train together, motivate each other, and celebrate wins together.',
      color: 'from-amber-500 to-red-500'
    },
    {
      id: 'community',
      title: 'Expert Guidance',
      description: 'Every plan is backed by certified trainers, not guesswork.',
      color: 'from-red-500 to-orange-500'
    }
  ],
  badges: [
    { id: 1, text: 'ACE Certified Trainers' },
    { id: 2, text: 'ISO Hygiene Standards' },
    { id: 3, text: 'Delhi Fitness Association Member' },
    { id: 4, text: '100% Sanitized Facility' }
  ],
  metrics: [
    { value: '5', label: 'Years Active' },
    { value: '1,200+', label: 'Members Trained' },
    { value: '8', label: 'Certified Trainers' },
    { value: '50+', label: 'Pieces of Equipment' }
  ]
};

export default function About() {
  const [activeTab, setActiveTab] = useState('philosophy');
  const [isEditing, setIsEditing] = useState(false);
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem('bodyfit_about_data');
      return saved ? JSON.parse(saved) : INITIAL_ABOUT_DATA;
    } catch {
      return INITIAL_ABOUT_DATA;
    }
  });

  const [editForm, setEditForm] = useState(data);

  useEffect(() => {
    setEditForm(data);
  }, [data]);

  const handleSave = () => {
    setData(editForm);
    try {
      localStorage.setItem('bodyfit_about_data', JSON.stringify(editForm));
    } catch (e) {
      console.error(e);
    }
    setIsEditing(false);
  };

  const handleReset = () => {
    setData(INITIAL_ABOUT_DATA);
    setEditForm(INITIAL_ABOUT_DATA);
    localStorage.removeItem('bodyfit_about_data');
    setIsEditing(false);
  };

  const iconsMap = {
    trainers: ShieldCheck,
    equipment: Target,
    community: HeartPulse
  };

  const badgeIconsMap = [Award, ShieldCheck, Star, Sparkles];

  return (
    <Component
      numBars={15}
      gradientFrom="rgba(255, 60, 0, 0.35)"
      gradientTo="transparent"
      animationDuration={2.2}
      backgroundColor="#0f172a"
    >
      <section id="about-us" className="scroll-mt-20 py-24 text-slate-100 relative overflow-hidden w-full">

        <div className="absolute top-1/3 -left-32 w-[28rem] h-[28rem] bg-orange-600/10 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute bottom-10 -right-20 w-[30rem] h-[30rem] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-20">

          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold uppercase tracking-wider">
              <Trophy className="w-4 h-4 text-orange-500" />
              {isEditing ? (
                <input
                  type="text"
                  value={editForm.header.badge}
                  onChange={(e) => setEditForm({
                    ...editForm,
                    header: { ...editForm.header, badge: e.target.value }
                  })}
                  className="bg-slate-900 border border-orange-500/50 rounded px-2 py-0.5 text-xs text-white focus:outline-none"
                />
              ) : (
                data.header.badge
              )}
            </div>

            <h2 className="text-2xl sm:text-4xl lg:text-4xl font-extrabold text-white tracking-tight leading-snug">
              {isEditing ? (
                <div className="space-y-2 max-w-xl mx-auto">
                  <input
                    type="text"
                    value={editForm.header.titleMain}
                    onChange={(e) => setEditForm({
                      ...editForm,
                      header: { ...editForm.header, titleMain: e.target.value }
                    })}
                    className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-1 text-xl text-white font-bold"
                  />
                  <input
                    type="text"
                    value={editForm.header.titleSub}
                    onChange={(e) => setEditForm({
                      ...editForm,
                      header: { ...editForm.header, titleSub: e.target.value }
                    })}
                    className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-1 text-xl text-orange-400 font-bold"
                  />
                </div>
              ) : (
                <>
                  More Than a Gym <span className="inline-block w-2.5 h-[3px] bg-white align-middle mx-1.5 rounded-full"></span> A Community <br />
                  <span className="bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 bg-clip-text text-transparent">
                    {data.header.titleSub}
                  </span>
                </>
              )}
            </h2>

            {isEditing ? (
              <textarea
                value={editForm.header.story}
                onChange={(e) => setEditForm({
                  ...editForm,
                  header: { ...editForm.header, story: e.target.value }
                })}
                rows={3}
                className="w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-xl p-3 text-sm text-slate-200 focus:outline-none focus:border-orange-500"
              />
            ) : (
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
                {data.header.story}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            <div className="lg:col-span-6 space-y-6 flex flex-col justify-between">
              {/* 21st.dev Inspired Interactive Animated Segmented Tabs */}
              <div className="p-2 rounded-2xl bg-slate-950/80 backdrop-blur-2xl border border-slate-800/80 grid grid-cols-3 gap-2 shadow-2xl relative">
                {[
                  { id: 'philosophy', label: 'Philosophy', icon: HeartPulse },
                  { id: 'equipment', label: 'Equipment', icon: Dumbbell },
                  { id: 'coaching', label: 'Coaching', icon: ShieldCheck },
                ].map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`relative py-3.5 px-4 rounded-xl text-xs sm:text-sm font-extrabold flex items-center justify-center gap-2.5 transition-all duration-300 z-10 ${
                        isActive
                          ? 'text-white shadow-lg'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
                      }`}
                    >
                      {isActive && (
                        <div className="absolute inset-0 bg-gradient-to-r from-orange-600 via-amber-600 to-orange-500 rounded-xl shadow-lg shadow-orange-600/30 transition-all duration-300 -z-10 animate-pulse" />
                      )}
                      <Icon className={`w-4 h-4 ${isActive ? 'text-white animate-bounce' : 'text-orange-400'}`} />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* 21st.dev Style Glowing Glass Content Card */}
              <div className="relative group rounded-3xl p-[1px] bg-gradient-to-b from-orange-500/30 via-slate-800/50 to-slate-950/80 shadow-2xl flex-1 flex flex-col">
                <div className="p-6 sm:p-8 rounded-[23px] bg-slate-950/95 backdrop-blur-2xl space-y-6 flex-1 flex flex-col justify-between border border-slate-800/80">
                  <div className="space-y-5">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-black uppercase tracking-wider">
                      <Sparkles className="w-3.5 h-3.5 text-orange-400 animate-spin" />
                      {isEditing ? (
                        <input
                          type="text"
                          value={editForm.tabContents[activeTab].title}
                          onChange={(e) => setEditForm({
                            ...editForm,
                            tabContents: {
                              ...editForm.tabContents,
                              [activeTab]: {
                                ...editForm.tabContents[activeTab],
                                title: e.target.value
                              }
                            }
                          })}
                          className="bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-orange-400 font-bold w-full"
                        />
                      ) : (
                        data.tabContents[activeTab].title
                      )}
                    </div>

                    {isEditing ? (
                      <textarea
                        value={editForm.tabContents[activeTab].quote}
                        onChange={(e) => setEditForm({
                          ...editForm,
                          tabContents: {
                            ...editForm.tabContents,
                            [activeTab]: {
                              ...editForm.tabContents[activeTab],
                              quote: e.target.value
                            }
                          }
                        })}
                        rows={2}
                        className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-sm italic text-slate-200"
                      />
                    ) : (
                      <blockquote className="text-slate-100 text-sm sm:text-base leading-relaxed italic border-l-4 border-gradient-to-b border-orange-500 pl-4 py-1.5 bg-slate-900/40 rounded-r-xl">
                        "{data.tabContents[activeTab].quote}"
                      </blockquote>
                    )}

                    <div className="space-y-3 pt-2">
                      {isEditing ? (
                        editForm.tabContents[activeTab].bullets.map((b, i) => (
                          <input
                            key={i}
                            type="text"
                            value={b}
                            onChange={(e) => {
                              const newBullets = [...editForm.tabContents[activeTab].bullets];
                              newBullets[i] = e.target.value;
                              setEditForm({
                                ...editForm,
                                tabContents: {
                                  ...editForm.tabContents,
                                  [activeTab]: {
                                    ...editForm.tabContents[activeTab],
                                    bullets: newBullets
                                  }
                                }
                              });
                            }}
                            className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 text-xs text-slate-300 mb-1"
                          />
                        ))
                      ) : (
                        <div className="grid grid-cols-1 gap-2.5">
                          {data.tabContents[activeTab].bullets.map((b, i) => (
                            <div key={i} className="flex items-center gap-3 text-xs sm:text-sm text-slate-200 p-3 rounded-2xl bg-slate-900/50 border border-slate-800/80 hover:border-orange-500/40 hover:bg-slate-900 transition-all duration-300 shadow-sm">
                              <div className="p-1.5 rounded-xl bg-orange-500/20 border border-orange-500/30 text-orange-400 shrink-0">
                                <CheckCircle2 className="w-4 h-4" />
                              </div>
                              <span className="font-semibold">{b}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Gym Location Badge Footer */}
                  <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                    <span className="flex items-center gap-2 text-slate-300 font-medium">
                      <Activity className="w-4 h-4 text-orange-500 animate-pulse" />
                      D-20, Amrit Nagar, New Delhi
                    </span>
                    <span className="text-amber-400 font-bold bg-amber-400/10 border border-amber-400/30 px-3 py-1 rounded-full shadow-inner">
                      5 Yrs Legacy
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative group rounded-3xl p-1 bg-gradient-to-b from-orange-500/40 via-slate-800 to-slate-950 shadow-2xl h-full flex flex-col">
                <div className="bg-slate-950/90 backdrop-blur-xl rounded-[22px] p-6 sm:p-8 space-y-6 flex-1 flex flex-col justify-between">

                  <div className="relative overflow-hidden rounded-2xl aspect-[16/10] border border-slate-800">
                    <img
                      src={ownerImg}
                      alt="Body Fit Gym Founder & Lead Coach"
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />

                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white font-bold">
                      <div className="flex items-center gap-1.5 bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-700">
                        <Users2 className="w-3.5 h-3.5 text-orange-400" />
                        {isEditing ? (
                          <input
                            type="text"
                            value={editForm.founder.badge}
                            onChange={(e) => setEditForm({
                              ...editForm,
                              founder: { ...editForm.founder, badge: e.target.value }
                            })}
                            className="bg-slate-950 border border-slate-700 px-1 py-0.5 text-xs text-white rounded"
                          />
                        ) : (
                          data.founder.badge
                        )}
                      </div>
                      <div className="flex items-center gap-1 bg-amber-500/20 backdrop-blur-md border border-amber-500/30 text-amber-400 px-3 py-1.5 rounded-full">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        {isEditing ? (
                          <input
                            type="text"
                            value={editForm.founder.rating}
                            onChange={(e) => setEditForm({
                              ...editForm,
                              founder: { ...editForm.founder, rating: e.target.value }
                            })}
                            className="bg-slate-950 border border-slate-700 px-1 py-0.5 text-xs text-amber-400 rounded"
                          />
                        ) : (
                          data.founder.rating
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="text-xs uppercase tracking-wider font-extrabold text-orange-400">Founder's Commitment</div>

                    {isEditing ? (
                      <input
                        type="text"
                        value={editForm.founder.title}
                        onChange={(e) => setEditForm({
                          ...editForm,
                          founder: { ...editForm.founder, title: e.target.value }
                        })}
                        className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-lg font-bold text-white"
                      />
                    ) : (
                      <h3 className="text-xl font-bold text-white">{data.founder.title}</h3>
                    )}

                    {isEditing ? (
                      <textarea
                        value={editForm.founder.note}
                        onChange={(e) => setEditForm({
                          ...editForm,
                          founder: { ...editForm.founder, note: e.target.value }
                        })}
                        rows={3}
                        className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-xs text-slate-300"
                      />
                    ) : (
                      <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                        {data.founder.note}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-4 gap-2 pt-3 border-t border-slate-800">
                    {(isEditing ? editForm.metrics : data.metrics).map((m, idx) => (
                      <div key={idx} className="text-center p-2 rounded-xl bg-slate-900/60 border border-slate-800/80">
                        {isEditing ? (
                          <div className="space-y-1">
                            <input
                              type="text"
                              value={m.value}
                              onChange={(e) => {
                                const newMetrics = [...editForm.metrics];
                                newMetrics[idx].value = e.target.value;
                                setEditForm({ ...editForm, metrics: newMetrics });
                              }}
                              className="w-full bg-slate-950 border border-slate-700 rounded text-center text-xs font-bold text-amber-400"
                            />
                            <input
                              type="text"
                              value={m.label}
                              onChange={(e) => {
                                const newMetrics = [...editForm.metrics];
                                newMetrics[idx].label = e.target.value;
                                setEditForm({ ...editForm, metrics: newMetrics });
                              }}
                              className="w-full bg-slate-950 border border-slate-700 rounded text-center text-[10px] text-slate-400"
                            />
                          </div>
                        ) : (
                          <>
                            <div className="text-xs sm:text-sm font-black text-amber-400">{m.value}</div>
                            <div className="text-[10px] text-slate-400 font-medium">{m.label}</div>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(isEditing ? editForm.highlights : data.highlights).map((item, idx) => {
              const Icon = iconsMap[item.id] || ShieldCheck;
              return (
                <div
                  key={idx}
                  className="p-7 rounded-3xl bg-slate-950/90 backdrop-blur-xl border border-slate-800/90 hover:border-orange-500/50 hover:bg-slate-950 transition-all duration-300 space-y-4 group shadow-xl"
                >
                  <div className={`p-4 rounded-2xl bg-gradient-to-br ${item.color} text-white w-fit shadow-lg group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6" />
                  </div>

                  {isEditing ? (
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) => {
                          const newHighlights = [...editForm.highlights];
                          newHighlights[idx].title = e.target.value;
                          setEditForm({ ...editForm, highlights: newHighlights });
                        }}
                        className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-sm font-bold text-white"
                      />
                      <textarea
                        value={item.description}
                        onChange={(e) => {
                          const newHighlights = [...editForm.highlights];
                          newHighlights[idx].description = e.target.value;
                          setEditForm({ ...editForm, highlights: newHighlights });
                        }}
                        rows={3}
                        className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-xs text-slate-300"
                      />
                    </div>
                  ) : (
                    <>
                      <h4 className="text-xl font-extrabold text-white group-hover:text-orange-400 transition-colors">{item.title}</h4>
                      <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">{item.description}</p>
                    </>
                  )}
                </div>
              );
            })}
          </div>

          <div className="rounded-3xl bg-slate-950/90 backdrop-blur-xl p-6 border border-slate-800/80 shadow-2xl space-y-4">
            <div className="text-center text-xs font-bold uppercase tracking-wider text-slate-400">
              Certifications, Awards & Recognized Gym Standards
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6">
              {(isEditing ? editForm.badges : data.badges).map((badge, idx) => {
                const Icon = badgeIconsMap[idx % badgeIconsMap.length];
                return (
                  <div
                    key={badge.id || idx}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-900 border border-slate-800/80 text-xs sm:text-sm font-semibold text-slate-200 hover:border-orange-500/40 transition-colors"
                  >
                    <Icon className="w-4 h-4 text-orange-500" />
                    {isEditing ? (
                      <input
                        type="text"
                        value={badge.text}
                        onChange={(e) => {
                          const newBadges = [...editForm.badges];
                          newBadges[idx].text = e.target.value;
                          setEditForm({ ...editForm, badges: newBadges });
                        }}
                        className="bg-slate-950 border border-slate-700 px-2 py-0.5 text-xs text-white rounded"
                      />
                    ) : (
                      badge.text
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </Component>
  );
}
