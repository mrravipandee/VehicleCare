"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, X, TrendingUp, Clock, BookOpen, ChevronRight, Mail } from 'lucide-react';
import BlogCard from '@/components/BlogCard';
import blogData from '@/data/blog.json';
import { motion, AnimatePresence, easeOut } from 'framer-motion';

// Define types for blog post
interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  author: string;
  date: string;
  readTime: number;
  tags?: string[];
}

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Get unique categories
  const categories = useMemo(() => {
    return Array.from(new Set(blogData.map(post => post.category)));
  }, []);

  // Filter posts based on search and category
  const filteredPosts = useMemo(() => {
    return (blogData as BlogPost[]).filter(post => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.author.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = selectedCategory === null || post.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  // Get popular tags
  const popularTags = useMemo(() => {
    const tags = (blogData as BlogPost[]).flatMap(post => post.tags || []);
    const tagCount = tags.reduce((acc, tag) => {
      acc[tag] = (acc[tag] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    return Object.entries(tagCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6);
  }, []);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory(null);
  };

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeOut } }
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      }
    }
  };

  return (
    <main className="min-h-screen bg-slate-50/50">
      {/* Premium Hero Section */}
      <section className="relative bg-slate-900 overflow-hidden pt-24 pb-32">
        {/* Background Gradients */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/40 via-slate-900 to-slate-900" />
          <div className="absolute right-0 top-0 w-1/2 h-full bg-linear-to-l from-violet-600/10 to-transparent blur-3xl" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="max-w-3xl"
          >
            {/* Breadcrumb */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-slate-300 mb-8 backdrop-blur-sm">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
              <span className="text-white font-medium">Resources</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight tracking-tight">
              VehicleCare
              <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-violet-400"> Insights</span>
            </h1>

            {/* Description */}
            <p className="text-lg sm:text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl">
              Discover expert advice, maintenance tips, and industry insights to help you get the most out of your vehicle. Drive smarter, save money.
            </p>

            {/* Elevated Search Bar */}
            <div className="relative max-w-2xl">
              {/* Subtle glow effect behind the search bar when focused */}
              <div className={`absolute inset-0 bg-indigo-500/20 blur-xl rounded-2xl transition-opacity duration-500 ${isSearchFocused ? 'opacity-100' : 'opacity-0'}`} />
              
              <div className="relative flex items-center bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 focus-within:bg-white/15 focus-within:border-indigo-400/50">
                <Search className={`absolute left-5 w-6 h-6 transition-colors duration-300 ${isSearchFocused ? 'text-indigo-300' : 'text-slate-400'}`} />
                <input
                  type="text"
                  placeholder="Search articles, guides, and tips..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  className="w-full py-5 pl-14 pr-12 bg-transparent text-white placeholder:text-slate-400 focus:outline-none text-lg"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-all"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Layout Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-16 relative z-10">
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Main Content Column */}
          <div className="flex-1">
            
            {/* Scrollable Category Filters */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="bg-white rounded-2xl p-2 shadow-sm border border-slate-200/60 mb-8"
            >
              <div className="flex overflow-x-auto pb-2 sm:pb-0 gap-2 scrollbar-hide">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`shrink-0 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 ${
                    selectedCategory === null
                      ? 'bg-linear-to-r from-indigo-600 to-violet-600 text-white shadow-md'
                      : 'bg-transparent text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  All Articles
                </button>
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`shrink-0 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 ${
                      selectedCategory === category
                        ? 'bg-linear-to-r from-indigo-600 to-violet-600 text-white shadow-md'
                        : 'bg-transparent text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Results Counter */}
            {(searchQuery || selectedCategory) && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between mb-8 px-2"
              >
                <p className="text-slate-600 font-medium">
                  Showing <span className="font-bold text-slate-900">{filteredPosts.length}</span> {filteredPosts.length === 1 ? 'result' : 'results'}
                </p>
                <button
                  onClick={clearFilters}
                  className="text-sm text-indigo-600 hover:text-indigo-700 font-semibold transition-colors flex items-center gap-1"
                >
                  <X className="w-4 h-4" /> Clear filters
                </button>
              </motion.div>
            )}

            {/* Blog Posts Grid */}
            <AnimatePresence mode="wait">
              {filteredPosts.length > 0 ? (
                <motion.div
                  key="grid"
                  variants={staggerChildren}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 md:grid-cols-2 gap-8"
                >
                  {filteredPosts.map((post, index) => (
                    <motion.div key={post.id} variants={fadeInUp} custom={index}>
                      <BlogCard post={post} />
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="text-center py-20 px-6 bg-white rounded-3xl border border-dashed border-slate-300"
                >
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-slate-50 mb-6 shadow-inner">
                    <Search className="w-10 h-10 text-slate-300" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">
                    No articles found
                  </h3>
                  <p className="text-slate-500 mb-8 max-w-md mx-auto text-lg">
                    We couldn&apos;t find anything matching your current search or category filters.
                  </p>
                  <button
                    onClick={clearFilters}
                    className="px-8 py-3 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-all shadow-md font-semibold"
                  >
                    Reset Search
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sticky Sidebar */}
          <motion.aside
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="lg:w-80 shrink-0"
          >
            <div className="sticky top-24 space-y-8">
              
              {/* Stats Card */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200/60 shadow-sm">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                  <div className="p-2 bg-indigo-50 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-indigo-600" />
                  </div>
                  <h3 className="font-bold text-slate-900">Platform Stats</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-500 font-medium">Total Articles</span>
                    <span className="font-bold text-slate-900 bg-slate-100 px-3 py-1 rounded-full">{blogData.length}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-500 font-medium">Categories</span>
                    <span className="font-bold text-slate-900 bg-slate-100 px-3 py-1 rounded-full">{categories.length}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-500 font-medium">Avg. Read Time</span>
                    <span className="font-bold text-slate-900 bg-slate-100 px-3 py-1 rounded-full">
                      {Math.round(blogData.reduce((acc, post) => acc + post.readTime, 0) / blogData.length)} min
                    </span>
                  </div>
                </div>
              </div>

              {/* Popular Tags */}
              {popularTags.length > 0 && (
                <div className="bg-white rounded-2xl p-6 border border-slate-200/60 shadow-sm">
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                    <div className="p-2 bg-indigo-50 rounded-lg">
                      <BookOpen className="w-5 h-5 text-indigo-600" />
                    </div>
                    <h3 className="font-bold text-slate-900">Popular Topics</h3>
                  </div>
                  <div className="flex flex-wrap gap-2.5">
                    {popularTags.map(([tag, count]) => (
                      <button
                        key={tag}
                        onClick={() => setSearchQuery(tag)}
                        className="px-4 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-slate-600 text-xs font-semibold hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-200"
                      >
                        #{tag}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Newsletter Signup */}
              <div className="relative overflow-hidden rounded-2xl p-6 text-white shadow-lg">
                <div className="absolute inset-0 bg-slate-900" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-600/60 via-transparent to-transparent opacity-80" />
                
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-3">
                    <Mail className="w-5 h-5 text-indigo-300" />
                    <h3 className="font-bold text-lg">Stay Updated</h3>
                  </div>
                  <p className="text-slate-300 text-sm mb-6 leading-relaxed">
                    Get the latest vehicle maintenance tips and industry insights delivered straight to your inbox.
                  </p>
                  <div className="space-y-3">
                    <input
                      type="email"
                      placeholder="name@example.com"
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:bg-white/15 transition-all"
                    />
                    <button className="w-full px-4 py-3 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-500 transition-colors shadow-md">
                      Subscribe Now
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </motion.aside>

        </div>
      </div>
    </main>
  );
}