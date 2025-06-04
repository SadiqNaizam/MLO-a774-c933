import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Badge } from '@/components/ui/badge';
import { Star, Clock } from 'lucide-react';

interface RestaurantCardProps {
  id: string;
  name: string;
  imageUrl: string;
  rating?: number;
  deliveryTime?: string; // e.g., "20-30 min"
  cuisineTypes?: string[]; // e.g., ["Italian", "Pizza"]
  onClick: (id: string) => void;
  isNew?: boolean;
  discount?: string; // e.g. "20% OFF"
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({
  id,
  name,
  imageUrl,
  rating,
  deliveryTime,
  cuisineTypes,
  onClick,
  isNew,
  discount
}) => {
  console.log("Rendering RestaurantCard:", name);

  return (
    <Card
      className="w-full overflow-hidden transition-all hover:shadow-md cursor-pointer"
      onClick={() => onClick(id)}
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick(id)}
    >
      <CardHeader className="p-0 relative">
        <AspectRatio ratio={16 / 9}>
          <img
            src={imageUrl || '/placeholder.svg'}
            alt={name}
            className="object-cover w-full h-full"
            onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder.svg'; }}
          />
        </AspectRatio>
        {(isNew || discount) && (
            <div className="absolute top-2 left-2 flex flex-col gap-1">
                {isNew && <Badge variant="default" className="bg-green-500 text-white">NEW</Badge>}
                {discount && <Badge variant="destructive">{discount}</Badge>}
            </div>
        )}
      </CardHeader>
      <CardContent className="p-3 space-y-1">
        <h3 className="font-semibold text-base truncate">{name}</h3>
        {cuisineTypes && cuisineTypes.length > 0 && (
          <p className="text-xs text-muted-foreground truncate">
            {cuisineTypes.join(', ')}
          </p>
        )}
        <div className="flex items-center justify-between text-xs text-muted-foreground pt-1">
          {rating && (
            <span className="flex items-center">
              <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
              {rating.toFixed(1)}
            </span>
          )}
          {deliveryTime && (
            <span className="flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              {deliveryTime}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RestaurantCard;