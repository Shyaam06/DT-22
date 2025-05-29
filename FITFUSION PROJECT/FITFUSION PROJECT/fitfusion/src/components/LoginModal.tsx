
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

type LoginType = "user" | "admin";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: LoginType;
}

// Demo admin credentials
const DEMO_ADMIN_EMAIL = "admin@fitfusion.com";
const DEMO_ADMIN_PASSWORD = "admin123";

const LoginModal = ({ isOpen, onClose, type }: LoginModalProps) => {
  const [email, setEmail] = useState(type === "admin" ? DEMO_ADMIN_EMAIL : "");
  const [password, setPassword] = useState(type === "admin" ? DEMO_ADMIN_PASSWORD : "");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      console.log(`Attempting to log in as ${type}:`, email);
      
      // Use Supabase authentication
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        throw error;
      }

      if (!data.user) {
        throw new Error("Login failed - no user data returned");
      }

      console.log(`Successfully logged in as: ${data.user.email}`);
      
      if (type === "admin") {
        console.log("Checking admin status for user:", data.user.id);
        
        // Check if user is in admin_users table
        const { data: adminData, error: adminError } = await supabase
          .from('admin_users')
          .select('*')
          .eq('user_id', data.user.id)
          .maybeSingle();
        
        console.log("Admin check result:", adminData, adminError);
        
        if (adminError) {
          console.error("Error checking admin status:", adminError);
        }
        
        // For the demo admin account, automatically create an admin entry if it doesn't exist
        if (!adminData && email === DEMO_ADMIN_EMAIL) {
          console.log("Creating admin entry for demo account");
          
          const { error: insertError } = await supabase
            .from('admin_users')
            .insert({ user_id: data.user.id });
          
          if (insertError) {
            console.error("Failed to set up admin account:", insertError);
            await supabase.auth.signOut();
            throw new Error("Failed to set up admin account");
          }
          
          console.log("Admin entry created successfully");
          
          toast({
            title: "Admin Setup Complete",
            description: "Demo admin account is ready to use.",
          });
        } else if (!adminData) {
          // Not the demo admin and not in admin_users table
          console.log("User is not an admin");
          await supabase.auth.signOut();
          throw new Error("Not authorized as admin");
        }
        
        toast({
          title: "Admin Access Granted",
          description: "Welcome to the admin dashboard.",
        });
        
        navigate("/admin");
      } else {
        toast({
          title: "Welcome back!",
          description: "You have successfully logged in.",
        });
        
        navigate("/user-profile");
      }
    } catch (error: any) {
      console.error("Login error:", error);
      toast({
        title: type === "admin" ? "Admin Access Denied" : "Login Failed",
        description: error.message || "Invalid credentials. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      onClose();
    }
  };

  const handleSignUp = async (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (type === "admin") {
      toast({
        title: "Admin Registration",
        description: "Please contact the system administrator for admin access.",
        variant: "default",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: "",
          }
        }
      });
      
      if (error) throw error;
      
      toast({
        title: "Account created!",
        description: "Please check your email to verify your account.",
      });
      
      onClose();
    } catch (error: any) {
      toast({
        title: "Registration failed",
        description: error.message || "Could not create account. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{type === "user" ? "User Login" : "Admin Login"}</DialogTitle>
          <DialogDescription>
            {type === "user" 
              ? "Sign in to access your personal dashboard and saved workouts." 
              : "Secure admin access only. Unauthorized access is prohibited."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleLogin} className="space-y-4 pt-4">
          <div className="grid w-full items-center gap-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="your@email.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              required
            />
          </div>
          
          <div className="grid w-full items-center gap-2">
            <Label htmlFor="password">Password</Label>
            <Input 
              id="password" 
              type="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              required
            />
          </div>
          
          {type === "admin" && (
            <div className="text-sm text-muted-foreground bg-muted p-3 rounded-md">
              <p className="font-semibold">Demo Admin Credentials:</p>
              <p>Email: {DEMO_ADMIN_EMAIL}</p>
              <p>Password: {DEMO_ADMIN_PASSWORD}</p>
            </div>
          )}
          
          <div className="flex justify-between items-center pt-4">
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <div className="space-x-2">
              {type === "user" && (
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={handleSignUp}
                  disabled={isLoading}
                >
                  Sign Up
                </Button>
              )}
              <Button 
                type="submit" 
                className="bg-fitOrange hover:bg-orange-600"
                disabled={isLoading}
              >
                {isLoading ? "Processing..." : type === "user" ? "Login" : "Access Admin"}
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
