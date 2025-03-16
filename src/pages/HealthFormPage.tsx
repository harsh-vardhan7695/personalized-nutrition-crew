
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import UserForm, { UserData } from "@/components/UserForm";
import ResultsDisplay from "@/components/ResultsDisplay";

const HealthFormPage = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [formCompleted, setFormCompleted] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
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
      
      // Check if user already has health info
      try {
        const { data: healthData, error: healthError } = await supabase
          .from("user_health_info")
          .select("*")
          .eq("user_id", data.session.user.id)
          .maybeSingle();
          
        if (healthError) throw healthError;
        
        if (healthData) {
          // Convert the JSONB goals to string array if needed
          const goalsArray = Array.isArray(healthData.goals) 
            ? healthData.goals 
            : (typeof healthData.goals === 'object' ? Object.values(healthData.goals) : []);
            
          setUserData({
            age: healthData.age || 30,
            gender: healthData.gender || "Male",
            height: healthData.height || "",
            weight: healthData.weight || "",
            activityLevel: healthData.activity_level || "Moderately Active",
            goals: goalsArray as string[],
            medicalConditions: healthData.medical_conditions || "",
            medications: healthData.medications || "",
            allergies: healthData.allergies || "",
            foodPreferences: healthData.food_preferences || "",
            cookingAbility: healthData.cooking_ability || "Average",
            budget: healthData.budget || "Moderate",
            culturalFactors: healthData.cultural_factors || ""
          });
        }
      } catch (fetchError) {
        console.error("Error fetching health info:", fetchError);
      }
      
      setLoading(false);
    };
    
    checkSession();
  }, [navigate]);

  const handleFormComplete = async (data: UserData) => {
    try {
      setLoading(true);
      
      // Save health info to Supabase
      const { error } = await supabase
        .from("user_health_info")
        .upsert({
          user_id: user.id,
          age: data.age,
          gender: data.gender,
          height: data.height,
          weight: data.weight,
          activity_level: data.activityLevel,
          goals: data.goals,
          medical_conditions: data.medicalConditions,
          medications: data.medications,
          allergies: data.allergies,
          food_preferences: data.foodPreferences,
          cooking_ability: data.cookingAbility,
          budget: data.budget,
          cultural_factors: data.culturalFactors,
          updated_at: new Date().toISOString()
        }, { onConflict: 'user_id' });
        
      if (error) throw error;
      
      // Show success toast
      toast({
        title: "Health information saved",
        description: "Your health profile has been updated successfully",
      });
      
      // Set the form as completed and store user data for display
      setUserData(data);
      setFormCompleted(true);
    } catch (error: any) {
      console.error("Error saving health info:", error);
      toast({
        title: "Error saving health information",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleBackToForm = () => {
    setFormCompleted(false);
  };

  const handleBackToDashboard = () => {
    navigate("/dashboard");
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
        {!formCompleted && (
          <div className="flex items-center mb-8">
            <Button variant="outline" onClick={handleBackToDashboard} className="mr-4">
              Back to Dashboard
            </Button>
            <h1 className="text-3xl font-bold">Health Assessment</h1>
          </div>
        )}
        
        {!formCompleted ? (
          <UserForm 
            onComplete={handleFormComplete} 
            initialData={userData || undefined}
          />
        ) : (
          userData && <ResultsDisplay userData={userData} onBack={handleBackToForm} />
        )}
      </div>
    </div>
  );
};

export default HealthFormPage;
