import CalendarIcon from '@/components/icons/CalendarIcon';
import BellIcon from '@/components/icons/BellIcon';
import UserIcon from '@/components/icons/UserIcon';
import UploadIcon from '@/components/icons/UploadIcon';
import MessageIcon from '@/components/icons/MessageIcon';
import AnalyticsIcon from '@/components/icons/AnalyticsIcon';

const features = [
  {
    icon: CalendarIcon,
    iconColor: '#7f22fe',
    title: 'Smart Calendar',
    description: 'View all upcoming birthdays and anniversaries in one beautiful calendar'
  },
  {
    icon: BellIcon,
    iconColor: '#e91e8c',
    title: 'Auto Reminders',
    description: 'Never forget a celebration with automated email and notification reminders'
  },
  {
    icon: UserIcon,
    iconColor: '#3b82f6',
    title: 'Contact Manager',
    description: 'Organize all your contacts, relationships, and important dates in one place'
  },
  {
    icon: UploadIcon,
    iconColor: '#f97316',
    title: 'Bulk Import',
    description: 'Upload hundreds of contacts at once with our CSV import feature'
  },
  {
    icon: MessageIcon,
    iconColor: '#9810fa',
    title: 'Message Tracking',
    description: 'Keep track of all sent messages and celebration wishes'
  },
  {
    icon: AnalyticsIcon,
    iconColor: '#10b981',
    title: 'Analytics',
    description: 'Get insights on celebration engagement and team participation'
  }
];

export function Features() {
  return (
    <section className="w-full bg-bg-light py-20 px-8 md:px-16 lg:px-24">
      <div className="max-w-[1280px] mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="heading-section text-text-primary mb-4">Everything you need</h2>
          <p className="text-large text-text-secondary max-w-[604px]">
            Powerful features designed to make celebration tracking effortless
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={index}
                className="bg-white rounded-2xl p-6 flex flex-col gap-3 hover:shadow-lg transition-shadow"
              >
                <Icon width={24} height={24} color={feature.iconColor} />
                <h3 className="text-base font-normal text-text-primary leading-tight">{feature.title}</h3>
                <p className="text-body text-text-secondary leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}