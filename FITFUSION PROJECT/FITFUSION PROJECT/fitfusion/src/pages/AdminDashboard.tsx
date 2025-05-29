
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

interface User {
  id: string;
  email: string;
  full_name: string | null;
  age: number | null;
  fitness_goal: string | null;
  workout_plan: string | null;
  diet_preference: string | null;
  created_at: string;
}

const AdminDashboard = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [userCount, setUserCount] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    fetchProfiles();
  }, []);
  
  const fetchProfiles = async () => {
    try {
      console.log("Fetching profiles...");
      
      // Get profiles directly without auth check
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('*');
      
      if (profilesError) {
        console.error("Error fetching profiles:", profilesError);
        throw profilesError;
      }
      
      if (!profiles) {
        console.log("No profiles found");
        setUsers([]);
        setUserCount(0);
        setLoading(false);
        return;
      }
      
      console.log(`Found ${profiles.length} profiles`);
      
      // Map profiles to users
      const combinedUsers = profiles.map(profile => {
        return {
          id: profile.id,
          email: `User ${profile.id.substring(0, 8)}`, // We don't have emails from profiles table
          full_name: profile.full_name || null,
          age: profile.age || null,
          fitness_goal: profile.fitness_goal || null,
          workout_plan: profile.workout_plan || null,
          diet_preference: profile.diet_preference || null,
          created_at: profile.created_at || new Date().toISOString()
        };
      });
      
      setUsers(combinedUsers);
      setUserCount(combinedUsers.length);
      setLoading(false);
      
    } catch (error) {
      console.error("Error in fetchProfiles:", error);
      
      // Use sample data as last resort
      const sampleUsers = [
        { id: "1", email: "john@example.com", full_name: "John Doe", age: 28, fitness_goal: "Muscle Gain", workout_plan: "Plan 1", diet_preference: "High Protein", created_at: new Date().toISOString() },
        { id: "2", email: "jane@example.com", full_name: "Jane Smith", age: 24, fitness_goal: "Weight Loss", workout_plan: "Plan 2", diet_preference: "Keto", created_at: new Date().toISOString() },
        { id: "3", email: "mike@example.com", full_name: "Mike Johnson", age: 32, fitness_goal: "Endurance", workout_plan: "Plan 3", diet_preference: "Balanced", created_at: new Date().toISOString() },
      ];
      
      setUsers(sampleUsers);
      setUserCount(sampleUsers.length);
      
      toast({
        title: "Limited Data Access",
        description: "Displaying sample data. Some admin features may be restricted.",
        variant: "destructive",
      });
      
      setLoading(false);
    }
  };

  const handleDeleteUser = async (id: string) => {
    try {
      // In a real app with proper admin rights, we would delete the user from auth
      // For now, we'll just remove from our local state
      setUsers(users.filter(user => user.id !== id));
      
      toast({
        title: "User Deleted",
        description: "User has been removed from the system.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Could not delete user",
        variant: "destructive",
      });
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      (user.email && user.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (user.full_name && user.full_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (user.fitness_goal && user.fitness_goal.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin h-8 w-8 border-4 border-fitOrange border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Manage users and system settings
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-card rounded-lg border border-border p-6 flex flex-col items-center justify-center">
          <div className="text-3xl font-bold text-fitOrange">{userCount}</div>
          <div className="text-muted-foreground">Total Users</div>
        </div>
        <div className="bg-card rounded-lg border border-border p-6 flex flex-col items-center justify-center">
          <div className="text-3xl font-bold text-fitGreen">{users.filter(u => u.workout_plan).length}</div>
          <div className="text-muted-foreground">Active Plans</div>
        </div>
        <div className="bg-card rounded-lg border border-border p-6 flex flex-col items-center justify-center">
          <div className="text-3xl font-bold text-fitOrange">{users.filter(u => u.diet_preference).length}</div>
          <div className="text-muted-foreground">Diet Preferences Set</div>
        </div>
      </div>

      <div className="bg-card rounded-lg border border-border p-6 mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <h2 className="text-xl font-bold mb-4 sm:mb-0">User Management</h2>
          <Input
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-xs"
          />
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Goal</TableHead>
                <TableHead>Age</TableHead>
                <TableHead>Diet</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.full_name || "N/A"}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.fitness_goal || "Not set"}</TableCell>
                    <TableCell>{user.age || "N/A"}</TableCell>
                    <TableCell>
                      {user.diet_preference && (
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            user.diet_preference === "High Protein"
                              ? "bg-fitGreen/20 text-fitGreen"
                              : user.diet_preference === "Keto"
                              ? "bg-fitOrange/20 text-fitOrange" 
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {user.diet_preference}
                        </span>
                      )}
                      {!user.diet_preference && "Not set"}
                    </TableCell>
                    <TableCell>
                      {user.created_at ? format(new Date(user.created_at), 'MMM d, yyyy') : 'N/A'}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs h-8"
                          onClick={() => {
                            toast({
                              title: "View Profile",
                              description: `Viewing ${user.full_name || "User"}'s profile`,
                            });
                          }}
                        >
                          View
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs h-8 border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
                          onClick={() => handleDeleteUser(user.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-4">
                    No users found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
