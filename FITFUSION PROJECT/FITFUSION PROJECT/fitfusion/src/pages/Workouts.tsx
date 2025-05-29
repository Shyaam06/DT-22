
import React, { useState } from 'react';
import { ArrowRight, Play, Clock, Dumbbell, Target } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

interface Workout {
  id: number;
  title: string;
  type: string;
  image: string;
  duration: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  benefits: string[];
  muscles: string[];
}

const workouts: Workout[] = [
  {
    id: 1,
    title: "HIIT Fat Burner",
    type: "HIIT",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    duration: "25 min",
    difficulty: "intermediate",
    benefits: ["Burn fat", "Improve cardiovascular health", "Boost metabolism"],
    muscles: ["Full body", "Core", "Legs"]
  },
  {
    id: 2,
    title: "Strength Fundamentals",
    type: "Strength",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    duration: "40 min",
    difficulty: "beginner",
    benefits: ["Build strength", "Increase muscle mass", "Improve posture"],
    muscles: ["Back", "Chest", "Legs", "Arms"]
  },
  {
    id: 3,
    title: "Yoga for Flexibility",
    type: "Yoga",
    image: "https://images.unsplash.com/photo-1552196563-55cd4e45efb3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1626&q=80",
    duration: "35 min",
    difficulty: "beginner",
    benefits: ["Increase flexibility", "Reduce stress", "Improve balance"],
    muscles: ["Full body", "Core", "Back"]
  },
  {
    id: 4,
    title: "Cardio Blast",
    type: "Cardio",
    image: "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
    duration: "30 min",
    difficulty: "intermediate",
    benefits: ["Improve endurance", "Heart health", "Weight management"],
    muscles: ["Heart", "Legs", "Core"]
  },
  {
    id: 5,
    title: "CrossFit Challenge",
    type: "CrossFit",
    image: "https://images.unsplash.com/photo-1517964603305-11c0f6f66012?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80",
    duration: "45 min",
    difficulty: "advanced",
    benefits: ["Functional fitness", "Build strength", "Improve conditioning"],
    muscles: ["Full body", "Core", "Shoulders"]
  },
  {
    id: 6,
    title: "Home Bodyweight Routine",
    type: "Home",
    image: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80",
    duration: "30 min",
    difficulty: "beginner",
    benefits: ["No equipment needed", "Full body workout", "Build strength"],
    muscles: ["Chest", "Arms", "Core", "Legs"]
  },
  {
    id: 7,
    title: "Advanced Strength Training",
    type: "Strength",
    image: "https://images.unsplash.com/photo-1532384748853-8f54a8f476e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    duration: "55 min",
    difficulty: "advanced",
    benefits: ["Muscle hypertrophy", "Strength gains", "Body composition"],
    muscles: ["Chest", "Back", "Legs", "Shoulders"]
  },
  {
    id: 8,
    title: "Core Crusher",
    type: "Strength",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    duration: "20 min",
    difficulty: "intermediate",
    benefits: ["Core strength", "Better posture", "Injury prevention"],
    muscles: ["Abs", "Obliques", "Lower back"]
  }
];

const Workouts = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [activeDifficulty, setActiveDifficulty] = useState<string>('all');
  
  const filterWorkouts = () => {
    return workouts.filter(workout => {
      const typeMatch = activeFilter === 'all' || workout.type.toLowerCase() === activeFilter.toLowerCase();
      const difficultyMatch = activeDifficulty === 'all' || workout.difficulty === activeDifficulty;
      
      return typeMatch && difficultyMatch;
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <section className="relative py-20">
        <div className="absolute inset-0 bg-gradient-to-r from-fitDark to-fitDark/80 z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1549060279-7e168fcee0c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')",
            backgroundPosition: "center"
          }}
        ></div>
        
        <div className="container mx-auto px-4 md:px-8 relative z-20">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
              Workout Routines
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Discover a variety of workout programs designed to help you achieve your fitness goals,
              from burning fat to building muscle and improving flexibility.
            </p>
          </div>
        </div>
      </section>
      
      <section className="py-12 bg-fitDark">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-wrap justify-center md:justify-between items-center mb-8">
            <div className="mb-4 md:mb-0">
              <h2 className="text-2xl font-bold text-white">Browse Programs</h2>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <button
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  activeFilter === 'all' 
                    ? 'bg-fitOrange text-white' 
                    : 'bg-fitDark border border-gray-700 text-gray-300 hover:border-fitOrange'
                }`}
                onClick={() => setActiveFilter('all')}
              >
                All Types
              </button>
              <button
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  activeFilter === 'hiit' 
                    ? 'bg-fitOrange text-white' 
                    : 'bg-fitDark border border-gray-700 text-gray-300 hover:border-fitOrange'
                }`}
                onClick={() => setActiveFilter('hiit')}
              >
                HIIT
              </button>
              <button
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  activeFilter === 'strength' 
                    ? 'bg-fitOrange text-white' 
                    : 'bg-fitDark border border-gray-700 text-gray-300 hover:border-fitOrange'
                }`}
                onClick={() => setActiveFilter('strength')}
              >
                Strength
              </button>
              <button
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  activeFilter === 'yoga' 
                    ? 'bg-fitOrange text-white' 
                    : 'bg-fitDark border border-gray-700 text-gray-300 hover:border-fitOrange'
                }`}
                onClick={() => setActiveFilter('yoga')}
              >
                Yoga
              </button>
              <button
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  activeFilter === 'cardio' 
                    ? 'bg-fitOrange text-white' 
                    : 'bg-fitDark border border-gray-700 text-gray-300 hover:border-fitOrange'
                }`}
                onClick={() => setActiveFilter('cardio')}
              >
                Cardio
              </button>
              <button
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  activeFilter === 'crossfit' 
                    ? 'bg-fitOrange text-white' 
                    : 'bg-fitDark border border-gray-700 text-gray-300 hover:border-fitOrange'
                }`}
                onClick={() => setActiveFilter('crossfit')}
              >
                CrossFit
              </button>
              <button
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  activeFilter === 'home' 
                    ? 'bg-fitOrange text-white' 
                    : 'bg-fitDark border border-gray-700 text-gray-300 hover:border-fitOrange'
                }`}
                onClick={() => setActiveFilter('home')}
              >
                Home
              </button>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center md:justify-start items-center mb-12">
            <p className="mr-4 text-gray-300">Difficulty:</p>
            <div className="flex gap-3">
              <button
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  activeDifficulty === 'all' 
                    ? 'bg-fitOrange text-white' 
                    : 'bg-fitDark border border-gray-700 text-gray-300 hover:border-fitOrange'
                }`}
                onClick={() => setActiveDifficulty('all')}
              >
                All Levels
              </button>
              <button
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  activeDifficulty === 'beginner' 
                    ? 'bg-fitOrange text-white' 
                    : 'bg-fitDark border border-gray-700 text-gray-300 hover:border-fitOrange'
                }`}
                onClick={() => setActiveDifficulty('beginner')}
              >
                Beginner
              </button>
              <button
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  activeDifficulty === 'intermediate' 
                    ? 'bg-fitOrange text-white' 
                    : 'bg-fitDark border border-gray-700 text-gray-300 hover:border-fitOrange'
                }`}
                onClick={() => setActiveDifficulty('intermediate')}
              >
                Intermediate
              </button>
              <button
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  activeDifficulty === 'advanced' 
                    ? 'bg-fitOrange text-white' 
                    : 'bg-fitDark border border-gray-700 text-gray-300 hover:border-fitOrange'
                }`}
                onClick={() => setActiveDifficulty('advanced')}
              >
                Advanced
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filterWorkouts().map((workout) => (
              <div key={workout.id} className="fitness-card group">
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={workout.image} 
                    alt={workout.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-fitDark to-transparent p-4">
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-xs font-medium px-2 py-1 rounded-full ${
                          workout.difficulty === 'beginner'
                            ? 'bg-green-500/20 text-green-400'
                            : workout.difficulty === 'intermediate'
                              ? 'bg-yellow-500/20 text-yellow-400'
                              : 'bg-red-500/20 text-red-400'
                        }`}
                      >
                        {workout.difficulty.charAt(0).toUpperCase() + workout.difficulty.slice(1)}
                      </span>
                      
                      <span className="bg-fitDark/80 text-white text-xs px-2 py-1 rounded-full flex items-center">
                        <Clock className="h-3 w-3 mr-1" /> {workout.duration}
                      </span>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="bg-fitOrange/90 text-white text-xs font-bold px-3 py-1 rounded-full">
                      {workout.type}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-3">{workout.title}</h3>
                  
                  <div className="mb-4">
                    <h4 className="text-sm text-gray-400 mb-1 flex items-center">
                      <Target className="h-4 w-4 mr-1" /> Benefits
                    </h4>
                    <ul className="text-sm text-gray-300">
                      {workout.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-center">
                          <span className="text-fitOrange mr-1">•</span> {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="text-sm text-gray-400 mb-1 flex items-center">
                      <Dumbbell className="h-4 w-4 mr-1" /> Muscles Targeted
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {workout.muscles.map((muscle, i) => (
                        <span 
                          key={i}
                          className="bg-fitDark text-gray-300 text-xs px-2 py-1 rounded-full"
                        >
                          {muscle}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mt-6 flex justify-between items-center">
                    <a href="#" className="text-fitOrange flex items-center font-semibold hover:underline">
                      Details <ArrowRight className="ml-1 h-4 w-4" />
                    </a>
                    <button className="bg-fitDark rounded-full p-2 text-white hover:bg-fitOrange/80 transition-colors">
                      <Play className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {filterWorkouts().length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-gray-300">No workouts found matching your filters.</p>
              <button
                className="mt-4 px-6 py-2 bg-fitOrange text-white rounded-full hover:bg-orange-600 transition-colors"
                onClick={() => {
                  setActiveFilter('all');
                  setActiveDifficulty('all');
                }}
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Workouts;
