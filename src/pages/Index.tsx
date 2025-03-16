
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import UserForm, { UserData } from '@/components/UserForm';
import ResultsDisplay from '@/components/ResultsDisplay';

const Index = () => {
  const [step, setStep] = useState<'intro' | 'form' | 'results'>('intro');
  const [userData, setUserData] = useState<UserData | null>(null);

  const handleGetStarted = () => {
    setStep('form');
    window.scrollTo(0, 0);
  };

  const handleFormComplete = (data: UserData) => {
    setUserData(data);
    setStep('results');
    window.scrollTo(0, 0);
  };

  const handleBack = () => {
    setStep('intro');
    setUserData(null);
    window.scrollTo(0, 0);
  };

  return (
    <Layout>
      {step === 'intro' && (
        <Hero onGetStarted={handleGetStarted} />
      )}

      {step === 'form' && (
        <UserForm onComplete={handleFormComplete} />
      )}

      {step === 'results' && userData && (
        <ResultsDisplay 
          userData={userData}
          onBack={handleBack}
        />
      )}
    </Layout>
  );
};

export default Index;
