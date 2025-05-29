
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { toast } from "@/hooks/use-toast";
import { Check, Dumbbell, Heart, Clock, Target } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Define the form schema
const formSchema = z.object({
  age: z.coerce.number().min(16).max(90),
  gender: z.enum(["male", "female", "other"]),
  weight: z.coerce.number().min(30).max(250),
  height: z.coerce.number().min(100).max(250),
  activityLevel: z.enum(["sedentary", "light", "moderate", "active", "veryActive"]),
  goal: z.enum(["fatLoss", "muscleGain", "endurance", "maintenance", "strength"]),
  daysPerWeek: z.coerce.number().min(1).max(7),
  experience: z.enum(["beginner", "intermediate", "advanced"]),
  equipment: z.enum(["none", "minimal", "full"]),
});

type FormValues = z.infer<typeof formSchema>;

// Activity levels for the form
const activityLevels = [
  { value: "sedentary", label: "Sedentary (little to no exercise)" },
  { value: "light", label: "Light (exercise 1-3 days/week)" },
  { value: "moderate", label: "Moderate (exercise 3-5 days/week)" },
  { value: "active", label: "Active (exercise 6-7 days/week)" },
  { value: "veryActive", label: "Very Active (exercise + physical job)" },
];

// Fitness goals for the form
const fitnessGoals = [
  { value: "fatLoss", label: "Fat Loss", description: "Reduce body fat while maintaining muscle mass" },
  { value: "muscleGain", label: "Muscle Gain", description: "Build muscle size and strength" },
  { value: "endurance", label: "Endurance", description: "Improve cardiovascular fitness and stamina" },
  { value: "maintenance", label: "Maintenance", description: "Maintain current fitness level and weight" },
  { value: "strength", label: "Strength", description: "Focus on increasing overall strength" },
];

// Equipment options
const equipmentOptions = [
  { value: "none", label: "None (bodyweight only)" },
  { value: "minimal", label: "Minimal (dumbbells, resistance bands)" },
  { value: "full", label: "Full (gym access or home gym)" },
];

// Sample workout exercise for the plan
interface Exercise {
  name: string;
  sets: number;
  reps: string;
  rest: string;
  description: string;
}

// Sample workout day
interface WorkoutDay {
  day: string;
  focus: string;
  duration: string;
  exercises: Exercise[];
}

const FitnessPlan = () => {
  const [plan, setPlan] = useState<WorkoutDay[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      age: 30,
      gender: "male",
      weight: 70,
      height: 170,
      activityLevel: "moderate",
      goal: "muscleGain",
      daysPerWeek: 4,
      experience: "beginner",
      equipment: "minimal",
    },
  });

  const generatePlan = (data: FormValues) => {
    setIsLoading(true);
    
    // Simulate API call with setTimeout
    setTimeout(() => {
      // Generate a personalized plan based on form data
      const newPlan = generateWorkoutPlan(data);
      setPlan(newPlan);
      setIsLoading(false);
      toast({
        title: "Plan Generated!",
        description: "Your personalized workout plan is ready.",
      });
    }, 1500);
  };
  
  const generateWorkoutPlan = (data: FormValues): WorkoutDay[] => {
    // This is a simplified example - in a real application, this would be more sophisticated
    const workoutDays: WorkoutDay[] = [];
    
    // Different workout focuses based on goals
    const focusAreas = {
      fatLoss: ["Full Body", "HIIT", "Lower Body", "Upper Body", "Core + Cardio", "Active Recovery", "Rest"],
      muscleGain: ["Chest & Triceps", "Back & Biceps", "Legs & Shoulders", "Rest", "Push", "Pull", "Legs"],
      endurance: ["Cardio", "Strength", "Interval Training", "Endurance", "Active Recovery", "Long Session", "Rest"],
      maintenance: ["Full Body", "Cardio", "Rest", "Upper Body", "Lower Body", "Cardio", "Rest"],
      strength: ["Lower Body", "Upper Body", "Rest", "Compound Lifts", "Accessory Work", "Athlete Conditioning", "Rest"]
    };
    
    // Duration based on experience level
    const durations = {
      beginner: "30-40 min",
      intermediate: "45-60 min",
      advanced: "60-75 min"
    };
    
    // Get the appropriate focus areas for the goal
    const availableFocuses = focusAreas[data.goal];
    
    // Create a workout for each day of the week the user wants to train
    for (let i = 0; i < 7; i++) {
      if (i < data.daysPerWeek) {
        // Active workout day
        const exercises: Exercise[] = [];
        
        // Generate 4-6 exercises based on the focus and equipment
        const exerciseCount = data.experience === "beginner" ? 4 : 
                            data.experience === "intermediate" ? 5 : 6;
        
        for (let e = 0; e < exerciseCount; e++) {
          exercises.push(generateExercise(availableFocuses[i], data.experience, data.equipment));
        }
        
        workoutDays.push({
          day: `Day ${i + 1}`,
          focus: availableFocuses[i],
          duration: durations[data.experience],
          exercises: exercises
        });
      } else {
        // Rest day or active recovery
        workoutDays.push({
          day: `Day ${i + 1}`,
          focus: "Rest",
          duration: "0 min",
          exercises: []
        });
      }
    }
    
    return workoutDays;
  };
  
  // Helper to generate a single exercise
  const generateExercise = (focus: string, experience: string, equipment: string): Exercise => {
    // This would ideally come from a database of exercises
    // For now, we'll use a simplified approach
    
    const exerciseLibrary = {
      "Chest & Triceps": ["Push-ups", "Bench Press", "Chest Fly", "Tricep Dips", "Tricep Extensions"],
      "Back & Biceps": ["Pull-ups", "Bent-over Rows", "Lat Pulldowns", "Bicep Curls", "Face Pulls"],
      "Legs & Shoulders": ["Squats", "Lunges", "Shoulder Press", "Lateral Raises", "Leg Extensions"],
      "Full Body": ["Burpees", "Mountain Climbers", "Deadlifts", "Thrusters", "Renegade Rows"],
      "HIIT": ["Jumping Jacks", "High Knees", "Burpees", "Jump Squats", "Speed Skaters"],
      "Lower Body": ["Squats", "Deadlifts", "Lunges", "Leg Press", "Calf Raises"],
      "Upper Body": ["Push-ups", "Pull-ups", "Shoulder Press", "Dumbbell Rows", "Bench Press"],
      "Core + Cardio": ["Plank", "Russian Twists", "Mountain Climbers", "Jump Rope", "Bicycle Crunches"],
      "Push": ["Bench Press", "Shoulder Press", "Tricep Extensions", "Push-ups", "Chest Fly"],
      "Pull": ["Pull-ups", "Bent-over Rows", "Bicep Curls", "Face Pulls", "Lat Pulldowns"],
      "Legs": ["Squats", "Deadlifts", "Lunges", "Leg Press", "Calf Raises"],
      "Compound Lifts": ["Deadlifts", "Squats", "Bench Press", "Shoulder Press", "Bent-over Rows"],
      "Accessory Work": ["Bicep Curls", "Tricep Extensions", "Lateral Raises", "Face Pulls", "Calf Raises"],
      "Athlete Conditioning": ["Box Jumps", "Kettlebell Swings", "Battle Ropes", "Med Ball Slams", "Sled Push"],
      "Cardio": ["Running", "Cycling", "Rowing", "Jump Rope", "Stair Climber"],
      "Interval Training": ["Sprint Intervals", "Tabata", "EMOM (Every Minute on the Minute)", "AMRAP (As Many Rounds as Possible)", "Circuit Training"],
      "Endurance": ["Long Distance Running", "Cycling", "Swimming", "Rowing", "Hiking"],
      "Active Recovery": ["Walking", "Light Yoga", "Stretching", "Foam Rolling", "Light Swimming"],
      "Long Session": ["Tempo Run", "Long Cycle", "Distance Swimming", "Trail Running", "Cross Training"],
      "Rest": []
    };
    
    // If it's a rest day, return no exercise
    if (focus === "Rest") {
      return {
        name: "Rest Day",
        sets: 0,
        reps: "N/A",
        rest: "N/A",
        description: "Take the day off to allow your body to recover and muscles to rebuild."
      };
    }
    
    // Select a random exercise from the appropriate focus area
    const exercises = exerciseLibrary[focus] || exerciseLibrary["Full Body"];
    const exerciseName = exercises[Math.floor(Math.random() * exercises.length)];
    
    // Determine sets, reps and rest based on experience and goal
    let sets, reps, rest;
    
    if (experience === "beginner") {
      sets = 3;
      rest = "60-90 sec";
    } else if (experience === "intermediate") {
      sets = 4;
      rest = "45-60 sec";
    } else {
      sets = 5;
      rest = "30-45 sec";
    }
    
    // Determine reps based on goal
    switch (focus) {
      case "Strength":
      case "Compound Lifts":
        reps = "5-8";
        break;
      case "HIIT":
      case "Cardio":
      case "Interval Training":
      case "Endurance":
        reps = "15-20";
        break;
      default:
        reps = "8-12";
    }
    
    return {
      name: exerciseName,
      sets,
      reps,
      rest,
      description: `Perform ${exerciseName} with proper form, focusing on controlled movements.`
    };
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="relative py-20">
        <div className="absolute inset-0 bg-gradient-to-r from-fitDark to-fitDark/80 z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1576678927484-cc907957088c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80')",
            backgroundPosition: "center"
          }}
        ></div>
        
        <div className="container mx-auto px-4 md:px-8 relative z-20">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
              Your Personalized Fitness Plan
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Tell us about yourself, and we'll create a custom workout plan tailored to your goals, experience, and available equipment.
            </p>
          </div>
        </div>
      </div>
      
      <section className="py-12 bg-gradient-to-b from-fitDark to-fitDark/95">
        <div className="container mx-auto px-4 md:px-8">
          {!plan ? (
            <div className="max-w-3xl mx-auto">
              <Card className="bg-card border border-fitOrange/20 overflow-hidden">
                <div className="p-6 md:p-8">
                  <h2 className="text-2xl font-bold mb-6">Create Your Plan</h2>
                  
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(generatePlan)} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Age Field */}
                        <FormField
                          control={form.control}
                          name="age"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Age</FormLabel>
                              <FormControl>
                                <Input 
                                  type="number" 
                                  placeholder="Enter your age" 
                                  {...field} 
                                  className="bg-card border-fitOrange/20"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        {/* Gender Field */}
                        <FormField
                          control={form.control}
                          name="gender"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Gender</FormLabel>
                              <Select 
                                onValueChange={field.onChange} 
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger className="bg-card border-fitOrange/20">
                                    <SelectValue placeholder="Select gender" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="male">Male</SelectItem>
                                  <SelectItem value="female">Female</SelectItem>
                                  <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        {/* Weight Field */}
                        <FormField
                          control={form.control}
                          name="weight"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Weight (kg)</FormLabel>
                              <FormControl>
                                <Input 
                                  type="number" 
                                  placeholder="Enter your weight in kg" 
                                  {...field} 
                                  className="bg-card border-fitOrange/20"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        {/* Height Field */}
                        <FormField
                          control={form.control}
                          name="height"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Height (cm)</FormLabel>
                              <FormControl>
                                <Input 
                                  type="number" 
                                  placeholder="Enter your height in cm" 
                                  {...field} 
                                  className="bg-card border-fitOrange/20"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        {/* Activity Level Field */}
                        <FormField
                          control={form.control}
                          name="activityLevel"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Current Activity Level</FormLabel>
                              <Select 
                                onValueChange={field.onChange} 
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger className="bg-card border-fitOrange/20">
                                    <SelectValue placeholder="Select activity level" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {activityLevels.map((level) => (
                                    <SelectItem key={level.value} value={level.value}>
                                      {level.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        {/* Fitness Goal Field */}
                        <FormField
                          control={form.control}
                          name="goal"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Fitness Goal</FormLabel>
                              <Select 
                                onValueChange={field.onChange} 
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger className="bg-card border-fitOrange/20">
                                    <SelectValue placeholder="Select your goal" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {fitnessGoals.map((goal) => (
                                    <SelectItem key={goal.value} value={goal.value}>
                                      {goal.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormDescription>
                                {fitnessGoals.find(g => g.value === field.value)?.description}
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        {/* Days Per Week Field */}
                        <FormField
                          control={form.control}
                          name="daysPerWeek"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Workout Days Per Week: {field.value}</FormLabel>
                              <FormControl>
                                <Slider
                                  min={1}
                                  max={7}
                                  step={1}
                                  defaultValue={[field.value]}
                                  onValueChange={(vals) => field.onChange(vals[0])}
                                  className="py-4"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        {/* Experience Level Field */}
                        <FormField
                          control={form.control}
                          name="experience"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Experience Level</FormLabel>
                              <Select 
                                onValueChange={field.onChange} 
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger className="bg-card border-fitOrange/20">
                                    <SelectValue placeholder="Select experience level" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="beginner">Beginner</SelectItem>
                                  <SelectItem value="intermediate">Intermediate</SelectItem>
                                  <SelectItem value="advanced">Advanced</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        {/* Equipment Access Field */}
                        <FormField
                          control={form.control}
                          name="equipment"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Equipment Access</FormLabel>
                              <Select 
                                onValueChange={field.onChange} 
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger className="bg-card border-fitOrange/20">
                                    <SelectValue placeholder="Select equipment access" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {equipmentOptions.map((option) => (
                                    <SelectItem key={option.value} value={option.value}>
                                      {option.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <Button 
                        type="submit" 
                        disabled={isLoading}
                        className="w-full bg-fitOrange hover:bg-orange-600"
                      >
                        {isLoading ? "Generating Plan..." : "Generate My Plan"}
                      </Button>
                    </form>
                  </Form>
                </div>
              </Card>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-6 text-white">Your Personalized Workout Plan</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <Card className="bg-card border border-fitOrange/20 overflow-hidden p-6 flex flex-col items-center">
                  <div className="h-12 w-12 rounded-full bg-fitOrange/20 flex items-center justify-center mb-4">
                    <Dumbbell className="h-6 w-6 text-fitOrange" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">
                    {form.getValues().daysPerWeek} days per week
                  </h3>
                  <p className="text-center text-muted-foreground">
                    Optimal frequency for your {form.getValues().goal === "fatLoss" ? "fat loss" : 
                    form.getValues().goal === "muscleGain" ? "muscle building" : 
                    form.getValues().goal === "endurance" ? "endurance" : 
                    form.getValues().goal === "maintenance" ? "maintenance" : "strength"} goals
                  </p>
                </Card>
                
                <Card className="bg-card border border-fitOrange/20 overflow-hidden p-6 flex flex-col items-center">
                  <div className="h-12 w-12 rounded-full bg-fitBlue/20 flex items-center justify-center mb-4">
                    <Clock className="h-6 w-6 text-fitBlue" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">
                    {plan[0].duration} workouts
                  </h3>
                  <p className="text-center text-muted-foreground">
                    Efficient sessions designed for your {form.getValues().experience} level
                  </p>
                </Card>
                
                <Card className="bg-card border border-fitOrange/20 overflow-hidden p-6 flex flex-col items-center">
                  <div className="h-12 w-12 rounded-full bg-fitGreen/20 flex items-center justify-center mb-4">
                    <Target className="h-6 w-6 text-fitGreen" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">
                    {form.getValues().goal === "fatLoss" ? "Fat Loss Focus" : 
                    form.getValues().goal === "muscleGain" ? "Muscle Building" : 
                    form.getValues().goal === "endurance" ? "Endurance Training" : 
                    form.getValues().goal === "maintenance" ? "Maintenance Plan" : "Strength Development"}
                  </h3>
                  <p className="text-center text-muted-foreground">
                    Customized for your specific fitness objectives
                  </p>
                </Card>
              </div>
              
              <div className="space-y-6">
                {plan.map((day, index) => (
                  <Card key={index} className={`bg-card border ${day.focus === "Rest" ? 'border-gray-700' : 'border-fitOrange/20'} overflow-hidden`}>
                    <div className="p-6">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-bold">{day.day}: {day.focus}</h3>
                        <span className={`text-sm ${day.focus === "Rest" ? 'bg-gray-700/30 text-gray-300' : 'bg-fitOrange/10 text-fitOrange'} px-3 py-1 rounded-full`}>
                          {day.duration}
                        </span>
                      </div>
                      
                      {day.focus !== "Rest" ? (
                        <div className="space-y-4">
                          {day.exercises.map((exercise, exIndex) => (
                            <div key={exIndex} className="border-t border-border pt-4 first:border-0 first:pt-0">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h4 className="font-medium">{exercise.name}</h4>
                                  <p className="text-sm text-muted-foreground mt-1">{exercise.description}</p>
                                </div>
                                <div className="flex flex-col items-end">
                                  <span className="text-sm font-medium">{exercise.sets} sets × {exercise.reps} reps</span>
                                  <span className="text-xs text-muted-foreground">Rest: {exercise.rest}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="flex items-center justify-center py-8">
                          <div className="text-center">
                            <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                            <p className="text-muted-foreground">Rest day to allow your body to recover and muscles to rebuild.</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
              
              <div className="mt-8 flex justify-between items-center">
                <Button 
                  variant="outline" 
                  onClick={() => setPlan(null)}
                  className="border-fitOrange text-fitOrange hover:bg-fitOrange/10"
                >
                  Create New Plan
                </Button>
                
                <Button 
                  className="bg-fitGreen hover:bg-green-600"
                  onClick={() => {
                    toast({
                      title: "Plan Saved!",
                      description: "Your workout plan has been saved to your account.",
                    });
                  }}
                >
                  <Check className="h-4 w-4 mr-2" /> Save Plan
                </Button>
              </div>
              
              <div className="mt-12 bg-card border border-fitOrange/20 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Fitness Plan Tips</h3>
                <ul className="space-y-3">
                  <li className="flex">
                    <Check className="h-5 w-5 text-fitGreen mr-2 flex-shrink-0" />
                    <span>Always warm up for 5-10 minutes before starting your workout.</span>
                  </li>
                  <li className="flex">
                    <Check className="h-5 w-5 text-fitGreen mr-2 flex-shrink-0" />
                    <span>Stay hydrated by drinking water before, during, and after exercise.</span>
                  </li>
                  <li className="flex">
                    <Check className="h-5 w-5 text-fitGreen mr-2 flex-shrink-0" />
                    <span>Focus on proper form rather than lifting heavy weights.</span>
                  </li>
                  <li className="flex">
                    <Check className="h-5 w-5 text-fitGreen mr-2 flex-shrink-0" />
                    <span>Listen to your body and rest if you feel pain (not just muscle fatigue).</span>
                  </li>
                  <li className="flex">
                    <Check className="h-5 w-5 text-fitGreen mr-2 flex-shrink-0" />
                    <span>Consistency is key - stick to your plan for at least 4-6 weeks to see results.</span>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default FitnessPlan;
