import React, { useState, createContext, useContext } from 'react';
import { HashRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import DashboardLayout from './pages/DashboardLayout';
import OverviewPage from './pages/OverviewPage';
import UploadPolicyPage from './pages/UploadPolicyPage';
import AnalysisResultsPage from './pages/AnalysisResultsPage';
import RecommendationsPage from './pages/RecommendationsPage';
import ModelPerformancePage from './pages/ModelPerformancePage';
import { PolicyAnalysisResult } from './types'; // Removed 'type' keyword

interface AppContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
  userName: string;
  setUserName: (name: string) => void;
  latestAnalysisResult: PolicyAnalysisResult | null;
  setLatestAnalysisResult: (result: PolicyAnalysisResult) => void;
  isAnalyzing: boolean;
  setIsAnalyzing: (status: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>('John Doe');
  const [latestAnalysisResult, setLatestAnalysisResult] = useState<PolicyAnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);

  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);

  const value = {
    isAuthenticated,
    login,
    logout,
    userName,
    setUserName,
    latestAnalysisResult,
    setLatestAnalysisResult,
    isAnalyzing,
    setIsAnalyzing,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/dashboard/*" element={<ProtectedRoute />} />
        </Routes>
      </Router>
    </AppProvider>
  );
};

// ProtectedRoute ensures users are authenticated before accessing dashboard routes
const ProtectedRoute: React.FC = () => {
  const { isAuthenticated } = useAppContext();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null; // Or a loading spinner
  }

  return (
    <DashboardLayout>
      <Routes>
        <Route index element={<OverviewPage />} />
        <Route path="overview" element={<OverviewPage />} />
        <Route path="upload-policy" element={<UploadPolicyPage />} />
        <Route path="analysis-results" element={<AnalysisResultsPage />} />
        <Route path="recommendations" element={<RecommendationsPage />} />
        <Route path="model-performance" element={<ModelPerformancePage />} />
      </Routes>
    </DashboardLayout>
  );
};

export default App;