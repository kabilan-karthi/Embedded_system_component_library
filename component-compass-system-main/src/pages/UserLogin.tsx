
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "@/components/NavBar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { CircuitBoard, CheckCircle, Cpu } from "lucide-react";

const UserLogin = () => {
  const [rollNumber, setRollNumber] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simple validation
    if (!rollNumber || !password) {
      toast({
        title: "Invalid Credentials",
        description: "Please enter both roll number and password",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }
    
    // Simulate API call (for demo, allow any login with valid roll number format)
    setTimeout(() => {
      const rollNumberPattern = /^\d{2}[A-Z]{2,3}\d{2}$/;
      if (rollNumberPattern.test(rollNumber)) {
        toast({
          title: "Login Successful",
          description: "Welcome to ESLIB",
        });
        navigate("/store");
      } else {
        toast({
          title: "Invalid Credentials",
          description: "Please enter a valid roll number",
          variant: "destructive"
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-blue-50">
      <NavBar />
      
      <main className="flex-grow container mx-auto py-10 px-4 flex items-center">
        <div className="w-full max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="hidden md:flex flex-col justify-center space-y-6 p-8 bg-white/50 backdrop-blur-sm rounded-2xl shadow-lg border border-blue-100/50 animate-fade-in">
            <div className="flex justify-center mb-6">
              <div className="p-6 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full shadow-inner">
                <CircuitBoard className="h-20 w-20 text-primary animate-pulse" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-center text-gray-800">ESLIB</h1>
            <p className="text-xl text-center text-gray-600 font-light">Embedded Systems Library</p>
            
            <div className="space-y-4 mt-4">
              <div className="flex items-center space-x-3 p-3 bg-white/80 rounded-lg shadow-sm transform transition-transform duration-300 hover:scale-105">
                <div className="p-2 rounded-full bg-primary/10">
                  <CheckCircle className="h-5 w-5 text-primary" />
                </div>
                <span className="text-gray-700">Borrow components for your projects</span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-white/80 rounded-lg shadow-sm transform transition-transform duration-300 hover:scale-105">
                <div className="p-2 rounded-full bg-primary/10">
                  <CheckCircle className="h-5 w-5 text-primary" />
                </div>
                <span className="text-gray-700">Track your borrowed components</span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-white/80 rounded-lg shadow-sm transform transition-transform duration-300 hover:scale-105">
                <div className="p-2 rounded-full bg-primary/10">
                  <CheckCircle className="h-5 w-5 text-primary" />
                </div>
                <span className="text-gray-700">Return when you're done</span>
              </div>
            </div>
          </div>

          <div>
            <Card className="border-none shadow-xl bg-white/80 backdrop-blur-sm animate-fade-in">
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                <div className="p-3 bg-white rounded-full shadow-lg">
                  <Cpu className="h-6 w-6 text-primary" />
                </div>
              </div>
              <CardHeader className="space-y-1 pt-8">
                <CardTitle className="text-2xl text-center font-bold">Student Login</CardTitle>
                <CardDescription className="text-center">
                  Enter your roll number and password
                </CardDescription>
              </CardHeader>
              
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="rollNumber" className="text-sm font-medium">Roll Number</Label>
                    <Input
                      id="rollNumber"
                      placeholder="e.g., 22CSA52"
                      value={rollNumber}
                      onChange={(e) => setRollNumber(e.target.value)}
                      required
                      className="bg-white/70 border-blue-100 focus:border-primary transition-all duration-300 hover:shadow-md"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                      <a 
                        href="#" 
                        className="text-sm text-primary hover:text-primary/80 hover:underline transition-colors"
                        onClick={(e) => {
                          e.preventDefault();
                          toast({
                            title: "Password Reset",
                            description: "Please contact your department",
                          });
                        }}
                      >
                        Forgot password?
                      </a>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="bg-white/70 border-blue-100 focus:border-primary transition-all duration-300 hover:shadow-md"
                    />
                  </div>
                </CardContent>
                
                <CardFooter className="flex flex-col space-y-4">
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-primary to-primary/90 hover:shadow-lg transition-all duration-300" 
                    disabled={isLoading}
                  >
                    {isLoading ? "Authenticating..." : "Sign In"}
                  </Button>
                  <p className="text-xs text-center text-muted-foreground mt-2">
                    For demo purposes, use any roll number in the format "22CSA52"
                  </p>
                </CardFooter>
              </form>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserLogin;
