import { useState, useCallback, useEffect } from 'react';
import { Shuffle, Copy, CheckCircle2, Sparkles, RefreshCw } from 'lucide-react';

export default function Generator() {
  const [length, setLength] = useState(12);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [generatedString, setGeneratedString] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateString = useCallback(() => {
    setIsGenerating(true);
    const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    
    let chars = letters;
    if (includeNumbers) chars += numbers;
    if (includeSymbols) chars += symbols;
    
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    setGeneratedString(result);
    setTimeout(() => setIsGenerating(false), 300);
  }, [length, includeNumbers, includeSymbols]);

  useEffect(() => {
    generateString();
  }, [generateString]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedString);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="relative overflow-hidden bg-gradient-to-br from-[#1a1c2e] to-[#0f1119] rounded-2xl shadow-2xl p-8 text-white">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full filter blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="relative">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                String Generator
              </h1>
              <p className="text-gray-400 mt-1">Create secure random strings instantly</p>
            </div>
          </div>

          <div className="space-y-8">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-gray-300">String Length</label>
                <span className="text-sm px-3 py-1 rounded-full bg-gray-800/50 text-gray-400">
                  {length} characters
                </span>
              </div>
              <input
                type="range"
                min="4"
                max="1000"
                value={length}
                onChange={(e) => setLength(Number(e.target.value))}
                className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer
                          [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 
                          [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full
                          [&::-webkit-slider-thumb]:bg-gradient-to-r [&::-webkit-slider-thumb]:from-blue-500 
                          [&::-webkit-slider-thumb]:to-purple-500"
              />
            </div>

            <div className="flex flex-wrap gap-4">
              <label className="flex items-center gap-2 px-4 py-2 bg-gray-900/50 backdrop-blur-sm 
                               rounded-xl border border-gray-800 hover:border-gray-700 transition-colors">
                <input
                  type="checkbox"
                  checked={includeNumbers}
                  onChange={(e) => setIncludeNumbers(e.target.checked)}
                  className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-600 rounded bg-gray-800"
                />
                <span className="text-gray-300">Numbers</span>
              </label>
              <label className="flex items-center gap-2 px-4 py-2 bg-gray-900/50 backdrop-blur-sm 
                               rounded-xl border border-gray-800 hover:border-gray-700 transition-colors">
                <input
                  type="checkbox"
                  checked={includeSymbols}
                  onChange={(e) => setIncludeSymbols(e.target.checked)}
                  className="h-4 w-4 text-purple-500 focus:ring-purple-500 border-gray-600 rounded bg-gray-800"
                />
                <span className="text-gray-300">Symbols</span>
              </label>
            </div>

            <div className="relative group">
              <div className="p-4 bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800
                            group-hover:border-gray-700 transition-all duration-200">
                <p className={`text-lg font-mono break-all text-gray-200 transition-opacity duration-200
                             ${isGenerating ? 'opacity-50' : 'opacity-100'}`}>
                  {generatedString}
                </p>
              </div>
              <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <button
                  onClick={generateString}
                  className="p-2 text-gray-500 hover:text-white transition-colors duration-200
                           hover:bg-gray-800/50 rounded-lg"
                >
                  <RefreshCw className={`h-5 w-5 ${isGenerating ? 'animate-spin' : ''}`} />
                </button>
                <button
                  onClick={copyToClipboard}
                  className="p-2 text-gray-500 hover:text-white transition-colors duration-200
                           hover:bg-gray-800/50 rounded-lg"
                >
                  {copySuccess ? (
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  ) : (
                    <Copy className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <button
              onClick={generateString}
              className="w-full px-6 py-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 
                       text-white rounded-xl hover:shadow-lg hover:shadow-purple-500/20
                       transition-all duration-300 flex items-center justify-center gap-2
                       relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 
                            opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-center gap-2">
                <Shuffle className="h-5 w-5" />
                Generate New String
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}