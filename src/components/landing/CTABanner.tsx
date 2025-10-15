import Link from 'next/link';
import { Button } from '@/components/ui/button';
import ArrowRightIcon from '@/components/icons/ArrowRightIcon';

export function CTABanner() {
  return (
    <section className="w-full bg-brand-purple py-16 px-8 md:px-16 lg:px-32">
      <div className="max-w-[896px] mx-auto flex flex-col items-center text-center gap-6">
        <h2 className="heading-section text-white">
          Ready to never miss a celebration?
        </h2>
        <p className="text-large text-brand-purple-light">
          Join thousands who are building stronger relationships through thoughtful celebration tracking
        </p>
        <Link href="/auth/register">
          <Button className="bg-transparent hover:bg-white/10 text-white border-2 border-white rounded-lg h-10 px-6 gap-2">
            <span className="text-sm font-medium">Create Your Free Account</span>
            <ArrowRightIcon width={16} height={16} color="#ffffff" />
          </Button>
        </Link>
      </div>
    </section>
  );
}