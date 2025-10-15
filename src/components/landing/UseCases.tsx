import Image from 'next/image';
import CheckIcon from '@/components/icons/CheckIcon';

const useCases = [
  {
    title: 'Organizations & HR Teams',
    description: 'Build stronger workplace culture by celebrating every team member',
    features: [
      'Employee birthday tracking',
      'Work anniversary celebrations',
      'Team engagement analytics'
    ],
    image: '/images/team-meeting.jpg',
    imageAlt: 'Professional team meeting around a conference table',
    imagePosition: 'left' as const
  },
  {
    title: 'Remote & Distributed Teams',
    description: 'Stay connected across time zones and keep team spirit alive',
    features: [
      'Automated reminders',
      'Timezone-aware scheduling',
      'Virtual celebration coordination'
    ],
    image: '/images/remote-workspace.jpg',
    imageAlt: 'Modern workspace with computer monitors',
    imagePosition: 'right' as const
  },
  {
    title: 'Personal & Family Use',
    description: 'Never miss birthdays of friends, family, and loved ones',
    features: [
      'Family & friend birthdays',
      'Wedding anniversaries',
      'Custom celebration reminders'
    ],
    image: '/images/family-gathering.jpg',
    imageAlt: 'Happy family gathering with adults and children',
    imagePosition: 'left' as const
  }
];

export function UseCases() {
  return (
    <section className="w-full py-16 px-8 md:px-16 lg:px-32">
      <div className="max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="heading-section text-text-primary mb-4">Built for everyone</h2>
          <p className="text-large text-text-secondary max-w-[580px]">
            From Fortune 500 companies to families, we've got you covered
          </p>
        </div>

        {/* Use Case Cards */}
        <div className="flex flex-col gap-12 max-w-[1280px] mx-auto">
          {useCases.map((useCase, index) => (
            <div 
              key={index}
              className={`flex flex-col ${useCase.imagePosition === 'right' ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-8 items-center`}
            >
              {/* Image */}
              <div className="w-full lg:w-1/2 relative h-[320px] rounded-xl overflow-hidden">
                <Image
                  src={useCase.image}
                  alt={useCase.imageAlt}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Content */}
              <div className="w-full lg:w-1/2 flex flex-col gap-3">
                <h3 className="heading-card text-text-primary">{useCase.title}</h3>
                <p className="text-base font-normal text-text-secondary mb-2">{useCase.description}</p>
                
                {/* Features List */}
                <div className="flex flex-col gap-3">
                  {useCase.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-3">
                      <CheckIcon width={9} height={6} color="#7f22fe" />
                      <span className="text-base font-normal text-text-tertiary">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}