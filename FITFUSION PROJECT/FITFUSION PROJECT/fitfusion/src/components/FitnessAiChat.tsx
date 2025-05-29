
import { useState, useRef, useEffect } from "react";
import { Bot, Send, X, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const fitnessResponses: Record<string, string> = {
  // Original responses
  cramp: "Muscle cramps are often caused by dehydration or electrolyte imbalances. Try stretching the affected muscle, massaging it gently, applying heat for chronic cramps or ice for acute ones. Stay hydrated and consider adding electrolytes to your water during intense workouts.",
  
  chest: "For chest development, include exercises like bench press, push-ups, chest flys, and cable crossovers. Focus on proper form with a full range of motion. Vary between flat, incline, and decline positions to target different parts of the chest muscles.",
  
  leg: "Effective leg workouts include squats, lunges, deadlifts, leg press, and calf raises. For complete development, ensure your routine targets quads, hamstrings, glutes, and calves. Don't skip leg day - strong legs support overall body strength!",
  
  back: "Build a stronger back with pull-ups, lat pulldowns, rows, and deadlifts. Focus on engaging your lats and maintaining good posture throughout movements. A strong back helps improve posture and prevent injuries.",
  
  arm: "For complete arm development, target your biceps with curls, your triceps with pushdowns and dips, and your forearms with wrist curls and farmer's walks. Remember, compound movements like bench press and rows also engage arm muscles.",
  
  shoulder: "Develop well-rounded shoulders with overhead presses, lateral raises, front raises, and reverse flys. This targets all three deltoid heads. Maintain proper form and avoid using momentum to prevent shoulder injuries.",
  
  meal: "Pre-workout meals should include carbs for energy and some protein, eaten 1-2 hours before exercise. Post-workout, focus on protein for muscle recovery and carbs to replenish glycogen, ideally within 45 minutes after your session.",
  
  protein: "Good protein sources include chicken breast, lean beef, fish, eggs, dairy, tofu, legumes, and protein supplements like whey or plant protein. Most adults need about 0.8-1g of protein per pound of bodyweight daily for muscle maintenance and growth.",
  
  cardio: "Effective cardio options include running, cycling, swimming, rowing, and high-intensity interval training (HIIT). For fat loss, mix steady-state cardio with HIIT sessions. For heart health, aim for at least 150 minutes of moderate cardio weekly.",
  
  beginner: "As a beginner, focus on learning proper form with bodyweight exercises and light weights. Start with full-body workouts 2-3 times weekly, allowing recovery days between sessions. Progress gradually by adding weight or reps as exercises become easier.",
  
  // New enhanced responses
  "cramp cause": "Muscle cramps during exercise often happen due to dehydration, low electrolytes (like potassium, magnesium, or sodium), or overworking the muscles. Make sure you're hydrating well, warming up properly, and including mineral-rich foods in your diet. If they happen often or feel severe, it's smart to check with a doctor.",
  
  "cramp relief": "If you get a cramp, gently stretch and massage the affected muscle. Try applying a warm compress to relax the muscle or a cold pack if there's pain afterward. Drinking water with electrolytes may also help, especially if the cramp is caused by dehydration.",
  
  "cramp prevent": "Stay hydrated before, during, and after workouts. Eat a diet rich in potassium, magnesium, and calcium. Don't skip warm-ups and cooldowns. Stretching regularly and gradually increasing workout intensity can also reduce cramping. Consider magnesium supplements if recommended by your healthcare provider.",
  
  "muscle gain": "To build muscle, focus on adequate protein intake (1.6-2.2g per kg of bodyweight), progressive overload in strength training, and caloric surplus. Consume lean protein sources (chicken, fish, tofu), complex carbs (brown rice, oats), and healthy fats. Consider a protein shake within 30 minutes post-workout to support muscle repair.",
  
  "pre workout": "Before workouts, aim for easily digestible carbs and moderate protein 1-2 hours prior to exercise. Good options include a banana with peanut butter, oatmeal with berries, or a small chicken wrap. Avoid heavy, fatty meals that might cause digestive discomfort during your session.",
  
  "post workout": "After exercise, focus on protein for muscle repair and carbs to replenish glycogen stores. Aim to eat within 45 minutes post-workout for optimal recovery. Great options include Greek yogurt with fruit, a protein smoothie with banana, or a turkey sandwich on whole grain bread.",
  
  "fat loss": "For fat loss, create a moderate calorie deficit (around 500 calories below maintenance) while maintaining adequate protein intake to preserve muscle. Focus on nutrient-dense whole foods like lean proteins, vegetables, fruits, whole grains, and healthy fats. Stay hydrated and consider intermittent fasting if it suits your lifestyle. Consistency is key!",
  
  "belly fat": "Spot reduction isn't physiologically possible, but you can reduce overall body fat through a combination of regular cardiovascular exercise, strength training, and a calorie-controlled diet. Focus on compound movements like squats and deadlifts that burn more calories, manage stress levels, and ensure adequate sleep for optimal hormonal balance.",
  
  "workout frequency": "For optimal results, aim for 3-5 strength training sessions per week with at least one rest day between working the same muscle groups. Add 2-3 cardio sessions (150-300 minutes weekly depending on your goals). Listen to your body and adjust based on recovery needs. Even 20-30 minutes of exercise daily can provide significant health benefits when done consistently.",
  
  "beginner workout": "As a newcomer to fitness, start with 2-3 full-body workouts per week focusing on mastering form with bodyweight exercises like squats, lunges, modified push-ups, and planks. Begin with 15-30 minute sessions and gradually increase duration and intensity. Walking is an excellent starter cardio activity. Focus on consistency rather than perfection!",
  
  "about": "FitFusion was created by three friends with a shared passion for fitness and technology. Shyaam (Team Lead) brings expertise in motivation, Yashwant (Nutrition Expert) develops meal plans and nutrition guidance, and Sri Vignesh (Tech Lead) ensures the platform delivers personalized experiences through technology. Visit our About page to learn more about our story!"
};

const FitnessAiChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi there! I'm your FitFusion AI assistant. Ask me anything about workouts, nutrition, our team, or managing muscle cramps!"
    }
  ]);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Add user message
    const userMessage = { role: "user" as const, content: message };
    setMessages((prev) => [...prev, userMessage]);
    
    // Process response
    setTimeout(() => {
      const response = getAIResponse(message);
      setMessages((prev) => [...prev, { role: "assistant", content: response }]);
    }, 600);
    
    setMessage("");
  };

  const getAIResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();
    
    // Check for specific keyword combinations first
    if (lowerQuery.includes("cramp") && lowerQuery.includes("cause")) {
      return fitnessResponses["cramp cause"];
    }
    if (lowerQuery.includes("cramp") && (lowerQuery.includes("stop") || lowerQuery.includes("relief") || lowerQuery.includes("help"))) {
      return fitnessResponses["cramp relief"];
    }
    if (lowerQuery.includes("cramp") && (lowerQuery.includes("prevent") || lowerQuery.includes("avoid"))) {
      return fitnessResponses["cramp prevent"];
    }
    if ((lowerQuery.includes("gain") && lowerQuery.includes("muscle")) || lowerQuery.includes("build muscle")) {
      return fitnessResponses["muscle gain"];
    }
    if (lowerQuery.includes("before") && lowerQuery.includes("workout")) {
      return fitnessResponses["pre workout"];
    }
    if ((lowerQuery.includes("after") || lowerQuery.includes("post")) && lowerQuery.includes("workout")) {
      return fitnessResponses["post workout"];
    }
    if (lowerQuery.includes("fat") && (lowerQuery.includes("lose") || lowerQuery.includes("loss"))) {
      return fitnessResponses["fat loss"];
    }
    if (lowerQuery.includes("belly") && lowerQuery.includes("fat")) {
      return fitnessResponses["belly fat"];
    }
    if (lowerQuery.includes("how") && lowerQuery.includes("often") && 
        (lowerQuery.includes("workout") || lowerQuery.includes("exercise"))) {
      return fitnessResponses["workout frequency"];
    }
    if ((lowerQuery.includes("new") || lowerQuery.includes("start") || lowerQuery.includes("beginner")) && 
        (lowerQuery.includes("workout") || lowerQuery.includes("exercise"))) {
      return fitnessResponses["beginner workout"];
    }
    if (lowerQuery.includes("team") || lowerQuery.includes("founder") || lowerQuery.includes("create")) {
      return fitnessResponses["about"];
    }
    
    // Check for individual keywords in the query as fallback
    for (const [keyword, response] of Object.entries(fitnessResponses)) {
      if (lowerQuery.includes(keyword)) {
        return response;
      }
    }
    
    // Default responses if no keywords match
    if (lowerQuery.includes("hello") || lowerQuery.includes("hi")) {
      return "Hello! How can I help with your fitness journey today?";
    } else if (lowerQuery.includes("thank")) {
      return "You're welcome! Feel free to ask if you have more fitness questions.";
    } else if (lowerQuery.includes("help")) {
      return "I can help with workout advice, nutrition tips, exercise techniques, and managing muscle soreness. You can also ask about our team or the story behind FitFusion. What would you like to know?";
    } else {
      return "I'm not sure about that specific topic. Try asking about workouts, nutrition, specific muscle groups like chest, back, legs, or about our founding team and story. You can also ask about dealing with muscle cramps.";
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      toast({
        title: "AI Fitness Assistant",
        description: "Ask me about workouts, nutrition, our team, or muscle cramps!",
      });
    }
  };

  return (
    <>
      {/* Chat toggle button */}
      <Button
        onClick={toggleChat}
        className={`fixed bottom-6 right-6 rounded-full p-3 shadow-lg z-50 ${
          isOpen ? "bg-muted" : "bg-fitOrange"
        }`}
      >
        {isOpen ? <X size={24} /> : <Bot size={24} />}
      </Button>

      {/* Chat window */}
      {isOpen && (
        <Card className="fixed bottom-20 right-6 w-full max-w-sm h-[500px] shadow-xl z-50 flex flex-col">
          <div className="bg-fitOrange text-white p-3 rounded-t-lg font-semibold flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Bot size={18} />
              <span>FitFusion AI Assistant</span>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0 text-white hover:text-white hover:bg-orange-600" 
              onClick={() => setIsOpen(false)}
            >
              <X size={16} />
            </Button>
          </div>
          
          <CardContent className="flex-grow overflow-y-auto p-3 pb-0">
            <div className="space-y-4">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-lg p-3 ${
                      msg.role === "user"
                        ? "bg-fitOrange/10 text-foreground"
                        : "bg-card border border-border"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      {msg.role === "user" ? (
                        <User size={14} className="text-fitOrange" />
                      ) : (
                        <Bot size={14} className="text-fitBlue" />
                      )}
                      <span className="text-xs font-medium">
                        {msg.role === "user" ? "You" : "FitFusion AI"}
                      </span>
                    </div>
                    <p className="text-sm">{msg.content}</p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </CardContent>
          
          <form onSubmit={handleSubmit} className="p-3 border-t mt-auto">
            <div className="flex gap-2">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask about workouts, nutrition, our team..."
                className="flex-grow"
              />
              <Button type="submit" className="bg-fitOrange hover:bg-orange-600" size="icon">
                <Send size={18} />
              </Button>
            </div>
          </form>
        </Card>
      )}
    </>
  );
};

export default FitnessAiChat;
