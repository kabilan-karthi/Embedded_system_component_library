
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { mockComponents, mockLendings } from "@/lib/mockData";
import { useToast } from "@/hooks/use-toast";
import { Component, LendingRecord } from "@/lib/types";
import ComponentForm from "@/components/ComponentForm";
import AdminNotificationCenter from "@/components/AdminNotificationCenter";
import LendingTable from "@/components/LendingTable";
import { 
  Search, 
  LayoutDashboard, 
  Package, 
  Bell, 
  Settings, 
  LogOut,
  BarChart3, 
  CircuitBoard,
  Home
} from "lucide-react";

const AdminDashboard = () => {
  const [components, setComponents] = useState<Component[]>(mockComponents);
  const [lendings, setLendings] = useState<LendingRecord[]>(mockLendings);
  const [searchRollNumber, setSearchRollNumber] = useState("");
  const [filteredLendings, setFilteredLendings] = useState<LendingRecord[]>(mockLendings);
  const [editingComponent, setEditingComponent] = useState<Component | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'components' | 'lendings' | 'notifications'>('dashboard');
  
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Calculate dashboard statistics
  const totalComponents = components.reduce((acc, comp) => acc + comp.totalQuantity, 0);
  const availableComponents = components.reduce((acc, comp) => acc + comp.availableQuantity, 0);
  const borrowedComponents = totalComponents - availableComponents;
  const borrowedPercentage = totalComponents > 0 ? (borrowedComponents / totalComponents) * 100 : 0;
  const unreadNotifications = mockLendings.filter(l => l.status === 'pending' || l.status === 'return-pending').length;
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (searchRollNumber.trim() === "") {
      setFilteredLendings(lendings);
      return;
    }
    
    const filtered = lendings.filter(
      lending => lending.rollNumber.toLowerCase().includes(searchRollNumber.toLowerCase())
    );
    
    setFilteredLendings(filtered);
    
    if (filtered.length === 0) {
      toast({
        title: "No Records Found",
        description: `No lending records found for roll number ${searchRollNumber}.`,
        variant: "default"
      });
    }
  };
  
  const handleAddComponent = (componentData: Omit<Component, "id">) => {
    const newComponent: Component = {
      ...componentData,
      id: `${components.length + 1}`
    };
    
    setComponents([...components, newComponent]);
    toast({
      title: "Component Added",
      description: `${componentData.name} has been added to inventory.`,
    });
    setIsDialogOpen(false);
  };
  
  const handleEditComponent = (componentData: Omit<Component, "id">) => {
    if (!editingComponent) return;
    
    const updatedComponents = components.map(comp => 
      comp.id === editingComponent.id ? { ...componentData, id: comp.id } : comp
    );
    
    setComponents(updatedComponents);
    toast({
      title: "Component Updated",
      description: `${componentData.name} has been updated.`,
    });
    setEditingComponent(null);
    setIsDialogOpen(false);
  };
  
  const handleDeleteComponent = (id: string) => {
    const componentToDelete = components.find(c => c.id === id);
    
    if (componentToDelete) {
      // Check if the component is currently borrowed
      const isBorrowed = lendings.some(
        lending => lending.componentId === id && lending.returnDate === null
      );
      
      if (isBorrowed) {
        toast({
          title: "Cannot Delete Component",
          description: "This component is currently borrowed by students.",
          variant: "destructive"
        });
        return;
      }
      
      setComponents(components.filter(c => c.id !== id));
      toast({
        title: "Component Deleted",
        description: `${componentToDelete.name} has been removed from inventory.`,
      });
    }
  };
  
  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    navigate("/");
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-background to-muted/30">
      {/* Sidebar */}
      <div className="hidden md:flex md:flex-col md:w-64 bg-gradient-to-b from-background to-background/95 border-r border-primary/10 shadow-lg">
        {/* Brand */}
        <div className="flex items-center justify-center h-16 border-b border-primary/10 bg-gradient-to-r from-primary/5 to-accent/5">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-primary/10 rounded-md">
              <CircuitBoard className="h-5 w-5 text-primary" />
            </div>
            <span className="text-primary font-bold text-lg">ESLIB Admin</span>
          </div>
        </div>
        
        {/* Navigation Menu */}
        <nav className="flex-grow p-4 space-y-1">
          <Button 
            variant={activeTab === 'dashboard' ? "default" : "ghost"} 
            className="w-full justify-start" 
            onClick={() => setActiveTab('dashboard')}
          >
            <LayoutDashboard className="h-4 w-4 mr-2" />
            Dashboard
          </Button>
          
          <Button 
            variant={activeTab === 'components' ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveTab('components')}
          >
            <Package className="h-4 w-4 mr-2" />
            Components
          </Button>
          
          <Button 
            variant={activeTab === 'lendings' ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveTab('lendings')}
          >
            <BarChart3 className="h-4 w-4 mr-2" />
            Lending Records
          </Button>
          
          <Button 
            variant={activeTab === 'notifications' ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveTab('notifications')}
          >
            <Bell className="h-4 w-4 mr-2" />
            Notifications
            {unreadNotifications > 0 && (
              <span className="ml-auto bg-destructive text-destructive-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {unreadNotifications}
              </span>
            )}
          </Button>
          
          <div className="pt-6 border-t border-primary/10 mt-6">
            <Button variant="ghost" className="w-full justify-start text-muted-foreground" onClick={() => navigate("/")}>
              <Home className="h-4 w-4 mr-2" />
              Visit Site
            </Button>
            <Button variant="ghost" className="w-full justify-start text-muted-foreground">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
            <Button variant="ghost" className="w-full justify-start text-muted-foreground" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Log Out
            </Button>
          </div>
        </nav>
      </div>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top navbar */}
        <header className="bg-white/50 backdrop-blur-sm shadow-sm h-16 flex items-center justify-between px-4 md:px-6">
          <h1 className="text-lg font-medium flex items-center md:hidden">
            <CircuitBoard className="h-5 w-5 mr-2 text-primary" />
            ESLIB Admin
          </h1>
          
          <div className="hidden md:flex items-center space-x-2">
            <div className="text-sm px-4 py-1.5 bg-primary/5 rounded-full text-muted-foreground">
              Welcome, Administrator
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="md:hidden">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setActiveTab('notifications')}
                className="relative"
              >
                <Bell className="h-5 w-5" />
                {unreadNotifications > 0 && (
                  <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {unreadNotifications}
                  </span>
                )}
              </Button>
            </div>
            
            <Button variant="ghost" size="sm" onClick={handleLogout} className="md:hidden">
              <LogOut className="h-4 w-4 mr-1" />
              Exit
            </Button>
          </div>
        </header>
        
        {/* Main content area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="max-w-7xl mx-auto">
            {/* Dashboard View */}
            {activeTab === 'dashboard' && (
              <>
                {/* Dashboard header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                  <div>
                    <h2 className="text-2xl font-bold">Admin Dashboard</h2>
                    <p className="text-muted-foreground">
                      Manage components and view lending records
                    </p>
                  </div>
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity">
                        Add New Component
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-lg">
                      <DialogHeader>
                        <DialogTitle>Add New Component</DialogTitle>
                      </DialogHeader>
                      <ComponentForm onSubmit={handleAddComponent} />
                    </DialogContent>
                  </Dialog>
                </div>
                
                {/* Stats cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                  <Card className="bg-gradient-to-br from-primary/10 to-primary/5 shadow-md hover:shadow-lg transition-shadow border-primary/10">
                    <CardContent className="p-6">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-primary">Total Components</span>
                        <span className="text-3xl font-bold mt-2">{totalComponents}</span>
                        <div className="mt-2 h-1.5 w-full bg-white/50 rounded-full overflow-hidden">
                          <div className="h-full bg-primary rounded-full" style={{ width: '100%' }}></div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-gradient-to-br from-accent/10 to-accent/5 shadow-md hover:shadow-lg transition-shadow border-accent/10">
                    <CardContent className="p-6">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-accent">Available</span>
                        <span className="text-3xl font-bold mt-2">{availableComponents}</span>
                        <div className="mt-2 h-1.5 w-full bg-white/50 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-accent rounded-full" 
                            style={{ width: `${(availableComponents / totalComponents) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-gradient-to-br from-amber-100 to-amber-50 shadow-md hover:shadow-lg transition-shadow border-amber-200/30">
                    <CardContent className="p-6">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-amber-600">Borrowed</span>
                        <span className="text-3xl font-bold mt-2">{borrowedComponents}</span>
                        <div className="mt-2 h-1.5 w-full bg-white/50 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-amber-400 rounded-full" 
                            style={{ width: `${(borrowedComponents / totalComponents) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-white shadow-md hover:shadow-lg transition-shadow border-muted">
                    <CardContent className="p-6">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-muted-foreground">Usage Rate</span>
                        <span className="text-3xl font-bold mt-2">{borrowedPercentage.toFixed(1)}%</span>
                        <div className="mt-2 h-1.5 w-full bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary/60 rounded-full" 
                            style={{ width: `${borrowedPercentage}%` }}
                          ></div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                {/* Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Recent Lent Components */}
                  <Card className="md:col-span-2 shadow-md border-primary/10">
                    <CardHeader className="bg-gradient-to-b from-primary/5 to-transparent">
                      <CardTitle>Recent Lending Activity</CardTitle>
                      <CardDescription>Latest component borrowing and returns</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                      <LendingTable 
                        lendings={lendings.slice(0, 5)} 
                        showRollNumber={true}
                      />
                    </CardContent>
                  </Card>
                  
                  {/* Notifications Preview */}
                  <Card className="shadow-md border-primary/10">
                    <CardHeader className="bg-gradient-to-b from-primary/5 to-transparent">
                      <div className="flex justify-between items-center">
                        <CardTitle className="flex items-center">
                          <Bell className="h-4 w-4 mr-2 text-primary" />
                          Notifications
                          {unreadNotifications > 0 && (
                            <Badge variant="destructive" className="ml-2">{unreadNotifications}</Badge>
                          )}
                        </CardTitle>
                        <Button variant="ghost" size="sm" onClick={() => setActiveTab('notifications')}>
                          View All
                        </Button>
                      </div>
                      <CardDescription>Latest requests and alerts</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
                        {mockLendings.filter(l => l.status === 'pending' || l.status === 'return-pending').slice(0, 3).map((lending, index) => (
                          <div key={index} className="p-3 bg-primary/5 rounded-lg border border-primary/10">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="text-sm font-medium">
                                  {lending.status === 'pending' ? 'Borrow Request' : 'Return Request'}
                                </h4>
                                <p className="text-xs text-muted-foreground">{lending.rollNumber} - {lending.componentName}</p>
                              </div>
                              <Badge>{lending.status}</Badge>
                            </div>
                          </div>
                        ))}
                        
                        {unreadNotifications === 0 && (
                          <div className="text-center py-8 text-muted-foreground">
                            <Bell className="h-8 w-8 mx-auto opacity-20 mb-2" />
                            <p>No pending notifications</p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </>
            )}
            
            {/* Components Tab */}
            {activeTab === 'components' && (
              <>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                  <div>
                    <h2 className="text-2xl font-bold">Components Inventory</h2>
                    <p className="text-muted-foreground">
                      Manage all components in the embedded systems library
                    </p>
                  </div>
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity">
                        Add New Component
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-lg">
                      <DialogHeader>
                        <DialogTitle>Add New Component</DialogTitle>
                      </DialogHeader>
                      <ComponentForm onSubmit={handleAddComponent} />
                    </DialogContent>
                  </Dialog>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {components.map(component => (
                    <Card 
                      key={component.id} 
                      className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-primary/10"
                    >
                      {component.imageUrl && (
                        <div className="h-40 overflow-hidden">
                          <img 
                            src={component.imageUrl} 
                            alt={component.name} 
                            className="w-full h-full object-cover" 
                          />
                        </div>
                      )}
                      <CardHeader className={`pb-2 ${!component.imageUrl ? 'bg-gradient-to-b from-primary/5 to-transparent' : ''}`}>
                        <div className="flex justify-between">
                          <CardTitle>{component.name}</CardTitle>
                          <div className="flex space-x-1">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => {
                                setEditingComponent(component);
                                setIsDialogOpen(true);
                              }}
                            >
                              Edit
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleDeleteComponent(component.id)}
                            >
                              Delete
                            </Button>
                          </div>
                        </div>
                        {component.description && (
                          <CardDescription>{component.description}</CardDescription>
                        )}
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Total</p>
                            <p className="font-medium">{component.totalQuantity}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Available</p>
                            <p className="font-medium">{component.availableQuantity}</p>
                          </div>
                          <div className="col-span-2">
                            <div className="w-full bg-muted rounded-full h-2.5">
                              <div 
                                className="bg-primary h-2.5 rounded-full" 
                                style={{ 
                                  width: `${Math.max(0, (component.availableQuantity / component.totalQuantity) * 100)}%` 
                                }}
                              ></div>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">
                              {((component.availableQuantity / component.totalQuantity) * 100).toFixed(0)}% available
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                {/* Edit component dialog */}
                {editingComponent && (
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogContent className="sm:max-w-lg">
                      <DialogHeader>
                        <DialogTitle>Edit Component</DialogTitle>
                      </DialogHeader>
                      <ComponentForm
                        component={editingComponent}
                        onSubmit={handleEditComponent}
                        isEditing={true}
                      />
                    </DialogContent>
                  </Dialog>
                )}
              </>
            )}
            
            {/* Lendings Tab */}
            {activeTab === 'lendings' && (
              <>
                <div className="mb-6">
                  <h2 className="text-2xl font-bold">Lending Records</h2>
                  <p className="text-muted-foreground">
                    View and search through all component lending records
                  </p>
                </div>
                
                <Card className="shadow-md border-primary/10">
                  <CardHeader className="bg-gradient-to-b from-primary/5 to-transparent">
                    <CardTitle>Lending Records</CardTitle>
                    <CardDescription>
                      View and search through all component lending records.
                    </CardDescription>
                    
                    <form onSubmit={handleSearch} className="mt-2 flex">
                      <Input
                        placeholder="Search by roll number"
                        value={searchRollNumber}
                        onChange={(e) => setSearchRollNumber(e.target.value)}
                        className="flex-1"
                      />
                      <Button type="submit" className="ml-2">
                        <Search className="h-4 w-4" />
                        <span className="ml-2 hidden sm:inline">Search</span>
                      </Button>
                    </form>
                  </CardHeader>
                  <CardContent className="p-0">
                    <LendingTable 
                      lendings={filteredLendings} 
                      showRollNumber={true}
                    />
                  </CardContent>
                </Card>
              </>
            )}
            
            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <>
                <div className="mb-6">
                  <h2 className="text-2xl font-bold">Notifications Center</h2>
                  <p className="text-muted-foreground">
                    Manage component requests and alerts
                  </p>
                </div>
                
                <AdminNotificationCenter />
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
