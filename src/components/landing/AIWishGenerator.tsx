'use client';

import { useState } from 'react';
import type { FC } from 'react';
import SparkleAIIcon from '@/components/icons/SparkleAIIcon';
import { AIWishForm } from './AIWishForm';
import { AIWishResult } from './AIWishResult';

export const AIWishGenerator: FC = () => {
  const [showResult, setShowResult] = useState(false);
  const [wishData, setWishData] = useState({
    personName: '',
    relationship: '',
    occasionType: '',
    tone: '',
    additionalContext: ''
  });

  const handleGenerateWish = (data: typeof wishData) => {
    setWishData(data);
    setShowResult(true);
  };

  const handleStartOver = () => {
    setShowResult(false);
    setWishData({
      personName: '',
      relationship: '',
      occasionType: '',
      tone: '',
      additionalContext: ''
    });
  };

  return (
    <section className="w-full bg-bg-light py-20 px-8 md:px-16 lg:px-24">
      <div className="max-w-[1280px] mx-auto">
        {/* Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 bg-brand-purple-light rounded-lg px-3 py-1.5">
            <SparkleAIIcon width={12} height={12} color="#7008e7" />
            <span className="text-badge text-brand-purple-dark">Powered by AI</span>
          </div>
        </div>

        {/* Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="heading-section text-text-primary mb-4">
            Create Perfect Wishes in Seconds
          </h2>
          <p className="text-large text-text-secondary max-w-[612px]">
            Let AI help you craft personalized, heartfelt anniversary wishes for any occasion. No more writer's block!
          </p>
        </div>

        {/* Main Card */}
        <div className="max-w-[1112px] mx-auto bg-white rounded-2xl border border-card-border p-8 md:p-12 shadow-sm">
          {!showResult ? (
            <AIWishForm onGenerate={handleGenerateWish} />
          ) : (
            <AIWishResult 
              personName={wishData.personName}
              onStartOver={handleStartOver}
            />
          )}
        </div>

        {/* Footer Text */}
        <div className="text-center mt-8">
          <p className="text-small text-text-secondary">
            Try it now - no sign up required! Create unlimited wishes once you join.
          </p>
        </div>
      </div>
    </section>
  );
};