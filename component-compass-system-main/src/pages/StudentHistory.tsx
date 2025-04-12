
import { useState } from "react";
import NavBar from "@/components/NavBar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { getLendingsByRollNumber } from "@/lib/mockData";
import { useToast } from "@/hooks/use-toast";
import LendingTable from "@/components/LendingTable";
import { LendingRecord } from "@/lib/types";
import { History, Search, CircuitBoard, Cpu, RefreshCw } from "lucide-react";

const StudentHistory = () => {
  const [rollNumber, setRollNumber] = useState("");
  const [lendings, setLendings] = useState<LendingRecord[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  
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
      const studentLendings = getLendingsByRollNumber(rollNumber);
      setLendings(studentLendings);
      setShowResults(true);
      setIsLoading(false);
      
      if (studentLendings.length === 0) {
        toast({
          title: "No Records Found",
          description: `No lending records found for roll number ${rollNumber}.`,
          variant: "default"
        });
      }
    }, 1000);
  };
  
  // Calculate statistics
  const totalComponents = lendings.length;
  const activeComponents = lendings.filter(l => l.returnDate === null).length;
  const returnedComponents = totalComponents - activeComponents;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-blue-50">
      <NavBar />
      
      <main className="flex-grow container mx-auto py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center mb-8 animate-fade-in">
            <div className="p-4 bg-primary/10 rounded-full">
              <History className="h-12 w-12 text-primary" />
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-center mb-6 text-gray-800 animate-fade-in">Lending History</h1>
          
          {!showResults ? (
            <Card className="border-none shadow-xl bg-white/80 backdrop-blur-sm overflow-hidden animate-fade-in">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/50 to-accent/50"></div>
              <CardHeader>
                <CardTitle className="text-xl">View Your History</CardTitle>
                <CardDescription>
                  Enter your roll number to view your component lending history.
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
                    ) : "View My Lending History"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          ) : (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4 bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border-l-4 border-primary">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-1">Lending History</h2>
                  <p className="text-muted-foreground text-sm">Roll Number: <span className="font-medium">{rollNumber}</span></p>
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => setShowResults(false)}
                  className="border-blue-100 hover:border-primary/50 transition-all"
                >
                  Change Roll Number
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card className="shadow-lg overflow-hidden border-t-4 border-primary bg-white hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-sm font-medium text-muted-foreground">Total Items</h3>
                      <CircuitBoard className="h-5 w-5 text-primary/60" />
                    </div>
                    <span className="text-3xl font-bold text-gray-800">{totalComponents}</span>
                  </CardContent>
                </Card>
                
                <Card className="shadow-lg overflow-hidden border-t-4 border-yellow-400 bg-white hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-sm font-medium text-muted-foreground">Currently Borrowed</h3>
                      <Cpu className="h-5 w-5 text-yellow-400/70" />
                    </div>
                    <span className="text-3xl font-bold text-gray-800">{activeComponents}</span>
                  </CardContent>
                </Card>
                
                <Card className="shadow-lg overflow-hidden border-t-4 border-accent bg-white hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-sm font-medium text-muted-foreground">Returned Items</h3>
                      <RefreshCw className="h-5 w-5 text-accent/70" />
                    </div>
                    <span className="text-3xl font-bold text-gray-800">{returnedComponents}</span>
                  </CardContent>
                </Card>
              </div>
              
              <Card className="border-none shadow-lg overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent/50 to-primary/50"></div>
                <CardHeader className="bg-gray-50/50 border-b border-gray-100">
                  <CardTitle className="text-lg">Component History</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <LendingTable lendings={lendings} />
                </CardContent>
              </Card>
              
              <div className="text-center text-gray-500 text-sm p-4 bg-white/60 rounded-lg shadow-sm">
                <p>This record shows all your past and current component borrowing activity.</p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default StudentHistory;
