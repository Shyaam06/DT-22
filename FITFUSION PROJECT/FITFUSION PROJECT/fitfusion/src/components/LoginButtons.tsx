
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { User, LogIn, LogOut } from "lucide-react";
import LoginModal from "./LoginModal";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const LoginButtons = () => {
  const [userModalOpen, setUserModalOpen] = useState(false);
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    // Check current auth state
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
      
      if (session?.user) {
        // Check if user is admin
        const { data } = await supabase
          .from('admin_users')
          .select('*')
          .eq('user_id', session.user.id)
          .single();
          
        setIsAdmin(!!data);
      }
    };
    
    checkUser();
    
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user || null);
        
        if (session?.user) {
          // Check if user is admin
          const { data } = await supabase
            .from('admin_users')
            .select('*')
            .eq('user_id', session.user.id)
            .single();
            
          setIsAdmin(!!data);
        } else {
          setIsAdmin(false);
        }
      }
    );
    
    return () => {
      subscription.unsubscribe();
    };
  }, []);
  
  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Logged Out",
      description: "You have successfully logged out.",
    });
    navigate("/");
  };
  
  const handleUserProfile = () => {
    if (user) {
      navigate("/user-profile");
    } else {
      setUserModalOpen(true);
    }
  };
  
  const handleAdminLogin = () => {
    // Navigate directly to admin dashboard without authentication
    navigate("/admin");
  };

  return (
    <div className="flex items-center gap-2">
      <Button 
        variant="ghost" 
        onClick={handleUserProfile}
        className="flex items-center gap-2 text-sm"
      >
        <User size={18} />
        <span className="hidden md:inline">{user ? "Profile" : "Login"}</span>
      </Button>
      
      {user ? (
        <Button 
          variant="ghost"
          onClick={handleLogout}
          className="flex items-center gap-2 text-sm"
        >
          <LogOut size={18} />
          <span className="hidden md:inline">Logout</span>
        </Button>
      ) : (
        <Button 
          variant="ghost"
          onClick={handleAdminLogin}
          className="flex items-center gap-2 text-sm"
        >
          <LogIn size={18} />
          <span className="hidden md:inline">Admin</span>
        </Button>
      )}
      
      <LoginModal 
        isOpen={userModalOpen} 
        onClose={() => setUserModalOpen(false)} 
        type="user" 
      />
      
      <LoginModal 
        isOpen={adminModalOpen} 
        onClose={() => setAdminModalOpen(false)} 
        type="admin" 
      />
    </div>
  );
};

export default LoginButtons;
