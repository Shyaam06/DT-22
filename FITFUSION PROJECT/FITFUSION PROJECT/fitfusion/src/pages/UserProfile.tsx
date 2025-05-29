
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface UserProfile {
  id: string;
  full_name: string | null;
  age: number | null;
  fitness_goal: string | null;
  workout_plan: string | null;
  diet_preference: string | null;
}

const WORKOUT_PLANS = [
  "Day 1: Chest and Triceps<br>Day 2: Back and Biceps<br>Day 3: Rest<br>Day 4: Legs and Shoulders<br>Day 5: Core and Cardio<br>Day 6: Full Body<br>Day 7: Rest",
  "Day 1: Upper Body<br>Day 2: Lower Body<br>Day 3: Cardio<br>Day 4: Rest<br>Day 5: Full Body<br>Day 6: HIIT<br>Day 7: Rest",
  "Day 1: Push<br>Day 2: Pull<br>Day 3: Legs<br>Day 4: Rest<br>Day 5: Push<br>Day 6: Pull<br>Day 7: Legs"
];

const FITNESS_GOALS = ["Weight Loss", "Muscle Gain", "Endurance", "General Fitness", "Strength"];
const DIET_PREFERENCES = ["Balanced", "High Protein", "Keto", "Vegan", "Vegetarian", "Paleo"];

const UserProfile = () => {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<UserProfile>>({});
  
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const getProfile = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.user) {
        toast({
          title: "Access Denied",
          description: "Please login to access your profile.",
          variant: "destructive",
        });
        navigate("/");
        return;
      }
      
      setUser(session.user);
      
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
        
        if (error) throw error;
        
        setProfile(data);
        setFormData(data);
      } catch (error: any) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };
    
    getProfile();
    
    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!session?.user) {
          navigate("/");
        }
      }
    );
    
    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, toast]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Logged Out",
      description: "You have successfully logged out.",
    });
    navigate("/");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!user) return;
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update(formData)
        .eq('id', user.id);
      
      if (error) throw error;
      
      setProfile(prev => ({ ...prev!, ...formData }));
      setEditing(false);
      
      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      });
    } catch (error: any) {
      toast({
        title: "Update Failed",
        description: error.message || "Failed to update profile",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin h-8 w-8 border-4 border-fitOrange border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4 max-w-4xl">
      <div className="flex flex-col md:flex-row justify-between items-start gap-6">
        <Card className="w-full md:w-1/3">
          <CardHeader className="text-center">
            <Avatar className="w-24 h-24 mx-auto">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback className="bg-fitOrange text-white text-xl">
                {profile?.full_name?.charAt(0) || user?.email?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <CardTitle className="mt-4">{profile?.full_name || "User"}</CardTitle>
            <CardDescription>{user?.email}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {!editing ? (
                <>
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">Fitness Goal</div>
                    <div className="font-medium">{profile?.fitness_goal || "Not set"}</div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">Age</div>
                    <div className="font-medium">{profile?.age || "Not set"}</div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">Diet Preference</div>
                    <div className="font-medium">{profile?.diet_preference || "Not set"}</div>
                  </div>
                  
                  <Button 
                    onClick={() => setEditing(true)} 
                    variant="outline" 
                    className="w-full mt-6"
                  >
                    Edit Profile
                  </Button>
                </>
              ) : (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="full_name">Full Name</Label>
                    <Input
                      id="full_name"
                      name="full_name"
                      value={formData.full_name || ""}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="age">Age</Label>
                    <Input
                      id="age"
                      name="age"
                      type="number"
                      value={formData.age || ""}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="fitness_goal">Fitness Goal</Label>
                    <Select 
                      value={formData.fitness_goal || ""} 
                      onValueChange={(value) => handleSelectChange("fitness_goal", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a goal" />
                      </SelectTrigger>
                      <SelectContent>
                        {FITNESS_GOALS.map(goal => (
                          <SelectItem key={goal} value={goal}>{goal}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="diet_preference">Diet Preference</Label>
                    <Select 
                      value={formData.diet_preference || ""} 
                      onValueChange={(value) => handleSelectChange("diet_preference", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select diet" />
                      </SelectTrigger>
                      <SelectContent>
                        {DIET_PREFERENCES.map(diet => (
                          <SelectItem key={diet} value={diet}>{diet}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="workout_plan">Workout Plan</Label>
                    <Select 
                      value={formData.workout_plan || ""} 
                      onValueChange={(value) => handleSelectChange("workout_plan", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select plan" />
                      </SelectTrigger>
                      <SelectContent>
                        {WORKOUT_PLANS.map((plan, index) => (
                          <SelectItem key={index} value={plan}>Plan {index + 1}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex space-x-2 mt-6">
                    <Button 
                      onClick={() => {
                        setEditing(false);
                        setFormData(profile || {});
                      }} 
                      variant="outline" 
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                    <Button 
                      onClick={handleSave} 
                      className="flex-1 bg-fitOrange hover:bg-orange-600"
                    >
                      Save
                    </Button>
                  </div>
                </>
              )}
              
              <Button 
                onClick={handleLogout} 
                variant="outline" 
                className="w-full mt-2 border-fitOrange text-fitOrange hover:bg-fitOrange hover:text-white"
              >
                Logout
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="w-full md:w-2/3">
          <CardHeader>
            <CardTitle>Your Workout Plan</CardTitle>
            <CardDescription>Here's your personalized workout schedule</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {profile?.workout_plan ? (
                profile.workout_plan.split("<br>").map((day, index) => (
                  <div key={index} className="p-3 rounded-md bg-card border border-border">
                    <p className="font-medium">{day}</p>
                  </div>
                ))
              ) : (
                <div className="p-6 text-center">
                  <p className="text-muted-foreground">No workout plan yet.</p>
                  <Button 
                    className="mt-4 bg-fitOrange hover:bg-orange-600"
                    onClick={() => navigate("/fitness-plan")}
                  >
                    Create Your Plan
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserProfile;
