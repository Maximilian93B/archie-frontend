"use client";
import React from "react";
import { motion } from "motion/react";

const transition = {
  type: "spring" as const,
  mass: 0.4,
  damping: 15,
  stiffness: 120,
  restDelta: 0.001,
  restSpeed: 0.001,
};

export const MenuItem = ({
  setActive,
  active,
  item,
  children,
}: {
  setActive: (item: string) => void;
  active: string | null;
  item: string;
  children?: React.ReactNode;
}) => {
  return (
    <div onMouseEnter={() => setActive(item)} className="relative">
      <motion.p
        transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        className="cursor-pointer text-neutral-700 hover:text-neutral-900 font-medium text-sm tracking-tight transition-colors duration-200"
      >
        {item}
      </motion.p>
      {active !== null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={transition}
        >
          {active === item && (
            <div className="absolute top-[calc(100%_+_0.75rem)] left-1/2 transform -translate-x-1/2 pt-2">
              <motion.div
                transition={transition}
                layoutId="active"
                className="bg-white/95 backdrop-blur-xl rounded-2xl overflow-hidden border border-neutral-200/60 shadow-lg shadow-neutral-900/10"
              >
                <motion.div
                  layout
                  className="w-max h-full p-6"
                >
                  {children}
                </motion.div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export const Menu = ({
  setActive,
  children,
}: {
  setActive: (item: string | null) => void;
  children: React.ReactNode;
}) => {
  return (
    <nav
      onMouseLeave={() => setActive(null)}
      className="relative rounded-2xl border border-neutral-200/60 bg-white/80 backdrop-blur-xl shadow-sm flex justify-center items-center space-x-8 px-8 py-4"
    >
      {children}
    </nav>
  );
};

export const ProductItem = ({
  title,
  description,
  href,
  src,
}: {
  title: string;
  description: string;
  href: string;
  src: string;
}) => {
  return (
    <a href={href} className="flex space-x-4 group">
      <div className="shrink-0 w-12 h-12 rounded-xl bg-neutral-100 border border-neutral-200/60 flex items-center justify-center group-hover:bg-neutral-50 transition-colors duration-200">
        <img
          src={src}
          width={24}
          height={24}
          alt={title}
          className="rounded-md"
        />
      </div>
      <div className="flex-1">
        <h4 className="text-sm font-medium text-neutral-900 mb-1 group-hover:text-neutral-700 transition-colors duration-200">
          {title}
        </h4>
        <p className="text-xs text-neutral-600 leading-relaxed max-w-[12rem]">
          {description}
        </p>
      </div>
    </a>
  );
};

export const HoveredLink = ({ children, ...rest }: any) => {
  return (
    <a
      {...rest}
      className="text-neutral-600 hover:text-neutral-900 text-sm font-light transition-colors duration-200 block py-1"
    >
      {children}
    </a>
  );
};
