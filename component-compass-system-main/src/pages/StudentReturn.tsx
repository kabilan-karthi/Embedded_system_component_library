
import { useState } from "react";
import NavBar from "@/components/NavBar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { mockLendings, getUnreturnedLendingsByRollNumber } from "@/lib/mockData";
import { useToast } from "@/hooks/use-toast";
import LendingTable from "@/components/LendingTable";
import { LendingRecord } from "@/lib/types";
import { CircuitBoard, RefreshCw, Search } from "lucide-react";

const StudentReturn = () => {
  const [rollNumber, setRollNumber] = useState("");
  const [lendings, setLendings] = useState<LendingRecord[]>([]);
  const [selectedLendings, setSelectedLendings] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { toast } = useToast();
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Validation
    if (!rollNumber.match(/^\d{2}[A-Z]{3}\d{2}$/)) {
      toast({
        title: "Invalid Roll Number",
        description: "Please enter a valid roll number (e.g., 22CSA52)",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }
    
    // Simulate API call
    setTimeout(() => {
      const unreturnedLendings = getUnreturnedLendingsByRollNumber(rollNumber);
      setLendings(unreturnedLendings);
      setSelectedLendings([]);
      setShowResults(true);
      setIsLoading(false);
      
      if (unreturnedLendings.length === 0) {
        toast({
          title: "No Borrowed Items",
          description: `No unreturned items found for roll number ${rollNumber}.`,
          variant: "default"
        });
      }
    }, 1000);
  };
  
  const handleSelect = (lendingId: string, selected: boolean) => {
    if (selected) {
      setSelectedLendings([...selectedLendings, lendingId]);
    } else {
      setSelectedLendings(selectedLendings.filter(id => id !== lendingId));
    }
  };
  
  const handleReturn = () => {
    if (selectedLendings.length === 0) {
      toast({
        title: "No Items Selected",
        description: "Please select items to return",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const selectedItems = lendings.filter(lending => 
        selectedLendings.includes(lending.id)
      );
      
      toast({
        title: "Items Returned Successfully",
        description: `You've returned ${selectedItems.length} component(s).`,
      });
      
      // Reset selections and refresh list
      setSelectedLendings([]);
      setLendings(lendings.filter(lending => !selectedLendings.includes(lending.id)));
      setIsSubmitting(false);
      
      if (lendings.length === selectedLendings.length) {
        setShowResults(false);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-blue-50">
      <NavBar />
      
      <main className="flex-grow container mx-auto py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center mb-8 animate-fade-in">
            <div className="p-4 bg-primary/10 rounded-full">
              <RefreshCw className="h-12 w-12 text-primary" />
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-center mb-6 text-gray-800 animate-fade-in">Return Components</h1>
          
          {!showResults ? (
            <Card className="border-none shadow-xl bg-white/80 backdrop-blur-sm overflow-hidden animate-fade-in">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent/50 to-primary/50"></div>
              <CardHeader>
                <CardTitle className="text-xl">Find Your Components</CardTitle>
                <CardDescription>
                  Enter your roll number to view your borrowed components.
                </CardDescription>
              </CardHeader>
              
              <form onSubmit={handleSearch}>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="rollNumber" className="text-sm font-medium">Roll Number</Label>
                    <div className="relative">
                      <Input
                        id="rollNumber"
                        placeholder="22CSA52"
                        value={rollNumber}
                        onChange={(e) => setRollNumber(e.target.value)}
                        required
                        className="bg-white/70 border-blue-100 focus:border-primary transition-all duration-200 hover:shadow-md pl-10"
                      />
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                        <Search className="h-4 w-4" />
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Enter your roll number in the format YYDDD##
                    </p>
                  </div>
                </CardContent>
                
                <CardFooter>
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-primary to-primary/90 hover:shadow-lg transition-all duration-300" 
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center">
                        <span className="animate-pulse mr-2">●</span>
                        Searching...
                      </div>
                    ) : "Find My Borrowed Items"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          ) : (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row justify-between items-center bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border-l-4 border-primary">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-1">Borrowed Components</h2>
                  <p className="text-muted-foreground text-sm">Roll Number: <span className="font-medium">{rollNumber}</span></p>
                </div>
                <div className="flex gap-3 mt-4 sm:mt-0">
                  <Button 
                    variant="outline" 
                    onClick={() => setShowResults(false)}
                    className="border-blue-100 hover:border-primary/50 transition-all"
                  >
                    Change Roll Number
                  </Button>
                  <Button 
                    onClick={handleReturn} 
                    disabled={selectedLendings.length === 0 || isSubmitting}
                    className="bg-gradient-to-r from-primary to-primary/90 hover:shadow-lg transition-all duration-300"
                  >
                    {isSubmitting 
                      ? <div className="flex items-center"><span className="animate-pulse mr-2">●</span>Processing...</div>
                      : `Return Selected (${selectedLendings.length})`}
                  </Button>
                </div>
              </div>
              
              <Card className="border-none shadow-lg overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent/50 to-primary/50"></div>
                <CardContent className="p-0">
                  <LendingTable 
                    lendings={lendings} 
                    selectable={true} 
                    onSelect={handleSelect}
                    selectedIds={selectedLendings}
                  />
                </CardContent>
              </Card>
              
              <div className="text-center text-gray-500 text-sm p-4 bg-white/60 rounded-lg shadow-sm">
                <p>When returning components, please ensure they are in good working condition.</p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default StudentReturn;
