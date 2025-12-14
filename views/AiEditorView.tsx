import React, { useState, useRef } from 'react';
import { Sparkles, Upload, Loader2, X } from 'lucide-react';
import { editImageWithGemini } from '../services/geminiService';

export const AiEditorView: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { 
          setError("File too large. Please select an image under 5MB.");
          return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setResultImage(null);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    if (!selectedImage || !prompt) return;

    setIsLoading(true);
    setError(null);

    try {
      const [mimeType, base64Data] = selectedImage.split(';base64,');
      const cleanMimeType = mimeType.replace('data:', '');
      
      const generatedImage = await editImageWithGemini(base64Data, prompt, cleanMimeType);
      setResultImage(generatedImage);
    } catch (err) {
      setError("Failed to generate image. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#111116] text-white safe-pb-nav font-sans px-6 pt-safe-top overflow-hidden relative">
       {/* Background */}
       <div className="absolute top-[-200px] left-[-100px] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none"></div>

      <header className="mb-8 mt-6 relative z-10 animate-fade-in">
        <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-xl">
                <Sparkles className="text-white" size={20} />
            </div>
            <h1 className="text-2xl font-bold">Magic Editor</h1>
        </div>
        <p className="text-gray-400 text-sm font-medium leading-relaxed">Powered by Gemini 2.5 Flash Image. Upload an image and describe how you want to change it.</p>
      </header>

      {/* Upload Area */}
      <div className="mb-8 relative z-10 animate-slide-up">
        {!selectedImage ? (
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-white/10 bg-white/5 rounded-[2rem] h-72 flex flex-col items-center justify-center cursor-pointer hover:border-purple-500/50 hover:bg-white/10 transition-all group"
          >
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Upload size={28} className="text-gray-400 group-hover:text-white" />
            </div>
            <span className="text-gray-300 font-bold text-lg mb-1">Tap to upload</span>
            <span className="text-gray-500 text-xs font-medium">JPG, PNG up to 5MB</span>
          </div>
        ) : (
          <div className="relative rounded-[2rem] overflow-hidden bg-black/40 border border-white/10 shadow-2xl">
             <img src={resultImage || selectedImage} alt="Preview" className="w-full h-auto max-h-[400px] object-contain" />
             
             {/* Clear Button */}
             <button 
                onClick={() => {
                    setSelectedImage(null);
                    setResultImage(null);
                    setPrompt('');
                }}
                className="absolute top-3 right-3 p-2 bg-black/50 backdrop-blur-md rounded-full hover:bg-black/80 text-white transition-colors border border-white/10"
             >
                <X size={18} />
             </button>

             {resultImage && (
                 <div className="absolute bottom-4 left-4 bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-1.5 rounded-full text-xs font-bold shadow-lg flex items-center gap-2">
                     <Sparkles size={12} />
                     AI Generated
                 </div>
             )}
          </div>
        )}
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          accept="image/*" 
          className="hidden" 
        />
      </div>

      {/* Input Area */}
      <div className="space-y-4 relative z-10 animate-slide-up stagger-1">
        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Instructions</label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="E.g., Make it look like a cyberpunk city, Add a cat in the corner..."
            className="w-full glass-panel rounded-2xl p-5 text-white font-medium focus:outline-none focus:ring-2 focus:ring-purple-500/50 min-h-[120px] placeholder-gray-600 resize-none transition-all"
          />
        </div>

        {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-200 p-4 rounded-xl text-sm font-medium flex items-center gap-2">
                <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                {error}
            </div>
        )}

        <button
          onClick={handleGenerate}
          disabled={!selectedImage || !prompt || isLoading}
          className={`w-full py-4 rounded-[1.2rem] font-bold text-lg flex items-center justify-center gap-2 transition-all
            ${!selectedImage || !prompt || isLoading 
              ? 'bg-white/5 text-gray-500 cursor-not-allowed border border-white/5' 
              : 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-xl shadow-purple-900/40 hover:scale-[1.02] active:scale-[0.98]'
            }
          `}
        >
          {isLoading ? (
            <>
              <Loader2 className="animate-spin" />
              Thinking...
            </>
          ) : (
            <>
              <Sparkles size={20} />
              Generate Magic
            </>
          )}
        </button>
      </div>
    </div>
  );
};