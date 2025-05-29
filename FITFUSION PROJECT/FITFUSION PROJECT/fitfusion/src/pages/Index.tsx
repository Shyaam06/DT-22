
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Dumbbell, Weight, Heart } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from '../components/ui/button';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center">
        <div className="absolute inset-0 bg-gradient-to-r from-fitDark to-fitDark/70 z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')",
            backgroundPosition: "center"
          }}
        ></div>
        
        <div className="container mx-auto px-4 md:px-8 relative z-20">
          <div className="max-w-2xl animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4">
              Transform Your Body,<br />
              <span className="text-fitOrange">Transform Your Life</span>
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Achieve your fitness goals with personalized plans, expert workouts, 
              and nutrition guidance tailored just for you.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/fitness-plan" className="fitness-btn-primary rounded-full">
                Get Your Plan <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link to="/workouts" className="fitness-btn-secondary rounded-full">
                Explore Workouts <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link to="/subscription" className="fitness-btn-outline rounded-full">
                Subscribe Now
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-gradient-to-b from-fitDark to-fitDark/95">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">How FitFusion Works</h2>
            <p className="text-gray-300 max-w-3xl mx-auto">
              Our comprehensive approach combines custom workouts, nutrition planning,
              and expert guidance to help you achieve lasting results.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-card p-8 rounded-xl border border-fitOrange/20 flex flex-col items-center text-center animate-fade-in" style={{animationDelay: "0.2s"}}>
              <div className="h-16 w-16 rounded-full bg-fitOrange/20 flex items-center justify-center mb-6">
                <Dumbbell className="h-8 w-8 text-fitOrange" />
              </div>
              <h3 className="text-xl font-bold mb-4">Personalized Workouts</h3>
              <p className="text-gray-300">
                Get custom workout plans tailored to your fitness level, goals, and available equipment.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-card p-8 rounded-xl border border-fitBlue/20 flex flex-col items-center text-center animate-fade-in" style={{animationDelay: "0.4s"}}>
              <div className="h-16 w-16 rounded-full bg-fitBlue/20 flex items-center justify-center mb-6">
                <Weight className="h-8 w-8 text-fitBlue" />
              </div>
              <h3 className="text-xl font-bold mb-4">Nutrition Planning</h3>
              <p className="text-gray-300">
                Receive customized meal plans that match your dietary preferences and support your fitness journey.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-card p-8 rounded-xl border border-fitGreen/20 flex flex-col items-center text-center animate-fade-in" style={{animationDelay: "0.6s"}}>
              <div className="h-16 w-16 rounded-full bg-fitGreen/20 flex items-center justify-center mb-6">
                <Heart className="h-8 w-8 text-fitGreen" />
              </div>
              <h3 className="text-xl font-bold mb-4">Expert Guidance</h3>
              <p className="text-gray-300">
                Access professional advice and instructional videos to ensure proper form and maximize results.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Programs Preview Section */}
      <section className="py-16 bg-gradient-to-b from-fitDark/95 to-fitDark">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Explore Our Programs</h2>
            <p className="text-gray-300 max-w-3xl mx-auto">
              Discover a wide range of workout routines designed to help you reach your specific fitness goals.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Program 1 */}
            <div className="fitness-card group">
              <div className="relative h-56 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
                  alt="HIIT Training"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-fitDark to-transparent p-4">
                  <h3 className="text-xl font-bold text-white">HIIT Training</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-300 mb-4">High-intensity interval training to maximize calorie burn and improve cardiovascular health.</p>
                <Link to="/workouts" className="text-fitOrange flex items-center font-semibold hover:underline">
                  Explore <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
            
            {/* Program 2 */}
            <div className="fitness-card group">
              <div className="relative h-56 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
                  alt="Strength Training"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-fitDark to-transparent p-4">
                  <h3 className="text-xl font-bold text-white">Strength Training</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-300 mb-4">Build muscle, increase strength, and enhance overall body composition with our strength programs.</p>
                <Link to="/workouts" className="text-fitOrange flex items-center font-semibold hover:underline">
                  Explore <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
            
            {/* Program 3 */}
            <div className="fitness-card group">
              <div className="relative h-56 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1552196563-55cd4e45efb3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1626&q=80" 
                  alt="Yoga"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-fitDark to-transparent p-4">
                  <h3 className="text-xl font-bold text-white">Yoga</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-300 mb-4">Improve flexibility, balance, and mental clarity with our specialized yoga sessions.</p>
                <Link to="/workouts" className="text-fitOrange flex items-center font-semibold hover:underline">
                  Explore <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link to="/workouts" className="fitness-btn-primary inline-flex items-center">
              View All Programs <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-fitOrange/90 to-fitBlue/80 relative">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517838277536-f5f99be501cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')] bg-cover opacity-20 mix-blend-overlay"></div>
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Start Your Fitness Journey?</h2>
            <p className="text-white text-lg mb-8">
              Join thousands who have transformed their lives with FitFusion's personalized approach.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/fitness-plan" className="bg-white text-fitDark hover:bg-gray-100 fitness-btn rounded-full">
                Create Your Plan
              </Link>
              <Link to="/subscription" className="bg-fitDark/80 text-white hover:bg-fitDark fitness-btn rounded-full">
                Subscribe Now
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-16 bg-fitDark">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Success Stories</h2>
            <p className="text-gray-300 max-w-3xl mx-auto">
              Hear from our community members who have achieved amazing results with FitFusion.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-card p-8 rounded-xl border border-fitOrange/20">
              <div className="flex items-center mb-6">
                <div className="h-12 w-12 rounded-full bg-fitOrange flex items-center justify-center mr-4">
                  <span className="text-white font-bold">RS</span>
                </div>
                <div>
                  <h4 className="font-bold">Rahul Singh</h4>
                  <p className="text-sm text-gray-400">Lost 15kg in 6 months</p>
                </div>
              </div>
              <p className="text-gray-300">
                "FitFusion's personalized approach completely changed my fitness journey. The workout plans were challenging but achievable, and the nutrition guidance made all the difference."
              </p>
            </div>
            
            {/* Testimonial 2 */}
            <div className="bg-card p-8 rounded-xl border border-fitBlue/20">
              <div className="flex items-center mb-6">
                <div className="h-12 w-12 rounded-full bg-fitBlue flex items-center justify-center mr-4">
                  <span className="text-white font-bold">AP</span>
                </div>
                <div>
                  <h4 className="font-bold">Ananya Patel</h4>
                  <p className="text-sm text-gray-400">Gained muscle & strength</p>
                </div>
              </div>
              <p className="text-gray-300">
                "I've tried many fitness programs, but none were as comprehensive as FitFusion. The strength training routines helped me build muscle while the dietary plans kept me energized."
              </p>
            </div>
            
            {/* Testimonial 3 */}
            <div className="bg-card p-8 rounded-xl border border-fitGreen/20">
              <div className="flex items-center mb-6">
                <div className="h-12 w-12 rounded-full bg-fitGreen flex items-center justify-center mr-4">
                  <span className="text-white font-bold">VK</span>
                </div>
                <div>
                  <h4 className="font-bold">Vikram Kumar</h4>
                  <p className="text-sm text-gray-400">Improved marathon time</p>
                </div>
              </div>
              <p className="text-gray-300">
                "The endurance training programs on FitFusion helped me shave 15 minutes off my marathon time. The customized approach to my specific goals was exactly what I needed."
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
