"use client";

import React from 'react';
import { Car, User, Truck, Users, ArrowRight } from 'lucide-react';
import { motion, easeInOut } from 'framer-motion';
import type { Variants } from 'framer-motion';

const useCases = [
  {
    icon: Car,
    title: "Daily Riders",
    description: "Track regular servicing and fuel usage easily",
    stats: "2.5M+ users"
  },
  {
    icon: User,
    title: "Car Owners",
    description: "Manage service history and store important documents",
    stats: "1.2M+ vehicles"
  },
  {
    icon: Truck,
    title: "Delivery Drivers",
    description: "Monitor mileage, fuel costs, and daily performance",
    stats: "500K+ drivers"
  },
  {
    icon: Users,
    title: "Fleet Managers",
    description: "Manage multiple vehicles, services, and expenses in one place",
    stats: "10K+ fleets"
  }
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { 
    opacity: 0,
    y: 20,
  },
  visible: { 
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: easeInOut,
    },
  },
};

const headerVariants = {
  hidden: { 
    opacity: 0,
    y: -10,
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

export default function UseCasesSection() {
  return (
    <section className="py-24 sm:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-sm mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
            Use Cases
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 mb-4">
            Built for Every Vehicle Owner
          </h2>
          <p className="text-lg text-slate-500">
            Join millions who trust us to manage their vehicle operations
          </p>
        </motion.div>

        {/* Use Cases Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {useCases.map((useCase, index) => {
            const Icon = useCase.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -4 }}
                className="group relative"
              >
                <div className="relative bg-white rounded-xl p-6 border border-slate-200 hover:border-slate-300 transition-all duration-300">
                  {/* Icon */}
                  <div className="mb-4">
                    <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center group-hover:bg-indigo-50 transition-colors duration-300">
                      <Icon className="w-5 h-5 text-slate-600 group-hover:text-indigo-600 transition-colors duration-300" strokeWidth={1.5} />
                    </div>
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-lg font-semibold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors duration-300">
                    {useCase.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-sm text-slate-500 leading-relaxed mb-4">
                    {useCase.description}
                  </p>

                  {/* Stats */}
                  <div className="pt-4 border-t border-slate-100">
                    <p className="text-xs text-slate-400 uppercase tracking-wide">
                      Active Users
                    </p>
                    <p className="text-sm font-semibold text-slate-900">
                      {useCase.stats}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <button className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-all duration-300 group">
            <span>Start Your Free Trial</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}