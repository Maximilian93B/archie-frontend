'use client';

import { Brain, Github, Twitter, Linkedin } from 'lucide-react';

const navigation = {
  product: [
    { name: 'Features', href: '#features' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'API Documentation', href: '#' },
    { name: 'Integrations', href: '#' },
  ],
  company: [
    { name: 'About', href: '#about' },
    { name: 'Blog', href: '#' },
    { name: 'Careers', href: '#' },
    { name: 'Contact', href: '#contact' },
  ],
  resources: [
    { name: 'Documentation', href: '#' },
    { name: 'Help Center', href: '#' },
    { name: 'Community', href: '#' },
    { name: 'Status', href: '#' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms of Service', href: '#' },
    { name: 'Cookie Policy', href: '#' },
    { name: 'Security', href: '#' },
  ],
};

const socialLinks = [
  {
    name: 'Twitter',
    href: '#',
    icon: Twitter,
  },
  {
    name: 'GitHub',
    href: '#',
    icon: Github,
  },
  {
    name: 'LinkedIn',
    href: '#',
    icon: Linkedin,
  },
];

export function Footer() {
  return (
    <footer className="bg-neutral-50 border-t border-neutral-200/60" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-8 pb-8 pt-16 sm:pt-24 lg:pt-32">
        <div className="xl:grid xl:grid-cols-3 xl:gap-12">
          {/* Brand Section */}
          <div className="space-y-8">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-neutral-900">
                <Brain className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-medium text-neutral-900">Archivus</span>
            </div>
            <p className="text-sm leading-6 text-neutral-600 font-light max-w-md">
              Intelligent document management powered by AI. Transform how you organize, 
              analyze, and interact with your documents using cutting-edge technology.
            </p>
            <div className="flex space-x-6">
              {socialLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-neutral-500 hover:text-neutral-700 transition-colors duration-200"
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Grid */}
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-medium leading-6 text-neutral-900">Product</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.product.map((item) => (
                    <li key={item.name}>
                      <a 
                        href={item.href} 
                        className="text-sm leading-6 text-neutral-600 hover:text-neutral-900 transition-colors duration-200 font-light"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-medium leading-6 text-neutral-900">Company</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.company.map((item) => (
                    <li key={item.name}>
                      <a 
                        href={item.href} 
                        className="text-sm leading-6 text-neutral-600 hover:text-neutral-900 transition-colors duration-200 font-light"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-medium leading-6 text-neutral-900">Resources</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.resources.map((item) => (
                    <li key={item.name}>
                      <a 
                        href={item.href} 
                        className="text-sm leading-6 text-neutral-600 hover:text-neutral-900 transition-colors duration-200 font-light"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-medium leading-6 text-neutral-900">Legal</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.legal.map((item) => (
                    <li key={item.name}>
                      <a 
                        href={item.href} 
                        className="text-sm leading-6 text-neutral-600 hover:text-neutral-900 transition-colors duration-200 font-light"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-16 border-t border-neutral-200/60 pt-8 sm:mt-20 lg:mt-24">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-xs leading-5 text-neutral-500 font-light">
              &copy; 2024 Archivus. All rights reserved.
            </p>
            <div className="mt-4 sm:mt-0">
              <p className="text-xs leading-5 text-neutral-500 font-light">
                Built with ❤️ using Next.js and Claude AI
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 