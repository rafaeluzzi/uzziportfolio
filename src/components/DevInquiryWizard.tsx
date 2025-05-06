import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface DevInquiryWizardProps {
  projectType: string;
  onClose: () => void;
}

const DevInquiryWizard: React.FC<DevInquiryWizardProps> = ({ projectType, onClose }) => {
  const [step, setStep] = useState(0);
  const [mode, setMode] = useState<'idea' | 'problem' | null>(null);
  const [inputText, setInputText] = useState('');
  const [summary, setSummary] = useState('');
  const [classification, setClassification] = useState('');
  const [selectedInspiration, setSelectedInspiration] = useState<string | null>(null);
  const [finalAnswers, setFinalAnswers] = useState({
    hireType: '',
    budget: '',
    timeline: '',
  });

  const handleInputSubmit = () => {
    // Simulated AI Summary & Classification
    setSummary(`• ${inputText.slice(0, 50)}...`);
    setClassification('Likely a full-stack app with auth');
    setStep(1);
  };

  const handleInspirationSelect = (label: string) => {
    setSelectedInspiration(label);
    setStep(2);
  };

  const handleFinalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFinalAnswers((prev) => ({ ...prev, [name]: value }));
  };

  const handleFinalSubmit = () => {
    const payload = {
      mode,
      inputText,
      summary,
      classification,
      selectedInspiration,
      ...finalAnswers,
    };
    console.log('Inquiry submitted:', payload);
    onClose();
  };

  const sectionMotion = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -30 },
    transition: { duration: 0.5, ease: 'easeInOut' },
  };

  return (
    <motion.div
      className="text-left p-6 space-y-6 text-light-300"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div key="step0" {...sectionMotion}>
            <h2 className="text-xl font-bold text-primary-400 mb-4">Smart Inquiry Assistant</h2>
            <div className="flex gap-4 mb-4">
              <button onClick={() => setMode('idea')} className={`px-4 py-2 rounded bg-dark-100 ${mode === 'idea' ? 'border border-primary-400' : ''}`}>I have an idea</button>
              <button onClick={() => setMode('problem')} className={`px-4 py-2 rounded bg-dark-100 ${mode === 'problem' ? 'border border-primary-400' : ''}`}>I have a problem</button>
            </div>
            {mode && (
              <>
                <textarea
                  className="w-full bg-dark-100 rounded p-3 border border-dark-200"
                  placeholder={`Describe your ${mode}...`}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  rows={5}
                />
                <button
                  onClick={handleInputSubmit}
                  className="mt-4 bg-primary-500 hover:bg-primary-400 text-dark-900 px-4 py-2 rounded"
                >
                  Next →
                </button>
              </>
            )}
          </motion.div>
        )}

        {step === 1 && (
          <motion.div key="step1" {...sectionMotion}>
            <h2 className="text-xl font-bold text-primary-400 mb-4">Similar Product Inspiration</h2>
            <p className="mb-4">We analyzed your input and found these matches:</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {["SaaS Dashboard", "Booking App", "Marketplace"].map((label) => (
                <button
                  key={label}
                  onClick={() => handleInspirationSelect(label)}
                  className="bg-dark-100 hover:border-primary-400 border border-dark-200 rounded-lg p-4 text-left"
                >
                  <div className="text-lg font-semibold text-primary-300">{label}</div>
                  <div className="text-sm mt-1 text-light-400">Example project structure & features</div>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div key="step2" {...sectionMotion}>
            <h2 className="text-xl font-bold text-primary-400 mb-4">Smart AI Interview</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Type of hire (freelancer, agency...)</label>
                <input
                  type="text"
                  name="hireType"
                  value={finalAnswers.hireType}
                  onChange={handleFinalChange}
                  className="w-full p-2 bg-dark-100 rounded border border-dark-200"
                  placeholder="e.g. Freelancer, in-house dev"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Budget range</label>
                <input
                  type="text"
                  name="budget"
                  value={finalAnswers.budget}
                  onChange={handleFinalChange}
                  className="w-full p-2 bg-dark-100 rounded border border-dark-200"
                  placeholder="e.g. $2,000 – $5,000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Timeline or launch goal</label>
                <input
                  type="text"
                  name="timeline"
                  value={finalAnswers.timeline}
                  onChange={handleFinalChange}
                  className="w-full p-2 bg-dark-100 rounded border border-dark-200"
                  placeholder="e.g. Launch in 4–6 weeks"
                />
              </div>
            </div>
            <button
              onClick={handleFinalSubmit}
              className="mt-6 bg-secondary-500 hover:bg-secondary-400 text-dark-900 px-4 py-2 rounded"
            >
              Submit Inquiry ✅
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default DevInquiryWizard;

