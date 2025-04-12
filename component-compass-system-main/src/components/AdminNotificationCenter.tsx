
import { useState, useEffect } from "react";
import { Bell, Check, X, Filter, MailOpen } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Notification, LendingRecord } from "@/lib/types";
import { mockNotifications, updateLendingStatus, getLendingById, formatDate } from "@/lib/mockData";
import { useToast } from "@/hooks/use-toast";

const AdminNotificationCenter = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [activeTab, setActiveTab] = useState<'all' | 'unread' | 'borrow' | 'return'>('all');
  const { toast } = useToast();

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

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
    toast({
      title: "All notifications marked as read",
      description: "Your notification center is now clear"
    });
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
  const filteredNotifications = getFilteredNotifications();

  return (
    <Card className="shadow-lg border-primary/10 overflow-hidden">
      <CardHeader className="bg-gradient-to-b from-primary/10 to-transparent pb-2 flex flex-row justify-between items-center">
        <div>
          <CardTitle className="flex items-center">
            <Bell className="mr-2 h-5 w-5 text-primary" />
            Notification Center
            {unreadCount > 0 && (
              <Badge variant="destructive" className="ml-2">{unreadCount}</Badge>
            )}
          </CardTitle>
          <CardDescription>Manage component requests and returns</CardDescription>
        </div>
        
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-1" />
                Actions
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Notification Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={markAllAsRead}>
                <MailOpen className="h-4 w-4 mr-2" />
                Mark all as read
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)} className="w-full">
        <div className="px-6">
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="unread">
              Unread {unreadCount > 0 && `(${unreadCount})`}
            </TabsTrigger>
            <TabsTrigger value="borrow">Borrow</TabsTrigger>
            <TabsTrigger value="return">Return</TabsTrigger>
          </TabsList>
        </div>
        
        <CardContent className="pt-4">
          <TabsContent value={activeTab} className="m-0">
            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
              {filteredNotifications.length > 0 ? (
                filteredNotifications.map(notification => (
                  <div 
                    key={notification.id}
                    className={`p-4 border rounded-lg transition-all duration-300 hover:shadow-md ${
                      notification.read 
                        ? 'bg-white' 
                        : 'bg-primary/5 shadow-sm border-primary/20'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <div className={`mt-1 p-2 rounded-full ${
                          notification.type === 'borrow-request' 
                            ? 'bg-blue-100' 
                            : 'bg-green-100'
                        }`}>
                          <Bell className={`h-4 w-4 ${
                            notification.type === 'borrow-request' 
                              ? 'text-blue-500' 
                              : 'text-green-500'
                          }`} />
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
          </TabsContent>
        </CardContent>
      </Tabs>
    </Card>
  );
};

export default AdminNotificationCenter;
