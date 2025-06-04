import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Leaf, Star, PlusCircle } from 'lucide-react'; // Leaf for veg, Star for bestseller

interface MenuItemCardProps {
  id: string;
  name: string;
  description?: string;
  price: number;
  imageUrl?: string;
  isVeg?: boolean;
  isBestseller?: boolean;
  onAddToCart: (id: string, quantity: number) => void; // Added quantity
  onCustomize?: (id: string) => void; // For opening customization dialog
  currencySymbol?: string;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({
  id,
  name,
  description,
  price,
  imageUrl,
  isVeg,
  isBestseller,
  onAddToCart,
  onCustomize,
  currencySymbol = '$',
}) => {
  console.log("Rendering MenuItemCard:", name);

  const handleAdd = () => {
    if (onCustomize) { // Prioritize customize if available
        onCustomize(id);
    } else {
        onAddToCart(id, 1); // Default to adding 1 item
    }
  };

  return (
    <Card className="w-full flex flex-col sm:flex-row overflow-hidden transition-all hover:shadow-md">
      {imageUrl && (
        <div className="sm:w-1/3 flex-shrink-0">
          <img
            src={imageUrl || '/placeholder.svg'}
            alt={name}
            className="w-full h-32 sm:h-full object-cover"
            onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder.svg'; }}
          />
        </div>
      )}
      <div className="flex-grow flex flex-col">
        <CardContent className="p-3 space-y-1 flex-grow">
          <div className="flex items-center gap-2 mb-1">
            {isVeg && <Leaf className="h-4 w-4 text-green-500" title="Vegetarian"/>}
            <h3 className="font-semibold text-base truncate flex-grow">{name}</h3>
            {isBestseller && <Badge variant="outline" className="text-xs border-amber-500 text-amber-600"><Star className="h-3 w-3 mr-1 fill-amber-400 text-amber-500" />Bestseller</Badge>}
          </div>
          {description && (
            <p className="text-xs text-muted-foreground line-clamp-2">{description}</p>
          )}
          <p className="text-sm font-semibold pt-1">
            {currencySymbol}{price.toFixed(2)}
          </p>
        </CardContent>
        <CardFooter className="p-3 pt-0">
            <Button
              size="sm"
              className="w-full sm:w-auto ml-auto"
              onClick={handleAdd}
              variant={onCustomize ? "outline" : "default"}
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              {onCustomize ? 'Customize & Add' : 'Add to Cart'}
            </Button>
        </CardFooter>
      </div>
    </Card>
  );
};

export default MenuItemCard;