import React, { useState, useEffect } from "react";
import RandomLetterSwapNav from "./components/ui/m-random-letter-swap-1";
import OffersBanner from "./components/OffersBanner";
import Hero from "./components/Hero";
import About from "./components/About";
import Trainers from "./components/Trainers";
import ClassSchedule from "./components/ClassSchedule";
import Facilities from "./components/Facilities";
import MembershipPlans from "./components/MembershipPlans";
import SocialProofFeed from "./components/SocialProofFeed";
import Gallery from "./components/Gallery";
import Testimonials from "./components/TestimonialsSection";
import BookingForm from "./components/BookingForm";
import Footer from "./components/Footer";
import AdminPortal from "./components/admin/AdminPortal";
import FloatingActions from "./components/ui/floating-actions";

// Modals
import PaymentModal from "./components/PaymentModal";
import DigitalMemberCardModal from "./components/DigitalMemberCardModal";
import AnalyticsDashboardModal from "./components/AnalyticsDashboardModal";

import { trackEvent } from "./utils/analytics";

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
    trackEvent("PAGE_VIEW");

    try {
      const savedPass = localStorage.getItem("bodyfit_member_pass");
      if (savedPass) {
        setActiveMemberPass(JSON.parse(savedPass));
      }
    } catch (e) {
      console.error("Failed to parse stored pass:", e);
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

  const handleClaimOffer = (_code, discountPercent) => {
    setAppliedDiscount(discountPercent);

    const el = document.getElementById("membership");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handlePaymentSuccess = (memberData) => {
    setActiveMemberPass(memberData);
    setIsPaymentModalOpen(false);
    setIsPassModalOpen(true);

    try {
      localStorage.setItem(
        "bodyfit_member_pass",
        JSON.stringify(memberData)
      );
    } catch (e) {
      console.error("Failed to save member pass:", e);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-orange-500 selection:text-white">
      <OffersBanner onClaimOffer={handleClaimOffer} />

      <RandomLetterSwapNav />

      <Hero />

      <About />

      <Trainers onSelectTrainer={handleSelectTrainer} />

      <ClassSchedule onSelectClass={handleSelectClass} />

      <Facilities />

      <MembershipPlans onSelectPlan={handleSelectPlan} />

      <SocialProofFeed />

      <Gallery />

      <Testimonials />

      <BookingForm
        selectedPlan={selectedPlan}
        onClearPlan={() => setSelectedPlan(null)}
      />

      <Footer />

      <FloatingActions
        activeMemberPass={activeMemberPass}
        onOpenPass={() => setIsPassModalOpen(true)}
      />

      <AdminPortal />

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