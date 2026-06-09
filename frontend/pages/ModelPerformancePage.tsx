
import React from 'react';
import Card from '../components/Card';
import { ActivityIcon } from 'lucide-react';

const ModelPerformancePage: React.FC = () => {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="flex items-center mb-6">
        <ActivityIcon className="w-8 h-8 text-accent-blue mr-3" />
        <h1 className="text-3xl font-bold text-text-primary">Model Performance</h1>
      </div>

      <Card className="mb-6 p-6">
        <p className="text-text-secondary">
          This section would display various metrics related to the underlying NLP Engine's performance,
          such as accuracy, precision, recall, and processing speed.
        </p>
        <p className="mt-4 text-medium-grey text-sm">
          (Content to be developed based on specific model evaluation data.)
        </p>
        <ul className="list-disc list-inside mt-4 text-medium-grey">
            <li>Accuracy of compliance detection</li>
            <li>Response time for analysis</li>
            <li>Consistency across document types</li>
            <li>Feedback loops for continuous improvement</li>
        </ul>
      </Card>

      <Card className="p-6">
        <h3 className="text-xl font-semibold text-text-primary mb-4">Future Enhancements</h3>
        <p className="text-text-secondary">
          We plan to include interactive charts and detailed reports on model evolution and fine-tuning.
        </p>
      </Card>
    </div>
  );
};

export default ModelPerformancePage;
