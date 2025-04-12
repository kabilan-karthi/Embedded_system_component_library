
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, Check, X, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { formatDate } from "@/lib/mockData";
import { Notification, LendingRecord } from "@/lib/types";
import { mockNotifications, updateLendingStatus, getLendingById } from "@/lib/mockData";

const AdminNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [activeTab, setActiveTab] = useState<'all' | 'unread' | 'borrow' | 'return'>('all');
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Load notifications
    setNotifications(mockNotifications);
  }, []);

  const markAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    );
  };

  const handleApprove = (notification: Notification) => {
    const lending = getLendingById(notification.lendingId);
    if (!lending) {
      toast({
        title: "Error",
        description: "Lending record not found",
        variant: "destructive"
      });
      return;
    }

    const newStatus = notification.type === 'borrow-request' ? 'approved' : 'returned';
    updateLendingStatus(notification.lendingId, newStatus);
    
    markAsRead(notification.id);
    toast({
      title: "Request Approved",
      description: notification.type === 'borrow-request' 
        ? "Component has been approved for lending" 
        : "Component return has been approved",
    });
  };

  const handleReject = (notification: Notification) => {
    updateLendingStatus(notification.lendingId, 'rejected');
    markAsRead(notification.id);
    toast({
      title: "Request Rejected",
      description: "The request has been rejected",
    });
  };

  const getFilteredNotifications = () => {
    switch (activeTab) {
      case 'unread':
        return notifications.filter(n => !n.read);
      case 'borrow':
        return notifications.filter(n => n.type === 'borrow-request');
      case 'return':
        return notifications.filter(n => n.type === 'return-request');
      default:
        return notifications;
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      {/* Sidebar */}
      <div className="hidden md:flex md:flex-col md:w-64 bg-white shadow-sm">
        <div className="flex items-center justify-center h-16 border-b">
          <span className="text-primary font-bold text-xl">EBLIB Admin</span>
        </div>
        <nav className="flex-grow p-4 space-y-1">
          <Button variant="ghost" className="w-full justify-start" onClick={() => navigate("/")}>
            Home
          </Button>
          <Button variant="ghost" className="w-full justify-start" onClick={() => navigate("/admin/dashboard")}>
            Dashboard
          </Button>
          <Button variant="ghost" className="w-full justify-start text-primary font-medium">
            Notifications {unreadCount > 0 && (
              <Badge variant="destructive" className="ml-2">{unreadCount}</Badge>
            )}
          </Button>
          <Button variant="ghost" className="w-full justify-start" onClick={() => navigate("/")}>
            Log Out
          </Button>
        </nav>
      </div>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top navbar */}
        <header className="bg-white shadow-sm h-16 flex items-center justify-between px-4 md:px-6">
          <h1 className="text-lg font-medium md:hidden">Notifications</h1>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={() => navigate("/")} className="md:hidden">
              Log Out
            </Button>
            <Button variant="ghost" size="sm" onClick={() => navigate("/admin/dashboard")}>
              Dashboard
            </Button>
          </div>
        </header>
        
        {/* Main content area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="max-w-5xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold">Notifications</h2>
                <p className="text-muted-foreground">
                  Manage component requests and returns
                </p>
              </div>
              {unreadCount > 0 && (
                <Badge variant="outline" className="bg-primary/10 text-primary">
                  {unreadCount} unread
                </Badge>
              )}
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Request Notifications</CardTitle>
                <CardDescription>
                  Approve or reject component borrow and return requests
                </CardDescription>
                <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)}>
                  <TabsList className="grid grid-cols-4 w-full md:w-auto">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="unread">
                      Unread {unreadCount > 0 && `(${unreadCount})`}
                    </TabsTrigger>
                    <TabsTrigger value="borrow">Borrow</TabsTrigger>
                    <TabsTrigger value="return">Return</TabsTrigger>
                  </TabsList>
                </Tabs>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {getFilteredNotifications().length > 0 ? (
                    getFilteredNotifications().map(notification => (
                      <div 
                        key={notification.id}
                        className={`p-4 border rounded-md transition-all duration-300 ${notification.read ? 'bg-white' : 'bg-primary/5 animate-pulse'}`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-3">
                            <div className={`mt-1 p-2 rounded-full ${notification.type === 'borrow-request' ? 'bg-blue-100' : 'bg-green-100'}`}>
                              <Bell className={`h-4 w-4 ${notification.type === 'borrow-request' ? 'text-blue-500' : 'text-green-500'}`} />
                            </div>
                            <div>
                              <div className="flex items-center">
                                <h3 className="text-sm font-medium">{notification.title}</h3>
                                {!notification.read && (
                                  <Badge variant="outline" className="ml-2 bg-primary/10 text-primary">New</Badge>
                                )}
                              </div>
                              <p className="text-sm text-gray-500">{notification.message}</p>
                              <p className="text-xs text-gray-400 mt-1">{formatDate(notification.date)}</p>
                            </div>
                          </div>
                          {!notification.read && (
                            <div className="flex space-x-2">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="flex items-center text-green-600 border-green-200 hover:bg-green-50"
                                onClick={() => handleApprove(notification)}
                              >
                                <Check className="h-4 w-4 mr-1" />
                                Approve
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="flex items-center text-red-600 border-red-200 hover:bg-red-50"
                                onClick={() => handleReject(notification)}
                              >
                                <X className="h-4 w-4 mr-1" />
                                Reject
                              </Button>
                            </div>
                          )}
                        </div>
                        {notification.read && (
                          <div className="mt-2 flex justify-end">
                            <Button 
                              variant="link" 
                              size="sm" 
                              className="text-xs"
                              onClick={() => navigate(`/admin/dashboard`)}
                            >
                              View Details
                              <ArrowRight className="ml-1 h-3 w-3" />
                            </Button>
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-10">
                      <Bell className="mx-auto h-10 w-10 text-gray-400" />
                      <h3 className="mt-2 text-sm font-medium text-gray-900">No notifications</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        You don't have any {activeTab !== 'all' ? activeTab : ''} notifications.
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminNotifications;
