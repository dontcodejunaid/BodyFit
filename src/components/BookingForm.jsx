import React, { useState, useEffect } from 'react';
import { 
  Calendar, Clock, User, Phone, Dumbbell, CheckCircle2, 
  AlertCircle, Send, ArrowRight, ArrowLeft, ShieldCheck, Sparkles, 
  Check, Flame, MessageSquare
} from 'lucide-react';
import { saveBooking, isSlotTaken } from '../utils/localStorage';
import { sendWhatsAppBookingAlert, WhatsAppConfig } from '../utils/whatsapp';
import { INITIAL_TRAINERS } from '../data/trainersAndScheduleData';
import Component from './ui/gradient-bars-background';

export default function BookingForm({ selectedPlan = null, onClearPlan = null }) {
  const [step, setStep] = useState(1);

  // Form State
  const [formData, setFormData] = useState({
    service: selectedPlan ? `Membership: ${selectedPlan.name} (${selectedPlan.price})` : 'Gym Session',
    date: new Date().toISOString().split('T')[0],
    time: '07:00 AM',
    trainer: 'No Preference (Assign Any Available)',
    name: '',
    phone: '',
    email: '',
  });

  useEffect(() => {
    if (selectedPlan) {
      setFormData(prev => ({
        ...prev,
        service: `Membership: ${selectedPlan.name} (${selectedPlan.price})`
      }));
    }
  }, [selectedPlan]);

  const [confirmedBooking, setConfirmedBooking] = useState(null);
  const [errors, setErrors] = useState({});

  // Services Grid
  const services = [
    { id: 'Gym Session', title: 'General Gym Session', desc: 'Access to cardio, weight & functional zones', badge: 'Most Popular', icon: Dumbbell, color: 'from-orange-500 to-amber-500' },
    { id: 'Personal Training', title: 'Personal Training Trial', desc: '1-on-1 session with certified fitness coach', badge: 'Fast Transformation', icon: User, color: 'from-amber-500 to-yellow-500' },
    { id: 'Group Class', title: 'Special Group Class', desc: 'Zumba, Yoga, CrossFit or High-Intensity HIIT', badge: 'Fun & Energetic', icon: Calendar, color: 'from-red-500 to-orange-500' },
    { id: 'Membership Enquiry', title: 'Facility Tour & Consult', desc: 'Walk-through tour & personalized plan consult', badge: '100% Free', icon: ShieldCheck, color: 'from-emerald-500 to-teal-500' },
  ];

  // Grouped Shift Time Slots
  const morningSlots = ['06:00 AM', '07:00 AM', '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM'];
  const eveningSlots = ['05:00 PM', '06:00 PM', '07:00 PM', '08:00 PM', '09:00 PM'];

  const trainersOptions = [
    {
      name: 'No Preference (Assign Any Available)',
      role: 'Instant Duty Coach Matching',
      desc: 'Quick matching with any certified coach on duty',
      photo: null,
      specialties: ['Instant Matching', 'All Goals']
    },
    ...INITIAL_TRAINERS.map(t => ({
      name: t.name,
      role: t.role,
      desc: t.bio,
      photo: t.photo,
      specialties: t.specialties
    }))
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateStep4 = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Full Name is required';
    if (!formData.phone.trim() || formData.phone.length < 10) {
      newErrors.phone = 'Valid 10-digit phone number is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!validateStep4()) return;

    if (isSlotTaken(formData.date, formData.time)) {
      setErrors({ slot: 'This time slot is already taken. Please select another time slot.' });
      setStep(2);
      return;
    }

    const newBooking = saveBooking(formData);
    setConfirmedBooking(newBooking);
    setStep(5);

    // Auto-trigger WhatsApp notification to active testing number
    sendWhatsAppBookingAlert(newBooking);
  };

  return (
    <Component
      numBars={15}
      gradientFrom="rgba(255, 60, 0, 0.4)"
      gradientTo="transparent"
      animationDuration={2}
      backgroundColor="#020617"
    >
      <section id="book-appointment" className="py-24 text-slate-100 relative overflow-hidden w-full">
        
        {/* Background Lighting Glow */}
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-orange-600/10 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
          
          {/* Section Header */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold uppercase tracking-wider">
              <Calendar className="w-4 h-4 text-orange-500" />
              Seamless Online Booking
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
              Reserve Your <span className="bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 bg-clip-text text-transparent">Free Trial Session</span>
            </h2>
            <p className="text-slate-300 text-base max-w-xl mx-auto">
              Pick your preferred service and time slot. Get instant booking reference & automated WhatsApp notification!
            </p>
          </div>

          {/* Multi-Step Indicator */}
          {step < 5 && (
            <div className="flex items-center justify-between mb-8 max-w-2xl mx-auto relative px-4">
              {[
                { num: 1, label: 'Service' },
                { num: 2, label: 'Date & Time' },
                { num: 3, label: 'Trainer' },
                { num: 4, label: 'Contact' },
              ].map((item) => (
                <div key={item.num} className="flex flex-col items-center relative z-10">
                  <div 
                    className={`w-11 h-11 rounded-2xl flex items-center justify-center font-black text-sm transition-all duration-300 ${
                      step >= item.num 
                        ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-xl shadow-orange-600/30 border border-orange-400/40' 
                        : 'bg-slate-900 border border-slate-800 text-slate-500'
                    }`}
                  >
                    {step > item.num ? <Check className="w-5 h-5 stroke-[3]" /> : item.num}
                  </div>
                  <span className={`text-xs font-bold mt-2.5 hidden sm:block ${step >= item.num ? 'text-orange-400' : 'text-slate-500'}`}>
                    {item.label}
                  </span>
                </div>
              ))}
              {/* Progress Bar Line */}
              <div className="absolute top-5 left-8 right-8 h-1 bg-slate-900 rounded-full -z-0">
                <div 
                  className="h-full bg-gradient-to-r from-orange-600 to-amber-500 rounded-full transition-all duration-500" 
                  style={{ width: `${((step - 1) / 3) * 100}%` }}
                />
              </div>
            </div>
          )}

          {/* Card Container */}
          <div className="bg-slate-900/90 backdrop-blur-2xl border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative">
            
            {/* Persistent Chosen Plan Banner visible on all steps while booking */}
            {selectedPlan && (
              <div className="mb-8 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-orange-950/90 via-slate-900 to-amber-950/90 border border-orange-500/50 shadow-xl shadow-orange-500/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 text-white shadow-md shrink-0">
                    <Sparkles className="w-5 h-5 fill-white text-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30">
                        Selected Plan Active
                      </span>
                      <span className="text-xs font-bold text-amber-300">
                        {selectedPlan.price} {selectedPlan.period}
                      </span>
                    </div>
                    <h4 className="text-lg font-black text-white mt-0.5">{selectedPlan.name}</h4>
                    <p className="text-xs text-slate-300 line-clamp-1">
                      Included: {selectedPlan.features ? selectedPlan.features.slice(0, 3).join(' • ') : ''}
                    </p>
                  </div>
                </div>
                {onClearPlan && (
                  <button
                    type="button"
                    onClick={onClearPlan}
                    className="text-xs font-bold text-slate-400 hover:text-orange-400 underline underline-offset-4 shrink-0 transition-colors"
                  >
                    Change / Remove Plan
                  </button>
                )}
              </div>
            )}

            {/* STEP 1: Select Service */}
            {step === 1 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <Dumbbell className="w-5 h-5 text-orange-500" />
                    Step 1: Choose Your Fitness Goal
                  </h3>
                  <span className="text-xs text-slate-400 font-semibold">1 of 4 Steps</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {services.map((item) => {
                    const Icon = item.icon;
                    const isSelected = formData.service === item.id;
                    return (
                      <div
                        key={item.id}
                        onClick={() => handleInputChange('service', item.id)}
                        className={`p-5 rounded-2xl border cursor-pointer transition-all duration-300 flex flex-col justify-between space-y-4 group relative overflow-hidden ${
                          isSelected 
                            ? 'border-orange-500 bg-orange-500/10 shadow-xl shadow-orange-500/10' 
                            : 'border-slate-800 bg-slate-950/60 hover:border-slate-700 hover:bg-slate-950'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className={`p-3 rounded-xl bg-gradient-to-br ${item.color} text-white shadow-md`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-amber-400">
                            {item.badge}
                          </span>
                        </div>

                        <div className="space-y-1">
                          <h4 className="font-bold text-white text-base group-hover:text-orange-400 transition-colors flex items-center justify-between">
                            {item.title}
                            {isSelected && <CheckCircle2 className="w-5 h-5 text-orange-500" />}
                          </h4>
                          <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-7 py-3.5 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-bold rounded-2xl flex items-center gap-2 shadow-lg shadow-orange-600/30 transition-all transform hover:-translate-y-0.5"
                  >
                    Continue to Schedule <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Choose Date & Time */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <Clock className="w-5 h-5 text-orange-500" />
                    Step 2: Pick Date & Time Slot
                  </h3>
                  <span className="text-xs text-slate-400 font-semibold">2 of 4 Steps</span>
                </div>

                {errors.slot && (
                  <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    {errors.slot}
                  </div>
                )}

                {/* Date Input */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">Select Preferred Date</label>
                  <input 
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    value={formData.date}
                    onChange={(e) => handleInputChange('date', e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-4 py-3.5 text-white font-semibold focus:outline-none focus:border-orange-500 transition-colors"
                  />
                </div>

                {/* Morning Shift Slots */}
                <div className="space-y-2 pt-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
                    <Flame className="w-4 h-4 text-amber-400" /> Morning Shift (6:00 AM - 1:00 PM)
                  </div>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
                    {morningSlots.map((slot) => {
                      const isTaken = isSlotTaken(formData.date, slot);
                      const isSelected = formData.time === slot;
                      return (
                        <button
                          key={slot}
                          type="button"
                          disabled={isTaken}
                          onClick={() => handleInputChange('time', slot)}
                          className={`py-3 px-3 text-xs font-extrabold rounded-xl border transition-all ${
                            isTaken
                              ? 'bg-slate-950/40 border-slate-900 text-slate-600 cursor-not-allowed line-through'
                              : isSelected
                              ? 'bg-orange-500 border-orange-500 text-white shadow-lg shadow-orange-500/30'
                              : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                          }`}
                        >
                          {slot}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Evening Shift Slots */}
                <div className="space-y-2 pt-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-orange-400 uppercase tracking-wider">
                    <Clock className="w-4 h-4 text-orange-400" /> Evening Shift (5:00 PM - 10:00 PM)
                  </div>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
                    {eveningSlots.map((slot) => {
                      const isTaken = isSlotTaken(formData.date, slot);
                      const isSelected = formData.time === slot;
                      return (
                        <button
                          key={slot}
                          type="button"
                          disabled={isTaken}
                          onClick={() => handleInputChange('time', slot)}
                          className={`py-3 px-3 text-xs font-extrabold rounded-xl border transition-all ${
                            isTaken
                              ? 'bg-slate-950/40 border-slate-900 text-slate-600 cursor-not-allowed line-through'
                              : isSelected
                              ? 'bg-orange-500 border-orange-500 text-white shadow-lg shadow-orange-500/30'
                              : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                          }`}
                        >
                          {slot}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-5 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-2xl flex items-center gap-2 transition-all text-sm"
                  >
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="px-7 py-3.5 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-bold rounded-2xl flex items-center gap-2 shadow-lg shadow-orange-600/30 transition-all transform hover:-translate-y-0.5"
                  >
                    Select Trainer <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Choose Trainer */}
            {step === 3 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <User className="w-5 h-5 text-orange-500" />
                    Step 3: Select Trainer Preference
                  </h3>
                  <span className="text-xs text-slate-400 font-semibold">3 of 4 Steps</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {trainersOptions.map((t) => {
                    const isSelected = formData.trainer === t.name;
                    return (
                      <div
                        key={t.name}
                        onClick={() => handleInputChange('trainer', t.name)}
                        className={`p-4 rounded-2xl border cursor-pointer transition-all duration-200 flex items-start gap-4 ${
                          isSelected
                            ? 'border-orange-500 bg-orange-500/10 text-white shadow-xl shadow-orange-500/10 ring-1 ring-orange-500/50'
                            : 'border-slate-800 bg-slate-950/80 text-slate-300 hover:border-slate-700 hover:bg-slate-900/60'
                        }`}
                      >
                        {t.photo ? (
                          <img
                            src={t.photo}
                            alt={t.name}
                            className="w-14 h-14 rounded-2xl object-cover object-top shrink-0 border border-slate-700 shadow-md"
                          />
                        ) : (
                          <div className="w-14 h-14 rounded-2xl bg-orange-500/20 text-orange-400 border border-orange-500/30 flex items-center justify-center shrink-0">
                            <User className="w-7 h-7" />
                          </div>
                        )}

                        <div className="flex-1 min-w-0 space-y-1">
                          <div className="flex items-center justify-between gap-1">
                            <h4 className="font-bold text-white text-sm truncate">{t.name}</h4>
                            {isSelected && <CheckCircle2 className="w-5 h-5 text-orange-500 shrink-0" />}
                          </div>
                          <p className="text-xs text-slate-400 font-medium truncate">{t.role || t.desc}</p>
                          
                          {t.specialties && (
                            <div className="flex flex-wrap gap-1 pt-1">
                              {t.specialties.slice(0, 2).map((spec, i) => (
                                <span key={i} className="text-[10px] px-2 py-0.5 rounded-md bg-slate-900 text-slate-300 border border-slate-800 font-medium">
                                  {spec}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-5 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-2xl flex items-center gap-2 transition-all text-sm"
                  >
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(4)}
                    className="px-7 py-3.5 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-bold rounded-2xl flex items-center gap-2 shadow-lg shadow-orange-600/30 transition-all transform hover:-translate-y-0.5"
                  >
                    Enter Details <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: Member Contact Details */}
            {step === 4 && (
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <Phone className="w-5 h-5 text-orange-500" />
                    Step 4: Confirm Your Details
                  </h3>
                  <span className="text-xs text-slate-400 font-semibold">Final Step</span>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-1 block">Full Name *</label>
                    <input
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className={`w-full bg-slate-950 border rounded-2xl px-4 py-3.5 text-white font-semibold focus:outline-none transition-colors ${
                        errors.name ? 'border-red-500' : 'border-slate-800 focus:border-orange-500'
                      }`}
                    />
                    {errors.name && <p className="text-red-400 text-xs mt-1 font-semibold">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-1 block">Phone / WhatsApp Number *</label>
                    <input
                      type="tel"
                      placeholder="Enter 10-digit WhatsApp number"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className={`w-full bg-slate-950 border rounded-2xl px-4 py-3.5 text-white font-semibold focus:outline-none transition-colors ${
                        errors.phone ? 'border-red-500' : 'border-slate-800 focus:border-orange-500'
                      }`}
                    />
                    {errors.phone && <p className="text-red-400 text-xs mt-1 font-semibold">{errors.phone}</p>}
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-1 block">Email Address (Optional)</label>
                    <input
                      type="email"
                      placeholder="Enter email address"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-4 py-3.5 text-white font-semibold focus:outline-none focus:border-orange-500 transition-colors"
                    />
                  </div>
                </div>

                {/* Summary Card */}
                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 text-xs">
                  <div className="font-extrabold text-orange-400 uppercase tracking-wider">Booking Review Summary</div>
                  <div className="grid grid-cols-2 gap-2 text-slate-300">
                    <div><span className="text-slate-500 block">Service:</span><strong className="text-white text-sm">{formData.service}</strong></div>
                    <div><span className="text-slate-500 block">Date & Time:</span><strong className="text-white text-sm">{formData.date} at {formData.time}</strong></div>
                    <div className="col-span-2"><span className="text-slate-500 block">Assigned Trainer:</span><strong className="text-white text-sm">{formData.trainer}</strong></div>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="px-5 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-2xl flex items-center gap-2 transition-all text-sm"
                  >
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>
                  <button
                    type="submit"
                    className="px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-2xl flex items-center gap-2 shadow-xl shadow-emerald-600/30 transition-all transform hover:-translate-y-0.5"
                  >
                    <Send className="w-4 h-4" /> Confirm & Send WhatsApp Alert
                  </button>
                </div>
              </form>
            )}

            {/* STEP 5: Printable Digital Pass Confirmation */}
            {step === 5 && confirmedBooking && (
              <div className="text-center space-y-6 py-4">
                <div className="w-20 h-20 bg-emerald-500/20 text-emerald-400 rounded-3xl flex items-center justify-center mx-auto border border-emerald-500/40 shadow-xl shadow-emerald-500/20 animate-bounce">
                  <CheckCircle2 className="w-12 h-12" />
                </div>

                <div className="space-y-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold">
                    <Sparkles className="w-3.5 h-3.5" /> Booking Confirmed
                  </div>
                  <h3 className="text-3xl font-black text-white">Your Trial Pass Is Ready!</h3>
                  <p className="text-slate-400 text-sm">
                    Ref ID: <span className="font-mono font-extrabold text-orange-400 bg-slate-950 px-2 py-1 rounded-md border border-slate-800">#{confirmedBooking.id}</span>
                  </p>
                </div>

                {/* Digital Pass Card */}
                <div className="max-w-md mx-auto p-6 rounded-3xl bg-slate-950 border border-slate-800 text-left space-y-4 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-orange-500 via-amber-500 to-emerald-500" />
                  
                  <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                    <span className="text-xs text-slate-400 font-bold uppercase">Body Fit Pass</span>
                    <span className="text-xs font-mono font-extrabold text-emerald-400">ACTIVE</span>
                  </div>

                  <div className="space-y-2.5 text-xs text-slate-300">
                    <div className="flex justify-between"><span className="text-slate-500">Member:</span><strong className="text-white text-sm">{confirmedBooking.name}</strong></div>
                    <div className="flex justify-between"><span className="text-slate-500">Service:</span><strong className="text-orange-400">{confirmedBooking.service}</strong></div>
                    <div className="flex justify-between"><span className="text-slate-500">Date & Time:</span><strong className="text-white">{confirmedBooking.date} ({confirmedBooking.time})</strong></div>
                    <div className="flex justify-between"><span className="text-slate-500">Trainer:</span><strong className="text-slate-200">{confirmedBooking.trainer}</strong></div>
                  </div>

                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
                    <span>LocalStorage Verified</span>
                    <span>Amrit Nagar, New Delhi</span>
                  </div>
                </div>

                {/* Notification Banner */}
                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs max-w-md mx-auto flex items-center gap-3">
                  <MessageSquare className="w-5 h-5 text-amber-400 shrink-0" />
                  <div className="text-left">
                    Booking saved locally! WhatsApp chat launched for <strong>+{WhatsAppConfig.targetPhone}</strong>. Click <strong>Send</strong> in WhatsApp to complete sending.
                  </div>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button
                    type="button"
                    onClick={() => sendWhatsAppBookingAlert(confirmedBooking)}
                    className="w-full sm:w-auto px-7 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-2xl flex items-center justify-center gap-2 shadow-lg transition-all"
                  >
                    <Send className="w-4 h-4" /> Open WhatsApp & Send Confirmation
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setStep(1);
                      setConfirmedBooking(null);
                    }}
                    className="w-full sm:w-auto px-6 py-4 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-2xl transition-all"
                  >
                    Book Another Session
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      </section>
    </Component>
  );
}
