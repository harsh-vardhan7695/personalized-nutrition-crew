
import React, { useState } from 'react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import InfoCard from './InfoCard';
import ProgressIndicator from './ProgressIndicator';
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";

interface UserFormProps {
  onComplete: (data: UserData) => void;
  className?: string;
}

export interface UserData {
  // Basic Information
  age: number;
  gender: string;
  height: string;
  weight: string;
  activityLevel: string;
  goals: string[];
  
  // Health Information
  medicalConditions: string;
  medications: string;
  allergies: string;
  
  // Preferences & Lifestyle
  foodPreferences: string;
  cookingAbility: string;
  budget: string;
  culturalFactors: string;
}

const ACTIVITY_LEVELS = [
  "Sedentary", 
  "Lightly Active", 
  "Moderately Active", 
  "Very Active", 
  "Extremely Active"
];

const NUTRITION_GOALS = [
  "Weight Loss", 
  "Weight Gain", 
  "Maintenance", 
  "Muscle Building", 
  "Better Energy", 
  "Improved Athletic Performance", 
  "Disease Management", 
  "General Health"
];

const COOKING_SKILLS = [
  "Very Limited", 
  "Basic/Quick Meals", 
  "Average", 
  "Advanced/Can Spend Time", 
  "Professional Level"
];

const BUDGET_LEVELS = [
  "Very Limited", 
  "Budget Conscious", 
  "Moderate", 
  "Flexible", 
  "No Constraints"
];

const FORM_STEPS = [
  "Basic Info", 
  "Health Details", 
  "Preferences"
];

const UserForm: React.FC<UserFormProps> = ({ 
  onComplete,
  className 
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form data state
  const [userData, setUserData] = useState<UserData>({
    age: 30,
    gender: "Male",
    height: "",
    weight: "",
    activityLevel: "Moderately Active",
    goals: ["General Health"],
    medicalConditions: "",
    medications: "",
    allergies: "",
    foodPreferences: "",
    cookingAbility: "Average",
    budget: "Moderate",
    culturalFactors: ""
  });

  // Handle input changes
  const handleChange = (field: keyof UserData, value: any) => {
    setUserData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle goal selection (multi-select)
  const toggleGoal = (goal: string) => {
    setUserData(prev => {
      const goals = [...prev.goals];
      const index = goals.indexOf(goal);
      
      if (index >= 0) {
        goals.splice(index, 1);
      } else {
        goals.push(goal);
      }
      
      return {
        ...prev,
        goals
      };
    });
  };

  // Navigation functions
  const goToNextStep = () => {
    if (currentStep < FORM_STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo(0, 0);
    }
  };

  const goToPrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      onComplete(userData);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={cn("w-full max-w-3xl mx-auto animate-fade-in", className)}>
      <ProgressIndicator 
        steps={FORM_STEPS} 
        currentStep={currentStep} 
        className="mb-8"
      />
      
      <InfoCard className="mb-6">
        {currentStep === 0 && (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-2xl font-semibold">Personal Information</h2>
            <p className="text-muted-foreground">Let's start with some basic information about you.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  min={1}
                  max={120}
                  value={userData.age || ''}
                  onChange={(e) => handleChange('age', parseInt(e.target.value) || '')}
                  className="focus-ring"
                />
              </div>
              
              <div className="space-y-2">
                <Label>Gender</Label>
                <RadioGroup 
                  value={userData.gender} 
                  onValueChange={(value) => handleChange('gender', value)}
                  className="flex space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Male" id="male" />
                    <Label htmlFor="male" className="cursor-pointer">Male</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Female" id="female" />
                    <Label htmlFor="female" className="cursor-pointer">Female</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Other" id="other" />
                    <Label htmlFor="other" className="cursor-pointer">Other</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="height">Height (e.g., 5'10" or 178 cm)</Label>
                <Input
                  id="height"
                  placeholder="Enter your height"
                  value={userData.height}
                  onChange={(e) => handleChange('height', e.target.value)}
                  className="focus-ring"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="weight">Weight (e.g., 160 lbs or 73 kg)</Label>
                <Input
                  id="weight"
                  placeholder="Enter your weight"
                  value={userData.weight}
                  onChange={(e) => handleChange('weight', e.target.value)}
                  className="focus-ring"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Activity Level</Label>
              <Select
                value={userData.activityLevel}
                onValueChange={(value) => handleChange('activityLevel', value)}
              >
                <SelectTrigger className="focus-ring">
                  <SelectValue placeholder="Select activity level" />
                </SelectTrigger>
                <SelectContent>
                  {ACTIVITY_LEVELS.map((level) => (
                    <SelectItem key={level} value={level}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-3">
              <Label>Nutrition Goals (Select all that apply)</Label>
              <div className="flex flex-wrap gap-2">
                {NUTRITION_GOALS.map((goal) => (
                  <Button
                    key={goal}
                    type="button"
                    variant={userData.goals.includes(goal) ? "default" : "outline"}
                    size="sm"
                    className={cn(
                      "rounded-full transition-all",
                      userData.goals.includes(goal) 
                        ? "bg-primary text-white" 
                        : "bg-white hover:bg-blue-50"
                    )}
                    onClick={() => toggleGoal(goal)}
                  >
                    {goal}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {currentStep === 1 && (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-2xl font-semibold">Health Information</h2>
            <p className="text-muted-foreground">Help us understand your health context for better recommendations.</p>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="medicalConditions">Medical Conditions (separate with commas)</Label>
                <Textarea
                  id="medicalConditions"
                  placeholder="E.g., Diabetes Type 2, Hypertension, Hypothyroidism..."
                  value={userData.medicalConditions}
                  onChange={(e) => handleChange('medicalConditions', e.target.value)}
                  className="focus-ring min-h-[100px]"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="medications">Current Medications (separate with commas)</Label>
                <Textarea
                  id="medications"
                  placeholder="E.g., Metformin, Lisinopril, Levothyroxine..."
                  value={userData.medications}
                  onChange={(e) => handleChange('medications', e.target.value)}
                  className="focus-ring min-h-[100px]"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="allergies">Food Allergies/Intolerances (separate with commas)</Label>
                <Textarea
                  id="allergies"
                  placeholder="E.g., Lactose, Gluten, Shellfish, Peanuts..."
                  value={userData.allergies}
                  onChange={(e) => handleChange('allergies', e.target.value)}
                  className="focus-ring min-h-[100px]"
                />
              </div>
            </div>
          </div>
        )}
        
        {currentStep === 2 && (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-2xl font-semibold">Preferences & Lifestyle</h2>
            <p className="text-muted-foreground">Tell us about your preferences to personalize your plan.</p>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="foodPreferences">Food Preferences & Dislikes</Label>
                <Textarea
                  id="foodPreferences"
                  placeholder="E.g., Prefer plant-based, dislike seafood..."
                  value={userData.foodPreferences}
                  onChange={(e) => handleChange('foodPreferences', e.target.value)}
                  className="focus-ring min-h-[100px]"
                />
              </div>
              
              <div className="space-y-2">
                <Label>Cooking Skills & Available Time</Label>
                <Select
                  value={userData.cookingAbility}
                  onValueChange={(value) => handleChange('cookingAbility', value)}
                >
                  <SelectTrigger className="focus-ring">
                    <SelectValue placeholder="Select cooking level" />
                  </SelectTrigger>
                  <SelectContent>
                    {COOKING_SKILLS.map((level) => (
                      <SelectItem key={level} value={level}>
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Budget Considerations</Label>
                <Select
                  value={userData.budget}
                  onValueChange={(value) => handleChange('budget', value)}
                >
                  <SelectTrigger className="focus-ring">
                    <SelectValue placeholder="Select budget level" />
                  </SelectTrigger>
                  <SelectContent>
                    {BUDGET_LEVELS.map((level) => (
                      <SelectItem key={level} value={level}>
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="culturalFactors">Cultural or Religious Dietary Factors</Label>
                <Textarea
                  id="culturalFactors"
                  placeholder="E.g., Halal, Kosher, Mediterranean tradition..."
                  value={userData.culturalFactors}
                  onChange={(e) => handleChange('culturalFactors', e.target.value)}
                  className="focus-ring min-h-[100px]"
                />
              </div>
            </div>
          </div>
        )}
      </InfoCard>
      
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={goToPrevStep}
          disabled={currentStep === 0 || isSubmitting}
          className={cn(
            "rounded-full px-6 py-6 text-base bg-white shadow-sm hover:shadow-md focus-ring",
            currentStep === 0 ? "opacity-0 pointer-events-none" : ""
          )}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Previous
        </Button>
        
        {currentStep < FORM_STEPS.length - 1 ? (
          <Button
            onClick={goToNextStep}
            className="rounded-full px-6 py-6 text-base shadow-lg hover:shadow-xl focus-ring"
          >
            Next
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="rounded-full px-6 py-6 text-base shadow-lg hover:shadow-xl focus-ring"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing
              </>
            ) : (
              'Generate Plan'
            )}
          </Button>
        )}
      </div>
    </div>
  );
};

export default UserForm;
