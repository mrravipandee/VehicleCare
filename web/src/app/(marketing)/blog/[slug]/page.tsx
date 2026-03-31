"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, notFound } from 'next/navigation';
import { ArrowLeft, Calendar, Clock, Tag, Share2, Heart, Bookmark, ChevronRight } from 'lucide-react';
import blogData from '@/data/blog.json';
import Image from 'next/image';
import { motion } from 'framer-motion';

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

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [formattedDate, setFormattedDate] = useState('');
  const [isClient, setIsClient] = useState(false);

  const post = (blogData as BlogPost[]).find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  // Initialize client state to prevent hydration mismatch
  useEffect(() => {
    setIsClient(true);
    const date = new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'UTC',
    }).format(new Date(post.date));
    setFormattedDate(date);
  }, [post.date]);

  // Handle both local and external image URLs
  const getImageSrc = (image: string) => {
    if (image.startsWith('http://') || image.startsWith('https://')) {
      return image;
    }
    return `/images/${image}`;
  };

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } },
  };

  // Safe sharing handler
  const handleShare = async () => {
    if (!isClient) return;
    
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: typeof window !== 'undefined' ? window.location.href : '',
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else if (typeof navigator !== 'undefined' && navigator.clipboard) {
      try {
        const url = typeof window !== 'undefined' ? window.location.href : '';
        await navigator.clipboard.writeText(url);
        alert('Link copied to clipboard!');
      } catch (err) {
        console.log('Error copying to clipboard:', err);
      }
    }
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Image Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative w-full h-96 sm:h-[32rem] lg:h-[40rem] overflow-hidden"
      >
        <Image
          src={getImageSrc(post.image)}
          alt={post.title}
          className="w-full h-full object-cover"
          width={1200}
          height={800}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/30 to-transparent" />

        {/* Back Button */}
        <Link
          href="/blog"
          className="absolute top-6 left-6 z-10 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/90 backdrop-blur-md hover:bg-white text-slate-700 font-medium transition-all duration-300 group shadow-lg"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Blog</span>
        </Link>
      </motion.div>

      {/* Content Section */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 -mt-32 relative z-20">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="bg-white rounded-3xl p-8 sm:p-12 shadow-2xl shadow-slate-200/50"
        >
          {/* Category Badge */}
          <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-indigo-50 text-indigo-600 font-semibold text-sm mb-6">
            <Tag className="w-4 h-4" />
            {post.category}
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 leading-tight tracking-tight mb-8">
            {post.title}
          </h1>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-6 py-6 border-y border-slate-100 mb-10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold text-lg shadow-md">
                {post.author.charAt(0).toUpperCase()}
              </div>
              <div>
                <div className="font-bold text-slate-900">{post.author}</div>
                <div className="text-sm text-slate-500 font-medium">Author</div>
              </div>
            </div>

            <div className="hidden sm:block w-px h-8 bg-slate-200" />

            <div className="flex items-center gap-2 text-slate-600 font-medium">
              <Calendar className="w-4 h-4 text-indigo-500" />
              <span>{formattedDate || 'Date pending...'}</span>
            </div>

            <div className="flex items-center gap-2 text-slate-600 font-medium">
              <Clock className="w-4 h-4 text-indigo-500" />
              <span>{post.readTime} min read</span>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 ml-auto">
              <button className="p-2.5 rounded-full hover:bg-rose-50 text-slate-400 hover:text-rose-500 transition-colors duration-200">
                <Heart className="w-5 h-5" />
              </button>
              <button className="p-2.5 rounded-full hover:bg-indigo-50 text-slate-400 hover:text-indigo-600 transition-colors duration-200">
                <Bookmark className="w-5 h-5" />
              </button>
              <button
                onClick={handleShare}
                className="p-2.5 rounded-full hover:bg-indigo-50 text-slate-400 hover:text-indigo-600 transition-colors duration-200"
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Article Content */}
          <div 
            className="
              text-lg text-slate-600 leading-relaxed
              [&>p]:mb-8 
              [&>h2]:text-3xl [&>h2]:font-extrabold [&>h2]:text-slate-900 [&>h2]:mt-14 [&>h2]:mb-6 [&>h2]:tracking-tight
              [&>h3]:text-2xl [&>h3]:font-bold [&>h3]:text-slate-800 [&>h3]:mt-10 [&>h3]:mb-4
              [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-8 [&>ul]:space-y-3 [&>ul>li]:text-slate-600 [&>ul>li]:marker:text-indigo-500
              [&_strong]:font-bold [&_strong]:text-slate-900 [&_strong]:bg-indigo-50/50 [&_strong]:px-1 [&_strong]:rounded
              [&_em]:italic [&_em]:text-slate-700
              [&>blockquote]:border-l-4 [&>blockquote]:border-indigo-500 [&>blockquote]:pl-6 [&>blockquote]:py-4 [&>blockquote]:pr-4 [&>blockquote]:my-10 [&>blockquote]:italic [&>blockquote]:bg-slate-50 [&>blockquote]:rounded-r-xl [&>blockquote]:text-slate-700 [&>blockquote]:font-medium [&>blockquote]:shadow-sm
            "
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Tags Section */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-10 mt-10 border-t border-slate-100">
              <span className="text-sm font-semibold text-slate-900 py-1.5 pr-2">Tags:</span>
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-4 py-1.5 rounded-lg bg-slate-50 text-slate-600 text-sm font-medium hover:bg-slate-100 hover:text-slate-900 transition-colors cursor-pointer border border-slate-200"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeIn}
          className="mt-12 p-8 sm:p-12 rounded-3xl bg-slate-900 text-white text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/40 via-slate-900 to-slate-900" />
          
          <div className="relative z-10">
            <h3 className="text-3xl sm:text-4xl font-bold mb-4">
              Ready to Manage Your Vehicle Smarter?
            </h3>
            <p className="text-slate-300 mb-8 max-w-xl mx-auto text-lg">
              Start tracking your vehicle&apos;s service history, fuel expenses, and maintenance with VehicleCare today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-500 transition-all duration-200 shadow-lg shadow-indigo-500/25 group"
              >
                Get Started for Free
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </motion.div>
      </article>
    </main>
  );
}