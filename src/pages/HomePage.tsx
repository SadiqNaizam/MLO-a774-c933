import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ContextualHeader from '@/components/layout/ContextualHeader';
import CategoryChip from '@/components/CategoryChip';
import RestaurantCard from '@/components/RestaurantCard';
import BottomNavigationBar from '@/components/layout/BottomNavigationBar';
import { Input } from '@/components/ui/input';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { Search } from 'lucide-react';

const placeholderCategories = [
  { name: 'Pizza', imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=100&h=100&fit=crop&q=80' },
  { name: 'Burgers', imageUrl: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=100&h=100&fit=crop&q=80' },
  { name: 'Sushi', imageUrl: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=100&h=100&fit=crop&q=80' },
  { name: 'Salads', imageUrl: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=100&h=100&fit=crop&q=80' },
  { name: 'Desserts', imageUrl: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=100&h=100&fit=crop&q=80' },
  { name: 'Indian', imageUrl: 'https://images.unsplash.com/photo-1585937421612-70a058387cc6?w=100&h=100&fit=crop&q=80' },
];

const placeholderRestaurants = [
  { id: '1', name: 'The Gourmet Place', imageUrl: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=400&h=300&fit=crop&q=80', rating: 4.5, deliveryTime: '25-35 min', cuisineTypes: ['Italian', 'Cafe'], discount: '10% OFF' },
  { id: '2', name: 'Burger Queen', imageUrl: 'https://images.unsplash.com/photo-1606131731446-5568d87113aa?w=400&h=300&fit=crop&q=80', rating: 4.2, deliveryTime: '20-30 min', cuisineTypes: ['Burgers', 'Fast Food'], isNew: true },
  { id: '3', name: 'Sushi Central', imageUrl: 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=400&h=300&fit=crop&q=80', rating: 4.8, deliveryTime: '30-40 min', cuisineTypes: ['Japanese', 'Sushi'] },
  { id: '4', name: 'Healthy Bites', imageUrl: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=400&h=300&fit=crop&q=80', rating: 4.6, deliveryTime: '15-25 min', cuisineTypes: ['Salads', 'Healthy'], discount: '15% OFF' },
];

const HomePage = () => {
  console.log('HomePage loaded');
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Simulate loading

  const handleCategoryClick = (categoryName: string) => {
    setActiveCategory(categoryName === activeCategory ? null : categoryName);
    // In a real app, filter restaurants based on category
    console.log('Category selected:', categoryName);
  };

  const handleRestaurantClick = (id: string) => {
    navigate(`/restaurant-menu/${id}`);
  };
  
  const filteredRestaurants = placeholderRestaurants.filter(restaurant => 
    restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    restaurant.cuisineTypes?.some(cuisine => cuisine.toLowerCase().includes(searchTerm.toLowerCase()))
  ).filter(restaurant => 
    !activeCategory || restaurant.cuisineTypes?.includes(activeCategory)
  );

  return (
    <div className="flex flex-col min-h-screen pb-16"> {/* pb-16 for BottomNavigationBar */}
      <ContextualHeader
        showLocation
        locationText="123 Foodie Lane, Flavor Town"
      >
        <div className="relative w-full max-w-md">
          <Input 
            type="search" 
            placeholder="Search restaurants or cuisines..." 
            className="pl-10 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        </div>
      </ContextualHeader>

      <main className="flex-grow container mx-auto px-4 py-4">
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-3">Categories</h2>
          <ScrollArea className="w-full whitespace-nowrap">
            <div className="flex space-x-3 pb-3">
              {placeholderCategories.map((category) => (
                <CategoryChip
                  key={category.name}
                  categoryName={category.name}
                  imageUrl={category.imageUrl}
                  isActive={activeCategory === category.name}
                  onClick={handleCategoryClick}
                />
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">
            {activeCategory ? `${activeCategory} Restaurants` : 'Featured Restaurants'}
          </h2>
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-40 w-full rounded-lg" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRestaurants.length > 0 ? filteredRestaurants.map((restaurant) => (
                <RestaurantCard
                  key={restaurant.id}
                  {...restaurant}
                  onClick={handleRestaurantClick}
                />
              )) : <p className="col-span-full text-center text-muted-foreground">No restaurants found matching your criteria.</p>}
            </div>
          )}
        </section>
      </main>

      <BottomNavigationBar />
    </div>
  );
};

export default HomePage;