import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ContextualHeader from '@/components/layout/ContextualHeader';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';

const CheckoutPage = () => {
  console.log('CheckoutPage loaded');
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1); // Example for multi-step progress
  const progressValue = (currentStep / 3) * 100; // Assuming 3 steps

  const [address, setAddress] = useState({ street: '', city: '', zip: '', country: '' });
  const [paymentMethod, setPaymentMethod] = useState('card'); // 'card', 'upi', 'cod'
  const [cardDetails, setCardDetails] = useState({ number: '', expiry: '', cvv: '' });
  const [saveAddress, setSaveAddress] = useState(false);
  const [savePayment, setSavePayment] = useState(false);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Placing order with:', { address, paymentMethod, cardDetails, saveAddress, savePayment });
    // Simulate API call
    toast({
      title: 'Order Placed Successfully!',
      description: 'Thank you for your purchase. Your order #12345 is confirmed.',
    });
    setTimeout(() => navigate('/'), 2000); // Redirect to home after a delay
  };

  return (
    <div className="flex flex-col min-h-screen bg-muted/40">
      <ContextualHeader title="Checkout" showBackButton onBackClick={() => navigate(-1)} />
      
      <ScrollArea className="flex-grow">
        <div className="container mx-auto px-4 py-6">
          <Progress value={progressValue} className="w-full mb-6 h-2" />

          <form onSubmit={handlePlaceOrder} className="space-y-8">
            {/* Delivery Address Section */}
            <Card>
              <CardHeader>
                <CardTitle>Delivery Address</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <RadioGroup defaultValue="new-address" className="mb-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="saved-address-1" id="saved-address-1" />
                    <Label htmlFor="saved-address-1">123 Main St, Anytown, USA (Saved)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="new-address" id="new-address" />
                    <Label htmlFor="new-address">Add a new address</Label>
                  </div>
                </RadioGroup>
                
                <div>
                  <Label htmlFor="street">Street Address</Label>
                  <Input id="street" placeholder="1234 Main St" value={address.street} onChange={e => setAddress({...address, street: e.target.value})} required />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input id="city" placeholder="Anytown" value={address.city} onChange={e => setAddress({...address, city: e.target.value})} required />
                  </div>
                  <div>
                    <Label htmlFor="zip">ZIP / Postal Code</Label>
                    <Input id="zip" placeholder="12345" value={address.zip} onChange={e => setAddress({...address, zip: e.target.value})} required />
                  </div>
                </div>
                <div>
                  <Label htmlFor="country">Country</Label>
                   <Select value={address.country} onValueChange={val => setAddress({...address, country: val})}>
                    <SelectTrigger id="country">
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USA">United States</SelectItem>
                      <SelectItem value="Canada">Canada</SelectItem>
                      <SelectItem value="India">India</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="save-address" checked={saveAddress} onCheckedChange={(checked) => setSaveAddress(Boolean(checked))} />
                  <Label htmlFor="save-address">Save this address for future orders</Label>
                </div>
              </CardContent>
            </Card>

            {/* Payment Method Section */}
            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="mb-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card">Credit/Debit Card</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="upi" id="upi" />
                    <Label htmlFor="upi">UPI</Label>
                  </div>
                   <div className="flex items-center space-x-2">
                    <RadioGroupItem value="cod" id="cod" />
                    <Label htmlFor="cod">Cash on Delivery</Label>
                  </div>
                </RadioGroup>

                {paymentMethod === 'card' && (
                  <div className="space-y-4 p-4 border rounded-md">
                    <div>
                      <Label htmlFor="card-number">Card Number</Label>
                      <Input id="card-number" placeholder="•••• •••• •••• ••••" value={cardDetails.number} onChange={e => setCardDetails({...cardDetails, number: e.target.value})} required={paymentMethod === 'card'} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiry">Expiry Date (MM/YY)</Label>
                        <Input id="expiry" placeholder="MM/YY" value={cardDetails.expiry} onChange={e => setCardDetails({...cardDetails, expiry: e.target.value})} required={paymentMethod === 'card'}/>
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input id="cvv" placeholder="•••" value={cardDetails.cvv} onChange={e => setCardDetails({...cardDetails, cvv: e.target.value})} required={paymentMethod === 'card'}/>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox id="save-payment" checked={savePayment} onCheckedChange={(checked) => setSavePayment(Boolean(checked))} />
                        <Label htmlFor="save-payment">Save this card securely</Label>
                    </div>
                  </div>
                )}
                {paymentMethod === 'upi' && (
                    <div className="p-4 border rounded-md">
                        <Label htmlFor="upi-id">UPI ID</Label>
                        <Input id="upi-id" placeholder="yourname@bank" required={paymentMethod === 'upi'} />
                    </div>
                )}
                {paymentMethod === 'cod' && (
                    <p className="text-sm text-muted-foreground p-4 border rounded-md">You will pay when your order is delivered.</p>
                )}
              </CardContent>
            </Card>

            {/* Order Summary Card (Simplified) */}
            <Card>
              <CardHeader>
                <CardTitle>Final Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Total Amount: ₹125.50 (Example Total)</p>
                {/* In a real app, this would be dynamically calculated */}
              </CardContent>
              <CardFooter>
                 <Button type="submit" className="w-full" size="lg">Place Order</Button>
              </CardFooter>
            </Card>
          </form>
        </div>
      </ScrollArea>
    </div>
  );
};

export default CheckoutPage;