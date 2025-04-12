
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import NavBar from "@/components/NavBar";
import { mockComponents } from "@/lib/mockData";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Component } from "@/lib/types";

// Add sample images for components
const componentImages: Record<string, string> = {
  "1": "https://images.unsplash.com/photo-1608564697071-ddf911d3fdb4?q=80&w=300&auto=format&fit=crop",  // Arduino
  "2": "https://images.unsplash.com/photo-1626509653291-19d9d320fdd1?q=80&w=300&auto=format&fit=crop",  // Raspberry Pi
  "3": "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?q=80&w=300&auto=format&fit=crop",  // Sensors
  "4": "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?q=80&w=300&auto=format&fit=crop",  // LED
  "5": "https://images.unsplash.com/photo-1597692493647-45bab65a8f8d?q=80&w=300&auto=format&fit=crop",  // Microcontroller
};

const Store = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [components, setComponents] = useState(mockComponents);
  const navigate = useNavigate();

  const filteredComponents = components.filter(component =>
    component.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate when the component will be back in stock (mocked data)
  const getEstimatedReturnDate = (component: Component) => {
    if (component.availableQuantity > 0) {
      return null;
    }
    
    // Just mocking return dates - in a real app this would be calculated based on lending records
    const today = new Date();
    const futureDate = new Date();
    futureDate.setDate(today.getDate() + Math.floor(Math.random() * 14) + 3); // Random days between 3-16 days
    
    return futureDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getAvailabilityColor = (available: number, total: number) => {
    const ratio = available / total;
    if (ratio === 0) return "bg-red-50 border-red-200";
    if (ratio < 0.2) return "bg-orange-50 border-orange-200";
    if (ratio < 0.5) return "bg-yellow-50 border-yellow-200";
    return "bg-green-50 border-green-200";
  };

  const getAvailabilityBadge = (available: number, total: number) => {
    const ratio = available / total;
    if (ratio === 0) return "destructive";
    if (ratio < 0.2) return "warning"; 
    if (ratio < 0.5) return "secondary";
    return "accent";
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">EBLIB Component Store</h1>
            <p className="text-gray-600 mt-1">
              Browse available components for your embedded projects
            </p>
          </div>
          
          <div className="relative w-full md:w-80 mt-4 md:mt-0">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search components..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredComponents.map((component) => {
            const availabilityClass = getAvailabilityColor(component.availableQuantity, component.totalQuantity);
            const badgeType = getAvailabilityBadge(component.availableQuantity, component.totalQuantity);
            const estimatedReturn = getEstimatedReturnDate(component);
            const imageUrl = componentImages[component.id] || "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=300&auto=format&fit=crop";
            
            return (
              <Card 
                key={component.id} 
                className={`component-card border-2 ${availabilityClass} transition-all duration-300 overflow-hidden`}
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={imageUrl} 
                    alt={component.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold">{component.name}</h3>
                    <Badge variant={badgeType} className="animate-fade-in">
                      {component.availableQuantity > 0 ? "Available" : "Out of Stock"}
                    </Badge>
                  </div>
                  
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {component.description || "No description available."}
                  </p>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Total Quantity:</span>
                      <span className="font-medium">{component.totalQuantity}</span>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Available:</span>
                      <span className="font-medium">{component.availableQuantity}</span>
                    </div>
                    
                    {/* Progress bar */}
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                      <div 
                        className="bg-primary h-2.5 rounded-full transition-all duration-500 ease-out" 
                        style={{ 
                          width: `${(component.availableQuantity / component.totalQuantity) * 100}%` 
                        }}
                      ></div>
                    </div>
                    
                    {estimatedReturn && (
                      <div className="text-xs text-gray-500 italic mt-2">
                        Expected back in inventory: {estimatedReturn}
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-6">
                    <Button 
                      className="w-full hover-scale" 
                      disabled={component.availableQuantity === 0}
                      onClick={() => navigate("/borrow")}
                    >
                      {component.availableQuantity > 0 ? "Borrow Now" : "Currently Unavailable"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
        
        {filteredComponents.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium text-gray-600">No components found</h3>
            <p className="text-gray-500 mt-2">Try a different search term</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Store;
