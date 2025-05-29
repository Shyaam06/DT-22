
import React, { useState } from 'react';
import { Search, Filter, ArrowRight, Play } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

interface Exercise {
  id: number;
  name: string;
  muscleGroup: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  equipment: string;
  image: string;
  instructions: string[];
  benefits: string[];
}

const exercises: Exercise[] = [
  {
    id: 1,
    name: "Push-ups",
    muscleGroup: ["chest", "shoulders", "triceps"],
    difficulty: "beginner",
    equipment: "bodyweight",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    instructions: [
      "Start in a plank position with hands slightly wider than shoulder-width apart",
      "Lower your body until your chest nearly touches the floor",
      "Push back up to the starting position",
      "Keep your core tight and back straight throughout the movement"
    ],
    benefits: [
      "Builds upper body strength",
      "Engages multiple muscle groups",
      "Improves core stability"
    ]
  },
  {
    id: 2,
    name: "Squats",
    muscleGroup: ["legs", "glutes", "core"],
    difficulty: "beginner",
    equipment: "bodyweight",
    image: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80",
    instructions: [
      "Stand with feet shoulder-width apart",
      "Bend your knees and push your hips back as if sitting in a chair",
      "Lower until thighs are parallel to the ground (or as low as comfortable)",
      "Push through your heels to return to standing position"
    ],
    benefits: [
      "Strengthens lower body",
      "Improves mobility",
      "Builds functional strength"
    ]
  },
  {
    id: 3,
    name: "Deadlifts",
    muscleGroup: ["back", "legs", "glutes"],
    difficulty: "intermediate",
    equipment: "barbell",
    image: "https://images.unsplash.com/photo-1598575478894-32acb9944ca1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1513&q=80",
    instructions: [
      "Stand with feet hip-width apart, barbell over mid-foot",
      "Bend at the hips and knees, gripping the bar with hands shoulder-width apart",
      "Keep your back straight and chest up as you lift the bar by extending hips and knees",
      "Lower the bar by hinging at the hips and bending knees"
    ],
    benefits: [
      "Works posterior chain muscles",
      "Improves grip strength",
      "Enhances overall strength"
    ]
  },
  {
    id: 4,
    name: "Planks",
    muscleGroup: ["core", "shoulders", "back"],
    difficulty: "beginner",
    equipment: "bodyweight",
    image: "https://images.unsplash.com/photo-1566241142404-6c2bb4201a30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    instructions: [
      "Start in a forearm position with elbows under shoulders",
      "Extend legs behind you, resting on balls of feet",
      "Create a straight line from head to heels",
      "Hold position while keeping core engaged"
    ],
    benefits: [
      "Strengthens core",
      "Improves posture",
      "Enhances stability"
    ]
  },
  {
    id: 5,
    name: "Bench Press",
    muscleGroup: ["chest", "shoulders", "triceps"],
    difficulty: "intermediate",
    equipment: "barbell",
    image: "https://images.unsplash.com/photo-1534368786749-b69ca9fcc7e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    instructions: [
      "Lie on a bench with feet flat on the floor",
      "Grip the bar slightly wider than shoulder-width",
      "Lower the bar to your chest in a controlled manner",
      "Press the bar back up to starting position"
    ],
    benefits: [
      "Builds upper body strength",
      "Increases chest muscle mass",
      "Improves pushing power"
    ]
  },
  {
    id: 6,
    name: "Pull-ups",
    muscleGroup: ["back", "biceps", "shoulders"],
    difficulty: "intermediate",
    equipment: "pull-up bar",
    image: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1587&q=80",
    instructions: [
      "Hang from a pull-up bar with hands slightly wider than shoulder-width",
      "Pull your body up until your chin clears the bar",
      "Lower your body back to the starting position in a controlled manner",
      "Keep core engaged throughout the movement"
    ],
    benefits: [
      "Builds upper body strength",
      "Improves grip strength",
      "Develops back muscles"
    ]
  },
  {
    id: 7,
    name: "Dumbbell Lunges",
    muscleGroup: ["legs", "glutes", "core"],
    difficulty: "intermediate",
    equipment: "dumbbells",
    image: "https://images.unsplash.com/photo-1434682881908-b43d0467b798?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1474&q=80",
    instructions: [
      "Stand upright holding dumbbells at your sides",
      "Take a step forward with one leg and lower your body until both knees are bent at 90 degrees",
      "Push through the front heel to return to standing",
      "Repeat on the other leg"
    ],
    benefits: [
      "Develops leg strength",
      "Improves balance",
      "Builds unilateral strength"
    ]
  },
  {
    id: 8,
    name: "Bicycle Crunches",
    muscleGroup: ["abs", "obliques"],
    difficulty: "beginner",
    equipment: "bodyweight",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    instructions: [
      "Lie on your back with hands behind your head",
      "Lift shoulders and legs off the ground, knees bent",
      "Twist your torso to bring right elbow to left knee while extending right leg",
      "Alternate sides in a pedaling motion"
    ],
    benefits: [
      "Targets entire core",
      "Improves rotational strength",
      "Enhances core stability"
    ]
  }
];

const Exercises = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMuscle, setSelectedMuscle] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  
  const filterExercises = () => {
    return exercises.filter(exercise => {
      const searchMatch = exercise.name.toLowerCase().includes(searchTerm.toLowerCase());
      const muscleMatch = selectedMuscle === 'all' || exercise.muscleGroup.includes(selectedMuscle);
      const difficultyMatch = selectedDifficulty === 'all' || exercise.difficulty === selectedDifficulty;
      
      return searchMatch && muscleMatch && difficultyMatch;
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
            backgroundImage: "url('https://images.unsplash.com/photo-1534367507873-d2d7e24c797f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')",
            backgroundPosition: "center"
          }}
        ></div>
        
        <div className="container mx-auto px-4 md:px-8 relative z-20">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
              Exercise Library
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Browse our collection of exercises targeting different muscle groups. 
              Each exercise includes detailed instructions, benefits, and proper form guidance.
            </p>
          </div>
        </div>
      </section>
      
      <section className="py-12 bg-fitDark">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
            <div className="relative w-full md:w-96">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-500" />
              </div>
              <input 
                type="text" 
                placeholder="Search exercises..." 
                className="w-full bg-fitDark border border-gray-700 pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:border-fitOrange text-white"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            
            <div className="w-full md:w-auto">
              <button
                className="flex items-center space-x-2 px-4 py-2 border border-gray-700 rounded-lg text-white md:hidden mb-4 w-full justify-center"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="h-5 w-5" />
                <span>{showFilters ? 'Hide Filters' : 'Show Filters'}</span>
              </button>
              
              <div className={`md:flex gap-4 ${showFilters ? 'block' : 'hidden md:flex'}`}>
                <div>
                  <label className="text-gray-400 block mb-1 text-sm">Muscle Group</label>
                  <select
                    className="bg-fitDark border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-fitOrange text-white min-w-[180px]"
                    value={selectedMuscle}
                    onChange={(e) => setSelectedMuscle(e.target.value)}
                  >
                    <option value="all">All Muscles</option>
                    <option value="chest">Chest</option>
                    <option value="back">Back</option>
                    <option value="legs">Legs</option>
                    <option value="shoulders">Shoulders</option>
                    <option value="arms">Arms</option>
                    <option value="core">Core</option>
                    <option value="abs">Abs</option>
                    <option value="glutes">Glutes</option>
                  </select>
                </div>
                
                <div>
                  <label className="text-gray-400 block mb-1 text-sm">Difficulty</label>
                  <select
                    className="bg-fitDark border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-fitOrange text-white"
                    value={selectedDifficulty}
                    onChange={(e) => setSelectedDifficulty(e.target.value)}
                  >
                    <option value="all">All Levels</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filterExercises().map(exercise => (
              <div 
                key={exercise.id} 
                className="fitness-card group cursor-pointer hover:border-fitGreen/50"
                onClick={() => setSelectedExercise(exercise)}
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={exercise.image} 
                    alt={exercise.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-fitDark to-transparent opacity-80"></div>
                  <div className="absolute bottom-4 left-4">
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded-full ${
                        exercise.difficulty === 'beginner'
                          ? 'bg-green-500/20 text-green-400'
                          : exercise.difficulty === 'intermediate'
                            ? 'bg-yellow-500/20 text-yellow-400'
                            : 'bg-red-500/20 text-red-400'
                      }`}
                    >
                      {exercise.difficulty.charAt(0).toUpperCase() + exercise.difficulty.slice(1)}
                    </span>
                  </div>
                  <button className="absolute top-4 right-4 bg-fitGreen rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Play className="h-4 w-4 text-white" />
                  </button>
                </div>
                
                <div className="p-4">
                  <h3 className="text-lg font-bold text-white mb-2">{exercise.name}</h3>
                  
                  <div>
                    <h4 className="text-xs text-gray-400 mb-1">Muscles Targeted</h4>
                    <div className="flex flex-wrap gap-1">
                      {exercise.muscleGroup.map((muscle, i) => (
                        <span 
                          key={i}
                          className="bg-fitDark text-gray-300 text-xs px-2 py-1 rounded-full"
                        >
                          {muscle.charAt(0).toUpperCase() + muscle.slice(1)}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-xs text-gray-400">{exercise.equipment}</span>
                    <button
                      className="text-fitGreen flex items-center text-sm font-semibold hover:underline"
                      onClick={() => setSelectedExercise(exercise)}
                    >
                      View Details <ArrowRight className="ml-1 h-3 w-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {filterExercises().length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-gray-300">No exercises found matching your filters.</p>
              <button
                className="mt-4 px-6 py-2 bg-fitGreen text-white rounded-full hover:bg-green-600 transition-colors"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedMuscle('all');
                  setSelectedDifficulty('all');
                }}
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>
      
      {/* Exercise Detail Modal */}
      {selectedExercise && (
        <div className="fixed inset-0 bg-fitDark/80 z-50 flex items-center justify-center p-4">
          <div className="bg-card max-w-3xl w-full max-h-[90vh] overflow-y-auto rounded-xl shadow-lg border border-fitGreen/20">
            <div className="relative h-72">
              <img 
                src={selectedExercise.image} 
                alt={selectedExercise.name} 
                className="w-full h-full object-cover"
              />
              <button 
                className="absolute top-4 right-4 bg-fitDark/80 text-white rounded-full p-2 hover:bg-fitGreen/90"
                onClick={() => setSelectedExercise(null)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-fitDark to-transparent p-6">
                <h2 className="text-3xl font-bold text-white">{selectedExercise.name}</h2>
                <div className="flex items-center gap-2 mt-2">
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                    selectedExercise.difficulty === 'beginner'
                      ? 'bg-green-500/20 text-green-400'
                      : selectedExercise.difficulty === 'intermediate'
                        ? 'bg-yellow-500/20 text-yellow-400'
                        : 'bg-red-500/20 text-red-400'
                  }`}>
                    {selectedExercise.difficulty.charAt(0).toUpperCase() + selectedExercise.difficulty.slice(1)}
                  </span>
                  <span className="bg-fitDark/80 text-white text-xs px-3 py-1 rounded-full">
                    {selectedExercise.equipment}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <div className="mb-6">
                <h3 className="text-lg font-bold text-white mb-3">Muscles Targeted</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedExercise.muscleGroup.map((muscle, i) => (
                    <span 
                      key={i}
                      className="bg-fitDark text-gray-300 px-3 py-1 rounded-full"
                    >
                      {muscle.charAt(0).toUpperCase() + muscle.slice(1)}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-bold text-white mb-3">Instructions</h3>
                <ol className="space-y-2 list-decimal list-inside">
                  {selectedExercise.instructions.map((instruction, i) => (
                    <li key={i} className="text-gray-300">{instruction}</li>
                  ))}
                </ol>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-bold text-white mb-3">Benefits</h3>
                <ul className="space-y-2">
                  {selectedExercise.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-fitGreen mr-2">•</span> 
                      <span className="text-gray-300">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="flex justify-between mt-6">
                <button 
                  className="fitness-btn-outline border-fitGreen text-fitGreen hover:bg-fitGreen hover:text-white flex items-center"
                  onClick={() => setSelectedExercise(null)}
                >
                  Back to Exercises
                </button>
                
                <button className="fitness-btn bg-fitGreen text-white hover:bg-green-600 flex items-center">
                  <Play className="mr-2 h-5 w-5" /> Watch Video
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  );
};

export default Exercises;
