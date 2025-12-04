import React, { useState } from 'react';
import { getPrinciples, UI_TEXT } from './constants';
import PrincipleCard from './components/PrincipleCard';
import ExerciseModal from './components/ExerciseModal';
import { Principle, GeneratedExperience, Language } from './types';
import { generateExercise } from './services/geminiService';
import { BrainCircuit, Globe } from 'lucide-react';

// Separated component for cleaner structure
const LanguageSelector: React.FC<{ 
  current: Language; 
  onChange: (lang: Language) => void 
}> = ({ current, onChange }) => (
  <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm p-1.5 rounded-full border border-gray-200 shadow-sm">
    <Globe size={16} className="text-gray-400 ml-2" />
    <div className="flex">
      {(['tr', 'en', 'de'] as Language[]).map((lang) => (
        <button
          key={lang}
          onClick={() => onChange(lang)}
          className={`
            px-3 py-1 rounded-full text-xs font-semibold transition-all duration-200
            ${current === lang 
              ? 'bg-indigo-600 text-white shadow-md' 
              : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'}
          `}
        >
          {lang.toUpperCase()}
        </button>
      ))}
    </div>
  </div>
);

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>('tr');
  const [selectedPrinciple, setSelectedPrinciple] = useState<Principle | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [exercise, setExercise] = useState<GeneratedExperience | null>(null);

  const text = UI_TEXT[language];
  const principles = getPrinciples(language);

  const handleCardClick = async (principle: Principle) => {
    setSelectedPrinciple(principle);
    setModalOpen(true);
    setLoading(true);
    setExercise(null);

    try {
      const result = await generateExercise(principle, language);
      setExercise(result);
    } catch (error) {
      console.error("Failed to fetch experience", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setTimeout(() => {
        setSelectedPrinciple(null);
        setExercise(null);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 pb-12 selection:bg-blue-100">
      
      {/* Header Section */}
      <header className="bg-white border-b border-gray-200 pt-10 pb-16 px-4 mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5 transform rotate-12">
            <BrainCircuit size={200} />
        </div>
        
        {/* Top Bar with Language Switcher */}
        <div className="absolute top-4 right-4 z-20">
          <LanguageSelector current={language} onChange={setLanguage} />
        </div>
        
        <div className="max-w-6xl mx-auto text-center relative z-10 mt-6">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 tracking-tight mb-3">
            {text.headerTitle}
          </h1>
          <h2 className="text-2xl md:text-3xl font-light text-slate-600 mb-6">
            {text.headerSubtitle}
          </h2>
          <p className="max-w-2xl mx-auto text-gray-500 text-sm md:text-base leading-relaxed">
            {text.headerDesc}
          </p>
        </div>
      </header>

      {/* Main Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {principles.map((principle) => (
            <PrincipleCard 
              key={principle.id} 
              principle={principle} 
              onClick={handleCardClick}
              hoverText={text.clickForAI}
            />
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 text-center text-gray-400 text-xs pb-8">
        <p>{text.footerInfo}</p>
        <p className="mt-2">{text.footerPower}</p>
      </footer>

      {/* Modal */}
      <ExerciseModal 
        isOpen={modalOpen} 
        onClose={handleCloseModal} 
        loading={loading}
        exercise={exercise}
        principle={selectedPrinciple}
        language={language}
      />
    </div>
  );
};

export default App;