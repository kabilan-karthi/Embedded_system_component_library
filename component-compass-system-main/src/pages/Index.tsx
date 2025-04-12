
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import NavBar from "@/components/NavBar";
import { ArrowRight, CircuitBoard, Cpu, Microchip, ChevronRight, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow">
        <section className="relative bg-gradient-to-br from-primary/90 to-primary/70 py-24 overflow-hidden">
          <div className="absolute inset-0 circuit-bg opacity-20"></div>
          <svg className="absolute bottom-0 left-0 w-full" style={{ transform: 'translateY(50%)' }} viewBox="0 0 1440 320">
            <path fill="#ffffff" fillOpacity="0.8" d="M0,128L48,144C96,160,192,192,288,186.7C384,181,480,139,576,149.3C672,160,768,224,864,240C960,256,1056,224,1152,186.7C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-white/10 rounded-full shadow-inner animate-float">
                  <CircuitBoard className="h-16 w-16 text-white" />
                </div>
              </div>
              <h1 className="text-4xl font-bold text-white sm:text-5xl md:text-6xl animate-fade-in">
                ESLIB
              </h1>
              <p className="mt-3 text-2xl font-light text-primary-foreground sm:mt-5 animate-fade-in" style={{ animationDelay: "0.2s" }}>
                Embedded Systems Library
              </p>
              <p className="mt-3 max-w-2xl mx-auto text-xl text-primary-foreground opacity-90 sm:mt-5 animate-fade-in" style={{ animationDelay: "0.3s" }}>
                Smart management of embedded components for your innovative projects
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-5">
                <Button size="lg" asChild className="animate-fade-in hover-scale pulse-highlight bg-white text-primary hover:bg-gray-100 shadow-lg" style={{ animationDelay: "0.4s" }}>
                  <Link to="/store" className="flex items-center">
                    Browse Component Store
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="bg-primary/20 text-white border-white/50 hover:bg-white/30 hover-scale animate-fade-in" style={{ animationDelay: "0.5s" }}>
                  <Link to="/login">Student Login</Link>
                </Button>
                <Button size="lg" variant="link" asChild className="bg-transparent text-white hover:bg-white/10 hover-scale animate-fade-in" style={{ animationDelay: "0.6s" }}>
                  <Link to="/admin/login">Admin Access</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-24 bg-white overflow-hidden relative">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 animate-fade-in">
              <div className="inline-flex items-center justify-center mb-4">
                <div className="p-3 rounded-full bg-primary/10 shadow-inner">
                  <Cpu className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
              <p className="mt-2 text-xl text-gray-600 max-w-2xl mx-auto">
                Streamlining embedded component management for your academic projects
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
              {/* Connecting line between steps (desktop only) */}
              <div className="absolute top-1/3 left-0 w-full h-0.5 bg-gradient-to-r from-primary/10 via-primary/20 to-primary/10 hidden md:block"></div>
              
              <div className="step-card hover-scale animate-fade-in relative z-10" style={{ animationDelay: "0.1s" }}>
                <div className="absolute -top-6 -right-6 bg-gradient-to-br from-primary to-primary/80 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold shadow-lg">1</div>
                <div className="mb-6">
                  <div className="p-4 rounded-full bg-primary/10 inline-block">
                    <Microchip className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-4">Browse the Catalog</h3>
                <p className="text-gray-600 mb-6">
                  Explore our extensive collection of embedded components, from microcontrollers to sensors and displays. Check real-time availability before making your selection.
                </p>
                <Button variant="ghost" asChild className="group flex items-center text-primary hover:text-primary/80">
                  <Link to="/store">
                    View Components
                    <ChevronRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
              
              <div className="step-card hover-scale animate-fade-in relative z-10" style={{ animationDelay: "0.2s" }}>
                <div className="absolute -top-6 -right-6 bg-gradient-to-br from-primary to-primary/80 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold shadow-lg">2</div>
                <div className="mb-6">
                  <div className="p-4 rounded-full bg-primary/10 inline-block">
                    <CircuitBoard className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-4">Request Components</h3>
                <p className="text-gray-600 mb-6">
                  Submit a request with your roll number, specify the components and quantity needed, and explain your project requirements for quick approval.
                </p>
                <Button variant="ghost" asChild className="group flex items-center text-primary hover:text-primary/80">
                  <Link to="/borrow">
                    Borrow Now
                    <ChevronRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
              
              <div className="step-card hover-scale animate-fade-in relative z-10" style={{ animationDelay: "0.3s" }}>
                <div className="absolute -top-6 -right-6 bg-gradient-to-br from-primary to-primary/80 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold shadow-lg">3</div>
                <div className="mb-6">
                  <div className="p-4 rounded-full bg-primary/10 inline-block">
                    <Cpu className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-4">Complete Your Project</h3>
                <p className="text-gray-600 mb-6">
                  Build your project with the borrowed components and return them when you're finished. Track your borrowing history and manage returns easily.
                </p>
                <Button variant="ghost" asChild className="group flex items-center text-primary hover:text-primary/80">
                  <Link to="/return">
                    Return Items
                    <ChevronRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-24 bg-gray-50 embedded-bg relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/70"></div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16 animate-fade-in">
              <div className="inline-flex items-center justify-center mb-4">
                <div className="p-3 rounded-full bg-primary/10 shadow-inner">
                  <Microchip className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Components</h2>
              <p className="mt-2 text-xl text-gray-600 max-w-2xl mx-auto">
                Discover the most sought-after components for your next project
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="overflow-hidden border-none shadow-xl hover:-translate-y-2 transition-all duration-500 bg-white animate-fade-in" style={{ animationDelay: "0.1s" }}>
                <div className="h-56 bg-cover bg-center" style={{ backgroundImage: `url(https://images.unsplash.com/photo-1518770660439-4636190af475)` }}></div>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold">Arduino Uno</h3>
                    <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium">Popular</span>
                  </div>
                  <p className="text-gray-600 mb-6">
                    Versatile microcontroller board based on the ATmega328P, perfect for beginners and advanced projects alike.
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-500">Available</span>
                      <div className="w-32 h-2 bg-gray-200 rounded-full mt-1">
                        <div className="h-full bg-primary/70 rounded-full" style={{ width: '60%' }}></div>
                      </div>
                      <span className="text-xs mt-1 text-gray-500">30/50 units</span>
                    </div>
                    <Button size="sm" asChild className="bg-primary hover:bg-primary/90 shadow-md hover:shadow-lg transition-all">
                      <Link to="/borrow">Borrow</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="overflow-hidden border-none shadow-xl hover:-translate-y-2 transition-all duration-500 bg-white animate-fade-in" style={{ animationDelay: "0.2s" }}>
                <div className="h-56 bg-cover bg-center" style={{ backgroundImage: `url(https://images.unsplash.com/photo-1531297484001-80022131f5a1)` }}></div>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold">Raspberry Pi 4</h3>
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-600 text-xs rounded-full font-medium">Limited</span>
                  </div>
                  <p className="text-gray-600 mb-6">
                    Powerful single-board computer with 4GB RAM, ideal for advanced IoT projects and edge computing applications.
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-500">Available</span>
                      <div className="w-32 h-2 bg-gray-200 rounded-full mt-1">
                        <div className="h-full bg-yellow-500/70 rounded-full" style={{ width: '25%' }}></div>
                      </div>
                      <span className="text-xs mt-1 text-gray-500">5/20 units</span>
                    </div>
                    <Button size="sm" asChild className="bg-primary hover:bg-primary/90 shadow-md hover:shadow-lg transition-all">
                      <Link to="/borrow">Borrow</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="overflow-hidden border-none shadow-xl hover:-translate-y-2 transition-all duration-500 bg-white animate-fade-in" style={{ animationDelay: "0.3s" }}>
                <div className="h-56 bg-cover bg-center" style={{ backgroundImage: `url(https://images.unsplash.com/photo-1518770660439-4636190af475)` }}></div>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold">ESP32</h3>
                    <span className="px-2 py-1 bg-green-100 text-green-600 text-xs rounded-full font-medium">Well Stocked</span>
                  </div>
                  <p className="text-gray-600 mb-6">
                    Feature-rich microcontroller with integrated WiFi and Bluetooth capabilities for connected IoT solutions.
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-500">Available</span>
                      <div className="w-32 h-2 bg-gray-200 rounded-full mt-1">
                        <div className="h-full bg-green-500/70 rounded-full" style={{ width: '55%' }}></div>
                      </div>
                      <span className="text-xs mt-1 text-gray-500">22/40 units</span>
                    </div>
                    <Button size="sm" asChild className="bg-primary hover:bg-primary/90 shadow-md hover:shadow-lg transition-all">
                      <Link to="/borrow">Borrow</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="text-center mt-12 animate-fade-in">
              <Button size="lg" asChild className="hover-scale bg-white hover:bg-gray-50 text-primary shadow-lg border border-gray-100 group">
                <Link to="/store" className="flex items-center">
                  View Complete Catalog
                  <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Why Use ESLIB?</h2>
              <p className="text-gray-600">Our platform offers numerous advantages for students and educators</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex items-start p-6 bg-gray-50 rounded-lg hover:shadow-md transition-all animate-fade-in" style={{ animationDelay: "0.1s" }}>
                <div className="p-3 bg-primary/10 rounded-full mr-4">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Streamlined Inventory Management</h3>
                  <p className="text-gray-600">Real-time tracking of all embedded components ensures you always know what's available for your projects.</p>
                </div>
              </div>
              
              <div className="flex items-start p-6 bg-gray-50 rounded-lg hover:shadow-md transition-all animate-fade-in" style={{ animationDelay: "0.2s" }}>
                <div className="p-3 bg-primary/10 rounded-full mr-4">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Better Resource Utilization</h3>
                  <p className="text-gray-600">Efficient borrowing and return system ensures components are available when needed for critical projects.</p>
                </div>
              </div>
              
              <div className="flex items-start p-6 bg-gray-50 rounded-lg hover:shadow-md transition-all animate-fade-in" style={{ animationDelay: "0.3s" }}>
                <div className="p-3 bg-primary/10 rounded-full mr-4">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Transparent History Tracking</h3>
                  <p className="text-gray-600">Maintain a detailed record of all your borrowed components and their return status.</p>
                </div>
              </div>
              
              <div className="flex items-start p-6 bg-gray-50 rounded-lg hover:shadow-md transition-all animate-fade-in" style={{ animationDelay: "0.4s" }}>
                <div className="p-3 bg-primary/10 rounded-full mr-4">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Simplified Approval Process</h3>
                  <p className="text-gray-600">Streamlined request and approval workflow gets components into your hands faster.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center mb-4">
                <CircuitBoard className="h-6 w-6 mr-2 text-primary" />
                <h3 className="text-lg font-bold">ESLIB</h3>
              </div>
              <p className="text-gray-400 mb-4">
                Embedded Systems Library - streamlining component management for innovative student projects.
              </p>
              <div className="text-sm text-gray-500">
                &copy; {new Date().getFullYear()} ESLIB. All rights reserved.
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/store" className="text-gray-400 hover:text-white transition-colors">Component Store</Link></li>
                <li><Link to="/borrow" className="text-gray-400 hover:text-white transition-colors">Borrow Process</Link></li>
                <li><Link to="/return" className="text-gray-400 hover:text-white transition-colors">Return Components</Link></li>
                <li><Link to="/history" className="text-gray-400 hover:text-white transition-colors">Lending History</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Assistance</h3>
              <ul className="space-y-2">
                <li><Link to="/admin/login" className="text-gray-400 hover:text-white transition-colors">Admin Portal</Link></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact Support</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">User Guide</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">FAQs</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500">Designed for educational institutions</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">Terms</Button>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">Privacy</Button>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">Contact</Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
