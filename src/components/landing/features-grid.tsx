'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'motion/react';
import {
  IconBrain,
  IconSearch,
  IconApi,
  IconRocket,
  IconShield,
  IconClock,
  IconUsers,
  IconSparkles,
} from '@tabler/icons-react';

export default function FeaturesGrid() {
  const features = [
    {
      title: "AI-Powered Intelligence",
      description:
        "Transform documents into actionable insights with cutting-edge AI that understands context and meaning.",
      icon: <IconBrain />,
    },
    {
      title: "Lightning Fast Search",
      description:
        "Find any document in milliseconds with our semantic search that understands what you really need.",
      icon: <IconSearch />,
    },
    {
      title: "Enterprise API",
      description:
        "85+ REST endpoints with comprehensive SDKs. Built for developers who demand reliability.",
      icon: <IconApi />,
    },
    {
      title: "Blazing Performance",
      description: "Built with Go for unmatched speed. Process millions of documents with sub-second response times.",
      icon: <IconRocket />,
    },
    {
      title: "Bank-Grade Security",
      description: "End-to-end encryption, SOC2 compliant, and GDPR ready. Your data is fortress-protected.",
      icon: <IconShield />,
    },
    {
      title: "24/7 AI Processing",
      description:
        "Our AI never sleeps. Documents are processed, analyzed, and indexed around the clock.",
      icon: <IconClock />,
    },
    {
      title: "Team Collaboration",
      description:
        "Share insights, annotate documents, and collaborate in real-time with your entire team.",
      icon: <IconUsers />,
    },
    {
      title: "Infinite Possibilities",
      description: "From legal contracts to research papers, Archivus adapts to your unique workflow.",
      icon: <IconSparkles />,
    },
  ];

  return (
    <div className="relative py-32 lg:py-40 bg-gradient-to-b from-white via-neutral-50/50 to-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.015]">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-100 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-100 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <div className="text-center mb-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: "-100px" }}
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-50 to-orange-100 px-5 py-2.5 text-sm font-medium text-orange-700 mb-8 border border-orange-200/50"
        >
          <IconSparkles className="h-4 w-4" />
          Everything you need, nothing you don't
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: "-100px" }}
          className="mx-auto max-w-4xl text-4xl font-light tracking-tight text-neutral-900 md:text-5xl lg:text-6xl mb-6 leading-[1.15]"
        >
          The complete platform for{" "}
          <span className="bg-gradient-to-r from-orange-600 via-orange-500 to-orange-600 bg-clip-text text-transparent font-medium">
            document intelligence
          </span>
        </motion.h2>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10 max-w-7xl mx-auto">
        {features.map((feature, index) => (
          <Feature key={feature.title} {...feature} index={index} />
        ))}
      </div>
    </div>
  );
}

const Feature = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      viewport={{ once: true, margin: "-50px" }}
      className={cn(
        "flex flex-col lg:border-r py-12 px-8 relative group/feature border-neutral-200/50",
        (index === 0 || index === 4) && "lg:border-l",
        index < 4 && "lg:border-b"
      )}
    >
      {/* Hover gradient - top row */}
      {index < 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition-all duration-700 ease-out absolute inset-0 h-full w-full bg-gradient-to-t from-orange-50/50 via-transparent to-transparent pointer-events-none" />
      )}
      {/* Hover gradient - bottom row */}
      {index >= 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition-all duration-700 ease-out absolute inset-0 h-full w-full bg-gradient-to-b from-orange-50/50 via-transparent to-transparent pointer-events-none" />
      )}
      
      {/* Icon */}
      <motion.div 
        className="mb-6 relative z-10 text-neutral-600 transform-gpu"
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        {React.cloneElement(icon as React.ReactElement<any>, { 
          className: "h-8 w-8 stroke-[1.5] text-orange-600" 
        })}
      </motion.div>
      
      {/* Title with animated accent */}
      <div className="text-xl font-semibold mb-3 relative z-10">
        <motion.div 
          className="absolute left-0 inset-y-0 h-6 w-1 rounded-r-full bg-orange-200 group-hover/feature:bg-orange-500 group-hover/feature:h-8 transition-all duration-500 ease-out origin-center"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
          viewport={{ once: true }}
        />
        <span className="group-hover/feature:translate-x-3 transition-transform duration-500 ease-out inline-block text-neutral-900">
          {title}
        </span>
      </div>
      
      {/* Description */}
      <p className="text-sm text-neutral-600 leading-relaxed relative z-10 group-hover/feature:text-neutral-700 transition-colors duration-500">
        {description}
      </p>
      
      {/* Subtle bottom accent on hover */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-orange-400 to-transparent opacity-0 group-hover/feature:opacity-100 transition-opacity duration-700"
      />
    </motion.div>
  );
};