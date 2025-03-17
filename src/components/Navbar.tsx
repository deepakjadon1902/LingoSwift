import { Languages, Shuffle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-indigo-600 text-white p-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold flex items-center gap-2">
          <Languages className="h-6 w-6" />
          TextTools
        </Link>
        <div className="flex gap-6">
          <Link to="/" className="flex items-center gap-2 hover:text-indigo-200 transition-colors">
            <Languages className="h-5 w-5" />
            Translator
          </Link>
          <Link to="/generator" className="flex items-center gap-2 hover:text-indigo-200 transition-colors">
            <Shuffle className="h-5 w-5" />
            Generator
          </Link>
        </div>
      </div>
    </nav>
  );
}