
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-blue-50 p-4">
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Personalized Nutrition Planner</h1>
        <p className="text-lg text-gray-700 mb-8">
          Get personalized nutrition advice based on your health profile, medical conditions, and lifestyle preferences using advanced AI agents.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            onClick={() => navigate("/auth")}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Get Started
          </Button>
          
          <Button 
            size="lg" 
            variant="outline" 
            onClick={() => navigate("/auth")}
          >
            Sign In
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
