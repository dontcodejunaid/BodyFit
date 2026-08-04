// src/components/Testimonials/testimonialsData.js

export const stats = [
  {
    id: 1,
    value: "15K+",
    label: "Happy Members",
    icon: "users",
  },
  {
    id: 2,
    value: "500+",
    label: "Success Stories",
    icon: "trophy",
  },
  {
    id: 3,
    value: "1M+",
    label: "Workouts Completed",
    icon: "fire",
  },
  {
    id: 4,
    value: "4.9/5",
    label: "Average Rating",
    icon: "star",
  },
];

export const testimonials = [
  {
    id: 1,
    name: "Arjun Patel",
    role: "Entrepreneur",
    review:
      "Joining this gym completely transformed my lifestyle. My energy, strength, and confidence have never been better. The coaching staff genuinely cares about every member's progress, not just the numbers on a scale.",
    result: "Lost 18 KG",
    duration: "6 Months",
    rating: 5,
    initials: "AP",
    accent: "from-orange-400 via-orange-500 to-orange-600",
    featured: true,
  },
  {
    id: 2,
    name: "Rahul Sharma",
    role: "Software Engineer",
    review:
      "The trainers pushed me beyond my limits while keeping every workout enjoyable. I've never felt stronger and more confident.",
    result: "Lost 12 KG",
    duration: "3 Months",
    rating: 5,
    initials: "RS",
    accent: "from-orange-500 to-red-500",
  },
  {
    id: 3,
    name: "Priya Verma",
    role: "Marketing Executive",
    review:
      "Amazing atmosphere, supportive coaches, and excellent equipment. Every workout motivates me to keep improving.",
    result: "Gained Lean Muscle",
    duration: "5 Months",
    rating: 5,
    initials: "PV",
    accent: "from-amber-500 to-orange-500",
  },
  {
    id: 4,
    name: "Sneha Reddy",
    role: "Doctor",
    review:
      "The personalized workout plans and friendly environment made fitness a habit. I actually look forward to every session.",
    result: "Body Fat -10%",
    duration: "4 Months",
    rating: 5,
    initials: "SR",
    accent: "from-orange-500 to-amber-400",
  },
];

export const featuredTestimonial = testimonials.find((t) => t.featured);
export const supportingTestimonials = testimonials.filter((t) => !t.featured);
