import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingBag, PackageCheck, PackageX, RotateCcw } from 'lucide-react'; // Example icons for status

interface OrderItemPreview {
  name: string;
  quantity: number;
}

interface OrderHistoryItemCardProps {
  orderId: string;
  restaurantName: string;
  orderDate: string; // Should be formatted string or Date object
  totalAmount: number;
  status: 'PENDING' | 'CONFIRMED' | 'PREPARING' | 'OUT_FOR_DELIVERY' | 'DELIVERED' | 'CANCELLED' | 'FAILED';
  itemsPreview?: OrderItemPreview[]; // Optional: A few items from the order
  onViewDetails: (orderId: string) => void;
  onReorder?: (orderId: string) => void;
  currencySymbol?: string;
}

const statusMap: Record<OrderHistoryItemCardProps['status'], { label: string; icon: React.ReactElement; color: string }> = {
    PENDING: { label: 'Pending', icon: <ShoppingBag className="h-3 w-3 mr-1.5" />, color: 'bg-yellow-500' },
    CONFIRMED: { label: 'Confirmed', icon: <PackageCheck className="h-3 w-3 mr-1.5" />, color: 'bg-blue-500' },
    PREPARING: { label: 'Preparing', icon: <ShoppingBag className="h-3 w-3 mr-1.5" />, color: 'bg-orange-500' },
    OUT_FOR_DELIVERY: { label: 'Out for Delivery', icon: <ShoppingBag className="h-3 w-3 mr-1.5" />, color: 'bg-sky-500' },
    DELIVERED: { label: 'Delivered', icon: <PackageCheck className="h-3 w-3 mr-1.5" />, color: 'bg-green-500' },
    CANCELLED: { label: 'Cancelled', icon: <PackageX className="h-3 w-3 mr-1.5" />, color: 'bg-red-500' },
    FAILED: { label: 'Failed', icon: <PackageX className="h-3 w-3 mr-1.5" />, color: 'bg-destructive' },
};


const OrderHistoryItemCard: React.FC<OrderHistoryItemCardProps> = ({
  orderId,
  restaurantName,
  orderDate,
  totalAmount,
  status,
  itemsPreview,
  onViewDetails,
  onReorder,
  currencySymbol = '$',
}) => {
  console.log("Rendering OrderHistoryItemCard:", orderId);
  const statusInfo = statusMap[status] || statusMap.PENDING;

  return (
    <Card className="w-full overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
            <div>
                <CardTitle className="text-base">Order #{orderId.substring(0,8)}...</CardTitle>
                <p className="text-xs text-muted-foreground">From: {restaurantName}</p>
            </div>
            <Badge variant="outline" className={`text-xs whitespace-nowrap ${statusInfo.color} text-white border-none`}>
                {statusInfo.icon}
                {statusInfo.label}
            </Badge>
        </div>
        <p className="text-xs text-muted-foreground pt-1">Date: {new Date(orderDate).toLocaleDateString()} - Total: <span className="font-semibold">{currencySymbol}{totalAmount.toFixed(2)}</span></p>
      </CardHeader>
      {itemsPreview && itemsPreview.length > 0 && (
        <CardContent className="py-2 px-6 text-xs text-muted-foreground border-t border-b">
          <p className="font-medium mb-1">Items:</p>
          <ul className="list-disc list-inside pl-1 space-y-0.5">
            {itemsPreview.slice(0, 3).map((item, index) => ( // Show max 3 items
              <li key={index} className="truncate">{item.name} (x{item.quantity})</li>
            ))}
            {itemsPreview.length > 3 && <li>...and {itemsPreview.length - 3} more</li>}
          </ul>
        </CardContent>
      )}
      <CardFooter className="p-3 flex justify-end space-x-2">
        {onReorder && (status === 'DELIVERED' || status === 'CANCELLED') && (
          <Button variant="outline" size="sm" onClick={() => onReorder(orderId)}>
            <RotateCcw className="h-3.5 w-3.5 mr-1.5" /> Reorder
          </Button>
        )}
        <Button variant="default" size="sm" onClick={() => onViewDetails(orderId)}>
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default OrderHistoryItemCard;