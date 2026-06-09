import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UploadCloudIcon, FileTextIcon, Loader2Icon } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';
import Dropdown from '../components/Dropdown';
import LoadingSpinner from '../components/LoadingSpinner';
import { JURISDICTION_OPTIONS, MOCKED_ANALYSIS_RESULT } from '../constants.tsx';
import { useAppContext } from '../App';
import { UploadedFile } from '../types';
import * as apiService from '../services/apiService';

const UploadPolicyPage: React.FC = () => {
  const navigate = useNavigate();
  const { setLatestAnalysisResult, isAnalyzing, setIsAnalyzing } = useAppContext();

  const [selectedFile, setSelectedFile] = useState<UploadedFile | null>(null);
  const [companyName, setCompanyName] = useState<string>('');
  const [jurisdiction, setJurisdiction] = useState<string>('eu-gdpr');

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const fileContent = await readFileAsText(file); // Read file content
        setSelectedFile({
          name: file.name,
          size: file.size,
          lastModified: new Date(file.lastModified).toLocaleDateString(),
          type: file.type,
          content: fileContent,
        });
      } catch (error) {
        console.error("Error reading file:", error);
        setSelectedFile(null);
      }
    }
  };

  const readFileAsText = (file: File): Promise<string | ArrayBuffer | null> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target?.result || null);
      reader.onerror = (e) => reject(e);
      reader.readAsText(file); // Or readAsDataURL for base64
    });
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const file = event.dataTransfer.files?.[0];
    if (file) {
      try {
        const fileContent = await readFileAsText(file);
        setSelectedFile({
          name: file.name,
          size: file.size,
          lastModified: new Date(file.lastModified).toLocaleDateString(),
          type: file.type,
          content: fileContent,
        });
      } catch (error) {
        console.error("Error reading file:", error);
        setSelectedFile(null);
      }
    }
  };

  const handleAnalyzePolicy = async () => {
    if (!selectedFile) {
      alert('Please upload a document first.');
      return;
    }
    setIsAnalyzing(true);
    try {
      // Simulate API call to analyze policy
      const result = await apiService.analyzePolicy(
        selectedFile.name,
        companyName,
        jurisdiction,
        selectedFile.content as string, // Assuming text content
      );
      setLatestAnalysisResult(result);
      navigate('/dashboard/analysis-results');
    } catch (error) {
      console.error('Error analyzing policy:', error);
      alert('Failed to analyze policy. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl font-bold text-text-primary mb-6">Upload Company Policy Document</h1>

      <Card className="mb-6 p-8">
        <div
          className="flex flex-col items-center justify-center border-2 border-dashed border-light-blue rounded-lg p-10 cursor-pointer text-center hover:border-accent-blue transition-colors duration-200"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => document.getElementById('file-upload-input')?.click()}
        >
          <UploadCloudIcon className="w-16 h-16 text-accent-blue mb-4" />
          <p className="text-lg font-semibold text-text-primary mb-2">Drag & Drop or Browse Files</p>
          <p className="text-sm text-medium-grey mb-4">Supports PDF, DOCX, TXT</p>
          <input
            id="file-upload-input"
            type="file"
            accept=".pdf,.docx,.txt"
            onChange={handleFileChange}
            className="hidden"
          />
          <Button variant="outline" className="text-primary-blue border-primary-blue hover:bg-light-blue">
            Browse Files
          </Button>
        </div>
      </Card>

      {selectedFile && (
        <Card className="mb-6 p-6">
          <h2 className="text-xl font-semibold text-text-primary mb-4">Selected Document</h2>
          <div className="flex items-center justify-between bg-gray-50 p-4 rounded-md border border-gray-200">
            <div className="flex items-center">
              <FileTextIcon className="w-6 h-6 text-primary-blue mr-3" />
              <div>
                <p className="font-medium text-text-primary">{selectedFile.name}</p>
                <p className="text-sm text-medium-grey">
                  {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB · Last modified: {selectedFile.lastModified}
                </p>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-text-primary mb-4">Document Metadata</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Company Name"
                placeholder="Enter company name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
              <Dropdown
                label="Jurisdiction"
                options={JURISDICTION_OPTIONS}
                value={jurisdiction}
                onChange={(e) => setJurisdiction(e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-end mt-6">
            <Button
              variant="primary"
              onClick={handleAnalyzePolicy}
              disabled={isAnalyzing || !selectedFile || !companyName}
              className="px-8 py-3"
            >
              {isAnalyzing ? (
                <>
                  <Loader2Icon className="animate-spin mr-2 h-5 w-5" />
                  Analyzing Policy...
                </>
              ) : (
                'Analyze Policy'
              )}
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};

export default UploadPolicyPage;