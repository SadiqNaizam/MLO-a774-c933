import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ContextualHeader from '@/components/layout/ContextualHeader';
import CartItemRow from '@/components/CartItemRow';
import BottomNavigationBar from '@/components/layout/BottomNavigationBar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { useToast } from '@/components/ui/use-toast';

interface CartItem {
  id: string;
  name: string;
  imageUrl?: string;
  price: number;
  quantity: number;
  maxQuantity?: number;
}

const initialCartItems: CartItem[] = [
  { id: 'item1', name: 'Margherita Pizza', imageUrl: 'https://images.unsplash.com/photo-1594007654729-407eedc4be65?w=100&h=100&fit=crop&q=80', price: 15.00, quantity: 1, maxQuantity: 5 },
  { id: 'item2', name: 'Calamari Fritti', imageUrl: 'https://images.unsplash.com/photo-1625046300010-91427ad50ff1?w=100&h=100&fit=crop&q=80', price: 12.00, quantity: 2, maxQuantity: 3 },
  { id: 'item3', name: 'Coke', price: 2.00, quantity: 4, maxQuantity: 10 },
];

const CartPage = () => {
  console.log('CartPage loaded');
  const navigate = useNavigate();
  const { toast } = useToast();
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);
  const [promoCode, setPromoCode] = useState('');

  const handleQuantityChange = (id: string, newQuantity: number) => {
    setCartItems(prevItems =>
      prevItems.map(item => (item.id === id ? { ...item, quantity: newQuantity } : item))
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    toast({
        title: "Item Removed",
        description: "The item has been removed from your cart.",
    });
  };
  
  const handleApplyPromo = () => {
    if(promoCode.toUpperCase() === "DISCOUNT10") {
        toast({ title: "Promo Applied!", description: "10% discount has been applied."});
        // Actual discount logic would modify total
    } else {
        toast({ title: "Invalid Promo Code", description: "The promo code entered is not valid.", variant: "destructive"});
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = subtotal > 0 ? 5.00 : 0; // Example fee
  const taxes = subtotal * 0.08; // Example tax rate
  const total = subtotal + deliveryFee + taxes;

  return (
    <div className="flex flex-col min-h-screen pb-16"> {/* pb-16 for BottomNavigationBar */}
      <ContextualHeader title="Your Cart" showBackButton onBackClick={() => navigate(-1)} />

      <ScrollArea className="flex-grow">
        <div className="container mx-auto px-4 py-6">
          {cartItems.length === 0 ? (
            <div className="text-center py-10">
              <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
              <p className="text-muted-foreground mb-4">Looks like you haven't added anything yet.</p>
              <Button onClick={() => navigate('/')}>Start Shopping</Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-1">
                {cartItems.map(item => (
                  <React.Fragment key={item.id}>
                    <CartItemRow
                      {...item}
                      currencySymbol="₹"
                      onQuantityChange={handleQuantityChange}
                      onRemove={() => {
                        // If using AlertDialog, trigger it here instead of direct remove
                        // For this example, direct remove for simplicity, or one item uses AlertDialog
                        if (item.id === 'item1') { // Example to show AlertDialog for one item
                            // This would be a state variable to control AlertDialog open state
                            // And an AlertDialogTrigger would wrap the remove button in CartItemRow or be used here
                            // For now, this is conceptual
                            console.log("Trigger AlertDialog for", item.name)
                        }
                        handleRemoveItem(item.id); 
                      }}
                    />
                  </React.Fragment>
                ))}
              </div>

              <div className="lg:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>₹{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Delivery Fee</span>
                      <span>₹{deliveryFee.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Taxes (8%)</span>
                      <span>₹{taxes.toFixed(2)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span>₹{total.toFixed(2)}</span>
                    </div>
                    <div className="pt-2 space-y-2">
                        <Input 
                            placeholder="Promo Code" 
                            value={promoCode} 
                            onChange={(e) => setPromoCode(e.target.value)}
                        />
                        <Button variant="outline" className="w-full" onClick={handleApplyPromo} disabled={!promoCode}>Apply Promo</Button>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" size="lg" onClick={() => navigate('/checkout')}>
                      Proceed to Checkout
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
      
      {/* Example AlertDialog (would be triggered by a remove action) */}
      {/* <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive" style={{display: 'none'}}>Show Dialog</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently remove the item from your cart.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => console.log('Item removed via dialog')}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog> */}

      <BottomNavigationBar />
    </div>
  );
};

export default CartPage;