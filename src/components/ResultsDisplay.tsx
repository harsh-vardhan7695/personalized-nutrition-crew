
import React, { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { UserData } from './UserForm';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import InfoCard from './InfoCard';
import RatingDialog from './RatingDialog';
import { 
  ArrowLeft, 
  Clipboard, 
  Download, 
  FileText, 
  List, 
  MessageSquare, 
  ShoppingBag, 
  Apple, 
  Pill, 
  HeartPulse, 
  Utensils, 
  Salad, 
  Clock
} from "lucide-react";

interface ResultsDisplayProps {
  userData: UserData;
  onBack: () => void;
  className?: string;
}

// Sample nutrition plan content (simulated result)
const sampleNutritionPlan = `
# Personalized Nutrition Plan

## Nutritional Requirements

Based on your demographics and activity level, here are your nutritional requirements:

- **Daily Caloric Needs**: 2,100 calories
- **Protein**: 120-150g (25-30% of total calories)
- **Carbohydrates**: 210-260g (40-50% of total calories)
- **Fats**: 58-70g (25-30% of total calories)
- **Water**: Minimum 3 liters daily

## Medical Considerations

Given your health information, here are specific nutritional adjustments:

- **Limited Sodium**: Keep below 2,000mg daily
- **Increased Potassium**: Aim for 3,500-4,700mg daily
- **Moderate Glycemic Index**: Focus on low GI carbohydrates
- **Avoid**: Processed foods with artificial preservatives

## 7-Day Meal Plan

### Day 1

**Breakfast:**
- Overnight oats with almond milk, berries, and 1 tbsp flaxseeds
- 1 medium apple
- Green tea (unsweetened)

**Lunch:**
- Grilled chicken salad with mixed greens, cherry tomatoes, cucumber, and olive oil dressing
- 1/2 cup brown rice
- 8oz water with lemon

**Dinner:**
- Baked salmon (4oz) with dill and lemon
- Steamed broccoli and carrots
- Small sweet potato
- Sparkling water

**Snack:**
- Greek yogurt with honey and walnuts
- Herbal tea

### Day 2

**Breakfast:**
- Vegetable omelet (2 eggs, spinach, tomatoes, mushrooms)
- 1 slice whole grain toast
- 1/2 avocado
- Black coffee (if desired)

**Lunch:**
- Quinoa bowl with roasted vegetables and grilled tofu
- Mixed green side salad
- Water with cucumber slices

**Dinner:**
- Turkey meatballs with zucchini noodles and tomato sauce
- Small side salad with balsamic vinaigrette
- Herbal tea

**Snack:**
- Apple slices with 1 tbsp almond butter
- Sparkling water

[Days 3-7 would follow with similar detailed meal plans]

## Grocery List

### Proteins:
- Chicken breast (organic if possible)
- Wild-caught salmon
- Ground turkey (lean)
- Tofu (firm)
- Greek yogurt
- Eggs

### Vegetables:
- Spinach
- Broccoli
- Zucchini
- Carrots
- Mixed greens
- Cherry tomatoes
- Cucumber
- Bell peppers
- Mushrooms

### Fruits:
- Apples
- Berries (mixed)
- Lemons
- Avocados
- Bananas

### Grains & Starches:
- Brown rice
- Quinoa
- Sweet potatoes
- Whole grain bread
- Oats (steel-cut or rolled)

### Other:
- Olive oil
- Almond milk
- Nuts (walnuts, almonds)
- Seeds (flax, chia)
- Herbs and spices
- Honey
- Balsamic vinegar

## Supplementation Recommendations

Based on your profile, consider these supplements (consult with your healthcare provider first):
- Vitamin D3: 1000-2000 IU daily
- Magnesium: 300mg daily
- Omega-3: 1000mg daily

## Monitoring Progress

- Track your meals in a food journal for the first 2 weeks
- Weigh yourself weekly (same day, same time)
- Note energy levels and any digestive symptoms
- Schedule a follow-up assessment in 4 weeks

## Adjustments

This plan may need adjustment based on your progress and how you feel. Stay hydrated throughout the day and listen to your body's hunger and fullness cues.
`;

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ 
  userData,
  onBack,
  className 
}) => {
  const [activeTab, setActiveTab] = useState("plan");
  const [copied, setCopied] = useState(false);
  const [showRatingDialog, setShowRatingDialog] = useState(false);
  
  useEffect(() => {
    // Show rating dialog after 3 seconds of displaying results
    const timer = setTimeout(() => {
      setShowRatingDialog(true);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(sampleNutritionPlan);
    setCopied(true);
    
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };
  
  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([sampleNutritionPlan], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "my_nutrition_plan.md";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className={cn("w-full max-w-4xl mx-auto pt-8 animate-fade-in", className)}>
      <Button
        variant="outline"
        onClick={onBack}
        className="mb-6 rounded-full px-6 py-5 text-base bg-white shadow-sm hover:shadow-md focus-ring"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Start Over
      </Button>
      
      <div className="text-center mb-10 animate-slide-down">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
          Your Personalized Nutrition Plan
        </h1>
        <p className="text-muted-foreground mt-2">
          Carefully crafted for your unique needs and preferences
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        <Card className="lg:col-span-1 overflow-hidden border-none shadow-md bg-gradient-to-br from-blue-50 to-white">
          <CardContent className="p-5">
            <h3 className="font-medium text-lg mb-4 flex items-center text-blue-700">
              <HeartPulse className="h-5 w-5 mr-2 text-blue-500" />
              About You
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between bg-white p-2 rounded-lg shadow-sm">
                <span className="text-muted-foreground">Age:</span> 
                <span className="font-medium">{userData.age}</span>
              </div>
              <div className="flex items-center justify-between bg-white p-2 rounded-lg shadow-sm">
                <span className="text-muted-foreground">Gender:</span> 
                <span className="font-medium">{userData.gender}</span>
              </div>
              <div className="flex items-center justify-between bg-white p-2 rounded-lg shadow-sm">
                <span className="text-muted-foreground">Height:</span> 
                <span className="font-medium">{userData.height}</span>
              </div>
              <div className="flex items-center justify-between bg-white p-2 rounded-lg shadow-sm">
                <span className="text-muted-foreground">Weight:</span> 
                <span className="font-medium">{userData.weight}</span>
              </div>
              <div className="flex items-center justify-between bg-white p-2 rounded-lg shadow-sm">
                <span className="text-muted-foreground">Activity:</span> 
                <span className="font-medium">{userData.activityLevel}</span>
              </div>
              <Separator className="my-2" />
              <div>
                <span className="text-muted-foreground flex items-center mb-2">
                  <Salad className="h-4 w-4 mr-1 text-green-500" />
                  Goals:
                </span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {userData.goals.map(goal => (
                    <span 
                      key={goal} 
                      className="inline-flex items-center rounded-full bg-gradient-to-r from-blue-50 to-blue-100 px-3 py-1 text-xs font-medium text-blue-700 border border-blue-200"
                    >
                      {goal}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <InfoCard className="lg:col-span-3 shadow-lg border-none overflow-hidden" highlight>
          <Tabs defaultValue="plan" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6 p-1 bg-blue-50 rounded-xl">
              <TabsTrigger 
                value="plan" 
                className="rounded-lg py-3 data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-md"
              >
                <FileText className="h-4 w-4 mr-2" />
                Nutrition Plan
              </TabsTrigger>
              <TabsTrigger 
                value="meals" 
                className="rounded-lg py-3 data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-md"
              >
                <Utensils className="h-4 w-4 mr-2" />
                Meal Plan
              </TabsTrigger>
              <TabsTrigger 
                value="grocery" 
                className="rounded-lg py-3 data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-md"
              >
                <ShoppingBag className="h-4 w-4 mr-2" />
                Grocery List
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="plan" className="mt-0 animate-fade-in">
              <div className="prose max-w-none prose-headings:text-blue-700 prose-headings:font-semibold prose-h2:text-xl prose-strong:text-blue-600">
                <div className="flex items-center mb-4 p-4 rounded-xl bg-blue-50">
                  <Apple className="h-8 w-8 text-blue-600 mr-3" />
                  <div>
                    <h2 className="mb-1 text-blue-700">Nutritional Requirements</h2>
                    <p className="text-sm text-muted-foreground m-0">Based on your demographics and activity level</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="p-4 rounded-xl bg-white shadow-sm border border-blue-100">
                    <p className="font-medium text-blue-700 mb-3">Daily Needs</p>
                    <ul className="list-none p-0 m-0 space-y-2">
                      <li className="flex justify-between items-center p-2 bg-blue-50 rounded-lg">
                        <span>Calories</span>
                        <span className="font-medium">2,100 calories</span>
                      </li>
                      <li className="flex justify-between items-center p-2 bg-blue-50 rounded-lg">
                        <span>Protein</span>
                        <span className="font-medium">120-150g</span>
                      </li>
                      <li className="flex justify-between items-center p-2 bg-blue-50 rounded-lg">
                        <span>Carbohydrates</span>
                        <span className="font-medium">210-260g</span>
                      </li>
                      <li className="flex justify-between items-center p-2 bg-blue-50 rounded-lg">
                        <span>Fats</span>
                        <span className="font-medium">58-70g</span>
                      </li>
                      <li className="flex justify-between items-center p-2 bg-blue-50 rounded-lg">
                        <span>Water</span>
                        <span className="font-medium">3+ liters daily</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="p-4 rounded-xl bg-white shadow-sm border border-blue-100">
                    <div className="flex items-center mb-3">
                      <Pill className="h-4 w-4 text-blue-600 mr-2" />
                      <p className="font-medium text-blue-700 m-0">Supplementation</p>
                    </div>
                    <ul className="list-none p-0 m-0 space-y-2">
                      <li className="flex justify-between items-center p-2 bg-blue-50 rounded-lg">
                        <span>Vitamin D3</span>
                        <span className="font-medium">1000-2000 IU daily</span>
                      </li>
                      <li className="flex justify-between items-center p-2 bg-blue-50 rounded-lg">
                        <span>Magnesium</span>
                        <span className="font-medium">300mg daily</span>
                      </li>
                      <li className="flex justify-between items-center p-2 bg-blue-50 rounded-lg">
                        <span>Omega-3</span>
                        <span className="font-medium">1000mg daily</span>
                      </li>
                    </ul>
                    <p className="text-xs text-muted-foreground mt-2 italic">
                      *Consult with your healthcare provider before starting any supplements
                    </p>
                  </div>
                </div>
                
                <div className="p-4 rounded-xl bg-white shadow-sm border border-blue-100 mb-6">
                  <div className="flex items-center mb-3">
                    <MessageSquare className="h-4 w-4 text-blue-600 mr-2" />
                    <p className="font-medium text-blue-700 m-0">Medical Considerations</p>
                  </div>
                  
                  <ul className="list-none p-0 m-0 space-y-2">
                    <li className="flex items-start p-2 bg-blue-50 rounded-lg">
                      <span className="font-medium mr-2">•</span>
                      <span><strong>Limited Sodium:</strong> Keep below 2,000mg daily</span>
                    </li>
                    <li className="flex items-start p-2 bg-blue-50 rounded-lg">
                      <span className="font-medium mr-2">•</span>
                      <span><strong>Increased Potassium:</strong> Aim for 3,500-4,700mg daily</span>
                    </li>
                    <li className="flex items-start p-2 bg-blue-50 rounded-lg">
                      <span className="font-medium mr-2">•</span>
                      <span><strong>Moderate Glycemic Index:</strong> Focus on low GI carbohydrates</span>
                    </li>
                    <li className="flex items-start p-2 bg-blue-50 rounded-lg">
                      <span className="font-medium mr-2">•</span>
                      <span><strong>Avoid:</strong> Processed foods with artificial preservatives</span>
                    </li>
                  </ul>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="meals" className="mt-0 animate-fade-in">
              <div className="prose max-w-none prose-blue prose-headings:font-semibold">
                <div className="flex items-center mb-4 p-4 rounded-xl bg-blue-50">
                  <Clock className="h-8 w-8 text-blue-600 mr-3" />
                  <div>
                    <h2 className="mb-1 text-blue-700">7-Day Meal Plan</h2>
                    <p className="text-sm text-muted-foreground m-0">Balanced meals tailored to your preferences</p>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="p-4 rounded-xl bg-white shadow-sm border border-blue-100">
                    <h3 className="text-lg text-blue-700 mb-3">Day 1</h3>
                    
                    <div className="space-y-4">
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <h4 className="text-md font-medium text-blue-700 mb-2">Breakfast</h4>
                        <ul className="list-disc pl-5 mb-0">
                          <li>Overnight oats with almond milk, berries, and 1 tbsp flaxseeds</li>
                          <li>1 medium apple</li>
                          <li>Green tea (unsweetened)</li>
                        </ul>
                      </div>
                      
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <h4 className="text-md font-medium text-blue-700 mb-2">Lunch</h4>
                        <ul className="list-disc pl-5 mb-0">
                          <li>Grilled chicken salad with mixed greens, cherry tomatoes, cucumber, and olive oil dressing</li>
                          <li>1/2 cup brown rice</li>
                          <li>8oz water with lemon</li>
                        </ul>
                      </div>
                      
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <h4 className="text-md font-medium text-blue-700 mb-2">Dinner</h4>
                        <ul className="list-disc pl-5 mb-0">
                          <li>Baked salmon (4oz) with dill and lemon</li>
                          <li>Steamed broccoli and carrots</li>
                          <li>Small sweet potato</li>
                          <li>Sparkling water</li>
                        </ul>
                      </div>
                      
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <h4 className="text-md font-medium text-blue-700 mb-2">Snack</h4>
                        <ul className="list-disc pl-5 mb-0">
                          <li>Greek yogurt with honey and walnuts</li>
                          <li>Herbal tea</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 rounded-xl bg-white shadow-sm border border-blue-100">
                    <h3 className="text-lg text-blue-700 mb-3">Day 2</h3>
                    
                    <div className="space-y-4">
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <h4 className="text-md font-medium text-blue-700 mb-2">Breakfast</h4>
                        <ul className="list-disc pl-5 mb-0">
                          <li>Vegetable omelet (2 eggs, spinach, tomatoes, mushrooms)</li>
                          <li>1 slice whole grain toast</li>
                          <li>1/2 avocado</li>
                          <li>Black coffee (if desired)</li>
                        </ul>
                      </div>
                      
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <h4 className="text-md font-medium text-blue-700 mb-2">Lunch</h4>
                        <ul className="list-disc pl-5 mb-0">
                          <li>Quinoa bowl with roasted vegetables and grilled tofu</li>
                          <li>Mixed green side salad</li>
                          <li>Water with cucumber slices</li>
                        </ul>
                      </div>
                      
                      <p className="text-center text-muted-foreground italic mt-4">
                        Additional days would be shown here...
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="grocery" className="mt-0 animate-fade-in">
              <div className="prose max-w-none prose-blue prose-headings:font-semibold">
                <div className="flex items-center mb-4 p-4 rounded-xl bg-blue-50">
                  <ShoppingBag className="h-8 w-8 text-blue-600 mr-3" />
                  <div>
                    <h2 className="mb-1 text-blue-700">Grocery List</h2>
                    <p className="text-sm text-muted-foreground m-0">Everything you need for your weekly meal plan</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-white shadow-sm border border-blue-100">
                    <h3 className="text-lg text-blue-700 mb-3 flex items-center">
                      <span className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 mr-2">P</span>
                      Proteins
                    </h3>
                    <div className="space-y-2">
                      {["Chicken breast (organic if possible)", "Wild-caught salmon", "Ground turkey (lean)", "Tofu (firm)", "Greek yogurt", "Eggs"].map((item, idx) => (
                        <div key={idx} className="flex items-center p-2 bg-blue-50 rounded-lg">
                          <span className="w-4 h-4 rounded-full border border-blue-300 mr-3 flex-shrink-0"></span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="p-4 rounded-xl bg-white shadow-sm border border-blue-100">
                    <h3 className="text-lg text-blue-700 mb-3 flex items-center">
                      <span className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-700 mr-2">V</span>
                      Vegetables
                    </h3>
                    <div className="space-y-2">
                      {["Spinach", "Broccoli", "Zucchini", "Carrots", "Mixed greens", "Cherry tomatoes", "Cucumber", "Bell peppers", "Mushrooms"].map((item, idx) => (
                        <div key={idx} className="flex items-center p-2 bg-green-50 rounded-lg">
                          <span className="w-4 h-4 rounded-full border border-green-300 mr-3 flex-shrink-0"></span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="p-4 rounded-xl bg-white shadow-sm border border-blue-100">
                    <h3 className="text-lg text-blue-700 mb-3 flex items-center">
                      <span className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 mr-2">F</span>
                      Fruits
                    </h3>
                    <div className="space-y-2">
                      {["Apples", "Berries (mixed)", "Lemons", "Avocados", "Bananas"].map((item, idx) => (
                        <div key={idx} className="flex items-center p-2 bg-amber-50 rounded-lg">
                          <span className="w-4 h-4 rounded-full border border-amber-300 mr-3 flex-shrink-0"></span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="p-4 rounded-xl bg-white shadow-sm border border-blue-100">
                    <h3 className="text-lg text-blue-700 mb-3 flex items-center">
                      <span className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center text-orange-700 mr-2">G</span>
                      Grains & Starches
                    </h3>
                    <div className="space-y-2">
                      {["Brown rice", "Quinoa", "Sweet potatoes", "Whole grain bread", "Oats (steel-cut or rolled)"].map((item, idx) => (
                        <div key={idx} className="flex items-center p-2 bg-orange-50 rounded-lg">
                          <span className="w-4 h-4 rounded-full border border-orange-300 mr-3 flex-shrink-0"></span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="md:col-span-2 p-4 rounded-xl bg-white shadow-sm border border-blue-100">
                    <h3 className="text-lg text-blue-700 mb-3 flex items-center">
                      <span className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 mr-2">O</span>
                      Other Items
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {["Olive oil", "Almond milk", "Nuts (walnuts, almonds)", "Seeds (flax, chia)", "Herbs and spices", "Honey", "Balsamic vinegar"].map((item, idx) => (
                        <div key={idx} className="flex items-center p-2 bg-purple-50 rounded-lg">
                          <span className="w-4 h-4 rounded-full border border-purple-300 mr-3 flex-shrink-0"></span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="flex justify-end mt-6 space-x-3">
            <Button
              variant="outline"
              onClick={handleCopyToClipboard}
              className="rounded-full bg-white transition-all"
            >
              <Clipboard className="h-4 w-4 mr-2" />
              {copied ? "Copied!" : "Copy Plan"}
            </Button>
            <Button
              onClick={handleDownload}
              className="rounded-full bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-700 hover:to-blue-600 transition-all"
            >
              <Download className="h-4 w-4 mr-2" />
              Download Plan
            </Button>
          </div>
        </InfoCard>
      </div>
      
      <Card className="mb-10 bg-gradient-to-r from-blue-50 to-white border-none shadow-md overflow-hidden">
        <CardContent className="p-5 flex items-center">
          <MessageSquare className="h-5 w-5 mr-3 text-blue-500 flex-shrink-0" />
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">Expert Tip:</span> This nutrition plan is a starting point. 
            Pay attention to how your body responds and make adjustments as needed. 
            Consider consulting with a registered dietitian for ongoing support.
          </p>
        </CardContent>
      </Card>
      
      {/* Rating Dialog */}
      <RatingDialog 
        open={showRatingDialog} 
        onOpenChange={setShowRatingDialog} 
      />
    </div>
  );
};

export default ResultsDisplay;
