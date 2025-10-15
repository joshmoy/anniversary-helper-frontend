import Link from 'next/link';
import { Button } from '@/components/ui/button';
import SparkleIcon from '@/components/icons/SparkleIcon';
import ArrowRightIcon from '@/components/icons/ArrowRightIcon';

export function Header() {
  return (
    <header className="w-full py-4 px-8 md:px-16 lg:px-32">
      <div className="max-w-[1600px] mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <SparkleIcon width={18} height={16} color="#7f22fe" />
          <span className="text-base font-normal text-text-primary">Anniversary Helper</span>
        </Link>
        
        <div className="flex items-center gap-3">
          <Link 
            href="/auth/login" 
            className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
          >
            Sign In
          </Link>
          <Link href="/auth/register">
            <Button className="bg-brand-purple hover:bg-brand-purple-dark text-white rounded-lg h-9 px-4 gap-2">
              <span className="text-sm font-medium">Get Started</span>
              <ArrowRightIcon width={16} height={16} color="#ffffff" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}