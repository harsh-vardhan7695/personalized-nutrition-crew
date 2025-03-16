
import React from 'react';
import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroProps {
  onGetStarted: () => void;
  className?: string;
}

const Hero: React.FC<HeroProps> = ({ 
  onGetStarted,
  className 
}) => {
  return (
    <div className={cn(
      "py-20 flex flex-col items-center justify-center text-center animate-slide-up",
      className
    )}>
      <div className="inline-flex items-center justify-center px-4 py-1.5 mb-6 rounded-full bg-blue-50 border border-blue-100">
        <Sparkles className="w-4 h-4 mr-2 text-blue-500" />
        <span className="text-sm font-medium text-blue-700">Nutrition Reimagined</span>
      </div>
      
      <h1 className="text-balance max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
        Personalized Nutrition Plans Tailored to Your Life
      </h1>
      
      <p className="text-balance mt-6 max-w-2xl text-lg text-muted-foreground">
        Our AI-powered nutrition advisor creates perfectly tailored meal plans, 
        considering your health conditions, preferences, and goals for a healthier lifestyle.
      </p>
      
      <div className="mt-10 flex flex-col sm:flex-row gap-4">
        <Button 
          size="lg" 
          className="rounded-full px-8 py-6 text-base font-medium shadow-lg transition-all hover:shadow-xl bg-primary hover:bg-primary/90"
          onClick={onGetStarted}
        >
          Get Started
        </Button>
        
        <Button 
          variant="outline" 
          size="lg" 
          className="rounded-full px-8 py-6 text-base font-medium shadow-sm hover:shadow-md bg-white"
        >
          Learn More
        </Button>
      </div>
    </div>
  );
};

export default Hero;
