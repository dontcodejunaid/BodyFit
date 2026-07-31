import React, { useState } from 'react';
import { Calendar, Clock, User, Phone, Mail, Dumbbell, CheckCircle2, AlertCircle, Send, ArrowRight, ArrowLeft, ShieldCheck } from 'lucide-react';
import { saveBooking, isSlotTaken } from '../utils/localStorage';
import { sendWhatsAppBookingAlert } from '../utils/whatsapp';

export default function BookingForm() {
  const [step, setStep] = useState(1);

  // Form State
  const [formData, setFormData] = useState({
    service: 'Gym Session',
    date: new Date().toISOString().split('T')[0],
    time: '07:00 AM',
    trainer: 'No Preference',
    name: '',
    phone: '',
    email: '',
  });

  const [confirmedBooking, setConfirmedBooking] = useState(null);
  const [errors, setErrors] = useState({});

  // Available Gym Services
  const services = [
    { id: 'Gym Session', title: 'General Gym Session', desc: 'Access to cardio, weight & functional zones', icon: Dumbbell },
    { id: 'Personal Training', title: 'Personal Training Trial', desc: '1-on-1 session with certified fitness coach', icon: User },
    { id: 'Group Class', title: 'Special Group Class', desc: 'Zumba, Yoga, CrossFit or High-Intensity HIIT', icon: Calendar },
    { id: 'Membership Enquiry', title: 'Facility Tour & Consult', desc: 'Walk-through tour & personalized plan consult', icon: ShieldCheck },
  ];

  // Time slots aligned with opening hours (6 AM - 1 PM & 5 PM - 10 PM)
  const timeSlots = [
    '06:00 AM', '07:00 AM', '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '05:00 PM', '06:00 PM', '07:00 PM', '08:00 PM', '09:00 PM'
  ];

  const trainers = [
    'No Preference (Assign Any Available)',
    'Rahul Sharma (Bodybuilding & Strength)',
    'Priya Singh (Weight Loss & Yoga)',
    'Vikram Malhotra (CrossFit & HIIT Coach)',
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

    // Check slot availability
    if (isSlotTaken(formData.date, formData.time)) {
      setErrors({ slot: 'This time slot is already booked. Please choose another date or time.' });
      setStep(2);
      return;
    }

    // Save to LocalStorage
    const newBooking = saveBooking(formData);
    setConfirmedBooking(newBooking);
    setStep(5);

    // Auto-trigger WhatsApp notification to testing number +91 9945505665
    sendWhatsAppBookingAlert(newBooking);
  };

  return (
    <section id="book-appointment" className="py-20 bg-slate-950 border-t border-slate-800 text-slate-100 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-4 mb-12">
          <span className="text-orange-500 font-semibold uppercase tracking-wider text-sm flex items-center justify-center gap-2">
            <Calendar className="w-4 h-4 text-orange-500 inline" />
            Book Your Session
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Reserve Your <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">Free Trial / Slot</span>
          </h2>
          <p className="text-slate-400 text-base max-w-xl mx-auto">
            Takes under 1 minute. Select your service, pick a time slot, and get instant booking confirmation on WhatsApp!
          </p>
        </div>

        {/* Multi-Step Indicator */}
        {step < 5 && (
          <div className="flex items-center justify-between mb-10 max-w-2xl mx-auto relative px-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex flex-col items-center relative z-10">
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                    step >= i 
                      ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30' 
                      : 'bg-slate-900 border border-slate-800 text-slate-500'
                  }`}
                >
                  {i}
                </div>
                <span className="text-[11px] font-medium text-slate-400 mt-2 hidden sm:block">
                  {i === 1 ? 'Service' : i === 2 ? 'Date & Time' : i === 3 ? 'Trainer' : 'Your Info'}
                </span>
              </div>
            ))}
            {/* Progress Bar Line */}
            <div className="absolute top-5 left-6 right-6 h-0.5 bg-slate-800 -z-0">
              <div 
                className="h-full bg-orange-500 transition-all duration-300" 
                style={{ width: `${((step - 1) / 3) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Card Container */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl">
          
          {/* STEP 1: Select Service */}
          {step === 1 && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Dumbbell className="w-5 h-5 text-orange-500" />
                Step 1: Choose Your Service
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {services.map((item) => {
                  const Icon = item.icon;
                  const isSelected = formData.service === item.id;
                  return (
                    <div
                      key={item.id}
                      onClick={() => handleInputChange('service', item.id)}
                      className={`p-5 rounded-2xl border cursor-pointer transition-all duration-200 flex flex-col justify-between space-y-3 ${
                        isSelected 
                          ? 'border-orange-500 bg-orange-500/10 shadow-lg shadow-orange-500/10' 
                          : 'border-slate-800 bg-slate-950/50 hover:border-slate-700 hover:bg-slate-950'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className={`p-2.5 rounded-xl ${isSelected ? 'bg-orange-500 text-white' : 'bg-slate-800 text-slate-400'}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        {isSelected && <CheckCircle2 className="w-5 h-5 text-orange-500" />}
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-base">{item.title}</h4>
                        <p className="text-xs text-slate-400 mt-1">{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-6 py-3 bg-orange-600 hover:bg-orange-500 text-white font-bold rounded-xl flex items-center gap-2 shadow-lg shadow-orange-600/30 transition-all"
                >
                  Next Step <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Choose Date & Time Slot */}
          {step === 2 && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Clock className="w-5 h-5 text-orange-500" />
                Step 2: Pick Date & Time Slot
              </h3>

              {errors.slot && (
                <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {errors.slot}
                </div>
              )}

              {/* Date Input */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Select Date</label>
                <input 
                  type="date"
                  min={new Date().toISOString().split('T')[0]}
                  value={formData.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors"
                />
              </div>

              {/* Time Slots */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Available Slots (Opening Hours: 6AM - 1PM & 5PM - 10PM)
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5 pt-2">
                  {timeSlots.map((slot) => {
                    const isTaken = isSlotTaken(formData.date, slot);
                    const isSelected = formData.time === slot;
                    return (
                      <button
                        key={slot}
                        type="button"
                        disabled={isTaken}
                        onClick={() => handleInputChange('time', slot)}
                        className={`py-2.5 px-3 text-xs font-semibold rounded-xl border transition-all ${
                          isTaken
                            ? 'bg-slate-950/40 border-slate-900 text-slate-600 cursor-not-allowed line-through'
                            : isSelected
                            ? 'bg-orange-500 border-orange-500 text-white shadow-md shadow-orange-500/20'
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
                  className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold rounded-xl flex items-center gap-2 transition-all text-sm"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-6 py-3 bg-orange-600 hover:bg-orange-500 text-white font-bold rounded-xl flex items-center gap-2 shadow-lg shadow-orange-600/30 transition-all"
                >
                  Next Step <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Choose Trainer */}
          {step === 3 && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <User className="w-5 h-5 text-orange-500" />
                Step 3: Select Trainer (Optional)
              </h3>

              <div className="space-y-3">
                {trainers.map((t) => (
                  <div
                    key={t}
                    onClick={() => handleInputChange('trainer', t)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                      formData.trainer === t
                        ? 'border-orange-500 bg-orange-500/10 text-white'
                        : 'border-slate-800 bg-slate-950/50 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <span className="text-sm font-semibold">{t}</span>
                    {formData.trainer === t && <CheckCircle2 className="w-5 h-5 text-orange-500" />}
                  </div>
                ))}
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold rounded-xl flex items-center gap-2 transition-all text-sm"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(4)}
                  className="px-6 py-3 bg-orange-600 hover:bg-orange-500 text-white font-bold rounded-xl flex items-center gap-2 shadow-lg shadow-orange-600/30 transition-all"
                >
                  Next Step <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Member Contact Info */}
          {step === 4 && (
            <form onSubmit={handleFormSubmit} className="space-y-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Phone className="w-5 h-5 text-orange-500" />
                Step 4: Enter Your Contact Details
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1 block">Full Name *</label>
                  <input
                    type="text"
                    placeholder="e.g. Rahul Verma"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className={`w-full bg-slate-950 border rounded-xl px-4 py-3 text-white focus:outline-none transition-colors ${
                      errors.name ? 'border-red-500' : 'border-slate-800 focus:border-orange-500'
                    }`}
                  />
                  {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1 block">Phone / WhatsApp Number *</label>
                  <input
                    type="tel"
                    placeholder="e.g. 9876543210"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className={`w-full bg-slate-950 border rounded-xl px-4 py-3 text-white focus:outline-none transition-colors ${
                      errors.phone ? 'border-red-500' : 'border-slate-800 focus:border-orange-500'
                    }`}
                  />
                  {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1 block">Email Address (Optional)</label>
                  <input
                    type="email"
                    placeholder="e.g. rahul@example.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors"
                  />
                </div>
              </div>

              {/* Booking Summary Box */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs text-slate-300">
                <div className="font-semibold text-white uppercase tracking-wider mb-1">Booking Overview:</div>
                <div className="flex justify-between"><span>Service:</span><span className="font-bold text-orange-400">{formData.service}</span></div>
                <div className="flex justify-between"><span>Date & Time:</span><span className="font-bold text-white">{formData.date} at {formData.time}</span></div>
                <div className="flex justify-between"><span>Trainer:</span><span className="font-bold text-white">{formData.trainer}</span></div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold rounded-xl flex items-center gap-2 transition-all text-sm"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <button
                  type="submit"
                  className="px-7 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl flex items-center gap-2 shadow-lg shadow-emerald-600/30 transition-all"
                >
                  <Send className="w-4 h-4" /> Confirm & Send Alert
                </button>
              </div>
            </form>
          )}

          {/* STEP 5: Booking Confirmation Screen */}
          {step === 5 && confirmedBooking && (
            <div className="text-center space-y-6 py-4">
              <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/30 animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">Booking Submitted Successfully!</h3>
                <p className="text-slate-400 text-sm">
                  Your booking reference ID is <span className="font-bold text-orange-400">#{confirmedBooking.id}</span>
                </p>
              </div>

              <div className="max-w-md mx-auto p-5 rounded-2xl bg-slate-950 border border-slate-800 text-left space-y-3 text-sm">
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-400">Name:</span>
                  <span className="font-semibold text-white">{confirmedBooking.name}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-400">Service:</span>
                  <span className="font-semibold text-orange-400">{confirmedBooking.service}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-400">Date & Time:</span>
                  <span className="font-semibold text-white">{confirmedBooking.date} ({confirmedBooking.time})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Status:</span>
                  <span className="font-semibold text-emerald-400">Saved to LocalStorage</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs max-w-md mx-auto">
                📱 Auto-notification has been triggered to testing WhatsApp number <strong>(+91 9945505665)</strong>.
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={() => sendWhatsAppBookingAlert(confirmedBooking)}
                  className="w-full sm:w-auto px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all"
                >
                  <Send className="w-4 h-4" /> Re-open WhatsApp Confirmation
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setStep(1);
                    setConfirmedBooking(null);
                  }}
                  className="w-full sm:w-auto px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold rounded-xl transition-all"
                >
                  Book Another Session
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
