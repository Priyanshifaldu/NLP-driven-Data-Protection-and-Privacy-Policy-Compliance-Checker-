
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';
import { useAppContext } from '../App';

const AuthPage: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();
  const { login } = useAppContext();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you'd send these credentials to a backend for authentication
    console.log('Logging in with:', { email, password });
    login(); // Simulate successful login
    navigate('/dashboard/overview');
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Signing up with:', { email, password });
    // Simulate successful signup
    login();
    navigate('/dashboard/overview');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md p-8 text-center">
        <h2 className="text-2xl font-bold text-text-primary mb-6">Sign in to Continue</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-gray-50 border-gray-200"
          />
          <Input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="bg-gray-50 border-gray-200"
          />
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 mt-6">
            <Button type="submit" variant="primary" className="w-full">
              Login
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={handleSignup}
              className="w-full text-primary-blue border-primary-blue"
            >
              Sign up
            </Button>
          </div>
        </form>
        <p className="text-sm text-medium-grey mt-8">Powered by NLP Engine</p>
      </Card>
    </div>
  );
};

export default AuthPage;
