"use client";

import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView, easeOut, easeInOut } from 'framer-motion';
import { 
  Wrench, 
  TrendingUp, 
  FileText, 
  Receipt, 
  Bell, 
  ShieldCheck,
  ChevronRight,
  ChevronLeft,
  Pause,
  Play
} from 'lucide-react';

const features = [
  {
    icon: Wrench,
    title: "Service Tracking",
    description: "Track every service your vehicle has ever had. Record service type, cost, and garage. Know your last and next service date at a glance."
  },
  {
    icon: TrendingUp,
    title: "Fuel & Mileage Analytics",
    description: "Log fuel entries easily, track expenses, and automatically calculate mileage. View fuel trends over time to optimize your driving habits."
  },
  {
    icon: FileText,
    title: "Smart Document Storage",
    description: "Upload RC, insurance, and service bills. Store securely in the cloud and access anytime, anywhere."
  },
  {
    icon: Receipt,
    title: "Invoice Generator",
    description: "Create professional digital invoices for services and repairs. Maintain perfect expense records—useful for resale or verification."
  },
  {
    icon: Bell,
    title: "Smart Notifications",
    description: "Get service due reminders, maintenance alerts, and important date notifications. Never miss a critical update again."
  },
  {
    icon: ShieldCheck,
    title: "Secure & Personalized",
    description: "Secure OTP-based login and role-based access keep your vehicle data fully private. Your information stays yours."
  }
];

export default function FeaturesSection() {
  const sectionRef = useRef(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const autoScrollInterval = useRef<NodeJS.Timeout | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Manual scroll handlers
  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const cardWidth = scrollContainerRef.current.querySelector('.feature-card')?.clientWidth || 380;
      const scrollAmount = cardWidth + 32; // card width + gap
      const newScrollLeft = scrollContainerRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
      
      // Pause auto-scroll temporarily when user interacts
      pauseAutoScroll();
      setTimeout(() => {
        if (isAutoScrolling) {
          startAutoScroll();
        }
      }, 3000);
    }
  };

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
      
      // Update active index based on scroll position
      const cardElements = scrollContainerRef.current.querySelectorAll('.feature-card');
      let closestIndex = 0;
      let minDistance = Infinity;
      cardElements.forEach((card, idx) => {
        const cardRect = card.getBoundingClientRect();
        const containerRect = scrollContainerRef.current?.getBoundingClientRect();
        if (containerRect) {
          const distance = Math.abs(cardRect.left - containerRect.left);
          if (distance < minDistance) {
            minDistance = distance;
            closestIndex = idx;
          }
        }
      });
      setActiveIndex(closestIndex);
    }
  };

  const startAutoScroll = () => {
    if (autoScrollInterval.current) {
      clearInterval(autoScrollInterval.current);
    }
    autoScrollInterval.current = setInterval(() => {
      if (scrollContainerRef.current && isAutoScrolling) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
        const cardWidth = scrollContainerRef.current.querySelector('.feature-card')?.clientWidth || 380;
        const scrollAmount = cardWidth + 32;
        
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          // Reached the end, scroll back to start smoothly
          scrollContainerRef.current.scrollTo({
            left: 0,
            behavior: 'smooth'
          });
        } else {
          // Scroll to next card
          scrollContainerRef.current.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
          });
        }
      }
    }, 4000); // Auto scroll every 4 seconds
  };

  const pauseAutoScroll = () => {
    if (autoScrollInterval.current) {
      clearInterval(autoScrollInterval.current);
      autoScrollInterval.current = null;
    }
  };

  const toggleAutoScroll = () => {
    if (isAutoScrolling) {
      pauseAutoScroll();
      setIsAutoScrolling(false);
    } else {
      setIsAutoScrolling(true);
      startAutoScroll();
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      checkScrollButtons();
      container.addEventListener('scroll', checkScrollButtons);
      window.addEventListener('resize', checkScrollButtons);
      
      // Start auto-scroll when section comes into view
      if (isInView) {
        startAutoScroll();
      }
      
      return () => {
        container.removeEventListener('scroll', checkScrollButtons);
        window.removeEventListener('resize', checkScrollButtons);
        if (autoScrollInterval.current) {
          clearInterval(autoScrollInterval.current);
        }
      };
    }
  }, [isInView]);

  // Stop auto-scroll when section is out of view
  useEffect(() => {
    if (!isInView && autoScrollInterval.current) {
      pauseAutoScroll();
    } else if (isInView && isAutoScrolling && !autoScrollInterval.current) {
      startAutoScroll();
    }
  }, [isInView, isAutoScrolling]);

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } }
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const floatingIconVariants = {
    initial: { y: 0, rotate: 0 },
    animate: {
      y: [0, -10, 0],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: "reverse" as const,
        ease: easeInOut
      }
    }
  };

  return (
    <motion.section 
      ref={sectionRef}
      className="relative py-24 sm:py-32 bg-linear-to-b from-slate-50 via-white to-slate-50 overflow-hidden"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {/* Subtle background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-150 h-150 bg-indigo-50/40 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-125 h-125 bg-cyan-50/30 rounded-full blur-3xl" />
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{ 
            backgroundImage: 'radial-gradient(circle at 1px 1px, #1e1b4b 1px, transparent 1px)',
            backgroundSize: '32px 32px'
          }}
        />
        
        {/* Floating decorative elements */}
        <motion.div 
          className="absolute top-32 right-20 w-24 h-24 bg-indigo-200/20 rounded-full blur-2xl"
          variants={floatingIconVariants}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.2 }}
        />
        <motion.div 
          className="absolute bottom-32 left-20 w-40 h-40 bg-cyan-200/20 rounded-full blur-2xl"
          variants={floatingIconVariants}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.7 }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-12"
          variants={staggerChildren}
        >
          <motion.h2 
            variants={fadeInUp}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 mb-6"
          >
            Everything You Need to Manage Your Vehicle
          </motion.h2>
          <motion.p 
            variants={fadeInUp}
            className="text-lg text-slate-600 leading-relaxed"
          >
            VehicleCare brings all your vehicle management tasks into one beautiful, intuitive platform. 
            Stay on top of maintenance, expenses, and documents—effortlessly.
          </motion.p>
        </motion.div>

        {/* Horizontal Scroll Cards Section */}
        <div className="relative">
          {/* Control Buttons */}
          <div className="absolute -top-12 right-0 flex gap-2 z-20">
            <motion.button
              onClick={toggleAutoScroll}
              className="bg-white/90 backdrop-blur-sm hover:bg-white rounded-full p-2 shadow-md border border-slate-200 transition-all duration-300 hover:scale-110"
              title={isAutoScrolling ? "Pause auto-scroll" : "Start auto-scroll"}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isAutoScrolling ? (
                <Pause className="w-4 h-4 text-indigo-600" />
              ) : (
                <Play className="w-4 h-4 text-indigo-600" />
              )}
            </motion.button>
          </div>

          {/* Scroll Buttons - Desktop Only */}
          <div className="hidden lg:block">
            {canScrollLeft && (
              <motion.button
                onClick={() => scroll('left')}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm hover:bg-white rounded-full p-3 shadow-lg border border-slate-200 transition-all duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronLeft className="w-6 h-6 text-indigo-600" />
              </motion.button>
            )}
            {canScrollRight && (
              <motion.button
                onClick={() => scroll('right')}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm hover:bg-white rounded-full p-3 shadow-lg border border-slate-200 transition-all duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronRight className="w-6 h-6 text-indigo-600" />
              </motion.button>
            )}
          </div>

          {/* Horizontal Scroll Container */}
          <div
            ref={scrollContainerRef}
            className="overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory lg:overflow-x-scroll lg:snap-none pb-8"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <div className="flex gap-6 lg:gap-8 px-4 lg:px-0">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={index}
                    className="feature-card shrink-0 w-full sm:w-[320px] md:w-90 lg:w-95"
                    initial={{ opacity: 0, x: 50, rotateY: 15 }}
                    animate={{ 
                      opacity: 1, 
                      x: 0, 
                      rotateY: 0,
                      transition: { delay: index * 0.1, duration: 0.5 }
                    }}
                    whileHover={{ 
                      scale: 1.05,
                      rotateY: 5,
                      transition: { duration: 0.2 }
                    }}
                  >
                    <motion.div
                      className={`relative bg-white rounded-2xl p-6 border transition-all duration-300 cursor-pointer h-full ${
                        activeIndex === index 
                          ? 'border-indigo-300 shadow-2xl ring-2 ring-indigo-200' 
                          : 'border-slate-200 shadow-lg hover:shadow-2xl'
                      }`}
                      style={{
                        transformStyle: 'preserve-3d',
                      }}
                      whileHover={{ y: -8 }}
                    >
                      {/* Active indicator glow */}
                      {activeIndex === index && (
                        <div className="absolute inset-0 rounded-2xl bg-linear-to-r from-indigo-500/10 to-cyan-500/10 pointer-events-none" />
                      )}
                      
                      {/* Icon with gradient background */}
                      <motion.div 
                        className={`mb-5 inline-flex p-3 rounded-xl transition-all duration-300 ${
                          activeIndex === index
                            ? 'bg-linear-to-br from-indigo-500 to-indigo-600 text-white shadow-lg'
                            : 'bg-linear-to-br from-indigo-50 to-cyan-50 text-indigo-600 group-hover:from-indigo-100 group-hover:to-cyan-100'
                        }`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <Icon className="w-6 h-6" strokeWidth={1.8} />
                      </motion.div>
                      
                      {/* Title */}
                      <h3 className="text-xl font-semibold text-slate-900 mb-3">
                        {feature.title}
                      </h3>
                      
                      {/* Description */}
                      <p className="text-slate-600 leading-relaxed">
                        {feature.description}
                      </p>
                      
                      {/* Decorative line */}
                      <motion.div 
                        className={`mt-4 h-0.5 bg-linear-to-r from-indigo-500 to-cyan-500 rounded-full transition-all duration-300 ${
                          activeIndex === index ? 'w-12' : 'w-0 group-hover:w-12'
                        }`}
                      />
                      
                      {/* Card number indicator */}
                      <div className={`absolute top-4 right-4 text-xs font-medium transition-colors ${
                        activeIndex === index ? 'text-indigo-500' : 'text-slate-300'
                      }`}>
                        {String(index + 1).padStart(2, '0')}
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Progress Indicators */}
          <motion.div 
            variants={fadeInUp}
            className="flex justify-center gap-2 mt-6"
          >
            {features.map((_, idx) => (
              <motion.button
                key={idx}
                onClick={() => {
                  if (scrollContainerRef.current) {
                    const cardWidth = scrollContainerRef.current.querySelector('.feature-card')?.clientWidth || 380;
                    const scrollAmount = (cardWidth + 32) * idx;
                    scrollContainerRef.current.scrollTo({
                      left: scrollAmount,
                      behavior: 'smooth'
                    });
                    pauseAutoScroll();
                    setTimeout(() => {
                      if (isAutoScrolling) startAutoScroll();
                    }, 3000);
                  }
                }}
                className={`transition-all duration-300 rounded-full ${
                  activeIndex === idx
                    ? 'w-6 h-2 bg-indigo-600'
                    : 'w-2 h-2 bg-slate-300 hover:bg-indigo-400'
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </motion.div>

          {/* Auto-scroll indicator */}
          {isAutoScrolling && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center mt-4"
            >
              <p className="text-xs text-slate-400 flex items-center justify-center gap-1">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                Auto-scrolling • Hover to pause
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </motion.section>
  );
}