import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, ShoppingCart, User, History } from 'lucide-react'; // Example icons
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface NavItem {
  label: string;
  icon: React.ReactElement;
  path: string;
  badgeCount?: number;
}

interface BottomNavigationBarProps {
  items?: NavItem[]; // Allow custom items, or use default
}

const defaultItems: NavItem[] = [
  { label: 'Home', icon: <Home className="h-5 w-5" />, path: '/' },
  { label: 'Orders', icon: <History className="h-5 w-5" />, path: '/orders' }, // Assuming an orders page
  { label: 'Cart', icon: <ShoppingCart className="h-5 w-5" />, path: '/cart', badgeCount: 0 },
  { label: 'Profile', icon: <User className="h-5 w-5" />, path: '/profile' },
];

const BottomNavigationBar: React.FC<BottomNavigationBarProps> = ({ items = defaultItems }) => {
  const location = useLocation();
  console.log("Rendering BottomNavigationBar, current path:", location.pathname);

  // Example: Update cart badge count (this would typically come from global state/context)
  const cartItem = items.find(item => item.label === 'Cart');
  if (cartItem) {
    // This is a placeholder. In a real app, this would come from a state management solution.
    // cartItem.badgeCount = 3; // Simulate 3 items in cart
  }


  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:hidden">
      <div className="container mx-auto flex h-16 max-w-screen-2xl items-center justify-around">
        {items.map((item) => {
          const isActive = location.pathname === item.path || (item.path === "/" && location.pathname.startsWith("/home")); // Handle root path better
          return (
            <Link
              key={item.label}
              to={item.path}
              className={cn(
                "flex flex-col items-center justify-center p-2 rounded-md text-sm font-medium transition-colors",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-primary/80",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              )}
            >
              <div className="relative">
                {item.icon}
                {item.badgeCount !== undefined && item.badgeCount > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-1 -right-2 h-4 w-4 min-w-[1rem] p-0 text-xs flex items-center justify-center"
                  >
                    {item.badgeCount > 9 ? '9+' : item.badgeCount}
                  </Badge>
                )}
              </div>
              <span className="mt-1 text-xs">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavigationBar;