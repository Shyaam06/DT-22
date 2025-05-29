
import React from 'react';
import { Link } from 'react-router-dom';
import { Dumbbell, Mail, Phone, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-fitDark text-white mt-20 border-t border-fitOrange/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Dumbbell className="h-8 w-8 text-fitOrange" />
              <span className="text-xl font-bold">FitFusion</span>
            </div>
            <p className="text-gray-300 mb-4">
              Your complete fitness and nutrition solution for a healthier, stronger you.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-fitOrange">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-fitOrange">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-fitOrange">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4 text-fitOrange">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-fitOrange">Home</Link>
              </li>
              <li>
                <Link to="/workouts" className="text-gray-300 hover:text-fitOrange">Workouts</Link>
              </li>
              <li>
                <Link to="/diet" className="text-gray-300 hover:text-fitOrange">Diet Plans</Link>
              </li>
              <li>
                <Link to="/exercises" className="text-gray-300 hover:text-fitOrange">Exercises</Link>
              </li>
              <li>
                <Link to="/subscription" className="text-gray-300 hover:text-fitOrange">Subscribe</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4 text-fitOrange">Programs</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/workouts" className="text-gray-300 hover:text-fitOrange">HIIT Training</Link>
              </li>
              <li>
                <Link to="/workouts" className="text-gray-300 hover:text-fitOrange">Strength Training</Link>
              </li>
              <li>
                <Link to="/workouts" className="text-gray-300 hover:text-fitOrange">Yoga Classes</Link>
              </li>
              <li>
                <Link to="/workouts" className="text-gray-300 hover:text-fitOrange">Cardio Workouts</Link>
              </li>
              <li>
                <Link to="/workouts" className="text-gray-300 hover:text-fitOrange">Home Fitness</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4 text-fitOrange">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Phone className="h-5 w-5 text-fitOrange mr-2 mt-0.5" />
                <span>7200954951</span>
              </li>
              <li className="flex items-start">
                <Mail className="h-5 w-5 text-fitOrange mr-2 mt-0.5" />
                <span>info@fitfusion.com</span>
              </li>
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-fitOrange mr-2 mt-0.5" />
                <span>123 Fitness Street, Workout City</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">© 2025 FitFusion. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="#" className="text-gray-400 hover:text-fitOrange text-sm">Privacy Policy</Link>
            <Link to="#" className="text-gray-400 hover:text-fitOrange text-sm">Terms of Service</Link>
            <Link to="#" className="text-gray-400 hover:text-fitOrange text-sm">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
