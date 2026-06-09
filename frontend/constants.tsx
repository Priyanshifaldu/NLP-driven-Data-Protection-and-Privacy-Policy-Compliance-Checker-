import React from 'react';
import {
  FileTextIcon,
  UploadIcon,
  BarChart2Icon,
  LightbulbIcon,
  ActivityIcon,
} from 'lucide-react';
import { SidebarItem, SelectOption, PolicyAnalysisResult } from './types';

export const SIDEBAR_ITEMS: SidebarItem[] = [
  { id: 'overview', name: 'Overview', icon: React.createElement(FileTextIcon, { className: 'w-5 h-5' }), path: '/dashboard/overview' },
  { id: 'upload-policy', name: 'Upload Policy', icon: React.createElement(UploadIcon, { className: 'w-5 h-5' }), path: '/dashboard/upload-policy' },
  { id: 'analysis-results', name: 'Analysis Results', icon: React.createElement(BarChart2Icon, { className: 'w-5 h-5' }), path: '/dashboard/analysis-results' },
  { id: 'recommendations', name: 'Recommendations', icon: React.createElement(LightbulbIcon, { className: 'w-5 h-5' }), path: '/dashboard/recommendations' },
  { id: 'model-performance', name: 'Model Performance', icon: React.createElement(ActivityIcon, { className: 'w-5 h-5' }), path: '/dashboard/model-performance' },
];

export const JURISDICTION_OPTIONS: SelectOption[] = [
  { value: 'eu-gdpr', label: 'EU - GDPR' },
  { value: 'ccpa', label: 'US - CCPA' },
  { value: 'lgpd', label: 'Brazil - LGPD' },
];

export const MOCKED_ANALYSIS_RESULT_INITIAL: PolicyAnalysisResult = {
  overallScore: 0,
  compliantCount: 0,
  partialCount: 0,
  criticalCount: 0,
  complianceDistribution: { compliant: 0, nonCompliant: 0, partial: 0 },
  detectedComplianceAreas: [],
  gdprRuleViolations: [],
  recommendations: '',
  fileName: '',
  uploadedAt: '',
};

export const MOCKED_ANALYSIS_RESULT: PolicyAnalysisResult = {
  overallScore: 72,
  compliantCount: 12,
  partialCount: 8,
  criticalCount: 5,
  complianceDistribution: { compliant: 42, nonCompliant: 30, partial: 28 },
  detectedComplianceAreas: [
    { clause: 'Article 5(1)(a) · Lawfulness', status: 'Compliant', confidence: 92 },
    { clause: 'Article 5(1)(b) · Purpose Limitation', status: 'Non-Compliant', confidence: 88 },
    { clause: 'Article 5(1)(c) · Data Minimization', status: 'Partial', confidence: 76 },
    { clause: 'Article 6(1) · Lawful Basis', status: 'Compliant', confidence: 94 },
    { clause: 'Article 7 · Consent', status: 'Non-Compliant', confidence: 91 },
    { clause: 'Article 13 · Information Provided', status: 'Partial', confidence: 82 },
  ],
  gdprRuleViolations: [
    { id: '1', description: 'Article 5(1)(b): Purpose Limitation - Non-compliant' },
    { id: '2', description: 'Article 7: Consent - Missing explicit consent mechanism' },
    { id: '3', description: 'Article 13(2)(a): Storage Period - Not clearly specified' },
    { id: '4', description: 'Article 15: Right of Access - Procedure not documented' },
    { id: '5', description: 'Article 17: Right to Erasure - Implementation unclear' },
  ],
  recommendations: `
    Based on the analysis of your privacy policy document, here are the recommended changes to achieve GDPR compliance:

    1.  **Article 5(1)(b) - Purpose Limitation**
        *   **Issue:** Purpose of data processing is not clearly specified.
        *   **Recommendation:** Add explicit statement: "We process personal data for the following specific purposes: [list purposes]. We will not use your data for purposes incompatible with these stated purposes without obtaining your consent."

    2.  **Article 7 - Consent**
        *   **Issue:** Missing explicit consent mechanism.
        *   **Recommendation:** Add explicit consent clause under Article 6(1)(a): "We process your personal data based on your explicit consent. You have the right to withdraw your consent at any time by contacting us at [contact information]."

    3.  **Article 13(2)(a) - Storage Period**
        *   **Issue:** Data retention period not clearly specified.
        *   **Recommendation:** Include specific retention periods: "We will retain your personal data for the duration of our contractual relationship and for [X] years thereafter, or as required by applicable law."

    4.  **Article 15 - Right of Access**
        *   **Issue:** Procedure not documented.
        *   **Recommendation:** Clearly outline the procedure for data subjects to exercise their right to access personal data, including how to make a request and the timeframe for response.

    5.  **Article 17 - Right to Erasure**
        *   **Issue:** Implementation unclear.
        *   **Recommendation:** Detail the process for data subjects to request erasure of their personal data, specifying any exceptions and the steps taken to fulfill such requests.

    **Additional Recommendations:**
    - Implement a privacy-by-design framework.
    - Conduct regular data protection impact assessments (DPIAs).
    - Appoint a Data Protection Officer (DPO) if required.
    - Establish data breach notification procedures.
    - Update cookie consent mechanisms.
  `,
  fileName: 'privacy-policy-draft.pdf',
  uploadedAt: 'Oct 12, 2025',
};