
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, CircuitBoard, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockNotifications } from "@/lib/mockData";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  const location = useLocation();

  useEffect(() => {
    // Count unread notifications
    const unreadCount = mockNotifications.filter(n => !n.read).length;
    setUnreadNotifications(unreadCount);
  }, []);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Borrow Component", path: "/borrow" },
    { name: "Return Component", path: "/return" },
    { name: "Lending History", path: "/history" }
  ];

  return (
    <nav className="bg-white/80 backdrop-blur-sm shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center space-x-2 group">
              <div className="p-1.5 bg-primary/10 rounded-md group-hover:bg-primary/20 transition-all duration-300">
                <CircuitBoard className="h-6 w-6 text-primary" />
              </div>
              <span className="text-primary font-bold text-xl">ESLIB</span>
            </Link>
          </div>
          
          {/* Desktop navigation */}
          <div className="hidden md:ml-6 md:flex md:items-center md:space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  isActive(link.path)
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "text-gray-700 hover:bg-primary/10 hover:text-primary"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/admin/login"
              className="ml-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 bg-gradient-to-r from-primary/90 to-accent/80 text-white hover:shadow-md"
            >
              Admin Portal
              {location.pathname.includes('/admin') && unreadNotifications > 0 && (
                <Badge variant="destructive" className="ml-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                  {unreadNotifications}
                </Badge>
              )}
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      {isOpen && (
        <div className="md:hidden absolute w-full bg-white/95 backdrop-blur-sm shadow-lg z-50 animate-fade-in">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive(link.path)
                    ? "bg-primary text-primary-foreground"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/admin/login"
              className="block px-3 py-2 rounded-md text-base font-medium bg-gradient-to-r from-primary/90 to-accent/80 text-white"
              onClick={() => setIsOpen(false)}
            >
              Admin Portal
              {unreadNotifications > 0 && (
                <Badge variant="destructive" className="ml-2">
                  {unreadNotifications}
                </Badge>
              )}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
