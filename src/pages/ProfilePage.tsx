import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ContextualHeader from '@/components/layout/ContextualHeader';
import OrderHistoryItemCard from '@/components/OrderHistoryItemCard';
import BottomNavigationBar from '@/components/layout/BottomNavigationBar';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Switch } from "@/components/ui/switch";
import { useToast } from '@/components/ui/use-toast';

const placeholderOrders: any[] = [ // Using 'any' for brevity, replace with actual OrderHistoryItemCardProps
  { orderId: 'ORD12345', restaurantName: 'The Gourmet Place', orderDate: new Date(2023, 10, 15).toISOString(), totalAmount: 45.50, status: 'DELIVERED', itemsPreview: [{name: 'Lasagna', quantity: 1}, {name: 'Coke', quantity: 2}] },
  { orderId: 'ORD67890', restaurantName: 'Burger Queen', orderDate: new Date(2023, 10, 20).toISOString(), totalAmount: 22.00, status: 'CANCELLED', itemsPreview: [{name: 'Cheeseburger', quantity: 2}] },
  { orderId: 'ORD11223', restaurantName: 'Sushi Central', orderDate: new Date().toISOString(), totalAmount: 60.00, status: 'OUT_FOR_DELIVERY', itemsPreview: [{name: 'Dragon Roll', quantity: 1}, {name: 'Edamame', quantity:1}] },
];

const ProfilePage = () => {
  console.log('ProfilePage loaded');
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profile, setProfile] = useState({ name: 'John Doe', email: 'john.doe@example.com', phone: '123-456-7890' });
  const [notifications, setNotifications] = useState({ offers: true, orderUpdates: true });

  const handleProfileSave = () => {
    console.log('Profile saved:', profile);
    setIsEditingProfile(false);
    toast({ title: "Profile Updated", description: "Your profile details have been saved."});
  };
  
  const handleLogout = () => {
    console.log('User logged out');
    toast({ title: "Logged Out", description: "You have been successfully logged out."});
    navigate('/'); // Redirect to home or login page
  };

  return (
    <div className="flex flex-col min-h-screen pb-16 bg-muted/5"> {/* pb-16 for BottomNavigationBar */}
      <ContextualHeader title="My Profile" />

      <ScrollArea className="flex-grow">
        <div className="container mx-auto px-4 py-6 space-y-6">
          {/* User Info Section */}
          <Card className="overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground p-6 flex flex-row items-center space-x-4">
              <Avatar className="h-20 w-20 border-2 border-background">
                <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&q=80" alt={profile.name} />
                <AvatarFallback>{profile.name.split(' ').map(n=>n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-2xl">{profile.name}</CardTitle>
                <CardDescription className="text-primary-foreground/80">{profile.email}</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              {isEditingProfile ? (
                <>
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} />
                  </div>
                  <div className="flex space-x-2">
                    <Button onClick={handleProfileSave}>Save Changes</Button>
                    <Button variant="outline" onClick={() => setIsEditingProfile(false)}>Cancel</Button>
                  </div>
                </>
              ) : (
                <>
                  <p><strong>Phone:</strong> {profile.phone}</p>
                  <Button variant="outline" onClick={() => setIsEditingProfile(true)}>Edit Profile</Button>
                </>
              )}
            </CardContent>
          </Card>
          
          {/* Accordion for other sections */}
          <Accordion type="multiple" defaultValue={['order-history']} className="w-full space-y-4">
            <Card>
              <AccordionItem value="order-history" className="border-b-0">
                <AccordionTrigger className="px-6 py-4 text-lg font-medium hover:no-underline">Order History</AccordionTrigger>
                <AccordionContent className="px-6 pb-6 pt-0">
                  {placeholderOrders.length > 0 ? (
                    <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                        {placeholderOrders.map(order => (
                        <OrderHistoryItemCard
                            key={order.orderId}
                            {...order}
                            currencySymbol="₹"
                            onViewDetails={(id) => console.log('View order details:', id) /*navigate(`/order/${id}`)*/}
                            onReorder={(id) => console.log('Reorder:', id)}
                        />
                        ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">You have no past orders.</p>
                  )}
                </AccordionContent>
              </AccordionItem>
            </Card>

            <Card>
              <AccordionItem value="addresses" className="border-b-0">
                <AccordionTrigger className="px-6 py-4 text-lg font-medium hover:no-underline">Saved Addresses</AccordionTrigger>
                <AccordionContent className="px-6 pb-6 pt-0">
                  <p className="text-muted-foreground mb-2">Manage your saved delivery addresses.</p>
                  {/* Placeholder for address management UI */}
                  <div className="border p-3 rounded-md mb-2">
                    <p className="font-semibold">Home</p>
                    <p className="text-sm text-muted-foreground">123 Main St, Anytown, USA</p>
                  </div>
                  <Button variant="outline" size="sm">Add New Address</Button>
                </AccordionContent>
              </AccordionItem>
            </Card>

            <Card>
              <AccordionItem value="payment-methods" className="border-b-0">
                <AccordionTrigger className="px-6 py-4 text-lg font-medium hover:no-underline">Payment Methods</AccordionTrigger>
                <AccordionContent className="px-6 pb-6 pt-0">
                  <p className="text-muted-foreground mb-2">Manage your saved payment methods.</p>
                  {/* Placeholder for payment management UI */}
                   <div className="border p-3 rounded-md mb-2">
                    <p className="font-semibold">Visa **** 1234</p>
                    <p className="text-sm text-muted-foreground">Expires 12/25</p>
                  </div>
                  <Button variant="outline" size="sm">Add New Payment Method</Button>
                </AccordionContent>
              </AccordionItem>
            </Card>

            <Card>
              <AccordionItem value="settings" className="border-b-0">
                <AccordionTrigger className="px-6 py-4 text-lg font-medium hover:no-underline">Settings & Preferences</AccordionTrigger>
                <AccordionContent className="px-6 pb-6 pt-0 space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="offers-notifications" className="flex-grow">Receive Special Offers</Label>
                    <Switch
                      id="offers-notifications"
                      checked={notifications.offers}
                      onCheckedChange={(checked) => setNotifications(p => ({...p, offers: checked}))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="order-updates-notifications" className="flex-grow">Order Status Updates</Label>
                    <Switch
                      id="order-updates-notifications"
                      checked={notifications.orderUpdates}
                      onCheckedChange={(checked) => setNotifications(p => ({...p, orderUpdates: checked}))}
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Card>
          </Accordion>

          <Button variant="destructive" className="w-full md:w-auto" onClick={handleLogout}>Logout</Button>
        </div>
      </ScrollArea>

      <BottomNavigationBar />
    </div>
  );
};

export default ProfilePage;