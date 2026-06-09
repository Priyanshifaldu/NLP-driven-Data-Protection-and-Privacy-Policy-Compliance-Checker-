import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import { CheckCircleIcon, AlertTriangleIcon, XCircleIcon, DownloadIcon, Share2Icon } from 'lucide-react';
import Card from '../components/Card';
import ProgressBar from '../components/ProgressBar';
import Button from '../components/Button';
import { useAppContext } from '../App';
import { ComplianceArea, RuleViolation } from '../types';
import LoadingSpinner from '../components/LoadingSpinner';

const COLORS = ['#10B981', '#EF4444', '#F59E0B']; // Compliant, Non-Compliant, Partial

const AnalysisResultsPage: React.FC = () => {
  const navigate = useNavigate();
  const { latestAnalysisResult, isAnalyzing } = useAppContext();

  const analysis = latestAnalysisResult;

  const data = analysis
    ? [
        { name: 'Compliant', value: analysis.complianceDistribution.compliant, color: COLORS[0] },
        { name: 'Non-Compliant', value: analysis.complianceDistribution.nonCompliant, color: COLORS[1] },
        { name: 'Partial', value: analysis.complianceDistribution.partial, color: COLORS[2] },
      ]
    : [];

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }: {
    cx: number;
    cy: number;
    midAngle: number;
    innerRadius: number;
    outerRadius: number;
    percent: number;
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
    const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);
    if (percent === 0) return null;
    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        className="font-semibold text-xs"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const handleGenerateRecommendations = () => {
    navigate('/dashboard/recommendations');
  };

  if (isAnalyzing) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-160px)]">
        <LoadingSpinner />
        <p className="mt-4 text-lg text-text-secondary">Analyzing your policy document...</p>
        <p className="text-sm text-medium-grey">This may take a few moments.</p>
      </div>
    );
  }

  if (!analysis || analysis.overallScore === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-160px)] text-center p-4">
        <p className="text-xl text-text-secondary mb-4">No analysis results available yet.</p>
        <p className="text-md text-medium-grey mb-6">Please upload and analyze a policy document first.</p>
        <Button onClick={() => navigate('/dashboard/upload-policy')} variant="primary">
          Upload Policy
        </Button>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-text-primary">Compliance Analysis Results</h1>
        <div className="flex space-x-3">
          <Button variant="outline" size="sm" className="flex items-center text-primary-blue border-primary-blue hover:bg-light-blue">
            <DownloadIcon className="w-4 h-4 mr-2" /> Download PDF
          </Button>
          <Button variant="ghost" size="sm" className="flex items-center text-medium-grey hover:bg-light-blue hover:text-primary-blue">
            <Share2Icon className="w-4 h-4 mr-2" /> Share
          </Button>
        </div>
      </div>

      {/* Score + Pie */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <h3 className="text-xl font-semibold text-text-primary mb-4">Overall Compliance Score</h3>
          <div className="flex flex-col items-center justify-center py-6">
            <p className="text-6xl font-extrabold text-primary-blue mb-4">{analysis.overallScore}%</p>
            <ProgressBar progress={analysis.overallScore} className="w-full max-w-xs" />
            <div className="flex justify-around w-full max-w-xs mt-6 text-center">
              <div className="flex items-center flex-col">
                <CheckCircleIcon className="w-6 h-6 text-success-green mb-1" />
                <span className="font-bold text-lg">{analysis.compliantCount}</span>
                <span className="text-sm text-medium-grey">Compliant</span>
              </div>
              <div className="flex items-center flex-col">
                <AlertTriangleIcon className="w-6 h-6 text-warning-orange mb-1" />
                <span className="font-bold text-lg">{analysis.partialCount}</span>
                <span className="text-sm text-medium-grey">Partial</span>
              </div>
              <div className="flex items-center flex-col">
                <XCircleIcon className="w-6 h-6 text-danger-red mb-1" />
                <span className="font-bold text-lg">{analysis.criticalCount}</span>
                <span className="text-sm text-medium-grey">Critical</span>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <h3 className="text-xl font-semibold text-text-primary mb-4">Compliance Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={renderCustomizedLabel}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Legend
                verticalAlign="bottom"
                align="center"
                wrapperStyle={{ paddingTop: '20px' }}
                formatter={(value, entry) => (
                  <span className="text-sm text-text-secondary">
                    {entry?.payload?.name}: {entry?.payload?.value}%
                  </span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Detected Compliance Areas */}
      <Card className="mb-8">
        <h3 className="text-xl font-semibold text-text-primary mb-4">Detected Compliance Areas</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-medium-grey uppercase tracking-wider">Clause</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-medium-grey uppercase tracking-wider">Compliance Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-medium-grey uppercase tracking-wider">Confidence %</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {(analysis.detectedComplianceAreas || []).map((area: ComplianceArea, index: number) => (
                <tr key={`clause-${index}`}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-text-primary max-w-md truncate">
                    {area.clause || '—'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        area.status === 'Compliant'
                          ? 'bg-success-green/10 text-success-green'
                          : area.status === 'Non-Compliant'
                          ? 'bg-danger-red/10 text-danger-red'
                          : 'bg-warning-orange/10 text-warning-orange'
                      }`}
                    >
                      {area.status || 'Unknown'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-medium-grey">
                    {area.confidence ? `${area.confidence}%` : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* GDPR Rule Violations */}
      <Card className="mb-8">
        <h3 className="text-xl font-semibold text-text-primary mb-4">GDPR Rule Violations</h3>
        <div className="space-y-4">
          {(analysis.gdprRuleViolations || []).map((violation: RuleViolation, index: number) => {
            const text =
              violation.description ||
              violation.clause ||
              violation.sources?.join(', ') ||
              'No specific violation text provided.';
            return (
              <div
                key={`violation-${index}`}
                className="flex items-center bg-red-50 p-4 rounded-md border border-danger-red"
              >
                <XCircleIcon className="w-5 h-5 text-danger-red mr-3 flex-shrink-0" />
                <p className="text-sm text-danger-red break-words">{text}</p>
              </div>
            );
          })}
          {(!analysis.gdprRuleViolations || analysis.gdprRuleViolations.length === 0) && (
            <p className="text-sm text-medium-grey italic">No GDPR rule violations detected.</p>
          )}
        </div>
        <div className="mt-6 text-right">
          <Button variant="primary" onClick={handleGenerateRecommendations}>
            Generate Recommendations
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default AnalysisResultsPage;
