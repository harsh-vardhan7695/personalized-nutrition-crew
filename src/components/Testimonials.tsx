
import React from "react";
import { Star } from "lucide-react";
import InfoCard from "@/components/InfoCard";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah J.",
      rating: 5,
      text: "NutriPlan completely transformed my meal planning. I've saved so much time and money while eating healthier!",
      plan: "Weight Loss Plan"
    },
    {
      name: "Michael T.",
      rating: 5,
      text: "As someone who hates meal planning, this app is a game-changer. The recipes are delicious and easy to follow.",
      plan: "Muscle Gain Plan"
    },
    {
      name: "Priya K.",
      rating: 4,
      text: "I love how the app adapts to my dietary restrictions. Vegetarian meal planning has never been easier.",
      plan: "Vegetarian Plan"
    }
  ];

  return (
    <section className="py-16 bg-slate-50">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What Our Users Are Saying</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of happy users who have transformed their nutrition with NutriPlan
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <InfoCard 
              key={index} 
              className="flex flex-col h-full"
              highlight={testimonial.rating === 5}
            >
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < testimonial.rating
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <p className="italic mb-4 flex-grow">"{testimonial.text}"</p>
              <div className="mt-auto">
                <p className="font-semibold">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">{testimonial.plan}</p>
              </div>
            </InfoCard>
          ))}
        </div>
        
        <div className="flex justify-center mt-10">
          <div className="flex items-center bg-white px-6 py-3 rounded-full shadow-sm">
            <div className="flex mr-3">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className="w-5 h-5 text-yellow-400 fill-current" 
                />
              ))}
            </div>
            <span className="font-medium">4.8 out of 5</span>
            <span className="text-muted-foreground ml-2">based on 2,400+ reviews</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
