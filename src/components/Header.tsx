
import React from 'react';
import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

const Header: React.FC = () => {
  return (
    <header className="w-full py-4 px-4 border-b bg-white/80 dark:bg-rynlette-darkPurple/70 backdrop-blur-sm transition-colors">
      <div className="max-w-screen-lg mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <img 
            src="https://i.ibb.co/Tqm7gD7b/rynlette.png" 
            alt="Rynlette Logo" 
            className="h-10 w-10"
            onError={(e) => {
              // Fallback in case the image doesn't load
              e.currentTarget.style.display = 'none';
            }}
          />
          <span className="font-montserrat font-bold text-xl text-rynlette-purple dark:text-white">Rynlette</span>
        </Link>
        
        <nav className="flex items-center space-x-1 sm:space-x-4">
          <Link 
            to="/" 
            className="px-2 sm:px-3 py-2 text-sm rounded-md hover:bg-rynlette-purple/10 transition-colors text-rynlette-purple dark:text-white"
          >
            Inicio
          </Link>
          <Link 
            to="/crear" 
            className="px-2 sm:px-3 py-2 text-sm rounded-md hover:bg-rynlette-purple/10 transition-colors text-rynlette-purple dark:text-white"
          >
            Crear
          </Link>
          <Link 
            to="/historial" 
            className="px-2 sm:px-3 py-2 text-sm rounded-md hover:bg-rynlette-purple/10 transition-colors text-rynlette-purple dark:text-white"
          >
            Historial
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
};

export default Header;
