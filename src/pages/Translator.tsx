import { useState, useCallback } from 'react';
import axios from 'axios';
import { Languages, Copy, Volume2, RotateCcw, History, Globe2, Sparkles, CheckCircle2 } from 'lucide-react';

const LANGUAGES = [
  { code: 'ar', name: 'Arabic' },
  { code: 'bn', name: 'Bengali' },
  { code: 'zh', name: 'Chinese' },
  { code: 'cs', name: 'Czech' },
  { code: 'nl', name: 'Dutch' },
  { code: 'es', name: 'Spanish' },
  { code: 'fi', name: 'Finnish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'el', name: 'Greek' },
  { code: 'hi', name: 'Hindi' },
  { code: 'id', name: 'Indonesian' },
  { code: 'it', name: 'Italian' },
  { code: 'ja', name: 'Japanese' },
  { code: 'ko', name: 'Korean' },
  { code: 'pl', name: 'Polish' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'ru', name: 'Russian' },
  { code: 'sv', name: 'Swedish' },
  { code: 'th', name: 'Thai' },
  { code: 'tr', name: 'Turkish' },
  { code: 'uk', name: 'Ukrainian' },
  { code: 'ur', name: 'Urdu' },
  { code: 'vi', name: 'Vietnamese' },
];

export default function Translator() {
  const [inputText, setInputText] = useState('');
  const [targetLang, setTargetLang] = useState('es');
  const [translatedText, setTranslatedText] = useState('');
  const [loading, setLoading] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const [history, setHistory] = useState<{ input: string; output: string; lang: string }[]>([]);
  const [copySuccess, setCopySuccess] = useState(false);

  const translateText = useCallback(async () => {
    if (!inputText) return;
    
    setLoading(true);
    try {
      const options = {
        method: 'POST',
        url: 'https://free-google-translator.p.rapidapi.com/external-api/free-google-translator',
        headers: {
          'content-type': 'application/json',
          'x-rapidapi-key': import.meta.env.VITE_RAPIDAPI_KEY,
          'x-rapidapi-host': 'free-google-translator.p.rapidapi.com'
        },
        params: {
          from: 'en',
          to: targetLang,
          query: inputText
        },
        data: JSON.stringify({
          translate: 'rapidapi'
        })
      };

      const response = await axios.request(options);
      const translation = response.data.translation || 'Translation failed. Please try again.';
      setTranslatedText(translation);
      
      setHistory(prev => [{
        input: inputText,
        output: translation,
        lang: LANGUAGES.find(l => l.code === targetLang)?.name || targetLang
      }, ...prev.slice(0, 4)]);
    } catch (error) {
      console.error(error);
      setTranslatedText('Translation failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [inputText, targetLang]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const speakText = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  const clearText = () => {
    setInputText('');
    setTranslatedText('');
    setCharCount(0);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="relative overflow-hidden bg-gradient-to-br from-[#1a1c2e] to-[#0f1119] rounded-2xl shadow-2xl p-8 text-white">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full filter blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="relative">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl">
              <Globe2 className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                AI-Powered Translator
              </h1>
              <p className="text-gray-400 mt-1">Translate between {LANGUAGES.length} languages with professional accuracy</p>
            </div>
          </div>
          
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-lg font-medium text-gray-200 flex items-center gap-2">
                  <Languages className="h-5 w-5 text-blue-400" />
                  English Text
                </label>
                <span className="text-sm px-3 py-1 rounded-full bg-gray-800/50 text-gray-400">
                  {charCount}/1000
                </span>
              </div>
              <div className="relative group">
                <textarea
                  className="w-full h-48 p-4 bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl
                            focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white
                            placeholder-gray-500 transition-all duration-200 resize-none"
                  value={inputText}
                  onChange={(e) => {
                    setInputText(e.target.value);
                    setCharCount(e.target.value.length);
                  }}
                  placeholder="Enter text to translate..."
                  maxLength={1000}
                />
                <button
                  onClick={clearText}
                  className="absolute bottom-3 right-3 p-2 text-gray-500 hover:text-white
                           transition-colors duration-200 opacity-0 group-hover:opacity-100"
                >
                  <RotateCcw className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-lg font-medium text-gray-200 flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-purple-400" />
                  Translation
                </label>
                <select
                  className="px-4 py-2 bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl
                           text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent
                           transition-all duration-200"
                  value={targetLang}
                  onChange={(e) => setTargetLang(e.target.value)}
                >
                  {LANGUAGES.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="relative group">
                <textarea
                  className="w-full h-48 p-4 bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl
                            text-white placeholder-gray-500 resize-none"
                  value={translatedText}
                  readOnly
                  placeholder="Translation will appear here..."
                />
                <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <button
                    onClick={() => speakText(translatedText)}
                    className="p-2 text-gray-500 hover:text-white transition-colors duration-200
                             hover:bg-gray-800/50 rounded-lg"
                    disabled={!translatedText}
                  >
                    <Volume2 className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => copyToClipboard(translatedText)}
                    className="p-2 text-gray-500 hover:text-white transition-colors duration-200
                             hover:bg-gray-800/50 rounded-lg relative"
                    disabled={!translatedText}
                  >
                    {copySuccess ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    ) : (
                      <Copy className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <button
            className="mt-8 px-8 py-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 
                      text-white rounded-xl hover:shadow-lg hover:shadow-purple-500/20
                      transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed 
                      flex items-center justify-center gap-2 w-full md:w-auto relative overflow-hidden
                      group"
            onClick={translateText}
            disabled={!inputText || loading}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 
                          opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex items-center gap-2">
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                  <span>Translating...</span>
                </div>
              ) : (
                <>
                  <Languages className="h-5 w-5" />
                  Translate Now
                </>
              )}
            </div>
          </button>

          {history.length > 0 && (
            <div className="mt-12 pt-8 border-t border-gray-800/50">
              <div className="flex items-center gap-2 mb-6 text-gray-200">
                <History className="h-5 w-5 text-purple-400" />
                <h2 className="text-xl font-semibold">Recent Translations</h2>
              </div>
              <div className="space-y-4">
                {history.map((item, index) => (
                  <div key={index} 
                       className="p-4 bg-gray-900/30 backdrop-blur-sm rounded-xl border border-gray-800/50
                                hover:border-gray-700/50 transition-colors duration-200">
                    <div className="flex justify-between text-sm text-gray-500 mb-2">
                      <span>English</span>
                      <span>{item.lang}</span>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <p className="text-gray-300">{item.input}</p>
                      <p className="text-gray-300">{item.output}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}