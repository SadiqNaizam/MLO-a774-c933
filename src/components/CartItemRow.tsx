import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'; // For quantity display, could be just text
import { X, Plus, Minus } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface CartItemRowProps {
  id: string;
  name: string;
  imageUrl?: string;
  price: number; // Price per unit
  quantity: number;
  onQuantityChange: (id: string, newQuantity: number) => void;
  onRemove: (id: string) => void;
  currencySymbol?: string;
  maxQuantity?: number;
}

const CartItemRow: React.FC<CartItemRowProps> = ({
  id,
  name,
  imageUrl,
  price,
  quantity,
  onQuantityChange,
  onRemove,
  currencySymbol = '$',
  maxQuantity = 10,
}) => {
  console.log("Rendering CartItemRow:", name, "Quantity:", quantity);

  const handleIncrease = () => {
    if (quantity < maxQuantity) {
      onQuantityChange(id, quantity + 1);
    }
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      onQuantityChange(id, quantity - 1);
    } else {
      onRemove(id); // Or show confirmation before removing last item
    }
  };

  return (
    <>
    <div className="flex items-center py-4 space-x-3">
      {imageUrl && (
        <img
          src={imageUrl || '/placeholder.svg'}
          alt={name}
          className="w-16 h-16 object-cover rounded-md flex-shrink-0"
          onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder.svg'; }}
        />
      )}
      <div className="flex-grow min-w-0">
        <h4 className="font-medium text-sm truncate">{name}</h4>
        <p className="text-xs text-muted-foreground">Unit Price: {currencySymbol}{price.toFixed(2)}</p>
        <p className="text-sm font-semibold mt-1">
          {currencySymbol}{(price * quantity).toFixed(2)}
        </p>
      </div>
      <div className="flex items-center space-x-2 flex-shrink-0">
        <Button variant="outline" size="icon" className="h-7 w-7" onClick={handleDecrease} aria-label="Decrease quantity">
          <Minus className="h-4 w-4" />
        </Button>
        {/* Using a read-only input for consistent styling, or just a span */}
        <Input
            type="text"
            readOnly
            value={quantity}
            className="h-7 w-10 text-center px-0"
            aria-label="Current quantity"
        />
        <Button variant="outline" size="icon" className="h-7 w-7" onClick={handleIncrease} disabled={quantity >= maxQuantity} aria-label="Increase quantity">
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive h-7 w-7" onClick={() => onRemove(id)} aria-label="Remove item">
        <X className="h-4 w-4" />
      </Button>
    </div>
    <Separator className="my-1" />
    </>
  );
};

export default CartItemRow;