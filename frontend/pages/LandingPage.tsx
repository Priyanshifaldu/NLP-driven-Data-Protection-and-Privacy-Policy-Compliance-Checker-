
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/auth');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-blue to-accent-blue text-white p-4">
      <div className="text-center max-w-2xl">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 leading-tight">
          AI Privacy Compliance Checker
        </h1>
        <p className="text-lg sm:text-xl font-light mb-8 opacity-90">
          Your intelligent assistant for GDPR & EU data protection compliance
        </p>
        <Button
          variant="secondary"
          size="lg"
          onClick={handleGetStarted}
          className="bg-accent-blue/80 hover:bg-accent-blue focus:ring-light-blue"
        >
          Get Started
        </Button>
      </div>
    </div>
  );
};

export default LandingPage;
