
import React, { useState } from 'react';
import { ArrowRight, Clock, Bookmark } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

interface MacroProps {
  protein: number;
  carbs: number;
  fats: number;
  calories: number;
}

interface MealType {
  name: string;
  image: string;
  category: string;
  mealTime: string;
  alternatives: string[];
  macros: MacroProps;
  ingredients: string[];
  instructions: string[];
  prepTime: string;
}

const initialMeals: MealType[] = [
  {
    name: "High Protein Breakfast Bowl",
    image: "https://images.unsplash.com/photo-1624555130581-1d9cca783bc0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1771&q=80",
    category: "vegetarian",
    mealTime: "breakfast",
    alternatives: ["Greek yogurt parfait", "Protein smoothie bowl", "Egg white frittata"],
    macros: {
      protein: 25,
      carbs: 35,
      fats: 12,
      calories: 350
    },
    ingredients: [
      "1/2 cup rolled oats",
      "1 scoop protein powder",
      "1 tbsp chia seeds",
      "1/2 cup Greek yogurt",
      "1/4 cup berries",
      "1 tbsp almonds",
      "1/2 banana, sliced",
      "1 tsp honey"
    ],
    instructions: [
      "Cook oats according to package instructions.",
      "Stir in protein powder and chia seeds.",
      "Top with Greek yogurt, berries, almonds, and banana slices.",
      "Drizzle with honey before serving."
    ],
    prepTime: "10 minutes"
  },
  {
    name: "Grilled Chicken Salad",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    category: "non-vegetarian",
    mealTime: "lunch",
    alternatives: ["Tofu salad (vegetarian)", "Tuna salad", "Turkey wrap"],
    macros: {
      protein: 35,
      carbs: 20,
      fats: 15,
      calories: 380
    },
    ingredients: [
      "150g grilled chicken breast",
      "2 cups mixed greens",
      "1/4 cup cherry tomatoes",
      "1/4 cucumber, sliced",
      "1/4 avocado",
      "2 tbsp low-fat vinaigrette",
      "1 tbsp pumpkin seeds"
    ],
    instructions: [
      "Grill chicken breast until fully cooked and slice into strips.",
      "Combine mixed greens, cherry tomatoes, cucumber, and avocado in a bowl.",
      "Top with grilled chicken strips.",
      "Drizzle with vinaigrette and sprinkle pumpkin seeds on top."
    ],
    prepTime: "15 minutes"
  },
  {
    name: "Tofu Stir-Fry",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1780&q=80",
    category: "vegan",
    mealTime: "dinner",
    alternatives: ["Tempeh stir-fry", "Seitan stir-fry", "Chickpea stir-fry"],
    macros: {
      protein: 22,
      carbs: 30,
      fats: 12,
      calories: 340
    },
    ingredients: [
      "150g firm tofu",
      "1 cup mixed bell peppers",
      "1 cup broccoli florets",
      "1/2 cup mushrooms",
      "2 tbsp low-sodium soy sauce",
      "1 tsp sesame oil",
      "1 clove garlic, minced",
      "1/2 cup cooked brown rice"
    ],
    instructions: [
      "Press tofu to remove excess water, then cut into cubes.",
      "Heat sesame oil in a pan and add garlic.",
      "Add tofu and cook until golden brown.",
      "Add vegetables and stir-fry until tender-crisp.",
      "Add soy sauce and stir to combine.",
      "Serve over cooked brown rice."
    ],
    prepTime: "20 minutes"
  },
  {
    name: "Protein Overnight Oats",
    image: "https://images.unsplash.com/photo-1627308595171-d1b5d67129c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    category: "vegetarian",
    mealTime: "breakfast",
    alternatives: ["Protein pancakes", "Egg and vegetable muffins", "Tofu scramble"],
    macros: {
      protein: 22,
      carbs: 40,
      fats: 8,
      calories: 320
    },
    ingredients: [
      "1/2 cup rolled oats",
      "1 scoop protein powder",
      "1 tbsp chia seeds",
      "1 cup almond milk",
      "1/2 tbsp honey",
      "1/4 cup berries",
      "1 tbsp chopped nuts"
    ],
    instructions: [
      "Mix oats, protein powder, and chia seeds in a jar.",
      "Add almond milk and honey, stir well.",
      "Cover and refrigerate overnight.",
      "In the morning, top with berries and nuts before serving."
    ],
    prepTime: "5 minutes (plus overnight)"
  }
];

const Diet = () => {
  const [dietaryPreference, setDietaryPreference] = useState('all');
  const [mealTime, setMealTime] = useState('all');
  const [selectedMeal, setSelectedMeal] = useState<MealType | null>(null);
  
  const filterMeals = () => {
    return initialMeals.filter(meal => {
      const dietMatch = dietaryPreference === 'all' || meal.category === dietaryPreference;
      const timeMatch = mealTime === 'all' || meal.mealTime === mealTime;
      
      return dietMatch && timeMatch;
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
            backgroundImage: "url('https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80')",
            backgroundPosition: "center"
          }}
        ></div>
        
        <div className="container mx-auto px-4 md:px-8 relative z-20">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
              Personalized Diet Chart
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Discover nutrition plans tailored to your goals and preferences. Fuel your workouts and support your fitness journey with our carefully designed meal plans.
            </p>
            <a href="#diet-form" className="fitness-btn-primary rounded-full">
              Create Your Diet Plan <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </div>
        </div>
      </section>
      
      <section className="py-12 bg-fitDark">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-8">Explore Meal Options</h2>
            
            <div className="mb-8">
              <div className="flex flex-wrap gap-3 mb-6">
                <button
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    dietaryPreference === 'all' 
                      ? 'bg-fitOrange text-white' 
                      : 'bg-fitDark border border-gray-700 text-gray-300 hover:border-fitOrange'
                  }`}
                  onClick={() => setDietaryPreference('all')}
                >
                  All Diets
                </button>
                <button
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    dietaryPreference === 'vegetarian' 
                      ? 'bg-fitOrange text-white' 
                      : 'bg-fitDark border border-gray-700 text-gray-300 hover:border-fitOrange'
                  }`}
                  onClick={() => setDietaryPreference('vegetarian')}
                >
                  Vegetarian
                </button>
                <button
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    dietaryPreference === 'non-vegetarian' 
                      ? 'bg-fitOrange text-white' 
                      : 'bg-fitDark border border-gray-700 text-gray-300 hover:border-fitOrange'
                  }`}
                  onClick={() => setDietaryPreference('non-vegetarian')}
                >
                  Non-Vegetarian
                </button>
                <button
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    dietaryPreference === 'vegan' 
                      ? 'bg-fitOrange text-white' 
                      : 'bg-fitDark border border-gray-700 text-gray-300 hover:border-fitOrange'
                  }`}
                  onClick={() => setDietaryPreference('vegan')}
                >
                  Vegan
                </button>
              </div>
              
              <div className="flex flex-wrap gap-3">
                <button
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    mealTime === 'all' 
                      ? 'bg-fitBlue text-white' 
                      : 'bg-fitDark border border-gray-700 text-gray-300 hover:border-fitBlue'
                  }`}
                  onClick={() => setMealTime('all')}
                >
                  All Meals
                </button>
                <button
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    mealTime === 'breakfast' 
                      ? 'bg-fitBlue text-white' 
                      : 'bg-fitDark border border-gray-700 text-gray-300 hover:border-fitBlue'
                  }`}
                  onClick={() => setMealTime('breakfast')}
                >
                  Breakfast
                </button>
                <button
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    mealTime === 'lunch' 
                      ? 'bg-fitBlue text-white' 
                      : 'bg-fitDark border border-gray-700 text-gray-300 hover:border-fitBlue'
                  }`}
                  onClick={() => setMealTime('lunch')}
                >
                  Lunch
                </button>
                <button
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    mealTime === 'dinner' 
                      ? 'bg-fitBlue text-white' 
                      : 'bg-fitDark border border-gray-700 text-gray-300 hover:border-fitBlue'
                  }`}
                  onClick={() => setMealTime('dinner')}
                >
                  Dinner
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filterMeals().map((meal, index) => (
                <div key={index} className="fitness-card group cursor-pointer" onClick={() => setSelectedMeal(meal)}>
                  <div className="relative h-56 overflow-hidden">
                    <img 
                      src={meal.image} 
                      alt={meal.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-fitDark to-transparent p-4">
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-xs font-medium px-2 py-1 rounded-full ${
                            meal.category === 'vegetarian'
                              ? 'bg-green-500/20 text-green-400'
                              : meal.category === 'vegan'
                                ? 'bg-teal-500/20 text-teal-400'
                                : 'bg-red-500/20 text-red-400'
                          }`}
                        >
                          {meal.category.charAt(0).toUpperCase() + meal.category.slice(1)}
                        </span>
                        
                        <span className="bg-fitDark/80 text-white text-xs px-2 py-1 rounded-full flex items-center">
                          <Clock className="h-3 w-3 mr-1" /> {meal.prepTime}
                        </span>
                      </div>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className="bg-fitBlue/90 text-white text-xs font-bold px-3 py-1 rounded-full">
                        {meal.mealTime.charAt(0).toUpperCase() + meal.mealTime.slice(1)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-3">{meal.name}</h3>
                    
                    <div className="flex flex-wrap gap-4 mb-4">
                      <div className="flex flex-col items-center">
                        <span className="text-fitOrange font-bold text-lg">{meal.macros.calories}</span>
                        <span className="text-xs text-gray-400">calories</span>
                      </div>
                      
                      <div className="flex flex-col items-center">
                        <span className="text-white font-bold text-lg">{meal.macros.protein}g</span>
                        <span className="text-xs text-gray-400">protein</span>
                      </div>
                      
                      <div className="flex flex-col items-center">
                        <span className="text-white font-bold text-lg">{meal.macros.carbs}g</span>
                        <span className="text-xs text-gray-400">carbs</span>
                      </div>
                      
                      <div className="flex flex-col items-center">
                        <span className="text-white font-bold text-lg">{meal.macros.fats}g</span>
                        <span className="text-xs text-gray-400">fats</span>
                      </div>
                    </div>
                    
                    <div className="text-center mt-4">
                      <button
                        className="text-fitBlue flex items-center justify-center w-full font-semibold hover:underline"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedMeal(meal);
                        }}
                      >
                        View Recipe <ArrowRight className="ml-1 h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {filterMeals().length === 0 && (
              <div className="text-center py-12">
                <p className="text-xl text-gray-300">No meals found matching your filters.</p>
                <button
                  className="mt-4 px-6 py-2 bg-fitBlue text-white rounded-full hover:bg-blue-600 transition-colors"
                  onClick={() => {
                    setDietaryPreference('all');
                    setMealTime('all');
                  }}
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
      
      <section id="diet-form" className="py-12 bg-gradient-to-b from-fitDark to-fitDark/95">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Create Your Personalized Diet Plan</h2>
              <p className="text-gray-300">
                Input your preferences and goals to receive a customized nutrition plan that supports your fitness journey.
              </p>
            </div>
            
            <div className="bg-card p-6 md:p-8 rounded-xl shadow-lg border border-fitBlue/20">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-200 mb-2" htmlFor="goal">
                      Nutrition Goal
                    </label>
                    <select
                      id="goal"
                      name="goal"
                      className="w-full bg-fitDark border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-fitBlue text-white"
                    >
                      <option value="weight-loss">Weight Loss</option>
                      <option value="muscle-gain">Muscle Gain</option>
                      <option value="maintenance">Maintenance</option>
                      <option value="performance">Athletic Performance</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-gray-200 mb-2" htmlFor="diet">
                      Dietary Preference
                    </label>
                    <select
                      id="diet"
                      name="diet"
                      className="w-full bg-fitDark border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-fitBlue text-white"
                    >
                      <option value="omnivore">No Restrictions</option>
                      <option value="vegetarian">Vegetarian</option>
                      <option value="vegan">Vegan</option>
                      <option value="keto">Keto</option>
                      <option value="paleo">Paleo</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-gray-200 mb-2" htmlFor="calories">
                      Daily Calorie Target
                    </label>
                    <select
                      id="calories"
                      name="calories"
                      className="w-full bg-fitDark border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-fitBlue text-white"
                    >
                      <option value="auto">Auto-Calculate</option>
                      <option value="1500">1500 calories</option>
                      <option value="1800">1800 calories</option>
                      <option value="2000">2000 calories</option>
                      <option value="2200">2200 calories</option>
                      <option value="2500">2500 calories</option>
                      <option value="3000">3000 calories</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-gray-200 mb-2" htmlFor="meals">
                      Meals Per Day
                    </label>
                    <select
                      id="meals"
                      name="meals"
                      className="w-full bg-fitDark border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-fitBlue text-white"
                    >
                      <option value="3">3 meals</option>
                      <option value="4">4 meals</option>
                      <option value="5">5 meals</option>
                      <option value="6">6 meals</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <span className="block text-gray-200 mb-2">Allergies or Ingredients to Avoid</span>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="allergy"
                        value="dairy"
                        className="rounded border-gray-700 text-fitBlue focus:ring-fitBlue"
                      />
                      <span className="text-gray-300">Dairy</span>
                    </label>
                    
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="allergy"
                        value="gluten"
                        className="rounded border-gray-700 text-fitBlue focus:ring-fitBlue"
                      />
                      <span className="text-gray-300">Gluten</span>
                    </label>
                    
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="allergy"
                        value="nuts"
                        className="rounded border-gray-700 text-fitBlue focus:ring-fitBlue"
                      />
                      <span className="text-gray-300">Nuts</span>
                    </label>
                    
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="allergy"
                        value="soy"
                        className="rounded border-gray-700 text-fitBlue focus:ring-fitBlue"
                      />
                      <span className="text-gray-300">Soy</span>
                    </label>
                    
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="allergy"
                        value="shellfish"
                        className="rounded border-gray-700 text-fitBlue focus:ring-fitBlue"
                      />
                      <span className="text-gray-300">Shellfish</span>
                    </label>
                    
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="allergy"
                        value="eggs"
                        className="rounded border-gray-700 text-fitBlue focus:ring-fitBlue"
                      />
                      <span className="text-gray-300">Eggs</span>
                    </label>
                  </div>
                </div>
                
                <div className="text-center">
                  <a 
                    href="/subscription"
                    className="fitness-btn-secondary font-bold py-3 px-8 rounded-full inline-flex items-center"
                  >
                    Get Your Diet Plan <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                  <p className="text-gray-400 mt-3 text-sm">
                    Full personalized diet plans are available with subscription
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      
      {/* Meal Detail Modal */}
      {selectedMeal && (
        <div className="fixed inset-0 bg-fitDark/80 z-50 flex items-center justify-center p-4">
          <div className="bg-card max-w-3xl w-full max-h-[90vh] overflow-y-auto rounded-xl shadow-lg border border-fitBlue/20">
            <div className="relative h-72">
              <img 
                src={selectedMeal.image} 
                alt={selectedMeal.name} 
                className="w-full h-full object-cover"
              />
              <button 
                className="absolute top-4 right-4 bg-fitDark/80 text-white rounded-full p-2 hover:bg-fitBlue/90"
                onClick={() => setSelectedMeal(null)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-fitDark to-transparent p-6">
                <h2 className="text-3xl font-bold text-white">{selectedMeal.name}</h2>
                <div className="flex items-center gap-2 mt-2">
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                    selectedMeal.category === 'vegetarian'
                      ? 'bg-green-500/20 text-green-400'
                      : selectedMeal.category === 'vegan'
                        ? 'bg-teal-500/20 text-teal-400'
                        : 'bg-red-500/20 text-red-400'
                  }`}>
                    {selectedMeal.category.charAt(0).toUpperCase() + selectedMeal.category.slice(1)}
                  </span>
                  <span className="bg-fitBlue/90 text-white text-xs font-bold px-3 py-1 rounded-full">
                    {selectedMeal.mealTime.charAt(0).toUpperCase() + selectedMeal.mealTime.slice(1)}
                  </span>
                  <span className="bg-fitDark/80 text-white text-xs px-2 py-1 rounded-full flex items-center">
                    <Clock className="h-3 w-3 mr-1" /> {selectedMeal.prepTime}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex flex-wrap gap-6 mb-6 justify-center">
                <div className="flex flex-col items-center">
                  <span className="text-fitOrange font-bold text-2xl">{selectedMeal.macros.calories}</span>
                  <span className="text-xs text-gray-400">calories</span>
                </div>
                
                <div className="flex flex-col items-center">
                  <span className="text-white font-bold text-2xl">{selectedMeal.macros.protein}g</span>
                  <span className="text-xs text-gray-400">protein</span>
                </div>
                
                <div className="flex flex-col items-center">
                  <span className="text-white font-bold text-2xl">{selectedMeal.macros.carbs}g</span>
                  <span className="text-xs text-gray-400">carbs</span>
                </div>
                
                <div className="flex flex-col items-center">
                  <span className="text-white font-bold text-2xl">{selectedMeal.macros.fats}g</span>
                  <span className="text-xs text-gray-400">fats</span>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-bold text-white mb-3">Ingredients</h3>
                <ul className="space-y-2">
                  {selectedMeal.ingredients.map((ingredient, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-fitBlue mr-2">•</span> 
                      <span className="text-gray-300">{ingredient}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-bold text-white mb-3">Instructions</h3>
                <ol className="space-y-2 list-decimal list-inside">
                  {selectedMeal.instructions.map((instruction, i) => (
                    <li key={i} className="text-gray-300">{instruction}</li>
                  ))}
                </ol>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-bold text-white mb-3">Alternative Options</h3>
                <ul className="flex flex-wrap gap-2">
                  {selectedMeal.alternatives.map((alternative, i) => (
                    <li 
                      key={i}
                      className="bg-fitDark text-gray-300 px-3 py-1 rounded-full text-sm"
                    >
                      {alternative}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="flex justify-between mt-6">
                <button 
                  className="fitness-btn-outline flex items-center"
                  onClick={() => setSelectedMeal(null)}
                >
                  Back to Meals
                </button>
                
                <button className="fitness-btn bg-fitBlue text-white hover:bg-blue-600 flex items-center">
                  <Bookmark className="mr-2 h-5 w-5" /> Save Recipe
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

export default Diet;
