
import React, { useState } from 'react';
import { cn } from "@/lib/utils";
import { UserData } from './UserForm';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import InfoCard from './InfoCard';
import { ArrowLeft, Clipboard, Download, FileText, List, MessageSquare, ShoppingBag } from "lucide-react";

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
        <h1 className="text-3xl font-bold">Your Personalized Nutrition Plan</h1>
        <p className="text-muted-foreground mt-2">
          Carefully crafted for your unique needs and preferences
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        <InfoCard className="lg:col-span-1 p-5">
          <h3 className="font-medium text-lg mb-4">About You</h3>
          <div className="space-y-3 text-sm">
            <div>
              <span className="text-muted-foreground">Age:</span> {userData.age}
            </div>
            <div>
              <span className="text-muted-foreground">Gender:</span> {userData.gender}
            </div>
            <div>
              <span className="text-muted-foreground">Height:</span> {userData.height}
            </div>
            <div>
              <span className="text-muted-foreground">Weight:</span> {userData.weight}
            </div>
            <div>
              <span className="text-muted-foreground">Activity:</span> {userData.activityLevel}
            </div>
            <Separator className="my-2" />
            <div>
              <span className="text-muted-foreground">Goals:</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {userData.goals.map(goal => (
                  <span 
                    key={goal} 
                    className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700"
                  >
                    {goal}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </InfoCard>
        
        <InfoCard className="lg:col-span-3" highlight>
          <Tabs defaultValue="plan" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="plan" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-800">
                <FileText className="h-4 w-4 mr-2" />
                Nutrition Plan
              </TabsTrigger>
              <TabsTrigger value="meals" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-800">
                <List className="h-4 w-4 mr-2" />
                Meal Plan
              </TabsTrigger>
              <TabsTrigger value="grocery" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-800">
                <ShoppingBag className="h-4 w-4 mr-2" />
                Grocery List
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="plan" className="mt-0">
              <div className="prose max-w-none prose-blue prose-headings:font-semibold">
                <h2>Nutritional Requirements</h2>
                <p>Based on your demographics and activity level, here are your nutritional requirements:</p>
                
                <ul>
                  <li><strong>Daily Caloric Needs</strong>: 2,100 calories</li>
                  <li><strong>Protein</strong>: 120-150g (25-30% of total calories)</li>
                  <li><strong>Carbohydrates</strong>: 210-260g (40-50% of total calories)</li>
                  <li><strong>Fats</strong>: 58-70g (25-30% of total calories)</li>
                  <li><strong>Water</strong>: Minimum 3 liters daily</li>
                </ul>
                
                <h2>Medical Considerations</h2>
                <p>Given your health information, here are specific nutritional adjustments:</p>
                
                <ul>
                  <li><strong>Limited Sodium</strong>: Keep below 2,000mg daily</li>
                  <li><strong>Increased Potassium</strong>: Aim for 3,500-4,700mg daily</li>
                  <li><strong>Moderate Glycemic Index</strong>: Focus on low GI carbohydrates</li>
                  <li><strong>Avoid</strong>: Processed foods with artificial preservatives</li>
                </ul>
                
                <h2>Supplementation Recommendations</h2>
                <p>Based on your profile, consider these supplements (consult with your healthcare provider first):</p>
                
                <ul>
                  <li>Vitamin D3: 1000-2000 IU daily</li>
                  <li>Magnesium: 300mg daily</li>
                  <li>Omega-3: 1000mg daily</li>
                </ul>
              </div>
            </TabsContent>
            
            <TabsContent value="meals" className="mt-0">
              <div className="prose max-w-none prose-blue prose-headings:font-semibold">
                <h2>7-Day Meal Plan</h2>
                
                <h3>Day 1</h3>
                <h4>Breakfast:</h4>
                <ul>
                  <li>Overnight oats with almond milk, berries, and 1 tbsp flaxseeds</li>
                  <li>1 medium apple</li>
                  <li>Green tea (unsweetened)</li>
                </ul>
                
                <h4>Lunch:</h4>
                <ul>
                  <li>Grilled chicken salad with mixed greens, cherry tomatoes, cucumber, and olive oil dressing</li>
                  <li>1/2 cup brown rice</li>
                  <li>8oz water with lemon</li>
                </ul>
                
                <h4>Dinner:</h4>
                <ul>
                  <li>Baked salmon (4oz) with dill and lemon</li>
                  <li>Steamed broccoli and carrots</li>
                  <li>Small sweet potato</li>
                  <li>Sparkling water</li>
                </ul>
                
                <h4>Snack:</h4>
                <ul>
                  <li>Greek yogurt with honey and walnuts</li>
                  <li>Herbal tea</li>
                </ul>
                
                <h3>Day 2</h3>
                <h4>Breakfast:</h4>
                <ul>
                  <li>Vegetable omelet (2 eggs, spinach, tomatoes, mushrooms)</li>
                  <li>1 slice whole grain toast</li>
                  <li>1/2 avocado</li>
                  <li>Black coffee (if desired)</li>
                </ul>
                
                <h4>Lunch:</h4>
                <ul>
                  <li>Quinoa bowl with roasted vegetables and grilled tofu</li>
                  <li>Mixed green side salad</li>
                  <li>Water with cucumber slices</li>
                </ul>
                
                <p><em>Additional days would be shown here...</em></p>
              </div>
            </TabsContent>
            
            <TabsContent value="grocery" className="mt-0">
              <div className="prose max-w-none prose-blue prose-headings:font-semibold">
                <h2>Grocery List</h2>
                
                <h3>Proteins:</h3>
                <ul>
                  <li>Chicken breast (organic if possible)</li>
                  <li>Wild-caught salmon</li>
                  <li>Ground turkey (lean)</li>
                  <li>Tofu (firm)</li>
                  <li>Greek yogurt</li>
                  <li>Eggs</li>
                </ul>
                
                <h3>Vegetables:</h3>
                <ul>
                  <li>Spinach</li>
                  <li>Broccoli</li>
                  <li>Zucchini</li>
                  <li>Carrots</li>
                  <li>Mixed greens</li>
                  <li>Cherry tomatoes</li>
                  <li>Cucumber</li>
                  <li>Bell peppers</li>
                  <li>Mushrooms</li>
                </ul>
                
                <h3>Fruits:</h3>
                <ul>
                  <li>Apples</li>
                  <li>Berries (mixed)</li>
                  <li>Lemons</li>
                  <li>Avocados</li>
                  <li>Bananas</li>
                </ul>
                
                <h3>Grains & Starches:</h3>
                <ul>
                  <li>Brown rice</li>
                  <li>Quinoa</li>
                  <li>Sweet potatoes</li>
                  <li>Whole grain bread</li>
                  <li>Oats (steel-cut or rolled)</li>
                </ul>
                
                <h3>Other:</h3>
                <ul>
                  <li>Olive oil</li>
                  <li>Almond milk</li>
                  <li>Nuts (walnuts, almonds)</li>
                  <li>Seeds (flax, chia)</li>
                  <li>Herbs and spices</li>
                  <li>Honey</li>
                  <li>Balsamic vinegar</li>
                </ul>
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="flex justify-end mt-6 space-x-3">
            <Button
              variant="outline"
              onClick={handleCopyToClipboard}
              className="rounded-full bg-white"
            >
              <Clipboard className="h-4 w-4 mr-2" />
              {copied ? "Copied!" : "Copy Plan"}
            </Button>
            <Button
              onClick={handleDownload}
              className="rounded-full"
            >
              <Download className="h-4 w-4 mr-2" />
              Download Plan
            </Button>
          </div>
        </InfoCard>
      </div>
      
      <InfoCard className="mb-10 p-5 flex items-center">
        <MessageSquare className="h-5 w-5 mr-3 text-primary flex-shrink-0" />
        <p className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">Expert Tip:</span> This nutrition plan is a starting point. 
          Pay attention to how your body responds and make adjustments as needed. 
          Consider consulting with a registered dietitian for ongoing support.
        </p>
      </InfoCard>
    </div>
  );
};

export default ResultsDisplay;
