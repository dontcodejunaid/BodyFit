import React, { useState, useEffect } from 'react';
import RandomLetterSwapNav from './components/ui/m-random-letter-swap-1';
import OffersBanner from './components/OffersBanner';
import Hero from './components/Hero';
import About from './components/About';
import BMICalculator from './components/BMICalculator';
import Trainers from './components/Trainers';
import ClassSchedule from './components/ClassSchedule';
import Facilities from './components/Facilities';
import ReferralProgram from './components/ReferralProgram';
import MembershipPlans from './components/MembershipPlans';
import SocialProofFeed from './components/SocialProofFeed';
import Gallery from './components/Gallery';
import Testimonials from './components/TestimonialsSection';
import ProgressTracker from './components/ProgressTracker';
import BookingForm from './components/BookingForm';
import Footer from './components/Footer';
import AdminPortal from './components/admin/AdminPortal';
import FloatingActions from './components/ui/floating-actions';
import SplashIntroScreen from './components/SplashIntroScreen';

// Modals
import PaymentModal from './components/PaymentModal';
import DigitalMemberCardModal from './components/DigitalMemberCardModal';
import AnalyticsDashboardModal from './components/AnalyticsDashboardModal';

import { trackEvent } from './utils/analytics';

function App() {
  const [_selectedTrainer, setSelectedTrainer] = useState(null);
  const [_selectedClass, setSelectedClass] = useState(null);

  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [appliedDiscount, setAppliedDiscount] = useState(0);

  const [activeMemberPass, setActiveMemberPass] = useState(null);
  const [isPassModalOpen, setIsPassModalOpen] = useState(false);

  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(false);

  useEffect(() => {
    trackEvent('PAGE_VIEW');

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

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
    setIsPaymentModalOpen(true);
  };

  const handleClaimOffer = (code, discountPercent) => {
    setAppliedDiscount(discountPercent);
    const el = document.getElementById('membership');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

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
      {/* Splash Opening Landing Screen on Reload */}
      <SplashIntroScreen />

      {/* Offers & Seasonal Discount Banner */}
      <OffersBanner onClaimOffer={handleClaimOffer} />

      <RandomLetterSwapNav />
      <Hero />
      <About />
      <BMICalculator />
      <Trainers onSelectTrainer={handleSelectTrainer} />
      <ClassSchedule onSelectClass={handleSelectClass} />
      <Facilities />
      <ReferralProgram />
      <MembershipPlans onSelectPlan={handleSelectPlan} />
      
      {/* Google Reviews & Instagram Live Feed */}
      <SocialProofFeed />

      <Gallery />
      <Testimonials />
      <ProgressTracker />
      <BookingForm selectedPlan={selectedPlan} onClearPlan={() => setSelectedPlan(null)} />
      <Footer />

      {/* Integrated Floating Action Stack */}
      <FloatingActions
        activeMemberPass={activeMemberPass}
        onOpenPass={() => setIsPassModalOpen(true)}
      />

      <AdminPortal />

      {/* Modals */}
      <PaymentModal
        plan={selectedPlan}
        discountPercent={appliedDiscount}
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        onPaymentSuccess={handlePaymentSuccess}
      />

      <DigitalMemberCardModal
        memberData={activeMemberPass}
        isOpen={isPassModalOpen}
        onClose={() => setIsPassModalOpen(false)}
      />

      <AnalyticsDashboardModal
        isOpen={isAnalyticsOpen}
        onClose={() => setIsAnalyticsOpen(false)}
      />
    </div>
  );
}

export default App;