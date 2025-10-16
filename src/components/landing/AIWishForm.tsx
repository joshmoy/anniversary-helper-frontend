'use client';

import { useState } from 'react';
import type { FC } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import SparkleAIIcon from '@/components/icons/SparkleAIIcon';
import SparkleWhiteIcon from '@/components/icons/SparkleWhiteIcon';

interface AIWishFormProps {
  onGenerate: (data: {
    personName: string;
    relationship: string;
    occasionType: string;
    tone: string;
    additionalContext: string;
  }) => void;
}

export const AIWishForm: FC<AIWishFormProps> = ({ onGenerate }) => {
  const [personName, setPersonName] = useState('');
  const [relationship, setRelationship] = useState('');
  const [occasionType, setOccasionType] = useState('');
  const [tone, setTone] = useState('');
  const [additionalContext, setAdditionalContext] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate({
      personName,
      relationship,
      occasionType,
      tone,
      additionalContext
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center gap-2 mb-2">
        <SparkleAIIcon width={20} height={20} color="#7f22fe" />
        <div className="flex flex-col">
          <h3 className="text-large text-text-primary">AI Wish Generator</h3>
          <p className="text-small text-text-secondary">
            Create personalized anniversary wishes in seconds
          </p>
        </div>
      </div>

      {/* Form Fields */}
      <div className="flex flex-col gap-5">
        {/* Person's Name */}
        <div className="flex flex-col gap-1.5">
          <label className="text-small font-medium text-table-header-text">
            Person's Name *
          </label>
          <Input
            type="text"
            placeholder="e.g., Sarah Johnson"
            value={personName}
            onChange={(e) => setPersonName(e.target.value)}
            required
            className="bg-input-background border-0 text-small text-label-text placeholder:text-label-text"
          />
        </div>

        {/* Relationship */}
        <div className="flex flex-col gap-1.5">
          <label className="text-small font-medium text-table-header-text">
            Relationship *
          </label>
          <Input
            type="text"
            placeholder="e.g., colleague, friend, team member, manager"
            value={relationship}
            onChange={(e) => setRelationship(e.target.value)}
            required
            className="bg-input-background border-0 text-small text-label-text placeholder:text-label-text"
          />
        </div>

        {/* Occasion Type */}
        <div className="flex flex-col gap-1.5">
          <label className="text-small font-medium text-table-header-text">
            Occasion Type *
          </label>
          <Select value={occasionType} onValueChange={setOccasionType} required>
            <SelectTrigger className="bg-input-background border-0 text-small text-label-text">
              <SelectValue placeholder="Select occasion" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="birthday">Birthday</SelectItem>
              <SelectItem value="work-anniversary">Work Anniversary</SelectItem>
              <SelectItem value="wedding-anniversary">Wedding Anniversary</SelectItem>
              <SelectItem value="promotion">Promotion</SelectItem>
              <SelectItem value="retirement">Retirement</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Tone */}
        <div className="flex flex-col gap-1.5">
          <label className="text-small font-medium text-table-header-text">
            Tone *
          </label>
          <Select value={tone} onValueChange={setTone} required>
            <SelectTrigger className="bg-input-background border-0 text-small text-label-text">
              <SelectValue placeholder="Select tone" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="professional">Professional</SelectItem>
              <SelectItem value="friendly">Friendly</SelectItem>
              <SelectItem value="warm">Warm</SelectItem>
              <SelectItem value="humorous">Humorous</SelectItem>
              <SelectItem value="formal">Formal</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Additional Context */}
        <div className="flex flex-col gap-1.5">
          <label className="text-small font-medium text-table-header-text">
            Additional Context (Optional)
          </label>
          <Textarea
            placeholder="Any specific details you'd like to include? (achievements, memories, etc.)"
            value={additionalContext}
            onChange={(e) => setAdditionalContext(e.target.value)}
            className="bg-input-background border-0 text-small text-label-text placeholder:text-label-text min-h-[80px] resize-none"
          />
        </div>
      </div>

      {/* Generate Button */}
      <Button
        type="submit"
        className="w-full bg-brand-purple hover:bg-brand-purple-dark text-white rounded-lg h-10 gap-2 mt-2"
      >
        <SparkleWhiteIcon width={16} height={16} color="#ffffff" />
        <span className="text-small font-medium">Generate Wish</span>
      </Button>
    </form>
  );
};