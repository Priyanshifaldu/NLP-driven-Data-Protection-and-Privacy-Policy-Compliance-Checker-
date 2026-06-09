import React from 'react';
import { DownloadIcon, SendIcon, LightbulbIcon } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import { useAppContext } from '../App';
import { MOCKED_ANALYSIS_RESULT } from '../constants.tsx';
import Markdown from 'react-markdown'; // Use a library for markdown rendering
import remarkGfm from 'remark-gfm'; // For GitHub Flavored Markdown

const RecommendationsPage: React.FC = () => {
  const { latestAnalysisResult } = useAppContext();
  const recommendations = latestAnalysisResult?.recommendations || MOCKED_ANALYSIS_RESULT.recommendations;

  const handleDownloadReport = () => {
    // Logic to generate and download a PDF report
    alert('Downloading Final Report PDF...');
  };

  const handleSendToLegalTeam = () => {
    // Logic to send recommendations (e.g., via email or internal system)
    alert('Sending to Legal Team...');
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="flex items-center mb-6">
        <LightbulbIcon className="w-8 h-8 text-accent-blue mr-3" />
        <h1 className="text-3xl font-bold text-text-primary">AI-Generated Compliance Recommendations</h1>
      </div>

      <Card className="mb-8 p-6">
        <h3 className="text-xl font-semibold text-text-primary mb-4">Suggested Policy Improvements</h3>
        <div className="prose max-w-none text-text-secondary text-base leading-relaxed">
          <Markdown remarkPlugins={[remarkGfm]}>
            {recommendations}
          </Markdown>
        </div>

        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 mt-8 justify-end">
          <Button variant="primary" onClick={handleDownloadReport} className="flex items-center">
            <DownloadIcon className="w-4 h-4 mr-2" /> Download Final Report (PDF)
          </Button>
          <Button variant="outline" onClick={handleSendToLegalTeam} className="flex items-center text-primary-blue border-primary-blue hover:bg-light-blue">
            <SendIcon className="w-4 h-4 mr-2" /> Send to Legal Team
          </Button>
        </div>
      </Card>

      <Card>
        <h3 className="text-xl font-semibold text-text-primary mb-4">Next Steps</h3>
        <ul className="space-y-4">
          <li className="flex items-start">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary-blue text-white font-bold text-sm flex-shrink-0 mr-3">
              1
            </div>
            <div>
              <p className="font-semibold text-text-primary">Review Recommendations</p>
              <p className="text-medium-grey text-sm">Have your legal team review the AI-generated recommendations</p>
            </div>
          </li>
          <li className="flex items-start">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-light-blue text-primary-blue font-bold text-sm flex-shrink-0 mr-3">
              2
            </div>
            <div>
              <p className="font-semibold text-text-primary">Update Privacy Policy</p>
              <p className="text-medium-grey text-sm">Implement the suggested changes in your policy document</p>
            </div>
          </li>
          <li className="flex items-start">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-light-blue text-primary-blue font-bold text-sm flex-shrink-0 mr-3">
              3
            </div>
            <div>
              <p className="font-semibold text-text-primary">Re-analyze Updated Policy</p>
              <p className="text-medium-grey text-sm">Upload the revised document to verify compliance improvements</p>
            </div>
          </li>
        </ul>
      </Card>
    </div>
  );
};

export default RecommendationsPage;