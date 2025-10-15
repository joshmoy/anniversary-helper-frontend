import Link from 'next/link';
import { Button } from '@/components/ui/button';
import SparkleIcon from '@/components/icons/SparkleIcon';
import ArrowRightIcon from '@/components/icons/ArrowRightIcon';

export function Hero() {
  return (
    <section className="w-full hero-gradient py-16 px-8 md:px-16 lg:px-32">
      <div className="max-w-[1600px] mx-auto flex flex-col items-center text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-brand-purple-light rounded-lg px-3 py-1 mb-12">
          <SparkleIcon width={12} height={12} color="#7008e7" />
          <span className="text-badge text-brand-purple-dark">Never Miss Another Celebration</span>
        </div>

        {/* Heading */}
        <h1 className="heading-hero text-text-primary mb-2">
          Remember Every
        </h1>
        <h1 className="heading-hero text-brand-purple mb-8">
          Birthday & Anniversary
        </h1>

        {/* Description */}
        <p className="text-large text-text-secondary max-w-[665px] mb-8">
          Automated celebration tracking and reminders for teams, organizations, and personal networks. Build stronger relationships, one celebration at a time.
        </p>

        {/* CTAs */}
        <div className="flex items-center gap-4 mb-16">
          <Link href="/auth/register">
            <Button className="bg-brand-purple hover:bg-brand-purple-dark text-white rounded-lg h-10 px-6 gap-2">
              <span className="text-sm font-medium">Start Free Today</span>
              <ArrowRightIcon width={16} height={16} color="#ffffff" />
            </Button>
          </Link>
          <Link 
            href="#demo" 
            className="text-sm font-medium text-text-tertiary hover:text-text-primary transition-colors"
          >
            View Demo
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full max-w-[896px]">
          <div className="flex flex-col items-center gap-1">
            <span className="text-stat text-text-primary">10,000+</span>
            <span className="text-small text-text-secondary">Active Users</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-stat text-text-primary">50,000+</span>
            <span className="text-small text-text-secondary">Celebrations Tracked</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-stat text-text-primary">98%</span>
            <span className="text-small text-text-secondary">Never Miss Rate</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-stat text-text-primary">24/7</span>
            <span className="text-small text-text-secondary">Auto Reminders</span>
          </div>
        </div>
      </div>
    </section>
  );
}