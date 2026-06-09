import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileTextIcon, CheckCircleIcon, XCircleIcon } from 'lucide-react';
import Card from '../components/Card';
import ProgressBar from '../components/ProgressBar';
import Button from '../components/Button';
import { useAppContext } from '../App';
import { MOCKED_ANALYSIS_RESULT_INITIAL, MOCKED_ANALYSIS_RESULT } from '../constants.tsx';
import { PolicyAnalysisResult } from '../types';

const OverviewPage: React.FC = () => {
  const navigate = useNavigate();
  const { userName, latestAnalysisResult, setLatestAnalysisResult } = useAppContext();
  const [analysisSummary, setAnalysisSummary] = React.useState<PolicyAnalysisResult>(
    latestAnalysisResult || MOCKED_ANALYSIS_RESULT_INITIAL,
  );

  React.useEffect(() => {
    // If no analysis result is set, use the mocked one as a default
    if (!latestAnalysisResult || latestAnalysisResult.overallScore === 0) {
      setLatestAnalysisResult(MOCKED_ANALYSIS_RESULT);
      setAnalysisSummary(MOCKED_ANALYSIS_RESULT);
    } else {
      setAnalysisSummary(latestAnalysisResult);
    }
  }, [latestAnalysisResult, setLatestAnalysisResult]);

  const handleStartNewAnalysis = () => {
    navigate('/dashboard/upload-policy');
  };

  const recentScans = [
    { name: 'privacy-policy-v2.pdf', size: '2.4 MB', status: '78% Compliant', date: 'Oct 12, 2025' },
    { name: 'terms-of-service-draft.docx', size: '1.8 MB', status: '65% Compliant', date: 'Sep 28, 2025' },
    { name: 'data-handling-guidelines.txt', size: '0.9 MB', status: '90% Compliant', date: 'Sep 01, 2025' },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl font-bold text-text-primary mb-6">Welcome, {userName}</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <div className="flex items-center mb-3">
            <FileTextIcon className="w-6 h-6 text-primary-blue mr-2" />
            <h3 className="text-lg font-semibold text-text-primary">Policies Analyzed</h3>
          </div>
          <p className="text-4xl font-bold text-primary-blue mb-2">{analysisSummary.compliantCount + analysisSummary.partialCount + analysisSummary.criticalCount}</p>
          <p className="text-medium-grey text-sm">Total documents processed</p>
        </Card>

        <Card>
          <div className="flex items-center mb-3">
            <CheckCircleIcon className="w-6 h-6 text-success-green mr-2" />
            <h3 className="text-lg font-semibold text-text-primary">Overall Compliance</h3>
          </div>
          <p className="text-4xl font-bold text-success-green mb-2">{analysisSummary.overallScore}%</p>
          <ProgressBar progress={analysisSummary.overallScore} />
        </Card>

        <Card>
          <div className="flex items-center mb-3">
            <XCircleIcon className="w-6 h-6 text-danger-red mr-2" />
            <h3 className="text-lg font-semibold text-text-primary">Critical Gaps</h3>
          </div>
          <p className="text-4xl font-bold text-danger-red mb-2">{analysisSummary.criticalCount}</p>
          <p className="text-medium-grey text-sm">Require immediate attention</p>
        </Card>
      </div>

      <Card className="mb-8">
        <h3 className="text-xl font-semibold text-text-primary mb-4">Last Analysis Summary</h3>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
          <div className="mb-4 sm:mb-0">
            <p className="text-lg font-medium text-text-secondary">Policy Compliance: {analysisSummary.overallScore}%</p>
            <p className="text-lg font-medium text-text-secondary">Risks Identified: {analysisSummary.criticalCount}</p>
          </div>
          <Button variant="primary" onClick={handleStartNewAnalysis}>
            Start New Analysis
          </Button>
        </div>
      </Card>

      <Card>
        <h3 className="text-xl font-semibold text-text-primary mb-4">Recent Scans</h3>
        <div className="space-y-4">
          {recentScans.map((scan, index) => (
            <div key={index} className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b pb-4 last:border-b-0 last:pb-0">
              <div className="flex items-center mb-2 sm:mb-0">
                <FileTextIcon className="w-5 h-5 text-medium-grey mr-3" />
                <div>
                  <p className="font-medium text-text-primary">{scan.name}</p>
                  <p className="text-sm text-medium-grey">{scan.size} · Last modified: {scan.date}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                scan.status.includes('78%') ? 'bg-primary-blue/10 text-primary-blue' :
                scan.status.includes('65%') ? 'bg-warning-orange/10 text-warning-orange' :
                'bg-success-green/10 text-success-green'
              }`}>
                {scan.status}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default OverviewPage;