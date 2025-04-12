
import { useState } from "react";
import NavBar from "@/components/NavBar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { mockComponents } from "@/lib/mockData";
import { useToast } from "@/hooks/use-toast";
import { CircuitBoard, Cpu, Microchip } from "lucide-react";

const StudentBorrow = () => {
  const [rollNumber, setRollNumber] = useState("");
  const [componentId, setComponentId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [purpose, setPurpose] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { toast } = useToast();
  
  const selectedComponent = mockComponents.find(c => c.id === componentId);
  const maxQuantity = selectedComponent?.availableQuantity || 1;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Validation
    if (!rollNumber.match(/^\d{2}[A-Z]{3}\d{2}$/)) {
      toast({
        title: "Invalid Roll Number",
        description: "Please enter a valid roll number (e.g., 22CSA52)",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }
    
    if (!componentId) {
      toast({
        title: "Component Required",
        description: "Please select a component to borrow",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }

    if (!purpose.trim()) {
      toast({
        title: "Purpose Required",
        description: "Please specify the purpose for borrowing the component",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Borrow Request Submitted",
        description: `Your request for ${quantity} ${selectedComponent?.name}(s) has been submitted for approval.`,
      });
      
      // Reset form
      setRollNumber("");
      setComponentId("");
      setQuantity(1);
      setPurpose("");
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-blue-50">
      <NavBar />
      
      <main className="flex-grow container mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-center mb-8 animate-fade-in">
            <div className="p-4 bg-primary/10 rounded-full">
              <Microchip className="h-12 w-12 text-primary" />
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-center mb-6 text-gray-800 animate-fade-in">Borrow Component</h1>
          
          <Card className="border-none shadow-xl bg-white/80 backdrop-blur-sm overflow-hidden animate-fade-in">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/50 to-accent/50"></div>
            <CardHeader>
              <CardTitle className="text-xl">Request Form</CardTitle>
              <CardDescription>
                Enter your details to borrow a component.
              </CardDescription>
            </CardHeader>
            
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="rollNumber" className="text-sm font-medium">Roll Number</Label>
                  <Input
                    id="rollNumber"
                    placeholder="22CSA52"
                    value={rollNumber}
                    onChange={(e) => setRollNumber(e.target.value)}
                    required
                    className="bg-white/70 border-blue-100 focus:border-primary transition-all duration-200 hover:shadow-md"
                  />
                  <p className="text-xs text-muted-foreground">
                    Enter your roll number in the format YYDDD##
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="component" className="text-sm font-medium">Component</Label>
                  <Select 
                    value={componentId} 
                    onValueChange={setComponentId}
                  >
                    <SelectTrigger className="bg-white/70 border-blue-100 hover:shadow-md transition-all">
                      <SelectValue placeholder="Select a component" />
                    </SelectTrigger>
                    <SelectContent className="bg-white shadow-lg border-blue-100">
                      {mockComponents
                        .filter(c => c.availableQuantity > 0)
                        .map((component) => (
                          <SelectItem key={component.id} value={component.id} className="hover:bg-primary/5">
                            {component.name} ({component.availableQuantity} available)
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="quantity" className="text-sm font-medium">Quantity</Label>
                  <Input
                    id="quantity"
                    type="number"
                    min="1"
                    max={maxQuantity}
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                    required
                    className="bg-white/70 border-blue-100 focus:border-primary transition-all duration-200 hover:shadow-md"
                  />
                  {selectedComponent && (
                    <p className="text-xs text-muted-foreground">
                      Maximum available: {selectedComponent.availableQuantity}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="purpose" className="text-sm font-medium">Purpose</Label>
                  <Textarea
                    id="purpose"
                    placeholder="Explain why you need this component (e.g., For microcontroller project, IoT experiment, etc.)"
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value)}
                    required
                    className="min-h-[120px] bg-white/70 border-blue-100 focus:border-primary transition-all duration-200 hover:shadow-md"
                  />
                </div>
              </CardContent>
              
              <CardFooter>
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-primary to-primary/90 hover:shadow-lg transition-all duration-300" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex items-center">
                      <span className="animate-pulse mr-2">●</span>
                      Processing...
                    </div>
                  ) : "Submit Borrow Request"}
                </Button>
              </CardFooter>
            </form>
          </Card>
          
          <div className="mt-8 text-center text-gray-500 text-sm">
            <p>Need help? Contact the lab administrator at <span className="text-primary">lab-admin@eslib.edu</span></p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentBorrow;
