import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, X, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

const galleryItems = [
  {
    id: 1,
    title: 'Main Workout Floor',
    category: 'Training',
    desc: 'State-of-the-art free weights, squat racks & plate-loaded machines',
    url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 2,
    title: 'Strength & Power Zone',
    category: 'Training',
    desc: 'Olympic barbells, custom bumper plates & power platforms',
    url: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 3,
    title: 'Cardio Deck',
    category: 'Cardio',
    desc: 'High-tech treadmills & ellipticals equipped with HD screens',
    url: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 4,
    title: 'Group Fitness Studio',
    category: 'Studio',
    desc: 'Dynamic group classes including HIIT, Spin, and Zumba',
    url: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 5,
    title: 'Functional Turf Area',
    category: 'Training',
    desc: 'Sled pushes, battle ropes, kettlebells & agility conditioning',
    url: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 6,
    title: 'Boxing & Combat Arena',
    category: 'Studio',
    desc: 'Heavy bags, speed bags & dedicated conditioning ring',
    url: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 7,
    title: 'Luxury Locker Room',
    category: 'Amenities',
    desc: 'Private showers, infrared sauna & digital keyless lockers',
    url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 8,
    title: 'Recovery & Stretch Zone',
    category: 'Amenities',
    desc: 'Mobility tools, Theraguns, foam rollers & guided stretch area',
    url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1200&q=80',
  },
];

const categories = ['All', 'Training', 'Cardio', 'Studio', 'Amenities'];
const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80';

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const filteredItems =
    activeCategory === 'All'
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const showPrev = (e) => {
    e?.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev === 0 ? filteredItems.length - 1 : prev - 1));
  };

  const showNext = (e) => {
    e?.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev === filteredItems.length - 1 ? 0 : prev + 1));
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, filteredItems]);

  const activeItem = lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  return (
    <section
      id="gallery"
      className="scroll-mt-20 relative py-20 bg-slate-950 text-slate-100 border-t border-slate-800/60 overflow-hidden"
    >
      {/* Background glow accents */}
      <div className="pointer-events-none absolute -top-40 right-1/4 h-96 w-96 rounded-full bg-orange-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 left-1/4 h-96 w-96 rounded-full bg-orange-600/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-orange-400 backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5" />
            Inside Body Fit
          </div>
          <h2 className="font-teko mt-3 text-4xl sm:text-5xl lg:text-6xl uppercase tracking-wide text-white">
            Our <span className="text-orange-500">Facility</span> Gallery
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm sm:text-base text-slate-400">
            Explore our world-class gym floor, cutting-edge equipment, high-energy studios, and luxury recovery zones.
          </p>

          {/* Category Filter Tabs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setLightboxIndex(null);
                }}
                className={`rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-orange-500 text-slate-950 shadow-lg shadow-orange-500/25 scale-105'
                    : 'bg-slate-900/80 text-slate-400 border border-slate-800 hover:border-slate-700 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <motion.div layout className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, idx) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                onClick={() => openLightbox(idx)}
                className="group relative cursor-pointer overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/40 shadow-xl transition-all duration-300 hover:border-orange-500/50 hover:shadow-orange-500/10"
              >
                {/* Aspect ratio box */}
                <div className="aspect-[4/3] w-full overflow-hidden bg-slate-900">
                  <img
                    src={item.url}
                    alt={item.title}
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src = FALLBACK_IMAGE;
                    }}
                    className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                  />
                </div>

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-75 transition-opacity duration-300 group-hover:opacity-90" />

                {/* Top Badge */}
                <div className="absolute top-3 left-3">
                  <span className="rounded-md bg-slate-950/80 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-orange-400 border border-orange-500/30 backdrop-blur-md">
                    {item.category}
                  </span>
                </div>

                {/* Hover Zoom Icon */}
                <div className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-slate-950/80 text-white opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:scale-105 border border-slate-700">
                  <Maximize2 className="h-4 w-4 text-orange-400" />
                </div>

                {/* Caption Content */}
                <div className="absolute bottom-0 inset-x-0 p-4 transition-transform duration-300 transform group-hover:-translate-y-1">
                  <h3 className="font-teko text-2xl uppercase tracking-wide text-white leading-none">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 p-4 backdrop-blur-md"
          >
            {/* Modal Container */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[90vh] max-w-5xl w-full overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl"
            >
              {/* Image Preview */}
              <div className="relative max-h-[70vh] w-full overflow-hidden bg-black flex items-center justify-center">
                <img
                  src={activeItem.url}
                  alt={activeItem.title}
                  onError={(e) => {
                    e.currentTarget.src = FALLBACK_IMAGE;
                  }}
                  className="max-h-[70vh] w-full object-contain"
                />

                {/* Close Button */}
                <button
                  onClick={closeLightbox}
                  className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-slate-950/80 text-slate-300 hover:text-white hover:bg-orange-500 transition-colors border border-slate-700"
                  aria-label="Close image"
                >
                  <X className="h-5 w-5" />
                </button>

                {/* Prev / Next Controls */}
                {filteredItems.length > 1 && (
                  <>
                    <button
                      onClick={showPrev}
                      className="absolute left-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-slate-950/80 text-white hover:bg-orange-500 transition-colors border border-slate-700 shadow-lg"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </button>
                    <button
                      onClick={showNext}
                      className="absolute right-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-slate-950/80 text-white hover:bg-orange-500 transition-colors border border-slate-700 shadow-lg"
                      aria-label="Next image"
                    >
                      <ChevronRight className="h-6 w-6" />
                    </button>
                  </>
                )}
              </div>

              {/* Modal Footer Description */}
              <div className="p-6 bg-slate-900 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <span className="inline-block rounded-md bg-orange-500/10 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider text-orange-400 border border-orange-500/20">
                    {activeItem.category}
                  </span>
                  <h3 className="font-teko mt-1 text-3xl uppercase tracking-wide text-white">
                    {activeItem.title}
                  </h3>
                  <p className="text-sm text-slate-400">{activeItem.desc}</p>
                </div>
                <div className="text-xs text-slate-500 font-mono">
                  {lightboxIndex + 1} / {filteredItems.length}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

