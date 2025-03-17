
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check, ShoppingCart, Utensils, Calendar, Star } from "lucide-react";
import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import { Link } from "react-router-dom";
import Testimonials from "@/components/Testimonials";

const Index = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      {/* Hero Section */}
      <Hero onGetStarted={() => navigate("/auth")} />
      
      {/* Create your meal plan in seconds */}
      <section className="py-20 bg-slate-50">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Create your meal plan right here in seconds</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-panel rounded-xl p-6 shadow-lg">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Calendar className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Personalized Plans</h3>
              <p className="text-gray-600">Get meal plans tailored to your health goals, dietary restrictions, and food preferences.</p>
            </div>
            
            <div className="glass-panel rounded-xl p-6 shadow-lg">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Utensils className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">AI-Powered Recipes</h3>
              <p className="text-gray-600">Discover delicious recipes that match your nutritional needs and cooking skill level.</p>
            </div>
            
            <div className="glass-panel rounded-xl p-6 shadow-lg">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                <ShoppingCart className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Smart Grocery Lists</h3>
              <p className="text-gray-600">Automatically generate shopping lists based on your meal plan to save time and reduce waste.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <Testimonials />
      
      {/* Eating smart section */}
      <section className="py-16 bg-slate-50">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-16">Eating smart has never been easier</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                <Utensils className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Follow any eating style or create your own</h3>
                <p className="text-gray-600">You can customize popular eating styles like vegan and paleo to match your needs and preferences.</p>
              </div>
            </div>
            
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                <Check className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Reduce food waste</h3>
                <p className="text-gray-600">Planning ahead means less produce going bad in the fridge. And what you already own is the virtual pantry and our algorithms will use it all with priority.</p>
              </div>
            </div>
            
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center">
                <Calendar className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Take the anxiety out of picking what to eat</h3>
                <p className="text-gray-600">Make the important decisions ahead of time and on your own schedule. Then there's nothing to worry about when it's time to eat.</p>
              </div>
            </div>
            
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center">
                <ShoppingCart className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Automatic grocery lists</h3>
                <p className="text-gray-600">No more skipping meals because you're missing ingredients. Review your meals for the week and get groceries delivered or schedule a pickup.</p>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center">
            <Button size="lg" onClick={() => navigate("/auth")} className="rounded-md px-8">
              Create A Free Account
            </Button>
          </div>
        </div>
      </section>
      
      {/* Pro section */}
      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 gap-12 items-center">
            <div className="text-center">
              <h3 className="text-2xl font-bold">
                <span className="text-slate-800">NutriPlan</span> <span className="text-primary">Pro</span>
              </h3>
              <p className="text-sm text-gray-500 mb-4">For Health & Fitness Professionals</p>
              <p className="text-lg mb-6">Powerful, fast meal planning to level up your business.</p>
              <Button 
                variant="outline" 
                size="lg" 
                className="rounded-md"
                asChild
              >
                <Link to="/professionals">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
