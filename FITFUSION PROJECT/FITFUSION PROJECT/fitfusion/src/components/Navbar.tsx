
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Dumbbell } from 'lucide-react';
import LoginButtons from './LoginButtons';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="sticky top-0 w-full bg-fitDark/90 backdrop-blur-sm z-50 border-b border-fitOrange/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Dumbbell className="h-8 w-8 text-fitOrange" />
              <span className="text-xl font-bold text-white">FitFusion</span>
            </Link>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-6">
              <Link to="/" className="text-white hover:text-fitOrange font-medium transition-colors">
                Home
              </Link>
              <Link to="/fitness-plan" className="text-white hover:text-fitOrange font-medium transition-colors">
                Fitness Plan
              </Link>
              <Link to="/workouts" className="text-white hover:text-fitOrange font-medium transition-colors">
                Workouts
              </Link>
              <Link to="/diet" className="text-white hover:text-fitOrange font-medium transition-colors">
                Diet
              </Link>
              <Link to="/exercises" className="text-white hover:text-fitOrange font-medium transition-colors">
                Exercises
              </Link>
              <Link to="/about" className="text-white hover:text-fitOrange font-medium transition-colors">
                About
              </Link>
              <Link to="/subscription" className="fitness-btn bg-fitOrange text-white hover:bg-orange-600 px-4 py-2">
                Subscribe
              </Link>
            </div>
          </div>
          
          {/* Login Buttons */}
          <LoginButtons />
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-fitOrange focus:outline-none"
              onClick={toggleMenu}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-fitDark">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col">
            <Link 
              to="/" 
              className="text-white hover:bg-fitDark hover:text-fitOrange px-3 py-2 rounded-md font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/fitness-plan" 
              className="text-white hover:bg-fitDark hover:text-fitOrange px-3 py-2 rounded-md font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Fitness Plan
            </Link>
            <Link 
              to="/workouts" 
              className="text-white hover:bg-fitDark hover:text-fitOrange px-3 py-2 rounded-md font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Workouts
            </Link>
            <Link 
              to="/diet" 
              className="text-white hover:bg-fitDark hover:text-fitOrange px-3 py-2 rounded-md font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Diet
            </Link>
            <Link 
              to="/exercises" 
              className="text-white hover:bg-fitDark hover:text-fitOrange px-3 py-2 rounded-md font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Exercises
            </Link>
            <Link 
              to="/about" 
              className="text-white hover:bg-fitDark hover:text-fitOrange px-3 py-2 rounded-md font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              to="/subscription" 
              className="text-white bg-fitOrange hover:bg-orange-600 px-3 py-2 rounded-md font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Subscribe
            </Link>
            {/* Add login buttons for mobile */}
            <div className="pt-2 border-t border-gray-700 mt-2">
              <button 
                className="w-full text-left text-white hover:bg-fitDark hover:text-fitOrange px-3 py-2 rounded-md font-medium"
                onClick={() => {
                  setIsMenuOpen(false);
                  // We'll let the LoginButtons component handle this
                }}
              >
                User Profile
              </button>
              <button 
                className="w-full text-left text-white hover:bg-fitDark hover:text-fitOrange px-3 py-2 rounded-md font-medium"
                onClick={() => {
                  setIsMenuOpen(false);
                  // We'll let the LoginButtons component handle this
                }}
              >
                Admin Login
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
