import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Search, MapPin } from 'lucide-react';

interface ContextualHeaderProps {
  title?: string;
  showBackButton?: boolean;
  onBackClick?: () => void;
  showSearchButton?: boolean;
  onSearchClick?: () => void;
  showLocation?: boolean;
  locationText?: string;
  children?: React.ReactNode; // For additional elements like a search input
}

const ContextualHeader: React.FC<ContextualHeaderProps> = ({
  title,
  showBackButton = false,
  onBackClick,
  showSearchButton = false,
  onSearchClick,
  showLocation = false,
  locationText,
  children,
}) => {
  console.log("Rendering ContextualHeader with title:", title);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="flex items-center flex-1">
          {showBackButton && (
            <Button variant="ghost" size="icon" onClick={onBackClick || (() => window.history.back())} className="mr-2">
              <ChevronLeft className="h-5 w-5" />
              <span className="sr-only">Back</span>
            </Button>
          )}
          {title && <h1 className="text-lg font-semibold truncate">{title}</h1>}
          {showLocation && locationText && (
            <div className="ml-4 flex items-center text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 mr-1" />
              <span className="truncate">{locationText}</span>
            </div>
          )}
        </div>

        {children && <div className="flex-1 flex justify-center items-center px-4">{children}</div>}

        <div className="flex items-center justify-end flex-1">
          {showSearchButton && (
            <Button variant="ghost" size="icon" onClick={onSearchClick}>
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
          )}
          {/* Placeholder for other actions like profile icon */}
        </div>
      </div>
    </header>
  );
};

export default ContextualHeader;