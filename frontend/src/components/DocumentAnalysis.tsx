import React, { useState, useEffect, useRef } from 'react';
import { UploadCloud, FileText, CheckCircle, AlertTriangle, File, X, Loader2, ArrowRight } from 'lucide-react';
import api from '../api/axios';
import { motion, AnimatePresence } from 'framer-motion';

interface IExtractedSubjectMark {
  subjectName: string;
  marksObtained: number | null;
  maximumMarks: number | null;
  grade: string | null;
  confidence: number;
}

interface IDocumentAnalysis {
  _id: string;
  documentId: string;
  analysisStatus: string;
  documentType: string;
  studentName: string | null;
  rollNumber: string | null;
  institution: string | null;
  board: string | null;
  academicYear: string | null;
  subjects: IExtractedSubjectMark[];
  totalMarks: number | null;
  maximumMarks: number | null;
  percentage: number | null;
  resultStatus: string | null;
  confidence: number;
}

export default function DocumentAnalysis() {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [analysis, setAnalysis] = useState<IDocumentAnalysis | null>(null);
  const [editedAnalysis, setEditedAnalysis] = useState<IDocumentAnalysis | null>(null);
  const [isConfirming, setIsConfirming] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      const validTypes = ['image/jpeg', 'image/png', 'application/pdf'];
      if (!validTypes.includes(selectedFile.type)) {
        setError('Only JPG, PNG, and PDF files are allowed.');
        return;
      }
      if (selectedFile.size > 10 * 1024 * 1024) {
        setError('File size exceeds 10MB limit.');
        return;
      }
      setFile(selectedFile);
      setError(null);
      setSuccess(false);
      setAnalysis(null);
      setEditedAnalysis(null);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      // Simulate input change
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(e.dataTransfer.files[0]);
      if (fileInputRef.current) {
        fileInputRef.current.files = dataTransfer.files;
        const event = new Event('change', { bubbles: true });
        fileInputRef.current.dispatchEvent(event);
      }
    }
  };

  const uploadAndAnalyze = async () => {
    if (!file) return;
    setIsUploading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append('document', file);
      
      const res = await api.post('/api/documents/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      setAnalysis(res.data.analysis);
      setEditedAnalysis(res.data.analysis);
    } catch (err: any) {
      const detailMsg = err.response?.data?.details;
      const errMsg = err.response?.data?.error;
      setError(detailMsg ? `${errMsg}: ${detailMsg}` : (errMsg || err.message || 'Failed to process document'));
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubjectChange = (index: number, field: keyof IExtractedSubjectMark, value: any) => {
    if (!editedAnalysis) return;
    const newSubjects = [...editedAnalysis.subjects];
    newSubjects[index] = { ...newSubjects[index], [field]: value };
    setEditedAnalysis({ ...editedAnalysis, subjects: newSubjects });
  };

  const handleFieldChange = (field: keyof IDocumentAnalysis, value: any) => {
    if (!editedAnalysis) return;
    setEditedAnalysis({ ...editedAnalysis, [field]: value });
  };

  const confirmAnalysis = async () => {
    if (!editedAnalysis) return;
    setIsConfirming(true);
    setError(null);
    try {
      await api.post(`/api/documents/${editedAnalysis.documentId}/confirm`, editedAnalysis);
      setSuccess(true);
      setAnalysis(null);
      setEditedAnalysis(null);
      setFile(null);
    } catch (err: any) {
      setError(err.response?.data?.error || err.message || 'Failed to confirm data');
    } finally {
      setIsConfirming(false);
    }
  };

  return (
    <div className="w-full mx-auto font-sans">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <FileText className="text-blue-600" />
          AI Document Analysis
        </h1>
        <p className="text-gray-500 mt-2 text-sm">Upload your 10th, 12th, or Diploma marksheet to automatically extract academic information.</p>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-r-lg">
          <div className="flex">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      {success && (
        <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6 rounded-r-lg">
          <div className="flex">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <div className="ml-3">
              <p className="text-sm text-green-700">Document confirmed and profile updated successfully!</p>
            </div>
          </div>
        </div>
      )}

      {!analysis && !isUploading && (
        <div 
          className="border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center bg-white hover:bg-gray-50 transition-colors cursor-pointer"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            className="hidden" 
            accept="image/jpeg, image/png, application/pdf"
          />
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-blue-50 rounded-full">
              <UploadCloud className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          <h3 className="text-lg font-bold text-gray-900">Drag & Drop your document here</h3>
          <p className="text-gray-500 text-sm mt-2 mb-6">Supports JPG, PNG, and PDF (Max 10MB)</p>
          
          {file ? (
            <div className="flex flex-col items-center gap-4">
              <div className="flex items-center gap-2 bg-white px-4 py-2 border rounded-full text-sm font-medium text-gray-700 shadow-sm">
                <File className="w-4 h-4 text-blue-500" />
                {file.name}
              </div>
              <button 
                onClick={(e) => { e.stopPropagation(); uploadAndAnalyze(); }}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-xl transition-colors shadow-sm"
              >
                Upload & Analyze Document
              </button>
            </div>
          ) : (
            <button className="bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 font-bold py-2 px-6 rounded-xl shadow-sm transition-colors">
              Browse Files
            </button>
          )}
        </div>
      )}

      {isUploading && (
        <div className="bg-white rounded-2xl p-12 text-center border border-gray-200 shadow-sm flex flex-col items-center justify-center min-h-[400px]">
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-blue-500 blur-[30px] opacity-20 rounded-full animate-pulse"></div>
            <Loader2 className="h-16 w-16 text-blue-600 animate-spin relative z-10" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Analyzing Document...</h2>
          <p className="text-gray-500 max-w-sm">Our AI is extracting academic data from your document. This usually takes a few seconds.</p>
        </div>
      )}

      {editedAnalysis && !isUploading && (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="bg-slate-900 p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                Review Extracted Information
              </h2>
              <p className="text-slate-400 text-sm mt-1">Please verify the extracted information. Edit any incorrect values before confirming.</p>
            </div>
            {editedAnalysis.confidence < 0.7 && (
              <span className="bg-orange-500/20 border border-orange-500/50 text-orange-400 text-xs font-bold px-3 py-1.5 rounded flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4" /> Low Confidence Scan
              </span>
            )}
          </div>

          <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* General Info */}
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-gray-900 border-b pb-2">Document Details</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Document Type</label>
                  <select 
                    value={editedAnalysis.documentType} 
                    onChange={(e) => handleFieldChange('documentType', e.target.value)}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    <option value="TENTH_MARKSHEET">10th Marksheet</option>
                    <option value="TWELFTH_MARKSHEET">12th / PUC Marksheet</option>
                    <option value="DIPLOMA_MARKSHEET">Diploma Marksheet</option>
                    <option value="EDUCATIONAL_CERTIFICATE">Educational Certificate</option>
                    <option value="UNKNOWN">Unknown / Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Student Name</label>
                  <input 
                    type="text" 
                    value={editedAnalysis.studentName || ''} 
                    onChange={(e) => handleFieldChange('studentName', e.target.value)}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Total Marks</label>
                    <input 
                      type="number" 
                      value={editedAnalysis.totalMarks || ''} 
                      onChange={(e) => handleFieldChange('totalMarks', parseFloat(e.target.value))}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Max Marks</label>
                    <input 
                      type="number" 
                      value={editedAnalysis.maximumMarks || ''} 
                      onChange={(e) => handleFieldChange('maximumMarks', parseFloat(e.target.value))}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Percentage (%)</label>
                  <input 
                    type="number" 
                    step="0.01"
                    value={editedAnalysis.percentage || ''} 
                    onChange={(e) => handleFieldChange('percentage', parseFloat(e.target.value))}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  {editedAnalysis.totalMarks && editedAnalysis.maximumMarks && (
                    <p className="text-xs text-blue-600 mt-1 font-medium">
                      Calculated: {((editedAnalysis.totalMarks / editedAnalysis.maximumMarks) * 100).toFixed(2)}%
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Subjects */}
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-gray-900 border-b pb-2">Subject Breakdown</h3>
              
              {editedAnalysis.subjects && editedAnalysis.subjects.length > 0 ? (
                <div className="space-y-3">
                  {editedAnalysis.subjects.map((subject, index) => (
                    <div key={index} className="bg-gray-50 p-3 rounded-xl border border-gray-200 flex flex-col gap-2 relative">
                      {subject.confidence < 0.8 && (
                        <div className="absolute top-2 right-2 group cursor-help">
                          <AlertTriangle className="w-4 h-4 text-orange-500" />
                          <div className="absolute right-0 bottom-full mb-2 hidden group-hover:block bg-black text-white text-[10px] py-1 px-2 rounded whitespace-nowrap z-10">
                            Low confidence ({Math.round(subject.confidence * 100)}%)
                          </div>
                        </div>
                      )}
                      <div>
                        <label className="block text-[10px] font-bold text-gray-400 uppercase">Subject Name</label>
                        <input 
                          type="text" 
                          value={subject.subjectName}
                          onChange={(e) => handleSubjectChange(index, 'subjectName', e.target.value)}
                          className="w-full px-2 py-1 bg-white border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 outline-none"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[10px] font-bold text-gray-400 uppercase">Obtained</label>
                          <input 
                            type="number" 
                            value={subject.marksObtained || ''}
                            onChange={(e) => handleSubjectChange(index, 'marksObtained', parseFloat(e.target.value))}
                            className="w-full px-2 py-1 bg-white border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-gray-400 uppercase">Max</label>
                          <input 
                            type="number" 
                            value={subject.maximumMarks || ''}
                            onChange={(e) => handleSubjectChange(index, 'maximumMarks', parseFloat(e.target.value))}
                            className="w-full px-2 py-1 bg-white border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 bg-gray-50 rounded-xl border border-gray-200 border-dashed">
                  <p className="text-gray-500 text-sm">No subjects were confidently extracted.</p>
                </div>
              )}
            </div>
          </div>

          <div className="bg-gray-50 p-6 border-t border-gray-200 flex justify-end gap-4">
            <button 
              onClick={() => { setAnalysis(null); setEditedAnalysis(null); setFile(null); }}
              className="px-6 py-2.5 rounded-xl font-bold text-gray-600 hover:bg-gray-200 transition-colors"
              disabled={isConfirming}
            >
              Cancel
            </button>
            <button 
              onClick={confirmAnalysis}
              disabled={isConfirming}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2.5 rounded-xl shadow-sm transition-colors"
            >
              {isConfirming ? <Loader2 className="w-5 h-5 animate-spin" /> : <CheckCircle className="w-5 h-5" />}
              Confirm & Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
