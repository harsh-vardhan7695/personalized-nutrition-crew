
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Users, FileText, Smartphone, Mail } from "lucide-react";
import Layout from "@/components/Layout";

const ProfessionalsPage = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-orange-50 to-rose-50">
        <div className="container grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-6 max-w-xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900">
              Powerful, Fast Meal Planning To Level Up Your Business
            </h1>
            
            <p className="text-lg text-muted-foreground">
              NutriPlan Pro lets fitness and health professionals expand their services and provide even more value to their clients — all without eating into everyone's busy schedules.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                variant="default" 
                size="lg" 
                className="rounded-md text-base font-medium bg-orange-500 hover:bg-orange-600"
              >
                See Our Features
              </Button>
              
              <Button 
                variant="secondary" 
                size="lg" 
                className="rounded-md text-base font-medium"
              >
                Start Free Trial <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="hidden lg:block">
            <img 
              src="/lovable-uploads/9c211b6e-7b01-44db-af25-b9791c1be1da.png" 
              alt="NutriPlan Professional Dashboard" 
              className="rounded-lg shadow-lg w-full"
            />
          </div>
        </div>
      </section>
      
      {/* Testimonial section */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="order-2 lg:order-1">
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80" 
                alt="Nutrition Professional" 
                className="rounded-lg shadow-md mx-auto max-w-xs"
              />
            </div>
            
            <div className="order-1 lg:order-2 space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold mb-8">We make your meal planning services easy...</h2>
              
              <p className="text-muted-foreground">
                Trainers, coaches, and nutrition experts all understand the importance of diet when it comes to their clients hitting fitness and health goals.
              </p>
              
              <p className="text-muted-foreground">
                With NutriPlan Pro, you can create nutritious meal plans in minutes. No more choosing foods one at a time or juggling messy spreadsheets.
              </p>
              
              <h3 className="text-xl font-bold pt-4">...and flexible</h3>
              
              <p className="text-muted-foreground">
                You have the ability to customize each plan to individual needs of your clients. And you can give them direct access to our app to select foods, see nutrition info, and access shopping lists.
              </p>
              
              <p className="text-muted-foreground mt-4">
                Check out our overview of the best meal planning software available to professionals.
              </p>
              
              <div className="bg-slate-50 p-6 rounded-lg mt-8 border border-slate-100">
                <blockquote className="text-slate-700 italic">
                  " NutriPlan Pro is a life-changer and a game-changer. It's had a huge impact on the number of clients that I can reach with meal planning services, and it has been a key factor in the recent growth of my business. "
                </blockquote>
                <p className="mt-4 font-medium">Nadia Shokrani, Owner of N-Hance</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-slate-800 text-white">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-12">NutriPlan Pro Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <div className="flex flex-col items-start text-left p-6 rounded-lg hover:bg-slate-700/50 transition-colors">
              <div className="mb-4 p-3 rounded-full bg-slate-700">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  <path d="M2 12h20" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Plan Meals Based On Goals</h3>
              <p className="text-slate-300">
                Fully customizable plans according to a range of caloric and macro goals, preferences, and restrictions
              </p>
            </div>
            
            <div className="flex flex-col items-start text-left p-6 rounded-lg hover:bg-slate-700/50 transition-colors">
              <div className="mb-4 p-3 rounded-full bg-slate-700">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
                  <path d="M4 22v-7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Add Your Own Branding</h3>
              <p className="text-slate-300">
                Create a consistent feel with your services by adding your logo to the plans you share. The NutriPlan watermark and logo will be removed from your PDFs.
              </p>
            </div>
            
            <div className="flex flex-col items-start text-left p-6 rounded-lg hover:bg-slate-700/50 transition-colors">
              <div className="mb-4 p-3 rounded-full bg-slate-700">
                <Smartphone className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Provide App Access To Your Clients</h3>
              <p className="text-slate-300">
                Allow your clients to stay engaged with their meal plans on our web and mobile apps
              </p>
            </div>
            
            <div className="flex flex-col items-start text-left p-6 rounded-lg hover:bg-slate-700/50 transition-colors">
              <div className="mb-4 p-3 rounded-full bg-slate-700">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Save Meal Plans For Easy Re-Use</h3>
              <p className="text-slate-300">
                Generate plans based on the past selections from your account or your client's account
              </p>
            </div>
            
            <div className="flex flex-col items-start text-left p-6 rounded-lg hover:bg-slate-700/50 transition-colors">
              <div className="mb-4 p-3 rounded-full bg-slate-700">
                <Mail className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Email Plans To Your Clients</h3>
              <p className="text-slate-300">
                Send your clients their latest meal plans and recipes via email or PDF. View a sample email.
              </p>
            </div>
            
            <div className="flex flex-col items-start text-left p-6 rounded-lg hover:bg-slate-700/50 transition-colors">
              <div className="mb-4 p-3 rounded-full bg-slate-700">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Service Your Clients In One Spot</h3>
              <p className="text-slate-300">
                Use the admin dashboard to quickly jump between client accounts and make updates
              </p>
            </div>
          </div>
          
          <div className="mt-12">
            <Button 
              size="lg" 
              className="rounded-md text-base font-medium bg-green-600 hover:bg-green-700"
            >
              Sign Up For Professional Account
            </Button>
          </div>
        </div>
      </section>
      
      {/* Pricing Section */}
      <section className="py-16 bg-white">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-12">
            Whether you're a personal trainer, dietitian, or gym owner, our professional plans scale with your business
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="border rounded-lg shadow-sm p-6 flex flex-col h-full">
              <h3 className="text-xl font-bold mb-2">Starter</h3>
              <div className="text-3xl font-bold mb-4">$29<span className="text-base font-normal text-muted-foreground">/month</span></div>
              <p className="text-muted-foreground mb-6">Perfect for independent trainers</p>
              <ul className="space-y-3 mb-8 text-left">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>Up to 10 clients</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>Basic customization</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>Email support</span>
                </li>
              </ul>
              <Button variant="outline" className="mt-auto">Get Started</Button>
            </div>
            
            <div className="border rounded-lg shadow-md p-6 flex flex-col relative bg-gradient-to-b from-slate-50 to-white">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-medium">Most Popular</div>
              <h3 className="text-xl font-bold mb-2">Professional</h3>
              <div className="text-3xl font-bold mb-4">$49<span className="text-base font-normal text-muted-foreground">/month</span></div>
              <p className="text-muted-foreground mb-6">For growing practices</p>
              <ul className="space-y-3 mb-8 text-left">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>Up to 30 clients</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>Advanced customization</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>Priority support</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>White-label PDF exports</span>
                </li>
              </ul>
              <Button className="mt-auto bg-primary">Get Started</Button>
            </div>
            
            <div className="border rounded-lg shadow-sm p-6 flex flex-col h-full">
              <h3 className="text-xl font-bold mb-2">Enterprise</h3>
              <div className="text-3xl font-bold mb-4">$99<span className="text-base font-normal text-muted-foreground">/month</span></div>
              <p className="text-muted-foreground mb-6">For clinics and facilities</p>
              <ul className="space-y-3 mb-8 text-left">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>Unlimited clients</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>Full customization</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>Dedicated account manager</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>API access</span>
                </li>
              </ul>
              <Button variant="outline" className="mt-auto">Contact Sales</Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ProfessionalsPage;
