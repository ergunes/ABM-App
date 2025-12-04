import React, { useRef, useEffect, useState } from 'react';
import { X, Sparkles, Clock, Volume2, StopCircle, Loader2 } from 'lucide-react';
import { GeneratedExperience, Principle, Language } from '../types';
import { UI_TEXT } from '../constants';
import { generateExerciseAudio, decodeAudioData } from '../services/geminiService';

interface ExerciseModalProps {
  isOpen: boolean;
  onClose: () => void;
  loading: boolean;
  exercise: GeneratedExperience | null;
  principle: Principle | null;
  language: Language;
}

const ExerciseModal: React.FC<ExerciseModalProps> = ({ 
  isOpen, 
  onClose, 
  loading, 
  exercise, 
  principle,
  language
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const text = UI_TEXT[language];

  // Audio State
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAudioLoading, setIsAudioLoading] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceNodeRef = useRef<AudioBufferSourceNode | null>(null);
  const bgMusicRef = useRef<HTMLAudioElement | null>(null);

  // Royalty-free ambient music URL (Meditation/Nature style)
  const BG_MUSIC_URL = "https://cdn.pixabay.com/audio/2022/05/27/audio_1808fbf07a.mp3"; 

  // Cleanup audio on unmount or close
  const stopAudio = () => {
    if (sourceNodeRef.current) {
      try {
        sourceNodeRef.current.stop();
      } catch (e) {
        // Ignore errors if already stopped
      }
      sourceNodeRef.current = null;
    }
    
    if (bgMusicRef.current) {
      bgMusicRef.current.pause();
      bgMusicRef.current.currentTime = 0;
    }
    
    if (audioContextRef.current?.state === 'running') {
      audioContextRef.current.suspend();
    }
    
    setIsPlaying(false);
    setIsAudioLoading(false);
  };

  useEffect(() => {
    if (!isOpen) {
      stopAudio();
    }
  }, [isOpen]);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
        stopAudio();
      }
    };
    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  const handlePlayAudio = async () => {
    if (!exercise) return;

    if (isPlaying) {
      stopAudio();
      return;
    }

    setIsAudioLoading(true);

    try {
      // Initialize Audio Context if needed
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      
      if (audioContextRef.current.state === 'suspended') {
        await audioContextRef.current.resume();
      }

      // 1. Generate Voice Audio via Gemini
      const audioData = await generateExerciseAudio(exercise.content, language);
      
      if (!audioData) {
        throw new Error("Failed to generate audio");
      }

      // Gemini TTS standard sample rate is 24000Hz
      const audioBuffer = await decodeAudioData(audioData, audioContextRef.current, 24000, 1);

      // 2. Setup Background Music
      if (!bgMusicRef.current) {
        bgMusicRef.current = new Audio(BG_MUSIC_URL);
        bgMusicRef.current.loop = true;
        bgMusicRef.current.volume = 0.15; // Low volume for background
      }

      // 3. Play Both
      bgMusicRef.current.play().catch(e => console.warn("Background music autoplay prevented", e));

      const source = audioContextRef.current.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioContextRef.current.destination);
      
      source.onended = () => {
        setIsPlaying(false);
        // Fade out music
        if (bgMusicRef.current) {
          const fadeOut = setInterval(() => {
             if (bgMusicRef.current && bgMusicRef.current.volume > 0.02) {
               bgMusicRef.current.volume -= 0.02;
             } else {
               clearInterval(fadeOut);
               bgMusicRef.current?.pause();
               if(bgMusicRef.current) bgMusicRef.current.volume = 0.15; // Reset volume
             }
          }, 200);
        }
      };

      source.start(0);
      sourceNodeRef.current = source;
      setIsPlaying(true);

    } catch (error) {
      console.error("Audio playback error:", error);
      alert("Ses oynatılırken bir sorun oluştu. (Audio Playback Error)"); // Simple user feedback
    } finally {
      setIsAudioLoading(false);
    }
  };

  if (!isOpen || !principle) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm transition-opacity animate-in fade-in duration-200">
      <div 
        ref={modalRef}
        className={`
          w-full max-w-lg 
          bg-white 
          rounded-3xl 
          shadow-2xl 
          overflow-hidden 
          flex flex-col 
          max-h-[90vh]
          transform transition-all duration-300 scale-100
        `}
      >
        {/* Header */}
        <div className={`p-6 ${principle.colorTheme.bg} border-b ${principle.colorTheme.border} flex justify-between items-start`}>
          <div className="flex gap-4 items-center">
            <div className={`p-3 rounded-full bg-white/50 text-gray-800`}>
              <principle.icon size={24} />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider opacity-60 font-semibold">{text.categoryLabel}</p>
              <h2 className="text-xl font-bold text-gray-900">{principle.title}</h2>
            </div>
          </div>
          <button onClick={() => { onClose(); stopAudio(); }} className="p-2 rounded-full hover:bg-black/5 text-gray-500 hover:text-gray-800 transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 overflow-y-auto relative">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
              <div className="relative">
                <div className={`w-12 h-12 rounded-full border-4 border-t-transparent ${principle.colorTheme.text.replace('text', 'border')} animate-spin`}></div>
                <div className="absolute inset-0 flex items-center justify-center">
                   <Sparkles size={16} className={`${principle.colorTheme.text}`} />
                </div>
              </div>
              <p className="text-gray-500 animate-pulse text-sm">{text.modalLoading}</p>
            </div>
          ) : exercise ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                 <h3 className="text-2xl font-semibold text-gray-800 leading-tight">{exercise.title}</h3>
                 <div className="flex items-center gap-1 text-xs font-medium px-3 py-1 bg-gray-100 rounded-full text-gray-600 shrink-0">
                    <Clock size={12} />
                    {exercise.duration}
                 </div>
              </div>

              {/* Audio Player Control */}
              <div className="flex justify-center my-4">
                <button
                  onClick={handlePlayAudio}
                  disabled={isAudioLoading}
                  className={`
                    flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all shadow-md
                    ${isPlaying 
                      ? 'bg-rose-100 text-rose-700 hover:bg-rose-200 border border-rose-200' 
                      : `${principle.colorTheme.bg.replace('50', '100')} ${principle.colorTheme.text} hover:shadow-lg`}
                  `}
                >
                  {isAudioLoading ? (
                     <Loader2 size={20} className="animate-spin" />
                  ) : isPlaying ? (
                    <StopCircle size={20} />
                  ) : (
                    <Volume2 size={20} />
                  )}
                  <span>
                    {isAudioLoading ? text.audioLoading : isPlaying ? text.stopButton : text.listenButton}
                  </span>
                </button>
              </div>
              
              <div className="prose prose-stone">
                <p className="text-gray-700 whitespace-pre-line leading-relaxed text-lg">
                  {exercise.content}
                </p>
              </div>

              <div className={`mt-6 p-4 rounded-xl ${principle.colorTheme.bg} bg-opacity-50 border border-dashed ${principle.colorTheme.border}`}>
                <p className="text-sm text-gray-600 italic text-center">
                  {text.modalQuote}
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              {text.modalError}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-gray-50 border-t flex justify-end">
          <button 
            onClick={() => { onClose(); stopAudio(); }}
            className="px-6 py-2 rounded-xl bg-gray-900 text-white font-medium hover:bg-gray-800 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            {text.modalDone}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExerciseModal;