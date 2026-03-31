"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, easeInOut } from 'framer-motion';
import { ArrowRight, Star } from 'lucide-react';

export default function CtaSection() {
  const containerRef = useRef<HTMLElement>(null);

  // Track scroll progress of THIS section, not the entire page
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"]
  });

  // Smoothly fade and scale as the component enters the viewport
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { 
      opacity: 0,
      y: 20,
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: easeInOut,
      },
    },
  };

  return (
    <motion.section 
      ref={containerRef}
      style={{ opacity, scale }}
      className="relative py-24 sm:py-32 bg-white border-t border-slate-100 overflow-hidden"
    >
      {/* Subtle background glow */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-50/60 via-white to-white" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {/* Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-600 text-sm mb-8 font-medium border border-indigo-100"
          >
            <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
            Get Started
          </motion.div>

          {/* Main heading */}
          <motion.h2 
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 mb-6"
          >
            Start Managing Your Vehicle
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
              the Smart Way
            </span>
          </motion.h2>

          {/* Description */}
          <motion.p 
            variants={itemVariants}
            className="text-lg sm:text-xl text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Take control of your vehicle&apos;s service, expenses, and history — all in one place. Perfect for keeping you and local garages seamlessly connected.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 text-white font-medium rounded-xl hover:bg-slate-800 transition-all duration-300 shadow-lg shadow-slate-900/20 group w-full sm:w-auto justify-center"
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </motion.button>

            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 bg-white text-slate-700 font-medium rounded-xl border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all duration-300 w-full sm:w-auto"
            >
              Watch Demo
            </motion.button>
          </motion.div>

          {/* Trust indicators */}
          <motion.div 
            variants={itemVariants}
            className="mt-16 pt-8 border-t border-slate-100"
          >
            <p className="text-sm text-slate-400 mb-5 font-medium uppercase tracking-wider">
              Trusted by over 50,000+ vehicle owners
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-4 sm:gap-8 text-sm">
              <div className="flex items-center gap-2">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="font-bold text-slate-700">4.9</span>
                <span className="text-slate-400">(10K+ reviews)</span>
              </div>
              <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-slate-200" />
              <div className="flex items-center text-slate-500 font-medium">
                30-day free trial
              </div>
              <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-slate-200" />
              <div className="flex items-center text-slate-500 font-medium">
                No credit card required
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}