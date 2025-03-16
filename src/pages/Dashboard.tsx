
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface DietPlan {
  id: string;
  goal: string;
  status: string;
  created_at: string;
}

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [plans, setPlans] = useState<DietPlan[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      
      if (error || !data.session) {
        navigate("/auth");
        return;
      }
      
      setUser(data.session.user);
      
      // Fetch user's diet plans
      try {
        const { data: plansData, error: plansError } = await supabase
          .from("diet_plans")
          .select("*")
          .order('created_at', { ascending: false });
          
        if (plansError) throw plansError;
        
        setPlans(plansData || []);
      } catch (fetchError: any) {
        console.error("Error fetching plans:", fetchError);
        toast({
          title: "Error fetching diet plans",
          description: fetchError.message,
          variant: "destructive",
        });
      }
      
      setLoading(false);
    };
    
    checkSession();
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT") {
        navigate("/auth");
      } else if (session) {
        setUser(session.user);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, toast]);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Signed out successfully",
      });
      navigate("/auth");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return "bg-green-100 text-green-800";
      case 'pending':
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Diet Planner Dashboard</h1>
          <Button onClick={handleSignOut}>Sign Out</Button>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Welcome, {user.email}!</h2>
          <p className="text-gray-600 mb-8">
            This is your personal dashboard where you can manage your diet plans and nutrition information.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <h3 className="font-medium mb-2">Create Diet Plan</h3>
              <p className="text-sm text-gray-500 mb-4">Generate a simple diet plan quickly.</p>
              <Button variant="outline" onClick={() => navigate("/create-plan")}>
                Quick Plan
              </Button>
            </div>
            
            <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <h3 className="font-medium mb-2">Health Assessment</h3>
              <p className="text-sm text-gray-500 mb-4">Get a detailed plan based on your health profile.</p>
              <Button variant="outline" onClick={() => navigate("/health-assessment")}>
                Detailed Plan
              </Button>
            </div>
            
            <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <h3 className="font-medium mb-2">Your Profile</h3>
              <p className="text-sm text-gray-500 mb-4">Update your personal information.</p>
              <Button variant="outline" onClick={() => navigate("/profile")}>
                Edit Profile
              </Button>
            </div>
          </div>
          
          {plans.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">Your Diet Plans</h3>
              <div className="space-y-4">
                {plans.map((plan) => (
                  <div key={plan.id} className="border rounded-lg p-4 hover:shadow-sm transition-shadow">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium capitalize">{plan.goal.replace(/-/g, ' ')} Plan</h4>
                        <p className="text-sm text-gray-500">
                          Created on {new Date(plan.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <Badge className={getStatusColor(plan.status)}>
                        {plan.status === 'pending' ? 'Processing' : plan.status.charAt(0).toUpperCase() + plan.status.slice(1)}
                      </Badge>
                    </div>
                    <div className="mt-4">
                      <Button 
                        variant="outline" 
                        size="sm"
                        disabled={plan.status !== 'completed'}
                        onClick={() => {
                          if (plan.status === 'completed') {
                            navigate(`/plan/${plan.id}`);
                          } else {
                            toast({
                              title: "Plan not ready",
                              description: "Your plan is still being processed. Check back later!",
                            });
                          }
                        }}
                      >
                        {plan.status === 'completed' ? 'View Plan' : 'Plan in Progress'}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {plans.length === 0 && (
            <div className="mt-8 text-center p-6 border rounded-lg bg-gray-50">
              <h3 className="text-lg font-medium mb-2">No Diet Plans Yet</h3>
              <p className="text-gray-500 mb-4">Create your first personalized diet plan to get started.</p>
              <Button onClick={() => navigate("/create-plan")}>
                Create Your First Plan
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
