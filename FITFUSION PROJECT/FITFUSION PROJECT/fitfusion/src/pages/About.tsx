
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Users, Dumbbell, Utensils, Code } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-20">
        <div className="absolute inset-0 bg-gradient-to-r from-fitDark to-fitDark/80 z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')",
            backgroundPosition: "center"
          }}
        ></div>
        
        <div className="container mx-auto px-4 md:px-8 relative z-20">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
              Our Story
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Created by three friends with a shared passion for fitness and technology, 
              FitFusion was born to make fitness accessible to everyone.
            </p>
          </div>
        </div>
      </section>
      
      {/* Founding Story */}
      <section className="py-16 bg-fitDark">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-white mb-6">The FitFusion Journey</h2>
            <p className="text-lg text-gray-300 mb-4">
              FitFusion began in 2023 when three college friends - Shyaam, Yashwant, and Sri Vignesh - 
              recognized a gap in the fitness industry. They saw that many people struggled to access 
              personalized fitness guidance that integrated workouts, nutrition, and motivation in one place.
            </p>
            <p className="text-lg text-gray-300">
              What started as a small project in their university dorm room quickly evolved into a 
              comprehensive fitness platform used by thousands. Their mission was simple: make fitness 
              knowledge accessible, personalized, and engaging for everyone regardless of their experience level.
            </p>
          </div>
          
          {/* Founders */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Shyaam */}
            <div className="bg-card rounded-xl p-6 border border-fitOrange/20 flex flex-col items-center text-center">
              <div className="h-24 w-24 rounded-full bg-fitOrange/20 flex items-center justify-center mb-6">
                <Users className="h-12 w-12 text-fitOrange" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Shyaam</h3>
              <p className="text-fitOrange font-medium mb-4">Team Lead</p>
              <p className="text-gray-300">
                With a background in sports psychology, Shyaam brings his expertise in motivation and 
                commitment to help users stay on track with their fitness goals.
              </p>
            </div>
            
            {/* Yashwant */}
            <div className="bg-card rounded-xl p-6 border border-fitBlue/20 flex flex-col items-center text-center">
              <div className="h-24 w-24 rounded-full bg-fitBlue/20 flex items-center justify-center mb-6">
                <Utensils className="h-12 w-12 text-fitBlue" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Yashwant</h3>
              <p className="text-fitBlue font-medium mb-4">Nutrition Expert</p>
              <p className="text-gray-300">
                A certified nutritionist with a passion for creating sustainable eating habits, 
                Yashwant develops our meal plans and nutrition guidance.
              </p>
            </div>
            
            {/* Sri Vignesh */}
            <div className="bg-card rounded-xl p-6 border border-fitGreen/20 flex flex-col items-center text-center">
              <div className="h-24 w-24 rounded-full bg-fitGreen/20 flex items-center justify-center mb-6">
                <Code className="h-12 w-12 text-fitGreen" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Sri Vignesh</h3>
              <p className="text-fitGreen font-medium mb-4">Tech Lead</p>
              <p className="text-gray-300">
                With expertise in software development and AI, Sri Vignesh ensures our platform delivers 
                personalized experiences through cutting-edge technology.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Vision & Mission */}
      <section className="py-16 bg-gradient-to-b from-fitDark to-fitDark/95">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Our Vision</h2>
            
            <div className="bg-card p-8 rounded-xl border border-fitOrange/20 mb-8">
              <h3 className="text-xl font-bold text-white mb-4">Mission</h3>
              <p className="text-gray-300">
                To empower individuals on their fitness journey by providing accessible, personalized 
                guidance that integrates workouts, nutrition, and motivation in one comprehensive platform.
              </p>
            </div>
            
            <div className="bg-card p-8 rounded-xl border border-fitBlue/20">
              <h3 className="text-xl font-bold text-white mb-4">Values</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-fitOrange mr-2 font-bold">•</span>
                  <div>
                    <span className="text-white font-medium">Accessibility:</span>
                    <p className="text-gray-300">Making fitness knowledge available to everyone, regardless of experience or background.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-fitBlue mr-2 font-bold">•</span>
                  <div>
                    <span className="text-white font-medium">Personalization:</span>
                    <p className="text-gray-300">Tailoring fitness journeys to individual needs, preferences, and goals.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-fitGreen mr-2 font-bold">•</span>
                  <div>
                    <span className="text-white font-medium">Community:</span>
                    <p className="text-gray-300">Fostering a supportive environment where users can motivate and inspire each other.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      {/* Join Us CTA */}
      <section className="py-16 bg-gradient-to-r from-fitOrange/90 to-fitBlue/80 relative">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1538805060514-97d9cc17730c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')] bg-cover opacity-20 mix-blend-overlay"></div>
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Join Our Fitness Journey</h2>
            <p className="text-white text-lg mb-8">
              Start your personalized fitness experience with FitFusion today and become part of our growing community.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="/fitness-plan" className="bg-white text-fitDark hover:bg-gray-100 fitness-btn rounded-full">
                Get Started
              </a>
              <a href="/subscription" className="bg-fitDark/80 text-white hover:bg-fitDark fitness-btn rounded-full">
                Subscribe Now
              </a>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default About;
