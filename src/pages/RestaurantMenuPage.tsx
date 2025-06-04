import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ContextualHeader from '@/components/layout/ContextualHeader';
import MenuItemCard from '@/components/MenuItemCard';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from '@/components/ui/scroll-area';
import { ShoppingCart } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';


// Placeholder data - in a real app, this would be fetched
const restaurantDetails = {
  '1': { name: 'The Gourmet Place', logoUrl: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=100&h=100&fit=crop&q=80', tags: ['Italian', 'Fine Dining', 'Top Rated'] },
  '2': { name: 'Burger Queen', logoUrl: 'https://images.unsplash.com/photo-1606131731446-5568d87113aa?w=100&h=100&fit=crop&q=80', tags: ['Fast Food', 'Burgers', 'Family Friendly'] },
  '3': { name: 'Sushi Central', logoUrl: 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=100&h=100&fit=crop&q=80', tags: ['Japanese', 'Sushi', 'Authentic'] },
  '4': { name: 'Healthy Bites', logoUrl: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=100&h=100&fit=crop&q=80', tags: ['Salads', 'Healthy', 'Vegan Options'] },
};

const menuItemsData = {
  '1': [ // The Gourmet Place
    { category: "Appetizers", items: [
      { id: 'app1', name: 'Bruschetta Classica', description: 'Toasted bread with fresh tomatoes, garlic, basil, and olive oil.', price: 8.50, imageUrl: 'https://images.unsplash.com/photo-1505253716362-af242227bc07?w=400&h=300&fit=crop&q=80', isVeg: true, onCustomize: true },
      { id: 'app2', name: 'Calamari Fritti', description: 'Crispy fried calamari served with marinara sauce.', price: 12.00, imageUrl: 'https://images.unsplash.com/photo-1625046300010-91427ad50ff1?w=400&h=300&fit=crop&q=80' },
    ]},
    { category: "Main Courses", items: [
      { id: 'main1', name: 'Lasagna Bolognese', description: 'Layers of pasta, meat sauce, béchamel, and Parmesan cheese.', price: 18.00, imageUrl: 'https://images.unsplash.com/photo-1574894709920-FE2524fb7d0d?w=400&h=300&fit=crop&q=80', isBestseller: true },
      { id: 'main2', name: 'Margherita Pizza', description: 'Classic pizza with tomato, mozzarella, and basil.', price: 15.00, imageUrl: 'https://images.unsplash.com/photo-1594007654729-407eedc4be65?w=400&h=300&fit=crop&q=80', isVeg: true, isBestseller: true, onCustomize: true },
    ]},
  ],
  // ... more restaurants ...
  'default': [
    { category: "Starters", items: [ {id: 'd_s1', name: 'Generic Starter', description: 'A tasty generic starter.', price: 7.99, isVeg: true, imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop&q=80'} ]},
    { category: "Mains", items: [ {id: 'd_m1', name: 'Generic Main Dish', description: 'A satisfying generic main dish.', price: 14.50, isBestseller: true, imageUrl: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=400&h=300&fit=crop&q=80'} ]},
  ]
};


const RestaurantMenuPage = () => {
  const { restaurantId } = useParams<{ restaurantId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMenuItem, setSelectedMenuItem] = useState<any>(null); // For customization dialog
  const [customizationDialogOpen, setCustomizationDialogOpen] = useState(false);

  // Simulate fetching data
  const currentRestaurant = restaurantId ? (restaurantDetails[restaurantId as keyof typeof restaurantDetails] || restaurantDetails['1']) : restaurantDetails['1'];
  const currentMenu = restaurantId ? (menuItemsData[restaurantId as keyof typeof menuItemsData] || menuItemsData['default']) : menuItemsData['default'];
  
  useEffect(() => {
    console.log(`RestaurantMenuPage loaded for restaurant ID: ${restaurantId}`);
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 1000); // Simulate API call
    return () => clearTimeout(timer);
  }, [restaurantId]);

  const handleAddToCart = (itemId: string, quantity: number) => {
    // In a real app, add to global cart state
    const item = currentMenu.flatMap(cat => cat.items).find(i => i.id === itemId);
    console.log('Add to cart:', itemId, 'Quantity:', quantity, 'Item:', item?.name);
    toast({
      title: "Item Added!",
      description: `${item?.name || 'Item'} (x${quantity}) added to your cart.`,
    });
  };

  const handleCustomize = (itemId: string) => {
    const item = currentMenu.flatMap(cat => cat.items).find(i => i.id === itemId);
    setSelectedMenuItem(item);
    setCustomizationDialogOpen(true);
    console.log('Customize item:', itemId);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <ContextualHeader title="Loading..." showBackButton onBackClick={() => navigate(-1)} />
        <div className="container mx-auto px-4 py-6 space-y-4">
          <div className="flex items-center space-x-4 mb-4">
            <Skeleton className="h-20 w-20 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-4 w-64" />
            </div>
          </div>
          {[1,2,3].map(i => (
            <div key={i} className="space-y-3">
                <Skeleton className="h-10 w-1/3 mb-2" />
                <Skeleton className="h-24 w-full mb-2" />
                <Skeleton className="h-24 w-full mb-2" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <ContextualHeader title={currentRestaurant.name} showBackButton onBackClick={() => navigate(-1)} />
      
      <ScrollArea className="flex-grow">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center space-x-4 mb-6 p-4 bg-card rounded-lg shadow">
            <Avatar className="h-20 w-20 border">
              <AvatarImage src={currentRestaurant.logoUrl || 'https://via.placeholder.com/100'} alt={currentRestaurant.name} />
              <AvatarFallback>{currentRestaurant.name.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold">{currentRestaurant.name}</h1>
              <div className="flex flex-wrap gap-2 mt-2">
                {currentRestaurant.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
              </div>
            </div>
          </div>

          <Accordion type="multiple" defaultValue={currentMenu.map(cat => cat.category)} className="w-full">
            {currentMenu.map((categorySection) => (
              <AccordionItem value={categorySection.category} key={categorySection.category}>
                <AccordionTrigger className="text-xl font-semibold hover:no-underline">
                  {categorySection.category}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    {categorySection.items.map((item) => (
                      <MenuItemCard
                        key={item.id}
                        {...item}
                        onAddToCart={handleAddToCart}
                        onCustomize={item.onCustomize ? handleCustomize : undefined}
                        currencySymbol="₹"
                      />
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </ScrollArea>
        
      <Dialog open={customizationDialogOpen} onOpenChange={setCustomizationDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Customize {selectedMenuItem?.name}</DialogTitle>
            <DialogDescription>
              Make selections for your item. (Placeholder options)
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-2">
            <p>Option 1: Small / Medium / Large</p>
            <p>Option 2: Extra cheese? (+₹20)</p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCustomizationDialogOpen(false)}>Cancel</Button>
            <Button onClick={() => {
              handleAddToCart(selectedMenuItem.id, 1); // Add 1 customized item
              setCustomizationDialogOpen(false);
            }}>Add to Cart</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Floating Cart Button Example */}
      <Button 
        className="fixed bottom-6 right-6 rounded-full h-14 w-14 shadow-lg md:hidden z-50"
        size="icon"
        onClick={() => navigate('/cart')}
        aria-label="View Cart"
      >
        <ShoppingCart className="h-6 w-6" />
        {/* Add a badge for item count here if cart state is available */}
      </Button>
    </div>
  );
};

export default RestaurantMenuPage;