"use client";

import React from 'react';
import Link from 'next/link';
import { Calendar, Clock, Tag } from 'lucide-react';
import Image from 'next/image';

interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  image: string;
  readTime: number;
}

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(post.date));

  // Handle both local and external image URLs
  const imageUrl = post.image.startsWith('http://') || post.image.startsWith('https://')
    ? post.image
    : `/images/${post.image}`;

  return (
    <Link href={`/blog/${post.slug}`}>
      <article className="group h-full bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-indigo-300 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer">
        
        {/* Image Container */}
        <div className="relative overflow-hidden h-48 bg-linear-to-br from-indigo-50 to-cyan-50">
          <Image
            src={imageUrl}
            alt={post.title}
            height={100}
            width={100}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Category Badge */}
          <div className="absolute top-4 right-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-600 text-white text-xs font-semibold backdrop-blur-sm">
            <Tag className="w-3.5 h-3.5" />
            {post.category}
          </div>
        </div>

        {/* Content Container */}
        <div className="p-6 flex flex-col h-56">
          
          {/* Title */}
          <h3 className="text-xl font-bold text-slate-900 mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors">
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="text-slate-600 text-sm mb-4 line-clamp-2 flex-grow">
            {post.excerpt}
          </p>

          {/* Meta Information */}
          <div className="flex items-center gap-4 text-xs text-slate-500 border-t border-slate-100 pt-4">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span>{post.readTime} min read</span>
            </div>
          </div>
        </div>

        {/* Hover Indicator */}
        <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-indigo-500 to-cyan-500 group-hover:w-full transition-all duration-300" />
      </article>
    </Link>
  );
}
