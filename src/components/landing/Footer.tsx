import Link from 'next/link';
import SparkleIcon from '@/components/icons/SparkleIcon';

const footerLinks = {
  product: [
    { label: 'Features', href: '#features' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Updates', href: '#updates' }
  ],
  company: [
    { label: 'About', href: '#about' },
    { label: 'Blog', href: '#blog' },
    { label: 'Contact', href: '#contact' }
  ],
  legal: [
    { label: 'Privacy', href: '#privacy' },
    { label: 'Terms', href: '#terms' },
    { label: 'Security', href: '#security' }
  ]
};

export function Footer() {
  return (
    <footer className="w-full bg-footer-dark py-12 px-8 md:px-16 lg:px-24">
      <div className="max-w-[1280px] mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-10">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2">
              <SparkleIcon width={18} height={16} color="#7f22fe" />
              <span className="text-base font-normal text-white">Anniversary Helper</span>
            </Link>
            <p className="text-small text-text-muted">Never miss a celebration again</p>
          </div>

          {/* Product Links */}
          <div className="flex flex-col gap-4">
            <h4 className="text-base font-normal text-white mb-1">Product</h4>
            <div className="flex flex-col gap-2.5">
              {footerLinks.product.map((link, index) => (
                <Link 
                  key={index}
                  href={link.href}
                  className="text-small text-text-muted hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div className="flex flex-col gap-4">
            <h4 className="text-base font-normal text-white mb-1">Company</h4>
            <div className="flex flex-col gap-2.5">
              {footerLinks.company.map((link, index) => (
                <Link 
                  key={index}
                  href={link.href}
                  className="text-small text-text-muted hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Legal Links */}
          <div className="flex flex-col gap-4">
            <h4 className="text-base font-normal text-white mb-1">Legal</h4>
            <div className="flex flex-col gap-2.5">
              {footerLinks.legal.map((link, index) => (
                <Link 
                  key={index}
                  href={link.href}
                  className="text-small text-text-muted hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-6 border-t border-white/10">
          <p className="text-small text-text-muted text-center">
            © 2025 Anniversary Helper. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}