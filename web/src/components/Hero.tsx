"use client";

import React, { useState, useRef } from 'react';
import { motion, useInView, easeOut } from 'framer-motion';
import { 
  ChevronRight, 
  BarChart3, 
  CalendarDays, 
  Activity, 
  Car, 
  Fuel, 
  BellRing, 
  ShieldCheck,
  Zap,
  MessageCircle
} from 'lucide-react';

export default function Hero() {
  const [email, setEmail] = useState('');
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Email submitted:', email);
  };

  const handleWhatsAppJoin = () => {
    window.open('https://chat.whatsapp.com/your-community-link', '_blank');
  };

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } }
  };

  const fadeInLeft = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: easeOut } }
  };

  const fadeInRight = {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: easeOut } }
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

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.5, ease: easeOut }
    },
    hover: { 
      y: -8,
      scale: 1.02,
      transition: { duration: 0.2 }
    }
  };

  return (
    <motion.section 
      ref={sectionRef}
      className="bg-gradient-to-b from-slate-50 via-white to-slate-100 text-slate-900 py-16 sm:py-24 font-sans selection:bg-indigo-100 selection:text-indigo-900 overflow-hidden relative"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-50/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-sky-50/20 rounded-full blur-3xl" />
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{ 
            backgroundImage: 'radial-gradient(circle at 1px 1px, #1e1b4b 1px, transparent 1px)',
            backgroundSize: '32px 32px'
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* LEFT COLUMN: Content & Input */}
          <motion.div 
            className="max-w-2xl"
            variants={staggerChildren}
          >
            {/* "New" Badge */}
            <motion.a 
              href="#" 
              variants={fadeInUp}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-sm font-medium mb-8 hover:bg-indigo-100 transition-all duration-200 w-fit group"
            >
              <span className="bg-indigo-600 text-white px-2 py-0.5 rounded-full text-xs font-bold shadow-sm">New</span>
              VehicleCare beta is coming soon! See what&apos;s new
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </motion.a>

            {/* Headline */}
            <motion.h1 
              variants={fadeInUp}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-slate-900 mb-6 leading-[1.1]"
            >
              Never forget your vehicle service
              <br className="hidden lg:block" />
              again.
            </motion.h1>

            {/* Subtext */}
            <motion.p 
              variants={fadeInUp}
              className="text-lg text-slate-600 mb-8 leading-relaxed max-w-xl"
            >
              Here at VehicleCare we focus on making vehicle management effortless. Track service history, monitor fuel usage, and get automated maintenance reminders to extend your vehicle&apos;s lifespan.
            </motion.p>

            {/* Inline Input CTA */}
            <motion.form 
              variants={fadeInUp}
              onSubmit={handleSubmit} 
              className="relative max-w-md mb-4"
            >
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                <Car className="w-5 h-5 text-slate-400" />
              </div>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full p-4 pl-12 text-sm text-slate-900 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-slate-400 shadow-sm hover:shadow transition-all duration-200" 
                placeholder="Enter your email to get started..." 
                required 
              />
              <button 
                type="submit" 
                className="text-white absolute right-2 bottom-2 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-xl text-sm px-6 py-2.5 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Get Started
              </button>
            </motion.form>

            {/* WhatsApp Community Button */}
            <motion.button
              variants={fadeInUp}
              onClick={handleWhatsAppJoin}
              className="group relative w-full max-w-md bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-md hover:shadow-xl flex items-center justify-center gap-3 mb-6"
            >
              <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              <span>Join Our Community</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </motion.button>

            {/* Trust indicator */}
            <motion.div 
              variants={fadeInUp}
              className="flex items-center gap-4 text-sm text-slate-500"
            >
              <div className="flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>Secure & encrypted</span>
              </div>
              <div className="flex items-center gap-1">
                <Zap className="w-4 h-4 text-amber-500" />
                <span>Free trial</span>
              </div>
              <div className="flex items-center gap-1">
                <MessageCircle className="w-4 h-4 text-green-500" />
                <span>Active community</span>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT COLUMN: Dashboard Widgets Grid */}
          <motion.div 
            className="relative w-full"
            variants={fadeInRight}
          >
            <motion.div 
              className="grid grid-cols-2 gap-4"
              variants={staggerChildren}
            >
              
              {/* Widget 1: Bar Chart (Expenses) */}
              <motion.div 
                variants={cardVariants}
                whileHover="hover"
                className="bg-white border border-slate-200 rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900">$452.85</h3>
                    <p className="text-xs text-slate-500">Total expenses this month</p>
                  </div>
                  <span className="bg-emerald-100 text-emerald-700 text-xs font-medium px-2 py-1 rounded-full">+4.3%</span>
                </div>
                <div className="flex items-end gap-1 h-28 mt-4">
                  {[40, 70, 45, 90, 60, 30, 80].map((height, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1 group">
                      <div className="w-full bg-indigo-100 rounded-t-md relative overflow-hidden h-full">
                        <motion.div 
                          className="absolute bottom-0 w-full bg-gradient-to-t from-indigo-500 to-indigo-400 rounded-t-md"
                          initial={{ height: 0 }}
                          animate={{ height: `${height}%` }}
                          transition={{ duration: 1, delay: 0.3 + i * 0.05 }}
                        />
                      </div>
                      <span className="text-[10px] text-slate-400">
                        {['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Widget 2: Calendar with upcoming service */}
              <motion.div 
                variants={cardVariants}
                whileHover="hover"
                className="bg-white border border-slate-200 rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-slate-900">Service Dates</h3>
                  <CalendarDays className="w-4 h-4 text-slate-400" />
                </div>
                <div className="grid grid-cols-7 gap-1 mt-2 text-center text-xs">
                  {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, index) => (
                    <span key={index} className="text-slate-400 text-[11px] font-medium">{day}</span>
                  ))}
                  {[...Array(31)].map((_, i) => {
                    const day = i + 1;
                    const isToday = day === 15;
                    const hasEvent = day === 12 || day === 24;
                    return (
                      <motion.div 
                        key={i} 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: i * 0.005 }}
                        className={`py-1.5 rounded-full text-xs transition-all cursor-default relative
                          ${isToday ? 'bg-indigo-600 text-white font-semibold shadow-sm' : 
                            hasEvent ? 'bg-indigo-50 text-indigo-700 font-medium' : 
                            'text-slate-700 hover:bg-slate-100'
                          }`}
                      >
                        {day}
                        {hasEvent && !isToday && (
                          <div className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-indigo-400" />
                        )}
                      </motion.div>
                    );
                  })}
                </div>
                <button className="w-full mt-4 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-semibold py-2 rounded-xl transition-colors">
                  Schedule Maintenance
                </button>
              </motion.div>

              {/* Widget 3: Fuel Efficiency with Line Graph */}
              <motion.div 
                variants={cardVariants}
                whileHover="hover"
                className="bg-white border border-slate-200 rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 col-span-2 sm:col-span-1"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-slate-900">Fuel Efficiency (MPG)</h3>
                  <Activity className="w-4 h-4 text-slate-400" />
                </div>
                <div className="h-24 w-full relative">
                  <svg viewBox="0 0 100 30" preserveAspectRatio="none" className="w-full h-full">
                    <motion.path 
                      d="M0,25 C20,25 20,5 40,15 C60,25 80,5 100,10" 
                      stroke="url(#gradient1)" 
                      strokeWidth="2.5" 
                      fill="none"
                      strokeLinecap="round"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 1.5, delay: 0.5 }}
                    />
                    <defs>
                      <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#4f46e5" />
                        <stop offset="100%" stopColor="#0ea5e9" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute bottom-0 left-0 right-0 flex justify-between text-[10px] text-slate-400 mt-1">
                    <span>Week 1</span>
                    <span>Week 2</span>
                    <span>Week 3</span>
                    <span>Week 4</span>
                  </div>
                </div>
                <div className="flex justify-between mt-2 text-xs">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-indigo-500" />
                    <span className="text-slate-500">Current</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-orange-400" />
                    <span className="text-slate-500">Target</span>
                  </div>
                </div>
              </motion.div>

              {/* Widget 4: Active Stats with Miles & Health */}
              <motion.div 
                variants={cardVariants}
                whileHover="hover"
                className="bg-white border border-slate-200 rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 hidden sm:flex flex-col"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <motion.h3 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", delay: 0.6 }}
                      className="text-2xl font-bold text-slate-900"
                    >
                      2,405
                    </motion.h3>
                    <p className="text-xs text-slate-500">Miles Driven</p>
                  </div>
                  <div className="bg-emerald-100 p-1.5 rounded-full">
                    <ShieldCheck className="w-5 h-5 text-emerald-600" />
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-medium text-slate-700">Vehicle Health</span>
                    <span className="font-bold text-indigo-600">92%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <motion.div 
                      className="bg-gradient-to-r from-indigo-500 to-sky-400 h-full rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: '92%' }}
                      transition={{ duration: 1, delay: 0.7 }}
                    />
                  </div>
                </div>
                <div className="flex justify-between mt-3 text-[11px] text-slate-500">
                  <span>Last service: 1,200 mi</span>
                  <span>Next due: 3,500 mi</span>
                </div>
              </motion.div>

            </motion.div>

            {/* Floating notification badge */}
            <motion.div 
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", delay: 1 }}
              className="absolute -top-4 -right-4 bg-white rounded-full shadow-lg border border-indigo-100 px-3 py-1.5 flex items-center gap-2 animate-pulse"
            >
              <BellRing className="w-3.5 h-3.5 text-indigo-500" />
              <span className="text-xs font-medium text-slate-700">Service due soon</span>
            </motion.div>
          </motion.div>
        </div>

        {/* BOTTOM SECTION: 3-Column Feature Grid */}
        <motion.div 
          className="mt-20 pt-12 border-t border-slate-200 grid grid-cols-1 md:grid-cols-3 gap-10 text-left"
          variants={staggerChildren}
        >
          
          <motion.div 
            variants={fadeInUp}
            whileHover={{ x: 5 }}
            className="flex flex-col group"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-xl bg-indigo-50 group-hover:bg-indigo-100 transition-colors">
                <Fuel className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">Expense Tracking</h3>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed">
              Log fuel fill-ups, maintenance costs, and repairs. Get visual reports on how much your vehicle is costing you over time.
            </p>
          </motion.div>

          <motion.div 
            variants={fadeInUp}
            whileHover={{ x: 5 }}
            className="flex flex-col group"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-xl bg-indigo-50 group-hover:bg-indigo-100 transition-colors">
                <BellRing className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">Automated Reminders</h3>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed">
              Never miss an oil change or tire rotation. Set mileage or date-based reminders and receive notifications when service is due.
            </p>
          </motion.div>

          <motion.div 
            variants={fadeInUp}
            whileHover={{ x: 5 }}
            className="flex flex-col group"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-xl bg-indigo-50 group-hover:bg-indigo-100 transition-colors">
                <BarChart3 className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">Advanced Analytics</h3>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed">
              Monitor your vehicle&apos;s health score, calculate true cost of ownership, and track fuel efficiency trends week over week.
            </p>
          </motion.div>

        </motion.div>

      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </motion.section>
  );
}