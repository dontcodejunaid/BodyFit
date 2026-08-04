import React, { useState, useEffect } from 'react';
import RandomLetterSwapNav from './components/ui/m-random-letter-swap-1';
import OffersBanner from './components/OffersBanner';
import Hero from './components/Hero';
import About from './components/About';
import Trainers from './components/Trainers';
import ClassSchedule from './components/ClassSchedule';
import Facilities from './components/Facilities';
import MembershipPlans from './components/MembershipPlans';
import SocialProofFeed from './components/SocialProofFeed';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import BookingForm from './components/BookingForm';
import Footer from './components/Footer';
import AdminPortal from './components/admin/AdminPortal';
import FloatingActions from './components/ui/floating-actions';

// Modals
import PaymentModal from './components/PaymentModal';
import DigitalMemberCardModal from './components/DigitalMemberCardModal';
import AnalyticsDashboardModal from './components/AnalyticsDashboardModal';

import { trackEvent } from './utils/analytics';

function App() {
  const [_selectedTrainer, setSelectedTrainer] = useState(null);
  const [_selectedClass, setSelectedClass] = useState(null);
  
  // Checkout & Modals State
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  
  // Digital Pass State
  const [activeMemberPass, setActiveMemberPass] = useState(null);
  const [isPassModalOpen, setIsPassModalOpen] = useState(false);

  // Analytics Dashboard Modal
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(false);

  useEffect(() => {
    trackEvent('PAGE_VIEW');

    // Restore saved member pass if present in localStorage
    try {
      const savedPass = localStorage.getItem('bodyfit_member_pass');
      if (savedPass) {
        setActiveMemberPass(JSON.parse(savedPass));
      }
    } catch (e) {
      console.error('Failed to parse stored pass:', e);
    }
  }, []);

  const handleSelectTrainer = (trainer) => {
    setSelectedTrainer(trainer);
  };

  const handleSelectClass = (classItem) => {
    setSelectedClass(classItem);
  };

  // Trigger Checkout / Payment Modal when choosing a membership plan
  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
    setIsPaymentModalOpen(true);
  };

  // Promo Offer Banner Claim Handler
  const handleClaimOffer = (code, discountPercent) => {
    setAppliedDiscount(discountPercent);
    // Scroll smoothly to membership section
    const el = document.getElementById('membership');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Payment Success Callback
  const handlePaymentSuccess = (memberData) => {
    setActiveMemberPass(memberData);
    setIsPaymentModalOpen(false);
    setIsPassModalOpen(true);

    try {
      localStorage.setItem('bodyfit_member_pass', JSON.stringify(memberData));
    } catch (e) {
      console.error('Failed to save member pass:', e);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-orange-500 selection:text-white">
      {/* 6.4 Business Feature: Offers & Seasonal Discount Banner */}
      <OffersBanner onClaimOffer={handleClaimOffer} />

      <RandomLetterSwapNav />
      <Hero />
      <About />
      <Trainers onSelectTrainer={handleSelectTrainer} />
      <ClassSchedule onSelectClass={handleSelectClass} />
      <Facilities />
      <MembershipPlans onSelectPlan={handleSelectPlan} />
      
      {/* 6.4 Business Feature: Google Reviews & Instagram Live Feed */}
      <SocialProofFeed />

      <Gallery />
      <Testimonials />
      <BookingForm selectedPlan={selectedPlan} onClearPlan={() => setSelectedPlan(null)} />
      <Footer />

      {/* Integrated Floating Action Stack: My Pass, Ask Us Chatbot & WhatsApp */}
      <FloatingActions
        activeMemberPass={activeMemberPass}
        onOpenPass={() => setIsPassModalOpen(true)}
      />

      <AdminPortal />

      {/* Modals */}
      {/* 6.4 Feature 1: Modular Razorpay/UPI Ready Payment Modal (5% GST) */}
      <PaymentModal
        plan={selectedPlan}
        discountPercent={appliedDiscount}
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        onPaymentSuccess={handlePaymentSuccess}
      />

      {/* 6.4 Feature 2: Digital Entry Pass & QR Check-In Modal */}
      <DigitalMemberCardModal
        memberData={activeMemberPass}
        isOpen={isPassModalOpen}
        onClose={() => setIsPassModalOpen(false)}
      />

      {/* 6.4 Feature 5: Conversion Analytics Dashboard Modal */}
      <AnalyticsDashboardModal
        isOpen={isAnalyticsOpen}
        onClose={() => setIsAnalyticsOpen(false)}
      />
    </div>
  );
}

export default App;
